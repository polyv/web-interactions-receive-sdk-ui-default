<template>
  <div
    :class="['plv-iar-vote-item', `plv-iar-vote-item--${statusText}`]"
    :style="{'background-image': `url(${msg.voteCoverImage})`}"
  >
    <div class="plv-iar-vote-item__status">
      <span>{{ iarTrans(status ? 'vote.voting' : 'vote.votingEnds') }}</span>
    </div>
    <p class="plv-iar-vote-item__title">{{ msg.name }}</p>
    <button
      type="button"
      class="plv-iar-vote-item__btn-vote"
      :class="{'plv-iar-vote-item__btn-vote--voted': isVoted}"
      @click="toVote"
    >
      {{ btnText }}
    </button>
    <div v-if="msg.showVoteCount" class="plv-iar-vote-item__count"><span>{{ msg.voteCount }}</span>{{ iarTrans('vote.votes') }}</div>
  </div>
</template>

<script>
import { ynToBool } from '@polyv/utils/src/boolean';
import basicMixin from '../../assets/mixins/basic';

export default {
  mixins: [basicMixin],
  props: {
    msg: {
      type: Object,
      default: () => ({})
    },
    votedList: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    // 当前投票是否进行中
    status() {
      return ynToBool(this.msg.status || 'N');
    },
    statusText() {
      return this.status ? 'ongoing' : 'end';
    },
    // 是否已投票
    isVoted() {
      return this.votedList.indexOf(this.msg.id) !== -1;
    },
    btnText() {
      return this.iarTrans(`${this.isVoted ? 'vote.voted' : (this.status ? 'vote.voteFor' : 'vote.didNotVote')}`);
    }
  },
  methods: {
    toVote() {
      if (this.status && !this.isVoted) {
        this.$emit('to-vote', this.msg.id);
      }
    }
  }
};
</script>

<style lang="scss">
.plv-iar-vote-item {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  padding-bottom: 13px;
  text-align: center;
  background-image: linear-gradient(90deg, rgba(68, 53, 43, .9) 6%, rgba(35, 29, 30, .9) 98%);
  background-position: center;
  background-size: cover;
  border: 1px solid #9D7D63;
  border-radius: 2px;
  box-sizing: border-box;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
}
.plv-iar-vote-item__status {
  position: absolute;
  top: 15px;
  right: 1px;
  font-size: 13px;
  line-height: 18px;
  color: #fff;
  width: 52px;
  height: 24px;
  background-color: #BE281B;
  transform: rotate(45deg);
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -24px;
    border: 24px solid transparent;
    border-bottom-color: #BE281B;
  }
  &::before {
    left: -24px;
  }
  &::after {
    right: -24px;
  }
  >span {
    position: relative;
    z-index: 1;
    margin-top: 3px;
    display: inline-block;
  }
}
.plv-iar-vote-item__title {
  max-width: 238px;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: #fff;
  margin: 24px auto;
}
.plv-iar-vote-item__btn-vote {
  width: 86px;
  height: 32px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  background-color: #C6A67A;
  border-radius: 16px;
  border: none;
  cursor: pointer;
}
.plv-iar-vote-item__btn-vote--voted {
  background-color: #4F4C4C;
  color: rgba(#fff, .3);
}
.plv-iar-vote-item--end {
  background-image: linear-gradient(90deg, rgba(48, 46, 46, .7)6%, rgba(48, 46, 46, .7) 96%);
  border-color: #4D4C4C;
  .plv-iar-vote-item__status {
    background-color: #4F4C4C;
    color: rgba(#fff, .6);
    &::before,
    &::after {
      border-bottom-color: #4F4C4C;
    }
  }
  .plv-iar-vote-item__title {
    color: rgba(#fff, .6);
  }
  .plv-iar-vote-item__btn-vote {
    background-color: #4F4C4C;
    color: rgba(#fff, .3);
  }
}
.plv-iar-vote-item__count {
  position: absolute;
  right: 16px;
  bottom: 15px;
  font-size: 14px;
  line-height: 29px;
  color: rgba(#fff, .6);
  >span {
    display: inline-block;
    margin-right: 4px;
    margin-top: -4px;
    vertical-align: middle;
    color: #C6A67A;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
