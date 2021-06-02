export interface RequestOptions extends RequestInit {
  headers?: Record<string, any>;
}
interface ResponseData<T> {
  statusCode: number;
  result: T;
  msg: string;
}

export function request<T>(url: string, params: Record<string, any> = {}, options: RequestOptions = {}) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  if (options.headers) {
    // 自定义headers
    const headersObj = options.headers;
    Object.entries(headersObj).forEach(([k, v]) => headers.append(k, v));
  }

  if (options.method === 'POST') {
    const contentType = headers.get('Content-Type');
    if (!contentType) {
      // 设置默认Content-Type
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      options.body = stringify(params);
    } else if (contentType.includes('application/json;charset=utf-8')) {
      // 针对不同的Content-Type, 对请求数据做相应的处理
      options.body = JSON.stringify(params);
    }
  }

  if (options.method === 'GET') {
    url = handleUrl(url, params);
  }

  return new Promise<ResponseData<T>>((resolve, reject) => {
    fetch(url, { credentials: 'include', ...options, headers })
      .then((response) => {
        const { status, ok, statusText } = response;
        if (status >= 200 && status < 300 && ok) {
          return response.json();
        }

        reject(new Error(JSON.stringify({ code: status, text: statusText })));
        return;
      })
      .then((data) => resolve(data))
      .catch((err: Error) => {
        reject(new Error(JSON.stringify({ code: -1, text: err.message })));
      });
  });
  // .catch((err) => {
  //   const { code, text } = JSON.parse(err.message)
  //   console.error(`code: ${code}, message: ${text}`)
  // })
}

const stringify = (data: Record<string, string>) => {
  return Object.entries(data)
    .filter(([k, v]) => k && v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
};

const handleUrl = (url: string, params: Record<string, any> = {}) => {
  if (!Object.keys(params).length) {
    return url;
  }

  const queryStr = stringify(params);

  if (!url.includes('?')) {
    return `${url}?${queryStr}`;
  }

  if (url.endsWith('?')) {
    return `${url}${queryStr}`;
  }

  return `${url}&${queryStr}`;
};

export const get = <T>(url: string, params: Record<string, any>, options: RequestOptions = {}) => {
  return request<T>(url, params, { method: 'GET', ...options });
};

export const post = <T>(url: string, params: Record<string, any>, options: RequestOptions = {}) => {
  return request<T>(url, params, { method: 'POST', ...options });
};
