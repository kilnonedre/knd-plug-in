import FetchWrapper from '@/http/fetchWrapper'
import types from './loginType'

const basePath = '/users'

export const Login = (params: types.ConfigLoginReq) =>
  FetchWrapper.post<types.ConfigLoginReq, types.ConfigLoginRes>({
    url: `${basePath}/login`,
    params,
  })
