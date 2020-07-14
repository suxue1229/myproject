<template>
  <div class="item">
    <div class="num">{{ index+1 }}</div>
    <div class="item_name">{{ source.name }}</div>
    <div class="col">{{ source.chansb }}</div>
    <div class="col">{{ source.fengj }}</div>
    <div class="col">{{ source.huilb }}</div>
    <div class="col">{{ source.chulb }}</div>
    <div class="col">{{ source.chansll }}</div>
    <div class="col">{{ source.mbr }}</div>
    <div class="col">{{ source.leijdl }}</div>
    <div class="col">{{ source.leijsl }}</div>
  </div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.item {
  width:100%;
  display: flex;
  border-bottom: 1px solid lightgrey;
  padding: 1em;
}
.num{
  flex: 0.5;
}
.col {
    flex: 1;
    text-align: center;
    font-size: 16px;
  }
  .item_name{
    flex: 2.5;
  }
</style>
