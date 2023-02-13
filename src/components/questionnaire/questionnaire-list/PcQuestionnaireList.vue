<template>
  <div class="plv-iar-questionnaire-list">
    <div v-for="(item, index) in list" :key="index" class="plv-iar-questionnaire-list__item">
      <span class="plv-iar-questionnaire-list__item-status-icon plv-iar-questionnaire-status-icon--ongoing">
        {{ iarTrans('questionnaire.publishing') }}
      </span>
      <div class="plv-iar-questionnaire-name" :title="item.questionnaireTitle">{{ item.questionnaireTitle }}</div>
      <div class="plv-iar-questionnaire-control" @click="chooseQuestionnaire(item)">
        <span>{{ iarTrans('questionnaire.fillHandler') }}</span>
        <img src="../imgs/icon-more.png" />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
export default {
  name: 'PcQuestionnaireList',
  mixins: [mixin],
};
</script>

<style lang="scss">
@import '../../../assets/styles/basic.scss';
.plv-iar-questionnaire-list {
  padding: 20px 16px;
  height: 450px;
  overflow: auto;
  box-sizing: border-box;
  @include scrollbar();
  .plv-iar-questionnaire-name {
    flex: 1;
    font-size: 14px;
    color: #333333;
    line-height: 22px;
    font-weight: bold;
    padding-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 80px;
  }
  .plv-iar-questionnaire-list__item {
    padding: 0 16px 0 20px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    height: 80px;
    border-radius: 4px;
    background: #F6F6F6;
  }
  .plv-iar-questionnaire-list__item-status-icon {
    display: inline-block;
    border: 0.5px solid;
    border-radius: 2px 2px 2px 2px;
    padding: 0 4px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: white;
    margin-right: 8px;
  }
  .plv-iar-questionnaire-control {
    font-size: 12px;
    font-weight: normal;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      margin-left: 4px;
      width: 16px;
      height: 16px;
    }
  }
  .plv-iar-questionnaire-status-icon--ongoing {
    border-color: #FF7342;
    background-color: #FF7342;
  }
}
</style>
