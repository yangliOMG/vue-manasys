<template>
  <div class="content">
    <div style="margin-bottom: 20px;">
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户目录</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button @click="addManager" type="primary" size="small">添加</el-button>
          <el-button @click="delManager" type="danger" size="small">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <HeadSenior @showSearch="showSearch" :data="tableHead" @getSearch="headleSearch"/>
    <div class="table">
      <el-table
        id="managerTable"
        class="mainTable"
        ref="table"
        v-loading="tableLoad"
        element-loading-text="数据加载中"
        :data="tableData"
        @sort-change="sortTable"
        @selection-change="selectTable"
        :default-sort="{prop: 'date',order: 'descending'}"
        height="100%"
        :row-class-name="rowClass"
        border
        style="width: 100%;position:absolute;">
        <el-table-column
          type="selection"
          align="center"
          width="40"
          :selectable="(row, index) => index === 0?false:true">
        </el-table-column>
        <el-table-column
          :label="tableHead[0].name"
          v-if="tableHead[0].visible"
          width="50"
          align="center"
          :formatter="indexMethod">
        </el-table-column>
        <el-table-column
          :label="tableHead[1].name"
          v-if="tableHead[1].visible"
          sortable="custom"
          width="150">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row === null"
              v-model="searchDefault.name"
              @change="headleSearch"
              @keyup.13="headleSearch"
              size="mini"
              placeholder="输入关键词搜索"/>
            <span v-if="scope.row !== null">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[2].name"
          v-if="tableHead[2].visible"
          min-width="250">
          <template slot-scope="scope">
            <span v-if="scope.row !== null">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[3].name"
          v-if="tableHead[4].visible"
          sortable="custom"
          min-width="150">
          <template slot-scope="scope">
            <el-select
            v-if="scope.row === null"
            size="mini"
            @change="headleSearch"
            v-model="search.tag"
            clearable
            placeholder="请选择">
              <el-option
                v-for="item in searchOption.alltag"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div v-if="scope.row !== null">
              <el-tag
                style="margin:2px;"
                v-for="option in scope.row.tag"
                :key="option.value"
                :type="option.label === '经理' ? 'primary' : 'success'"
                disable-transitions>{{option.label}}</el-tag>
            </div>
          </template>
          <!-- <template slot="header" slot-scope="slot">
          <template slot-scope="scope"> -->
        </el-table-column>
        <el-table-column
          prop="date"
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          sortable="custom"
          width="220">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row === null"
              v-model="searchDefault.date"
              style="width:100%"
              type="daterange"
              size="mini"
              value-format="yyyy-MM-dd"
              @change="headleSearch"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <span v-if="scope.row !== null">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="tableHead[5].name"
          v-if="tableHead[5].visible"
          width="165">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="editManager(scope.row)" type="success" size="mini">编辑</el-button>
              <span></span>
              <el-button @click="allotRole(scope.row)" type="primary" size="mini">分配角色</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Pagination">
      <div class="block">
        <el-pagination
          :disabled="tableLoad"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :page-sizes="pagination.limits"
          :page-size.sync="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
    <ManagerForm ref="ManagerForm" :success="getList" />
    <AllotRole ref="AllotRole" :allAllot="allAllotRole()" :success="getList" />
  </div>
</template>

<script>
import ManagerForm from '@/components/manager/form.vue'
import AllotRole from '@/components/manager/allotRole.vue'
import { table } from '@/mixins/table'
export default {
  name: 'manager',
  mixins: [table],
  data () {
    return {
      tableHead: [{
        name: '序号',
        visible: true
      }, {
        name: '姓名',
        visible: true
      }, {
        name: '地址',
        visible: true
      }, {
        name: '角色',
        visible: true
      }, {
        name: '日期',
        visible: true
      }, {
        name: '操作',
        visible: true
      }],
      searchOption: {
        alltag: []
      },
      search: {
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getRoleSelector()
  },
  methods: {
    getList () {
      this.tableLoad = true
      this.$store.dispatch('manager/list', this.listData).then((res) => {
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
    getRoleSelector () {
      this.$store.dispatch('common/roleSelector').then((res) => {
        if (res.data.status === 1) {
          this.searchOption.alltag = res.data.data
        }
      })
    },
    addManager () {
      this.$refs['ManagerForm'].show()
    },
    editManager (data) {
      this.$refs['ManagerForm'].show('edit', {
        name: data.name,
        account: data.name,
        password: '********',
        repassword: '********'
      })
    },
    delManager () {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择用户')
      } else {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('manager/delete', this.selectData).then((res) => {
            if (res.data.status === 1) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify({
                title: '错误',
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      }
    },
    allAllotRole: function (data = this.searchOption.alltag, type = 'lk') {
      let arr = []
      data.forEach(function (item, index) {
        if (type === 'lk') {
          arr.push({
            label: item.label,
            key: item.value
          })
        } else {
          arr.push(item.value)
        }
      })
      return arr
    },
    allotRole (data) {
      this.$refs['AllotRole'].show({
        name: data.name,
        roleList: this.allAllotRole(data.tag, 'v')
      })
    }
  },
  components: {
    ManagerForm,
    AllotRole
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
