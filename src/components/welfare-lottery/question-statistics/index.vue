<template>
  <div class="plv-iar-welfare-lottery__question-statistics">
    <div class="plv-iar-welfare-lottery__question-statistics-title">  {{ iarTrans('welfareLottery.questionLabel') }} {{ index }}</div>
    <div class="plv-iar-welfare-lottery__question-statistics-icon">
      <img v-if="isRight" src="../imgs/icon-answer-right.png" />
      <img v-else src="../imgs/icon-answer-error.png" />
    </div>
  </div>
</template>

<script>
import mixin from '../mixin';
export default {
  mixins: [mixin],
  props: {
    index: {
      type: Number,
      default: 0
    },
    isRight: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__question-statistics {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin-bottom: 28px;
  font-size: 14px;
  .plv-iar-welfare-lottery__question-statistics-title {
    padding: 2px 0;
  }
}
.plv-iar-welfare-lottery__question-statistics-icon {
  img {
    margin-top: 8px;
    width: 20px;
    height: 20px;
  }
}

</style>
