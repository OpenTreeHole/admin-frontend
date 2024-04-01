import { useUserStore } from "@/store/user"
import { URL_MAPPER } from "./env";

export async function callApi(base: string, path: string, config: any) {
    
    const userStore = useUserStore()

    if (userStore.logined) {
        config.header.Authorization = `Bearer ${userStore.access_token}`;
    }

    let resp = await useFetch(URL_MAPPER[base] + path, config);

    // use refresh_token when token expred
    // Todo

    return resp;
}