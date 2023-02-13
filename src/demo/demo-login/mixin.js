import api from '../../assets/api/api';
import { genSign } from '../../assets/utils/sign';

export default {
  data() {
    return {
      appId: 'fx6jl8kove',
      appSecret: 'ee392b804c884422810ab60241497d7e',
      channelInfo: {
        // 频道所属用户账号id
        accountId: '17e1c4f329',
        // 频道号
        channelId: '2368954',
        // 房间号
        roomId: '2368954',
        // 频道场次id
        sessionId: 'fycczz5esf',
      },
      userInfo: {
        // 登录用户昵称
        nick: 'ws',
        // 登录用户id
        userId: '224332',
        // 角色
        userType: 'student',
        // 头像
        pic: 'https://s1.videocc.net/default-img/avatar/viewer.png',
        // 头像
        actor: '',
      },
      isShowMoreOptions: false,
      isLoading: false,
      // 待选用户角色
      userTypes: [
        {
          value: 'student',
          name: '普通观众',
        },
        {
          value: 'teacher',
          name: '讲师',
        }
      ],
    };
  },

  mounted() {
    const chatSdkInfoJSON = sessionStorage.getItem('chat-sdk-info');
    if (chatSdkInfoJSON) {
      const chatSdkInfo = JSON.parse(chatSdkInfoJSON) || {};
      const { appId, appSecret, channelInfo, userInfo } = chatSdkInfo;
      this.appId = appId;
      this.appSecret = appSecret;
      this.channelInfo = channelInfo;
      this.userInfo = userInfo;
      document.cookie = `SESSION=${channelInfo.sessionId}`;
      this.onClickEnter();
    }
  },
  methods: {
    async onClickEnter() {
      let data;
      this.isLoading = true;
      try {
        const resBody = await this.getChatInfo();
        data = resBody && resBody.data;
      } catch (e) {
        console.warn(e);
        alert(e.message);
      } finally {
        this.isLoading = false;
      }

      if (data) {
        document.cookie = `SESSION=${this.channelInfo.sessionId}`;
        sessionStorage.setItem('chat-sdk-info', JSON.stringify({
          appId: this.appId,
          appSecret: this.appSecret,
          channelInfo: this.channelInfo,
          userInfo: this.userInfo,
        }));
        this.$emit('login-info', {
          appId: this.appId,
          appSecret: this.appSecret,
          channelInfo: this.channelInfo,
          userInfo: this.userInfo,
          token: data.token,
        });
      }
    },

    /**
     * 获取聊天室登录 token。
     * 实际上，由于生成 sign 需要 appId 及 appSecret，为了避免关键信息泄露，应由后端去生成 sign 及调用对应接口
    */
    getChatInfo() {
      const channelInfo = this.channelInfo;
      const userInfo = this.userInfo;
      const params = {
        appId: this.appId,
        timestamp: Date.now(),
        channelId: channelInfo.channelId,
        userId: userInfo.userId,
        role: userInfo.userType,
      };
      params.sign = genSign(params, this.appSecret);

      return api.get('https://api.polyv.net/live/v3/channel/common/get-chat-token', params);
    },
  },
};
