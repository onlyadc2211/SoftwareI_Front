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
          <h1 id="t">Trabajadores</h1>
          <div id="contenido">
              <div class="trabajadores">

                <table id="table">
                  <thead>
                    <tr>
                      <th class="tableTitle">Nombre trabajador</th>
                      <th class="tableTitle">Telefono</th>
                      <th class="tableTitle">Lotes asignados</th>
                    </tr>
                  </thead>
                  <tbody>
  
                    <tr v-for="worker in empleados" :key="worker.ID_LOTE">
                      <td>{{ worker.personas.NOMBRE_PERSONA }} {{ worker.personas.APELLIDO_PERSONA }}</td>
                      <td>{{worker.personas.TELEFONO_PERSONA}}</td>
                      <td>{{worker.ID_LOTE}}</td>
                    </tr>
        
                  </tbody>
                </table>

              </div>
              <div class="botones">
                  <button class="btnLotes" @click="addLot">Agregar</button>
                  <button class="btnLotes">Modificar</button>
                  <button class="btnLotes" @click="deletePopup">Eliminar</button>
              </div>
          </div>
      </div>


  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
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

const empleados = ref([]);
const fetchEmpleados = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/userlotes`);
    if (response.ok) {
      const data = await response.json();
      empleados.value = data;
    } else {
      console.error('Error al obtener trabajadores.');
    }
  } catch (error) {
    console.error('Error al obtener trabajadores', error);
  }
};


onMounted(() => {

  fetchEmpleados();
});
</script>
  
<style scoped>


.trabajadores {

  width: 96%;
  height: 75%;
  background-color: #fed1b2;
  margin: 2%;
  margin-bottom: 0%;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  overflow-y: auto;
}

#table{
  margin: 1%;
  
  width: 98%;  
}
#plagas {
  height: 46%;
  width: 98%;
  margin: 1%;
  float: inline-start;
  border-collapse: collapse;
}
#table td {
  text-align: center; /* Alinea el texto en el centro de las celdas de datos */
  padding: 90px; /* Agrega un espacio interno */
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
  border-radius: 20px;
  position: relative;
  flex-direction: column;
}

#t {
  margin-left: 1%;
  margin-bottom: 0%;
  margin-top: 0%;
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
border-radius:20px;

}
.btnLotes:hover {
transform: scale(1.1);
}
</style>
  