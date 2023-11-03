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
    <div id="title" v-if="!cargando">
      <h1 id="t">Cosechas</h1>
      <div id="contenido">
        <div class="cosechas">
          <div class="pests">
            <div v-for="cosecha in cosechasArray" :key="cosecha.ID_COSECHA" class="crops-item" @click="editCosVisible(cosecha)">
              <div class="crops-content">
                <h1>Cosecha: {{ cosecha.ID_COSECHA }}</h1>
                <p>Fecha: {{ formatearFecha(cosecha.FECHA_COSECHA) }}</p>
                <div class="lotesAsignados">
                  <ul>
                    <li v-for="lote in cosecha.lotes" :key="lote.ID_LOTE">
                      {{ lote.NOMBRE_LOTE }}  : {{ lote.CANTIDAD }} 
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="botones">
          <button class="btnLotes" @click="deleteCos">Eliminar</button>
          <button class="btnLotes" @click="showAddCrop">Agregar</button>
          
        </div>
      </div>
    </div>
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
    <div v-if="isVisibleEditcos" class="popup2">
      <div class="popup-content3">
        <h2>Editar cosecha: {{selectedcos.ID_COSECHA}}</h2>
        <h3>Fecha actual: {{formatearFecha(selectedcos.FECHA_COSECHA)}}</h3>
        <div id="formulario2">
          <form @submit.prevent="submitFormEdit" class="form2">
            <div class="form-group2">
              <label for="nombreLote">Nueva fecha:</label>
              <input type="date" id="fechaAfectacion" v-model="fechaCosechaEdit" required class="input-field2" />
            </div>
            <div id="errorCorrection2"></div>
            <div class="formButtons2">
              <button type="submit2" @click="submitFormEdit" class="submit-button2">Agregar</button>
              <button @click="editCosHide" class="submit-button2">Cerrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="isVisibleCos" class="popup2">
      <div class="popup-content2">
        <h2>Eliminar cosechas</h2>
        <div id="formulario2">
          <form @submit.prevent="submitFormDelete" class="form2">
            <div class="form-group2">
              <label for="nombreLote">Fecha:</label>
              <select id="idCosecha" v-model="id_cos" required class="input-field3">
                <option v-for="cosecha in allCrops" :value="cosecha.ID_COSECHA">
                  {{ formatearFecha(cosecha.FECHA_COSECHA) }} ID: {{ cosecha.ID_COSECHA }} </option>
              </select>
            </div>
            <div id="errorCorrection2"></div>
            <div class="formButtons2">
              <button type="submit2" @click="submitFormDelete" class="submit-button2">Eliminar</button>
              <button @click="hideDeleteCos" class="submit-button2">Cerrar</button>
            </div>
          </form>
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
const isVisible = ref(false);
const id_cosecha = ref();
const fechaCosecha = ref('');
const fechaCosechaEdit = ref('');
const cosechas = ref([]);
const cargando = ref(true);
const isVisibleCos = ref(false);
const isVisibleEditcos= ref(false);
const selectedcos = ref(null);
const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const year = fecha.getUTCFullYear();
  const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
  const day = String(fecha.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const id_cos = ref();

const editCosVisible = (cosecha)=>{
isVisibleEditcos.value = true;
selectedcos.value = cosecha;
}
const editCosHide = ()=>{
isVisibleEditcos.value = false;
}
const deleteCos = ()=>{
isVisibleCos.value = true;
}
const hideDeleteCos = ()=>{
isVisibleCos.value = false;
}
const showAddCrop = () => {
  isVisible.value = true;
}
const hideAddCrop = () => {
  isVisible.value = false;
}
const submitFormDelete = async () => {
  try {
    
    const response = await axios.delete(`http://localhost:3000/api/cosechas/${id_cos.value}`);
    if (response.status === 200) {
      console.log("Cosecha borrada exitosamente");
      alert("Cosecha eliminada exitosamente");
      hideDeleteCos()
      location.reload();
    } else {
      console.error('Error al eliminar cosecha');
      alert("No es posible eliminar cosechas con registros");
    }
  } catch (error) {
    alert("No es posible eliminar cosechas con registros");
    console.error('Error al eliminar cosecha', error);
  }
};
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
const submitFormEdit = async () => {
  try {
    const nuevaCosecha = {
      ID_COSECHA: selectedcos.value.ID_COSECHA,
      FECHA_COSECHA: new Date(fechaCosechaEdit.value),
    };

    const response = await axios.put(`http://localhost:3000/api/cosechas/${selectedcos.value.ID_COSECHA}`, nuevaCosecha);

    if (response.status === 200) {
      console.log('cosecha editada con éxito');
      alert("cosecha editada con exito")
      id_cosecha.value = 0;
      fechaCosechaEdit.value = '';
      editCosHide();
    }
  } catch (error) {

    console.error('Error al agregar cosecha: ', error);
    

  }
};
let cosechasConLotes = ref({});
let cosechasArray = ref([]);
const getCrops = () => {
  
}
const fetchCosechas = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/historial/cosechas`);
    if (response.ok) {
      const data = await response.json();
      cosechas.value = data;
      cosechasConLotes = {};
      for (const item of data) {
        const cosechaID = item.ID_COSECHA;

        if (!cosechasConLotes[cosechaID]) {
          cosechasConLotes[cosechaID] = {
            ID_COSECHA: item.cosechas.ID_COSECHA,
            FECHA_COSECHA: item.cosechas.FECHA_COSECHA,
            lotes: [],
          };
        }

        cosechasConLotes[cosechaID].lotes.push({
          ID_LOTE: item.lotes.ID_LOTE,
          NOMBRE_LOTE: item.lotes ? item.lotes.NOMBRE_LOTE : null,
          CANTIDAD: item.CANTIDAD,
        });
      }

      cosechasArray = Object.values(cosechasConLotes);
      cargando.value = false;
      console.log(cosechasArray)
    } else {
      console.error('Error al obtener el historial de cosechas');
    }
  } catch (error) {
    console.error('Error al obtener el historial de cosechas', error);
  }
};
const allCrops = ref([])
const fetchAllCrops = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/cosechas`);
    if (response.ok) {
      const data = await response.json();
      allCrops.value = data;

      
    } else {
      console.error('Error al obtener cosechas');
    }
  } catch (error) {
    console.error('Error al obtener cosechas', error);
  }
};

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
onMounted(() => {
  fetchCosechas();
  fetchAllCrops();
});



