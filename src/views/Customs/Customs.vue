<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      :default-sort = "{prop: 'id', order: 'descending'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="id"
        label="编号"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        property="class"
        label="清关类型"
        width="120">
      </el-table-column>
      <el-table-column
        property="it"
        label="备注:">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="success" icon="el-icon-edit" size="mini" @click="Shop_Up">修改
      </el-button>
      <el-button type="info" icon="el-icon-delete" size="mini">
        删除
      </el-button>
      <el-button type="primary" icon=" el-icon-circle-plus-outline" size="mini" @click="Area_RegionAdd">
        新增
      </el-button>
      <el-button type="warning"  size="mini">
        删除记录
      </el-button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '2016-05-02',
          class: 'AAA',
          it: 'XXX-XXX-XXX-XXX'
        }, {
          id: '2016-05-04',
          class: 'BBB',
          it: 'XXX-XXX-XXX-XXX'
        }, {
          id: '2016-05-01',
          class: 'CCC',
          it: 'XXX-XXX-XXX-XXX'
        }, {
          id: '2016-05-03',
          class: 'XXX',
          it: 'XXX-XXX-XXX-XXX'
        }],
        currentRow: null
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>
