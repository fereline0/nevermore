export const clientFetcher = (url: string, init?: RequestInit) => {
  const defaultInit = {
    headers: {
      "API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  };
  const finalInit = { ...defaultInit, ...init };

  return fetch(url, finalInit).then((r) => r.json());
};

export const serverFetcher = async (url: string, init?: RequestInit) => {
  const defaultInit = {
    headers: {
      "API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  };
  const finalInit = { ...defaultInit, ...init };

  const res = await fetch(url, finalInit);

  return res;
};
