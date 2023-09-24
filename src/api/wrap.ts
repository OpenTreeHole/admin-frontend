import type { AxiosResponse } from 'axios'

function wrap<T>(val: Promise<AxiosResponse<any, any>>): Promise<T> {
  return new Promise((res, rej) => {
    val
      .then((val) => {
        if (val.status !== 200) {
          rej('Request failed.')
        }
        res(val.data as T)
      })
      .catch((e) => {
        rej(e)
      })
  })
}

export { wrap }
