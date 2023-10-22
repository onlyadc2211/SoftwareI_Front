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
                <img src="../images/noti.png" alt="Icono 1">
              </button>
              <button class="notification-button">
                <img src="../images/user.png" alt="Icono 2">
              </button>
            </div>
          </div>

      <div id="title">
        <h1 id="t">Cosechas</h1>
      </div>
      
       
    </div>
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.go(-1);
  }
  const goWorkers = () => {
  router.push('/main/cropManagement/workers')
}
const goLots = () => {
  router.push('/main/cropManagement/lots')
}

const goCrops = () => {
  router.push('/main/cropManagement/crops');
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
    