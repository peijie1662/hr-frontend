<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="考勤日期" label-width="100px">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.kqrq"
            :disabled="kqrqdisabled"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="调休小时数" label-width="100px">
          <el-input-number v-model="form.dx" :min="1" :max="max"></el-input-number>
        </el-form-item>
        <el-form-item label="调休单类型" label-width="100px">
          <el-select v-model="form.src" placeholder="请选择调休单类型" :disabled="srcdisabled">
            <el-option
              v-for="item in srcList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input type="textarea" v-model="form.bz"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewDx">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GB from "../global.vue";
import { addDxd } from "../api/api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      srcdisabled: false,
      kqrqdisabled: false,
      srcList: [
        {
          value: "AUTO",
          label: "值班转的调休单",
          disabled: false
        },
        {
          value: "INPUT",
          label: "加班赚的调休单",
          disabled: false
        },
        {
          value: "OLD",
          label: "多年前的调休单",
          disabled: false
        }
      ],
      form: {
        kqrq: "",
        dx: 8,
        src: "",
        desc: ""
      },
      gh: "",
      xm: "",
      max:0,
      kqrq: "",
      title: ""
    };
  },
  methods: {
    showDialog(p) {
      this.gh = p.gh;
      this.xm = p.xm;
      this.max = p.max;
      this.kqrq = p.kqrq;
      this.title = p.title;
      this.dialogFormVisible = true;
      if (this.title == "值班调休单填写") {
        this.kqrqdisabled = true;
        this.srcdisabled = true;
        this.form.src = "AUTO";
        this.form.kqrq = this.kqrq;
      } else {
        this.srcdisabled = false;
        this.srcList[0].disabled = true;
        this.form.src = "OLD";
      }
    },
    addNewDx() {
      if (GB.isEmpty(this.form.kqrq) || GB.isEmpty(this.form.src)) {
        this.$message({
          message: "考勤日期和单子类别都是必输项",
          type: "error"
        });
        return;
      }
      let params = {
        gh: this.gh,
        xm: this.xm,
        kqrq: GB.dateToInt(this.form.kqrq),
        dx: this.form.dx,
        src: this.form.src,
        bz: this.form.bz
      };
      addDxd(params).then(res => {
        let { flag, data, errMsg, outMsg } = res;
        if (!flag) {
          this.$message({
            message: errMsg,
            type: "error"
          });
        } else {
          this.$message({
            message: "新单已保存,可去领导处签字",
            type: "success"
          });
          this.$parent.loaddata();//将刷新方法定义为loaddata
        }
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>