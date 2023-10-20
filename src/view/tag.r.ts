import { d, view } from "refina";
import { ListAllTagResponse, listAllTag } from "../api/tag/list";
// import { toasts } from "../util/dialog";

let tag_list: ListAllTagResponse = []
let reg = d("")
let filtered_list: ListAllTagResponse = []
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

function paged_list(): ListAllTagResponse {
  return filtered_list.slice(page_size * cur_page, Math.min(page_size * (cur_page + 1), filtered_list.length))
}

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
                "tag迁移",
                (close) => (_) => {

                },
                (close) => (_) => {
                  if (_.mdButton("确认")) {
                    close();
                    // do something
                  }
                  _.mdButton("取消") && close();
                },
                (open) => {
                  _.$css`margin: 10px;`
                  _.mdIntrinsicButton("迁移", "primary", false) && open();
                }
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
        _.mdTitle(`${cur_page * page_size + 1} - ${Math.min((cur_page + 1) * page_size, filtered_list.length)}`)
        _.mdSpacer()
        if (_.mdIconButton("arrow_forward", false, cur_page === max_page)) {
          cur_page += 1;
        }
      }, false)
    })
  })
})