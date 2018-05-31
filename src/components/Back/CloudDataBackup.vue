<template>
    <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 /
         <span>云数据库备份</span>
      </span>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库备份</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>云主机是一台配置好了的服务器，它有您期望的硬件配置、操作系统和网络配置。XRcloud为您提供的云主机具有安全、弹性、高性能等特点。</p>
        </div>
        <div>
          <Tabs type="card" :animated="false">
            <Tab-pane label="数据库备份">
                <Button type="primary" @click="backup = true">创建数据库备份</Button>
                <!-- <Button type="primary" @click="strategy = true" style="margin:0 10px;">创建备份策略</Button>
                <Button type="primary">删除快照</Button> -->
                <Table style="margin-top:10px;" :columns="backupList" :data="backupData"></Table>
                <div style="width:629px;">
                    <p>开发备注：用户在开机状态下制作的快照文件默认保存内存信息，只能在开机状态下回滚。若用户在关机状态下进行回滚操作，需要提示用户：</p>
                    <p>您所选的快照文件包含内存状态，只能在主机开机状态下回滚，请开启主机之后重试。 </p>
                </div>
              
            </Tab-pane>
            <Tab-pane label="云数据库备份策略">
                 <Button type="primary"  @click="strategy = true">创建备份策略</Button>
                <Button type="primary" style="margin:0 10px;">删除策略</Button>
                 <Table style="margin-top:10px;" :columns="backupList" :data="backupData"></Table>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>
    <!-- 制作快照 -->
     <Modal
        v-model="backup"
        title="数据库备份"
        :scrollable="true"
        class="create-snas-modal"
        width="550px"
      >
       <p>您正为<span style="color:#2A99F2;">数据库名称</span>创建备份</p>
       <div style="display:flex;margin:20px 0;">
             <div style="width:60%;">
              <p>备份名称</p>
              <Input type="text" style="width:240px;margin-top:10px;"/>
            </div> 
             <div>
              <p>是否保存内存信息<Icon style="color:#2A99F2;" type="ios-help-outline"></Icon></p>
               <RadioGroup v-model="saveWhether" style="margin-top:18px;">
                <Radio label="0">保存</Radio>
                <Radio label="1">不保存</Radio>
            </RadioGroup>
            </div> 
       </div>
        <p style="color:#999999;">提示：云主机快照为每块磁盘提供<span style="color:#2A99F2;">8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点。您最多能创建3个自动快照策略</p>
        <div >
            <Button >取消</Button>
            <Button type="primary">创建备份</Button>
        </div>
    </Modal>

    <Modal  
    v-model="strategy"
        title="创建备份策略"
        :scrollable="true"
        class="create-snas-modal"
        width="550px">
        <Form ref="strategyData" :model="strategyData" :rules="ruleValidate">
            <div style="display:flex;">
             <FormItem prop="name" style="width:50%;">
                <p>自动备份策略名称</p>
                <Input type="text" v-model="strategyData.name"/>
            </FormItem>
              <FormItem prop="numbers" style="width:50%;">
                <p>自动备份保留个数</p>
                <InputNumber :max="8" :min="0" :formatter="value => `${value}个`" v-model="strategyData.numbers" :editable="false"></InputNumber>
            </FormItem>
            </div>
            <div style="display:flex;">
                 <FormItem prop="name" style="width:50%;">
                <p>自动备份间隔</p>
                <Select>
                    <Option></Option>
                </Select>
            </FormItem>
              <FormItem prop="numbers" style="width:50%;">
                <p>自动备份时间</p>
                <Select>
                    <Option></Option>
                </Select>
            </FormItem>
            </div>
                 <div style="display:flex;">
                 <FormItem prop="name" style="width:50%;">
                <p>自动备份间隔</p>
                 <Select>
                    <Option></Option>
                </Select>
            </FormItem>
              <FormItem prop="numbers" style="width:50%;">
                <p>自动备份时间</p>
                      <RadioGroup v-model="saveWhether" style="margin-top:18px;">
                        <Radio label="0">保存</Radio>
                        <Radio label="1">不保存</Radio>
                        <div></div>
                    </RadioGroup>
                    </FormItem>  
            </div>
          <p style="color:#999999;">提示：云主机快照为每块磁盘提供<span style="color:#2A99F2;">8个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点。您最多能创建3个自动快照策略</p>
        </Form>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //数据库备份弹窗
      backup: false,
      //备份表头
      backupList: [
        {
          type: "selection",
          key: "ddd"
        },
        {
          key: "sss",
          title: "备份名称"
        },
        {
          key: "ccc",
          title: "状态"
        },
        {
          key: "bbb",
          title: "数据库名称"
        },
        {
          key: "kkk",
          title: "快照间隔"
        },
        {
          key: "lll",
          title: "是否保留内存状态"
        },
        {
          key: "ooo",
          title: "创建时间"
        },
        {
          title: "操作",
          render :(h,params) =>{
              return (h,'div'[
                  h('span',{
                      style:{
                          color:'#2A99F2'
                      }
                  },'回滚')
              ])
          }
        }
      ],
      //备份数据
      backupData: [{}],
      //备份策略弹窗
      strategy: false,
      //备份策略
      strategyData: {
        name: "",
        numbers: "0",
        interval: "",
        time: "",
        dataBase: ""
      },
      //选择是否保存
      saveWhether: ""
    };
  }
};
</script>


<style lang="less" scoped>
</style>
