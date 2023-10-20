import { toasts } from '../util/dialog'

export async function unwrap(resp: Promise<{ data: any }>): Promise<any> {
    let ret = {}
    await resp.then((data: { data: any }) => {
        if (data.data.message !== undefined) {
            toasts.success(data.data.message)
        }
        ret = data.data
    }).catch((err) => {
        console.log("fail", err)
        toasts.error(err)
    })
    return ret
}
