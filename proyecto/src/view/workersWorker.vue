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
                        <button type="submit" class="submit-button" @click="asignarLote">Asignar</button>
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
    
                      <tr v-for="worker in empleados" :key="worker.ID_LOTE" >
                        <td>{{ worker.personas.NOMBRE_PERSONA }} {{ worker.personas.APELLIDO_PERSONA }}</td>
                        <td>{{worker.personas.TELEFONO_PERSONA}}</td>
                        <td>{{worker.lotes.NOMBRE_LOTE}}</td>
                        <td>{{validateStatus(worker.ESTADO_ASIGNACION)}}</td>
                      </tr>
          
                    </tbody>
                  </table>
  
                </div>
             
                <div v-if="isWorkerVisible" class="popupWorker">
                  <div class="popup-contentWorker">
                    <button class="deleteBtn" @click="removeWorker">
                      <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                    </button>
                    <h2> {{ selectedWorker.personas.NOMBRE_PERSONA }} {{ selectedWorker.personas.APELLIDO_PERSONA }} </h2>
                    <div class="sector">
                      <div class="info">
                        <h4>Telefono: {{ selectedWorker.personas.TELEFONO_PERSONA }}</h4>
                        <h4>Lote asignado: {{ selectedWorker.ID_LOTE }} </h4>
                        <h4>Estado de asignación: {{validateStatus( selectedWorker.ESTADO_ASIGNACION) }}</h4>
                        <h4>Fecha de asignación: {{formatearFecha(selectedWorker.FECHA_ASIGNACION) }}</h4>
                      </div>
                      <div class="editarWorker">
                        <h4>Cambiar estado</h4>
                        <form class="ediSecForm" @submit.prevent="editStatus">
                          <div class="editFormGroup">
                            <label for="sec">Estado: </label>
                            <select id="tipoPlanta" v-model="newStatusWorker" required class="">
                              <option value="A">Activo</option>
                              <option value="I">Inactivo</option>
                            </select>
                          </div>
                          <div class="editSecButtons">
                            <button @click="editWorker">Cambiar</button>
                            
                          </div>
                        </form>
                      </div>
                      <div class="editarWorker2">
                        <h4>Cambiar fecha de asignación</h4>
                        <form class="ediSecForm" @submit.prevent="editDate">
                          <div class="editFormGroup2">
                            <label for="sec">Fecha: </label>
                            <input type="date" v-model="newDate">
                          </div>
                          <div class="editSecButtons2">
                            <button @click="editWorker">Cambiar</button>
                          </div>
                        </form>
                      </div>
                      <div class="exitButton">
                        <button @click="hideDataWorker">Salir</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div v-if="isAlertVisible" class="myPopup">
              <div class="myPopup-content">
                  <div class="alertMessage">
                      <h3>{{ message }}</h3>
                  </div>
                  <div class="alertButtons">
                      <button @click="confirm">Si</button>
                      <button @click="closeAlert">No</button>
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
  import CropManagement from './cropManagement.vue';
  const router = useRouter();
  const isVisible = ref('');
  const trabajadores = ref([]);
  const lotes = ref([]);
  const id_trabajador_asig =ref('')
  const id_lote_asig = ref(0)
  const isWorkerVisible = ref(false);
  const selectedWorker = ref(null);
  const newStatusWorker = ref('');
  const newDate= ref(null);
  const message = ref('');
  const validate = ref(false);
  const isAlertVisible = ref(false);
  const messageDelete = ref("");
  const switchButton = ref(false);
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  };
  const openAlert = (m) => {
      isAlertVisible.value = true;
      message.value = m;
      
  }
  const closeAlert = () => {
      isAlertVisible.value = false;
      switchButton.value = true;
  
  }
  const confirm = () => {
      validate.value = true;
      switchButton.value = true;
      closeAlert();
  
  }
  const goHome = () => {
    router.push('/mainWorker');
  }
  const editStatus = async()=>{
    try {
      const id_persona = selectedWorker.value.ID_PERSONA;
      const id_lote = selectedWorker.value.ID_LOTE;
      const fechaA = selectedWorker.value.FECHA_ASIGNACION;
      const newData = {
        ID_LOTE : id_lote,
        ID_PERSONA : id_persona,
        FECHA_ASIGNACION : fechaA,
        ESTADO_ASIGNACION : newStatusWorker.value,
      }
      const response = await axios.patch(`http://localhost:3000/api/userlotes/${id_lote}/${id_persona}`,newData,config);
      if (response.status === 200) {
        console.log("Plaga borrada exitosamente");
        hideDataWorker();
        location.reload();
      } else {
        console.error('Error al actualizar');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al actualizar', error);
    }
  };
  const editDate = async()=>{
    try {
      const id_persona = selectedWorker.value.ID_PERSONA;
      const id_lote = selectedWorker.value.ID_LOTE;
      const fechaA = new Date(newDate.value);
      const status = selectedWorker.value.ESTADO_ASIGNACION;
      
      const newData = {
        ID_LOTE : id_lote,
        ID_PERSONA : id_persona,
        FECHA_ASIGNACION : fechaA,
        ESTADO_ASIGNACION : status,
      }
      const response = await axios.put(`http://localhost:3000/api/userlotes/${id_lote}/${id_persona}`,newData,config);
      if (response.status === 200) {
        alert("Fecha cambiada exitosamente");
        hideDataWorker();
        location.reload();
      } else {
        console.error('Error al actualizar');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al actualizar', error);
    }
  };
  
  const removeWorker = async()=>{
    messageDelete.value = "¿Seguro que deseas borrar el trabajador?"
    openAlert(messageDelete);
      const confirmed = await new Promise((resolve) => {
          switchButton.value = false;
          const checkInterval = setInterval(() => {
              if (switchButton.value) {
                  clearInterval(checkInterval);
                  resolve(validate.value);
              }
          }, 500);
      });
      if (confirmed) {
    try {
      const id_persona = selectedWorker.value.ID_PERSONA;
      const id_lote = selectedWorker.value.ID_LOTE;
      const response = await axios.delete(`http://localhost:3000/api/userlotes/${id_lote}/${id_persona}`,config);
      if (response.status === 200) {
        console.log("Plaga borrada exitosamente");
        alert("Trabajador eliminado exitosamente");
        hideDataWorker();
        location.reload();
      } else {
        console.error('Error al eliminar plaga');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al eliminar plaga', error);
    }
  }
  };
  
  const showWorker=(trabajador)=>{
    isWorkerVisible.value = true;
    selectedWorker.value = trabajador;
    console.log(selectedWorker.value)
  }
  const hideDataWorker=()=>{
    isWorkerVisible.value = false;
    
  }
  const validateStatus=(status)=>{
    if (status === "I") {
      return "Inactivo"
    } else {
      return "Activo"
    }
  }
  const formatearFecha = ref((fechaISO) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = new Date(fechaISO).toLocaleDateString(undefined, options);
    return fechaFormateada;
  });
  const addWorker = () => {
    isVisible.value = true;
  };
  const hidePopup2 = () => {
    isVisible.value = false;
  };
  const goBack = () => {
    router.push("/main/cropManagementWorker");
  }
  const goWorkers = () => {
    router.push('/main/cropManagementWorker/workersWorker')
  }
  const goLots = () => {
    router.push('/main/cropManagementWorker/lotsWorker')
  }
  
  const goCrops = () => {
    router.push('/main/cropManagementWorker/cropsWorker');
  }
  const asignarLote = async () => {
    try {
      const nuevaAsignacion = {
        ID_LOTE: parseInt(id_lote_asig.value),
        ID_PERSONA: id_trabajador_asig.value,
        FECHA_ASIGNACION: new Date(),
        ESTADO_ASIGNACION: "A",
  
      };
      console.log(new Date())
      const response = await axios.post('http://localhost:3000/api/userLotes', nuevaAsignacion,config);
  
      if (response.status === 200) {
        alert("Asignacion exitosa");
        id_lote_asig.value = 0;
        id_trabajador_asig.value = 0;
        hidePopup2()
        onMounted()
        location.reload();
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al agregar Sector:', error);
  
    }
  };
  
  const obtenerLotes =async ()=>{
    try {
      const response = await fetch(`http://localhost:3000/api/lotes`,config);
      if (response.ok) {
        const data = await response.json();
        lotes.value = data;
      } else {
        console.error('Error al obtener lotes.');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al obtener lotes', error);
    }
  };
  const obtenerTrabajadores =async ()=>{
    try {
      const response = await fetch(`http://localhost:3000/api/person`,config);
      if (response.ok) {
        const data = await response.json();
        trabajadores.value = data;
        
      } else {
        console.error('Error al obtener trabajadores.');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
      console.error('Error al obtener trabajadores', error);
    }
  };
  
  const empleados = ref([]);
  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/userlotes`,config);
      if (response.ok) {
        const data = await response.json();
        empleados.value = data;
        
      } else {
        console.error('Error al obtener trabajadores.');
      }
    } catch (error) {
      if (error.response.status === 401) {
          alert("No está autorizado. Por favor, inicie sesión.");
          router.push('/');
        } 
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
  .myPopup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.7);
  
  
  }
  
  .myPopup-content {
    background-color: #fff;
    width: 400px;
    height: 200px;
    border-radius: 15px;
    border: 3px solid #792f00;
  }
  
  .alertMessage {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
  }
  
  .alertButtons {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }
  
  .alertButtons button {
    background-color: #792f00;
    color: white;
    height: 45px;
    width: 90px;
    border-radius: 15px;
    margin-left: 5%;
    margin-right: 5%;
    cursor: pointer;
  }
  
  .alertButtons button:hover {
    transform: scale(1, 1);
    background-color: #542200;
  }
  .popupWorker {
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
  
  .popup-contentWorker {
    background-color: #fff;
    width: 37%;
    height: 96%;
    border-radius: 15px;
    border: 3px solid #792f00;
    display: flex;
    flex-direction: column;
  }
  
  .popup-contentWorker h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0%;
  }
  .info h4{
    margin: 2%;
  }
  
  .editarWorker {
    height: 24%;
    width: 95%;
    margin: 2%;
    border: 3px solid #792f00;
    border-radius: 20px;
  
  }
  .editarWorker h4{
    margin-bottom: 0%;
    margin-top: 1%;
    margin-left: 2%;
  }
  .deleteBtn {
    align-self: flex-end;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 2%;
    margin-bottom: 0%;
    height: 50px;
    width: 12%;
  }
  .exitButton{
    
    height: 10%;
    display: flex;
    justify-content: space-around;
  }
  .exitButton button{ 
    margin-left: auto;
    margin-right: 3%;
    width: 25%;
    height: 60%;
    border-radius: 20px;
    background-color:#792f00;
    color: #fff;
    cursor: pointer;
  }
  .exitButton button:hover {
    transform: scale(1.1);
  }
  
  .deleteBtn:hover {
    transform: scale(1.1);
  }
  
  .deleteBtn img {
    width: 80%;
    height: 70%;
  }
  .editarWorker2 {
    height: 27%;
    width: 95%;
    margin: 2%;
    border: 3px solid #792f00;
    border-radius: 20px;
  
  }
  .editarWorker2 h4{
    margin-bottom: 0%;
    margin-top: 1%;
    margin-left: 2%;
  }
  .ediSecForm {
    display: flex;
    flex-direction: column;
    margin-left: 2%;
    width: 96%;
    height: 80%;
  }
  
  .editFormGroup {
    display: flex;
    flex-direction: column;
    height: 30%;
    margin: 2%;
    margin-left: 1%;
  }
  .editFormGroup2 {
    display: flex;
    flex-direction: column;
    height: 70%;
    margin: 2%;
    margin-left: 1%;
    
  }
  .editFormGroup2 input[type="date"] {
    border-radius: 20px;
    border: 2px solid#792f00;
    height: 80%;
    margin: 2%;
  }
  
  .editFormGroup select {
    border-radius: 20px;
    border: 2px solid#792f00;
    height: 100px;
    font-size: 20px;
  }
  .editSecButtons{
    margin-top: 1%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 99%;
    margin-left: 2%;
    
  }
  .editSecButtons2{
    margin-top: 1%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 99%;
    margin-left: 2%;
    height: 33%;
    
  }
  .editSecButtons2 button {
    margin: 4%;
    margin-left: auto;
    height: 40px;
    width: 35%;
    background-color: #792f00;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .editSecButtons button {
    margin: 4%;
    margin-left: auto;
    height: 40px;
    width: 35%;
    background-color: #792f00;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .editSecButtons button:hover {
    transform: scale(1.1);
  }
  .editSecButtons2 button:hover {
    transform: scale(1.1);
  }
  tr{
    cursor: pointer;
  }
  tr:hover {
    transform: scale(1.1);
  }
  .trabajadores {
  
    width: 96%;
    max-height: 90%;
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
  margin-left: auto;
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
    height: 50%;
    border-radius: 15px;
    border: 3px solid #792f00;
    
  }
  
  .popup-content h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;
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
    margin-top: 1%;
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
    height: 35px;
  
  }
  #formulario {
  
    height: 80%;
    width: 95%;
    margin: 2%;
    
  }
  </style>
    