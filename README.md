# Admin-frontend

How to run the code:

create a file at util/env.ts and write:

```ts
export const AUTH = "https://url-to-auth/api"

export const TREEHOLE = "https://url-to-fdu-hole/api"

export const URL_MAPPER: {
    [key: string]: string
} = {
    AUTH, TREEHOLE
}
```
