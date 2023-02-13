<template>
  <div ref="scrollContent" class="plv-iar-point-re-record">
    <div class="plv-iar-point-re-list">
      <div v-for="(item, index) in list" :key="index" class="plv-iar-point-re-item">
        <div class="plv-iar-point-re-item-left">
          <span class="plv-iar-point-re-item-name">领取{{ unit }}</span>
          <span class="plv-iar-point-re-item-time">{{ formatData(item.createdTime) }}</span>
        </div>
        <div class="plv-iar-point-re-item-right">
          <span class="plv-iar-point-re-item-value">{{ item.amount > 0 ? `+${item.amount}` : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@polyv/utils/src/date';

export default {
  props: {
    // 红包SDK
    redEnvelopeSdk: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 频道设置积分单位
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      pageNumber: 1,
      totalPages: 0,
      redPackType: 'score',
      loading: false
    };
  },
  watch: {
    list(val) {
      this.$emit('record-list-change', val);
    },
    visible(val) {
      if (val) {
        this.resetList();
      }
    }
  },
  mounted() {
    this.getNextList();
    this.initScrollLister();
  },
  methods: {
    formatData(val) {
      return formatDate(new Date(val), 'YYYY-MM-DD hh:mm');
    },
    async getReceiveList() {
      if (this.loading) return;
      this.loading = true;
      const data = await this.redEnvelopeSdk.getReceiveList({ pageNumber: this.pageNumber, pageSize: 20, redPackType: this.redPackType });
      this.loading = false;
      this.list = this.list.concat(data.contents);
      this.totalPages = data.totalPages;
      this.pageNumber++;
    },
    getNextList() {
      if (!this.totalPages || this.pageNumber < this.totalPages) {
        this.getReceiveList();
      }
    },
    resetList() {
      this.list = [];
      this.pageNumber = 1;
    },
    initScrollLister() {
      const container = this.$refs.scrollContent;
      container.addEventListener('scroll', () => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          this.getNextList();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.plv-iar-point-re-record {
  width: 100%;
  height: 286px;
  overflow-y: scroll;
  .plv-iar-point-re-list {
    overflow-y: scroll;
    .plv-iar-point-re-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px 9px 24px;
    }
    .plv-iar-point-re-item-left {
      display: flex;
      flex-direction: column;
    }
    .plv-iar-point-re-item-name {
      font-size: 14px;
      color: #333333;
    }
    .plv-iar-point-re-item-time {
      margin-top: 4px;
      font-size: 12px;
      color: #9E9E9E;
    }
    .plv-iar-point-re-item-value {
      font-size: 16px;
      color: #3082FE;
    }
  }
}
</style>
