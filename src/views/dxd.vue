<template>
  <div>
    <gkCom ref="gkcom"></gkCom>
    <div class="inheader">
      <span
        style="display: inline-block;margin-left:10px;"
      >我有调休单{{total_count}}张,折合未使用小时数{{total_hour}}</span>
      <el-switch
        v-model="hideflag"
        active-text="隐藏已抵扣"
        inactive-text="显示所有"
        style="margin-left:50px;"
        @change="valchg"
      ></el-switch>
      <el-button
        type="primary"
        size="small"
        @click="openDialog"
        plain
        style="display:inline-block;margin-left:50px;"
      >填写特殊调休单</el-button>
      <dxdCom ref="dxdcom"></dxdCom>
    </div>
    <div style="width: 1000px;">
      <el-table :data="dxds">
        <el-table-column label="考勤日期" width="120" sortable prop="KQRQ">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.KQRQ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DX" label="调休小时" width="80"></el-table-column>
        <el-table-column label="可用小时" width="80">
          <template slot-scope="scope">
            <span style="color:green;">{{ scope.row.NODEDUCTION }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="SRC" label="来源" width="120" :formatter="formatterSrc"></el-table-column>
        <el-table-column label="核准" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.hzflag" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.BZ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="TJ" label="抵扣状态" width="100" :formatter="formatterTj"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="dk(scope.$index, scope.row)"
              :disabled="scope.row.nodk"
            >抵扣</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="qx(scope.$index, scope.row)"
              :disabled="scope.row.noqx"
            >取消</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="del(scope.$index, scope.row)"
              :disabled="scope.row.nodel"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import gkCom from "./headerComponent.vue";
import dxdCom from "./addDxdComponent.vue";
import { getDxd, sqdk, qxdk, delDxd } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      userinfo: {},
      total_count: 0,
      total_hour: 0,
      dxds: [], //渲染数据
      odxds: [], //原始数据
      hideflag: true
    };
  },
  methods: {
    loaddata() {
      let params = { gh: vm.userinfo.gh };
      getDxd(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.odxds = data;
          vm.total_count = 0;
          vm.total_hour = 0;
          vm.odxds.forEach(yx => {
            //核准状态
            yx["hzflag"] = yx.HZ == "Y";
            //不能申请抵扣
            yx["nodk"] = yx.TJ == "S" || yx.TJ == "Y" || yx.HZ == "N";
            //不能取消抵扣
            yx["noqx"] = yx.TJ == "N" || yx.TJ == "Y";
            //不能删除
            yx["nodel"] = yx.TJ == "Y";
            vm.total_count += 1;
            vm.total_hour += yx.NODEDUCTION;
          });
          vm.$refs.gkcom.loaddata(); //同时更新一下概况
          vm.valchg();
        }
      });
    },
    valchg() {
      if (vm.hideflag) {
        vm.dxds = vm.odxds.filter(function(dxd) {
          if (dxd.TJ != "Y") {
            return dxd;
          }
        });
      } else {
        vm.dxds = vm.odxds;
      }
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
    formatterTj(row, column, val) {
      let re = "";
      if (val == "N") {
        re = "未抵扣";
      } else if (val == "S") {
        re = "已申请";
      } else {
        re = "已抵扣";
      }
      return re;
    },
    dk(index, row) {
      let params = { dxId: vm.dxds[index].DXID };
      sqdk(params).then(res => {
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
    },
    qx(index, row) {
      let params = { dxId: vm.dxds[index].DXID };
      qxdk(params).then(res => {
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
    },
    del(index, row) {
      this.$confirm("你想永久删除一张珍贵的调休单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { dxId: row.DXID };
          delDxd(params).then(res => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openDialog() {
      let params = {
        title: "特殊调休单填写",
        gh: vm.userinfo.gh,
        xm: vm.userinfo.xm,
        max: 12,
        kqrq: new Date()
      };
      vm.$refs.dxdcom.showDialog(params);
    }
  },
  components: {
    gkCom,
    dxdCom
  },
  mounted() {
    vm = this;
    vm.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    vm.loaddata();
  }
};
</script>

<style scoped>
.inheader {
  margin-top: 10px;
  height: 50px;
  width: 800px;
  background: #e8eaed;
  line-height: 50px;
}
</style>
