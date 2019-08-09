<template>
  <div>
    <div class="inheader">
      <el-button
        size="small"
        type="primary"
        plain
        style="float:right;margin-right:100px;"
        @click="sure"
      >批准</el-button>
      <el-button
        size="small"
        type="primary"
        plain
        style="float:right;margin-right:10px;"
        @click="cancel"
      >取消</el-button>
      <el-button size="small" type="primary" plain style="float:right;" @click="selAll">全选</el-button>
    </div>
    <div style="width:800px;">
      <el-table
        :data="dxds"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="dxdTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="GH" label="工号" width="80"></el-table-column>
        <el-table-column prop="XM" label="姓名" width="80"></el-table-column>
        <el-table-column prop="KQRQ" label="考勤日期" width="100"></el-table-column>
        <el-table-column prop="DX" label="调休小时" width="100"></el-table-column>
        <el-table-column prop="BZ" label="备注" width="100"></el-table-column>
        <el-table-column prop="SRC" label="来源" width="100" :formatter="formatterSrc"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { qryHz, hz } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      mygh: "",
      myxm: "",
      dxds: [],
      selDxds: []
    };
  },
  methods: {
    loaddata() {
      let params = {};
      qryHz(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.dxds = data;
        }
      });
    },
    formatterSrc(row, column, val) {
      let re = "";
      if (val == "OLD") {
        re = "旧调休单";
      } else if (val == "INPUT") {
        re = "加班调休单";
      } else {
        re = "值班调休单";
      }
      return re;
    },
    handleSelectionChange(val) {
      vm.selDxds = val;
    },
    selAll() {
      vm.dxds.forEach(function(dxd) {
        vm.$refs.dxdTable.toggleRowSelection(dxd);
      });
    },
    cancel() {
      vm.$refs.dxdTable.clearSelection();
    },
    sure() {
      vm.selDxds.forEach(function(dxd) {
        let params = { dxId: dxd.DXID };
        hz(params).then(res => {
          let { flag, data, errMsg, outMsg } = res;
          if (!flag) {
            vm.$message({
              message: errMsg,
              type: "error"
            });
          } else {
            vm.$message({
              message: "批准成功,这些调休单已生效",
              type: "success"
            });
            vm.loaddata();
          }
        });
      });
    }
  },
  mounted() {
    vm = this;
    vm.loaddata();
  }
};
</script>

<style scoped>
.inheader{
  margin-top: 10px;
  padding-top: 10px;
  height: 40px;
  width : 800px;
  background: #e8eaed;
  line-height: 40px;
}
</style>

