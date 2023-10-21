import { unwrap } from "../unwrap";
import { axios_treehole as axios } from "../../util/axios";
import { Tag } from "./types";

export type CreateATagRequest = {
    name: string
}

export type CreateATagResponse = Tag

export async function CreateATag(req: CreateATagRequest): Promise<CreateATagResponse> {
    return await unwrap(() => axios.post('/tags', req)) as CreateATagResponse
}
