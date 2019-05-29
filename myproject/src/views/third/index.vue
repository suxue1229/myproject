<template>
  <div>
      <div id='content'>
        <div class='content-left'>
          <div class='content-left-title'></div>
          <!-- <el-table
            :data="list"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            style="width: 100%, background: #0bf2fe"
            >
            <el-table-column
              fixed
              prop="Name"
              label="厂站名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="Device[0]"
              label="产水泵"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[1]"
              label="风机"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[2]"
              label="回流泵"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[3]"
              label="除磷泵"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[4]"
              label="膜池液位"
              width="120">
              </el-table-column>
            <el-table-column
              prop="Device[5]"
              label="除磷剂液位"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[6]"
              label="产水流量(m3/h)"
              width="150">
            </el-table-column>
            <el-table-column
              prop="Device[7]"
              label="MBR压力(kpa)"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[8]"
              label="累计电量(kwh)"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Device[9]"
              label="累计水量(m3)"
              width="120">
            </el-table-column>
          </el-table> -->
        </div>
        <div id='content-right'>
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
    tableRowStyle({ row, rowIndex }) {
      return 'background:#3f5c6d2c;color:#000'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: lightblue; color: #fff'
      }
    }
  }
}
</script>
<style scoped>
  div {
    width: 100%;
  }
  #content{
    position: absolute;
    top: 50px;
    left: 0;
    right:0px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
    display: flex;
  }
  #content.content-left{
    width: 83%;
    margin-right: 1%;
    background: rgba(7,32,65,.4);
    border: 1px solid yellow;
  }
  #content.content-right{
    width: 16%;
    background: rgba(7,32,65,.4);
    border: 1px solid red;
  }
</style>
