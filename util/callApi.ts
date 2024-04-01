

export async function callApi(base: string, path: string, config: any) {
    let resp = await useFetch(base + path, config);

    // use refresh_token when token expred
    // Todo

    return resp;
}