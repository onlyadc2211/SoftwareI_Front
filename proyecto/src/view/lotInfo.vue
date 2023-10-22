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
      <h1 id="t">{{ nameLot }}</h1>
      <div id="contenido">
        <div id="cont1" class="contenedores">
          <div id="nPlantas">
            <h1>Total Plantas</h1>
            <h2> Numero de plantas {{ plantsNumber }}</h2>
          </div>
          <div id="plagas">
            <h1 id="tituloPlagas">Plagas</h1>
            <div id="historialPlagas">
              <table id="plagasTable">
                <thead>
                  <tr>
                    <th class="tableTitle">Nombre Plaga</th>
                    <th class="tableTitle">Fecha de Afectación</th>
                  </tr>
                </thead>
                <tbody>
              
                  <tr>
                    <td>Plaga 1</td>
                    <td>2023-10-21</td>
                  </tr>
                  <tr>
                    <td>Plaga 2</td>
                    <td>2023-10-22</td>
                  </tr>
                  <tr>
                    <td>Plaga 2</td>
                    <td>2023-10-22</td>
                  </tr>
                  <tr>
                    <td>Plaga 2</td>
                    <td>2023-10-22</td>
                  </tr>
                  <tr>
                    <td>Plaga 2</td>
                    <td>2023-10-22</td>
                  </tr>
                  <tr>
                    <td>Plaga 2</td>
                    <td>2023-10-22</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
       
        <div id="cont2" class="contenedores">
       
            <div id="sec">
              <div class="lotes">
                <div v-for="index in 5" :key="index" class="lote-item">
                  <div class="lote-content">
                    <h1 class="text">Sector {{ index }}</h1>
                    <p class="text">N° plantas </p>
                    <p class="text">Tipo planta</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="btns">
              <button class="btnInfo">
                Plagas
              </button>
              <button class="btnInfo">
                Cosecha
              </button>
            </div>
          
        </div>
      </div>
      

    </div>


  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted  } from 'vue';
const router = useRouter();
const nameLot = ref('Lote N*')
const plantsNumber = ref(0) 
const lotId = parseInt(router.currentRoute.value.params.id);


const getLotInfo = async () => {
  try {
    console.log(lotId)
    const response = await fetch(`http://localhost:3000/api/lotes/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      nameLot.value = data.NOMBRE_LOTES;
      plantsNumber.value = data.TOTAL_PLANTAS;
    } else {
    
      console.error('Error al obtener información del lote con ID:', lotId);
    }
  } catch (error) {
    
    console.error('Error al obtener información del lote:', error);
  }
};
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
onMounted(() => {
  getLotInfo();
});
</script>
  
<style scoped>
#contenido {
  margin: 1%;
  margin-bottom: 0;
  background-color: #ffa364;
  height: 85%;
  width: 98%;
  border-radius: 3%;
  border-bottom: 0%;
  
}
#tituloPlagas{
  margin: 0%;
  margin-bottom: 1%;
}
#plagasTable th {
  padding-right: 50px; 
}
#cont1{
  height: 95%;
  margin: 1%;
  width: 48%;
  float: left;
  
}
#cont2{
  height: 95%;
  width: 48%;
  float: right;
}
#plagas{
  height: 46%;
  width: 98%;
  margin: 1%;
  float: inline-start;
  border: 2px solid #792f00; 
  border-radius: 3%;
}
#nPlantas{
  height: 35%;
  width: 98%;
  margin: 1%;
  float: inline-start;
}

#plagas{
  height: 46%;
  width: 98%;
  margin: 1%;
  float: inline-start;
}
#historialPlagas{
  height: 62%;
  width: 98%;
  margin: 1%;
  float: inline-start;
  overflow-y: auto;
}

#sec{
  height: 75%;
  width: 96%;
  margin: 2%;
  border: 2px solid #792f00; 
  overflow-y: auto;
  border-radius: 3%;
}

#btns{
  background-color: #ffa364;
  width: 98%;
  height: 20%;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lotes {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
}

.lote-item {
  width: 80%;
  margin: 1%;
  padding: 2vw;
  background-color: #ffa364;
  text-align: center;
  border-radius: 1vw;
  margin-right: 7vw;
  margin-left: 6vw;
  height: 10vh;
  font-size: 80%;
  cursor: pointer;
}

.lote-item:hover {
  transform: scale(1.1);
}

.lote-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.text{
  margin: 0%;
}

.btnInfo{
  height: 70%;
  width: 40%;
  margin: 2%;
  background-color: #792f00;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.btnInfo:hover {
  transform: scale(1.1);
}

#container {
  display: flex;
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  width: 90%;
  height: 80vh;
  margin: auto;
  margin-top: 2%;
  background-color: beige;
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



#title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: #fee1cc;
  height: 100%;
  border-bottom-left-radius: 2%;
  border-bottom-right-radius: 2%;
}
</style>
  