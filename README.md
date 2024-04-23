# Admin-frontend

Create `.env` and set `NUXT_PUBLIC_AUTH_BASE` and `NUXT_PUBLIC_TREE_HOLE_BASE` in it.

Then, run `pnpm dev` to start the dev server.

In production environment, the `.env` will not be loaded. Please set the environment before running.

```bash
export NUXT_PUBLIC_AUTH_BASE="https://url-to-auth/api"
export NUXT_PUBLIC_TREE_HOLE_BASE="https://url-to-fdu-hole/api"
```

```powershell
$env:NUXT_PUBLIC_AUTH_BASE="https://url-to-auth/api"
$env:NUXT_PUBLIC_TREE_HOLE_BASE="https://url-to-fdu-hole/api"
```
