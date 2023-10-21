import { axios_treehole as axios } from "../../util/axios";
import { unwrap } from "../unwrap";
import { Punishment } from "./types";

export type ListPunishmentsByUserIdRequest = {
    id: number
}

export type ListPunishmentsByUserIdResponse = Punishment[]

export async function ListPunishmentsByUserId(req: ListPunishmentsByUserIdRequest): Promise<ListPunishmentsByUserIdResponse> {
    return await unwrap(() => axios.get(`/users/${req.id}/punishments`)) as ListPunishmentsByUserIdResponse
}
