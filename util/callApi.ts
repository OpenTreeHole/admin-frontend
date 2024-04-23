import { useUserStore } from "@/store/user"
import { URL_MAPPER } from "./env"
import Ajv, { type Schema } from 'ajv'
const ajv = new Ajv()

export async function callApi(schema: any, payload: any, config: any = {}, param: any = {}) {
    
    const NoResponse = {
        type: undefined,
        data: undefined
    }

    // check the request
    if (!ajv.validate(schema.requestSchema, payload)) {
        console.error(`Invalid request data. Schema: ${schema.name}, Request: ${payload}`)
        return NoResponse
    }

    // wrap up request
    const userStore = useUserStore()

    if (schema.token) {
        if (! userStore.logined) {
            console.error('Token required but user not logged in.')
            return NoResponse
        }
        config.headers = config.headers ?? {}
        config.headers["Authorization"] = `Bearer ${userStore.access_token}`
    }

    let path = URL_MAPPER[schema.base] + schema.path

    for (let cur_param in param) {
        path = path.replace(`:${cur_param}:`, param[cur_param])
    }

    config.method = schema.method

    config.lazy = false

    if (schema.method !== 'GET') {
        config.body = payload
    } else {
        config.query = payload
    }

    let status_code, ret

    config.onResponse = function({ request, response, options }) {
        status_code = response.status
        ret = response._data
        console.log(status_code, ret)
    }

    await useFetch(path, config)
    
    for (let cur_schema in schema.responseSchema) {
        // console.log(schema.responseSchema[cur_schema])
        if (schema.responseSchema[cur_schema].status.includes(status_code)
        &&  ajv.validate(schema.responseSchema[cur_schema].schema, ret)) {
            return {
                type: cur_schema,
                data: ret
            }
        }
    }
    console.log("No matched schema")
    return NoResponse

}