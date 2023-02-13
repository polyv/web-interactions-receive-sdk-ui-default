<!-- 口令红包封面 -->
<template>
  <red-envelope-modal
    @close="$emit('close')"
  >
    <red-envelope-cover
      class="plv-iar-red-envelope__cover--password"
      :class="{'plv-iar-red-envelope__cover--no-cover-text': !blessing}"
      :sender="redEnvelopeData.user"
      :cover-img="coverImg"
      :cover-text="blessing"
      @open="handleOpen"
    >
      <template v-if="isAlipayPwdRn" #slot1>
        <div class="plv-iar-red-envelope__cover__total-amount">{{ iarTrans('redEnvelope.totalAmount') }}:{{ redEnvelopeData.totalAmount }}{{ iarTrans('redEnvelope.unit') }}</div>
      </template>
      <template v-if="!isAlipayPwdRn" #slot2>
        <div>
          <div class="plv-iar-red-envelope__cover__input">
            <input
              v-model="password"
              type="text"
              maxlength="20"
              :placeholder="iarTrans('redEnvelope.inputPswPlaceholder')"
            />
            <i v-if="password" class="plv-iar-red-envelope__cover__input-delete" @click="handleDelete"></i>
          </div>
        </div>
      </template>
    </red-envelope-cover>
  </red-envelope-modal>
</template>

<script>
import RedEnvelopeModal from './components/RedEnvelopeModal';
import RedEnvelopeCover from './components/RedEnvelopeCover';
import mixin from './mixin';
export default {
  components: {
    RedEnvelopeModal,
    RedEnvelopeCover,
  },
  mixins: [mixin],
  props: {
    redEnvelopeData: {
      type: Object,
      default: null,
    },
    coverImg: {
      type: [String, undefined],
      required: true,
    },
    isAlipayPwdRn: Boolean,
  },
  data() {
    return {
      password: '', // 口令
    };
  },
  computed: {
    blessing() {
      return this.redEnvelopeData.content || this.redEnvelopeData.blessing || this.redEnvelopeData.greeting;
    }
  },
  methods: {
    handleOpen() {
      this.$emit('open', this.password);
    },
    handleDelete() {
      this.password = '';
    }
  }
};
</script>
<style lang="scss">
.plv-iar-red-envelope__cover--no-cover-text {
  .plv-iar-red-envelope__cover__input {
    margin-top: 24px;
  }
}
.plv-iar-red-envelope__cover__input {
  position: relative;
  width: 220px;
  margin: 0 auto;
  >input {
    width: 100%;
    height: 48px;
    padding: 13px 26px 13px 16px;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    color: #333;
    background-color: #F6F6F6;
    border: 1px solid #F9C25C;
    border-radius: 24px;
    outline: none;
    box-sizing: border-box;
  }
}
.plv-iar-red-envelope__cover__input-delete {
  position: absolute;
  top: 15px;
  right: 6px;
  width: 16px;
  height: 16px;
  background-image: url(./imgs/btn-delete.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.plv-iar-red-envelope__cover__total-amount {
  font-size: 16px;
  line-height: 22px;
  margin-top: 2px;
}
</style>
