<template>
  <div id="background">
    <div id="wrapper">
      <p style="margin: 20px 0;">云服务器 / 弹性伸缩</p>
      <div id="content">
        <div id="header">
          <span id="title">{{details.stretchname}}</span>
          <div style="float: right">
            <button class="button"  @click="$router.push({path:'elastic'})" style="margin: 10px 10px 0 0;">返回</button>
            <button class="button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
          </div>
        </div>
        <div style="display: flex;width: 700px;">
          <div class="box_one">
            <div>
              <span>最小伸缩数 :</span>
              <span>{{details.minimumexpansionnumber}}</span>
            </div>
            <div>
              <span>最大伸缩数 :</span>
              <span>{{details.maximumexpansionnumber}}</span>
            </div>
            <div>
              <span>期望实例数 :</span>
              <span>{{details.initialinstancenumber}}</span>
            </div>
            <div>
              <span>当前实例数 :</span>
              <span>{{details.currentintacecount}}</span>
            </div>
          </div>
          <div class="box_two">
            <div>
              <span>启动配置 :</span>
              <span>{{details.startconfigname}}</span>
            </div>
            <div>
              <span>所属网络 :</span>
              <span>{{details.vpcname}}</span>
            </div>
            <div>
              <span>子网名称 :</span>
              <span>{{details.subnetname}}</span>
            </div>
          </div>
          <div class="box_one">
            <div>
              <span>移除策略 :</span>
              <span>{{details.removestrategy}}</span>
            </div>
            <div>
              <span>配置负载均衡 :</span>
              <span>{{details.networkloadbalancingname}}</span>
            </div>
            <div>
              <span>创建时间 :</span>
              <span>{{details.createtime}}</span>
            </div>
             <div>
              <span>修改时间 :</span>
              <span>{{details.updatetime}}</span>
            </div>
            <div>
              <span style="color: #2A99F2;cursor: pointer;" @click="updateTelescopic = true">修改伸缩组配置</span>
            </div>
          </div>
        </div>
        <Tabs type="card" :animated="false" style="min-height: 400px;">
           <TabPane label="告警策略">
            <div>
              <Button style="margin-bottom: 10px" type="primary" @click="alarmStrategy.newAddStrategy = true">新建</Button>
              <Table :columns="strategyList" :data="strategyData"></Table>
            </div>
           </TabPane>
          <TabPane label="定时任务">
            <div>
              <Button type="primary" style="margin-bottom: 10px;"  @click="task = true">新建</Button>
              <Table :columns="taskList" :data="taskData"></Table>
            </div>
          </TabPane>
          <TabPane :label="hostDomain">
            <div>
              <Button style="margin-bottom: 10px" type="primary" @click="moveCloudHost = true">移入云主机</Button>
              <Table :columns="cloudHost.hostList" :data="cloudHost.hostData" :loading='protectLoading'></Table>
            </div>
          </TabPane>
          <TabPane label="伸缩活动">
            <div>
              <div style="display: flex;margin-bottom: 10px;">
                <div>
                  <span>操作时间</span>
                  <DatePicker transfer v-model="telescopicActivity.operationTime" type="daterange" confirm placement="bottom-end" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </div>
                <div style="margin-left: 20px;">
                  <span>状态</span>
                  <Select v-model="telescopicActivity.status" style="width:240px" placeholder="请选择状态">
                    <Option v-for="item in telescopicActivity.statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Button type="primary" @click="selectActivity">查询</Button>
                </div>
              </div>
              <Table :loading="activityLoading" :columns="telescopicActivity.activityList" :data="telescopicActivity.activityData"></Table>
               <Page style="margin-top:10px;" :total="total" :current='current' @on-change='selectActivity'	></Page>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <!--新建告警策略-->
    <modal title="新建告警策略" width="550" :mask-closable="false" v-model="alarmStrategy.newAddStrategy">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form :model="alarmStrategy" ref="alarmStrategy" :rules="alarmStrategyValidtor" label-position="top">
        <FormItem label="名称" prop="name">
          <Input v-model="alarmStrategy.name" placeholder="请输入名称" style="width: 240px;"></Input>
          <p style="margin-top:10px;color: #999999;">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
      <div>
        <p style="margin-bottom: 12px">伸缩组内所有云主机<span style="color: #2A99F2;">查看详细统计规则</span></p>
        <div>
          <Select @on-change="cpuSelect" v-model="alarmStrategy.cpuValue" style="width:123px">
            <Option v-for="item in alarmStrategy.cpuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="alarmStrategy.value" style="width:92px">
            <Option v-for="item in alarmStrategy.valueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="alarmStrategy.time" style="width:92px">
            <Option v-for="item in alarmStrategy.timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="alarmStrategy.symbol" style="width:76px">
            <Option v-for="item in alarmStrategy.symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="alarmStrategy.percentage" style="width:69px">
            <Option v-for="item in alarmStrategy.percentageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span class="box_black">{{alarmStrategy.spanValue}}</span>
          <Select v-model="alarmStrategy.count" style="width:95px;margin-top: 5px;">
            <Option v-for="item in alarmStrategy.countList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <p style="margin-bottom: 12px">伸缩组活动</p>
        <div>
          <Select @on-change="theIsdisabled" v-model="alarmStrategy.isAdd" style="width:100px">
            <Option v-for="item in alarmStrategy.isAddList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <InputNumber style="width: 70px"  :min="1" v-model="alarmStrategy.addcount"></InputNumber>
          <Select v-model="alarmStrategy.company" style="width:76px">
            <Option value="台">台</Option>
            <Option value="%" :disabled="alarmStrategy.disabled">%</Option>
          </Select>
          <span>云主机，冷却</span>
          <InputNumber  :min="60" :max="9999" v-model="alarmStrategy.coolingNumber"></InputNumber>
          <span>秒</span>
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">冷却时间是指在同一个伸缩组内，一个伸缩活动（添加或移出云主机）执行完成后的一段锁定时间。在这段时间内，该伸缩组不执行伸缩活动。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
        </div>
      </div>
      <div>
          <FormItem label="告警通知" prop="contacts">
            <Select v-model="alarmStrategy.contacts" style="width:240px"  placeholder="选择联系人" >
              <Option v-for="item in alarmStrategy.contactsList" :value="item.id" :key="item.id">{{ item.username }}</Option>
            </Select>
          </FormItem>
      </div>
      </Form>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="alarmStrategy.newAddStrategy = false">取消</Button>
        <Button type="primary" @click="createAlarmStrategy">完成配置</Button>
      </div>
    </modal>

    <!--修改告警策略-->
    <modal title="修改告警策略" width="550" :mask-closable="false" v-model="updateStrategy.newAddStrategy">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form :model="updateStrategy" ref="updateStrategy" :rules="updateStrategyValidtor" label-position="top">
        <FormItem label="名称" prop="name">
          <Input v-model="updateStrategy.name" placeholder="请输入名称" style="width: 240px;"></Input>
          <p style="margin-top:10px;color: #999999;">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
      <div>
        <p style="margin-bottom: 12px">伸缩组内所有云主机<span style="color: #2A99F2;">查看详细统计规则</span></p>
        <div>
          <Select @on-change="cpuSelect" v-model="updateStrategy.cpuValue" style="width:123px">
            <Option v-for="item in updateStrategy.cpuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="updateStrategy.value" style="width:92px">
            <Option v-for="item in updateStrategy.valueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="updateStrategy.time" style="width:92px">
            <Option v-for="item in updateStrategy.timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="updateStrategy.symbol" style="width:76px">
            <Option v-for="item in updateStrategy.symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="updateStrategy.percentage" style="width:69px">
            <Option v-for="item in updateStrategy.percentageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span class="box_black">{{updateStrategy.spanValue}}</span>
          <Select v-model="updateStrategy.count" style="width:95px;margin-top: 5px;">
            <Option v-for="item in updateStrategy.countList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <p style="margin-bottom: 12px">伸缩组活动</p>
        <div>
          <Select @on-change="theIsdisabled" v-model="updateStrategy.isAdd" style="width:100px">
            <Option v-for="item in updateStrategy.isAddList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <InputNumber style="width: 70px"  :min="1" v-model="updateStrategy.addcount"></InputNumber>
          <Select v-model="updateStrategy.company" style="width:76px">
            <Option value="台">台</Option>
            <Option value="%" :disabled="updateStrategy.disabled">%</Option>
          </Select>
          <span>云主机，冷却</span>
          <InputNumber  :min="60" :max="999" v-model="updateStrategy.coolingNumber"></InputNumber>
          <span>秒</span>
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">冷却时间是指在同一个伸缩组内，一个伸缩活动（添加或移出云主机）执行完成后的一段锁定时间。在这段时间内，该伸缩组不执行伸缩活动。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
        </div>
      </div>
      <div>
          <FormItem label="告警通知" prop="contacts">
            <Select v-model="updateStrategy.contacts" style="width:240px"  placeholder="选择联系人">
              <Option v-for="item in updateStrategy.contactsList" :value="item.id" :key="item.id">{{ item.username }}</Option>
            </Select>
          </FormItem>
      </div>
      </Form>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="updateStrategy.newAddStrategy = false">取消</Button>
        <Button type="primary" @click="updateAlarmStrategy">修改配置</Button>
      </div>
    </modal>

    <!--新建定时任务-->
    <modal title="新建定时任务" width="550" :mask-closable="false" v-model="task">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form :model="timedTask" ref="timedTask" :rules="timedTaskValidtor" label-position="top">
        <FormItem label="名称" prop="name">
          <Input v-model="timedTask.name" placeholder="请输入名称" style="width: 240px;"></Input>
          <p style="color: #999999;margin: 5px 0 0 0">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
      </Form>
      <div class="time_task">
        <p>开始执行时间</p>
        <div>
          <DatePicker type="date" :options="options3"  v-model="timedTask.startTime" placeholder="选择时间" style="width:123px"></DatePicker>
          <Select v-model="timedTask.hour" style="width:92px">
            <Option v-for="item in timedTask.hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>:</span>
          <Select v-model="timedTask.minute" style="width:92px">
            <Option v-for="item in timedTask.minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="timedTask.repeat" style="width:95px">
            <Option v-for="item in timedTask.repeatList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!--重复选择-->
        <div v-if="timedTask.repeat == '1'" style="margin-top: 20px;">
          <p>重复设置</p>
          <Select v-model="timedTask.date" style="width:123px">
            <Option v-for="item in timedTask.dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!--天-->
          <div v-if="timedTask.date == '0'" class="date_select">
            <span>每</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.dayNumber"></InputNumber>
            <span>天执行一次</span>
          </div>
          <!--月-->
          <div v-if="timedTask.date == '1'" class="date_select">
            <span>每月第</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.monthStartNumber"></InputNumber>
            <span>~</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.monthEndNumber"></InputNumber>
            <span>天，每天执行一次</span>
          </div>
          <!--周-->
          <div v-if="timedTask.date == '2'" class="date_select">
            <span>每周</span>
            <ul>
              <li v-for="(item,index) in timedTask.week" @click="weekSelect(index)" :class="{li_select: item.isShow}"   :key="index">{{item.label}}</li>
            </ul>
            <span>执行一次</span>
          </div>
          <!--结束执行时间-->
          <div style="margin-top: 20px;">
            <p>结束执行时间</p>
            <DatePicker type="date" :options="options3" v-model="timedTask.endTime"  placeholder="选择时间" style="width:123px"></DatePicker>
            <Select v-model="timedTask.endHour" style="width:92px">
              <Option v-for="item in timedTask.endHourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>:</span>
            <Select v-model="timedTask.endMinute" style="width:92px">
              <Option v-for="item in timedTask.endMinuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <!--伸缩组活动-->
      <div style="margin-top: 20px;">
        <p>伸缩组活动</p>
        <div>
          <span>更改最小实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.minNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
        <div style="margin: 10px 0;">
          <span>更改最大实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.maxNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
        <div>
          <span>更改期望实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="timedTask.initialNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
      </div>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="task = false">取消</Button>
        <Button type="primary" @click="createTask">完成配置</Button>
      </div>
    </modal>

    <!--修改定时任务-->
    <modal title="修改定时任务" width="550" :mask-closable="false" v-model="updateTask">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form :model="updateTimedTask" ref="updateTimedTask" :rules="updateTaskTimedTaskValidtor" label-position="top">
        <FormItem label="名称" prop="name">
          <Input v-model="updateTimedTask.name" placeholder="请输入名称" style="width: 240px;"></Input>
          <p style="color: #999999;margin: 5px 0 0 0">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
      </Form>
      <div class="time_task">
        <p>开始执行时间</p>
        <div>
          <DatePicker type="date" :options="options3"  v-model="updateTimedTask.startTime" placeholder="Select date" style="width:123px"></DatePicker>
          <Select v-model="updateTimedTask.hour" style="width:92px">
            <Option v-for="item in updateTimedTask.hourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>:</span>
          <Select v-model="updateTimedTask.minute" style="width:92px">
            <Option v-for="item in updateTimedTask.minuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="updateTimedTask.repeat" style="width:95px">
            <Option v-for="item in updateTimedTask.repeatList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!--重复选择-->
        <div v-if="updateTimedTask.repeat == '1'" style="margin-top: 20px;">
          <p>重复设置</p>
          <Select v-model="updateTimedTask.date" style="width:123px">
            <Option v-for="item in updateTimedTask.dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!--天-->
          <div v-if="updateTimedTask.date == '0'" class="date_select">
            <span>每</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.dayNumber"></InputNumber>
            <span>天执行一次</span>
          </div>
          <!--月-->
          <div v-if="updateTimedTask.date == '1'" class="date_select">
            <span>每月第</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.monthStartNumber"></InputNumber>
            <span>~</span>
            <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.monthEndNumber"></InputNumber>
            <span>天，每天执行一次</span>
          </div>
          <!--周-->
          <div v-if="updateTimedTask.date == '2'" class="date_select">
            <span>每周</span>
            <ul>
              <li v-for="(item,index) in updateTimedTask.week" @click="weekSelect(index)" :class="{li_select: item.isShow}"   :key="index">{{item.label}}</li>
            </ul>
            <span>执行一次</span>
          </div>
          <!--结束执行时间-->
          <div style="margin-top: 20px;">
            <p>结束执行时间</p>
            <DatePicker type="date" :options="options3" v-model="updateTimedTask.endTime"  placeholder="Select date" style="width:123px"></DatePicker>
            <Select v-model="updateTimedTask.endHour" style="width:92px">
              <Option v-for="item in updateTimedTask.endHourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>:</span>
            <Select v-model="updateTimedTask.endMinute" style="width:92px">
              <Option v-for="item in updateTimedTask.endMinuteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <!--伸缩组活动-->
      <div style="margin-top: 20px;">
        <p>伸缩组活动</p>
        <div>
          <span>更改最小实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.minNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
        <div style="margin: 10px 0;">
          <span>更改最大实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.maxNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
        <div>
          <span>更改期望实例数为：</span> <InputNumber  style="width: 61px;" :min="1" v-model="updateTimedTask.initialNumber"></InputNumber><span style="margin-left:5px;">台</span>
        </div>
      </div>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="updateTask = false">取消</Button>
        <Button type="primary" @click="updateTaskFunction">完成修改</Button>
      </div>
    </modal>

    <!--移入云主机-->
    <modal title="移入云主机" width="550" :mask-closable="false" v-model="moveCloudHost">
      <hr color="#D8D8D8" size="1">
      <br>
      <p>您正为<span style="color:#2A99F2;">{{details.stretchname}}</span>移入云主机</p>
      <div>
        <div class="move_box">
          <div class="move_box_left">
            <div>
              <p style="height: 27px;">该子网<span style="color:#2A99F2">({{details.subnetname}})</span>下所有主机</p>
            </div>
            <div class="list_box" v-for="(item,index) in intoCloudHost" :key="index">
              <div>
                <p :title="item.computername">{{item.computername}}</p>
              </div>
              <div  @click="hostRightRmove(index)">
                <Icon type="plus"></Icon>
                <span>添加</span>
              </div>
            </div>
          
          </div>
          <div class="move_box_left">
            <div>
              <p style="height: 27px;">已选择主机</p>
            </div>
            <div class="list_box" v-for="(item,index) in removeCloudHost" :key="index">
              <div>
                <p :title="item.computername">{{item.computername}}</p>
              </div>
              <div @click="hostDelete(index)">
                <Icon type="trash-a"></Icon>
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
        <p style="color:#999999;margin-top: 20px;">提示：手动移入的云主机将自动添加到伸缩组所关联的负载均衡中</p>
        <br>
        <hr color="#D8D8D8" size="1">
      </div>
      <div slot="footer">
        <Button type="ghost" @click="moveCloudHost = false">取消</Button>
        <Button type="primary" @click="hostAdd">确定移入</Button>
      </div>
    </modal>


    <!--修改伸缩组-->
    <modal title="修改伸缩组" v-model="updateTelescopic" width="550" :mask-closable="false">
      <hr color="#D8D8D8" size="1">
      <br>
      <Form ref="updateTelescopicList" :model="updateTelescopicList" :rules="updateRuleValidate" style="width: 519px"  label-position="top" inline>
        <FormItem label="名称" prop="stretchname">
          <Input v-model="updateTelescopicList.stretchname" style="width: 240px" placeholder="请输入名称"></Input>
          <p style="color: #999999;margin-top: 11px;">名称不超过16个字符，可输入中文、字母与数字</p>
        </FormItem>
        <FormItem label="启动配置" prop="ownershipbootconfiguration" class="formitem3" >
          <Tooltip placement="right" transfer>
            <p slot="content" style="white-space:normal;">启动配置是自动创建云服务器的模版。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.ownershipbootconfiguration" style="width:240px" placeholder="请选择启动配置" disabled>
            <Option v-for="item in updateTeleList.configureList" :value="item.id" :key="item.id">{{ item.startupconfigname}}</Option>
          </Select>
          <p style="color: #2A99F2;cursor: pointer;margin-top: 11px;" @click="$router.push({path:'newAddElastic'})">新建启动配置</p>
        </FormItem>
        <FormItem label="最小伸缩数" prop="minimumexpansionnumber" class="formitem1">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组中允许的实例最小数量。当伸缩组的云主机数量小于最小伸缩数时，弹性伸缩会增加实例，使得伸缩组当前实例数匹配最小伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.minimumexpansionnumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="负载均衡" class="formitem6" >
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组会自动将新加入的主机添加到负载均衡中。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.externalnetworkloadbalancing" disabled style="width:240px" placeholder="选择负载均衡" @on-change="balancings(updateTelescopicList.externalnetworkloadbalancing)">
            <Option v-for="item in updateTeleList.balancingList" :value="item.loadbalanceroleid" :key="item.loadbalanceroleid">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="最大伸缩数" class="formitem1" prop="maximumexpansionnumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组中允许的实例最大数量。当伸缩组的云主机数量大于最大伸缩数时，弹性伸缩会移出实例，使得伸缩组当前实例数匹配最大伸缩数。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.maximumexpansionnumber" style="width: 240px" placeholder="请输入1-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属网络">
          <Select v-model="updateTelescopicList.belongvpcid" style="width:240px" placeholder="请选择网络" @on-change="changeNetWork" disabled>
            <Option v-for="item in updateTeleList.belongNetworkList" :value="item.vpcid" :key="item.vpcid">{{ item.vpcname }}</Option>
          </Select>
        </FormItem>
        <FormItem label="初始化实例数" class="formitem2" prop="initialinstancenumber">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">伸缩组刚创建时的云服务器数量，伸缩组会为您自动创建对应数量的主机。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Input v-model="updateTelescopicList.initialinstancenumber" style="width: 240px" placeholder="请输入0-30之间的数字"></Input>
        </FormItem>
        <FormItem label="所属子网">
          <Select v-model="updateTelescopicList.belongsubnet"  style="width:240px" placeholder="请选择网络" disabled>
            <Option v-for="item in updateTeleList.belongSubnetList"   :value="item.ipsegmentid" :key="item.ipsegmentid">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="移除策略" class="formitem5">
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space:normal;">当伸缩组要减少实例且有多重选择时，将根据移出策略来选择移出的主机</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.removestrategy" style="width:240px">
            <Option v-for="item in updateTeleList.removePolicyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="防火墙" class="formitem4" >
          <Tooltip  placement="right" transfer>
            <p slot="content" style="white-space: normal;">默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。</p>
            <Icon type="ios-help-outline"></Icon>
          </Tooltip>
          <Select v-model="updateTelescopicList.acclistid" style="width:240px" disabled>
            <Option v-for="item in updateTeleList.firewallList" :value="item.acllistid" :key="item.acllistid">{{ item.acllistname }}</Option>
          </Select>
        </FormItem>
      </Form>
      <p style="color: #999999;">提示：伸缩组创建成功之后，请在伸缩组详情页面继续配置告警策略与定时任务，不然伸缩组无法生效</p>
      <br>
      <hr color="#D8D8D8" size="1">
      <div slot="footer">
        <Button type="ghost" @click="updateTelescopic = false">取消</Button>
        <Button type="primary" @click="updateTelescopicFcuntion">完成修改</Button>
      </div>
    </modal>
  </div>
