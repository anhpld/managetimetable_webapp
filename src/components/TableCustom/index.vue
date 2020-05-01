<template>
    <div class="table-custom">
        <div class="table-custom__main">
            <ul class="table-custom__main--lever-wrapper">
                <li v-for="oneSlot in header" :key="oneSlot" class="table-custom__main--lever-header">
                    {{ oneSlot }}
                </li>
            </ul>
            <div class="list-subject">
                <div v-for="item in listSlotData" :key="item" class="list-subject-content">
                    <p v-if="item.room" class="list-subject-content_name">{{ item.room }}</p>
                    <p v-if="item.slotNumber" class="list-subject-content_name">Slot {{ item.slotNumber }}</p>
                    <ul class="table-custom__main--lever">
                        <li v-for="oneSlot in header" :key="oneSlot" class="table-custom__main--lever-item">
                            <div v-for="oneContent in item.timetable" :key="oneContent" class="table-custom__content"
                                 v-if="oneContent.slot && oneContent.slot === oneSlot"
                                 @click="getDataItemArrange(oneContent)"
                                 v-bind:class="{active : oneContent.id===dataChange.id}">
                                <div>
                                    <span>{{ oneContent.className }}</span>
                                    <span>{{ oneContent.subjectCode }}</span>
                                    <span v-if="groupBy==='lecturer' && oneContent.timetableStatus==='DRAFT'" class="name-item" >{{ oneContent.room }}</span>
                                    <span v-if="groupBy==='lecturer' && oneContent.timetableStatus==='PUBLIC'" class="name-item-public" >{{ oneContent.room }}</span>
                                  <span v-if="groupBy==='lecturer' && oneContent.timetableStatus==='FINAL'" class="name-item-final" >{{ oneContent.room }}</span>
                                  <span v-if="groupBy==='lecturer' && oneContent.timetableStatus==='REJECT'" class="name-item-reject" >
                                    <el-tooltip content="oneContent.resson" placement="bottom" effect="light">
                                      <el-button>{{ oneContent.room }}</el-button>
                                    </el-tooltip>
                                  </span>
                                    <span v-if="groupBy==='room' && oneContent.timetableStatus==='DRAFT'" class="name-item" >{{ oneContent.lecturerShortName }}</span>
                                   <span v-if="groupBy==='room' && oneContent.timetableStatus==='PUBLIC'" class="name-item-public" >{{ oneContent.lecturerShortName }}</span>
                                  <span v-if="groupBy==='room' && oneContent.timetableStatus==='FINAL'" class="name-item-final  " >{{ oneContent.lecturerShortName }}</span>
                                  <span v-if="groupBy==='room' && oneContent.timetableStatus==='REJECT'" class="name-item-reject  " > {{ oneContent.lecturerShortName }}
                                    <div class="content-tooltip">
                                      {{ oneContent.reason}}
                                    </div>
                                  </span>

                                </div>
                            </div>
                            <div v-for="oneContent in item.timetable" :key="oneContent"
                                 class="table-custom__content-calendar"
                                 v-if="oneContent.day && oneContent.day === oneSlot"
                                 @click="getDataItemArrange(oneContent)"
                                 v-bind:class="{active : oneContent.id===dataChange.id}">
                                <div class="content">
                                    <span>{{ oneContent.className }}</span>
                                    <span>{{ oneContent.subjectCode }}</span>
                                    <span>{{ oneContent.room }}</span>
                                    <span class="name-item">{{ oneContent.lecturerShortName }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <span v-if="listSlotData.length === 0" class="no-data">No data</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TableCustom',
  props: [
    'listSlotData',
    'header',
    'groupBy',
    'dataSwap'
  ],
  data() {
    return {
      dataChange: {},
      listDataChange: []
    }
  },
  methods: {
    getDataItemArrange(itemSlot) {
      this.listDataChange = this.dataSwap
      const dataChange = itemSlot
      this.dataChange = itemSlot
      this.listDataChange.push(itemSlot)
      if (this.listDataChange.length > 2) {
        this.listDataChange.splice(0, 1)
      }
      // const index = this.listDataChange.findIndex(item => item.id === itemSlot.id)

      // if (index !== -1) {
      //   this.listDataChange.splice(index, 1)
      // } else {
      //   this.listDataChange.push(itemSlot)
      // }
      this.$emit('dataEdit', dataChange)
      this.$emit('dataSwap', this.listDataChange)
    },
    handleCurrentChange(data) {
      this.currentRow = data
    }
  }
}
</script>

<style lang="scss">
    .table-custom {
        background: white;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        font-size: 12px;
        width: 100%;

        .active {
            background-color: #304156;
            color: #FFF;
            padding: 5px;
        }

        .no-data {
            text-align: center;
            display: block;
            margin-top: 50px;
            margin-bottom: 50px;
            color: #a0a0a0;
        }

        &__content {
          position: relative;
            span {
                display: block;
                padding-bottom: 7px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &-calendar {
                border-bottom: 1px solid #304156;;
                padding: 5px;
                height: 95px;

                span {
                    line-height: 1.5;
                    display: block;
                }

                &:last-child {
                    border-bottom: none;
                }
            }
        }

        &__main--lever {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;

            .name-item {// draft
                color: #409EFF;
                font-weight: 700;
            }
          .name-item-public {
            color:orange;
            font-weight: 700;
          }.name-item-final {
             color: #13ce66;
             font-weight: 700;
           }
          .name-item-reject {
            color: red;
            font-weight: 700;

            .content-tooltip {
              display: none;
            }

            /* width */
            ::-webkit-scrollbar {
              width: 0px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: #888;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #555;
            }

            &:hover {
              .content-tooltip {
                display: block;
                position: absolute;
                width: 200px;
                height: 74px;
                border-radius: 10px;
                background: #304156;
                color: #fff;
                padding: 10px;
                z-index: 99;
                right: 0px;
                font-weight: 400;
                overflow: auto;
                top: 60px;
              }

              &::after {
                content: " ";
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid #304156;
                width: 0;
                height: 0;
                position: absolute;
                top: 55px;
                right: 90px;
              }
            }
          }

            &-header {
                width: calc(100% / 10);
                border-left: 1px solid #babbba;
                padding: 5px;
            }

            &-wrapper {
                padding: 0 0 0 85px;
                margin: 0;
                display: flex;
                list-style: none;
                border-bottom: 1px solid #b3b2b2;
                width: 100%;
                text-align: center;
                font-weight: 600;
                background: #304156;
                color: #fff;
            }

            &-item {
                width: calc(100% / 10);
                padding: 5px;
                border-left: 1px solid #babbba;

                &:hover {
                    cursor: pointer;
                }

                .el-radio__label {
                    display: none;
                }
            }
        }

        .list-subject-content_name {
            font-size: 1.2em;
            color: #304156;
            width: 92px;
            display: block;
            text-align: center;
            font-weight: 600;
        }

        .list-subject-content {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #babbba;;

            &:nth-child(even) {
                background: #e4e4e4;
            }

            &:nth-child(odd) {
                background: white;
            }
        }
    }

</style>
