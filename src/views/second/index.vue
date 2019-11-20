<template>
  <div class="content">
    <Header class="navbar  navbar-fixed-top header"/>
      <div class="containter containter-style">
        <h2 class="h2-style">CWT工艺站点列表</h2>
        <transition-group appear>
          <table v-for= "(a,j) in showdata" :key="j" class="table table-striped table-style">
            <thead>
              <tr>
                <td v-for= "(item, i) in showdata[j].title" :key="i">{{item}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for= "(item, i) in showdata[j].content" :key="i">
                <td v-for= "(item, m) in showdata[j].content[i]" :key="m">{{item | deletesign(item)}}</td>
              </tr>
            </tbody>
         </table>
        </transition-group>
      </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'secondchild',
  data () {
    return {
      showdata: [],
      data:[],
      cwt_title: ['厂站名称','产水泵','风机','回流泵','除磷加药泵','膜池液位','除磷剂液位','产水流量(m³/h)','MBR压力(kpa)','累计电量(kwh)','累计水量(m³)'],
   }
  },
  created () {
    this.initdata()
  },
  
  mounted(){
    this.intervalid = setInterval(() => {
    this.initdata()
    }, 10000)
  },
   beforeDestroy(){
    clearInterval(this.intervalid)
  },
  filters:{
    deletesign (str) {
      if (str) {
        if(typeof(str) === 'string'){
          if (str.includes('{red}')) {
            return str.replace('{red}', '')
          } else if (str.includes('{green}')) {
            return str.replace('{green}', '')
          }
        }
        return str
      } else {
        return '000'
      }
    }
  },
  methods: {
   async initdata () {
      var list= []
      var institute_Data = this.$store.getters.institute_Data
      for (var i = 0; i < institute_Data.length; i++) {
         let get_data =await this.$store.dispatch('get_data', institute_Data[i].Id)
        var info_data = this.$store.getters.info_Data
        list.push(this.formatedata(info_data))
      }
      this.showdata=[{'content': list, 'title': this.cwt_title,'sum': list.length}]
    },
    formatedata (datalist) {
      var Devicelist = []
      for (var i = 0; i < datalist.Groups.length; i++) {
        Devicelist.push(datalist.Name)
        for (var j = 0; j < datalist.Groups[i].Devices.length; j++) {
          if (datalist.Groups[i].Devices[j].Name === '自吸泵') {
            this.$set(Devicelist, 1, datalist.Groups[i].Devices[j].Status)
          }else if (datalist.Groups[i].Devices[j].Name === '风机') {
          this.$set(Devicelist, 2, datalist.Groups[i].Devices[j].Status)
        } else if (datalist.Groups[i].Devices[j].Name === '回流泵') {
          this.$set(Devicelist, 3, datalist.Groups[i].Devices[j].Status)
        } else if (datalist.Groups[i].Devices[j].Name === '除磷泵') {
          this.$set(Devicelist, 4, datalist.Groups[i].Devices[j].Status)
        }
        }
        for (var k = 0; k < datalist.Groups[i].Sensors.length; k++) {
          var item_name = datalist.Groups[i].Sensors[k].Name
          var item = datalist.Groups[i].Sensors[k].Value
          if (item_name === '膜池液位') {
          this.$set(Devicelist, 5, item)
        } else if (item_name === '除磷罐液位') {
          this.$set(Devicelist, 6, item)
        } else if (item_name === '瞬时流量') {
          this.$set(Devicelist, 7, item)
        } else if (item_name === '压力') {
          this.$set(Devicelist, 8, item)
        } else if (item_name === '累计电量' || item_name === '电能') {
          this.$set(Devicelist, 9, item)
        } else if (item_name === '累计产水量') {
          this.$set(Devicelist, 10, item)
        }
        }
        return Devicelist
      }
    },
    
  },
  components: {
    Header, Footer
  }
}
</script>
<style scoped>
 .content{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.containter-style{
  flex: auto;
  color: #9ee1fb;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.table-style{
  color: #9ee1fb;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: cadetblue;
}
.h2-style{
  margin: 20px auto;

}
.v-enter .v-leave-to{
  opacity: 0;
}
.v-enter-active .v-leave-active{
  transition: all 10s ease;
}
</style>
