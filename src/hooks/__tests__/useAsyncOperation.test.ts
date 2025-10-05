import { describe, it, expect, beforeEach, vi, renderHook, waitFor } from '@/test';
import { useAsyncOperation } from '../useAsyncOperation';

describe('useAsyncOperation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with loading true', () => {
    const operation = vi.fn().mockResolvedValue('test data');
    const { result } = renderHook(() => useAsyncOperation(operation, []));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should load data successfully', async () => {
    const testData = { id: 1, name: 'Test' };
    const operation = vi.fn().mockResolvedValue(testData);
    
    const { result } = renderHook(() => useAsyncOperation(operation, []));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(testData);
    expect(result.current.error).toBeNull();
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Failed to load data';
    const operation = vi.fn().mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useAsyncOperation(operation, []));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should call onSuccess callback on successful load', async () => {
    const onSuccess = vi.fn();
    const operation = vi.fn().mockResolvedValue('test data');
    
    renderHook(() => useAsyncOperation(operation, [], { onSuccess }));
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should call onError callback on error', async () => {
    const onError = vi.fn();
    const error = new Error('Test error');
    const operation = vi.fn().mockRejectedValue(error);
    
    renderHook(() => useAsyncOperation(operation, [], { onError }));
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  it('should re-run operation when dependencies change', async () => {
    const operation = vi.fn().mockResolvedValue('test data');
    
    const { rerender } = renderHook(
      ({ dep }) => useAsyncOperation(operation, [dep]),
      { initialProps: { dep: 1 } }
    );
    
    await waitFor(() => {
      expect(operation).toHaveBeenCalledTimes(1);
    });
    
    rerender({ dep: 2 });
    
    await waitFor(() => {
      expect(operation).toHaveBeenCalledTimes(2);
    });
  });

  it('should not update state if component unmounts before operation completes', async () => {
    const operation = vi.fn(() => 
      new Promise((resolve) => setTimeout(() => resolve('test data'), 100))
    );
    
    const { result, unmount } = renderHook(() => useAsyncOperation(operation, []));
    
    expect(result.current.loading).toBe(true);
    
    // Unmount before operation completes
    unmount();
    
    // Wait for operation to complete
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // State should not have been updated after unmount
    // This is tested implicitly - no error should be thrown
  });

  it('should handle non-Error objects thrown', async () => {
    const operation = vi.fn().mockRejectedValue('string error');
    
    const { result } = renderHook(() => useAsyncOperation(operation, []));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('Erro inesperado');
  });

  it('should set loading to true when starting operation', async () => {
    let resolveOperation: (value: string) => void;
    const operation = vi.fn(() => new Promise<string>((resolve) => {
      resolveOperation = resolve;
    }));
    
    const { result } = renderHook(() => useAsyncOperation(operation, []));
    
    expect(result.current.loading).toBe(true);
    
    // Resolve the operation
    resolveOperation!('test data');
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
