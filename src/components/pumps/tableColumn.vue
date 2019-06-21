<template>
  <div class="tableColumn">
    <div class="x-scroll">
      <table class="table table-bordered table-blue text-center" style="table-layout:fixed;">
        <tbody>
          <tr v-for="col in columns" :key="col.key">
            <td width="150px" class="deblue">{{col.key}}</td>
            <td width="70px" v-for="n in items" :key="n.id">{{n[col.value]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="abT">
      <table class="table table-bordered table-blue text-center" style="table-layout:fixed;">
        <tbody>
          <tr v-for="col in columns" :key="col.key">
            <td width="150px" class="deblue">{{col.key}}</td>
            <td class="vshd" width="70px" v-for="n in items" :key="n.id">{{n[col.value]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="abL"></div>
    <div class="abR"></div>
  </div>
</template>
<script>
export default {
  name: 'TableColumn',
  props: {
    items: Array,
    columns: Array
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$el.childNodes[0].addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var _this = this.$el.childNodes[0]
      if (_this.scrollLeft + _this.offsetWidth === _this.scrollWidth) {
        this.$el.getElementsByClassName('abR')[0].className = 'abR'
      } else if (_this.scrollLeft === 0) {
        this.$el.getElementsByClassName('abL')[0].className = 'abL'
      } else {
        this.$el.getElementsByClassName('abL')[0].className = 'abL shadow'
        this.$el.getElementsByClassName('abR')[0].className = 'abR shadow'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.x-scroll {
  overflow-x: auto;
}
.x-scroll::-webkit-scrollbar {
  height: 10px;
}
.tableColumn {
  position: relative;
}
.tableColumn .abT {
  position: absolute;
  left: 0;
  top: 0;
}
.tableColumn .abL {
  position: absolute;
  left: 150px;
  top: 0;
  bottom: 0;
  width: 1px;
}
.tableColumn .abL.shadow {
  box-shadow: 2px 1px 7px rgba(0, 0, 0, 0.75);
  background: rgba(0, 0, 0, 0.15);
}
.tableColumn .abR {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
}
.tableColumn .abR.shadow {
  box-shadow: -2px -1px 8px rgba(0, 0, 0, 0.75);
  background: rgba(0, 0, 0, 0.15);
}
.tableColumn table tbody tr td:first-child {
  color: #4c4c4c;
}
.vshd {
  visibility: hidden;
}

.nav-tabs.deblue > li {
  background: #f5f5f5;
  color: #999;
  margin-right: 6px;
  cursor: pointer;
}
.nav-tabs.deblue > li > a {
  color: #999;
}
.deblue > li.active > a,
.deblue > li.active > a:focus,
.deblue > li.active > a:hover {
  color: #333;
  cursor: default;
  background: white;
  border-left: none;
}
</style>
