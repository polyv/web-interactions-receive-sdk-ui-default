<template>
  <module-container>
    <div ref="announcementContent" class="plv-iar-announcement-title"></div>
    <template #footer>
      <div class="plv-iar-pc-announcement-default__footer">
        <iar-button @click="onClickKnow">{{ iarTrans('announcement.know') }}</iar-button>
      </div>
    </template>
  </module-container>
</template>

<script>
import IarButton from '../../components/common/button/PcButton';
import ModuleContainer from '../../components/common/module-container/PcModuleContainer';

import mixin from './mixin';
import announcementMixin from './announcement-mixin';

export default {
  components: {
    IarButton,
    ModuleContainer
  },
  mixins: [mixin, announcementMixin],

};
</script>
<style lang="scss" scoped>
.plv-iar-announcement-title {
  box-sizing: border-box;
  padding: 20px 24px 0;
  color: #333333;
  font-size: 14px;
  line-height: 22px;
  word-break: break-word;
  a, a:hover, a:visited {
    color: #2196f3;
    text-decoration: none;
  }
}
.plv-iar-pc-announcement-default__footer {
  padding: 17px 0 24px;
  text-align: center;
}
</style>
