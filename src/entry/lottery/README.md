# 抽奖模块
在本项目中(默认场景), 抽奖功能包括三大组件：抽奖中、抽奖结束和个人中奖记录，依据抽奖流程进行展示。
## 抽奖中
“抽奖中”组件显示抽奖动效。讲师/助教等发起端发起一次抽奖时，"抽奖中" 组件会触发相应事件，接入方根据事件控制容器/模态框的可见性。
### 引入
#### PC 端
```javascript
import OnLottery from '@polyv/interactions-receive-sdk-ui-default/lib/PcOnLottery';
```

#### 移动端
```javascript
import OnLottery from '@polyv/interactions-receive-sdk-ui-default/lib/MobileOnLottery';
```
### 使用方式
```html
<!-- 抽奖中 -->
<on-lottery
  v-show="isLotteryShowing"
  :lang="lang"
  :lottery-sdk="lotterySdk"
  :delay-time="delayTime"
  :pattern="lotteryPattern"
  @lottery-status-changed="onLotteryStatusChange"
  @is-show-changed="onLotteryShowChange"
/>
```
#### Attributes
| 属性名     | 类型   | 含义          |
| ---------- | ------ | ------------- |
| lang | String | 语言 |
| lotterySdk | Object | 抽奖 SDK 实例 |
| delayTime | Number | 延迟触发显示时间，单位毫秒 |
| pattern | String | 抽奖动效类型，可选default(默认)和box(盒子动效)  |

#### Events
| 事件名                 | 参数 | 含义             |
| ---------------------- | ---- | ---------------- |
| to-show                | void | 需要展示弹窗     |
| to-hide                | void | 需要展示弹窗     |
| lottery-status-changed | void | 抽奖状态发生变化 |
| is-show-changed        | void | 是否发生变化     |

------

## 抽奖结束
“抽奖结束” 组件显示该轮次中的个人中奖结果，以及中奖人列表。讲师结束抽奖后，组件会触发相应事件，同样，接入方根据事件去控制组件可见性即可。
`status-changed` 事件会提供组件内部的几种状态，可依据此状态处理部分交互逻辑，比如展示返回按钮用于从 “中奖名单” 返回到 “中奖结果”。
```
{
  isShowLotteryEnd: '中奖结果',
  isShowWinnerList: '中奖名单',
  isShowSubmitInfo: '填写联系信息',
}
```
另外，此组件提供 `setLottery` 方法，用于外部传入特定场次的中奖记录，给用户去补填该次中奖信息。具体中奖信息可从下文提到的 “个人中奖记录” 组件中获取。
### 引入
#### PC 端
```javascript
import LotteryEnd from '@polyv/interactions-receive-sdk-ui-default/lib/PcLotteryEnd';
```

#### 移动端
```javascript
import LotteryEnd from '@polyv/interactions-receive-sdk-ui-default/lib/MobileLotteryEnd';
```
### 使用方式
```html
<!-- 抽奖结果 -->
<lottery-end
  ref="lotteryEnd"
  :lang="lang"
  :delay-time="delayTime"
  :lottery-sdk="lotterySdk"
  @to-show="setLotteryResultShow"
  @to-hide="setLotteryResultHide"
  @status-changed="onStatusChanged"
/>
```
#### Attributes
| 属性名     | 类型   | 含义          |
| ---------- | ------ | ------------- |
| lang | String | 语言 |
| lotterySdk | Object | 抽奖 SDK 实例 |
| delayTime | Number | 延迟触发显示时间，单位毫秒 |
#### Events
| 事件名         | 参数           | 含义                                                                                                                                |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| to-show        | void           | 需要展示弹窗                                                                                                                        |
| to-hide        | void           | 需要展示弹窗                                                                                                                        |
| status-changed | String | 提示抽奖结束弹窗内部状态变化。isShowLotteryEnd: 抽奖结束， isShowWinnerList: 显示中奖人名单，isShowSubmitInfo: 显示填写信息 |
#### Methods
| 方法名     | 参数          | 说明                                                                                               |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------- |
| setLottery | `lotteryInfo`: Object | 设置中奖结束弹窗信息。用于内部控制"抽奖结束"弹窗状态，也可以用于外部根据中奖列表传入特定轮次的中奖信息。 |
| toBack     | status: String        | 返回到"抽奖结束"的显示状态                                                                                 |

