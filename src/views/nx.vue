<template>
  <div>
    <div class="inheader">
      <mprogress
        v-for="(item,index) in nxgk"
        :key="index"
        height="15px"
        :percent="item.percent"
        :leftLabel="item.leftLabel"
        :rightLabel="item.rightLabel"
        :callbackVal="item.GH"
        style="margin-top:20px;"
      ></mprogress>
    </div>
    <div class="content">
      <el-dialog title="年休记录" :visible.sync="dialogVisible">
        <el-table :data="nxjl" style="width: 100%" tooltip-effect="dark">
          <el-table-column label="考勤日期" width="180" sortable prop="KQRQ">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.KQRQ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考勤年休小时" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.NXXS }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mprogress from "./progressComponent.vue";
import { getNxjl, getNxgk } from "../api/api";

let vm = {};

export default {
  data() {
    return {
      dialogVisible: false,
      userinfo: {},
      nxgk: [], //年休概况
      nxjl: [] //个人年休记录
    };
  },
  methods: {
    loadNxgk() {
      let params = {};
      getNxgk(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.nxgk = data;
          vm.nxgk.forEach(function(gk) {
            gk["leftLabel"] = gk.XM + " - " + "已休年休: " + gk.YIX + "小时";
            gk["rightLabel"] = "应休年休: " + gk.YINX + "小时";
            gk["percent"] = Math.round((gk.YIX / gk.YINX) * 100);
          });
        }
      });
    },
    loadData(gh) {
      let params = { gh: gh };
      getNxjl(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          vm.nxjl = data;
          vm.dialogVisible = true;
        }
      });
    },
    formatterTx(row) {
      let re = "";
      if (row.TX == "N") {
        re = "未填单";
      } else if (row.TX == "S") {
        re = "已申请";
      } else if (row.TX == "Y") {
        re = "已确认";
      }
      return re;
    }
  },
  components: {
    mprogress
  },
  mounted() {
    vm = this;
    vm.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    vm.loadNxgk();
  }
};
</script>

<style scoped>
.inheader {
  width: 800px;
}
</style>


