<template>
  <div class="modelInfor">
    <div id="container"></div>
  </div>
</template>
<script>
  import * as Three from 'three'
  import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader';
  export default {
    name: "vue-three",
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      }
    },
    methods: {
      init: function () {
        let container = document.getElementById('container')
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
        this.camera.position.z = 0.6
        this.scene = new Three.Scene()
        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
        let material = new Three.MeshNormalMaterial()
        this.mesh = new Three.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)
      },
      animate: function () {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
      },
      // 外部模型加载函数
      loadObj() {
        //包含材质
        new MTLLoader().setPath('/static/models/').load('male02.mtl', materials => {
          console.log("materials", materials);
          materials.preload();
          new OBJLoader().setMaterials(materials).setPath('/static/models/').load('male02.obj', obj => {
            obj.scale.set(30, 30, 30);
            obj.position.set(0, 0, 0);
            this.scene.add(obj);
          });
        });
      }
    },
    mounted() {
      this.init();
      alert(1)
      this.loadObj();
      alert(2)
      this.animate();
    }
  }
</script>
<style lang="scss" scoped>
  .modelInfor{
    position: relative;
    height: 100%;
    width: 100%;
    #container {
      position: absolute;
      width: 100%;
      height: 100%;
      /*background-image: url('../../../../static/icons/v2/model2.png');*/
      /*background-size: 100% 100%;*/
      /*background-repeat: no-repeat;*/
      color: #ffffff;
    }
    }
</style>
