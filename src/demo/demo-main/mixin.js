/**
 * @file demo 组件公共逻辑
 */

import { Chat } from '@polyv/chat-sdk';
import { updateConfig, getApiToken, RequestAuthorizeMethod } from '@polyv/interactions-receive-sdk';
import { genSign } from '@/assets/utils/sign';
import api from '../../assets/api/api';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import Vue from 'vue';
const globalDelayTime = 0;
const globalLang = 'zh_CN';
const interactGlobalConfig = Vue.observable({
  globalDelayTime,
  globalLang
});
export default {
  provide: {
    // 互动组件全局配置
    interactGlobalConfig: () => {
      return interactGlobalConfig;
    },
  },
  data() {
    return {
      // 聊天室实例
      chatSDK: null,
      // 模拟登录状态
      isLogin: false,
      // 聊天室 SDK token
      token: '',
      appId: 'fj1yxfco1y',
      appSecret: '99f12aa8b6b5475cab45d4cbbf09e432',
      // 观众端互动功能SDK token(部分模块必须，如抽奖)
      apiToken: '',
      // 语言
      lang: 'zh_CN',
      // 用户信息
      userInfo: {
        // 昵称
        nick: '',
        // 头像
        pic: '',
        // 用户id
        userId: '1',
        // 用户类型
        userType: 'student',
      },
      // 频道信息
      channelInfo: {
        // 频道号
        channelId: '',
        // 房间号
        roomId: '',
        // 频道场次id
        sessionId: '',
        // 频道所属用户账号id
        accountId: '',
      },

      // 是否显示领奖提示
      isShowLotteryNotice: false,
      isShowLotteryAnnouncement: false,
      // SF 顺丰抽奖UI
      isSF: false,
      // 当前用户已投过票的选项的列表
      votedList: [],

      demoBar: {
        voteBar: false,
        announcementBar: false,
        tuwenBar: false,
        lotteryBar: false,
        welfareBar: false,
        redpackBar: false,
        seatTableBar: false,
        productBar: false,
        enrollLotteryBar: false,
        questionnaire: false,
        evaluationQuestionnaire: false,
        qaBar: false
      },

      requestAuthorizeMethod: RequestAuthorizeMethod.Sign,
      signatureNonce: true,
      signatureMethod: 'SHA256',
      encryptResponseType: 0,
    };
  },

  watch: {
    async isLogin() {
      // 从后端得到聊天室token及其他频道、用户信息后，初始化聊天室 SDK 实例
      if (this.isLogin) {
        this.init();
      } else {
        this.destroyChat();
      }
    },
  },

  // 应用销毁前，先销毁聊天室 SDK 实例
  [BEFORE_DESTROY]() {
    this.destroyChat();
  },

  methods: {
    changLang() {
      if (interactGlobalConfig.globalLang === 'en') {
        interactGlobalConfig.globalLang = 'zh_cn';
      } else {
        interactGlobalConfig.globalLang = 'en';
      }
    },
    hideEvaluation() {
      this.demoBar.evaluationQuestionnaire = false;
    },
    async getViewerApiToken(cb) {
      try {
        const { token } = await getApiToken({
          channelId: this.channelInfo.channelId,
          viewerId: this.userInfo.userId,
        });

        // eslint-disable-next-line node/no-callback-literal
        cb && cb({ viewerApiToken: token });
      } catch (e) {}
    },

    async getXAuthToken(cb) {
      try {
        const token = '0759d02c-eecb-44c2-a068-5c81ede4a67f';

        // eslint-disable-next-line node/no-callback-literal
        cb && cb(token);
      } catch (e) {}
    },

    async getViewerApiTokenBackup(cb) {
      let res;
      try {
        const requestData = {
          appId: this.appId,
          timestamp: Date.now(),
          channelId: this.channelInfo.channelId,
          viewerId: this.userInfo.userId,
        };
        requestData.sign = genSign(requestData, this.appSecret);
        res = await api.post('//api.polyv.net/live/v3/channel/watch/get-api-token', requestData);
      } catch (e) {}
      if (res?.data) {
        const token = res.data.token;
        // eslint-disable-next-line node/no-callback-literal
        cb && cb({ viewerApiToken: token });
      }
    },

    onLoginInfo(data = {}) {
      const { userInfo, channelInfo, token, appId, appSecret } = data;
      this.isLogin = true;
      this.userInfo = Object.assign({}, this.userInfo, userInfo);
      this.channelInfo = Object.assign({}, this.channelInfo, channelInfo);
      this.token = token;
      this.appId = appId;
      this.appSecret = appSecret;
    },

    onClickUpdate() {
      sessionStorage.clear('chat-sdk-info');
      this.isLogin = false;
    },

    init() {
      const chatSDK = this.initChat();
      this.updateIar(chatSDK);
      // 传入语言 getter，实时更新互动功能组件内部的多语言设置
      this.chatSDK = chatSDK;
      this.bindChatSdkMsg();
    },

    // 初始化聊天室 SDK
    initChat() {
      const chat = new Chat({
        token: this.token,
        userInfo: this.userInfo,
        channelInfo: this.channelInfo
      });
      chat.setup();
      return chat;
    },

    // 在各个子组件使用互动功能SDK前，传入配置信息
    updateIar(chat) {
      updateConfig({
        chat: chat,
        userInfo: Object.assign({ openId: this.userInfo.userId }, this.userInfo),
        channelInfo: Object.assign({}, this.channelInfo),
        getViewerApiToken: this.getViewerApiToken,
        getXAuthToken: this.getXAuthToken,
        baseConfig: {
          // 预发布环境
          // apiEnv: 'pre',
        },
        requestAuthorizeMethod: this.requestAuthorizeMethod,
        signatureNonce: this.signatureNonce,
        signatureMethod: this.signatureMethod,
        encryptResponseType: this.encryptResponseType,

        appId: this.appId,
        appSecret: this.appSecret,
      });
    },

    destroyChat() {
      if (this.chatSDK) {
        this.chatSDK.destroy();
        this.chatSDK = null;
      }
    },

    onErrorMsg(msg) {
      alert(msg);
    },

    onWarningMsg(msg) {
      alert(msg);
    },

    onLotteryRecord() {
      this.isShowLotteryNotice = true;
    },

    setLotteryRecordVisible() {
      this.$refs.lottery && this.$refs.lottery.setLotteryRecordVisible();
    },

    bindChatSdkMsg() {
      if (!this.chatSDK) return;
      this.chatSDK
        .on('onSliceID', this.handleSliceIdMsg);
    },

    handleSliceIdMsg(msg) {
      this.votedList = msg.data.voteList || [];
    },

    changeDemoBar(type) {
      for (const typeKey in this.demoBar) {
        this.demoBar[typeKey] = false;
      }
      this.demoBar[type] = true;
    },

    showTopBulletinDetail(data) {
      this.$refs.bulletin && this.$refs.bulletin.showTopBulletinDetail(data);
    },
  },
};
