<template>
  <div class="plv-demo-vote-wrap">
    <vote-comp
      :vote-sdk="voteSdk"
      :voted-list="votedList"
      :lang="lang"
    />
  </div>
</template>

<script>
import VoteComp from '../../entry/vote/PcVote.vue';
import mixin from './mixin';

export default {
  components: {
    VoteComp,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-demo-vote-wrap {
  position: absolute;
  //bottom: -400px;
  // width: 300px;
  width: 280px;
  height: 400px;
  box-sizing: border-box;
  .plv-iar-vote {
    background-color: #1D160D;
  }
}
</style>
