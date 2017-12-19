// возвращает cookie с именем name, если есть, если нет, то undefined
export const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'  // eslint-disable-line no-useless-escape
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

