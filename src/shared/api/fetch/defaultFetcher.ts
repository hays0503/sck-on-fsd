const defaultFetcher = (url: string, options?: RequestInit) =>
    fetch(url, options).then((res) => res.json());

export default defaultFetcher;