const LOCALE_EN = 'en';

export const buildUrlQueryString = (queryArgs: Record<string, string | undefined>) =>
    Object
        .entries(queryArgs)
        .filter(([, value]) => value != null)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB, LOCALE_EN))
        .reduce((searchParams, [key, value]) => {
            // $FlowFixMe
            value && searchParams.append(key, value);
            return searchParams;
        }, new URLSearchParams())
        .toString();
