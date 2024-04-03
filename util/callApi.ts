import { useUserStore } from "@/store/user"
import { URL_MAPPER } from "./env";

export async function callApi(base: string, path: string, config: any) {
    
    const userStore = useUserStore()

    if (userStore.logined) {
        if (! config.header) {
            config.header = {}
        }
        config.header["Authorization"] = `Bearer ${userStore.access_token}`;
    }
    console.log(URL_MAPPER[base] + path, config)

    let resp;
    try {
        resp = await useFetch(URL_MAPPER[base] + path, config);
    } catch (err) {
        console.log(err);
    }

    console.log(resp)
    // use refresh_token when token expred
    // Todo

    return resp;
}