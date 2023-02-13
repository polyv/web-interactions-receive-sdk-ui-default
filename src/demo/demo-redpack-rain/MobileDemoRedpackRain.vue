<!-- 移动端红包雨 demo -->
<template>
  <div class="plv-demo-redpack-rain">
    <button @click="openRedpackRain">打开红包雨1</button>
    <redpack-rain-comp
      ref="redpackRain"
      :redpack-rain="redpackRainSdk"
      :lang="lang"
      unit="波豆"
      @click-withdraw="handleClickWithdraw"
      @copy-success="handleCopySuccess"
      @click-point-record="handleClickPointRecord"
      @state-change="handleStateChange"
    />
  </div>
</template>

<script>
import { RedpackRain } from '@polyv/interactions-receive-sdk';
import RedpackRainComp from '../../entry/redpack-rain/MobileRedpackRain.vue';

export default {
  components: {
    RedpackRainComp
  },

  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    return {
      redpackRainSdk: null,
    };
  },

  created() {
    this.redpackRainSdk = new RedpackRain();
  },

  methods: {
    openRedpackRain() {
      const data = {
        EVENT: 'REDPAPER',
        content: '恭喜发财，大吉大利',
        msgSource: 'redpaper',
        msgType: 'REDPAPER',
        number: 1,
        redCacheId: '02e589e6',
        redpackId: 'a61385233c43445cb0c634ac1c05382f',
        timestamp: 1635306935530,
        totalAmount: 0.98,
        type: 'score_rain',
        user: {
          nick: '讲师7272',
          pic: '//s1.videocc.net/default-img/avatar/teacher.png',
        },
      };
      this.$refs.redpackRain.showRedpackRain(data);
    },
    // 处理点击提现
    handleClickWithdraw() {
      // TODO 打开提现窗口
    },
    // 处理复制成功
    handleCopySuccess() {
      alert('复制成功');
    },
    handleClickPointRecord() {
      console.log('打开积分记录');
    },
    handleStateChange(data) {
      console.log('handleStateChange', data);
    }
  },
};
</script>
