<template>
  <div class="myprogress">
    <div style="display:inline-block;margin-left:2px;">
      <span>{{leftLabel}}</span>
      <a @click="loadData">
        <i class="el-icon-search"></i>
      </a>
    </div>
    <div style="display:inline-block;float:right;margin-right:2px;">
      <span>{{rightLabel}}</span>
    </div>
    <div :style="myOuterlineStyle">
      <div :style="myInnerStyle">
        <span style="margin-right:2px;">{{percent}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    callbackVal: String,//父组件传入,作为子组件回调 
    leftLabel: String,
    rightLabel: String,
    //进度百分比
    percent: {
      type: Number,
      default: 10
    },
    //高度
    height: {
      type: String,
      default: "20px"
    },
    //宽度
    width: {
      type: String,
      default: "100%"
    },
    //进度条颜色
    color: {
      type: String,
      default: "rgb(103,194,58)"
    }
  },
  data() {
    return {
      myOuterlineStyle: {
        width: this.width,
        height: this.height,
        background: "#EBEEF5",
        borderRadius: parseInt(this.height) / 2 + "px"
      },
      myInnerStyle: {
        width: this.percent + "%",
        height: "100%",
        background: this.color,
        borderTopLeftRadius: parseInt(this.height) / 2 + "px",
        borderBottomLeftRadius: parseInt(this.height) / 2 + "px",
        borderTopRightRadius: this.getRadius(),
        borderBottomRightRadius: this.getRadius(),
        textAlign: "right"
      }
    };
  },
  methods: {
    getRadius() {
      let me = this;
      let re = "";
      if (me.percent <= 99) {
        re = "0px";
      } else {
        re = parseInt(me.height) / 2 + "px";
      }
      return re;
    },
    loadData(){
      this.$parent.loadData(this.callbackVal);
    }
  }
};
</script>

<style scoped>
.myprogress {
  overflow: hidden;
  padding: 2px;
}
a {
  display: inline-block;
  height: 15px;
  width: 15px;
  color: #20a0ff;
  margin-left: 10px;
}
a:hover {
  background: #20a0ff;
  color: white;
}
</style>