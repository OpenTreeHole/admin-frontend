import { useUserStore } from "@/store/user"
import { URL_MAPPER } from "./env"

import Ajv, { type Schema } from 'ajv'
const ajv = new Ajv()

export async function callApi(schema: any, data: any, config: any = {}) {
    
    // check the request
    if (!ajv.validate(schema.requestSchema, data)) {
        console.error(`Invalid request data. Schema: ${schema.name}, Request: ${data}`)
        return
    }

    // wrap up request
    const userStore = useUserStore()

    if (schema.token && userStore.logined) {
        config.header = config.header ?? {}
        config.header["Authorization"] = `Bearer ${userStore.access_token}`
    }

    const path = URL_MAPPER[schema.base] + schema.path
    config.method = schema.method

    config.body = data

    // set callbacks
    let ret, status_code
    
    config.onResponse = ({ request, response, options }) => {
        console.log('resp', response)
        status_code = response.status
        ret = response._data
    }
    
    // call useFetch
    await useFetch(path, config)

    // use refresh_token when token expred
    // Todo
    
    console.log(ret)

    // check the response schema
    for (let cur_schema in schema.responseSchema) {
        if (schema.responseSchema[cur_schema].status.includes(status_code)
        &&  ajv.validate(schema.responseSchema[cur_schema].schema, ret)) {
            return {
                type: cur_schema,
                data: ret
            }
        }
    }


    return {
        type: undefined,
        data: undefined
    }
}