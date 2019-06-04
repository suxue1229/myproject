<template>
  <div id='content'>
    <div class='content-left'>
      <div class='content-left-title'>
        <h2>项目概述</h2>
        <p>为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p>
      </div>
      <div class='content-left-table'>
        <div class="content-left-table-title">
          <h3 class="content">
            <b>镇级污水处理厂：6个</b>
            <b>村居污水处理站：53个</b>
            <b>总处理规模：2.392万吨/日</b>
          </h3>
          <div class="title">一期二期项目介绍</div>  
        </div>
        <div class='content-left-table-detail'>
          <el-table
            :data="list"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            style="width: 100%; min-height:100%;"
            >
            <el-table-column
              fixed
              prop="Name"
              label="厂站名称"
              min-width="20%"
              >
            </el-table-column>
            <el-table-column
              prop="Device[0]"
              label="产水泵"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="Device[1]"
              label="风机"
              min-width="5%">
            </el-table-column>
            <el-table-column
              prop="Device[2]"
              label="回流泵"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="Device[3]"
              label="除磷泵"
              min-width="9%">
            </el-table-column>
            <!-- <el-table-column
              prop="Device[4]"
              label="膜池液位"
              min-width="10%">
              </el-table-column> -->
            <!-- <el-table-column
              prop="Device[5]"
              label="除磷剂液位"
              width="15%">
            </el-table-column> -->
            <el-table-column
              prop="Device[6]"
              label="产水流量(m3/h)"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="Device[7]"
              label="MBR压力(kpa)"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="Device[8]"
              label="累计电量(kwh)"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="Device[9]"
              label="累计水量(m3)"
              min-width="10%">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class='content-right'>
      <h2>厂站列表</h2>
      <div class='content-right-list'>
        <ul>
          <li>茈碧湖镇(2+4)</li>
          <li>右所镇(1+17)</li>
          <li>凤羽镇(1+11)</li>
          <li>牛街乡(1+7)</li>
          <li>三营镇(1+14)</li>
          <li>邓川镇(0+4)</li>
          <li>海东镇(0+1)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'thirdchild',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$store.dispatch('getdevicedata')
    var datalist = JSON.parse(this.$store.state.data)
    for (var i = 0; i < datalist.length; i++) {
      this.$axios.get(this.HOST + '/data/' + datalist[i].Id, { headers: {Authorization: this.$store.state.authorization} })
        .then(res2 => {
          if (res2.data.status === 0) {
            this.formatedata(res2.data.data)
          }
        })
        .catch(error2 => { console.log(error2) })
    }
  },
  methods: {
    formatedata (datalist) {
      var Devicelist = []
      for (var i = 0; i < datalist.Groups.length; i++) {
        for (var j = 0; j < datalist.Groups[i].Devices.length; j++) {
          Devicelist.push({name: datalist.Groups[i].Devices[j].Name, value: datalist.Groups[i].Devices[j].Status})
        }
        for (var k = 0; k < datalist.Groups[i].Sensors.length; k++) {
          Devicelist.push({name: datalist.Groups[i].Sensors[k].Name, value: datalist.Groups[i].Sensors[k].Value})
        }
        this.list.push({Name: datalist.Name, Device: this.getvalue(Devicelist)})
      }
    },
    getvalue (arraylist) {
      var strlist = []
      for (var i = 0; i < arraylist.length; i++) {
        if (arraylist[i].name === '自吸泵') {
          this.$set(strlist, 0, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '风机') {
          this.$set(strlist, 1, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '回流泵') {
          this.$set(strlist, 2, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '除磷泵') {
          this.$set(strlist, 3, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '膜池液位') {
          this.$set(strlist, 4, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '除磷罐液位') {
          this.$set(strlist, 5, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '瞬时流量') {
          this.$set(strlist, 6, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '压力') {
          this.$set(strlist, 7, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '累计电量' || arraylist[i].name === '电能') {
          this.$set(strlist, 8, this.deletesign(arraylist[i].value))
        } else if (arraylist[i].name === '累计产水量') {
          this.$set(strlist, 9, this.deletesign(arraylist[i].value))
        }
      }
      return strlist
    },
    deletesign (str) {
      if (str) {
        if (str.includes('{red}')) {
          return str.replace('{red}', '')
        } else if (str.includes('{green}')) {
          return str.replace('{green}', '')
        }
      }
      return str
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, rowIndex }) {
      return 'background: rgba(27, 62, 118, 1); color: #9ee1fb; height:10px;'
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgba(27, 62, 118, 1); color: #9ee1fb; height: 10px;'
      }
    }
  }
}
</script>
<style scoped>
  #content{
    position: absolute;
    top: 60px;
    left: 0;
    right:0px;
    bottom: 50px;
    overflow: auto;
    /* width: 100%; */
    min-width: 1200px;
    display: flex;
    color: #9ee1fb;
  }
  #content .content-left{
    flex-grow: 1;
    display: flex;
    width: 90%;
  }
  #content .content-left .content-left-title{
    width: 15%;
  }
  #content .content-left .content-left-title p{
    text-indent: 2rem;
    line-height: 2rem;
  }
  #content .content-left .content-left-table{
    width: 85%;
    flex-grow: 1;
    display: flex;
    flex-flow: column;
  }
  #content .content-left .content-left-table .content-left-table-title{
    height: 10%;
    display: flex;
    align-items: center;
  }
  #content .content-left .content-left-table .content-left-table-title .content{
    width: 90%;
    flex: 1;
  }
  #content .content-left .content-left-table .content-left-table-title .title{
    width: 10%;
    border: 3px solid #9ee1fb;
  }
  #content .content-left .content-left-table .content-left-table-detail{
    flex: 1;
    height: 90%;
  }
  #content .content-right{
    width: 10%;
  }
  #content .content-right h2 {
    text-align: center;
  }
  #content .content-right ul {
    list-style-type: none;
    text-align: center;
  }
</style>