</template>

<script>

  const nameValidator = (rule,value,callback)=>{
    let reg = /^[0-9a-zA-z\u4E00-\u9FA5]{0,16}$/;
    if(value == ''){
      return callback(new callback('请输入伸缩组名称'));
    }else if(!reg.test(value)){
      return callback(new callback('伸缩组名称格式不正确'));
    }else{
      callback();
    }
  }

  const minNumberValidator = (rule,value,callback) =>{
    let reg = /^([0-9]{1,2}|30)$/;
    if(value == ''){
      return callback(new Error('请输入最小伸缩数'));
    }else if(!reg.test(value)){
      return callback(new Error('请输入0-30之间的数字'));
    }else {
      callback();
    }
  }

  import axios from 'axios'
  export default {
    data(){
      return{

        //伸缩活动页码
        current:1,
        total:0,

        //关联云主机
        hostDomain:h=>{
          return h('div',{
            on:{
              click:()=>{
                this.selectHost();
              }
            }
          },'关联云主机')
        },

        //告警策略
        strategyList:[
          {
            title:'名称',
            width:150,
            render:(h,params)=>{
              const hide = params.row.hide == 1 ? 'inline-block' : 'none';
              return h('div',[
                h('Spin',{
                  style:{
                    display:hide
                  }
                }),
                h('span',{},params.row.strategyname)
              ])
            }
          },
          {
            title:'描述',
            key:'contractileactivity'
          },
          {
            title:'通知接受人',
            key:'alarmlinkmanname',
            width:200
          },
          {
            title:'操作',
            width:150,
            render:(h,parmas) =>{
              return h('div',[
                h('span',{
                  style:{
                    cursor:'pointer',
                    color:'#2A99F2'
                  },
                  on:{
                    click:()=>{
                      this.updateStrategy.newAddStrategy = true;
                      this.updateStrategy.name = parmas.row.strategyname;
                      this.updateStrategy.contacts = Number(parmas.row.alarmlinkmanid);
                      this.updateStrategy.cpuValue = parmas.row.alarmname;
                      this.updateStrategy.time = parmas.row.countcircle.toString();
                      this.updateStrategy.symbol = parmas.row.valuetype;
                      this.updateStrategy.percentage = parmas.row.value <10 ? '0'+parmas.row.value :parmas.row.value+'';
                      this.updateStrategy.count = parmas.row.continuecircle.toString();
                      this.updateStrategy.addCount = Number(parmas.row.addcount);
                      this.updateStrategy.value =  parmas.row.total;
                      this.updateStrategy.coolingNumber = Number(parmas.row.loolingtime);
                      this.updateStrategy.isAdd = parmas.row.isadd;
                      this.updateStrategy.company = '台';
                      this.updateStrategy.id = parmas.row.id.toString();
                    }
                  }
                },'修改'),
                h('span',{
                  style:{
                    cursor:'pointer',
                    color:'#2A99F2',
                    marginLeft:'10px'
                  },
                  on:{
                    click:()=>{
                      this.$Modal.confirm({
                        title:'删除',
                        content:'是否要删除该告警策略?',
                        onOk:()=>{
                          this.deleteAlarmStartegy(parmas.row.id);
                        }
                      })
                    }
                  }
                },'删除')
              ])
            }
          }
        ],
        strategyData:[],

        //伸缩组详情告警策略
        details:{},
        alarmStrategyValidtor:{
          name:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ],
          contacts:[
            {required:true,message:'请选择告警通知人'}
          ]
        },
        alarmStrategy:{
          newAddStrategy:false,
          name:'',
          //cpu
          spanValue:'%',
          cpuList:[
            {
              value:'CPU利用率',
              label:'CPU利用率',
              danw:'%'
            },
            {
              value:'带宽',
              label:'带宽',
              danw:'Mbps'
            },
            {
              value:'速率',
              label:'速率',
              danw:'kb/s'
            }
          ],
          cpuValue:'CPU利用率',
          //值
          value:'max',
          valueList:[
            {
              value:'max',
              label:'最大值'
            },
            {
              value:'avg',
              label:'平均值'
            },
            {
              value:'min',
              label:'最小值'
            }
          ],
          //时间
          time:'3',
          timeList:[
            {
              value:'1',
              label:'1分钟'
            },
            {
              value:'2',
              label:'2分钟'
            },
            {
              value:'3',
              label:'3分钟'
            },
            {
              value:'4',
              label:'4分钟'
            },
            {
              value:'5',
              label:'5分钟'
            },
          ],
          //符号
          symbol:'>',
          symbolList:[
            {
              value:'>',
              label:'>'
            },
            {
              value:'<',
              label:'<'
            },
            {
              value:'=',
              label:'='
            }
          ],
          //百分比数值
          percentage:'80',
          percentageList: [
            {value:'80',label:'80'}
          ],
          //连续几次
          count:'3',
          countList:[
            {
              value:'1',
              label:'连续1次'
            },
            {
              value:'2',
              label:'连续2次'
            },
            {
              value:'3',
              label:'连续3次'
            },
            {
              value:'4',
              label:'连续4次'
            },
            {
              value:'5',
              label:'连续5次'
            },
          ],
          //冷却几秒
          coolingNumber:60,
          //联系人
          contacts:'',
          contactsList:[],
          //伸缩活动增加数量
          addcount:1,
          //伸缩活动单位
          company:'台',
          //伸缩活动策略
          isAdd:'增加',
          isAddList:[
            {
              value:'增加',
              label:'增加'
            },
            {
              value:'减少',
              label:'减少'
            },
            {
              value:'调整至',
              label:'调整至'
            }
          ],
          //单位是否可选
          disabled:false
        },

        //修改告警策略
        updateStrategyValidtor:{
          name:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ],
          contacts:[
            {required:true,message:'请选择告警通知人'}
          ]
        },
        updateStrategy:{
          newAddStrategy:false,
          name:'',
          //cpu
          spanValue:'%',
          cpuList:[
            {
              value:'CPU利用率',
              label:'CPU利用率',
              danw:'%'
            },
            {
              value:'带宽',
              label:'带宽',
              danw:'Mbps'
            },
            {
              value:'速率',
              label:'速率',
              danw:'kb/s'
            }
          ],
          cpuValue:'',
          //值
          value:'',
          valueList:[
            {
              value:'max',
              label:'最大值'
            },
            {
              value:'avg',
              label:'平均值'
            },
            {
              value:'min',
              label:'最小值'
            }
          ],
          //时间
          time:'',
          timeList:[
            {
              value:'1',
              label:'1分钟'
            },
            {
              value:'2',
              label:'2分钟'
            },
            {
              value:'3',
              label:'3分钟'
            },
            {
              value:'4',
              label:'4分钟'
            },
            {
              value:'5',
              label:'5分钟'
            },
          ],
          //符号
          symbol:'',
          symbolList:[
            {
              value:'>',
              label:'>'
            },
            {
              value:'<',
              label:'<'
            },
            {
              value:'=',
              label:'='
            }
          ],
          //百分比数值
          percentage:'',
          percentageList: [
          ],
          //连续几次
          count:'',
          countList:[
            {
              value:'1',
              label:'连续1次'
            },
            {
              value:'2',
              label:'连续2次'
            },
            {
              value:'3',
              label:'连续3次'
            },
            {
              value:'4',
              label:'连续4次'
            },
            {
              value:'5',
              label:'连续5次'
            },
          ],
          //冷却几秒
          coolingNumber:1,
          //联系人
          contacts:'',
          contactsList:[],
          //伸缩活动增加数量
          addcount:1,
          //伸缩活动单位
          company:'',
          //伸缩活动策略
          isAdd:'添加',
          isAddList:[
            {
              value:'增加',
              label:'增加'
            },
            {
              value:'减少',
              label:'减少'
            },
            {
              value:'调整至',
              label:'调整至'
            }
          ],
          //单位是否可选
          disabled:false
        },

        //关联云主机
        moveCloudHost:false,
        cloudHost:{
          hostList:[
            {
              title:'云主机名称',
              key:'computername'
            },
            {
              title:'监控状态',
              key:'monitorstatus',
              render:(h,parmas)=>{
                return h('span',{},parmas.row.monitorstatus == '1' ?'正常':'异常')
              }
            },
            {
              title:'生命周期',
              render:(h,params)=>{
                return h('span',{},params.row.lifetime == 1?'正常':params.row.lifetime == 2?'创建中':'加入负载均衡中')
              }
            },
            {
              title:'移除保护',
              width:100,
              render:(h,params)=>{
                return h('span',{},params.row.removeprotect == '0' ?'无':'有')
              }
            },
            {
              title:'加入方式',
              width:100,
              render:(h,params)=>{
                return h('div',[
                  h('span',{},params.row.joinway == 'manual'?'手动':'自动')
                ])
              }
            },
            {
              title:'启动配置',
              render:(h,params) =>{
                return h('span',{
                  style:{
                    color:'#2A99F2',
                    cursor:'pointer'
                  },
                  on:{
                    click:()=>{
                       sessionStorage.setItem('elastic_id',params.row.startconfiguration);
                       this.$router.push({path:'elasticDetails'})
                    }
                  }
                },params.row.startconfigurationname)
              }
            },
            {
              title:'加入时间',
              key:'jointime'
            },
            {
              title:'操作',
              render:(h,params)=>{
                return h('div',
                  {
                    style:{
                      color:'#2A99F2'
                    }
                  },
                  [
                  h('span',{
                    style:{
                      cursor:'pointer',
                      marginRight:'10px'
                    },
                    on:{
                      click:()=>{
                        this.removeHost(params.row);
                      }
                    }
                  },'移出'),
                  h('span',{
                    style:{
                      cursor:'pointer',
                      marginRight:'5px'
                    }
                  },[
                    h('span',{
                      on:{
                        click:()=>{
                          this.outProtect = !this.outProtect
                          if(this.outProtect){
                             this.removeProtect(params.row,1);
                          }else{
                             this.removeProtect(params.row,0);
                          }
                        }
                      }
                    },'移除保护'),
                    h('i-Switch',{
                      props:{
                        size:'small',
                        value:params.row.removeprotect == '1' ? true : false
                      },
                       style: {
                        verticalAlign: 'middle'
                      },
                      on:{
                        input:(event)=>{
                          if(event){
                            this.outProtect = true;
                            this.removeProtect(params.row,1);
                          }else{
                            this.outProtect = false;
                            this.removeProtect(params.row,0);
                          }
                        }
                      }
                    })
                  ]),
                ])
              }
            }
          ],
          hostData:[]
        },

        //移入云主机
        intoCloudHost:[],
        removeCloudHost:[],

        //伸缩组活动
        telescopicActivity:{
          status:'',
          statusList:[
            {
              value:'1',
              label:'成功'
            },
            {
              value:'-1',
              label:'失败'
            }
          ],
          activityData:[],
          activityList:[
            {
              title:'活动ID',
              key:'id',
              width:100
            },
            {
              title:'描述',
              width:500,
              key:'description'
            },
            {
              title:'状态',
              render:(h,params)=>{
                return h('span',{},params.row.status == 1 ?'成功':'失败')
              }
            },
            {
              title:'加入时间',
              key:'starttime'
            },
            {
              title:'结束时间',
              key:'endtime'
            }
          ],
          operationTime:[]
        },
        activityLoading:false,

        //定时任务
        options3: {
          //不可选日期
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        task:false,
        taskList:[
          {
            title:'名称',
            width:150,
            render:(h,params)=>{
              const hide = params.row.hide == 1 ? 'inline-block' : 'none';
              return h('div',[
                h('Spin',{
                  style:{
                    display:hide
                  }
                }),
                h('span',{},params.row.taskname)
              ])
            }
          },
          {
            title:'描述',
            key:'description'
          },
          {
            title:'操作',
            width:150,
            render:(h,params)=>{
              return h('div',[
                h('span',{
                  style:{
                    cursor:'pointer',
                    color:'#2A99F2'
                  },
                  on:{
                    click:()=>{
                      this.updateTask = true;
                      this.updateTimedTask.id = params.row.id;
                      this.updateTimedTask.name = params.row.taskname;
                      //开始时间
                      this.updateTimedTask.startTime = params.row.starttime.substring(0,params.row.starttime.indexOf(' '));
                      this.updateTimedTask.hour = params.row.starttime.substring(params.row.starttime.indexOf(' ')+1,params.row.starttime.indexOf(':'));
                      this.updateTimedTask.minute = params.row.starttime.substring(params.row.starttime.indexOf(':')+1,params.row.starttime.length);
                      //结束时间
                      this.updateTimedTask.endTime = params.row.endtime.substring(0,params.row.endtime.indexOf(' '));
                      this.updateTimedTask.endHour = params.row.endtime.substring(params.row.endtime.indexOf(' ')+1,params.row.endtime.indexOf(':'));
                      this.updateTimedTask.endMinute = params.row.endtime.substring(params.row.endtime.indexOf(':')+1,params.row.endtime.length);
                      this.updateTimedTask.date = params.row.day == 'day' ? '0':params.row.day == 'week' ? '2':'1';
                      this.updateTimedTask.dayNumber = Number(params.row.daycount);
                      this.updateTimedTask.maxNumber = params.row.readjustmaxsize;
                      this.updateTimedTask.minNumber = params.row.readjustmixsize;
                      this.updateTimedTask.initialNumber = params.row.readjustdesiredcapacity;
                      this.updateTimedTask.repeat = params.row.recurrence;
                    }
                  }
                },'修改'),
                h('span',{
                  style:{
                    cursor:'pointer',
                    color:'#2A99F2',
                    marginLeft:'10px'
                  },
                  on:{
                    click:()=>{
                      this.$Modal.confirm({
                        title:'删除',
                        content:'是否要删除该定时任务?',
                        onOk:()=> {
                          this.deleteTask(params.row.id,params.row._index);
                        }
                      })
                    }
                  }
                },'删除'),
              ])
            }
          }
        ],
        taskData:[],
        timedTask:{
          name:'',
          //小时
          hour:'03',
          hourList:[
            {
              value:'00',
              label:'00时'
            },
            {
              value:'01',
              label:'01时'
            },
            {
              value:'02',
              label:'02时'
            },
            {
              value:'03',
              label:'03时'
            },
            {
              value:'04',
              label:'04时'
            },
            {
              value:'05',
              label:'05时'
            },
            {
              value:'06',
              label:'06时'
            },
            {
              value:'07',
              label:'07时'
            },
            {
              value:'08',
              label:'08时'
            },
            {
              value:'09',
              label:'09时'
            },
            {
              value:'10',
              label:'10时'
            },
            {
              value:'11',
              label:'11时'
            },
            {
              value:'12',
              label:'12时'
            },
            {
              value:'13',
              label:'13时'
            },
            {
              value:'14',
              label:'14时'
            },
            {
              value:'15',
              label:'15时'
            },
            {
              value:'16',
              label:'16时'
            },
            {
              value:'17',
              label:'17时'
            },
            {
              value:'18',
              label:'18时'
            },
            {
              value:'19',
              label:'19时'
            },
            {
              value:'20',
              label:'20时'
            },
            {
              value:'21',
              label:'21时'
            },
            {
              value:'22',
              label:'22时'
            },
            {
              value:'23',
              label:'23时'
            },
          ],
          //分钟
          minute:'00',
          minuteList:[],
          //是否重复
          repeat:'0',
          repeatList:[
            {
              value:'1',
              label:'重复'
            },
            {
              value:'0',
              label:'不重复'
            }
          ],
          //重复选项时间选择
          date:'0',
          dateList:[
            {
              value:'0',
              label:'按天'
            },
            {
              value:'1',
              label:'按月'
            },
            {
              value:'2',
              label:'按周'
            }
          ],
          //重复选项执行天数
          dayNumber:1,
          //重复选项执行周数
          week:[
            {
              value:'星期一',
              label:'1',
              isShow:false
            },
            {
              value:'星期二',
              label:'2',
              isShow:false
            },
            {
              value:'星期三',
              label:'3',
              isShow:false
            },
            {
              value:'星期四',
              label:'4',
              isShow:false
            },
            {
              value:'星期五',
              label:'5',
              isShow:false
            },
            {
              value:'星期六',
              label:'6',
              isShow:false
            },
            {
              value:'星期日',
              label:'7',
              isShow:false
            },
          ],
          weekList:[],
          weekIndex:-1,
          //重复选项执行月
          monthStartNumber:1,
          monthEndNumber:1,
          //结束小时
          endHour:'',
          endHourList:[
            {
              value:'00',
              label:'00时'
            },
            {
              value:'01',
              label:'01时'
            },
            {
              value:'02',
              label:'02时'
            },
            {
              value:'03',
              label:'03时'
            },
            {
              value:'04',
              label:'04时'
            },
            {
              value:'05',
              label:'05时'
            },
            {
              value:'06',
              label:'06时'
            },
            {
              value:'07',
              label:'07时'
            },
            {
              value:'08',
              label:'08时'
            },
            {
              value:'09',
              label:'09时'
            },
            {
              value:'10',
              label:'10时'
            },
            {
              value:'11',
              label:'11时'
            },
            {
              value:'12',
              label:'12时'
            },
            {
              value:'13',
              label:'13时'
            },
            {
              value:'14',
              label:'14时'
            },
            {
              value:'15',
              label:'15时'
            },
            {
              value:'16',
              label:'16时'
            },
            {
              value:'17',
              label:'17时'
            },
            {
              value:'18',
              label:'18时'
            },
            {
              value:'19',
              label:'19时'
            },
            {
              value:'20',
              label:'20时'
            },
            {
              value:'21',
              label:'21时'
            },
            {
              value:'22',
              label:'22时'
            },
            {
              value:'23',
              label:'23时'
            },
          ],
          //结束分钟
          endMinute:'',
          endMinuteList:[],
          //实例数
          minNumber:1,
          maxNumber:1,
          initialNumber:1,
          //结束执行
          startTime:'',
          endTime:''
        },
        timedTaskValidtor:{
          name:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ]
        },

        //修改定时任务
        updateTask:false,
        updateTimedTask:{
          id:'',
          name:'',
          //小时
          hour:'',
          hourList:[
            {
              value:'00',
              label:'00时'
            },
            {
              value:'01',
              label:'01时'
            },
            {
              value:'02',
              label:'02时'
            },
            {
              value:'03',
              label:'03时'
            },
            {
              value:'04',
              label:'04时'
            },
            {
              value:'05',
              label:'05时'
            },
            {
              value:'06',
              label:'06时'
            },
            {
              value:'07',
              label:'07时'
            },
            {
              value:'08',
              label:'08时'
            },
            {
              value:'09',
              label:'09时'
            },
            {
              value:'10',
              label:'10时'
            },
            {
              value:'11',
              label:'11时'
            },
            {
              value:'12',
              label:'12时'
            },
            {
              value:'13',
              label:'13时'
            },
            {
              value:'14',
              label:'14时'
            },
            {
              value:'15',
              label:'15时'
            },
            {
              value:'16',
              label:'16时'
            },
            {
              value:'17',
              label:'17时'
            },
            {
              value:'18',
              label:'18时'
            },
            {
              value:'19',
              label:'19时'
            },
            {
              value:'20',
              label:'20时'
            },
            {
              value:'21',
              label:'21时'
            },
            {
              value:'22',
              label:'22时'
            },
            {
              value:'23',
              label:'23时'
            },
          ],
          //分钟
          minute:'',
          minuteList:[],
          //是否重复
          repeat:'0',
          repeatList:[
            {
              value:'1',
              label:'重复'
            },
            {
              value:'0',
              label:'不重复'
            }
          ],
          //重复选项时间选择
          date:'0',
          dateList:[
            {
              value:'0',
              label:'按天'
            },
            {
              value:'1',
              label:'按月'
            },
            {
              value:'2',
              label:'按周'
            }
          ],
          //重复选项执行天数
          dayNumber:1,
          //重复选项执行周数
          week:[
            {
              value:'星期一',
              label:'1',
              isShow:false
            },
            {
              value:'星期二',
              label:'2',
              isShow:false
            },
            {
              value:'星期三',
              label:'3',
              isShow:false
            },
            {
              value:'星期四',
              label:'4',
              isShow:false
            },
            {
              value:'星期五',
              label:'5',
              isShow:false
            },
            {
              value:'星期六',
              label:'6',
              isShow:false
            },
            {
              value:'星期日',
              label:'7',
              isShow:false
            },
          ],
          weekList:[],
          weekIndex:-1,
          //重复选项执行月
          monthStartNumber:1,
          monthEndNumber:1,
          //结束小时
          endHour:'',
          endHourList:[
            {
              value:'00',
              label:'00时'
            },
            {
              value:'01',
              label:'01时'
            },
            {
              value:'02',
              label:'02时'
            },
            {
              value:'03',
              label:'03时'
            },
            {
              value:'04',
              label:'04时'
            },
            {
              value:'05',
              label:'05时'
            },
            {
              value:'06',
              label:'06时'
            },
            {
              value:'07',
              label:'07时'
            },
            {
              value:'08',
              label:'08时'
            },
            {
              value:'09',
              label:'09时'
            },
            {
              value:'10',
              label:'10时'
            },
            {
              value:'11',
              label:'11时'
            },
            {
              value:'12',
              label:'12时'
            },
            {
              value:'13',
              label:'13时'
            },
            {
              value:'14',
              label:'14时'
            },
            {
              value:'15',
              label:'15时'
            },
            {
              value:'16',
              label:'16时'
            },
            {
              value:'17',
              label:'17时'
            },
            {
              value:'18',
              label:'18时'
            },
            {
              value:'19',
              label:'19时'
            },
            {
              value:'20',
              label:'20时'
            },
            {
              value:'21',
              label:'21时'
            },
            {
              value:'22',
              label:'22时'
            },
            {
              value:'23',
              label:'23时'
            },
          ],
          //结束分钟
          endMinute:'',
          endMinuteList:[],
          //实例数
          minNumber:1,
          maxNumber:1,
          initialNumber:1,
          //结束执行
          startTime:'',
          endTime:''
        },
        updateTaskTimedTaskValidtor:{
          name:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ]
        },
        weekValue:'',
        //启动配置id
        startUpId:'',

        //修改伸缩组
        updateTelescopic:false,
        updateTeleList:{
          //启动配置
          configureList:[],
          //所属网络
          belongNetworkList:[],
          //所属子网
          belongSubnetList:[],
          //移除策略
          removePolicyList:[
            {
              value:'移除旧主机',
              label:'移除旧主机'
            },
            {
              value:'移除新主机',
              label:'移除新主机'
            }
          ],
          //负载均衡
          balancingList:[],
          //防火墙
          firewallList:[],
        },
        updateTelescopicList:{

        },
        updateRuleValidate:{
          stretchname:[
            {required:true,validator:nameValidator,trigger:'blur'}
          ],
          ownershipbootconfiguration:[
            {required:true,message:'请选择启动配置',trigger:'blur'}
          ],
          minimumexpansionnumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ],
          maximumexpansionnumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ],
          initialinstancenumber:[
            {required:true,validator:minNumberValidator,trigger:'blur'}
          ]
        },

        telescopicId:null,

        //是否移除保护
        outProtect:true,
        protectLoading:false
      }
    },
    methods:{
      //获取伸缩组详情
      getDetails(){
        this.$http.get('elasticScaling/listExpansionGroupById.do',{
        params:{
          id:sessionStorage.getItem('vpc_id').toString()
        }
        }).then(res =>{
          this.details = res.data.list[0];
          this.updateTelescopicList = JSON.parse(JSON.stringify(res.data.list[0]));
          this.startUpId = res.data.list[0].ownershipbootconfiguration;
          this.telescopicId = res.data.list[0].id;
        })
      },

      //获取告警策略
      getScaleAlarmStrategy(){
        this.$http.get('elasticScaling/listScaleAlarmStrategy.do',{
          params:{
            telescopicGroupId:sessionStorage.getItem('vpc_id').toString()
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.strategyData = res.data.list;
          }
        })
      },

      //获取联系人
      getContacts(){
        axios.get('user/getcontacts.do',{}).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.alarmStrategy.contactsList = res.data.result;
            this.updateStrategy.contactsList = res.data.result;
          }
        })
      },

      //新建告警策略
      createAlarmStrategy(){
        this.$refs.alarmStrategy.validate((valid) => {
          if(valid){
            let obj = {strategyname:'创建中',hide:1};
            this.strategyData.push(obj);
            this.$http.post('elasticScaling/createScaleAlarmStrategy.do',{
              strategyName:this.alarmStrategy.name,
              alarmType:'0',
              alarmLinkmanId:this.alarmStrategy.contacts.toString(),
              telescopicgroupId:sessionStorage.getItem('vpc_id').toString(),
              alarmName:this.alarmStrategy.cpuValue,
              countcircle:this.alarmStrategy.time,
              valueType:this.alarmStrategy.symbol,
              value:this.alarmStrategy.percentage.toString(),
              continuecircle:this.alarmStrategy.count,
              addCount:this.alarmStrategy.addcount.toString(),
              total:this.alarmStrategy.value,
              loolingTime:this.alarmStrategy.coolingNumber.toString(),
              isAdd:this.alarmStrategy.isAdd
            }).then(res =>{
              if(res.status == 200 && res.data.status == 1){
                this.$Message.success('新建告警策略成功');
                this.alarmStrategy.newAddStrategy = false;
                this.getScaleAlarmStrategy();
              }else{
                this.$Message.info(res.data.message);
                this.getScaleAlarmStrategy();
              }
            })
          }
        })
      },

      //修改告警策略
      updateAlarmStrategy(){
        this.$refs.updateStrategy.validate((valid) => {
          if(valid){
            this.$http.post('elasticScaling/updateScaleAlarmStrategy.do',{
              id:this.updateStrategy.id,
              strategyName:this.updateStrategy.name,
              alarmType:'0',
              alarmLinkmanId:this.updateStrategy.contacts.toString(),
              telescopicgroupId:sessionStorage.getItem('vpc_id').toString(),
              alarmName:this.updateStrategy.cpuValue,
              countcircle:this.updateStrategy.time,
              valueType:this.updateStrategy.symbol,
              value:this.updateStrategy.percentage.toString(),
              continuecircle:this.updateStrategy.count,
              addCount:this.updateStrategy.addcount.toString(),
              total:this.updateStrategy.value,
              loolingTime:this.updateStrategy.coolingNumber.toString(),
              isAdd:this.updateStrategy.isAdd
            }).then(res =>{
              if(res.status == 200 && res.data.status == 1){
                this.$Message.success('修改成功');
                this.updateStrategy.newAddStrategy = false;
                this.getScaleAlarmStrategy();
              }else{
                this.$Message.info(res.data.message);
                this.getScaleAlarmStrategy();
              }
            })
          }
        })
      
      },

      //删除告警策略
      deleteAlarmStartegy(id){
        this.$http.get('elasticScaling/deleteScaleAlarmStrategy.do',{
          params:{
            id:id.toString()
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success('删除成功');
            this.getScaleAlarmStrategy();
          }else{
            this.$Message.info(res.data.message);
            this.getScaleAlarmStrategy();
          }
        })
      },

      weekSelect(index){
       this.timedTask.week[index].isShow = !this.timedTask.week[index].isShow;
       if(this.timedTask.week[index].isShow == true){
         this.timedTask.weekList[index] = this.timedTask.week[index].value;
       }else{
         this.timedTask.weekList[index] = '';
       }
        if(this.timedTask.weekList[index]!= '' && this.timedTask.weekList[index] !== undefined){
          this.weekValue += this.timedTask.weekList[index] +',';
       }
      },

      //获取定时任务
      selectTask(){
        this.$http.get('elasticScaling/listTaskByTelescopicGroupId.do',{
          params:{
            telescopicGroupId:sessionStorage.getItem('vpc_id').toString()
          }
        }).then(res => {
          if(res.status == 200 && res.data.status ==1){
            this.taskData = res.data.list;
          }
        })
      },

      //新建定时任务
      createTask(){
        if(this.timedTask.repeat == '0'){
          this.timedTask.date = '-1';
          this.timedTask.monthStartNumber = '';
          this.timedTask.monthEndNumber = '';
          this.weekValue = '';
          this.timedTask.dayNumber = '';
        };
        if(this.timedTask.repeat == '1'){
          if(this.timedTask.date == '0'){
            this.timedTask.monthStartNumber = '';
            this.timedTask.monthEndNumber = '';
            this.weekValue = '';
          }else if(this.timedTask.date == '1'){
            this.timedTask.dayNumber = '';
            this.weekValue = '';
          }else if(this.timedTask.date == '2'){
            this.timedTask.monthStartNumber = '';
            this.timedTask.monthEndNumber = '';
            this.timedTask.dayNumber = '';
          }
        };
        if(this.weekValue != ''){
          this.weekValue =  (this.weekValue.substring(this.weekValue.length - 1) == ',') ?  this.weekValue.substring(0, this.weekValue.length - 1) :  this.weekValue;
        };
        if(this.timedTask.minNumber > this.timedTask.maxNumber){
          this.$Message.warning('最小实例数不能大于最大实例数');
          return;
        }
        this.$refs.timedTask.validate((valid) => {
            if(valid){
        let obj = {taskname:'创建中',hide:1};
        this.taskData.push(obj);
        this.$http.post('elasticScaling/createTask.do',{
          taskName:this.timedTask.name,
          recurrence:this.timedTask.repeat,
          startTime:  this.timedTask.startTime.format('yyyy-MM-dd') +' ' +this.timedTask.hour + ':'+ this.timedTask.minute,
          endTime:this.timedTask.repeat == '0' ? '' : this.timedTask.endTime.format('yyyy-MM-dd') +' ' + this.timedTask.endHour + ':' + this.timedTask.endMinute,
          readjustMixSize:this.timedTask.minNumber.toString(),
          readjustMaxSize:this.timedTask.maxNumber.toString(),
          readjustDesiredCapacity:this.timedTask.initialNumber.toString(),
          telescopicId:sessionStorage.getItem('vpc_id').toString(),
          week:this.timedTask.date != '2'? '':'week',
          month:this.timedTask.date != '1'? '':'month',
          day:this.timedTask.date !='0' ?'' :'day',
          dayCount:this.timedTask.dayNumber.toString(),
          weekCount: this.weekValue,
          monthStartCount:this.timedTask.monthStartNumber.toString(),
          monthEndCount:this.timedTask.monthEndNumber.toString(),
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success('定时任务新建成功');
            this.task = false;
            this.selectTask();
          }else {
            this.task = false;
            this.$Modal.confirm({
             content:res.data.message
            })
            this.selectTask();
          }
        })
         }
        })
      },

      //修改定时任务
      updateTaskFunction(){
        if(this.updateTimedTask.repeat == '0'){
          this.updateTimedTask.date = '-1';
          this.updateTimedTask.monthStartNumber = '';
          this.updateTimedTask.monthEndNumber = '';
          this.weekValue = '';
          this.updateTimedTask.dayNumber = '';
        };
        if(this.updateTimedTask.repeat == '1'){
          if(this.updateTimedTask.date == '0'){
            this.updateTimedTask.monthStartNumber = '';
            this.updateTimedTask.monthEndNumber = '';
            this.weekValue = '';
          }else if(this.updateTimedTask.date == '1'){
            this.updateTimedTask.dayNumber = '';
            this.weekValue = '';
          }else if(this.updateTimedTask.date == '2'){
            this.updateTimedTask.monthStartNumber = '';
            this.updateTimedTask.monthEndNumber = '';
            this.updateTimedTask.dayNumber = '';
          }
        };
        if(this.weekValue != ''){
          this.weekValue =  (this.weekValue.substring(this.weekValue.length - 1) == ',') ?  this.weekValue.substring(0, this.weekValue.length - 1) :  this.weekValue;
        };
           if(this.updateTimedTask.minNumber > this.updateTimedTask.maxNumber){
          this.$Message.warning('最小实例数不能大于最大实例数');
          return;
        }
        this.$http.post('elasticScaling/updateTask.do',{
          id:this.updateTimedTask.id,
          taskName:this.updateTimedTask.name,
          recurrence:this.updateTimedTask.repeat,
          startTime:  this.updateTimedTask.startTime.format('yyyy-MM-dd') +' ' +this.updateTimedTask.hour + ':'+ this.updateTimedTask.minute,
          endTime:this.updateTimedTask.repeat == '0' ? '' : this.updateTimedTask.endTime.format('yyyy-MM-dd') +' ' + this.updateTimedTask.endHour + ':' + this.updateTimedTask.endMinute,
          readjustMixSize:this.updateTimedTask.minNumber.toString(),
          readjustMaxSize:this.updateTimedTask.maxNumber.toString(),
          readjustDesiredCapacity:this.updateTimedTask.initialNumber.toString(),
          telescopicId:sessionStorage.getItem('vpc_id').toString(),
          week:this.updateTimedTask.date != '2'? '':'week',
          month:this.updateTimedTask.date != '1'? '':'month',
          day:this.updateTimedTask.date !='0' ?'' :'day',
          dayCount:this.updateTimedTask.dayNumber.toString(),
          weekCount: this.weekValue,
          monthStartCount:this.updateTimedTask.monthStartNumber.toString(),
          monthEndCount:this.updateTimedTask.monthEndNumber.toString(),
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success('修改定时任务成功');
              this.updateTask = false;
              this.selectTask();
            }else{
              this.$Message.info(res.data.message);
              this.selectTask();
            }
        })
      },

      //删除定时任务
      deleteTask(id,index){
        let obj = {taskname:'删除中',hide:1};
        this.taskData.splice(index,1,obj);
        this.$http.get('elasticScaling/deleteTaskTelescopicGroup.do',{
          params:{
            id:id.toString()
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.$Message.success('删除定时任务成功');
            this.selectTask();
          }else{
            this.$Message.info(res.data.message);
            this.selectTask();
          }
        })
      },

      //获取伸缩活动
      selectActivity(current){
        this.activityLoading = true;
        let date = '';
        for (let i=0;i< this.telescopicActivity.operationTime.length;i++){
           date += this.telescopicActivity.operationTime[i].format('yyyy-MM-dd') +',';
        }
        if(date != ''){
          date =  (date.substring(date.length - 1) == ',') ?  date.substring(0, date.length - 1) :  date;
        }
        this.$http.get('elasticScaling/listActivity.do',{
          params:{
            telescopicGroupId:sessionStorage.getItem('vpc_id'),
            dataTime:date,
            status:this.telescopicActivity.status,
            page:current,
            pageSize:25
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.telescopicActivity.activityData = res.data.list;
            this.total = res.data.total;
            this.activityLoading = false;
          }else{
            this.$Message.info(res.data.message);
            this.activityLoading = false;
          }
        }).catch(error =>{
          this.activityLoading = false;
        })
      },

      //获取用户的云主机
      selectCloudHost(){
        this.$http.get('elasticScaling/listVMByTelescopicId.do',{
          params:{
            telescopicId:sessionStorage.getItem('vpc_id')//伸缩组ID
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.intoCloudHost = res.data.list;
          }
        })
      },

      //获取伸缩组关联的主机
      selectHost(){
        this.$http.get('elasticScaling/listManualAndAutoAssociatedHost.do',{
          params:{
            telescopicGroupId:this.telescopicId
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.cloudHost.hostData = res.data.list;
          }
        })
      },

      //获取分钟数
      minuteListCount(){
        for(let i = 0;i<60;i++){
          if(i<10){
            i = '0'+i;
          }
          let obj = {value:i,label:i +'分'};
          this.timedTask.minuteList.push(obj);
          this.timedTask.endMinuteList.push(obj);
          this.updateTimedTask.minuteList.push(obj);
          this.updateTimedTask.endMinuteList.push(obj);
        }
      },

      //获取策略百分比量
      percentageF(){
        for(let i =1;i<101;i++){
          if(i<10){
            i = '0'+i;
          }
          let obj = {value:i,label:i};
          this.updateStrategy.percentageList.push(obj);
          this.alarmStrategy.percentageList.push(obj);
        }
      },

      //单位百分比是否可选
      theIsdisabled(){
        this.alarmStrategy.company = '';
        this.updateStrategy.company = '';
        if(this.alarmStrategy.isAdd == '调整至' ||   this.updateStrategy.isAdd == '调整至'){
          this.alarmStrategy.disabled = true;
          this.updateStrategy.disabled = true;
        }else {
          this.alarmStrategy.disabled = false;
          this.updateStrategy.disabled = false;
        }
      },

      //告警类型选择单位
      cpuSelect(){
          if( this.alarmStrategy.cpuValue == 'CPU利用率' ||  this.updateStrategy.cpuValue == 'CPU利用率'){
            this.alarmStrategy.spanValue = '%';
            this.updateStrategy.spanValue = '%';
          }else if( this.alarmStrategy.cpuValue == '带宽' ||  this.updateStrategy.cpuValue == '带宽'){
            this.alarmStrategy.spanValue = 'Mbps';
            this.updateStrategy.spanValue = 'Mbps';
          }else if( this.alarmStrategy.cpuValue == '速率' ||  this.updateStrategy.cpuValue == '速率'){
            this.alarmStrategy.spanValue = 'kb/s';
            this.updateStrategy.spanValue = 'kb/s';
          }
      },

      //移入主机
      hostRightRmove(index){
        this.removeCloudHost.push(this.intoCloudHost.splice(index,1)[0]);
      },
      hostDelete(index){
        this.intoCloudHost.push(this.removeCloudHost.splice(index,1)[0]);
      },
      hostAdd(){
        this.$http.get('elasticScaling/joinManualAndAutoAssociatedHost.do',{
          params:{
            computerId:this.deleteDouhao(this.removeCloudHost,'computerid'),
            lifeTime:'1',
            jojnWay:'manual',
            startConfigurationId:this.startUpId.toString(),
            telescopicGroupId:sessionStorage.getItem('vpc_id')
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.moveCloudHost = false;
            this.$Message.success('加入云主机成功');
            this.selectHost();
          }else{
            this.moveCloudHost = false;
            this.$Message.info(res.data.message);
            this.selectHost();
          }
        })
      },

      //移出主机
      removeHost(item){
        this.$http.get('elasticScaling/removemanualAndAutoAssociatedHost.do',{
          params:{
            id:item.id,
            telescopicGroupId:item.telescopicgroupid
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status ==1){
            this.$Message.success(res.data.message);
            this.selectHost();
          }else{
            this.$Message.info(res.data.message);
            this.selectHost();
          }
        })
      },

      //移除保护
      removeProtect(item,val){
        this.protectLoading = true;
        this.$http.get('elasticScaling/isRemoveProtection.do',{
          params:{
            id:item.id,
            removeprotect:val.toString()
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.protectLoading = false;
            this.$Message.success(res.data.message);
            this.selectHost();
          }else{
            this.protectLoading = false;
            this.$Message.info(res.data.message);
            this.selectHost();
          }
        }).catch(err =>{
          if(err)
          this.protectLoading = false;
        })
      },
      //去除逗号函数

      deleteDouhao(array,keys){
        let val = '';
        for(let i =0; i<array.length;i++){
          for(let key in array[i]){
            if(key == keys){
              val += array[i][key]+',';
            }else {
              continue;
            }
          }
        }
        return val.substring(0,val.length - 1);
      },

      //获取负载均衡
      getAllSelect(){
        this.$http.get('loadbalance/listLoadBalanceRole.do',{
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            if(res.data.result.publicLoadbalance.length != 0 || res.data.result.internalLoadbalance.length != 0 ){
              this.updateTeleList.balancingList = res.data.result.publicLoadbalance.concat(res.data.result.internalLoadbalance);
            }else {
              this.$Modal.info({
                title:'提示',
                content:'<p>您还没有创建负载均衡，请先<a style="color: #2A99F2;" href="balance">创建负载均衡</a></p>',
                onOk:()=>{
                  this.$router.push({path:'balance'});
                }
              })
            }
          }
        });
      },

      //修改伸缩组
      updateTelescopicFcuntion(){
        this.$http.post('elasticScaling/updateExpansionGroups.do',{
            telescopicGroupName:this.updateTelescopicList.stretchname,
            telescopicMax:this.updateTelescopicList.maximumexpansionnumber,
            telescopicMin:this.updateTelescopicList.minimumexpansionnumber,
            strategy:this.updateTelescopicList.removestrategy,
            instaceNum:this.updateTelescopicList.initialinstancenumber,
            id:this.updateTelescopicList.id,
            configId:this.updateTelescopicList.ownershipbootconfiguration
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success('修改成功');
              this.updateTelescopic = false;
              this.getDetails();
            }else{
              this.$Message.info(res.data.message);
              this.updateTelescopic = false;
            }
        })
      },


      //获取防火墙
      changeNetWork(id){
        let f = this.$http.get('network/listAclList.do',{params:{vpcId:id}});
        Promise.all([f]).then(res =>{
          this.updateTeleList.firewallList = res[0].data.result;
        })
      },
      balancings(id){
        this.$http.get('network/getnetworkAndVpcByloadbalance.do',{
          params:{
            loadbalanceId:id,
            type:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.updateTeleList.belongNetworkList = res.data.list;
            this.updateTeleList.belongSubnetList = res.data.list;
          }
        })
      },

      //获取启动配置
      selectAllElastic(){
        this.$http.get('elasticScaling/listElasticScalingRunConfig.do',{
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.updateTeleList.configureList = res.data.list;
          }else {
            this.$Message.info(res.data.message);
          }
        })
      },

    },
    created(){
      this.getDetails();
      this.minuteListCount();
      this.getScaleAlarmStrategy();
      this.selectActivity(1);
      this.selectTask();
      this.getContacts();
      this.percentageF();
      // this.selectHost();
      this.getAllSelect();
      this.selectAllElastic();
      this.balancings();
    },
    mounted(){
      this.selectCloudHost();
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .box_one{
    font-size: 14px;
    color: #5E5E5E;
    div{
      margin-bottom: 10px;
    }
  }
  .box_two{
    font-size: 14px;
    color: #5E5E5E;
    margin: 0 114px 0 74px;
    div{
      margin-bottom: 10px;
    }
  }
  .button{
    border: 1px solid #2A99F2;
    color: #2A99F2;
    background: #FFFFFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 58px;
    height: 30px;
    cursor: pointer;
  }
  .button:hover{
    background: #2A99F2;
    color: #FFFFFF;
  }
  .time_task{
    p{
      margin-bottom: 10px;
    }
    .date_select{
      display: inline-block;
      margin-left: 20px;
      >ul{
        border:1px solid #D8D8D8;
        border-radius: 4px;
        display: inline-block;
        li{
          display: inline-block;
          background-color: #FFFFFF;
          padding: 6px 8px 6px 8px;
          color: #666666;
          cursor: pointer;
        }
      }
      .li_select{
      color: #FFFFFF;
      background-color: #2A99F2;
      }
    }
  }
  .box_black{
    background: #D8D8D8;
    width: 33px;
    height: 32px;
    display: inline-block;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    vertical-align: middle;
    margin-left: -5px;
    text-align: center;
    line-height: 29px;
  }
  .move_box{
    width: 510px;
    height: 146px;
    border: 1px solid #D8D8D8;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-top: 15px;
    display: flex;
    .ivu-icon{
      color: #2A99F2;
    }
    .move_box_left{
      padding: 10px 0;
      border-right: 1px solid #D8D8D8;
      width: 254px;
      overflow: auto;
      p{
        margin-left: 10px;
      }
      >div:nth-child(even){
        background: #f4f4f4;
      }
      .list_box{
        line-height: 28px;
        div:first-child{
         display: inline-block;
          width: 157px;
          p{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        div:nth-child(2){
          display: inline-block;
          float: right;
          text-align: right;
          margin-right: 10px;
          cursor: pointer;
          color: #2A99F2;
        }
      }
    }
    .move_box_left::-webkit-scrollbar{
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .move_box_left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background:rgba(216,216,216,0.5);
    }
    .move_box_left::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background:rgba(216,216,216,0.5);
    }
  }

  .text-box{
    border:1px solid #2A99F2;
    background-color: RGBA(42, 153, 242, 0.1);
    height: 32px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .ivu-icon-ios-help-outline:before{
    color: #2A99F2;
  }
  .ivu-tooltip-inner{
    p{
      line-height: 15px;
    }
  }
  .formitem1{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-13px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 88px;
    }
  }
  .formitem2{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: -19px;
      left: 10px;
    }
    .ivu-icon{
      position: absolute;
      top: 12px;
      left: -24px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -36px;
      left: 101px;
    }
  }
  .formitem3{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-11px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
  .formitem4{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-33px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
  .formitem5{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-22px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
  .formitem6{
    .ivu-icon-ios-help-outline:before{
      position: absolute;
      top: 12px;
      left:-20px;
    }
    .ivu-tooltip{
      position:absolute;
      top: -35px;
      left: 75px;
    }
  }
</style>
