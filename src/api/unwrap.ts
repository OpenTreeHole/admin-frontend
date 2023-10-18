import { toasts } from '../util/dialog'

type WithMessage = {
    message: string
}

export async function unwrap(resp: Promise<{ data: WithMessage }>): Promise<any> {
    let ret = {}
    await resp.then((data: { data: WithMessage }) => {
        toasts.success(data.data.message)
        ret = data.data
    }).catch((err) => {
        console.log("fail", err)
        toasts.error(err.message)
    })
    return ret
}
