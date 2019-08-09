<template>
  <div>
    <gkCom ref="gkcom"></gkCom>
    <div class="inheader">
      <span style="display: inline-block;margin-left:10px;">我的值班未填调休小时数 : {{total_dx}}</span>
      <el-switch
        v-model="hideflag"
        active-text="隐藏已填完"
        inactive-text="显示所有"
        style="margin-left:50px;"
        @change="valchg"
      ></el-switch>
    </div>
    <div class="content">
      <el-table :data="yxyx" style="width: 100%">
        <el-table-column label="考勤日期" width="180" sortable prop="KQRQ">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.KQRQ }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值班应休小时数" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:green">{{ scope.row.DXYX }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已填调休单小时数" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px;">{{ scope.row.YX }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialog(scope.$index, scope.row)"
              :disabled="scope.row.cannotadd"
            >填单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <dxdCom ref="dxdcom"></dxdCom>
    </div>
  </div>
</template>

<script>
import GB from "../global.vue";
import gkCom from "./headerComponent.vue";
import dxdCom from "./addDxdComponent.vue";
import { getYxyx } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      total_dx: 0,
      yxyx: [], //渲染数据
      oyxyx: [], //原始数据
      hideflag: true,
      userinfo: {}
    };
  },
  methods: {
    loaddata() {
      let params = { gh: vm.userinfo.gh };
      getYxyx(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.oyxyx = data;
          vm.total_dx = 0;
          vm.oyxyx.forEach(yx => {
            yx["cannotadd"] = yx.DXYX <= yx.YX;
            vm.total_dx += yx.DXYX - yx.YX;
          });
          vm.$refs.gkcom.loaddata(); //同时更新一下概况
          vm.valchg();
        }
      });
    },
    valchg() {
      if (vm.hideflag) {
        vm.yxyx = vm.oyxyx.filter(function(el) {
          if (el.DXYX != el.YX) {
            return el;
          }
        });
      } else {
        vm.yxyx = vm.oyxyx;
      }
    },
    openDialog(index, row) {
      let params = {
        title: "值班调休单填写",
        gh: vm.userinfo.gh,
        xm: vm.userinfo.xm,
        max: row.DXYX - row.YX,
        kqrq: GB.intToDate(row.KQRQ)
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
.inheader{
  margin-top: 10px;
  height: 50px;
  width : 800px;
  background: #e8eaed;
  line-height: 50px;
}
</style>
