<!-- 条件抽奖 pc 端 demo -->

<template>
  <div class="plv-demo-welfare-lottery">
    <!-- 条件抽奖组件内容 -->
    <welfare-lottery
      :lang="lang"
      :watch-url="watchUrl"
      :welfare-lottery-sdk="welfareLotterySdk"
      :is-show-custom-lottery="isShowCustomLottery"
      :link-skip-enabled="linkSkipEnabled"
      :modal-bg-img="modalBgImg"
      :is-apple-mod="isAppleMod"
      :is-full-screen="isFullScreen"
      @comment-success="commentSuccess"
    />
    <button @click="sendComment">评论</button>
    <input v-model="comment" />
  </div>
</template>

<script>
import WelfareLotteryComp from '../../entry/welfare-lottery/PcWelfareLottery.vue';
import mixin from './mixin';
import langConfig from './langs/welfare-lottery';

export default {
  components: {
    'welfare-lottery': WelfareLotteryComp,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-demo-welfare-lottery {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #202127;
  .plv-iar-conditional-draw__entrance {
    margin: 0 auto;
  }
}
</style>
