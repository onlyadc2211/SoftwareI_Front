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
                <button class="notification-button"  @click="goHome">
                    <img src="../images/home.png" alt="Icono 1">
                  </button>
                  <button class="notification-button">
                    <img src="../images/noti.png" alt="Icono 2">
                  </button>
                  <button class="notification-button">
                    <img src="../images/user.png" alt="Icono 3">
                  </button>
            </div>
        </div>

        <div id="title">
            <h1 id="t">Plagas</h1>
            <div id="contenido">
                <div class="plagas">
                    <div class="pests">
                        <div v-for="index in 20" :key="index" class="pests-item">
                            <div class="pests-content">
                                <h1>Nombre Plaga{{ index }}</h1>
                                <p>Descripcion</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="botones">
                    <button class="btnLotes" @click="addLot">Agregar plaga</button>
                    <button class="btnLotes">Modificar plaga</button>
                    <button class="btnLotes" @click="deletePopup">Eliminar plaga</button>
                </div>
            </div>
        </div>


    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
const router = useRouter();

const goBack = () => {
  router.push("/main/cropManagement");
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
const goHome = () => {
  router.push('/main');
}


</script>
    
<style scoped>
.pests {
    display: flex;
    flex-direction: row;
    width: 100%;


}

.pests-item {

    margin: 1%;
    padding: 9vw;
    background-color: #febd96;
    text-align: center;
    border-radius: 1vw;
    height: 4vh;
    font-size: 80%;
    cursor: pointer;
}

.pests-item:hover {
    transform: scale(1.1);
}

.pests-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.plagas {

    width: 96%;
    height: 75%;

    margin: 2%;
    margin-bottom: 0%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}

.botones {
    width: 96%;
    height: 15%;
    background-color:  #ffa364;
    margin: 0%;
    margin-left: 2%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#container {
    display: flex;
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    width: 90%;
    height: 90vh;
    margin: auto;
    margin-top: 3%;
    background-color:  #ffa364;
    border-radius: 2%;
    position: relative;
    flex-direction: column;
}

#t {
    margin-left: 1%;
    margin-bottom: 0%;
    margin-top: 0%;
}

#formulario {
    height: 90%;
    width: 70%;
    margin: 2%;
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

#contenido {
    margin: 1%;
    margin-bottom: 0;
    background-color: #ffa364;
    height: 84%;
    width: 98%;
    border-radius: 3%;
    border-bottom: 0%;
    display: flex;
    flex-direction: column;
}

#title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    background-color:#fee1ca;
    height: 100%;
    border-bottom-left-radius: 2%;
    border-bottom-right-radius: 2%;
}
.btnLotes {
  margin: 3%;
  height: 70%;
  width: 20%;
  background-color: #792f00;
  font-size: 30px;
  color: white;
  cursor: pointer;
  border-radius: 12%;

}
.btnLotes:hover {
  transform: scale(1.1);
}
</style>
    