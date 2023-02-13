import basicMixin from '../../../assets/mixins/basic';
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mixins: [basicMixin],
  methods: {
    chooseQuestionnaire(item) {
      this.$emit('choose-questionnaire', item);
    }
  }
};
