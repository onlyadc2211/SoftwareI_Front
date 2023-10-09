<template>
  <div class="slider" ref="slider">
    <img src="../images/logo_final.jpg" alt="">
    <img src="../images/cafe_publi.jpg" alt="">
    <div class="end-placeholder"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.setupAutomaticSlide();
  },
  methods: {
    setupAutomaticSlide() {
      this.slideInterval = setInterval(this.nextSlide, 5000);
    },
    nextSlide() {
  const slider = this.$refs.slider;

  // Verifica si el elemento slider existe antes de acceder a clientWidth
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
  },
};
</script>

<style scoped>
.slider {
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
