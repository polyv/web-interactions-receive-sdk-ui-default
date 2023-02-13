<template>
  <div>
    <div class="plv-demo-announcement-default__button__wrap">
      <button @click="setAnnouncementBarVisible(true)">
        打开侧边公告
      </button>
    </div>

    <announcement-bar
      v-show="isShowAnnouncementBar"
      :announcement-sdk="announcementSdk"
      :client-width="clientWidth"
      @to-show="setAnnouncementBarVisible(true)"
      @to-hide="setAnnouncementBarVisible(false)"
    />
  </div>
</template>

<script>
import AnnouncementBar from '../../entry/announcement/MobileAnnouncementBar';

import mixin from './mixin';

export default {
  components: {
    AnnouncementBar,
  },
  mixins: [mixin],
  data() {
    return {
      isShowAnnouncementBar: false,
      clientWidth: 0
    };
  },
  created() {
    this.setContainerWidth();
  },
  methods: {
    setAnnouncementBarVisible(visible) {
      this.isShowAnnouncementBar = visible;
    },
    setContainerWidth() {
      this.clientWidth = document.body.clientWidth;
    }
  },
};
</script>
<style lang="scss" scoped>
.plv-demo-announcement-default__button__wrap {
  padding: 0 20px;
  button {
    margin-bottom: 20px;
  }
}
</style>
