<template>
  <div>
    <Header />
      <div id='content'>
        <div class='content-left'>
          <div class="content-left-up">
            <h2>title</H2>
          </div>
          <div class="content-left-down">
            <div class='content-left-title'>
              <p >CWT工艺</p>
              <p>混凝土小水厂工艺</p>
              <p>镇级厂</p>
            </div>
            <div class='content-left-table'>
                <el-table
                  :data="list"
                  :row-style="tableRowStyle"
                  :header-cell-style="tableHeaderColor"
                  style="width: 100%; min-height:100%; background-color: transparent;"
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
                    min-width="8%">
                  </el-table-column>
                <!-- <el-table-column
                    prop="Device[4]"
                    label="膜池液位"
                    min-width="10%">
                    </el-table-column> 
                  <el-table-column
                    prop="Device[5]"
                    label="除磷剂液位"
                    width="15%">
                  </el-table-column> -->
                  <el-table-column
                    prop="Device[6]"
                    label="产水流量(m3/h)"
                    min-width="11%">
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
            <ul class='content-right-list'>
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
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'thirdchild',
  data () {
    return {
      list: []
    }
  },
  created () {
    var list = window.sessionStorage.getItem('formatedata')
    if (list) {
      this.list = JSON.parse(list)
    } else {
    var datalist = JSON.parse(this.$store.state.data)
    for (var i = 0; i < datalist.length; i++) {
      this.$axios.get(this.HOST + '/data/' + datalist[i].Id, { headers: {Authorization: this.$store.state.authorization} })
        .then(res2 => {
          if (res2.data.status === 0) {
            this.formatedata(res2.data.data)
            if (!window.sessionStorage) {
              alert('浏览器支持sessionStorage')
            } else {
              window.sessionStorage.setItem('formatedata', JSON.stringify(this.list))
            }
          }
        })
        .catch(error2 => { console.log(error2) })
      }
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
        console.log(this.list)
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
      if(rowIndex%2 ===0){
      return 'background-color: rgba(16,46,86,.5); color: #3dff4f; height:5px;'
      } else {
        return 'background-color: transparent; color: #3dff4f; height:5px;'
      }
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #060C19; color: #9ee1fb; height: 5px;'
      }
    },
  },
  components: {
    Header, Footer
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
    flex-flow: column;
  }
   #content .content-left .content-left-up{
    display: flex;
    background: rgba(16,46,86,.5);
  }
  #content .content-left .content-left-down{
    flex-grow: 1;
    display: flex;
  }
  #content .content-left .content-left-down .content-left-title{
    margin-top: 1rem;
    width: 15%;
    display: flex;
    flex-flow: column;
    font-weight: normal;
    line-height: 2rem;
    margin-left: 1rem;
  }
  #content .content-left .content-left-down .content-left-table{
    -ms-flex: 8;
    flex: 8;
    flex-grow: 8;
    flex-shrink: 1;
    flex-basis: 0%;
    height: 100%;
    display:flex;
    flex-flow: column;
    font-size: 12px;
  }
  #content .content-left .content-left-down .content-left-table .table-list-title{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    list-style-type: none;
  }
  #content .content-left .content-left-down .content-left-table .table-list-title .list-title{
    flex-grow: 1;
  }
   #content .content-left .content-left-down .content-left-table .table-list-data{
    -ms-flex: 8;
    flex: 8;
    flex-grow: 8;
    flex-shrink: 1;
    flex-basis: 0%;
    height: 100%;
    display:flex;
    flex-flow: column;
  }
   #content .content-left .content-left-down .content-left-table .table-list-data .list-detail{
   display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    list-style-type: none;
  }
  #content .content-left .content-left-down .content-left-table .table-list-data .list-detail .list-row{
    flex-grow: 1;
  }
  #content .content-left .content-left-down .content-left-table .companyname{
    flex-grow: 2.5;
    color: green;
  }
  #content .content-right{
    margin-left: 1rem;
    width: 15%;
    display: flex;
    flex-flow: column;
  }
  #content .content-right h2 {
    text-align: center;
    align-items: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-right .content-right-list {
    margin-top: 1rem;
    flex-grow: 1;
    list-style-type: none;
    text-align: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-right ul li {
    line-height: 2rem;
  }
</style>
