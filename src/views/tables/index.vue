<template>
  <div class="main">
    <loading v-if= "isshowing"/>
    <div class="list" v-else>
      <div class="list-title">
        <div class="num">序号</div>
        <div class="item_name">厂站名称</div>
        <div class="col">产水泵</div>
        <div class="col">风机</div>
        <div class="col">回流泵</div>
        <div class="col">除磷泵</div>
        <div class="col">产水流量<br>(m3/h)</div>
        <div class="col">MBR压力<br>(kpa)</div>
        <div class="col">累计电量<br>(kwh)</div>
        <div class="col">累计水量<br>(m3)</div>
      </div>
      <virtual-list
        class="animated bounceInRight list-content"
        style="height: 500px; overflow-y: auto;"
        :data-key="'uid'"
        :data-sources="items"
        :data-component="itemComponent"
      />
    </div>
  </div>
</template>
<script>
import {deletesign} from '@/js/common.js'

import Item from './Item'
import VirtualList from 'vue-virtual-scroll-list'

export default {
  name: 'table',
  data () {
    return {
      infodata: '',
      isshowing: true,
      showdata: [],
      timer: { },

      itemComponent: Item,
      items: []
    }
  },
  components: { 'virtual-list': VirtualList },
  created () {
    this.initdata()
      .then(() => {
        this.isshowing = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    instituteData () {
      return this.$store.getters.institute_Data
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    async initdata () {
      // clearTimeout(this.timer)
      this.$store.commit('ALL_DATA')
      for (let i = 0; i < this.instituteData.length; i++) {
        await this.$store.dispatch('get_data', this.instituteData[i].Id)
        this.infodata = this.$store.getters.info_Data.data
        let arrtemp = this.formatedata(this.infodata)
        let obj = {
          uid: 'unique_1',
          name: this.infodata.Name,
          chansb: arrtemp[0],
          fengj: arrtemp[1],
          huilb: arrtemp[2],
          chulb: arrtemp[3],
          chansll: arrtemp[4],
          mbr: arrtemp[5],
          leijdl: arrtemp[6],
          leijsl: arrtemp[7] }
        this.items.push(obj)
        // this.$set(this.items, i, obj)
      }
      // this.timer = setTimeout(() => {
      //   if (this.showdata) {
      //     this.showdata = []
      //   }
      //   this.initdata()
      // }, 60000)
    },
    formatedata (datalist) {
      var Devicelist = []
      for (var i = 0; i < datalist.Groups.length; i++) {
        for (var j = 0; j < datalist.Groups[i].Devices.length; j++) {
          let itemname = datalist.Groups[i].Devices[j].Name
          let item = deletesign(datalist.Groups[i].Devices[j].Status)
          if (itemname === '自吸泵') {
            this.$set(Devicelist, 0, item)
          } else if (itemname === '风机') {
            this.$set(Devicelist, 1, item)
          } else if (itemname === '回流泵') {
            this.$set(Devicelist, 2, item)
          } else if (itemname === '除磷泵') {
            this.$set(Devicelist, 3, item)
          }
        }
        for (var k = 0; k < datalist.Groups[i].Sensors.length; k++) {
          let itemname = datalist.Groups[i].Sensors[k].Name
          let item = deletesign(datalist.Groups[i].Sensors[k].Value)
          if (itemname === '瞬时流量') {
            this.$set(Devicelist, 4, item)
          } else if (itemname === '压力') {
            this.$set(Devicelist, 5, item)
          } else if (itemname === '累计电量' || itemname === '电能') {
            this.$set(Devicelist, 6, item)
          } else if (itemname === '累计产水量' || itemname === '累计流量') {
            this.$set(Devicelist, 7, item)
          }
        }
      }
      return Devicelist
    }

  }
}
</script>
<style scoped>
.main{
  width:100%;
  height:100%;
}

.list {
  width:100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.list-title{
  width:100%;
  display: flex;
  font-weight: bold;
}
.list-content{
  width:100%;
  border: 2px solid #304156;
  border-radius: 3px;
  font-size: 16px;
}
.num{
  flex: 0.5;
  text-align: center;
}
.col {
  flex: 1;
  text-align: center;
}
.item_name{
  flex: 2.5;
  text-align: center;
}
</style>
