<template>
  <div class="gkheader">
    <el-badge :value="nodeduction" class="item" style="margin-left:20px;margin-top:20px;">
      <el-button>需要抵扣的调休小时</el-button>
    </el-badge>
    <el-badge :value="validindxd" class="item" type="primary" style="margin-left:30px;margin-top:20px;">
      <el-button>调休单中可用小时</el-button>
    </el-badge>
    <el-badge :value="wtdx" class="item" type="warning" style="margin-left:30px;margin-top:20px;">
      <el-button>值班应休还没填单小时</el-button>
    </el-badge>
  </div>
</template>

<script>
import GB from "../global.vue";
import { getGk } from "../api/api";

export default {
  data() {
    return {
      userinfo:{},
      nodeduction: 0, //需要抵扣的调休
      validindxd: 0, //调休单中可用小时
      wtdx: 0 //值班应休还没填单
    };
  },
  methods: {
    loaddata() {
      let params = { gh: this.userinfo.gh };
      getGk(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          this.nodeduction = data[0]["NODEDUCTION"];
          this.validindxd = data[0]["VALIDINDXD"];
          this.wtdx = data[0]["WTDX"];
        }
      });
    }
  },
  mounted() {
    this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.loaddata();
  }
};
</script>

<style scoped>
.gkheader {
  height: 80px;
  width: 800px;
  margin-top:20px;
  background: #E8eaed;
}
</style>

