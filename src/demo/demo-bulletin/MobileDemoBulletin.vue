<template>
  <div>
    <div class="plv-demo-bulletin-default__button__wrap">
      <button type="button" @click="showBulletinList">公告列表</button>
    </div>

    <modal
      :title="bulletinTitle"
      :visible="isShowbulletin"
      :has-back-btn="hasBackBtn"
      @back="onModalRerurn"
      @close="onModalClosed"
    >
      <template v-if="hasShowListBtn" #header>
        <span class="plv-demo-bulletin__list-btn" @click="onClickListBtn">公告列表</span>
      </template>
      <bulletin
        ref="bulletin"
        :lang="lang"
        :announcement-sdk="announcementSdk"
        :is-web-view="false"
        @show-detail-from-socket="showBulletinFromSocket"
        @hide="setModalVisible(false)"
        @to-link="toLink"
        @show-list="onShowBulletinList"
        @show-detail-from-top="showBulletinFromTop"
        @show-top="showTopBulletin"
        @look-over="onLookOverBullletin"
        @title-change="onTitleChange"
      />
    </modal>
  </div>
</template>

<script>
import bulletin from '../../entry/bulletin/Mobilebulletin';
import Modal from '../demo-modal/MobileModal';

import mixin from './mixin';

export default {
  components: {
    bulletin,
    Modal
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-demo-bulletin-default__button__wrap {
  padding: 0 20px;
  button {
    margin-bottom: 20px;
  }
}
.plv-demo-bulletin__list-btn {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #666;
  font-size: 14px;
}
.plv-demo-bulletin__top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
