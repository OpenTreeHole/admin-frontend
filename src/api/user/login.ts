import { unwrap } from "../unwrap"
import { axios_auth as axios } from "../../util/axios"
import { AUTH } from "../../util/server"

const path = AUTH + "/login"

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    access: string,
    refresh: string,
    message: string
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
    return await unwrap(axios.post(path, req)) as LoginResponse
}
