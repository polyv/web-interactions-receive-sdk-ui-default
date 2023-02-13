<template>
  <ul
    v-if="list.length"
    ref="list"
    class="plv-iar-bulletin__list"
    @scroll="onScroll"
  >
    <li
      v-for="item in list"
      :key="item.id"
      class="plv-iar-bulletin__list__item"
    >
      <div class="plv-iar-bulletin__list__item__user">
        <img :src="item.pic" />
        <div>
          <p class="plv-iar-bulletin__list__item__user__nick">{{ item.actor ? item.actor + '-' : '' }}{{ item.nick }}</p>
          <p class="plv-iar-bulletin__list__item__publish-time">{{ iarTrans('bulletin.issuedOn') + convertTime(item.createTime) }}</p>
        </div>
      </div>
      <div
        class="plv-iar-bulletin__list__item__content"
        data-type="lookover"
        @click="$emit('lookover', item.id)"
        v-html="formatContent(item.content)"
      ></div>
    </li>
  </ul>
  <div v-else class="plv-iar-bulletin__list--no-content">{{ iarTrans('bulletin.emptyList') }}</div>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    onScroll() {
      // 是否滚动到底部
      const list = this.$refs.list;
      const isBottom = list.scrollTop + list.clientHeight + 50 >= list.scrollHeight;
      this.$emit('scroll', isBottom, list.scrollTop);
    },
    formatContent(content) {
      return content.replace(/<img.*?>/gi, `[${this.iarTrans('bulletin.image')}]`).replace(/<a.*?>(.*?)<\/a>/gi, (match, p1) => {
        return p1;
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/basic.scss';

.plv-iar-bulletin__list {
  padding: 16px 16px 24px;
  margin: 0;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  @include scrollbar();
}
.plv-iar-bulletin__list__item {
  position: relative;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, .08);
  border-radius: 2px;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
}
.plv-iar-bulletin__list__item__user {
  position: relative;
  padding-left: 36px;
  font-size: 12px;
  line-height: 17px;
  >img {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
.plv-iar-bulletin__list__item__user__nick {
  font-weight: 500;
  color: #333;
  margin: 0;
}
.plv-iar-bulletin__list__item__publish-time {
  color: #8D8D8D;
  margin: 0;
}
.plv-iar-bulletin__list__item__content {
  margin: 8px 0;
  max-height: 44px;
  line-height: 22px;
  color: #666;
  font-size: 14px;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  * {
    margin: 0;
    padding: 0;
  }
}
.plv-iar-bulletin__list--no-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #666;
}
</style>
