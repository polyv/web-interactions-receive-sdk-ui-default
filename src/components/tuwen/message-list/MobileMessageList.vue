<template>
  <div>
    <!-- 置顶流 -->
    <div v-for="topItem of topList" :key="`top-message-${topItem.id}`">
      <message-item
        :content="topItem"
        :user-info="userInfo"
        :suffix="topItem.images.length > 1 ? multiSuffix : singleSuffix"
        @click-picture="(val) => $emit('click-picture', val)"
      />
    </div>
    <!-- 正常流 -->
    <div v-for="item of list" :key="`message-${item.id}`">
      <template v-if="item.top === 'N'">
        <message-item
          :content="item"
          :user-info="userInfo"
          :suffix="item.images.length > 1 ? multiSuffix : singleSuffix"
          @click-picture="(val) => $emit('click-picture', val)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import MessageItem from '../message-item/MobileMessageItem.vue';
import listMixin from '../mixin/list-mixin.js';

export default {
  components: {
    MessageItem: MessageItem,
  },
  mixins: [listMixin],
};
</script>

<style lang="scss">

.plv-ia-tuwen-message-list {
  overflow: auto;
  height: 600px;
}
</style>
