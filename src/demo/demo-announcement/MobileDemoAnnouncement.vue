<template>
  <div>
    <div class="plv-demo-announcement-default__button__wrap">
      <button @click="setAnnouncementVisible(true)">
        打开公告
      </button>
    </div>

    <modal
      :title="announcementTitle"
      :visible="isShowAnnouncement"
      @close="onModalClosed"
    >
      <announcement
        ref="announcement"
        :lang="lang"
        :announcement-sdk="announcementSdk"
        :is-web-view="true"
        @to-show="setAnnouncementVisible(true)"
        @to-hide="setAnnouncementVisible(false)"
        @to-link="toLink"
      />
    </modal>
  </div>
</template>

<script>
import Announcement from '../../entry/announcement/MobileAnnouncement';
import Modal from '../demo-modal/MobileModal';

import mixin from './mixin';

export default {
  components: {
    Announcement,
    Modal
  },
  mixins: [mixin],
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
