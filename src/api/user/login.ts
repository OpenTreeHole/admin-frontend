import { unwrap } from "../unwrap"
import axios from "../../util/axios"
import { AUTH } from "../../util/server"

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    access: string,
    refresh: string,
    message: string
}

export function login(req: LoginRequest): LoginResponse {
    console.log(req)
    return unwrap(axios.post(AUTH + "/login", req)) as LoginResponse
}
