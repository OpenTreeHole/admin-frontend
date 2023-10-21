import { toasts } from '../util/dialog'
import { refreshJwtToken } from './token/refresh'

export async function unwrap(req: () => Promise<{ data: any }>): Promise<any> {
    let ret = {}
    
    await req().then((data: { data: any }) => {
        if (data.data.message !== undefined) {
            toasts.success(data.data.message)
        }
        ret = data.data
    }).catch(async (err) => {
        console.log("Before Error: ", err);
        if (err.response.status === 401) {
            console.log("Token Expired")
            await refreshJwtToken()
            await req().then((data: { data: any }) => {
                if (data.data.message !== undefined) {
                    toasts.success(data.data.message)
                }
                ret = data.data
            }).catch((err) => {
                console.log("failed after refresh_token.", err)
                toasts.error(err)
            })
        } else {
            console.log("failed.", err)
            toasts.error(err)
        }
    })
    return ret
}
