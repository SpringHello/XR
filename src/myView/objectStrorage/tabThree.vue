<template>
    <div>
        <p style="font-size:16px;color:#000000;margin-bottom:10px;">操作日志</p>
        <div style="height:31px;display:flex;margin-bottom:20px;">
           <ul class="objectList">
                 <li :class="indexs == index? 'objectItems':'objectItem'" v-for="(item,index) in dayList" :key="index" @click="dayClick(index)">{{item.value}}</li>
             </ul>
            <div class="journal_right">
                <span>开始结束时间</span>
                 <DatePicker type="date" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                <Button type="primary" size="small">查询</Button>
            </div>
        </div>
        <Table :columns="journalList" :data="journalData" ></Table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      //操作日志表头
      journalList: [
        {
          key: "caozuo",
          title: "操作"
        },
        {
          key: "jieguo",
          title: "结果"
        },
        {
          key: "shijian",
          title: "操作时间"
        }
      ],
      //操作日志数据
      journalData: [
        {
          caozuo: '添加云主机"yunrui"的"1cpu/1024M内存/0G数据盘"套餐,按需',
          jieguo: "成功",
          shijian: "2017-5-21"
        }
      ],
      dayList:[
          {
              value:'近一天'
          },
          {
              value:'近一周'
          },
          {
              value:'近一月'
          }
      ],
    indexs:0
    };
  },
  methods: {
      dayClick(val){
          this.indexs = val;
      }
  },
  mounted() {
      
  }
};
</script>

<style lang="less" scoped>
.journal {
  width: 50%;
  span {
    padding: 6px 16px;
    border: 1px solid #d9d9d9;
    margin-right: -2px;
    cursor: pointer;
    display: inline-block;
  }
  span:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  span:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  span:hover {
    border: 1px solid #2a99f2;
    color: #2a99f2;
  }
}
.journal_right {
  width: 50%;
  text-align: right;
}
 .objectList {
      width:50%;
      font-family: PingFangSC;
      display: flex;
      li:first-child{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      li:last-child{
        border-top-right-radius:4px;
        border-bottom-right-radius: 4px;
      }
      .objectItem {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #D9D9D9;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItems {
        display: inline-block;
        padding: 5px 16px;
        text-align: center;
        border: 1px solid #2a99f2;
        color: #2a99f2;
        cursor: pointer;
      }
      .objectItem:hover {
        border:1px solid #2a99f2;
        cursor: pointer;
      }
    }
</style>


