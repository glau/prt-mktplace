let workerReady: Promise<void> | null = null;

export async function initMocks(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  if (!workerReady) {
    workerReady = import('./browser').then(async ({ worker }) => {
      if (!worker) {
        return;
      }

      await worker.start({
        onUnhandledRequest: 'bypass',
      });
    });
  }

  await workerReady;
}
