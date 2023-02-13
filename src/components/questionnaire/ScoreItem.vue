<template>
  <div>
    <span
      v-for="(item, index) in Array(type === 'S' ? 10 : 5)"
      :key="index"
      :class="[
        clsName,
        (scene === 'display' ? displayIndex : scoreIndex) >= index ? activeClsName : '',
        scene !== 'display' ? 'plv-iar-questionnaire-question__option--cursor' : '',
      ]"
      @click="handleSelect(index)"
    >{{ type === 'S' ? index + 1 : '' }}</span>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'totalScore',
    event: 'calc'
  },
  props: {
    totalScore: {
      type: [Number, undefined],
      default: () => undefined
    },
    // 五星评分或圆圈评分，默认五星评分
    type: {
      type: String,
      default: 'X'
    },
    // 模式：score:可评分模式、display：展示评分结果模式，默认可评分，
    scene: {
      type: String,
      default: 'score'
    },
    // 展示模式下，传入所得评分总数
    amount: {
      type: [Number],
      default: 0
    },
  },
  data() {
    return {
      scoreIndex: -1,
    };
  },
  computed: {
    clsName() {
      return `plv-iar-questionnaire-question__option__${this.type === 'S' ? 'circle' : 'star'}`;
    },
    activeClsName() {
      return this.clsName + '--active';
    },
    displayIndex() {
      return this.scene === 'display' && this.amount > 0 ? this.amount - 1 : -1;
    },
  },
  methods: {
    handleSelect(index) {
      if (this.scene === 'display') return;
      this.scoreIndex = index === this.scoreIndex ? -1 : index;
      this.$emit('calc', this.scoreIndex + 1);
    },
  }
};
</script>
<style lang="scss">
.plv-iar-questionnaire-question__option__star {
  display: inline-block;
  width: 24px;
  height: 24px;
  // font-size: 24px;
  margin-right: 15px;
  // color: #DBDBDB;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(./imgs/icon-star-normal@2x.png);
}

.plv-iar-questionnaire-question__option__star--active {
  // color: #FE9909;
  background-image: url(./imgs/icon-star-full@2x.png);
}

.plv-iar-questionnaire-question__option__circle {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #CFD8DC;
  font-size: 14px;
  color: #333;
  text-align: center;
  line-height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.plv-iar-questionnaire-question__option__circle--active {
  border-color: #2196F3;
  color: #2196F3;
  background-color: rgba(#2196F3, .1);
}
.plv-iar-questionnaire-question__option--cursor {
  cursor: pointer;
}
</style>
