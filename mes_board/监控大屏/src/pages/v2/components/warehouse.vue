<template>
  <div  class="planInfor" >
    <div class="title">
      <span >仓库信息</span>
    </div>
    <div class="material" >
      <span class="heard">物料仓库</span>
      <select v-model="materialWarehouse" placeholder="请选择仓库" >
        <option v-for="item in materialWarehouseInfor" :value="item.code" :key="item.code">{{item.name}}</option>
      </select>
      <div id="materialPositionChart"></div>
      <div id="materialDetailChart"></div>
    </div>
    <div class="production" >
      <span class="heard">产品仓库</span>
      <select v-model="productWarehouse" placeholder="请选择仓库" >
        <option v-for="item in productWarehouseInfor" :value="item.code" :key="item.code">{{item.name}}</option>
      </select>
      <div id="productPositionChart"></div>
      <div id="productDetailChart"></div>
    </div>
  </div>
</template>

<script>
  import {getDateOfMonthAgo} from '../js/tool'
  import {monthAgoDays} from '../js/api'
  export default {
    data(){
      return{
        materialWarehouseInfor:null,
        productWarehouseInfor:null,
        materialWarehouse:"",
        productWarehouse:"",
        pvAll:{
        　占用:'',
          空闲:'',
        },
        materialPositionOption: {
        title:{
          text:'库位利用率',
          left:'3%',
          top:'40%',
          textStyle:{
            color:'#619ADB',
            fontWeight:400,
            fontSize:15
          }
        },
        grid:{
          　left:'0%',
            top:'0%',
            bottom:'0%'
        },
        legend: {
          orient: 'vertical',
            top:'6%',
            right: '10%',
            itemWidth: 5,
            itemHeight: 40,
            itemGap: 15,//垂直方向距离
            textStyle: {
            color: '#7a8c9f',
              fontSize: 12,
              lineHeight: 22,
              rich: {
              percent: {
                color: '#fff',
                  fontSize: 16,
                  padding:[0,6,0,0]
              },
              pur:{color:'#D341F4'},
              blu:{color:'#2371ED'},
            },
          },
          formatter:(name)=>{
            let val = this.legendDatas(name)
            let fontCor
            switch(name){
              case '占用':
                fontCor = 'blu';
                break;
              case '空闲':
                fontCor = 'pur';
                break;
            }
            return name+'\n{percent|'+val+'}'+'{'+fontCor+'|库位}'
          },
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            type: 'pie',
            radius: ['58%', '70%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: {
              show: true,
              position:'outside',
              formatter:function(val){
                return parseInt(val.percent)+'%'
              }
            },
            labelLine:{
              show:true,
            },
            data: [
              {
                value: 0,
                name: '占用',
                itemStyle: {
                  color: '#1874F7',
                },
              },
              {
                value: 0,
                name: '空闲',
                itemStyle: {
                  color: '#CF43F4',
                },
              }
            ],
          },
          {
            type: 'pie',
            radius: ['45%', '57%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            labelLine:{
              show:false,
            },
            label: {
              show: true,
              position:'center',
              color:'#A6ACBC',
              lineHeight:18,
              rich:{
                num:{color:'#fff',fontSize:16},
                unit:{fontSize:13,color:'#fff',fontWeight:200,padding:[0,4]}
              },
            },
            data: [
              {
                value: 0,
                name: '占用',
                itemStyle: {
                  color: '#1874F7',
                  opacity: 0.5,
                },
              },
              {
                value: 0,
                name: '空闲',
                itemStyle: {
                  color: '#CF43F4',
                  opacity: 0.5,
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['32%', '44%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: {
              show:false,
            },
            labelLine:{
              show:false,
            },
            data: [
              {
                value: 0,
                name: '占用',
                itemStyle: {
                  color: '#1874F7',
                  opacity: 0.1,
                },
              },
              {
                value: 0,
                name: '空闲',
                itemStyle: {
                  color: '#CF43F4',
                  opacity: 0.1,
                },
              }
            ],
          },
        ],
      },
        materialDetailOption:{
          y:'center',
          tooltip : {
            trigger: 'axis',
            axisPointer : { // 坐标轴指示器，坐标轴触发有效
              type : 'line'// 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend:{
            data:['96121','气象网'],
            textStyle:{
              color:function(value){}
            },
            right:'0',
            top:'0',
            itemWidth:5,
            itemHeight:10
          },
          grid:{
            left: '5%',
            right: '4%',
            top:'5%',
            bottom:'5%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : [],
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#4F6287',
                }
              },
              axisLabel: {
                color: '#49C2D9',
                interval:0,
                rotate: 45
              },
              axisTick: {
                show:false,
              },
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine: {
                show: true,
                lineStyle:{
                  color: '#2A3D60',
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#4F6287',
                }
              },
              axisLabel: {
                color: '#49C2D9'
              },
              axisTick: {
                show:false,
              },
            }
          ],
          series : [
            {
              type: 'bar',
              barWidth: 8.5,
              itemStyle:{
                normal:{
                  color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#BD27F2'
                  }, {
                    offset: 0.8,
                    color: '#0B5BBD'
                  }], false)
                }
              },
              data: []
            }
          ]
        },
        productPositionOption:{
          title:{
            text:'库位利用率',
            left:'15%',
            top:'50%',
            textStyle:{
              color:'#619ADB',
              fontWeight:400,
              fontSize:15
            }
          },
          tooltip:{
            trigger:'item',
          },
          series:[
            {
              type:'pie',
              radius:'70%',
              center:['50%','50%'],
              labelLine:{
                show:false,
              },
              label:{
                padding:[0,-20],
                formatter:(val)=>{
                  return parseInt(val.percent)+'%'
                }
              },
              data:[
                {
                  value: 0,
                  name: '占用',
                  itemStyle: {
                    color: '#856BFF',
                  },
                },
                {
                  value: 0,
                  name: '闲置',
                  itemStyle: {
                    color: '#00FCFF',
                  },
                },
              ]
            }
          ]
        },
        productDetailOption:{
          tooltip : {
            trigger: 'axis',
            axisPointer : { // 坐标轴指示器，坐标轴触发有效
              type : 'line'// 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend:{
            data:['96121','气象网'],
            textStyle:{
              color:function(value){}
            },
            right:'0',
            top:'0',
            itemWidth:10,
            itemHeight:10
          },
          grid:{
            left: '3%',
            right: '4%',
            top:'5%',
            bottom:'5%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : [],
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#83D7F4',
                }
              },
              axisLabel: {
                color: '#7B8FB1',
                interval:0,
                rotate: 45
              },
              axisTick: {
                show:false,
              },
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#83D7F4',
                }
              },
              axisLabel: {
                color: '#7B8FB1'
              },
              axisTick: {
                show:false,
              },
            }
          ],
          series : [
            {
              type: 'bar',
              barWidth: 18,
              itemStyle:{
                normal:{
                  color:(val)=>{
                    return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, this.colorBar(val.value), false)
                  }
                }
              },
              data: []
            }
          ]
        },
      }
    },
    methods:{
      getMaterialPosition () {
        var id=''
        var self = this
        this.materialWarehouseInfor.forEach(function (value, i) {
          if (value.code===self.materialWarehouse) {
             id=value.id
          }
        })
        var using=0
        var idel=0
        this.$axios.get(`warehouse/warehouse/` + id).then(function (response) {
          response.data.warehouse_item.forEach(function (value, i) {
            if (value.state==="使用中") {
              using++
            }
            if(value.state==="闲置"){
              idel++
            }
          })
          self.pvAll["占用"]=using
          self.pvAll["空闲"]=idel
          self.materialPositionOption.series[0].data[0].value=using
          self.materialPositionOption.series[0].data[1].value=idel
          self.materialPositionOption.series[1].data[0].value=using
          self.materialPositionOption.series[1].data[1].value=idel
          self.materialPositionOption.series[2].data[0].value=using
          self.materialPositionOption.series[2].data[1].value=idel
          var myChart = self.$echarts.init(document.getElementById('materialPositionChart'));
          myChart.setOption(self.materialPositionOption)
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      },
      getMaterialStock () {
        this.materialDetailOption.xAxis[0].data=[]
        this.materialDetailOption.series[0].data=[]
        var self = this
        this.$axios.get('warehouse/materialStockInfor/?warehouse_code=' + self.materialWarehouse).then(function (response) {
          response.data.results.forEach(function (value, i) {
              if (value.sum > 0) {
              self.materialDetailOption.xAxis[0].data.push(value.material_name)
              self.materialDetailOption.series[0].data.push(value.sum)
            }
          })
          var myChart = self.$echarts.init(document.getElementById('materialDetailChart'));
          myChart.setOption(self.materialDetailOption)
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      },
      getProductPosition () {
        var id=''
        var self = this
        this.productWarehouseInfor.forEach(function (value, i) {
          if (value.code===self.productWarehouse) {
            id=value.id
          }
        })
        var using=0
        var idel=0
        this.$axios.get(`warehouse/warehouse/` + id).then(function (response) {
          response.data.warehouse_item.forEach(function (value, i) {
            if (value.state==="使用中") {
              using++
            }
            if(value.state==="闲置"){
              idel++
            }
          })
          self.productPositionOption.series[0].data[0].value=using
          self.productPositionOption.series[0].data[1].value=idel
          var myChart = self.$echarts.init(document.getElementById('productPositionChart'));
          myChart.setOption(self.productPositionOption)
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      },
      getProductStock () {
        this.productDetailOption.xAxis[0].data=[]
        this.productDetailOption.series[0].data=[]
        var self = this
        this.$axios.get('warehouse/productStockInfor/?warehouse_code=' + self.productWarehouse).then(function (response) {
          response.data.results.forEach(function (value, i) {
            if (value.sum > 0) {
              self.productDetailOption.xAxis[0].data.push(value.product_name)
              self.productDetailOption.series[0].data.push(value.sum)
            }
          })
          var myChart = self.$echarts.init(document.getElementById('productDetailChart'));
          myChart.setOption(self.productDetailOption)
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      },
      colorBar(value){
        let max = Math.max.apply(null, this.productDetailOption.series[0].data)
        let oneUnit = max/5
        let multiple = Math.ceil(value/oneUnit)//倍数
        let colores = ['#1832B6','#1832B6','#356CD5','#356CD5','#4D9DFF','#4D9DFF','#00DEFF','#00DEFF','#4EFFE7','#4EFFE7']
        let barArr = [
          [{offset:1},{offset:0}],
          [{offset:1},{offset:0.51},{offset:0.5},{offset:0}],
          [{offset:1},{offset:0.67},{offset:0.66},{offset:0.34},{offset:0.33},{offset:0}],
          [{offset:1},{offset:0.76},{offset:0.75},{offset:0.51},{offset:0.5},{offset:0.26},{offset:0.25},{offset:0}],
          [{offset:1}, {offset:0.81},{offset:0.8},{offset:0.61},{offset:0.6},{offset:0.41},{offset:0.4},{offset:0.21},{offset:0.2},{offset:0}]
        ]
        let itemColor = colores.slice(0,multiple*2)//每一条的颜色数量
        let colorArr = barArr[multiple-1]//每一条对应的颜色分段
        for(let i=0;i<colorArr.length;i++){
          colorArr[i].color = itemColor[i]
        }
        return colorArr
      },
      legendDatas(name){
        return this.pvAll[name]
      },
      timer() {
        return setTimeout(() => {
          this.roll()
        }, 60000)
      },
      roll() {
        this.getMaterialPosition()
        this.getMaterialStock()
        this.getProductPosition()
        this.getProductStock()
      }
    },
    created(){
      var self = this
      this.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=物料库&state=使用中').then(function (response) {
          self.materialWarehouseInfor = response.data.results
          self.materialWarehouse=self.materialWarehouseInfor[0].code
          self.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=产品库&state=使用中').then(function (response) {
            self.productWarehouseInfor = response.data.results
            self.productWarehouse=self.productWarehouseInfor[0].code
          }).catch(function (err) {
            if (err.request) {
              alert(err.request.response)
            } else {
              console.log('Error', err.message)
            }
          })
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
    },
    updated(){
      this.roll()
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
      text-align:right;
      padding-right: 2em;
      background-image: url('../../../../static/icons/v2/productionTitle.png');
      background-size: 95% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
    }
    .material{
      position: absolute;
      top: 10%;
      height: 45%;
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 0.25em;
      line-height: 3em;
      color: #ffffff;
      letter-spacing: 0.1em;
      text-align: center;
      overflow: auto;
      select{
        position: absolute;
        top: 0;
        right: 3%;
        height: 5%;
        width: 30%;
      }
      #materialPositionChart{
        position: absolute;
        top: 10%;
        height: 40%;
        width: 100%;
      }
      #materialDetailChart{
        position: absolute;
        top: 50%;
        height: 50%;
        width: 100%;
      }
    }
    .production{
      position: absolute;
      top: 60%;
      height: 45%;
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 0.25em;
      line-height: 3em;
      color: #ffffff;
      letter-spacing: 0.1em;
      text-align: center;
      overflow: auto;
      select{
        position: absolute;
        top: 0;
        right: 3%;
        height: 5%;
        width: 30%;
      }
      #productPositionChart{
        position: absolute;
        top: 10%;
        height: 40%;
        width: 100%;
      }
      #productDetailChart{
        position: absolute;
        top: 50%;
        height: 50%;
        width: 100%;
      }
    }
  }
</style>
