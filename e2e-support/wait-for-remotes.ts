/**
 * Playwright global setup. The webServer entry only waits for the shell (4200),
 * but the shell needs both remotes to be compiled and serving their federation
 * metadata before the first test can render a page.
 */
const REMOTES = ['http://localhost:4201/remoteEntry.json', 'http://localhost:4202/remoteEntry.json'];

async function waitFor(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

export default async function globalSetup(): Promise<void> {
  await Promise.all(REMOTES.map(url => waitFor(url, 120_000)));
}
