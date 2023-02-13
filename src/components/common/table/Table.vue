<template>
  <div ref="wrapper" class="plv-ia-c-table-wrapper">
    <table class="plv-ia-c-table-wrapper-table" border="0">
      <div v-show="hasHeader" class="plv-ia-c-table-wrapper-table-thead">
        <div class="plv-ia-c-table-wrapper-table-thead-tr">
          <div
            v-for="(column, index) in columns"
            :key="index"
            class="plv-ia-c-table-wrapper-table-thead-th"
            :title="column.label"
            :style="{width: column.width, flex: column.width ? '': 1}"
          >
            {{ column.label }}
          </div>
        </div>
      </div>
      <div class="plv-ia-c-table-wrapper-table-tbody" :style="{height: tbodyHeight}">
        <div v-if="dataList.length === 0" class="plv-ia-c-table-wrapper-table-tbody--empty">
          <img src="./imgs/no-list.png" alt="" />
        </div>
        <div
          v-else
          class="plv-ia-c-table-wrapper-table-tbody--inner"
          :style="{width: innerWidth}"
          @scroll="handleScroll"
        >
          <div v-for="(item, index) in dataList" :key="index" class="plv-ia-c-table-wrapper-table-tbody-tr">
            <div
              v-for="(column, columnIndex) in columns"
              :key="columnIndex"
              class="plv-ia-c-table-wrapper-table-tbody-td"
              :style="{ width: column.width, flex: column.width ? '': 1 }"
            >
              <template v-if="column.type === 'handle'">
                <slot name="handle" :slotData="item"></slot>
              </template>
              <template v-else-if="column.slotName">
                <slot :name="column.slotName" :slotData="item"></slot>
              </template>
              <span v-else :style="{'text-align': column.textAlign }" :title="item[column.props]">{{ item[column.props] }}</span>
            </div>
          </div>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    dataList: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    tbodyHeight: {
      type: String,
      default: '300px'
    },
    // 滚动底部触发事件
    scrollDistance: {
      type: Number,
      default: 100
    },
    hasHeader: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      innerWidth: '',
      lastInnerWidth: '', // 记录上一次宽度
    };
  },
  mounted() {
    this.initInnerWidth();
    window.addEventListener('resize', this.initInnerWidth);
  },
  updated() {
    this.initInnerWidth();
  },
  methods: {
    sortBy(column) {
      if (column.sortable) {
        if (this.sortKey === column.key) {
          this.sortOrders.push(this.sortOrders.pop() === 'asc' ? 'desc' : 'asc');
        } else {
          this.sortKey = column.key;
          this.sortOrders = ['asc'];
        }
      }
    },
    handleScroll(e) {
      const target = e.target;
      const viewH = target.clientHeight;
      const contentH = target.scrollHeight; // 内容高度
      const scrollTop = target.scrollTop;
      if (contentH - viewH - scrollTop <= this.scrollDistance) { // 到达底部100px时,加载新内容
        this.$emit('scroll-bottom');
      }
    },
    initInnerWidth() {
      this.$nextTick(() => {
        if (this.$refs.wrapper) {
          const innerWidth = this.$refs.wrapper.offsetWidth;
          this.innerWidth = innerWidth ? innerWidth + 'px' : this.lastInnerWidth;
          this.lastInnerWidth = this.innerWidth;
        }
      });
    }
  }
};
</script>

<style lang="scss">

.plv-ia-c-table-wrapper-table-tbody--empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-wrapper {
  overflow-x: auto;
}
.table {
  width: 100%;
  margin-bottom: 20px;
}
.plv-ia-c-table-wrapper {
  box-sizing: border-box;
  .plv-ia-c-table-wrapper-table {
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
  }
  span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .plv-ia-c-table-wrapper-table-thead {
    .plv-ia-c-table-wrapper-table-thead-tr {
      display: flex;
      background: #EDF1F7;
      line-height: 48px;
      height: 48px;
      .plv-ia-c-table-wrapper-table-thead-th {
        font-size: 14px;
        font-weight: normal;
        color: #757575;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .plv-ia-c-table-wrapper-table-tbody {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    color: #546E7A;
    &::-webkit-scrollbar {
      display: none;
    }
    &:hover {
      &::-webkit-scrollbar {
        display: block;
      }
    }
  }
  .plv-ia-c-table-wrapper-table-tbody--inner {
    position: absolute;
    right: 0;
    left: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .plv-ia-c-table-wrapper-table-tbody-tr:nth-child(2n) {
    background-color: #F8F8FB;
  }
  .plv-ia-c-table-wrapper-table-tbody-tr {
    text-align: center;
    display: flex;
    .plv-ia-c-table-wrapper-table-tbody-td {
      padding: 0 8px;
      height: 48px;
      line-height: 48px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
