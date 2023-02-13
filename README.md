# 标准场景互动功能接收端 demo
本文档仅供开发所需，所有入口组件均已发布到 polyv npm 平台，若仅需要接入互动功能模块，请参考 README.publish.md 文件。

## 项目启动
在根目录安装依赖:
```
npm i
```

```
npm run dev
```


## 目录说明
- `src/components/`
  存放场景下各种公共组件
- `src/demo/`
  存放 demo 组件，展示如何引入及使用对应场景的组件
- `src/entry/`
  提供各互动功能模块下集成度较高的入口组件，互动模块通常在PC和移动端展示上有区别，命名入口文件名需要带Mobile和Pc进行区分。

## 定制化修改
1. 使用现成的大部分公共组件，参考 entry 组件部分逻辑，实现小范围的修改定制，比如修改提示消息效果、修改答题过程交互效果等
2. 参考互动功能 SDK 的 API 及现有的公共组件逻辑，实现深度定制互动模块，甚至可以切换不同的技术栈实现互动模块。


## 组件说明
互动模块组件中不包含modal弹窗，需要接入方根据实际需求，编写弹窗及根据组件事件控制弹窗显示。

## demo-main
### 示例代码目录
- default/src/demo/demo-main
  提供实例化聊天室 SDK 和 互动接收端 SDK 的示例代码，引入entry目录的入口组件，传入对应core实例，即可展示互动功能。
### 聊天室 SDK
[文档](https://help.polyv.net/index.html#/live/js/chat_js_sdk_api)
### 互动接收端 SDK
[文档](https://help.polyv.net/index.html#/live/js/new_sdk/interactions_receive_sdk/sdk/overview)

## 打包命令
运行构建命令
```
npm run build-lib
```
将entry目录的入口组件进行打包，生成dist目录。

