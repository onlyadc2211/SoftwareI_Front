<template>
    <div id="container">
  
      <div id="header">
        <button id="regresar" @click="goBack">
          <img src="../images/regresar.png" alt="">
        </button>
        <button id="rapidAcces" @click="goLots">
          <img src="../images/planta.png" alt="">
        </button>
        <button id="rapidAcces" @click="goWorkers">
          <img src="../images/trabajador.png" alt="">
        </button>
        <button id="rapidAcces" @click="goCrops">
          <img src="../images/cosecha.png" alt="">
        </button>
        <div id="notifications">
         
          <button class="notification-button">
            <img src="../images/noti.png" alt="Icono 2">
          </button>
          <button class="notification-button">
            <img src="../images/user.png" alt="Icono 3">
          </button>
        </div>
      </div>
      <div id="title">
        <h1 id="t">Ventas</h1>
      </div>
      <div id="buttons">
        <div class="btns" @click="goSales">
          <img src="../images/ventas.png" alt="" class="btn-img">
          <h2 class="btn-text">Gestionar ventas</h2>
        </div>
        <div class="btns" @click="goBills">
          <img src="../images/factura.png" alt="" class="btn-img">
          <h2 class="btn-text">Facturas</h2>
        </div>
        <div class="btns" @click="goProducts">
          <img src="../images/productos.png" alt="" class="btn-img">
          <h2 class="btn-text">Productos</h2>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.push('/main');
  }
  const goWorkers = () => {
    router.push('/main/cropManagement/workers')
  }
  const goSales = () => {
    router.push('/main/salesManagement/sales')
  }
  const goCrops = () => {
    router.push('/main/cropManagement/crops')
  }
  const goLots = () => {
    router.push('/main/cropManagement/lots')
  }
  const goProducts = () => {
    router.push('/main/salesManagement/products')
  }

  const goBills = () => {
    router.push('/main/salesManagement/bills')
  }
 
  
  </script>
    
  <style scoped>
  #container {
    display: flex;
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    width: 90%;
    height: 90vh;
    margin: auto;
    margin-top: 3%;
    background-color: #fee1cc;
    border-radius: 2%;
    position: relative;
    flex-direction: column;
  }
  
  #t {
    margin: 0;
  }
  
  #title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-size: 30px;
    width: 20%;
  
  
  }
  
  
  #buttons {
  
    width: 90%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-bottom: 3%;
  }
  
  .btns {
    background-color: #ffa364;
    align-self: center;
    height: 80%;
    width: 20%;
    margin: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s;
    border-radius: 20px;
  }
  
  .btns:hover {
    transform: scale(1.1);
  }
  
  .btn-img {
    width: 70%;
    height: auto;
    object-fit: contain;
  }
  
  .btn-text {
    margin: 5px 0;
    text-align: center;
  }
  
  #header {
    display: flex;
    align-items: center;
    background-color: #fed1b2;
  }
  
  
  #regresar {
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.1s;
    width: 5%;
    margin: 1%;
    margin-right: 0%;
  }
  
  #regresar:hover {
    transform: scale(1.1);
  }
  
  #regresar img {
    width: 100%;
    height: auto;
  }
  
  #rapidAcces {
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.1s;
    width: 5%;
    margin-right: 1%;
  }
  
  #rapidAcces:hover {
    transform: scale(1.1);
  }
  
  #rapidAcces img {
    width: 150%;
    height: 45px;
  }
  
  #notifications {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  
  .notification-button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-right: 1vw;
    transition: transform 0.3s;
  }
  
  .notification-button:hover {
    transform: scale(1.1);
  }
  
  .notification-button img {
    width: 6vh;
    height: 6vh;
  }
  </style>
    