------

## 个人中奖记录
在一场直播中，讲师可能会发起多轮抽奖，本组件可以展示特定直播场次中用户的所有中奖记录。

### 引入
#### PC 端
```javascript
import LotteryRecord from '@polyv/interactions-receive-sdk-ui-default/lib/PcLotteryRecord';
```

#### 移动端
```javascript
import LotteryRecord from '@polyv/interactions-receive-sdk-ui-default/lib/MobileLotteryRecord';
```

### 使用方式
```html
<!-- 个人中奖记录 -->
<lottery-record
  :lottery-sdk="lotterySdk"
  :lang="lang"
  @lottery-list="onLotteryRecord"
  @submit-info="onClickRecord"
  @check-info="onClickRecord"
/>
```
#### Attributes
| 属性名     | 类型   | 含义          |
| ---------- | ------ | ------------- |
| lotterySdk | Object | 抽奖 SDK 实例 |
| lang | String | 语言 |
#### Events
以下事件具体参数可以查看 typedoc 文档。

| 事件名 | 参数 | 含义  |
| ------------ | ----------------------- | --- |
| lottery-list | SdkLotteryRecordRes: Object | 个人中奖记录列表数据，可用于判断是否需要展示中奖记录列表   |
| submit-info  | SdkLotteryRecordResItem: Object | 点击填写信息按钮，触发该事件。事件数据为具体中奖条目。可用于调出组件填写提交中奖信息。 |
| check-info   | SdkLotteryRecordResItem: Object | 点击"已填写"按钮，触发该事件。事件数据为具体中奖条目。可用于调出组件查看已填写的具体信息。 |

接入方可以在SDK初始化后即调用该组件，在需要的时机展示组件。组件初始化、监听到抽奖状态变化或者个人领奖状态变化后，会获取用户最新中奖记录数据，并触发 `lottery-list` 事件，该事件参数为用户中奖数据列表，可以据此列表数据判断用户是否有未填写领取信息的奖项，便于实现提示红点等UI交互。

用户点击个人中奖记录组件中的“领奖”按钮时，该组件会触发 `submit-info` 事件，并在事件参数中提供对应轮次中奖数据。接入方监听到该事件后，可调用“抽奖结束组件” 的 `setLottery`方法并将对应数据传入，然后展示“抽奖结束组件”，该组件将展示对应轮次抽奖的结果信息(包括是否中奖、是否已提交领奖信息)。用户点击“已领取”按钮时触发 `check-info` 的事件同`submit-info` 事件，此时将"抽奖结束"组件显示出来，可查看当时观众填写的信息。

------


## 抽奖侧边挂件
在发起抽奖之后, 当处于抽奖过程中都会出现抽奖挂件, 抽奖状态的变化会影响挂件文案内容, 通过点击挂件可查看当前的抽奖状态.

### 引入
#### PC 端
```javascript
import LotteryWidget from '@polyv/interactions-receive-sdk-ui-default/lib/PcLotteryWidget/index';
```
#### 移动端
```javascript
import LotteryWidget from '@polyv/interactions-receive-sdk-ui-default/lib/MobileLotteryWidget/index';
```
### 使用方式
```html
  <lottery-widget
    v-if="lotteryStatus"
    :left-time="leftTime"
    :lottery-status="lotteryStatus"
  />
```
#### Attributes
| 属性名        | 类型   | 含义                 |
| ------------- | ------ | -------------------- |
| lotterySdk    | Object | 抽奖 SDK 实例        |
| leftTime      | number | 定时抽奖时的倒计时数 |
| lotteryStatus | String | 当前抽奖状态         |
------
