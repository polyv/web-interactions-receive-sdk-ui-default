<!-- @file 物体下落组件 -->
<template>
  <div class="plv-redpack-rain-default__rolling-board">
    <div ref="container" class="plv-redpack-rain-default__rolling-board__container"></div>
  </div>
</template>

<script>
import RollingBoard from '../../assets/utils/rolling-board/rolling-board';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
// 几种尺寸及下落时间
const itemData = [
  {
    itemStyleWidth: 100,
    itemStyleHeight: 79,
    rollTime: 3.5
  },
  {
    itemStyleWidth: 80,
    itemStyleHeight: 63,
    rollTime: 3,
  },
  {
    itemStyleWidth: 120,
    itemStyleHeight: 94,
    rollTime: 3.5
  },
];

export default {
  props: {
    // 控制下落个数
    itemCount: {
      type: Number,
      default: 0,
    },

    // 下落物品是否无限
    infinite: {
      type: Boolean,
      default: true,
    },

    // 物品样式类数量, 从 plv-redpack-rain-default__rolling-board-item-1 增到 plv-redpack-rain-default__rolling-board-item-${classCount}
    classCount: {
      type: Number,
      default: 1,
    },

    // 针对无限下落物品设置下落频率, slow, fast, middle
    speed: {
      type: String,
      default: 'middle',
    },

    // 物品是否需要随机尺寸
    isRandSize: {
      type: Boolean,
    },

    // 随机数据列表
    randItemData: {
      type: Array,
      default: () => itemData,
    },
  },

  data() {
    return {
      inited: false,
      infiniteTimer: null,
      rollingBoard: null
    };
  },

  [BEFORE_DESTROY]() {
    this.destroy();
    if (this.infiniteTimer) {
      clearInterval(this.infiniteTimer);
      this.infiniteTimer = null;
    }
  },

  methods: {
    init() {
      this.rollingBoard = new RollingBoard({
        container: this.$refs.container,
        trackSize: 50,
      });
      this.rollingBoard && this.rollingBoard.on('CLICK_ITEM', this.handleClickItem);

      if (this.itemCount) {
        // 固定下落物品数量
        for (let i = 0; i <= this.itemCount; i++) {
          setTimeout(() => {
            this.add();
          }, i * 500);
        }
      } else if (this.infinite) {
        // 下落物品无限
        this.setInfiniteTimer();
      }

      this.inited = true;
    },

    setInfiniteTimer() {
      const speed = {
        fast: 200,
        middle: 1000,
        slow: 3000,
      };
      this.infiniteTimer = setInterval(() => {
        this.add();
      }, speed[this.speed]);
    },

    add() {
      const itemClass = 'plv-redpack-rain-default__rolling-board-item';
      const rand = Math.floor(Math.random() * this.classCount);
      const randItemData = this.randItemData || itemData;
      const randParam = Math.floor(Math.random() * randItemData.length); // 从已有几种尺寸中随机选一种
      const params = randItemData[randParam];
      const { rollTime = 3, itemStyleWidth, itemStyleHeight } = params || {};
      if (this.isRandSize) {
        // 尺寸和下落总时长都随机
        this.rollingBoard.add({
          itemClass: `${itemClass} ${itemClass}-${rand + 1}`,
          rollTime,
          itemStyleWidth,
          itemStyleHeight
        });
      } else {
        // 下落总时长随机
        this.rollingBoard.add({
          itemClass: `${itemClass} ${itemClass}-${rand + 1}`,
          rollTime,
        });
      }
    },

    removeFromTrack(data, node) {
      this.rollingBoard._removeFromTrack(data.y, data.autoId);
      if (node.parentNode && node.parentNode === this.rollingBoard._container) {
        this.rollingBoard._container.removeChild(node);
      }
    },

    destroy() {
      this.rollingBoard && this.rollingBoard.off('CLICK_ITEM', this.handleClickItem);
      this.rollingBoard && this.rollingBoard.destroy();
    },

    pause() {
      this.rollingBoard && this.rollingBoard.pause();
    },

    resume() {
      this.rollingBoard && this.rollingBoard.resume();
    },

    handleClickItem(e) {
      this.$emit('click-item', e);
    },
  },
};
</script>

<style lang="scss">
.plv-redpack-rain-default__rolling-board {
  width: 100%;
  height: 100%;
  &__container {
    width: 100%;
    height: 100%;
  }
}
.plv-redpack-rain-default__rolling-board-item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

</style>
