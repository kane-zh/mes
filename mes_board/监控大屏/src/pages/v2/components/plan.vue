<template>
  <div  class="planInfor" >
      <div class="title">
        <span >计划信息</span>
      </div>
      <div class="table" id="parent">
        <table id="child">
          <tr align="center">
            <th>序号</th>
            <th>名称</th>
            <th>客户</th>
            <th>交期</th>
          </tr>
          <tr align="center" v-for="(item,index) in list" :key="item.id"  @click="getDetail(item.id)" >
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.client.name}}</td>
            <td>{{item.delivery_time}}</td>
          </tr>
          <tr>

          </tr>
        </table>
    </div>
      <div class="chart" >
        <span class="heard">订单完成</span>
        <div id="planChart"></div>
      </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      parent:'',
      child:'',
      list: [],
      option:{
        color: ['#dd66d1','#55b2c2','#8797e6'],
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: {type: 'category',
          axisLine: {  //这是x轴文字颜色
            lineStyle: {
              color: "#fff",
            }
          },
          axisLabel:{
            interval:0,
            rotate: 45
          }
        },
        yAxis:{	axisLine: {  //这是x轴文字颜色
            lineStyle: {
              color: "#fff",
            }
          }
        },
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      }
    }
  },
  methods: {
    getList() {
      this.list = [] // 清空列表数据
      var self = this
      this.$axios.get('plan/salesOrderCreate/?state=使用中&ordering=delivery_time').then(function (response) {
        self.list = response.data.results
        self.getDetail(self.list[0].id)
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    getDetail(id) {
      this.option.dataset.source=[]
      this.option.dataset.source[0]=['产品','总数量','分配数量','完成数量']
      var self = this
      this.$axios.get(`plan/salesOrderCreate/` + id).then(function (response) {
          response.data.child.forEach(function (value, i) {
            var mydata=[]
            mydata.push(value.product_name)
            mydata.push(value.sum)
            mydata.push(value.assigned)
            mydata.push(value.completed)
            self.option.dataset.source.push(mydata)
          })
        self.myChart = self.$echarts.init(document.getElementById('planChart'));
        self.myChart.setOption(self.option)
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    timer() {
      return setTimeout(() => {
        this.roll()
      }, 60000)
    },
    roll() {
      if(this.parent.scrollTop >= this.child.scrollHeight-this.parent.clientHeight) {
        this.getList()
      } else {
        this.parent.scrollTop+=10000
      }
    }
  },
  created() {
    this.getList()
    this.parent = document.getElementById('parent')
    this.child = document.getElementById('child')
  },
  mounted(){
    this.timer()
  }
}
</script>

<style lang="scss" scoped>
    .planInfor{
        position: relative;
        height: 100%;
        width: 100%;
        .title{
          width: 100%;
          height: 10%;
          font-size:0.4em;
          line-height:3em;
          letter-spacing: 0.5em;
          text-align:left;
          padding-left: 1em;
          background-image: url('../../../../static/icons/v2/productionTitle.png');
          background-size: 95% 100%;
          background-repeat: no-repeat;
          color: #ffffff;
        }
         .table{
          height: 50%;
          width: 98%;
          margin-left: 2%;
          overflow: auto;
           th{
             position: sticky;
             top:0;
             height: 2em;
             font-family: PingFangSC-Regular;
             font-size: 0.4em;
             line-height: 2em;
             color: #ffffff;
             text-align: center;
             letter-spacing: 0em;
             background: rgb(5, 29, 49);

           }
           td{
             height: 2em;
             font-family: PingFangSC-Regular;
             font-size: 0.25em;
             line-height: 3em;
             color: #ffffff;
             letter-spacing: 0.1em;
             text-align: center;
           }
           tr:nth-child(even){
             background: rgba(60, 193, 193, 0.3);
             background-size: 100% 100%;
             background-repeat: no-repeat;
           }
           th:nth-child(1){
             width: 10%;
           }
           th:nth-child(2){
             width: 45%;
           }
           th:nth-child(3){
             width: 10%;
           }
           th:nth-child(4){
             width: 35%;
           }
         }
         .chart {
           position: absolute;
           bottom: 0;
           height: 40%;
           width: 100%;
           span {
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 10%;
             font-size: 0.3em;
             line-height: 2em;
             letter-spacing: 0.5em;
             text-align: center;
             display: block;
           }
           #planChart{
             position: absolute;
             top: 10%;
             left: 0;
             width: 100%;
             height: 90%;
           }
         }
    }
</style>
