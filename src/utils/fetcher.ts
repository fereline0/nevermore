export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((r) => r.json());
