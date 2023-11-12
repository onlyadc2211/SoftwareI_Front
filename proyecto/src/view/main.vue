<template>
    <div id="container">
        <div id="header">
           
            <div id="notifications">
                <button id="regresar" @click="goBack">
                    <img src="../images/regresar.png" alt="">
                  </button>
              <button class="notification-button">
                <img src="../images/noti.png" alt="Icono 1">
              </button>
              <button class="notification-button">
                <img src="../images/user.png" alt="Icono 2">
              </button>
            </div>
          </div>
        <div id="buttons">
            <button class="main-button" @click="goCropManagement">Cultivos</button>
            <button class="main-button" @click="goSales">Ventas</button>
            <button class="main-button" @click="goPerson">Personas</button>
            <button class="main-button" >
              <a href="https://docs.google.com/presentation/d/1PySS8GFeM4YobAhrFDt6Vtj042WFKyLh7-3soWytwcM/edit?usp=sharing" target="_blank" class="main-button">Ayuda</a>
            </button>
            <button class="main-button" @click="goBack">Salir</button>
        </div>
        
        <div id="logoImg">
            <img src="../images/logo.png" alt="logo">
        </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const goCropManagement = () => {
    router.push('/main/cropManagement');
}
const goSales = () => {
    router.push('/main/salesManagement');
}
const goPerson = () => {
    router.push('/main/people');
}

const goBack = () => {
  localStorage.removeItem('token');
  router.replace("/")
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
    border-radius: 4%;
    position: relative;
    z-index: 10;
}
#notifications {
  width: 100%;
  height: 60px;
  position: absolute;
  display: flex;
  background-color: #fed1b2;
  mask: radial-gradient(circle, transparent 0%, transparent 100%);
}

#buttons {
    margin: 3%;
    margin-top: 7%;
    margin-bottom: 3%;
    width: 40%;
    height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main-button {
    background-color:#792f00;
    border: none;
    cursor: pointer;
    margin-bottom: 40px;
    padding: 10px;
    color: white;
    height: 70px;
    width: 70%;
    border-radius: 20px;
}

.main-button:hover {
    transform: scale(1.1);
}

#logoImg {
    width: 100%;
    height: auto;
}

#logoImg img {
    width: 90%;
    height: 80%;
    border-radius: 10px;
    margin-top: 9%;
    margin-left: 4%;
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
#regresar {
    margin-right: auto; 
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
  height: 50px;
}

</style>
  