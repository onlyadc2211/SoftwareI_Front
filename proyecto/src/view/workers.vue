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
            <div v-if="isVisible" class="popup">
              <div class="popup-content">
                <h2>Trabajador</h2>
                <div id="formulario">
                  <form @submit.prevent="submitForm2" class="form">
    
                    <div class="form-group">
                      <label for="lote_Trabajador">Trabajador</label>
                      <select id="lote_Trabajador" v-model="id_trabajador_asig" required class="input-field">
                        <option v-for="trabajador in trabajadores" :value="trabajador.ID_PERSONA">
                          {{ trabajador.NOMBRE_PERSONA }} {{ trabajador.APELLIDO_PERSONA }}
                        </option>
                      
                      
    
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="lote_Trabajador">Lote</label>
                      <select id="lote_Trabajador" v-model="id_lote_asig" required class="input-field">
                        <option v-for="lote in lotes" :value="lote.ID_LOTE">
                          {{ lote.NOMBRE_LOTE }} 
                        </option>
                      
    
                      </select>
                    </div>
                    <div id="errorCorrection"></div>
                    <div class="formButtons">
                      <button type="submit" class="submit-button" @click="asignarLote">Agregar</button>
                      <button @click="hidePopup2" class="submit-button">Cerrar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
              <div class="trabajadores">

                <table id="table">
                  <thead>
                    <tr>
                      <th class="tableTitle">Nombre trabajador</th>
                      <th class="tableTitle">Telefono</th>
                      <th class="tableTitle">Lotes asignados</th>
                      <th class="tableTitle">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
  
                    <tr v-for="worker in empleados" :key="worker.ID_LOTE">
                      <td>{{ worker.personas.NOMBRE_PERSONA }} {{ worker.personas.APELLIDO_PERSONA }}</td>
                      <td>{{worker.personas.TELEFONO_PERSONA}}</td>
                      <td>{{worker.ID_LOTE}}</td>
                      <td>{{worker.ESTADO_ASIGNACION}}</td>
                    </tr>
        
                  </tbody>
                </table>

              </div>
              <div class="botones">
                  <button class="btnLotes" @click="addWorker">Agregar</button>
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
const isVisible = ref('');
const trabajadores = ref([]);
const lotes = ref([]);
const id_trabajador_asig =ref(0)
const id_lote_asig = ref(0)

const addWorker = () => {
  isVisible.value = true;
};
const hidePopup2 = () => {
  isVisible.value = false;
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
const asignarLote = async () => {
  try {
    const nuevaAsignacion = {
      ID_LOTE: parseInt(id_lote_asig.value),
      ID_PERSONA: parseInt(id_trabajador_asig.value),
      FECHA_ASIGNACION: new Date(),
      ESTADO_ASIGNACION: "A",

    };
    console.log(new Date())
    const response = await axios.post('http://localhost:3000/api/userLotes', nuevaAsignacion);

    if (response.status === 200) {
      alert("Asignacion exitosa");
      id_lote_asig.value = 0;
      id_trabajador_asig.value = 0;
      hidePopup2()
      onMounted()
    }
  } catch (error) {

    console.error('Error al agregar Sector:', error);

  }
};

const obtenerLotes =async ()=>{
  try {
    const response = await fetch(`http://localhost:3000/api/lotes`);
    if (response.ok) {
      const data = await response.json();
      lotes.value = data;
    } else {
      console.error('Error al obtener lotes.');
    }
  } catch (error) {
    console.error('Error al obtener lotes', error);
  }
};
const obtenerTrabajadores =async ()=>{
  try {
    const response = await fetch(`http://localhost:3000/api/person`);
    if (response.ok) {
      const data = await response.json();
      trabajadores.value = data;
    } else {
      console.error('Error al obtener trabajadores.');
    }
  } catch (error) {
    console.error('Error al obtener trabajadores', error);
  }
};

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
  obtenerTrabajadores();
  obtenerLotes();
});
</script>
  
<style scoped>


.trabajadores {

  width: 96%;
  max-height: 75%;
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
  text-align: center; 
  padding: 90px; 
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
  height: 80vh;
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
  height: 60%;
  border-radius: 15px;
  border: 3px solid #792f00;
  
}

.popup-content h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0%;
}
form {
  width: 90%;
  max-width: 700px;
  height: 85%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
  

}

.form-group {
  display: flex;
  flex-direction: column;

  width: 90%;
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
  margin-top: 10%;
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
#formulario {

  height: 80%;
  width: 95%;
  margin: 2%;
  
}
</style>
  