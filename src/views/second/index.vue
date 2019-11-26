<template>
  <div class="content">
    <Header />
      <div class="containter containter-style">
        <h2 >CWT工艺站点列表</h2>
        <div class="animated bounceInRight" >
          <table v-for= "(a,j) in showdata" :key="j" class="table table-style">
            <thead>
              <tr>
                <td v-for= "(item, i) in showdata[j].title" :key="i">{{item}}</td>
              </tr>
            </thead>
            <tbody >
                <tr v-for= "(item, i) in showdata[j].content" :key="i">
                  <td v-for= "(item, m) in showdata[j].content[i]" :key="m">{{item | deletesign(item)}}</td>
                </tr>
            </tbody>
         </table>
        </div>
      </div>
    <Footer />
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
    }, 600000)
  },
   beforeDestroy(){
    clearInterval(this.intervalid)
  },
  filters:{
    deletesign (str) {
        if(typeof(str) === 'string'){
          if (str.includes('{red}')) {
            return str.replace('{red}', '')
          } else if (str.includes('{green}')) {
            return str.replace('{green}', '')
          }
        }else if(typeof(str) === 'undefined'){
            return '000'
        }
        return str
      
    }
  },
  methods: {
   async initdata () {
      var list= []
      var institute_Data = this.$store.getters.institute_Data
      for (var i = 0; i < institute_Data.length; i++) {
        this.$axios.get(this.HOST + '/data/' + institute_Data[i].Id)
        .then(res => {
          if (res.data.status === 0) {
            let Data =  this.$store.dispatch('get_data', res.data.data)
            var info_data = this.$store.getters.info_Data
            list.push(this.formatedata(info_data))
          }
        })
        .catch(error => { console.log(error) })
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
          if (item_name === '膜池低位') {
          this.$set(Devicelist, 5, item)
        } else if (item_name === '除磷罐液位') {
          this.$set(Devicelist, 6, item)
        } else if (item_name === '瞬时流量') {
          this.$set(Devicelist, 7, item)
        } else if (item_name === '压力') {
          this.$set(Devicelist, 8, item)
        } else if (item_name === '累计电量' || item_name === '电能') {
          this.$set(Devicelist, 9, item)
        } else if (item_name === '累计产水量'|| item_name === '累计流量') {
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
.containter-style{
  color: #9ee1fb;
  padding-left: 15px;
  padding-right: 15px;
  background: rgba(16,46,86,.5);
  display: flex;
  flex-direction: column;
}
.containter-style table{
  color: #9ee1fb;
}
.containter-style table tbody tr:nth-of-type(odd) {
    background-color: cadetblue;
}
.containter-style h2{
  margin: 20px auto;
}
</style>
