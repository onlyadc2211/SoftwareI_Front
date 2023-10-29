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
          <div id="contenido">
            <div v-if="isVisible" class="popup2">
              <div class="popup-content2">
                  <h2>Añadir cosecha</h2>
                  <div id="formulario2">
                      <form @submit.prevent="submitForm" class="form2">

                          <div class="form-group2">
                              <label for="nombreLote">Fecha:</label>                            
                              <input type="date" id="fechaAfectacion" v-model="fechaCosecha" required class="input-field2" />
                          </div>
                       
                          <div id="errorCorrection2"></div>
                          <div class="formButtons2">
                              <button type="submit2" @click="submitForm" class="submit-button2">Agregar</button>
                              <button @click="hideAddCrop" class="submit-button2">Cerrar</button>
                          </div>
                      </form>
      
                  </div>
      
              </div>
          </div>
              <div class="cosechas">
                  <div class="pests">
                      <div v-for="index in 5" :key="index" class="crops-item">
                          <div class="crops-content">
                              <h1>Cosecha{{ index }}</h1>
                              <p>Cantidad</p>
                              <p>Fecha: </p>
                              <p>Lotes</p>
                              <div class="lotesAsignados">                   
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
              <div class="botones">
                  <button class="btnLotes" @click="showAddCrop">Agregar</button>
                  <button class="btnLotes">Modificar</button>
                  <button class="btnLotes" @click="deletePopup">Eliminar</button>
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
const isVisible = ref(false);
const id_cosecha = ref();
const fechaCosecha = ref('');
const showAddCrop = ()=>{
  isVisible.value = true;
}
const hideAddCrop = ()=>{
  isVisible.value = false;
}
const submitForm = async () => {
    try {
        const nuevaCosecha = {
            FECHA_COSECHA: new Date(fechaCosecha.value),
        };

        const response = await axios.post('http://localhost:3000/api/cosechas', nuevaCosecha);

        if (response.status === 200) {
            console.log('cosecha agregada con éxito');
            id_cosecha.value = 0;
            fechaCosecha.value = '';
            isVisible.value = false;
        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);

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



</script>
  
<style scoped>

.lotesAsignados{
  height: 30%;
  width: 50%;
  background-color:aqua ;
}
.pests {
  display: flex;
  flex-direction: row;
  width: 100%;


}

.crops-item {

  margin: 1%;
  padding: 9vw;
  background-color: #febd96;
  text-align: center;
  border-radius: 1vw;
  height: 4vh;
  font-size: 80%;
  cursor: pointer;
}

.crops-item:hover {
  transform: scale(1.1);
}

.crops-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.cosechas {

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

.popup2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

}

.popup-content2 {
  background-color: #fff;
  width: 30%;
  height: 40%;
  border-radius: 15px;
  border: 3px solid #792f00;
}
.popup-content2 h2{
  display: flex;
  align-items: center;
  justify-content: center;
}
.form2{
  width: 90%;
  max-width: 700px;
  height: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

}

.form-group2 {
  display: flex;
  flex-direction: column;

  width: 60%;
}

.form-group2 label {
  text-align: left;
  display: block;
  font-size: 15px;
  font-weight: bold;
}

.input-field2 {
  padding: 8px;
  font-size: 20px;
  border: 2px solid#792f00;
  border-radius: 20px;
  display: block;
  margin-bottom: 10%;
  width: 140%;
}

.input-field2:focus {
  border: 2px solid #792f00;
  outline: none;
}
.formButtons2{
  margin-top: 5%;
  width: 100%;
  height: 70%;
  
}


.submit-button2:hover {
  background-color: #542200;
}

.submit-button2 {
  background-color: #792f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 30%;
  margin-left: 10%;
  margin-right: 10%;
  height: 30px;
  
}

#formulario2{
  margin: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  
  height: 75%;
  width: 90%;
}
</style>
  