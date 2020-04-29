<template>
  <div>
    <gkCom ref="gkcom"></gkCom>
    <div style="width: 1000px;">
      <el-table :data="dxjds">
        <el-table-column label="工号" width="60" prop="GH"></el-table-column>
        <el-table-column label="姓名" width="100" prop="XM"></el-table-column>
        <el-table-column label="今年应休" width="100" prop="YX"></el-table-column>
        <el-table-column label="今年抵扣" width="100" prop="DK"></el-table-column>
        <el-table-column label="今年还需调休" width="120" prop="YIX"></el-table-column>
        <el-table-column label="剩余调休总数" width="120" prop="ZS"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import gkCom from "./headerComponent.vue";
import { dxjd } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      userinfo: {},
      dxjds: []
    };
  },
  methods: {
    loadDxjd() {
      let me = this;
      dxjd({}).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          me.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          me.dxjds = data;
        }
      });
    }
  },
  components: {
    gkCom
  },
  mounted() {
    this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.loadDxjd();
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
