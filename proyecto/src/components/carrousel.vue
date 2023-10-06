<template>
    <div class="slider" ref="slider">
      <img src="../images/image2.jpg" alt="">
      <img src="../images/image4.png" alt="">
      <img src="../images/image1.jpg" alt="">
      <img src="../images/image3.jpg" alt="">
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
        const scrollAmount = slider.clientWidth;
  
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
        } else {
          slider.style.scrollBehavior = 'smooth';
          slider.scrollLeft += scrollAmount;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .slider {
    aspect-ratio: 10/16;
    width: 95%; /* Cambiado a 100% para que sea responsive */
    display: flex;
    overflow: hidden;
    border-radius: 20px; 
    position: relative;
    height: 95%;
  }
  
  .slider img {
    width: 100%; /* Cambiado a 100% para que sea responsive */
    height: auto; /* Ajusta la altura automáticamente para mantener la proporción */
    object-fit: cover;
    scroll-snap-align: center;
    position: sticky;
    border-radius: 20px;
    left: 0;
  }
  
  .slider::after, .end-placeholder {
    content: '';
    flex: 0 0 8px;
    background-color: transparent; 
    border-radius: 20px; 
  }
  </style>
  