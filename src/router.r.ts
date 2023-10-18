import { view, d } from "refina"
import * as userStore from "./store";

export default view((_) => {
  _.route("login") && _.embed(() => import("./view/login.r"));
  _.route("home") && _.embed(() => import("./view/home.r"));
})

export const beforeRoute = view((_) => {
  if (_.beforeRoute()) {
    if (! userStore.logined()) {
      _.$routeNext('/login')
    } else {
      if (_.$routeTo === '/login') {
        _.$routeNext('/home')
      } else {
        _.$routeNext()
      }
    }
  }
})