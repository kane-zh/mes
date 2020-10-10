<template>
    <div class="productionInfor">
        <div class="title">
          <span >车间信息</span>
        </div>
        <div class="team">
          <div class="content">
            <span>{{dateTime}}</span>
            <span>当前班组:焊接Ｂ班</span>
            <span>班长:贾元凯</span>
            <span class="num">实到: 20 人次</span>
          </div>
          <div class="weather">

          </div>

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dateTime: "",
      timeout: ''
    }
  },
      methods: {
        getTime() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
            let week = "日一二三四五六".charAt(date.getDay())
            this.dateTime =`${year}-${month}-${day} ${hour}:${minute}:${second} 星期${week}`
        }
      },
      mounted () {
      this.timeout = setInterval(() => {
      this.getTime()
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
    .productionInfor{
          position: relative;
          height: 100%;
          width: 100%;
        .title{
            width: 100%;
            height: 30%;
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
        .team{
          position: absolute;
          height:70%;
          width:100%;
          bottom: 0;
          background-image: url('../../../../static/icons/v2/todayBg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .content {
            position: absolute;
            height: 100%;
            width: 70%;
            top: 0;
            span {
              position: relative;
              left: 0;
              height: 25%;
              font-size: 0.3em;
              line-height: 2em;
              letter-spacing: 0.5em;
              text-align: left;
              padding-left: 1em;
              display: block;
            }
            span:first-child{
              font-size: 0.5em;
              line-height: 2em;
              letter-spacing: -0.1em;
            }
          }
            .weather{
              position: absolute;
              height:100%;
              width:30%;
              top: 0;
              right: 0;
          }

        }
    }
</style>
