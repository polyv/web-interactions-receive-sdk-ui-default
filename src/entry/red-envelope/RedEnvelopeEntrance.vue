<!-- 聊天列表红包消息组件 -->
<template>
  <red-envelope-entrance
    :style="{width: autoWidth ? '100%' : null}"
    :red-envelope-data="redEnvelopeData"
    :custom-img-config="customImgConfig"
    :status="status"
    @open="handleEntranceClick"
  />
</template>

<script>
import { local } from '@polyv/utils/src/storage';
import RedEnvelopeEntrance from '../../components/red-envelope/RedEnvelopeEntrance';
import langMixin from './langMixin';
const STATUS_STORAGE_KEY = 'red_envelope_status_';

export default {
  components: {
    RedEnvelopeEntrance,
  },
  mixins: [langMixin],
  props: {
    // 红包SDK
    redEnvelopeSdk: {
      type: Object,
      default: null,
    },
    redEnvelopeData: {
      type: Object,
      default: null,
    }, // 红包数据
    // 微信opendId
    openId: {
      type: String,
      default: '',
    },
    customImgConfig: {
      type: [Object, null],
      default: null
    },
    autoWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: 'noReceive', // 红包状态
    };
  },
  watch: {
    redEnvelopeData: {
      immedate: true,
      handler() {
        this.checkReceiveCache();
      },
    }
  },
  mounted() {
    if (this.redEnvelopeData) {
      this.checkReceiveCache();
    }
  },
  methods: {
    handleEntranceClick() {
      this.$emit('open', this.redEnvelopeData.id);
    },
    // 查询红包状态
    async checkReceiveCache() {
      const { redpackId } = this.redEnvelopeData;
      const storageKey = `${STATUS_STORAGE_KEY}${redpackId}`;
      // 先从localStorage读取状态
      const storageStatus = local.get(storageKey);
      if (storageStatus) {
        this.status = storageStatus;
        this.$emit('status', this.status);
      }
    },
    updateStatus(status) {
      this.status = status;
    }
  }
};
</script>
