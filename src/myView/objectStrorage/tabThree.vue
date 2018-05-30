<template>
    <div>
        <p style="font-size:16px;color:#000000;margin-bottom:10px;">操作日志</p>
        <div style="height:40px;display:flex;">
            <div class="journal">
                <span>近一天</span>
                <span>近一周</span>
                <span>近一月</span>
            </div>
            <div class="journal_right">
                <span>开始结束时间</span>
                 <DatePicker type="date" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
                <Button type="primary" size="small">查询</Button>
            </div>
        </div>
        <Table :columns="columns1" :data="data1" ></Table>
    </div>
</template>

<script>
export default {
  data(){
      return{
          data1:[{},{}]
      }
  }
}
</script>

<style lang="less" scoped>
    .journal{
      width: 50%;
        span{
            padding: 6px 16px;
            border:1px solid #D9D9D9;
           margin-right: -2px;
           cursor:pointer;
           display: inline-block;
        }
        span:first-of-type{
             border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        span:last-of-type{
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
        span:hover{
            border: 1px solid #2A99F2;
            color: #2A99F2;
        }
    }
    .journal_right{
      width: 50%;
      text-align: right;
    }
</style>


