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

function current_tag_list() {
  let reg_tester = new RegExp(reg.value)
  return tag_list.filter((tag) => {
    return reg_tester.test(tag.name)
  })
}

export default view((_) => {
  if (tag_list.length === 0) {
    _.embed(update)
  }
  _.$css`margin: 100px;`
  _._div({}, (_) => {
    _.$css`margin-top: 100px; margin-bottom: 20px;`
    _.mdSheet((_) => {
      _.mdTitle("Tag管理页面")
      _.mdInput(reg, "筛选，支持正则表达式")
      if (_.mdButton("刷新列表")) {
        _.embed(update)
      }
    })
  
    _.$css`margin-button: 100px; margin-top: 20px;`
    _.mdTable(
      (_) => {
        _._th({}, "#id")
        _._th({}, "标签名")
        _._th({}, "热度")
        _._th({}, "操作")
      },
      (_) => {
        _.for(
          current_tag_list(),
          (_item, index) => index,
          (value, index) => {
            _._tr({}, (_) => {
              _._td({}, value.id)
              _._td({}, value.name)
              _._td({}, value.temperature)
              // _.mdDialog("tag迁移", (_) => {

              // }, (_) => {
              //   _.mdButton
              // })
              _.$css`margin: 10px;`
              _.mdIntrinsicButton("迁移", "primary", false)
            })
          }
        )
      }
    )
  })
})