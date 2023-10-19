import { view } from "refina"


const tools = [
  {
    name: "tag标签管理",
    route: "/tag"
  }, {
    name: "用户封禁管理",
    route: "/ban"
  }, {
    name: "登出",
    route: "/logout"
  }
]

export default view((_) => {
  _.$css`margin: 100px;`
  _._div({}, (_) => {
    _.$css`display: flex`
    _._div({}, (_) => {
      _.for(
        tools,
        (_item, index) => index,
        (value, index) => {
          _.$css`margin: 10px;`
          _.$css`min-width: 300px;`
          _.$css`max-width: 500px;`
          _.mdSheet((_) => {
            _.mdTitle(value.name)
            _._br();
            _._br();
            _._br();
            _.mdDivider();
            _._br();
            if (_.mdButton("进入服务")) {
              _.$router.goto(value.route)
            }
          })
        }
      );
    })


  })

})