<template>
  <div>
    <p>{{ iarTrans('questionnaire.delayTimeTip') }}</p>
    <span :style="{color: countdown.min < 5 ? '#FC1212' : null}">{{ countdown.hour }}</span>
    {{ iarTrans('questionnaire.hours') }}
    <span :style="{color: countdown.min < 5 ? '#FC1212' : null}">{{ countdown.min }}</span>
    {{ iarTrans('questionnaire.minutes') }}
    <span :style="{color: countdown.min < 5 ? '#FC1212' : null}">{{ countdown.second }}</span>
    {{ iarTrans('questionnaire.second') }}
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
export default {
  name: 'CountDownText',
  mixins: [basicMixin],
  props: {
    countdown: {
      type: Object,
      required: true
    }
  }
};
</script>
