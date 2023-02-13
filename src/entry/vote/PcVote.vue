<template>
  <div class="plv-iar-vote">
    <div v-if="!list.length" class="plv-iar-vote__no-data">{{ iarTrans('vote.tip1') }}</div>
    <div v-else class="plv-iar-vote__main">
      <div class="plv-iar-vote__list">
        <vote-item
          v-for="item in list"
          :key="item.id"
          :msg="item"
          :voted-list="curVotedList"
          @to-vote="handleToVote"
        />
      </div>
    </div>
    <vote-tip v-if="showTip" :message="voteCbMsg" />
  </div>
</template>

<script>
import mixin from './mixin';
import VoteItem from '../../components/vote/VoteItem.vue';
import VoteTip from '../../components/vote/VoteTip.vue';

export default {
  components: {
    VoteItem,
    VoteTip,
  },
  mixins: [mixin]
};
</script>

<style lang="scss">
.plv-iar-vote {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.plv-iar-vote__no-data {
  padding-top: 48px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, .6);
  text-align: center;
  letter-spacing: 0.1px;
}
.plv-iar-vote__main {
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  overflow: auto;
  box-sizing: border-box;
}
</style>
