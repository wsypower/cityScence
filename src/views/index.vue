<template>
  <div
    class="home"
    @click='onload'
  >
    <div class="card__containr">
      <div class="container">
        <div class="cover atvimg">
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa-bg.jpg"
          ></div>
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa.png"
          ></div>
        </div>

        <div class="cover atvimg">
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa-bg-2.jpg"
          ></div>
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa.png"
          ></div>
        </div>

        <div class="cover atvimg">
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa-bg-3.jpg"
          ></div>
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa.png"
          ></div>
        </div>

        <div class="cover atvimg">
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa-bg-4.jpg"
          ></div>
          <div
            class="atvimg-layer"
            data-img="http://robindelaporte.fr/codepen/visa.png"
          ></div>
        </div>
      </div>
    </div>
    <div class="features"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {},
  methods: {
    onload() {
      this.atvimg();
    },
    atvimg() {
      console.log(123)
      var d = document,
        de = d.documentElement,
        bd = d.getElementsByTagName("body")[0],
        htm = d.getElementsByTagName("html")[0],
        win = window,
        imgs = d.querySelectorAll(".atvimg"),
        totalImgs = imgs.length,
        supportsTouch = "ontouchstart" in win || navigator.msMaxTouchPoints;

      if (totalImgs <= 0) {
        return;
      }

      for (var l = 0; l < totalImgs; l++) {
        var thisImg = imgs[l],
          layerElems = thisImg.querySelectorAll(".atvimg-layer"),
          totalLayerElems = layerElems.length;

        if (totalLayerElems <= 0) {
          continue;
        }

        while (thisImg.firstChild) {
          thisImg.removeChild(thisImg.firstChild);
        }

        var containerHTML = d.createElement("div"),
          shineHTML = d.createElement("div"),
          shadowHTML = d.createElement("div"),
          layersHTML = d.createElement("div"),
          layers = [];

        thisImg.id = "atvimg__" + l;
        containerHTML.className = "atvimg-container";
        shineHTML.className = "atvimg-shine";
        shadowHTML.className = "atvimg-shadow";
        layersHTML.className = "atvimg-layers";

        for (var i = 0; i < totalLayerElems; i++) {
          var layer = d.createElement("div"),
            imgSrc = layerElems[i].getAttribute("data-img");

          layer.className = "atvimg-rendered-layer";
          layer.setAttribute("data-layer", i);
          layer.style.backgroundImage = "url(" + imgSrc + ")";
          layersHTML.appendChild(layer);

          layers.push(layer);
        }

        containerHTML.appendChild(shadowHTML);
        containerHTML.appendChild(layersHTML);
        containerHTML.appendChild(shineHTML);
        thisImg.appendChild(containerHTML);

        var w =
          thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
        thisImg.style.transform = "perspective(" + w * 3 + "px)";

        if (supportsTouch) {
          win.preventScroll = false;

          (function(_thisImg, _layers, _totalLayers, _shine) {
            thisImg.addEventListener("touchmove", function(e) {
              if (win.preventScroll) {
                e.preventDefault();
              }
              processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
            });
            thisImg.addEventListener("touchstart", function(e) {
              win.preventScroll = true;
              processEnter(e, _thisImg);
            });
            thisImg.addEventListener("touchend", function(e) {
              win.preventScroll = false;
              processExit(e, _thisImg, _layers, _totalLayers, _shine);
            });
          })(thisImg, layers, totalLayerElems, shineHTML);
        } else {
          (function(_thisImg, _layers, _totalLayers, _shine) {
            thisImg.addEventListener("mousemove", function(e) {
              processMovement(
                e,
                false,
                _thisImg,
                _layers,
                _totalLayers,
                _shine
              );
            });
            thisImg.addEventListener("mouseenter", function(e) {
              processEnter(e, _thisImg);
            });
            thisImg.addEventListener("mouseleave", function(e) {
              processExit(e, _thisImg, _layers, _totalLayers, _shine);
            });
          })(thisImg, layers, totalLayerElems, shineHTML);
        }
      }

      function processMovement(
        e,
        touchEnabled,
        elem,
        layers,
        totalLayers,
        shine
      ) {
        var bdst = bd.scrollTop || htm.scrollTop,
          bdsl = bd.scrollLeft,
          pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
          pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
          offsets = elem.getBoundingClientRect(),
          w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
          h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
          wMultiple = 320 / w,
          offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
          offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
          dy = pageY - offsets.top - bdst - h / 2,
          dx = pageX - offsets.left - bdsl - w / 2,
          yRotate = (offsetX - dx) * (0.07 * wMultiple),
          xRotate = (dy - offsetY) * (0.1 * wMultiple),
          imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)",
          arad = Math.atan2(dy, dx),
          angle = (arad * 180) / Math.PI - 90;

        if (angle < 0) {
          angle = angle + 360;
        }

        if (elem.firstChild.className.indexOf(" over") != -1) {
          imgCSS += " scale3d(1.07,1.07,1.07)";
        }
        elem.firstChild.style.transform = imgCSS;

        shine.style.background =
          "linear-gradient(" +
          angle +
          "deg, rgba(255,255,255," +
          ((pageY - offsets.top - bdst) / h) * 0.4 +
          ") 0%,rgba(255,255,255,0) 80%)";
        shine.style.transform =
          "translateX(" +
          offsetX * totalLayers -
          0.1 +
          "px) translateY(" +
          offsetY * totalLayers -
          0.1 +
          "px)";

        var revNum = totalLayers;
        for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform =
            "translateX(" +
            offsetX * revNum * ((ly * 2.5) / wMultiple) +
            "px) translateY(" +
            offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
            "px)";
          revNum--;
        }
      }

      function processEnter(e, elem) {
        elem.firstChild.className += " over";
      }

      function processExit(e, elem, layers, totalLayers, shine) {
        var container = elem.firstChild;

        container.className = container.className.replace(" over", "");
        container.style.transform = "";
        shine.style.cssText = "";

        for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform = "";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .card__containr {
    width: 100%;
    height: 396px;
    z-index: 20;
    position: absolute;
  }
  .features {
    position: absolute;
    width: 100%;
    height: 582px;
    bottom: 0px;
    background: url("~@/assets/images/indemain.png") no-repeat center center;
  }
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .cover {
    display: inline-block;
    height: 200px;
    width: 320px;
    margin: 15px;
    border-radius: 8px;
    background-color: red;
  }

  @media screen and (max-width: 700px) {
    .container {
      width: 100%;
      position: relative;
      transform: translate(0%, 0%);
      top: 0;
      left: 0;
    }
    .cover {
      display: block;
      height: 200px;
      width: 320px;
      margin: 15px auto;
    }
  }

  .atvimg {
    border-radius: 8px;
    transform-style: preserve-3d;
    -webkit-tap-highlight-color: rgba(#000, 0);
  }

  .atvimg img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(14, 21, 47, 0.25);
  }

  .atvimg-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: all 0.2s ease-out;
    background-color: rgb(34, 20, 20);
  }

  .atvimg-container.over .atvimg-shadow {
    box-shadow: 0 45px 100px rgba(14, 21, 47, 0.4),
      0 16px 40px rgba(14, 21, 47, 0.4);
  }

  .atvimg-layers {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .atvimg-rendered-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    background-size: cover;
    transition: all 0.1s ease-out;
    overflow: hidden;
    border-radius: 8px;
  }

  .atvimg-shadow {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    transition: all 0.2s ease-out;
    box-shadow: 0 8px 30px rgba(14, 21, 47, 0.6);
  }

  .atvimg-shine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0) 60%
    );
  }
}
</style>