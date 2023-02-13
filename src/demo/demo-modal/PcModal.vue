<template>
  <transition
    name="modal-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="visible"
      class="plv-demo-modal-default"
    >
      <div
        v-if="!noBg"
        class="plv-demo-modal-default__bg"
        @click.self="handleWrapperClick"
        @mousedown.self="handleBgMousedown"
      >
      </div>
      <div
        ref="modal"
        class="plv-demo-modal-default__content"
        :style="computedStyle"
      >
        <div
          ref="header"
          class="plv-demo-modal-default__header"
          :style="{
            cursor: draggable ? 'move' : ''
          }"
        >
          <h2>{{ title }}</h2>
          <button v-if="closable" class="plv-demo-modal-default__close" @click="handleClose"></button>
        </div>
        <div
          ref="body"
          class="plv-demo-modal-default__body"
          :class="{
            'plv-demo-modal-default__body--border': overflowBorderBottom,
          }"
          :style="{
            height: `${bodyHeight}px`,
          }"
        >
          <slot></slot>
        </div>
        <div
          ref="footer"
          class="plv-demo-modal-default__footer"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { DESTROYED } from '@/assets/utils/compat';
export default {
  name: 'IarModal',

  props: {
    appendToBody: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    modalStyle: {
      type: Object,
      default: null,
    },
    setModalPosition: {
      type: Function,
      default: null,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    // 没有背景遮罩层
    noBg: {
      type: Boolean,
    },
    // body 最大高度，设置之后，纵向溢出会有固定样式的滚动条、底部有边框
    bodyHeight: {
      type: Number,
      default: null,
    },
    bodyLocked: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      closed: false,
      marginTop: 0,
      marginLeft: -280,
      paddingBottom: 0, // 空出footer的位置
      isDragging: false,
      dragPointX: 0,
      dragPointY: 0,
      isBgMouseDown: false, // 用于防止拖拽超出弹窗后释放鼠标触发背景点击事件
      modalPositionData: null,
      overflowBorderBottom: false, // 纵向溢出并显示底部边框
      hasDragged: false, // 是否拖动过，拖动过之后视图更新不再调用 setModalPosition 来定位。
      firstTimeOpen: true, // 首次打开
    };
  },

  computed: {
    computedStyle() {
      let style = {
        marginTop: `${this.marginTop}px`,
        marginLeft: `${this.marginLeft}px`,
        paddingBottom: `${this.paddingBottom}px`,
      };
      if (this.modalStyle) {
        style = Object.assign({}, style, this.modalStyle);
      }
      if (this.modalPositionData) {
        style = Object.assign({}, style, this.modalPositionData);
      }
      return style;
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler(newVal) {
        this.handleVisibleChange(newVal);
      }
    },

    modalStyle() {
      this.updateBasicStyle();
    },

    isDragging(newVal) {
      if (newVal) {
        this.hasDragged = true;
      }
    },
  },

  mounted() {
    if (this.visible && this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    this.updateBasicStyle();
    if (this.draggable) {
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  },

  [DESTROYED]() {
    if (this.bodyLocked) {
      this.unlockDocBody();
    }
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.draggable) {
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  },

  methods: {
    handleBgMousedown() {
      this.isBgMouseDown = true;
    },
    hide(cancel) {
      if (cancel) { return; }
      this.$emit('update:visible', false);
      this.$emit('close');
      this.closed = true;
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) { return; }
      if (!this.isBgMouseDown) { return; }
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    updateBasicStyle() {
      this.$nextTick(() => {
        const modalEl = this.$refs.modal;
        const footerEl = this.$refs.footer;
        if (!this.hasDragged) {
          this.marginTop = -modalEl.offsetHeight / 2;
          this.marginLeft = -modalEl.offsetWidth / 2;
        }
        this.paddingBottom = footerEl.offsetHeight;

        // 特殊定位函数
        if (!this.hasDragged && this.setModalPosition) {
          const { left, top } = (this.setModalPosition(this.$refs.modal)) || {};
          const modalEl = this.$refs.modal;
          const modalPositionData = {};
          if (typeof left !== 'undefined') {
            modalPositionData.left = `${left + modalEl.offsetWidth / 2}px`;
          }
          if (typeof top !== 'undefined') {
            modalPositionData.top = `${top + modalEl.offsetHeight / 2}px`;
          }
          this.modalPositionData = modalPositionData;
        }

        // 判断是否需要加上底部边框
        const bodyEl = this.$refs.body;
        if (this.bodyHeight && bodyEl && bodyEl.scrollHeight > this.bodyHeight) {
          this.overflowBorderBottom = true;
        } else {
          this.overflowBorderBottom = false;
        }
      });
    },
    handleMouseDown(e) {
      if (!this.$refs.header.contains(e.target)) { return; }
      e.preventDefault();
      this.isDragging = true;
      this.dragPointX = e.pageX;
      this.dragPointY = e.pageY;
    },
    handleMouseUp() {
      if (!this.draggable) { return; }
      this.isDragging = false;
    },
    handleMouseOut() {
      if (!this.draggable) { return; }
      this.isDragging = false;
    },
    handleMouseMove(e) {
      if (!this.draggable || !this.isDragging) { return; }
      const modalEl = this.$refs.modal;

      const offsetY = e.pageY - this.dragPointY;
      const offsetX = e.pageX - this.dragPointX;
      this.dragPointX = e.pageX;
      this.dragPointY = e.pageY;

      // 左右不超出边界
      if ((modalEl.offsetWidth + modalEl.offsetLeft >= document.body.offsetWidth && offsetX > 0) ||
        (modalEl.offsetLeft <= 0 && offsetX < 0)) {
        return;
      }
      if (modalEl.offsetHeight + modalEl.offsetTop >= document.body.offsetHeight && offsetY > 0) {
        return;
      }

      this.marginTop += offsetY;
      this.marginLeft += offsetX;

      // 避免出现横向滚动条
      this.$nextTick(() => {
        if (modalEl.offsetWidth + modalEl.offsetLeft >= document.body.offsetWidth && offsetX > 0) {
          this.marginLeft -= offsetX;
        }
      });
    },

    lockDocBody() {
      // 禁止滚动穿透
      document.body.style.overflow = 'hidden';
    },

    unlockDocBody() {
      // 恢复body
      document.body.style.overflow = '';
    },

    handleVisibleChange(newVal) {
      if (newVal) {
        this.handleVisibleChangeToTrue();
      } else {
        if (!this.closed) this.$emit('close');
        this.isBgMouseDown = false;
        if (this.bodyLocked) {
          this.unlockDocBody();
        }
      }
    },

    handleVisibleChangeToTrue() {
      this.$nextTick(() => {
        this.closed = false;
        this.$emit('open');
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.updateBasicStyle();
        if (this.bodyLocked) {
          this.lockDocBody();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.plv-demo-modal-default {
  z-index: 10001;
  position: fixed;
}

.plv-demo-modal-default__bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}

.plv-demo-modal-default__content {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -280px;
  padding-top: 50px;
  background-color: #fefefe;
  width: 560px;
  min-height: 330px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(236, 239, 241, 1);
}

.plv-demo-modal-default__close {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  color: #90A4AE;
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  line-height: 51px;
  transition: all .3s ease-in-out;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url(./imgs/icon-close-normal.png);
  background-size: cover;
  background-position: center;
  &:hover {
    background-image: url(./imgs/icon-close-hover.png);
  }
  &:active {
    background-image: url(./imgs/icon-close-press.png);
  }
}

.plv-demo-modal-default__header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 51px;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ECEFF1;

  h2 {
    padding: 0;
    margin: 0;
    font-weight: normal;
    line-height: 51px;
    font-size: 14px;
    color: #333;
    user-select: none;
  }
}

.plv-demo-modal-default__body {
  &--border {
    overflow: auto;
    border-bottom: 1px solid #ECEFF1;
  }
}

.plv-demo-modal-default__footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.modal-fade-enter-active {
  animation: modal-fade-in .3s;
}

.modal-fade-leave-active {
  animation: modal-fade-out .3s;
}

@keyframes modal-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes modal-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
