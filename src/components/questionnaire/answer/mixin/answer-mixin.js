const QuestionType = ['C', 'J', 'Q', 'R', 'S', 'X'];

export default {
  data() {
    return {
      typeImgArr: [
        {
          scoreLeft: 0,
          scoreRight: 20,
          imgClassName: 'type-img-guard'
        },
        {
          scoreLeft: 21,
          scoreRight: 40,
          imgClassName: 'type-img-stable'
        },
        {
          scoreLeft: 41,
          scoreRight: 60,
          imgClassName: 'type-img-balance'
        },
        {
          scoreLeft: 61,
          scoreRight: 80,
          imgClassName: 'type-img-grow'
        },
        {
          scoreLeft: 81,
          scoreRight: 100,
          imgClassName: 'type-img-ahead'
        },
      ],
      isShowModalWin: false
    };
  },
  watch: {
    isShowModalWin(newVal) {
      const body = document.querySelector('body');
      if (newVal) {
        this.$nextTick(() => {
          if (body.append) {
            body.append(this.$refs.evaluationResultModal);
          } else {
            body.appendChild(this.$refs.evaluationResultModal);
          }
        });
      } else {
        body.removeChild(this.$refs.evaluationResultModal);
      }
    }
  },
  computed: {
    questions() {
      return this.questionResult?.questions.filter(item => QuestionType.includes(item.type));
    },
    typeImg() {
      let imgClassName = '';
      this.typeImgArr.forEach(item => {
        if (this.answerResult.score >= item.scoreLeft && this.answerResult.score <= item.scoreRight) {
          imgClassName = item.imgClassName;
        }
      });
      return imgClassName;
    }
  },
  methods: {
    reTest() {
      this.isShowModalWin = false;
      this.$emit('re-test');
    }
  }
};
