import { d, view } from "refina";
import { ListAllTagResponse, listAllTag } from "../api/tag/list";
import { Tag } from "../api/tag/types";
import { deleteATag } from "../api/tag/delete";
import { CreateATag } from "../api/tag/create";
// import { toasts } from "../util/dialog";

let tag_list: Tag[] = []
let reg = d("")
let filtered_list: Tag[] = []
const page_size = 20;
let cur_page = 0;
let max_page = 0;

let update_data = view((_) => {
  listAllTag({}).then((data) => {
    tag_list = data
    filtered_list = tag_list.filter(() => true)
    update_paging()
    _.$update()
  })
})

function update_filter() {
  try {
    let reg_tester = new RegExp(reg.value)
    filtered_list = tag_list.filter((tag) => reg_tester.test(tag.name))
    update_paging()
  } catch (e) {
    // ignore it
    // because reg may be invalid
  }
}

function update_paging() {
  cur_page = 0;
  max_page = Math.ceil(filtered_list.length / page_size) - 1;
}

function paged_list(): Tag[] {
  return filtered_list.slice(page_size * cur_page, page_size * (cur_page + 1))
}

let target = d("")
let target_filtered: Tag[] = []

let update_target = view((_) => {
  try {
    let reg = new RegExp(target.value)
    target_filtered = tag_list.filter((tag) => reg.test(tag.name))
    _.$update()
  } catch {
    // regex illegal
  }
})

export default view((_) => {
  if (tag_list.length === 0) {
    _.embed(update_data)
  }
  _.$css`margin: 100px;`
  _._div({}, (_) => {
    _.$css`margin-top: 100px; margin-bottom: 20px;`
    _.mdSheet((_) => {
      _.mdTitle("Tag管理页面")
      if (_.mdInput(reg, "筛选，支持正则表达式")) { // oninput event
        update_filter()
      }
      if (_.mdButton("刷新列表")) {
        _.embed(update_data)
      }
    })
  
    _.$css`margin-button: 20px; margin-top: 20px;`
    _.mdTable(
      (_) => {
        _._th({}, "#id")
        _._th({}, "标签名")
        _._th({}, "热度")
        _._th({}, "操作")
      },
      (_) => {
        _.for(
          paged_list(),
          (_item, index) => index,
          (value, index) => {
            _._tr({}, (_) => {
              _._td({}, value.id)
              _._td({}, value.name)
              _._td({}, value.temperature)
              _.mdDialog(
                (_, open) => {
                  _.$css`margin: 10px;`
                  _.mdIntrinsicButton("迁移", "primary", false) && open();
                },
                "tag迁移",
                (_) => {
                  if (_.mdInput(target, "目标标签")) {
                    _.embed(update_target)
                  }
                  if (target.value !== "") {
                    _._p({}, `备选项（超出20项将被隐藏） 目前有 ${target_filtered.length} 项`)
                    _.mdList((_) => {
                      _.for(
                        target_filtered.slice(0, 20),
                        (_item, index) => index,
                        (value, index) => {
                          if (_.mdListItem(value.name)) {
                            target.value = value.name
                            _.embed(update_target)
                          }
                        }
                      )
                    })
                  }
                },
                (_, close) => {
                  if (_.mdButton("确认")) {
                    close();
                    if (tag_list.filter((tag) => tag.name === target.value).length > 0) {
                      deleteATag({
                        id: value.id,
                        to: target.value,
                      })
                      console.log("Tag Deleted")
                    } else (async () => {
                      let new_tag = await CreateATag({
                        name: target.value
                      })
                      console.log("Tag Created", new_tag)
                      await deleteATag({
                        id: value.id,
                        to: target.value,
                      })
                      console.log("Tag Deleted")
                    })();
                  }
                  _.mdButton("取消") && close();
                },
              )
            })
          }
        )
      }
    )
    _.$css`margin-top: 20px; margin-bottom: 100px; padding: 10px;`
    _.mdSheet((_) => {
      _.mdToolbar((_) => {
        if (_.mdIconButton("arrow_back", false, cur_page === 0)) {
          cur_page -= 1;
        }
        _.mdSpacer()
        _.mdTitle(`${Math.min(cur_page * page_size + 1, filtered_list.length)} - ${Math.min((cur_page + 1) * page_size, filtered_list.length)}`)
        _.mdSpacer()
        if (_.mdIconButton("arrow_forward", false, cur_page === max_page)) {
          cur_page += 1;
        }
      }, false)
    })
  })
})