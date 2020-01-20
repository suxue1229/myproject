<template>
  <div>
    <Header />
      <div id='content'>
      </div>
    <Footer class="footer navbar  navbar-fixed-bottom" />
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
  components: {
    Header, Footer
  },
  created () {
    var institute_Data = this.$store.getters.institute_Data
      for (var i = 0; i < institute_Data.length; i++) {
      this.$axios.get(this.HOST + '/data/' + institute_Data[i].Id, { headers: {Authorization: JSON.parse(sessionStorage.getItem('store')).login.Authorization} })
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
    }
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
