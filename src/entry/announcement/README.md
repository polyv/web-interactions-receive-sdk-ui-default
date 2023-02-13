# 公告模块


## 引入

### PC 端
```javascript
import Announcement from '@polyv/interactions-receive-sdk-ui-default/lib/PcAnnouncement';
```

### 移动端
```javascript
import Announcement from '@polyv/interactions-receive-sdk-ui-default/lib/MobileAnnouncement';
```


## 使用方式

初始化公告 SDK 实例，并接入公告组件后，公告组件内部会处理具体的业务逻辑，接入方只需要提供一个容器，根据组件事件切换显示状态即可：

- 当讲师下发公告时，组件将触发 `to-show` 事件，此时可以展示容器；
- 讲师移除公告或者用户点击组件内的按钮进行确认时，将触发 `to-hide` 事件，此时可以隐藏容器。

```html
<announcement
  :lang="lang"
  :announcement-sdk="announcementSdk"
  @to-show="setAnnouncementVisible(true)"
  @to-hide="setAnnouncementVisible(false)"
/>
```

### Attributes

| 属性名 | 类型 | 默认值 | 含义 |
| --- | --- | --- | --- |
| lang | string | 补充默认值 | 语言 |
| announcementSdk | 补充默认值 | 公告 SDK 实例 |

### Events

| 事件名 | 说明 | 参数类型 | 参数含义 |
| --- | --- | --- | --- |
| to-show | 需要展示公告弹窗 | 无参数 | 无 |
| to-hide | 需要隐藏公告弹窗 | 无参数 | 无 |

### Methods
| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| markAnnounceReaded | void | 将当前公告记录到本地的已读记录中(认为用户已确认公告内容，并且刷新页面重新载入组件后，同一公告将不再触发 `to-show` 事件，直到观众清除localStorage或讲师重新发布公告) |
