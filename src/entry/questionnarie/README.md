## 问卷模块
### 引入
#### PC 端
```javascript
import Questionnaire from '@polyv/interactions-receive-sdk-ui-default/lib/PcQuestionnarie'; 
```
#### 移动端
```javascript
import Questionnaire from '@polyv/interactions-receive-sdk-ui-default/lib/MobileQuestionnarie';
```

### 使用方式
```html
<questionnaire
  :questionnaire-sdk="questionnaireSdk"
  :lang="lang"
  :delay-time="delayTime"
  @status-changed="onStatusChanged"
  @to-show="onSetQuestionnaireVisible(true)"
  @to-hide="onSetQuestionnaireVisible(false)"
/>
```
### attributes
| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| lang | String | 语言 |
| questionnaireSdk | Object | 问卷 SDK 实例 |
| delayTime | Number | 延迟触发显示时间，单位毫秒 |

### events
| 事件名 | 参数 | 含义 |
| --- | --- | --- |
| status-changed | String | 问卷内部的弹窗状态，包括 isShowQuestion(显示问卷题目)、isShowResult(显示问卷结果)、isShowAnswer(同显示问卷结果) |
| to-show | void | 需要展示问卷弹窗 |
| to-hide | void | 需要隐藏问卷弹窗 |

isShowResult、isShowAnswer 均为显示问卷统计结果的状态。