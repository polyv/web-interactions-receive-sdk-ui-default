<template>
  <div
    ref="player"
    class="plv-ia-c-svga-player"
  >
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {

  props: {
    src: {
      type: String,
      default: '',
    },
    clearsAfterStop: {
      type: Boolean,
    },
    loops: {
      type: Number,
      default: null,
    },
    fillMode: {
      type: String,
      default: null,
    },
    defaultStart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      player: null,
      parser: null,
    };
  },

  async mounted() {
    try {
      await this.init();
      if (this.defaultStart) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    } catch (e) {
      console.warn(e);
    }
  },

  [BEFORE_DESTROY]() {
    this.stopAnimation();
  },

  methods: {
    init() {
      // 若元素不可见则不进行 svga 的初始化(否则部分一加机型存在崩溃风险)，为避免崩溃风险，外部最好使用v-if去控制本组件加载。
      if (!this.checkVisible()) {
        // 中断动画初始化，并给予警告信息。
        console.warn('svga容器元素不可见，请在元素可见的情况下挂载本组件');
        return;
      }
      const player = new SVGA.Player(this.$refs.player);
      const parser = new SVGA.Parser(this.$refs.player);
      this.player = player;
      this.parser = parser;

      if (typeof this.clearsAfterStop !== 'undefined') {
        player.clearsAfterStop = this.clearsAfterStop;
      }

      if (typeof this.loops !== 'undefined') {
        player.loops = this.loops;
      }

      if (typeof this.fillMode !== 'undefined') {
        player.fillMode = this.fillMode;
      }

      return new Promise((resolve, reject) => {
        parser.load(
          this.src,
          (videoItem) => {
            player.setVideoItem(videoItem);
            // 兼容 IE
            if (typeof this.src === 'string' && this.src.indexOf('blob:') === 0) {
              window.URL.revokeObjectURL(this.src);
            }
            resolve(player);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    // 检查容器元素可见性
    checkVisible() {
      const $el = this.$el;
      // display: none 或无宽高
      if ($el?.offsetWidth === 0 || $el?.offsetHeight === 0) {
        return false;
      }
      // 仅视觉不可见
      if (window.getComputedStyle && window.getComputedStyle($el).visibility === 'hidden') {
        return false;
      }
      return true;
    },

    startAnimation() {
      this.invokePlayer('startAnimation');
    },

    stopAnimation() {
      this.invokePlayer('stopAnimation');
    },

    invokePlayer(method, args) {
      const player = this.player;
      if (!player || !this.src) { return; }
      if (player && typeof player[method] === 'function') {
        return player[method].apply(player, args);
      }
    }
  },
};
</script>
