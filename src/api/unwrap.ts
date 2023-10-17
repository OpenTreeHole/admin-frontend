import { toasts } from '../util/dialog'

type WithMessage = {
    message: string
}

function unwrap(resp: Promise<{ data: WithMessage }>): any {
    console.log("resp: ", resp);
    let ret = {}
    resp.then((data: { data: WithMessage }) => {
        console.log("success", data)
        toasts.success(data.data.message)
        ret = data
    }).catch((err) => {
        console.log("fail", err)
        toasts.error(err.message)
    })
    return ret
}

export {
    unwrap
}