<template>
  <div>
    <gkCom></gkCom>
    <div class="inheader">
      <span style="display: inline-block;margin-left:10px;">我的调休考勤未抵扣小时数 : {{total_no_deduction}}</span>
      <el-switch
        v-model="hideflag"
        active-text="隐藏已抵扣"
        inactive-text="显示所有"
        style="margin-left:50px;"
        @change="valchg"
      ></el-switch>
    </div>
    <div class="content">
      <el-table :data="dxjl" style="width: 100%" tooltip-effect="dark">
        <el-table-column label="考勤日期" width="180" sortable prop="KQRQ">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.KQRQ }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考勤调休小时" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.DX }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未被抵扣小时" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:red">{{ scope.row.NODEDUCTION }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getDxjl } from "../api/api";
import gkCom from "./headerComponent.vue";

let vm = {};

export default {
  data() {
    return {
      userinfo: {},
      total_no_deduction: 0,
      dxjl: [], //渲染数据
      odxjl: [], //原始数据
      hideflag: true
    };
  },
  methods: {
    loadDxjl() {
      let params = { gh: vm.userinfo.gh };
      getDxjl(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.odxjl = data;
          let count = 0;
          vm.odxjl.forEach(dx => {
            count += dx.NODEDUCTION;
          });
          vm.total_no_deduction = count;
          vm.valchg();
        }
      });
    },
    valchg() {
      if (vm.hideflag) {
        vm.dxjl = vm.odxjl.filter(function(dxjl) {
          if (dxjl.NODEDUCTION != 0) {
            return dxjl;
          }
        });
      } else {
        vm.dxjl = vm.odxjl;
      }
    }
  },
  components: {
    gkCom
  },
  mounted() {
    vm = this;
    vm.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    vm.loadDxjl();
  }
};
</script>

<style scoped>
.inheader{
  margin-top: 10px;
  height: 50px;
  width : 800px;
  background: #e8eaed;
  line-height: 50px;
}
</style>
