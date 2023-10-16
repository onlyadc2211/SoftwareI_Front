<template>
    <div id="container">
      <div id="header">
        <button id="regresar" @click="goBack">
          <img src="../images/regresar.png" alt="">
        </button>
        <div id="notifications">
          <button class="notification-button">
            <img src="../images/noti.png" alt="Icono 1">
          </button>
          <button class="notification-button">
            <img src="../images/user.png" alt="Icono 2">
          </button>
        </div>
      </div>
      <div id="title">
        <h1 id="t">Lotes</h1>
        <div id="contenido">
          <div class="lotes">
            <div v-for="index in 10" :key="index" class="lote-item">
              <div class="lote-content">
                <h1>Lote {{ index }}</h1>
                <p>N° plantas </p>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="btnLotes">Agregar</button>
          <button class="btnLotes">Eliminar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.go(-1);
  }
  </script>
  
  <style scoped>
  .btnLotes{
    margin: 3%;
    height: 50%;
    width: 30%;
    background-color: #401E01;
    font-size: 200%;
    color: white;
    cursor: pointer;

  }
  .buttons {
    background-color: #bf0f1e;
    margin: 1%;
    margin-top: 0;
    width: 98%;
    display: flex;
    justify-content: space-around;
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
    height: 30%;
     
  }
  .btnLotes:hover {
    transform: scale(1.1);
  }
  
  #container {
    display: flex;
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    width: 90%;
    height: 90vh;
    margin: auto;
    margin-top: 3%;
    background-color: beige;
    border-radius: 2%;
    position: relative;
    flex-direction: column;
  }
  
  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:  #bf0f1e;
    border-top-left-radius: 2%;
    border-top-right-radius: 2%;
  }
  
  #t {
    margin: 0;
    font-size: 4vw; 
  }
  
  #title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    background-color: #d9ac59;
    height: 100%;
    border-bottom-left-radius: 2%;
    border-bottom-right-radius: 2%;
  }
  
  #contenido {
    margin: 1%;
    margin-bottom: 0;
    background-color: #bf0f1e;
    height: 50vh; 
    width: 98%;
    border-top-left-radius: 3%;
    border-top-right-radius: 3%;
    border-bottom: 0%;
    overflow-y: auto;
  }
  
  .lotes {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .lote-item {
    width: 30%;
    margin: 1%;
    padding: 2vw; 
    background-color: #f2d479;
    text-align: center;
    border-radius: 1vw; 
    margin-right: 7vw;
    margin-left: 6vw;
    height: 10vh; 
    font-size: 100%;
    cursor: pointer;
  }
  .lote-item:hover {
    transform: scale(1.1);
  }
  
  .lote-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  #regresar {
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.1s;
    width: 5%;
    margin: 1%;
  }
  
  #regresar:hover {
    transform: scale(1.1);
  }
  
  #regresar img {
    width: 100%;
    height: auto;
  }
  
  #notifications {
    width: auto;
    height: 4vh; 
    display: flex;
    margin-right: 2vw;
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
  
  @media (max-width: 600px) {
  
    #t {
      font-size: 6vw;
    }
  
    .lote-item {
      width: 45%;
      margin-right: 2.5vw;
      margin-left: 2.5vw;
    }
  
    #notifications {
      margin-right: 5vw;
    }
  
    .buttons {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  