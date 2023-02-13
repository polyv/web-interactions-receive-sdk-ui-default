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
import VoteComp from '../../entry/vote/MobileVote.vue';
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
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  .plv-iar-vote {
    background-color: #1D160D;
  }
}
</style>
