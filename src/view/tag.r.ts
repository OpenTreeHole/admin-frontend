import { d, view } from "refina";
import { ListAllTagResponse, listAllTag } from "../api/tag/list";
// import { toasts } from "../util/dialog";

let tag_list: ListAllTagResponse = []

let update = view((_) => {
  listAllTag({}).then((data) => {
    tag_list = data
    _.$update()
  })
})

let reg = d("")

export default view((_) => {
  if (tag_list.length === 0) {
    _.embed(update)
  }
  _.$css`margin: 100px; margin-bottom: 20px;`
  _.mdSheet((_) => {
    _.mdTitle("Tag管理页面")
    _.mdInput(reg, "筛选，支持正则表达式")
    if (_.mdButton("刷新列表")) {
      _.embed(update)
    }
  })

  _.$css`margin: 100px; margin-top: 20px;`
  _.mdSheet((_) => {
    _.mdList((_) => {
      _.for(
      tag_list.filter((value) => {
        return new RegExp(reg.value).test(value.name)
      }),
      (_item, index) => index,
      (value, index) => {
        _.mdListItem((_) => {
          _._div({}, (_) => {
            _.t(`${value.name}　　　热度: ${value.temperature.toString()}　　　id: ${value.id}`)

          })
          
        })
      }
      )
    }) // mdTable还没实现……错了哥别拷打我了
  })
})