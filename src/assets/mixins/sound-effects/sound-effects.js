/**
 * 互动音效。
 * @packageDocumentation
 */
import soundEffectsMP3 from './sound-effects.mp3';
import mutedAudioMP3 from './muted_audio.mp3';

export default {
  props: {
    /** 是否开启互动音效。收到互动消息时会有提示音。 */
    enableSoundEffects: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // 已切换到互动音效音频文件
      isChanged: false,
      _soundEffectsAudio: null
    };
  },

  watch: {
    enableSoundEffects: {
      immediate: true,
      handler(enable) {
        if (!enable || this._soundEffectsAudio) return;
        this.initSoundEffects();
      }
    }
  },

  methods: {
    initSoundEffects() {
      const audio = document.createElement('audio');
      audio.setAttribute('src', mutedAudioMP3);
      this._soundEffectsAudio = audio;

      document.addEventListener('click', this.onDocumentClick);
    },

    onDocumentClick() {
      document.removeEventListener('click', this.onDocumentClick);
      this.playSoundEffects(true);
    },

    changeAudioSource() {
      this._soundEffectsAudio.setAttribute('src', soundEffectsMP3);
      this.isChanged = true;
    },

    async playSoundEffects(shouldChangeAudio = false) {
      if (!this.enableSoundEffects) return;
      if (this._soundEffectsAudio) {
        // 如果调用该方法播放互动音效时未替换 src ，需要先进行替换。如，一刷新页面就收到消息播放互动音效。
        if (!shouldChangeAudio && !this.isChanged) {
          this.changeAudioSource();
        }
        await this._soundEffectsAudio.play();
        if (shouldChangeAudio) {
          this.changeAudioSource();
        }
      }
    },
  }
};
