import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type QueryKey = readonly unknown[] | string;

const serializeKey = (key: QueryKey) => (typeof key === 'string' ? key : JSON.stringify(key));

type Listener = () => void;

export class QueryClient {
  private cache = new Map<string, any>();
  private listeners = new Set<Listener>();
  private errorCache = new Map<string, unknown>();
  private loadingKeys = new Set<string>();

  getQueryData<TData = unknown>(queryKey: QueryKey): TData | undefined {
    return this.cache.get(serializeKey(queryKey));
  }

  setQueryData<TData = unknown>(queryKey: QueryKey, updater: TData | ((oldData: TData | undefined) => TData)) {
    const key = serializeKey(queryKey);
    const nextValue = typeof updater === 'function' ? (updater as (oldData: TData | undefined) => TData)(this.cache.get(key)) : updater;
    this.cache.set(key, nextValue);
    this.errorCache.delete(serializeKey(queryKey));
    this.notify();
  }

  setQueryError(queryKey: QueryKey, error: unknown) {
    this.errorCache.set(serializeKey(queryKey), error);
    this.notify();
  }

  isFetching(queryKey?: QueryKey) {
    if (!queryKey) return this.loadingKeys.size;
    return this.loadingKeys.has(serializeKey(queryKey)) ? 1 : 0;
  }

  async fetchQuery<TData>({ queryKey, queryFn }: { queryKey: QueryKey; queryFn: () => Promise<TData> }) {
    const key = serializeKey(queryKey);
    this.loadingKeys.add(key);
    this.notify();
    try {
      const data = await queryFn();
      this.cache.set(key, data);
      this.errorCache.delete(key);
      return data;
    } catch (error) {
      this.errorCache.set(key, error);
      throw error;
    } finally {
      this.loadingKeys.delete(key);
      this.notify();
    }
  }

  invalidateQueries({ queryKey }: { queryKey: QueryKey }) {
    this.cache.delete(serializeKey(queryKey));
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

const QueryClientContext = createContext<QueryClient | null>(null);

export const QueryClientProvider = ({ client, children }: { client: QueryClient; children: React.ReactNode }) => (
  <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>
);

export const useQueryClient = () => {
  const ctx = useContext(QueryClientContext);
  if (!ctx) throw new Error('No QueryClientProvider');
  return ctx;
};

type UseQueryOptions<TData> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
};

type UseQueryResult<TData, TError> = {
  data?: TData;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  refetch: () => Promise<TData>;
};

export function useQuery<TData = unknown, TError = unknown>({ queryKey, queryFn, enabled = true }: UseQueryOptions<TData>): UseQueryResult<TData, TError> {
  const client = useQueryClient();
  const key = serializeKey(queryKey);
  const [state, setState] = useState<{ data?: TData; isLoading: boolean; isError: boolean; error: TError | null }>(() => {
    const cached = client.getQueryData<TData>(queryKey);
    const error = (client as any).errorCache?.get?.(key) ?? null;
    return { data: cached, isLoading: enabled && !cached, isError: Boolean(error), error: error as TError | null };
  });

  const fetchData = useCallback(async () => {
    try {
      const data = await client.fetchQuery({ queryKey, queryFn });
      setState({ data, isLoading: false, isError: false, error: null });
      return data;
    } catch (err) {
      setState({ data: client.getQueryData(queryKey), isLoading: false, isError: true, error: err as TError });
      throw err;
    }
  }, [client, queryKey, queryFn]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [enabled, fetchData]);

  useEffect(() => {
    const unsubscribe = client.subscribe(() => {
      const cached = client.getQueryData<TData>(queryKey);
      const hasError = (client as any).errorCache?.has?.(key);
      const errorVal = (client as any).errorCache?.get?.(key) ?? null;
      setState((prev) => ({ ...prev, data: cached, isError: Boolean(hasError), error: errorVal }));
    });
    return () => unsubscribe();
  }, [client, key, queryKey]);

  return { ...state, refetch: fetchData };
}

type UseMutationOptions<TData, TVariables, TError> = {
  mutationFn: (vars: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
};

type UseMutationResult<TData, TVariables, TError> = {
  mutate: (vars: TVariables) => void;
  mutateAsync: (vars: TVariables) => Promise<TData>;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  reset: () => void;
};

export function useMutation<TData = unknown, TError = unknown, TVariables = void>({ mutationFn, onSuccess, onError }: UseMutationOptions<TData, TVariables, TError>): UseMutationResult<TData, TVariables, TError> {
  const [state, setState] = useState<{ isLoading: boolean; isError: boolean; error: TError | null }>({ isLoading: false, isError: false, error: null });

  const execute = useCallback(
    async (variables: TVariables) => {
      setState({ isLoading: true, isError: false, error: null });
      try {
        const data = await mutationFn(variables);
        onSuccess?.(data, variables);
        setState({ isLoading: false, isError: false, error: null });
        return data;
      } catch (error) {
        onError?.(error as TError, variables);
        setState({ isLoading: false, isError: true, error: error as TError });
        throw error;
      }
    },
    [mutationFn, onError, onSuccess]
  );

  return {
    mutate: (vars) => {
      execute(vars).catch(() => {});
    },
    mutateAsync: execute,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    reset: () => setState({ isLoading: false, isError: false, error: null })
  };
}

export const useIsFetching = (queryKey?: QueryKey) => {
  const client = useQueryClient();
  const [, forceRender] = useState(0);

  useEffect(() => {
    const unsubscribe = client.subscribe(() => forceRender((c) => c + 1));
    return () => unsubscribe();
  }, [client]);
  useEffect(() => {
    // track queryKey changes to force rerender hook consumers when switching keys
    forceRender((c) => c);
  }, [queryKey]);

  return client.isFetching(queryKey);
};
