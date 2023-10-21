import { unwrap } from "../unwrap";
import { axios_treehole as axios } from "../../util/axios";
import { Tag } from "./types";

export type DeleteATagRequest = {
    id: number,
    to: string
}

export type DeleteATagResponse = Tag

export async function deleteATag(req: DeleteATagRequest): Promise<DeleteATagResponse> {
    return await unwrap(() => axios.delete(`/tags/${req.id}`, { data: { to: req.to } })) as DeleteATagResponse;
}