</script>
  
<style scoped>
.lotesAsignados {
  max-height: 40%;
  width: 400px;
  
  margin-bottom: 1%;
  overflow-y: auto;
}

.pests {
  display: flex;
  flex-direction: row;
  width: 100%;


}

.crops-item {
  margin: 1%;
  background-color: #febd96;
  text-align: center;
  border-radius: 1vw;
  height: 91%;
  font-size: 80%;
  cursor: pointer;
  margin-right: 2%;
 padding: 0.5%;
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
  background-color: #ffa364;
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
  background-color: #ffa364;
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
  background-color: #fee1ca;
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
  border-radius: 20px;

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
  height: 35%;
  border-radius: 15px;
  border: 3px solid #792f00;
}
.popup-content3 {
  background-color: #fff;
  width: 30%;
  height: 40%;
  border-radius: 15px;
  border: 3px solid #792f00;
}
.popup-content3 h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content3 h3 {
  margin-left: 2%;
  margin-bottom: 0%;
}

.popup-content2 h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content2 h3 {
  margin-left: 2%;
  margin-bottom: 0%;
}

.form2 {
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
.form-group2 select{
 padding: 8px;
  font-size: 20px;
  border: 2px solid#792f00;
  border-radius: 20px;
  display: block;
  margin-top: 0%;
  margin-bottom: 10%;
  width: 160%;
}

.form-group2 label {
  text-align: left;
  display: block;
  font-size: 15px;
  font-weight: bold;
  margin-top: 0%;
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

.formButtons2 {
  margin-top: 5%;
  width: 100%;
  height: 70%;

}


.submit-button2:hover {
  transform: scale(1,1);
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

#formulario2 {
  margin: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  height: 75%;
  width: 90%;
}
</style>
  