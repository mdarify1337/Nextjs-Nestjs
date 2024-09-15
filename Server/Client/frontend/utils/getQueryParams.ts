export function getQueryParams(search: string): Record<string, string> {
    return search
      .substring(1)
      .split("&")
      .reduce((result: Record<string, string>, value: string) => {
        const [key, val] = value.split("=");
        result[key] = decodeURIComponent(val);
        return result;
      }, {});
  }
  