# 答题卡模块

答题卡分为普通答题和快速问答。
- 快速问答只有单选/多选答题形式。
- 普通答题功能相对快速问答来说较为齐全，包含单选、多选、评分和投票题目。普通答题还可以使用答题限时功能，答题者需在限定时间内进行答题。

两者采用同样的事件体系，所以仅需要实例化一个答题卡SDK，将同一个实例传给两种不同的答题组件使用。

## 普通答题

### 引入
#### PC 端
```javascript
import AnswerCard from '@polyv/interactions-receive-sdk-ui-default/lib/PcAnswerCard/index';
```
#### 移动端
```javascript
import AnswerCard from '@polyv/interactions-receive-sdk-ui-default/lib/MobileAnswerCard/index';
```

### 使用方式

普通答题有单选、多选、评分和投票这几种题型，并且还具有限时答题功能。答题卡组件内部基于 SDK 处理了大部分业务逻辑，接入方仅需监听 `to-show` 和 `to-hide` 事件，去控制组件的可见性即可。另外，`status-changed` 事件会在答题数据发生变化时触发，并且含有答题状态，可根据该状态做相应处理，比如修改模态框/提示文字等。

```html
<answer-card
  :answer-card-sdk="answerCardSdk"
  :lang="lang"
  :delay-time="delayTime"
  @to-show="onSetAnswerCardVisible(true)"
  @to-hide="onSetAnswerCardVisible(false)"
  @status-changed="onStatusChanged"
/>
```
#### Attributes
| 属性名 | 类型 | 默认值 | 含义 |
| --- | --- | --- | --- |
| answerCardSdk | object | null | 答题卡 SDK 实例 |
| lang | string | 'zh_CN' | 语言 |
| delayTime | number | 移动端 8000，PC端 2000 | 延迟触发显示时间，单位毫秒 |


#### Events
| 事件名 | 说明 | 参数类型 | 事件含义 |
| --- | --- | --- | --- |
| to-show | 题目数据 | object | 需要展示弹窗 |
| to-hide | 题目数据 | object | 需要隐藏弹窗 |
| success-submit | 提交成功 | - | 成功提交答案事件回调 |
| status-changed | 答题卡内部展示状态发生变化, isShowQuestion(PC、移动端组件共有状态)、isShowResult(PC、移动端组件共有状态)、isShowAnswer(显示答案，移动端组件特有状态) | string | 可根据此状态，执行修改弹窗标题等操作。见demo示范。 |

##### to-show 事件参数说明
to-show 事件包含一个对象类型的事件参数，该对象具体字段如下。

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| itemType | string | 答题卡类型 |
| type | string | 题目类型 |
| name | string | 题目描述 |
| questionId | string | 题目id |
| duration | number | 限时题目特有字段，答题时间，单位秒 |
| options | string[] | 选项数组 |
| tips | string[] | 提示数组(评分题特有，分值提示) |

##### to-hide 事件参数说明
to-hide 事件包含一个对象类型的事件参数，该对象具体字段如下。

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| itemType | string | 答题卡类型 |
| type | string | 题目类型 |
| questionId | string | 题目id |


#### Methods

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| backToResult | 无 | 将答题卡组件内部状态切换成"isShowResult" (查看结果) 状态，仅适用于移动端组件 |

-----

## 快速问答

快速问答界面与普通答题不同，且仅包含单选和多选题目。接入逻辑同普通答题。可基于 `to-show` 和 `to-hide` 事件的参数判断题目为单选/多选。

### 引入
- PC 端
```javascript
import QuickAnswerCard from '@polyv/interactions-receive-sdk-ui-default/lib/PcQuickAnswer/index';
```
- 移动端
```javascript
import QuickAnswerCard from '@polyv/interactions-receive-sdk-ui-default/lib/MobileQuickAnswer/index';
```

### 使用方式
同样地，PC端快速问答仅提供内容元素，所以需要接入方设置容器元素和控制可见性。

```html
<!-- 快速问答 PC 端 -->
<quick-answer-card
  :lang="lang"
  :answer-card-sdk="answerCardSdk"
  :delay-time="3000"
  @to-show="(question) => onSetQuickAnswerCardVisible(true, question)"
  @to-hide="(question) => onSetQuickAnswerCardVisible(false, question)"
/>

```

而web移动端展示形式为横向长条形的答题卡，目前SaaS会将其展示在移动端菜单之上。
```html
<!-- 快速问答移动端 -->
<quick-answer-card
  :answer-card-sdk="answerCardSdk"
  :delay-time="delayTime"
  :lang="lang"
/>
```

#### Attributes
| 属性名 | 类型 | 默认值 | 含义 |
| --- | --- | --- | --- |
| answerCardSdk | object | null | 答题卡 SDK 实例 |

#### Events
| 事件名 | 参数 | 事件含义 |
| --- | --- | --- |
| to-show | void | 需要展示组件 |
| to-hide | void | 需要隐藏组件 |
