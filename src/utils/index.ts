export const getOriginURL = (urlRaw: string) => {
  const url = new URL(urlRaw);

  return url.origin;
};
