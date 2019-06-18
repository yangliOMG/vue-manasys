<template>
  <div class="content">2
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { table } from '@/mixins/table'
import ViewApi from '@/components/logs/viewApi'
export default {
  name: 'digital',
  mixins: [table],
  data () {
    return {
      type: '全部',
      search: {
      }
    }
  },
  computed: {
    ...mapState({
      tableHead: state => state.logs.apihead
    })
  },
  mounted () {
  },
  methods: {
    getList () {
      this.tableLoad = true
      let data = Object.assign({}, this.listData, this.search)
      this.$store.dispatch('logs/apiList', data).then((res) => {
        this.tableLoad = false
        this.index = this.pagination.page
        if (res.data.status === 1) {
          this.tableData = [null].concat(res.data.data.list)
          this.setSearchOpen()
          this.pagination.total = res.data.data.total
        }
      }).catch((res) => {
        this.tableLoad = false
        this.$notify({
          title: '错误',
          dangerouslyUseHTMLString: true,
          message: res.response.data,
          type: 'error'
        })
      })
    },
    showInfo (data) {
      this.$refs['viewApi'].show(data)
    }
  },
  components: {
    ViewApi
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .table{
    flex: 1;
    position:relative;
    .basicHeader{
      display: inline-block;
    }
  }
  .Pagination{
    flex-basis: 100px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
}
</style>
