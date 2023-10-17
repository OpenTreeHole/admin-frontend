import MdUI from "@refina/mdui"
import { app as refina_app } from "refina"
import "@refina/mdui"
import "@refina/mdui/styles.css"
import Router from "@refina/router";
import router, { beforeRoute } from "./router.r";
import './util/store'

let app = refina_app
  .use(MdUI)
  .use(Router);

app((_) => {
  _.mdAppbar("toolbar", (_) => {
    _.mdToolbar((_) => {
      _.mdIcon("menu")
      _.mdTitle("树洞后台管理平台")
      _.mdSpacer()
      _.mdIcon("star")
    })
  })
  _.embed(beforeRoute)
  _.embed(router)
})