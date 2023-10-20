import { unwrap } from "../unwrap"
import { axios_treehole as axios } from "../../util/axios"
import { Tag } from "./types"

export type ListAllTagRequest = {
    s?: string
}

export type ListAllTagResponse = Tag[]

export async function listAllTag(req: ListAllTagRequest): Promise<ListAllTagResponse> {
    if (req.s !== undefined) {
        return await unwrap(axios.get('/tags', { params: req })) as ListAllTagResponse
    } else {
        return await unwrap(axios.get('/tags')) as ListAllTagResponse
    }
}
