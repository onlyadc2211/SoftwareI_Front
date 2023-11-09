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
            <img src="../images/noti.png" alt="Icono 1">
          </button>
          <button class="notification-button">
            <img src="../images/user.png" alt="Icono 2">
          </button>
        </div>
      </div>
      <div id="title">
        <h1 id="t">Lotes</h1>
        <div id="contenido">
          <div class="lotes">
            <div v-for="lot in lots" :key="lot.ID_LOTE" class="lote-item" @click="goToLotInfo(lot.ID_LOTE)">
              <div class="lote-content">
                <h1>{{ lot.NOMBRE_LOTE }}</h1>
                <p>ID: {{ lot.ID_LOTE }}</p>
                <p>N° plantas {{ lot.TOTAL_PLANTAS }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="isPopupVisible" class="popup">
            <div class="popup-content">
              <h2>Eliminar lote</h2>
              <ul>
                <li v-for="lot in lots" :key="lot.ID_LOTE">
                  <div class="deleteDiv">
                  <label>
                    <input type="checkbox" v-model="selectedLots" :value="lot.ID_LOTE">
                    {{ lot.NOMBRE_LOTE}} ({{ lot.TOTAL_PLANTAS }} plantas)
                  </label>
                </div>
                </li>
              </ul>
              <button @click="deletL">Eliminar</button>
              <button @click="hidePopup">Cerrar</button>
            </div>
          </div>
          <div v-if="isVisible" class="popup2">
            <div class="popup-content2">
                <h2>Añadir lote</h2>
                <div id="formulario2">
                    <form @submit.prevent="submitForm" class="form2">
                        <div class="form-group2">
                            <label for="idLote">Id Lote</label>
                            <input type="number" id="totalPlantas" v-model="id_lote" required class="input-field2" />
                        </div>
                        <div class="form-group2">
                            <label for="nombreLote">Nombre del lote:</label>
                            <input type="text" id="nombreLote" v-model="nombreLote" required class="input-field2" />
                        </div>
                     
                        <div id="errorCorrection2"></div>
                        <div class="formButtons2">
                            <button type="submit2" @click="submitForm" class="submit-button2">Agregar</button>
                            <button @click="hidePopup2" class="submit-button2">Cerrar</button>
                        </div>
                    </form>
    
                </div>
    
            </div>
        </div>
        </div>
        <div class="buttons">
          <button class="btnLotes" @click="addLot">Agregar lote</button>
    
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
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import axios from 'axios';
  import { ref } from 'vue';
  const router = useRouter();
  const lots = ref([]);
  const isPopupVisible = ref(false);
  const isVisible= ref(false);
  const selectedLots = ref([]);
  const nombreLote = ref('');
  const id_lote = ref('');
  const totalPlantas = ref(0);
  const message = ref('');
  const validate = ref(false);
  const isAlertVisible = ref(false);
  const messageDelete = ref("");
  const switchButton = ref(false);
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
    router.push('/main');
  }
  const hidePopup2 = () => {
      isVisible.value = false;
  };
  const deletL = async () => {
  
    if (selectedLots.value.length === 0) {
      alert('Por favor, selecciona al menos un lote para eliminar.');
      return;
    }
    messageDelete.value = "¿Seguro que deseas borrar el lote?"
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
      const selectedLotsArray = Array.from(selectedLots.value);
  
      for (const lotId of selectedLotsArray) {
        const response = await fetch(`http://localhost:3000/api/lotes/${lotId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert("Lote eliminado exitosamente")
          location.reload();
  
        } else {
     
          console.error('Error al eliminar el lote con ID:', lotId);
          alert("No es posible eliminar lotes con registros activos");
        }
      }
      fetchLots();
      hidePopup();
    } catch (error) {
      console.error('Error al eliminar lotes:', error);
        if(error.response.status === 500){
                  alert("No es posible eliminar lotes con registros activos");
              }
      alert('Ocurrió un error al eliminar los lotes. Por favor, intenta de nuevo.');
    }
  }
  };
  
  const deletePopup = () => {
    isPopupVisible.value = true;
  };
  const hidePopup = () => {
    isPopupVisible.value = false;
  };
  const goBack = () => {
    router.push('/main/cropManagementWorker');
  }
  const goWorkers = () => {
    router.push('/main/cropManagement/workers');
  }
  const goCrops = () => {
    router.push('/main/cropManagement/crops');
  }
  const goLots = () => {
    router.push('/main/cropManagement/lots');
  }
  const addLot = () => {
    isVisible.value = true;
    
  }
  const goToLotInfo = (lotId) => {
    router.push(`/main/cropManagement/lots/lotInfo/${lotId}`);
  }
  const submitForm = async () => {
      try {
          const nuevoLote = {
              ID_LOTE: parseInt(id_lote.value),
              TOTAL_PLANTAS: parseInt(0),
              NOMBRE_LOTE: nombreLote.value.toLocaleUpperCase()
          };
  
          const response = await axios.post('http://localhost:3000/api/lotes', nuevoLote);
  
          if (response.status === 200) {
  
              console.log('Lote agregado con éxito');
              id_lote.value = 0;
              nombreLote.value = '';
              totalPlantas.value = 0;
  
              isVisible.value = false;
              location.reload();
          }
          
      } catch (error) {
  
          console.error('Error al agregar el lote:', error);
  
      }
  };
  
  
  const fetchLots = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lotes'); 
      if (response.ok) {
        const data = await response.json();
        lots.value = data;
       
      }
    } catch (error) {
      console.error('Error al obtener lotes:', error);
    }
  }
  
  onMounted(() => {
    fetchLots();
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
    margin-top: 10%;
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
    width: 50%;
    height: 40%;
    display: block;
    border-radius: 5px;
    text-align: center;
    border: 3px solid #792f00;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
  .popup-content button {
    background-color: #792f00;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    width: 30%;
    margin-left: 5%;
    margin-right: 5%;
  
  }
  .deleteDiv{
    display: flex;
    height: 40%;
    width: 50%;
    overflow-y: auto;
  
  }
  
  .btnLotes {
    margin: 3%;
    height: 60%;
    width: 20%;
    background-color: #792f00;
    font-size: 200%;
    color: white;
    cursor: pointer;
    border-radius: 12%;
  
  }
  .btnLotes:hover {
    transform: scale(1.1);
  }
  
  .buttons {
    background-color: #fee1cc;
    margin: 1%;
    margin-top: 0;
    width: 98%;
    display: flex;
    justify-content: space-around;
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
    height: 15%;
  
  }
  
  
  
  #container {
    display: flex;
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    width: 90%;
    height: 90vh;
    margin: auto;
    margin-top: 2%;
    background-color: #fee1cc;
    border-radius: 3%;
    position: relative;
    flex-direction: column;
  }
  
  #header {
    display: flex;
    align-items: center;
    background-color: #fed1b2;
  }
  
  #t {
    margin: 0;
    font-size: 4vw;
    margin-left: 1%;
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
  
  #contenido {
    margin: 1%;
    margin-bottom: 0;
    background-color: #fee1cc;
    height: 45vh;
    width: 98%;
    border-radius: 3%;
    border-bottom: 0%;
    overflow-y: auto;
    border: 2px solid #792f00;
  }
  
  .lotes {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .lotes p{
    margin-bottom: 1%;
    margin-top: 1%;
  }
  .lotes h1{
    margin-bottom: 1%;
  }
  
  .lote-item {
    width: 30%;
    margin: 1%;
    padding: 2vw;
    background-color: #ffa364;
    text-align: center;
    border-radius: 1vw;
    margin-right: 7vw;
    margin-left: 6vw;
    height: 10vh;
    font-size: 100%;
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
    height: 50%;
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
    