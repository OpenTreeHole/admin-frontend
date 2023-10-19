import { unwrap } from "../unwrap"
import { axios_treehole as axios } from "../../util/axios"

export type ListAllTagRequest = {
    s?: string
}

export type ListAllTagResponse = {
    id: number,
    name: string,
    temperature: number,
    tag_id: number
}[]

export async function listAllTag(req: ListAllTagRequest): Promise<ListAllTagResponse> {
    if (req.s !== undefined) {
        return await unwrap(axios.get('/tags', { params: req })) as ListAllTagResponse
    } else {
        return await unwrap(axios.get('/tags')) as ListAllTagResponse
    }
}
