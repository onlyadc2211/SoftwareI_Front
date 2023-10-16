<template>
    <div id="container">
  
      <div id="notifications">
        <button class="notification-button">
          <img src="../images/noti.png" alt="Icono 1">
        </button>
        <button class="notification-button">
          <img src="../images/user.png" alt="Icono 2">
        </button>
      </div>
      <button id="regresar"  @click="goBack">
        <img src="../images/regresar.png" alt="">
      </button>
      <div id="title">
        <h1 id="t">Gestión de trabajadores</h1>
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
  
  #t {
    margin: 0;
  }
  
  #title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-size: 20px;
    width: 20%;
    
  
  }
  
  #regresar {
    flex: -1;
    display: flex;
    width: 5%;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    margin: 1%;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.1s;
  }
  
  #regresar:hover {
    transform: scale(1.1);
  }
  
  #regresar img {
    width: 100%;
    height: auto;
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
  
 

  #notifications {
    width: auto;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 10px;
    display: flex;
    margin-right: 30px;
  }
  
  .notification-button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-right: 10px;
    transition: transform 0.3s;
  }
  
  .notification-button:hover {
    transform: scale(1.1);
  }
  
  .notification-button img {
    width: 40px;
    height: 40px;
  }
  </style>
    