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
          <el-button @click="addRole" type="primary" size="small">添加</el-button>
          <el-button @click="delRole" type="danger" size="small">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <HeadSenior @showSearch="showSearch" :data="tableHead" @getSearch="headleSearch"/>
    <div class="table">
      <el-table
        id="roleTable"
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
            <span v-if="scope.row !== null">{{scope.row.info}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          :label="tableHead[3].name"
          v-if="tableHead[3].visible"
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
          :label="tableHead[4].name"
          v-if="tableHead[4].visible"
          fixed="right"
          width="225">
          <template slot-scope="scope">
            <div v-if="scope.row !== null">
              <el-button @click="editRole(scope.row)" type="success" size="mini">编辑</el-button>
              <span></span>
              <el-button @click="allotMenu(scope.row)" type="primary" size="mini">分配权限</el-button>
              <span></span>
              <el-button @click="bootRole(scope.row)" :type="scope.row.disabled?'primary':'warning'" size="mini">{{scope.row.disabled?'启用':'禁用'}}</el-button>
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
          @current-change="getList"
          :current-page.sync="pagination.page"
          :page-sizes="pagination.limits"
          :page-size.sync="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
    <RoleForm ref="RoleForm" :success="getList" />
    <AllotMenu ref="AllotMenu" :allAllot="allAllotMenu()" :success="getList" />
  </div>
</template>

<script>
import RoleForm from '@/components/role/form.vue'
import AllotMenu from '@/components/role/allotMenu.vue'
import { table } from '@/mixins/table'
export default {
  name: 'role',
  mixins: [table],
  data () {
    return {
      tableHead: [{
        name: '序号',
        visible: true
      }, {
        name: '名称',
        visible: true
      }, {
        name: '描述',
        visible: true
      }, {
        name: '日期',
        visible: true
      }, {
        name: '操作',
        visible: true
      }],
      searchOption: {
        allMenu: []
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getMenuSelector()
  },
  methods: {
    getList () {
      this.tableLoad = true
      this.$store.dispatch('role/list', this.listData).then((res) => {
        this.tableLoad = false
        this.index = this.pagination.page
        if (res.data.status === 1) {
          this.tableData = [null].concat(res.data.data.list)
          this.setSearchOpen()
          this.pagination.total = res.data.data.total
        }
      }).catch(() => {
        this.tableLoad = false
        this.$notify({
          title: '错误',
          message: 'Request failed with status code 404',
          type: 'error'
        })
      })
    },
    getMenuSelector () {
      this.$store.dispatch('common/MenuSelector').then((res) => {
        if (res.data.status === 1) {
          this.searchOption.allMenu = res.data.data
        }
      })
    },
    addRole () {
      this.$refs['RoleForm'].show()
    },
    editRole (data) {
      this.$refs['RoleForm'].show('edit', {
        name: data.name,
        info: data.info,
        cid: data.cid,
        oid: data.oid
      })
    },
    bootRole (data) {
      console.log(data)
      this.$confirm((data.disabled ? '禁用' : '启用') + '此角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('role/delete', data).then((res) => {
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
    },
    delRole () {
      if (this.selectData.length === 0) {
        this.$message.warning('请选择用户')
      } else {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('role/delete', this.selectData).then((res) => {
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
    /**
     * @description 菜单格式转换
     * @param data 不传代表全部菜单
     * @param type 数据格式 label/key
     */
    allAllotMenu: function (data = this.searchOption.allMenu, type = 'lk') {
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
    allotMenu (data) {
      this.$refs['AllotMenu'].show({
        name: data.name,
        roleList: this.allAllotMenu(data.menu, 'v')
      })
    }
  },
  components: {
    RoleForm,
    AllotMenu
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
