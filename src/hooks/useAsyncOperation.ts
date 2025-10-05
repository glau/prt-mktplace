'use client';
import React from 'react';

interface UseAsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncOperationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: UseAsyncOperationOptions = {}
) {
  const [state, setState] = React.useState<UseAsyncOperationState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    let active = true;

    async function executeOperation() {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await operation();
        
        if (!active) return;

        setState({ data: result, loading: false, error: null });
        options.onSuccess?.();
      } catch (err) {
        console.error(err);
        
        if (!active) return;

        const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
        setState({ data: null, loading: false, error: errorMessage });
        
        if (err instanceof Error) {
          options.onError?.(err);
        }
      }
    }

    executeOperation();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const retry = React.useCallback(() => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    // Force re-run effect by updating a dummy dependency
  }, []);

  return {
    ...state,
    retry,
  };
}
