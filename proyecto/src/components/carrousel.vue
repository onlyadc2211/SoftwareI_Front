<template>
  <div class="slider-container">
    <button @click="prevSlide" class="nav-button left">&#9665;</button>
    <div class="slider" ref="slider">
      <img src="../images/logo_final.jpg" alt="">
      <img src="../images/cafe_publi.jpg" alt="">
      
      <img src="../images/2.png" alt="">
      <img src="../images/3.png" alt="">
      <img src="../images/4.png" alt="">
      <img src="../images/1.png" alt="">
      <img src="../images/5.png" alt="">
      <img src="../images/6.png" alt="">
      <img src="../images/7.png" alt="">
  
      <div class="end-placeholder"></div>
    </div>
    <button @click="nextSlide" class="nav-button right">&#9655;</button>
  </div>
</template>

<script>
export default {
  methods: {
    nextSlide() {
      const slider = this.$refs.slider;

      if (slider && slider.clientWidth) {
        const scrollAmount = slider.clientWidth;

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
        } else {
          slider.style.scrollBehavior = 'smooth';
          slider.scrollLeft += scrollAmount;
        }
      }
    },

    prevSlide() {
      const slider = this.$refs.slider;

      if (slider && slider.clientWidth) {
        const scrollAmount = slider.clientWidth;

        if (slider.scrollLeft - scrollAmount <= 0) {
          slider.scrollLeft = 0;
        } else {
          slider.style.scrollBehavior = 'smooth';
          slider.scrollLeft -= scrollAmount;
        }
      }
    },
  },
};
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-left: 10%;
  border-radius: 20px;
}

.nav-button {
  font-size: 24px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 50%;
  opacity: 0.3; 
  transition: opacity 0.3s; 
}

.left {
  left: 20px;
  z-index: 1; 
}

.right {
  right:-2px;
}

.slider-container .nav-button + .nav-button {
  margin-left: 10px;
}

.slider {
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100%;
  border-radius: 20px;
  margin: 3%;
}

.slider img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  scroll-snap-align: center;
  position: sticky;
  left: 0;
 
}

.slider::after,

.end-placeholder {
  content: '';
  flex: 0 0 8px;
  background-color: transparent;
  border-radius: 20px;
}
</style>