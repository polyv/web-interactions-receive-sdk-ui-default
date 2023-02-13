<template>
  <div
    class="plv-ia-tuwen-image-list"
  >
    <!-- 置顶流 -->
    <template v-for="topItem of topList">
      <img
        v-for="(topImageItem, topImageIndex) of topItem.images"
        :key="`top-image-${topItem.id}-${topImageIndex}`"
        :src="topImageItem + multiSuffix"
        @click="clickPicture(topImageItem)"
      />
    </template>
    <!-- 正常流 -->
    <template v-for="item of list">
      <template v-if="item.images.length !== 0 && item.top === 'N'">
        <img
          v-for="(imageItem, imageIndex) of item.images"
          :key="`image-${item.id}-${imageIndex}`"
          :src="imageItem + multiSuffix"
          @click="clickPicture(imageItem)"
        />
      </template>
    </template>
  </div>
</template>

<script>
import listMixin from '../mixin/list-mixin.js';

export default {
  mixins: [listMixin],
};
</script>

<style lang="scss">

.plv-ia-tuwen-image-list {
  overflow: auto;
  flex-wrap: wrap;
  img {
    width: 200px;
    height: 200px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
}
</style>
