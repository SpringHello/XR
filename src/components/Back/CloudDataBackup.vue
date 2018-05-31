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
          <p>数据库备份</p>
        </div>
        <div>
          <Tabs type="card" :animated="false">
            <Tab-pane label="数据库备份">
              <Button type="primary" @click="showModal.backup = true">制作快照</Button>
              <!-- <Button type="primary" @click="strategy = true" style="margin:0 10px;">创建备份策略</Button>
              <Button type="primary">删除快照</Button> -->
              <Table style="margin-top:10px;" :columns="backupList" :data="backupData"></Table>
              <div style="width:629px;">
                <p>开发备注：用户在开机状态下制作的快照文件默认保存内存信息，只能在开机状态下回滚。若用户在关机状态下进行回滚操作，需要提示用户：</p>
                <p>您所选的快照文件包含内存状态，只能在主机开机状态下回滚，请开启主机之后重试。 </p>
              </div>

            </Tab-pane>
            <Tab-pane label="云数据库备份策略">
              <Button type="primary" @click="showModal.strategy = true">创建备份策略</Button>
              <Button type="primary" style="margin:0 10px;">删除策略</Button>
              <Table style="margin-top:10px;" :columns="backupList" :data="backupData"></Table>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
            render: (h, params) => {
              return (h, 'div'[
                h('span', {
                  style: {
                    color: '#2A99F2'
                  }
                }, '回滚')
                ])
            }
          }
        ],
        //备份数据
        backupData: [{}],
        showModal: {
          strategy: false,
          backup: false
        }
      };
    }
  };
</script>


<style lang="less" scoped>
</style>
