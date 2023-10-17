import { view, d } from "refina"

export default view((_) => {
  _.route("login") && _.embed(() => import("./view/login.r"));
})

export const beforeRoute = view((_) => {
  if (_.beforeRoute()) {
    if (_.$routeTo !== 'login' && false) {
      _.$routeNext('login')
    } else {
      _.$routeNext()
    }
  }
})