import HeadSenior from '@/components/table/headSenior.vue'
export const table = {
  data: function () {
    return {
      tableLoad: false,
      index: 0, //  table序号
      selectData: [], //  复选框选中行
      tableData: [],
      sort: {
        prop: null,
        order: null
      },
      searchDefault: {
        isOpened: false,
        name: '',
        date: ''
      },
      pagination: {
        page: 1,
        limits: [10, 20, 50, 100],
        limit: 20,
        total: 0
      }
    }
  },
  watch: {
    'searchDefault.isOpened': function (val) {
      if (!val) {
        document.querySelectorAll('.mainTable .searchRow').forEach((el) => { el.style.display = 'none' })
      } else {
        document.querySelectorAll('.mainTable .searchRow').forEach((el) => { el.style.display = '' })
        document.querySelector('.mainTable .el-table__body-wrapper').scrollTop = 0
      }
    }
  },
  computed: {
    listData: function () {
      let startTime, endTime
      if (this.searchDefault.date && this.searchDefault.date.length === 2) {
        startTime = this.searchDefault.date[0]
        endTime = this.searchDefault.date[1]
      } else {
        startTime = null
        endTime = null
      }
      return {
        page: this.pagination.page,
        limit: this.pagination.limit,
        prop: this.sort.prop,
        order: this.sort.order,
        startTime: startTime,
        endTime: endTime,
        name: this.searchDefault.name === '' ? null : this.searchDefault.name
      }
    }
  },
  methods: {
    indexMethod (row, column, cellValue, index) {
      let i = index + this.pagination.limit * (this.index - 1)
      return index === 0 ? '' : i
    },
    handleSizeChange (val) {
      this.pagination.page = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.getList()
    },
    rowClass ({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'searchRow'
      }
    },
    sortTable (opt) {
      this.sort.prop = opt.prop
      this.sort.order = opt.order
      this.getList(this.sort)
    },
    showSearch (value = true) {
      this.searchDefault.isOpened = value
    },
    /**
     * @description 按字段搜索table值
     */
    headleSearch (data = {}) {
      Object.assign(this.searchDefault, data)
      this.$nextTick(() => {
        this.getList()
      })
    },
    /**
     * @description 获取table多选选中的值
     */
    selectTable (selection) {
      this.selectData = selection
    },
    setSearchOpen () {
      if (!this.searchDefault.isOpened) {
        this.$nextTick(() => {
          document.querySelectorAll('.mainTable .searchRow').forEach((el) => {
            el.style.display = 'none'
          })
        })
      }
    }
  },
  components: {
    HeadSenior
  }
}
