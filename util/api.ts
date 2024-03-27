import { AUTH, TREEHOLE } from "./env"

export enum Server {
    AUTH,
    TREEHOLE
};

export function api(server: Server, url: string) {
    if (server == Server.AUTH) {
        return AUTH + url;
    }

    if (server == Server.TREEHOLE) {
        return TREEHOLE + url;
    }
}