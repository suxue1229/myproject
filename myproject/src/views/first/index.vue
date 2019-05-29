<template>
  <div>
    <div id='content' >
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  name: 'firstchild',
  data () {
    return {
      datalist: [],
      pointlist: []
    }
  },
  mounted () {
    this.datalist = JSON.parse(this.$store.state.data)
    var map = new BMap.Map('content')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    map.enableScrollWheelZoom(true)
    map.enableAutoResize()
    for (var i = 0; i < this.datalist.length; i++) {
      var pt = new BMap.Point(this.datalist[i].Longitude, this.datalist[i].Latitude)
      var convertor = new BMap.Convertor()
      var pointArr = []
      pointArr.push(pt)
      // console.log(pointArr)
      convertor.translate(pointArr, 1, 5, function (data) {
        if (data.status === 0) {
          var marker = new BMap.Marker(data.points[0])
          map.addOverlay(marker)
          var label = new BMap.Label(data.points[0].lng, {offset: new BMap.Size(20, -10)})
          marker.setLabel(label)// 添加百度label
          map.setCenter(data.points[0])
        }
      })
    }
  }
}
</script>
<style scoped>
  #content {
    position: absolute;
    top: 50px;
    left: 0px;
    right:0px;
    bottom: 50px;
    overflow: auto;
  }
</style>
