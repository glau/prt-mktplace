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

      try { console.info('[MSW] Starting worker...'); } catch {}
      await worker.start({
        onUnhandledRequest: 'warn',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        quiet: false,
      });
      try { console.info('[MSW] Worker started and ready.'); } catch {}
    });
  }

  await workerReady;
}
