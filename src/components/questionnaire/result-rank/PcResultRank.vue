<template>
  <div>
    <div class="plv-iar-result-rank__top-container">
      <div class="plv-iar-result-rank__title">
        <img :src="titleImage" />
      </div>
      <div class="plv-iar-result-rank__top-content">
        <div v-for="(topItem, topIndex) of topResults" :key="topIndex" class="plv-iar-result-rank__top-item">
          <div class="plv-iar-result-rank__top-item__avatar-item">
            <div class="plv-iar-result-rank__top-item__avatar">
              <img :src="topItem.avatar" />
            </div>
            <img :src="rankIcon[topIndex]" class="plv-iar-result-rank__top-item__rank-icon" />
          </div>
          <div
            class="plv-iar-result-rank__top-item__nickanme"
            :class="{
              'plv-iar-result-rank__top-item__nickanme__empty': !topItem.hasUser
            }"
          >
            {{ topItem.nickname }}
          </div>
          <template v-if="topItem.hasUser">
            <div class="plv-iar-result-rank__top-item__score">{{ topItem.score }} 分</div>
            <div class="plv-iar-result-rank__top-item__cost-time">
              <img src="./imgs/icon-time-white.svg" class="plv-iar-result-rank__top-item__cost-time__icon" />
              {{ topItem.costTimeStr }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="plv-iar-result-rank__content">
      <v-table :columns="columns" :data-list="bottomResults" :tbody-height="'200px'">
        <template #nickname="{slotData}">
          <div class="plv-iar-result-rank__content__name">
            <img :src="slotData.avatar" class="plv-iar-result-rank__content__avatar" />
            <span>{{ slotData.nickname }}</span>
          </div>
        </template>
        <template #costTime="{slotData}">
          <div class="plv-iar-result-rank__content__cost-time">
            <img src="./imgs/icon-time.svg" class="plv-iar-result-rank__content__cost-time__icon" />
            <span>{{ slotData.costTimeStr }}</span>
          </div>
        </template>
        <template #score="{slotData}">
          <span>{{ slotData.score }} {{ iarTrans('questionnaire.scoreUnit') }}</span>
        </template>
      </v-table>
    </div>
    <div v-if="userRankArr.length !== 0" class="plv-iar-result-rank__footer">
      <v-table
        :columns="columns"
        :data-list="userRankArr"
        :tbody-height="'56px'"
        :has-header="false"
      >
        <template #nickname="{slotData}">
          <div class="plv-iar-result-rank__content__name">
            <img :src="slotData.avatar" class="plv-iar-result-rank__content__avatar" />
            <span>{{ slotData.nickname }}</span>
          </div>
        </template>
        <template #costTime="{slotData}">
          <div class="plv-iar-result-rank__content__cost-time">
            <img src="./imgs/icon-time.svg" class="plv-iar-result-rank__content__cost-time__icon" />
            <span>{{ slotData.costTimeStr }}</span>
          </div>
        </template>
        <template #score="{slotData}">
          <span>{{ slotData.score }} {{ iarTrans('questionnaire.scoreUnit') }}</span>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
export default {
  mixins: [mixin],
  computed: {
    columns() {
      return [
        {
          label: this.iarTrans('questionnaire.rankLabel'),
          props: 'rankIndex',
          width: '100px'
        },
        {
          label: this.iarTrans('questionnaire.nicknameLabel'),
          props: 'nickname',
          slotName: 'nickname'
        },
        {
          label: this.iarTrans('questionnaire.costTimeLabel'),
          props: 'costTime',
          slotName: 'costTime'
        },
        {
          label: this.iarTrans('questionnaire.scoreLabel'),
          props: 'score',
          width: '100px',
          slotName: 'score'
        }
      ];
    }
  },
};
</script>

<style lang="scss">
.plv-iar-result-rank__top-container {
  background-image: linear-gradient(270deg, #FF2B2B 0%, #FFB579 99%);
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plv-iar-result-rank__title {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  img {
    width: 88px;
  }
}

.plv-iar-result-rank__top-content {
  padding: 0 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  color: #fff;
  font-size: 14px;
  .plv-iar-result-rank__top-item {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 160px;
    background-image: url('./imgs/pc-top-rank-base.svg');
    background-size: 160px 120px;
    background-repeat: no-repeat;
    height: 120px;
    position: relative;
    .plv-iar-result-rank__top-item__avatar-item {
      position: absolute;
      top: -55px;
      .plv-iar-result-rank__top-item__avatar {
        border-style: solid;
        border-width: 3px;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        img {
          height: 60px;
          width: 60px;
        }
      }
      .plv-iar-result-rank__top-item__rank-icon {
        position: absolute;
        width: 28px;
        left: 50%;
        top: -15px;
        transform: translateX(-50%);
      }
    }
    .plv-iar-result-rank__top-item__nickanme {
      margin-top: 20px;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      width: 120px;
      font-weight: bold;
      &__empty {
        margin-top: 30px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .plv-iar-result-rank__top-item__score {
      margin-bottom: 12px;
    }
    .plv-iar-result-rank__top-item__cost-time {
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      .plv-iar-result-rank__top-item__cost-time__icon {
        margin-right: 4px;
        width: 14px;
        height: 14px;
      }
    }
    &:nth-child(1) {
      .plv-iar-result-rank__top-item__avatar-item {
        .plv-iar-result-rank__top-item__avatar {
          border-color: #c1d8ff;
        }
      }
    }
    &:nth-child(2) {
      margin-bottom: 15px;
      .plv-iar-result-rank__top-item__avatar-item {
        .plv-iar-result-rank__top-item__avatar {
          border-color: #f0c753;
        }
      }
      .plv-iar-result-rank__top-item__nickanme {
        margin-top: 36px;
        margin-bottom: 4px;
      }
    }
    &:nth-child(3) {
      .plv-iar-result-rank__top-item__avatar-item {
        .plv-iar-result-rank__top-item__avatar {
          border-color: #ff8750;
        }
      }
    }
    &:only-of-type {
      margin-bottom: 15px;
      .plv-iar-result-rank__top-item__avatar-item {
        .plv-iar-result-rank__top-item__avatar {
          border-color: #f0c753;
        }
      }
      .plv-iar-result-rank__top-item__nickanme {
        margin-top: 36px;
        margin-bottom: 4px;
      }
    }
  }
}

.plv-iar-result-rank__content {
  position: relative;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  margin-top: -15px;
  background-color: #fffbf8;
  .plv-ia-c-table-wrapper {
    background-color: #fffbf8;
  }
  .plv-ia-c-table-wrapper-table-tbody--inner {
    padding-bottom: 56px;
  }
}

.plv-iar-result-rank__content, .plv-iar-result-rank__footer {
  .plv-iar-result-rank__content__name {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    align-items: center;
  }
  .plv-iar-result-rank__content__avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    margin-right: 24px;
    margin-left: 10px;
  }
  .plv-iar-result-rank__content__cost-time {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    .plv-iar-result-rank__content__cost-time__icon {
      margin-right: 4px;
      width: 14px;
      height: 14px;
    }
  }
  ::v-deep .plv-ia-c-table-wrapper {
    .plv-ia-c-table-wrapper-table-thead {
      .plv-ia-c-table-wrapper-table-thead-tr {
        background-color: #fffbf8;
        font-weight: 400;
        color: #757575;
        font-size: 12px;
      }
    }
    .plv-ia-c-table-wrapper-table-tbody-tr {
      background-color: #fffbf8;
      color: #333333;
      font-weight: 500;
      .plv-ia-c-table-wrapper-table-tbody-td {
        padding: 0;
      }
    }
  }
}

.plv-iar-result-rank__footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  background-color: #fff;
  padding-top: 12px;
  ::v-deep .plv-ia-c-table-wrapper {
    .plv-ia-c-table-wrapper-table-tbody-tr {
      background-color: #fff;
      line-height: 56px;
      height: 56px;
    }
    .plv-ia-c-table-wrapper-table-tbody-td {
      line-height: 56px;
      height: 56px;
    }
  }
}
</style>
