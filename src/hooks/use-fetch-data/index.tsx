import { useEffect, useState, useCallback } from 'react';
import { request, RequestOptions } from '@utils/fetch';

interface CommonProps<TParams> {
  url: string;
  params?: TParams;
  options?: RequestOptions;
  data: any;
}

/* useFetchData函数参数 */
interface FetchDataProps<TParams> extends CommonProps<TParams> {
  autoFetch?: boolean;
  deps?: any[];
  transforms?: (state: State<TParams>, result: any) => State<TParams>;
}

/* 状态 */
interface State<TParams> extends CommonProps<TParams> {
  loading: boolean;
  loadFailed: boolean;
  fetchData: boolean;
  forceId: number;
  [k: string]: any;
}

interface Dispatches<TParams> {
  /* 请求参数变化 */
  setParams: (params: Partial<TParams>) => void;
  /* 请求路径、请求参数、请求配置变化 */
  setOptions: (url: string, params?: Partial<TParams>, options?: Partial<RequestOptions>) => void;
  /* 重新加载 */
  reload: () => void;
}

export default function useFetchData<TParams extends Record<string, any>>({
  url,
  data,
  transforms,
  params = {} as TParams,
  options = {},
  autoFetch = true,
  deps = [],
}: FetchDataProps<TParams>): [State<TParams>, Dispatches<TParams>] {
  const [state, setState] = useState<State<TParams>>({
    loading: !autoFetch,
    loadFailed: false,
    fetchData: autoFetch,
    data,
    url,
    params,
    options,
    forceId: Date.now(),
  });

  useEffect(() => {
    async function getData() {
      setState((state) => ({ ...state, loading: true }));

      if (!options.method) {
        options.method = 'GET';
      }

      try {
        const res = await request(state.url, state.params, state.options);
        if (res.statusCode === 1) {
          setState((state) => {
            if (transforms) {
              state = transforms(state, res.result);
            }
            return { ...state, loading: false, loadFailed: false, fetchData: true };
          });
        } else {
          setState((state) => ({ ...state, loading: false, loadFailed: true, fetchData: true }));
        }
      } catch (err) {
        setState((state) => ({ ...state, loading: false, loadFailed: true, fetchData: true }));
      }
    }

    if (state.fetchData) {
      getData();
    }
  }, [state.url, state.params, state.options, state.fetchData, state.forceId, ...deps]);

  const setParams = useCallback(
    (params) => {
      setState((state) => ({ ...state, params: { ...state.params, ...params }, fetchData: true }));
    },
    [state.params],
  );

  const setOptions = useCallback(
    (url: string, params = {}, options: RequestOptions = {}) => {
      setState((state) => ({
        ...state,
        url,
        params: { ...state.params, ...params },
        options: { ...state.options, ...options },
      }));
    },
    [state.url, state.params, state.options],
  );

  const reload = useCallback(() => {
    setState((state) => ({ ...state, forceId: Date.now() }));
  }, [state.forceId]);

  return [state, { setParams, setOptions, reload }];
}
