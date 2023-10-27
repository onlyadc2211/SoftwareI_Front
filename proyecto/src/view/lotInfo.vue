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
        <div v-if="isPopupVisible" class="popup">
          <div class="popup-content">
            <h2>Añadir sector</h2>
            <div id="formulario">
              <form @submit.prevent="submitForm" class="form">
                <div class="form-group">
                  <label for="idSec">Id sector</label>
                  <input type="number" id="totalPlantas" v-model="id_sec" required class="input-field" />
                </div>
                <div class="form-group">
                  <label for="tipoPlanta">Tipo planta</label>
                  <select id="tipoPlanta" v-model="id_plant" required class="input-field">
                    <option value="1">cafe 1</option>
                    <option value="2">cafe 2</option>
                    <option value="3">cafe 3</option>

                  </select>
                </div>
                <div class="form-group">
                  <label for="totalPlantas">Total de plantas:</label>
                  <input type="number" id="totalPlantas" v-model="nPlants" required class="input-field" />
                </div>
                <div id="errorCorrection"></div>
                <div class="formButtons">
                  <button type="submit" class="submit-button">Agregar</button>
                  <button @click="hidePopup" class="submit-button">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div v-if="isVisible" class="popup">
          <div class="popup-content">
            <h2>Añadir plaga</h2>
            <div id="formulario">
              <form @submit.prevent="submitForm2" class="form">

                <div class="form-group">
                  <label for="tipoPlaga">Tipo plaga</label>
                  <select id="tipoPlaga" v-model="id_plaga" required class="input-field">
                    <option value="1">Broca de cafe</option>
                    <option value="2">Roya de cafeto</option>
                    <option value="3">Cortadores</option>
                    <option value="4">Palomillas</option>

                  </select>
                </div>
                <div class="form-group">
                  <label for="fechaAfectacion">Fecha de afectación:</label>
                  <input type="date" id="fechaAfectacion" v-model="fechaAfec" required class="input-field" />
                </div>
                <div id="errorCorrection"></div>
                <div class="formButtons">
                  <button type="submit" class="submit-button">Agregar</button>
                  <button @click="hidePopup2" class="submit-button">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="cont1" class="contenedores">
          <div id="nPlantas">
            <h1>Total Plantas: {{ plantsNumber }}</h1>

            <div class="navegateButtons">
              <button @click="sPests">Plagas</button>
              <button>Cosechas</button>
              <button @click="sWorkers">Trabajadores</button>
            </div>
          </div>
          <div id="plagas">
            <div id="hPlagas" v-if="showPests">
              <h1 id="tituloPlagas">Plagas</h1>
              <div id="historialPlagas">
                <table id="plagasTable">
                  <thead>
                    <tr>
                      <th class="tableTitle">Nombre Plaga</th>
                      <th class="tableTitle">Fecha de Afectación</th>
                      <th class="tableTitle">Estado</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="plaga in historialPlagas" :key="plaga.ID_PLAGA">
                      <td>{{ plaga.plagas.NOMBRE_PLAGA }}</td>
                      <td>{{ formatearFecha(plaga.FECHA_AFECTACION) }}</td>
                      <td>{{plaga.ESTADO_PLAGA}}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="showWorkers" id="divTrabajadores">
              <h1 id="tituloPlagas">Trabajadores</h1>
              <div id="historialTrabajadores">
                <table id="workersTable">
                  <thead>
                    <tr>
                      <th class="tableTitle">Trabajador</th>
                      <th class="tableTitle">Fecha_asignacion</th>
                      <th class="tableTitle">Estado</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="trabajador in historialTrabajadores" :key="trabajador.ID_PERSONA">
                      <td>{{ trabajador.personas.NOMBRE_PERSONA }} {{ trabajador.personas.APELLIDO_PERSONA}}</td>
                      <td>{{ formatearFecha(trabajador.FECHA_ASIGNACION) }}</td>
                      <td>{{ trabajador.ESTADO_ASIGNACION }}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div id="cont2" class="contenedores">

          <div id="sec">
            <div class="lotes">
              <div v-for="sector in sectors" :key="sector.ID_SECTOR" class="lote-item">
                <div class="lote-content">
                  <h1 class="text">Sector {{ sector.ID_SECTOR }}</h1>
                  <p class="text">N° plantas {{ sector.NUMERO_PLANTAS }}</p>
                  <p class="text"> {{ sector.tipo_plantas.NOMBRE_PLANTA }}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="btns">
            <button class="btnInfo" @click="addPests">
              Plagas
            </button>
            <button class="btnInfo">
              Cosecha
            </button>
            <button class="btnInfo" @click="addSection">
              Añadir seccion
            </button>
          </div>

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
const nameLot = ref('')
const plantsNumber = ref(0)
const lotId = parseInt(router.currentRoute.value.params.id);
const sectors = ref([])
const isPopupVisible = ref(false);
const id_sec = ref()
const id_plant = ref('')
const nPlants = ref('')
const isVisible = ref('')
const fechaAfec = ref('')
const id_plaga = ref('')
const showWorkers = ref(false)
const showPests = ref(true)

const formatearFecha= (fechaISO)=> {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const fechaFormateada = new Date(fechaISO).toLocaleDateString(undefined, options);
  return fechaFormateada;
}
const sWorkers = () => {
  showWorkers.value = true
  showPests.value = false
}
const sPests = () => {
  showWorkers.value = false
  showPests.value = true

}

