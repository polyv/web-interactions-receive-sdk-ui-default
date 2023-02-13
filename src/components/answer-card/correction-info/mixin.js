import basicMixin from '../../../assets/mixins/basic';

export default {
  mixins: [basicMixin],

  props: {
    // selfRight, selfWrong, notSubmit
    selfCorrection: {
      type: String,
    },
  }
};
