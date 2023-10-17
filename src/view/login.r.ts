import { d, view } from "refina"
import { login } from "../api/user/login"

import axios from "../util/axios"

let email = d("")
let password = d("")

export default view((_) => {
  _.$css`max-width: 800px; margin: 100px;`
  // _.$rootCss`align: center;`
  _.mdSheet((_) => {
    _.mdTitle("登录")
    _.mdInput(email, "邮箱")
    _.mdInput(password, "密码")
    if (_.mdButton("确定")) {
      let resp = login({
        email: email.value,
        password: password.value
      })
      console.log(resp)
    }
  })
})
