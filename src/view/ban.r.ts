import { d, view } from "refina";
import { Punishment } from "../api/penalty/types";
import { ListPunishmentsByUserId } from "../api/penalty/list";
import { toasts } from "../util/dialog";

let user_id = d("")
let punishments: Punishment[] = []

let updatePunishments = view((_) => {
  ListPunishmentsByUserId({
    id: parseInt(user_id.value)
  }).then((pun) => {
    punishments = pun;
    toasts.success("查询成功")
    _.$update()
    console.log(punishments)
  })
})

function UTCToTime(t: string): string {
  let d = new Date(t)
  return d.toLocaleDateString() + " " + d.toLocaleTimeString()
}

function secondToTime(t: number): string {
  t /= 1000;
  // 输出 x天x时x分x秒
  let day = Math.floor(t / (60 * 60 * 24));
  let hour = Math.floor(t / (60 * 60)) - day * 24;
  let min = Math.floor(t / 60) - day * 24 * 60 - hour * 60;
  let sec = Math.floor(t) - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
  // 如果 hour=0 就不用输出 x时，其余同理
  let str = "";
  if (day > 0) {
    str += day + "天";
  }
  if (hour > 0) {
    str += hour + "小时";
  }
  if (min > 0) {
    str += min + "分";
  }
  if (sec > 0) {
    str += sec + "秒";
  }
  return str;
}

export default view((_) => {
  _.$css`margin: 100px;`
  _._div({}, (_) => {
    _.$css`margin-bottom: 20px;`
    _.mdSheet((_) => {
      _.mdTitle("查询用户封禁记录")
      _.mdInput(user_id, "用户 id")
      if (_.mdButton("查询")) {
        _.embed(updatePunishments)
      }
    })

    _.$css`margin-top: 20px;`
    _.mdTable(
      (_) => {
        _._th({}, "创建时间")
        _._th({}, "开始时间")
        _._th({}, "持续时间")
        _._th({}, "结束时间")
        _._th({}, "封禁操作者")
        _._th({}, "封禁原因")
        _._th({}, "相关楼层")
      },      
      (_) => {
        _.for(
          punishments,
          (_item, index) => index,
          (value, index) => {
            _._tr({}, (_) => {
              _._td({}, UTCToTime(value.created_at))
              _._td({}, UTCToTime(value.start_time))
              _._td({}, secondToTime(value.duration))
              _._td({}, UTCToTime(value.end_time))
              _._td({}, value.made_by)
              _._td({}, value.reason)
              _._td({}, "##" + value.floor_id)
            })
          }
        )
      }
    )
  })
})