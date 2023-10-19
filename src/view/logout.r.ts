import { view } from "refina";
import * as userStore from "../store/user"
import { toasts } from "../util/dialog";

export default view((_) => {
  userStore.logout()
  toasts.success("已登出")
  _.$router.goto("/login")
})
