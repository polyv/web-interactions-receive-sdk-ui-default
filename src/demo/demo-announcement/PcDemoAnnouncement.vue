<template>
  <div>
    <modal
      draggable
      body-locked
      no-bg
      :title="announcementTitle"
      :visible="isShowAnnouncement"
      :close-on-click-modal="false"
      @close="onModalClosed"
    >
      <announcement
        ref="announcement"
        :lang="lang"
        :announcement-sdk="announcementSdk"
        @to-show="setAnnouncementVisible(true)"
        @to-hide="setAnnouncementVisible(false)"
      />
    </modal>
  </div>
</template>

<script>
import Announcement from '../../entry/announcement/PcAnnouncement';
import Modal from '../demo-modal/PcModal';

import mixin from './mixin';

export default {
  components: {
    Announcement,
    Modal
  },
  mixins: [mixin],
};
</script>
