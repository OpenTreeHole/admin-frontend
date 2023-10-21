import { d, view } from "refina"
import { login } from "../api/user/login"

import * as userStore from "../store"

let email = d("")
let password = d("")

export default view((_) => {
  _.$css`max-width: 800px; min-width: 300px; margin: 100px;`
  // _.$rootCss`display: flex;`
  // _.$css`align-self: center;`
  _.mdSheet((_) => {
    _.mdTitle("登录")
    _.mdInput(email, "邮箱")
    _.mdInput(password, "密码")
    if (_.mdButton("确定")) {
      login({
        email: email.value,
        password: password.value
      }).then((resp) => {
        userStore.setToken(resp.access, resp.refresh)
        _.$router.goto("/home")
      })
    }
  })
})
