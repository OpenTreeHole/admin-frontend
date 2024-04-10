import { useUserStore } from "@/store/user"
import { URL_MAPPER } from "./env"

import Ajv, { type Schema } from 'ajv'
const ajv = new Ajv()

export async function callApi(schema: any, data: any, config: any = {}) {
    
    const NoResponse = {
        type: undefined,
        data: undefined
    }

    // check the request
    if (!ajv.validate(schema.requestSchema, data)) {
        console.error(`Invalid request data. Schema: ${schema.name}, Request: ${data}`)
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

    const path = URL_MAPPER[schema.base] + schema.path
    config.method = schema.method

    config.lazy = false

    if (schema.method !== 'GET') {
        config.body = data
    } else {
        config.query = data
    }

    // set callbacks
    let ret: any, status_code: number
    
    config.onResponse = ({ request, response, options }) => {
        // console.log('resp', response)
        // console.log(response.status)
        status_code = response.status
        ret = response._data
    }

    // config.onResponseError = ({ request, response, options }) => {
    //     console.log('err', response)
    // }

    // config.onRequest = ({ request, options }) => {
    //     console.log(request, options)
    // }
    
    // console.log(path, config)

    // call useFetch

    await useFetch(path, config).then(resp => {
        // const { data, error, status } = resp
        // console.log("data", data)
        // console.log("error", error)
        // console.log("status", status)
        // console.log(status_code)
        console.log(ret, status_code)
        for (let cur_schema in schema.responseSchema) {
            if (schema.responseSchema[cur_schema].status.includes(status_code)
            &&  ajv.validate(schema.responseSchema[cur_schema].schema, ret)) {
                return {
                    type: cur_schema,
                    data: ret
                }
            }
        }
    }).catch(err => {
        console.log(ret, status_code)
        for (let cur_schema in schema.responseSchema) {
            if (schema.responseSchema[cur_schema].status.includes(status_code)
            &&  ajv.validate(schema.responseSchema[cur_schema].schema, ret)) {
                return {
                    type: cur_schema,
                    data: ret
                }
            }
        }
    })

    // const {execute} = await useFetch(path, config)
    // execute().then(() => {
        // console.log(ret, status_code)
    // })

    // use refresh_token when token expred
    // Todo
    // setTimeout(function (){
        
        // console.log(ret, status_code)
    // }, 1000);



    // check the response schema
    console.log("No matched schema")
    return NoResponse
}