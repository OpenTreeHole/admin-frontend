import { setToken } from "../../store"
import { axios_auth as axios } from "../../util/axios"

export type RefreshJwtTokenResponse = {
    access: string,
    refresh: string,
    message: string
}

export async function refreshJwtToken(){
    console.log("Start Refreshing Token")
    await axios.post('/refresh').then((data) => {
        console.log("Refreshing", data)
        let ret = data.data as RefreshJwtTokenResponse
        setToken(ret.access, ret.refresh)
    }).catch((err) => {
        console.error("Refresh-Token Error: ", err)
    })
    console.log("Refreshing Token End.")
}