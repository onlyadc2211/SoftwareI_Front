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
      <div id="title">
        <h1 id="t">Cultivos</h1>
      </div>
      <div id="buttons">
        <div class="btns">
          <img src="../images/planta.png" alt="" class="btn-img">
          <h2 class="btn-text">Gestionar lotes</h2>
        </div>
        <div class="btns">
          <img src="../images/trabajador.png" alt="" class="btn-img">
          <h2 class="btn-text">Gestionar trabajadores</h2>
        </div>
      </div>
    </div>
  </template>
  
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
    background-color: burlywood;
    align-self: center;
    height: 80%;
    width: 20%;
    margin: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s;
    border-radius: 20px;
  }
  .btns:hover {
    transform: scale(1.1); /* Agranda el contenedor al pasar por encima */
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
  }
  
  .notification-button img {
    width: 40px;
    height: 40px;
  }
  </style>
  