const addSection = () => {
  isPopupVisible.value = true;
};
const addPests = () => {
  isVisible.value = true;
};
const hidePopup = () => {
  isPopupVisible.value = false;
};
const hidePopup2 = () => {
  isVisible.value = false;
};
const historialPlagas = ref([]);
const historialTrabajadores = ref([]);
const fetchHistorialTrabajadores = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/userlotes/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      historialTrabajadores.value = data;
    } else {
      console.error('Error al obtener el historial de plagas.');
    }
  } catch (error) {
    console.error('Error al obtener el historial de plagas:', error);
  }
};
const fetchHistorialPlagas = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/lotes/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      historialPlagas.value = data.historial_plagas;
    } else {
      console.error('Error al obtener el historial de plagas.');
    }
  } catch (error) {
    console.error('Error al obtener el historial de plagas:', error);
  }
};
const getLotInfo = async () => {
  try {

    const response = await fetch(`http://localhost:3000/api/lotes/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      nameLot.value = data.NOMBRE_LOTE;
      plantsNumber.value = data.TOTAL_PLANTAS;
      sectors.value = data.sectores
      console.log(data)
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
const submitForm = async () => {
  console.log("planta" + id_plant.value)
  try {
    const nuevoSector = {
      ID_SECTOR: parseInt(id_sec.value),
      ID_LOTE: lotId,
      ID_TIPO_PLANTA: parseInt(id_plant.value),
      NUMERO_PLANTAS: parseInt(nPlants.value),

    };

    const response = await axios.post('http://localhost:3000/api/sectores', nuevoSector);

    if (response.status === 200) {

      console.log('Lote agregado con éxito');
      id_sec.value = 0;
      id_plant.value = '';
      nPlants.value = 0;

      hidePopup()
      onMounted()
    }
  } catch (error) {

    console.error('Error al agregar Sector:', error);

  }
};
const submitForm2 = async () => {
  try {

    const nuevaPlaga = {
      ID_LOTE: lotId,
      ID_PLAGA: parseInt(id_plaga.value),
      FECHA_AFECTACION: new Date(fechaAfec.value),

    };
    console.log("id plaga" + id_plaga.value)
    console.log(fechaAfec)

    const response = await axios.post('http://localhost:3000/api/historial/plagas', nuevaPlaga);

    if (response.status === 200) {

      console.log('Plaga agregada con éxito');
      id_sec.value = 0;
      id_plant.value = '';
      nPlants.value = 0;

      hidePopup2()
      onMounted()
    }
  } catch (error) {

    console.error('Error al agregar plaga:', error);

  }
};

onMounted(() => {
  getLotInfo();
  fetchHistorialPlagas();
  fetchHistorialTrabajadores();
});
</script>
  
<style scoped>
.navegateButtons {
  
  height: 35%;
  width: 94%;
  margin: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navegateButtons button {
  margin: 5%;
  height: 50%;
  width: 30%;
}

form {
  width: 90%;
  max-width: 700px;
  height: 85%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

}

.form-group {
  display: flex;
  flex-direction: column;

  width: 60%;
}

.form-group label {
  text-align: left;
  display: block;
  font-size: 15px;
  font-weight: bold;
}

.input-field {
  padding: 8px;
  font-size: 20px;
  border: 2px solid#792f00;
  border-radius: 20px;
  display: block;
  margin-bottom: 10%;
  width: 100%;
}

.input-field:focus {
  border: 2px solid #792f00;
  outline: none;
}

.formButtons {
  margin-top: 5%;
  width: 100%;
  height: 20%;

}


.submit-button:hover {
  background-color: #542200;
}

.submit-button {
  background-color: #792f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 30%;
  margin-left: 10%;
  margin-right: 10%;
  height: 50%;

}

.popup {
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

.popup-content {
  background-color: #fff;
  width: 30%;
  height: 65%;
  border-radius: 15px;
  border: 3px solid #792f00;
}

.popup-content h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0%;
}



#contenido {
  margin: 1%;
  margin-bottom: 0;
  background-color: #ffa364;
  height: 85%;
  width: 98%;
  border-radius: 3%;
  border-bottom: 0%;

}

#tituloPlagas {
  margin: 0%;
  margin-bottom: 1%;
}



#cont1 {
  height: 95%;
  margin: 1%;
  width: 48%;
  float: left;

}

#cont2 {
  height: 95%;
  width: 48%;
  float: right;
}

#plagas {
  height: 46%;
  width: 98%;
  margin: 1%;
  float: inline-start;
  border: 2px solid #792f00;
  border-radius: 3%;
}

#nPlantas {
  height: 43%;
  width: 98%;
  margin: 3%;
  float: inline-start;
  
}

#plagasTable th{
  text-align: center;
  padding-left: 5%;
  
}
#plagasTable tr{
cursor: pointer;

  
}
#workersTable tr{
  cursor: pointer;
  
    
  }
#plagasTable td{
  text-align: center;
  padding-left: 10%;
  
}
#workersTable th{
  text-align: center;
  padding: 10px 20px;
  
}
#workersTable td{
  text-align: center;
  padding-left: 3%;
  
}


#historialPlagas {
  overflow-y: auto;
  max-height: 18vh;
  width: 98%;
  margin: 1%;
  float: inline-start;
  
}
#historialTrabajadores{
  overflow-y: auto;
  max-height: 18vh;
  width: 98%;
  margin: 1%;
  float: inline-start;
  
}

#sec {
  height: 75%;
  width: 96%;
  margin: 2%;
  border: 2px solid #792f00;
  overflow-y: auto;
  border-radius: 3%;
}

#btns {
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

.text {
  margin: 0%;
}

.btnInfo {
  height: 70%;
  width: 40%;
  margin: 2%;
  background-color: #792f00;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-radius: 20px;
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


#formulario {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 5%;
}
</style>
  