<template>
    <div class="preMonth">
       <span class="title">设备信息</span>
       <div class="pmChart" id="pmChart"></div>
    </div>
</template>

<script>
import {getDateOfMonthAgo} from '../js/tool'
import {monthAgoDays} from '../js/api'
export default {
    data(){
        return{

        }
    },
    methods:{
        init(){
            var pmChart = document.getElementById('pmChart')
            let fsize = document.body.clientWidth/1920*16
            pmChart.style.height = document.body.clientWidth<=1920? fsize*14+'px':'14rem'
            var myChart = this.$echarts.init(pmChart);
            myChart.setOption(this.option)
        }
    },
    created(){
        this.option.xAxis[0].data = getDateOfMonthAgo()
        monthAgoDays().then(res=>{
            console.log(res)
        })
    },
    mounted(){
         this.init()


    }
}
</script>
<style lang="scss" scoped>
    .preMonth{
          position: relative;
          height: 100%;
          width: 100%;
        .title{
            height:2.3rem;
            width:18rem;
            line-height:2.3rem;
            letter-spacing: .2rem;
            font-size:1.2rem;
            border:.1rem solid rgba(48, 138, 199, 0.5);
            box-shadow: 0rem 0rem .5rem .1rem rgba(48, 138, 199, 0.5) inset;
        }
        .pmChart{
            width:100%;
            margin-top:.5rem;
        }
    }
</style>
