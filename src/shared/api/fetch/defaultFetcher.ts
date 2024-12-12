const defaultFetcher = (url: string, options?: RequestInit) =>
    fetch(url, options).then((res) => res.json()).catch((err) => console.log(`${url}=>${err}`));

export default defaultFetcher;