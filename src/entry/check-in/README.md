# 签到模块
## 引入
### PC 端
```javascript
import CheckIn from '@polyv/interactions-receive-sdk-ui-default/lib/PcCheckIn';   
```
### 移动端
```javascript
import CheckIn from '@polyv/interactions-receive-sdk-ui-default/lib/MobileCheckIn';  
```

## 使用方式
先实例化签到SDK，然后将其传入到签到组件中，以便内部进行相应逻辑处理。
组件内部监听到签到开始后，将触发 `to-show` 事件，此时接入方控制外层容器展示。
`to-hide` 事件触发后表示签到已结束或终止，应隐藏外层容器。
```html
<!-- 签到组件内容 -->
<check-in
  :lang="lang"
  :check-in-sdk="checkInSdk"
  @to-show="onSetCheckInVisible(true)"
  @to-hide="onSetCheckInVisible(false)"
/>
```

### Attributes
| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| checkInSdk | Object | 签到 SDK 实例 |
| lang | String | 语言 |

### Events
| 事件名 | 参数 | 含义 |
| --- | --- | --- |
| to-show | void | 需要展示签到弹窗 |
| to-hide | void | 需要隐藏签到弹窗 |
