<template>
  <div class="plv-iar-feed-back-uploader">
    <toast
      :visible="showUploadInfo"
      :duration="2"
      :text="toastText"
      class="toast-wrap"
      @hidden="handleToastHidden"
    />
    <div class="file-list">
      <div
        v-for="(file, index) of files"
        :key="index"
        class="file-item draggable-item"
      >
        <img :src="file.src" :title="file.name" ondragstart="return false;" />
        <span class="file-remove" @click="remove(index)"></span>
      </div>
      <div v-if="files.length < maxImageLength" class="file-item">
        <div class="add" @click="add">
          <span>+</span>
        </div>
      </div>
    </div>

    <!-- 只接受图片-->
    <input
      v-if="showFileInput"
      ref="file"
      type="file"
      accept="image/jpeg,image/jpg,image/png,image/gif"
      @change="fileChanged"
    />
  </div>
</template>
<script>
import Toast from '../../common/toast/Toast.vue';
export default {
  components: {
    Toast
  },
  props: {
    // 图片现在的大小，单位（M）
    imgSize: {
      type: Number,
      default: 2
    },
    // 最多上传3张图片
    maxImageLength: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      src: '', // 渲染的图片路径
      files: [], // 文件列表
      uploading: false, // 上传状态
      percent: 0, // 上传进度
      showUploadInfo: false, // 是否显示弹窗提示
      toastText: '', // 弹窗提示的内容
      showFileInput: false
    };
  },
  methods: {
    add() {
      this.showFileInput = true;
      this.$nextTick(() => {
        this.$refs.file.click(); // 调用file的click事件
      });
    },
    remove(index) {
      this.files.splice(index, 1);
      this.$emit('get-file', this.files);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      if (this.files.length + list.length > this.maxImageLength) {
        this.toastText = `最多可上传 ${this.maxImageLength} 张图片`;
        this.showUploadInfo = true;
      } else {
        for (let i = 0; i < list.length; i++) {
          // 检验文件是否为图片格式
          const reg = /(\.pjp|\.jpg|\.jpeg|\.png|\.gif)$/i;
          if (!reg.exec(list[i].name)) {
            this.toastText = '请上传图片格式的文件';
            this.showUploadInfo = true;
            break;
          }
          if (!this.isContain(list[i])) {
            if (list[i].size / 1024 > (1024 * this.imgSize)) {
              this.toastText = `请上传不超过 ${this.imgSize}M 的图片`;
              this.showUploadInfo = true;
              break;
            }
            const item = {
              name: list[i].name,
              size: list[i].size,
              file: list[i],
            };
            this.html5Reader(list[i], item);
            this.files.push(item);
            this.$emit('get-file', this.files);
          } else {
            this.toastText = '选择的图片重复';
            this.showUploadInfo = true;
          }
        }
      }
      this.$refs.file.value = '';
      this.showFileInput = false;
    },
    isContain(file) { // 区分文件名字重复
      return this.files.find(
        (item) => item.name === file.name && item.size === file.size
      );
    },
    uploadProgress(evt) {
      const component = this;
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded * 100) / evt.total);
        component.percent = percentComplete / 100;
      } else {
        console.warn('upload progress unable to compute');
      }
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$set(item, 'src', e.target.result);
      };
      reader.readAsDataURL(file);
    },
    handleToastHidden() {
      this.showUploadInfo = false;
    },
  },
};
</script>
<style>
.plv-iar-feed-back-uploader .file-list:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.plv-iar-feed-back-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 80px;
  text-align: left;
}
.plv-iar-feed-back-uploader .file-list .file-item img {
  width: 65px;
  height: 65px;
  border-radius: 4px;
}
.plv-iar-feed-back-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 9px;
  top: -5px;
  width: 16px;
  text-align: center;
  height: 16px;
  cursor: pointer;
  background: url('./img/close.png') no-repeat;
  background-size: cover;
}
.plv-iar-feed-back-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.plv-iar-feed-back-uploader .add {
  width: 65px;
  height: 65px;
  float: left;
  text-align: center;
  line-height: 65px;
  background: #F6F6F6;
  font-size: 30px;
  cursor: pointer;
}
.plv-iar-feed-back-uploader .add span {
  color: #949292;
}
.plv-iar-feed-back-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0;
  background: #f8f8f8;
  border-top: 1px solid #d8d8d8;
}
.plv-iar-feed-back-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.plv-iar-feed-back-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.plv-iar-feed-back-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.plv-iar-feed-back-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.plv-iar-feed-back-uploader > input[type='file'] {
  display: none;
}
.toast-wrap {
  z-index: 99;
}
</style>
