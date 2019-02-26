<template>
  <!--地区-->
  <div id="=Regional">
    <div id="printCheck" v-if="isTableTitle">
      <Query :tableTitle="tableTitle" v-on:getValue="getValue"/>
    </div>
    
    <!--table表格显示-->
    <div id="roleTable">
      <!--table表格显示-->
      <Table
        :tableData="regional.tableData"
        :tableTitle="tableTitle"
        v-on:checkboxValue="checkboxValue"
        v-if="isTableTitle"
      />
      <div class="block" style="display: inline-block" v-if="isTableTitle">
        <AddDelUpButton :up="up" :del="del" :save="save" :recording="recording"/>
        <!--分页-->
        <Pagination :data="regional" v-on:pageData="pageData"/>
      </div>
    </div>
  </div>
</template>
<script>
import { getRegional } from "../../api";
import PubSub_Cle from "pubsub-js";
import pUtils from "../../utils/PageUtils";
import Table from "../../components/ElementUi/Table";
import AddDelUpButton from "../../components/ElementUi/AddDelUpButton";
import Query from "../../components/ElementUi/Query";
import requestAjax from "../../api/requestAjax";
import Pagination from "../../components/ElementUi/Pagination";
//公司
export default {
  data() {
    return {
      isTableTitle: true, //如果table表头的长度是 0
      msgInput: "", //当选择后获得第一个下拉框的id
      tableTitle: [], //表头信息
      multipleSelection: [], //更新按钮数组收集
      FormValue_cle: false, //新增隐藏form
      regional: {
        tableData: [], //表信息
        currentPage: 1, //当前页
        total_size: 0, //总数
        pageSize: 1, //显示最大的页
        page_sizes: [1, 10, 15, 20, 25] //显示页数
      }
    };
  },
  components: {
    Table,
    Pagination,
    AddDelUpButton,
    Query
  },
  async mounted() {
    this.tableTitle = await requestAjax.requestGetHead(this.$route.params.id);
    //如果为空 =false 直接返回不走下面
    if (!this.tableTitle) {
      return;
    }
    this.isTableTitle = true;
    this.pagination(this.regional);
  },
  methods: {
    //分页参数传递
    pageData: function(data) {
      this.pagination(data);
    },
    //点击选项 Checkbox 按钮 获得val赋值给 multipleSelection
    checkboxValue(val) {
      this.multipleSelection = val;
    },
    save() {},
    //点击修改的时候 获得 Checkbox中 的属性
    up() {},
    del() {},
    recording() {
    
    },
    getValue: function(val) {
      this.msgInput = val;
    },
    //封装分页请求
    async pagination(data) {
      const res = await getRegional(data);
      if (res.code === 200) {
        //赋值 然后显示
        pUtils.pageInfo(res, data);
        console.log(this.regional.tableData);
      }
      // console.log(await getRegional(data));
    }
  }
};
</script>


<style>
</style>
