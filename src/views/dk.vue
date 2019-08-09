<template>
  <div>
    <div class="inheader">
      <el-button
        type="primary"
        icon="el-icon-goods"
        size="small"
        style="margin-left:650px;"
        @click="calImmed"
      >立即计算</el-button>
      <el-button
        type="primary"
        icon="el-icon-setting"
        size="small"
        style="margin-left:10px;"
        @click="dxCorrect"
      >调休校正</el-button>
    </div>
    <div>
      <div style="float:left;">
        <h3 style="margin-top:10px;background:#F2F6FC;">调休情况一览:</h3>
        <div style="width:401px;">
          <el-table
            :data="ps"
            style="width: 100%"
            ref="psTable"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="GH" label="工号" width="80"></el-table-column>
            <el-table-column prop="XM" label="姓名" width="80"></el-table-column>
            <el-table-column prop="NODEDUCTION" label="需抵扣" width="80"></el-table-column>
            <el-table-column prop="VALIDINDXD" label="可用" width="80"></el-table-column>
            <el-table-column prop="WTDX" label="未填" width="80"></el-table-column>
          </el-table>
        </div>
      </div>
      <div style="float:left;margin-left: 20px;">
        <h3 style="margin-top:50px;background:#F2F6FC;">申请抵扣列表:</h3>
        <div>
          <el-table
            :data="dks"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            ref="dksTable"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="GH" label="工号" width="80"></el-table-column>
            <el-table-column prop="XM" label="姓名" width="80"></el-table-column>
            <el-table-column prop="KQRQ" label="考勤日期" width="120"></el-table-column>
            <el-table-column prop="NODEDUCTION" label="调休小时" width="120"></el-table-column>
          </el-table>

          <el-button
            size="small"
            type="primary"
            style="margin-top:20px;margin-left:350px;"
            @click="dxddk"
          >抵扣</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGks, getDks, dk, ljjs, dxjz } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      ps: [],
      dks: [],
      selDxds: [],
      curp: {}
    };
  },
  methods: {
    calImmed() {
      ljjs({}).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          this.$message({
            message: "调休记录和值班记录已经刷新:)",
            type: "success"
          });
        }
      });
    },
    dxCorrect() {
      dxjz({}).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          let mes = "";
          if (data == "") {
            mes = "校正结束,没有需要删除的调休记录";
          } else {
            mes =
              "发现:[" +
              data[0].KQRQ +
              " " +
              data[0].GH +
              " " +
              data[0].XM +
              "] 已经删除";
          }
          this.$message({
            message: mes,
            type: "success"
          });
        }
      });
    },
    loaddata() {
      let params = { date: new Date() };
      getGks(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.ps = data;
        }
      });
      getDks(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.dks = data;
        }
      });
    },
    dxddk() {
      vm.selDxds.forEach(function(dxd) {
        let params = { gh: dxd.GH, xm: dxd.XM, dxId: dxd.DXID };
        dk(params).then(res => {
          let { flag, data, errMsg, outMsg } = res;
          if (!flag) {
            this.$message({
              message: errMsg,
              type: "error"
            });
          } else {
            vm.loaddata();
          }
        });
      });
    },
    handleCurrentChange(val) {
      vm.curp = val;
    },
    handleSelectionChange(val) {
      vm.selDxds = val;
    }
  },
  mounted() {
    vm = this;
    vm.loaddata();
  }
};
</script>

<style scoped>
.inheader {
  margin-top: 10px;
  height: 50px;
  width: 880px;
  background: #e8eaed;
  line-height: 50px;
}
</style>


