<template>
  <div>
    <button type="button" @click="showBulletinList">公告列表</button>
    <modal
      draggable
      body-locked
      no-bg
      :title="bulletinTitle"
      :visible="isShowbulletin"
      :close-on-click-modal="false"
      @close="onModalClosed"
    >
      <bulletin
        ref="bulletin"
        :lang="lang"
        :announcement-sdk="announcementSdk"
        @show-detail-from-socket="showBulletinFromSocket"
        @hide="setModalVisible(false)"
        @show-list="onShowBulletinList"
        @show-detail-from-top="showBulletinFromTop"
        @show-top="showTopBulletin"
        @title-change="onTitleChange"
      />
    </modal>
  </div>
</template>

<script>
import bulletin from '../../entry/bulletin/Pcbulletin';
import Modal from '../demo-modal/PcModal';

import mixin from './mixin';

export default {
  components: {
    bulletin,
    Modal
  },
  mixins: [mixin],
};
</script>
