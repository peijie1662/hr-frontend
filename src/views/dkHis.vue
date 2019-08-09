<template>
  <div>
    <div class="inheader">
      <span style="display: inline-block;margin-left:10px;">抵扣历史一览</span>
      <el-switch
        v-model="hideflag"
        active-text="只显示今天"
        inactive-text="显示所有"
        style="margin-left:50px;"
        @change="valchg"
      ></el-switch>
      <el-select
        v-model="selStaff"
        clearable
        placeholder="输入姓名过滤"
        size="mini"
        style="width:150px;margin-left:30px;"
        @change="ryFilter"
      >
        <el-option v-for="item in ryxx" :key="item.gh" :label="item.xm" :value="item.gh"></el-option>
      </el-select>
    </div>
    <div class="content">
      <el-table :data="dkhis" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column
          label="操作时间"
          width="180"
          sortable
          prop="CRTDATE"
          :formatter="formatterDate"
        ></el-table-column>
        <el-table-column label="工号" width="80" sortable prop="GH"></el-table-column>
        <el-table-column label="姓名" width="80" sortable prop="XM"></el-table-column>
        <el-table-column label="被抵扣的调休" width="100" sortable prop="KQRQ"></el-table-column>
        <el-table-column label="用来抵扣的调休单" width="100" sortable prop="DXDKQRQ"></el-table-column>
        <el-table-column label="抵扣小时" width="80" sortable prop="DEDUCTION"></el-table-column>
        <el-table-column label="调休单状态" width="80" sortable prop="DXDSTATUS"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import GB from "../global.vue";
import { getDkHis } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      selStaff: "",
      ryxx: [
        { gh: "1486", id: "ZSW", xm: "周叔文" },
        { gh: "1174", id: "SH", xm: "史辉" },
        { gh: "1484", id: "SJF", xm: "沈剑锋" },
        { gh: "1705", id: "LYF", xm: "刘怡峰" },
        { gh: "1465", id: "ZE", xm: "张恩" },
        { gh: "1533", id: "LSH", xm: "李绍红" },
        { gh: "1495", id: "SJT", xm: "史俊涛" },
        { gh: "1658", id: "SDW", xm: "孙迪威" },
        { gh: "1038", id: "PJ", xm: "裴捷" },
        { gh: "1208", id: "XZL", xm: "徐梓磊" },
        { gh: "1094", id: "CLP", xm: "陈丽萍" },
        { gh: "0172", id: "JQF", xm: "姜清峰" },
        { gh: "0162", id: "HQM", xm: "何琪敏" }
      ],
      dkhis: [], //渲染数据
      odkhis: [], //原始数据
      hideflag: true
    };
  },
  methods: {
    loaddata() {
      let params = {};
      getDkHis(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.odkhis = data;
          vm.valchg();
        }
      });
    },
    valchg() {
      vm.selStaff = "";
      if (vm.hideflag) {
        vm.dkhis = vm.odkhis.filter(function(his) {
          let crtd = GB.formatDate(new Date(his.CRTDATE), "yyyy-MM-dd");
          let curd = GB.formatDate(new Date(), "yyyy-MM-dd");
          if (crtd == curd) {
            return his;
          }
        });
      } else {
        vm.dkhis = vm.odkhis;
      }
    },
    ryFilter(val) {
      vm.hideflag = false;
      vm.dkhis = vm.odkhis.filter(function(his) {
        if (val == "") {
          return his;
        } else if (his.GH == val) {
          return his;
        }
      });
    },
    formatterDate(row, column, val) {
      return GB.formatDate(new Date(val), "yyyy-MM-dd hh:mm:ss");
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.DXDSTATUS == "抵扣完") {
        return "warning-row";
      } else {
        return "";
      }
    }
  },
  mounted() {
    vm = this;
    vm.loaddata();
  }
};
</script>

<style>
/**
这里定义成scoped失效,需要从全局中寻找
*/
.el-table .warning-row {
  background: #85ce61;
}
</style>

<style scoped>
.inheader {
  margin-top: 10px;
  height: 50px;
  width: 800px;
  background: #e8eaed;
  line-height: 50px;
}
</style>

