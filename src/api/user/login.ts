import axios from '../../plugins/axios'
import { wrap } from '../wrap'

type UserLoginApiRequest = {
  email: string
  password: string
}

type UserLoginApiResponse =
  | {
      access: string
      refresh: string
      message: string
    }
  | {
      data: {}
      message: string
    }

function login(req: UserLoginApiRequest): Promise<UserLoginApiResponse> {
  return wrap(axios.post('/login', req))
}

export { login }
