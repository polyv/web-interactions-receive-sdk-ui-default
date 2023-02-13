<!-- 中奖用户列表移动端组件 -->
<template>
  <modal-normal
    class="plv-iar-welfare-lottery__winner-list"
    @close="$emit('close')"
  >
    <template #header>
      <span class="plv-iar-welfare-lottery__modal__back-btn--black" @click="$emit('back')"></span>
      <h2 class="plv-iar-welfare-lottery__modal__title--center">{{ iarTrans('welfareLottery.winnerList') }}</h2>
    </template>
    <template #body>
      <ul
        v-if="winnerGroups.length"
        class="plv-iar-welfare-lottery__winner-list__main"
        @scroll="onScroll"
      >
        <li v-for="(group, index) in winnerGroups" :key="index">
          <span v-for="(user, userIndex) in group" :key="userIndex">
            {{ user.viewerName }}
          </span>
        </li>
      </ul>
      <div v-else class="plv-iar-welfare-lottery__winner-list--no-data">{{ iarTrans('welfareLottery.noWinnerList') }}</div>
    </template>
  </modal-normal>
</template>

<script>
import ModalNormal from '../modal-normal/MobileModalNormal.vue';
import mixin from './mixin';

export default {
  components: {
    ModalNormal,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
@import './base.scss';
@import '../base.scss';
.plv-iar-welfare-lottery__winner-list {
  .plv-iar-welfare-lottery__modal__back-btn--black {
    top: 14px;
  }
  .plv-iar-welfare-lottery__modal__title--center {
    font-size: 18px;
  }
}

@media screen and (min-aspect-ratio: 4/3) {
  .plv-iar-welfare-lottery__winner-list {
    .plv-iar-modal__main {
      @include full-screen-modal;
    }
  }
}
</style>
