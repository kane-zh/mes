<template>
    <div class="commonServer" id="commonServer">
        <div class="title"></div>
        <div class="main">
            <div class="left">
                <div class="production">
                  <production />
                </div>
                <div class="plan">
                  <plan />
                </div>
            </div>
            <div class="center">
                <div class="model">
                  <model/>
                </div>
                <div class="equipment">
                  <equipment/>
                </div>
            </div>
            <div class="right">
                <div class="warehouse">
                  <warehouse />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import production from './components/production'
import plan from './components/plan'
import model from './components/model'
import equipment from './components/equipment'
import warehouse from './components/warehouse'
export default {
    components:{
        production,
        plan,
        model,
        equipment,
        warehouse
    },
    data(){
        return{

        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
    .commonServer{
        position: fixed;
        width:100%;
        height:100%;
        overflow: hidden;
        color:#61DEFA;
        background-image: url('../../../static/icons/v2/backgroup.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .title{
            position: absolute;
            top: 0;
            width:100%;
            height:5%;
            /*background-image: url('../../../static/icons/v2/title.png');*/
            /*background-size: 100% 100%;*/
            /*background-repeat: no-repeat;*/
        }
        .main{
            position: absolute;
            top: 5%;
            width:100%;
            height:95%;
            .left{
                position: absolute;
                top: 0;
                width:30%;
                height:100%;
                background-image: url('../../../static/icons/v2/left.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                .production{
                  position: absolute;
                  top: 0;
                  width:100%;
                  height:30%;
                }
                .plan{
                  position: absolute;
                  top: 30%;
                  width:100%;
                  height:70%;
                }
            }
            .center{
              position: absolute;
              top: 0;
              left: 30%;
              width:40%;
              height:100%;
              .model{
                position: absolute;
                top: 5%;
                width:100%;
                height:55%;
                background-image: url('../../../static/icons/v2/centerTop.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
              .equipment{
                position: absolute;
                bottom: 0;
                width:100%;
                height:40%;
                background-image: url('../../../static/icons/v2/centerBottom.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
            }
            .right{
              position: absolute;
              top: 0;
              right: 0;
              width:30%;
              height:100%;
              background-image: url('../../../static/icons/v2/right.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              .warehouse{
                position: absolute;
                bottom: 0;
                width:100%;
                height:100%;
              }
            }
        }
    }
</style>
