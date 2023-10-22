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
      <h1 id="t">Lotes</h1>
      <div id="contenido">
        <div class="lotes">
          <div v-for="lot in lots" :key="lot.ID_LOTE" class="lote-item" @click="goToLotInfo(lot.ID_LOTE)">
            <div class="lote-content">
              <h1>Lote {{ lot.NOMBRE_LOTES }}</h1>
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
                  {{ lot.NOMBRE_LOTES }} ({{ lot.TOTAL_PLANTAS }} plantas)
                </label>
              </div>
              </li>
            </ul>
            <button @click="deletL">Eliminar</button>
            <button @click="hidePopup">Cerrar</button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="btnLotes" @click="addLot">Agregar lote</button>
        <button class="btnLotes">Agregar planta</button>
        <button class="btnLotes" @click="deletePopup">Eliminar</button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';
const router = useRouter();
const lots = ref([]);
const isPopupVisible = ref(false);
const selectedLots = ref([]);

const deletL = async () => {
  if (selectedLots.value.length === 0) {
    alert('Por favor, selecciona al menos un lote para eliminar.');
    return;
  }
  try {
    const selectedLotsArray = Array.from(selectedLots.value);

    for (const lotId of selectedLotsArray) {
      const response = await fetch(`http://localhost:3000/api/lotes/${lotId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        
      } else {
   
        console.error('Error al eliminar el lote con ID:', lotId);
    
      }
    }

 
    fetchLots();
    hidePopup();
  } catch (error) {
    console.error('Error al eliminar lotes:', error);
    alert('Ocurrió un error al eliminar los lotes. Por favor, intenta de nuevo.');
  }
};

const deletePopup = () => {
  isPopupVisible.value = true;
};
const hidePopup = () => {
  isPopupVisible.value = false;
};
const goBack = () => {
  router.go(-1);
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
  router.push('/main/cropManagement/lots/addLot')
}
const goToLotInfo = (lotId) => {
  router.push(`/main/cropManagement/lots/lotInfo/${lotId}`);
}

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
  width: 40%;
  height: 30%;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  border: 3px solid #792f00;
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
  height: 90%;
  overflow-y: auto;
  

}
.btnLotes {
  margin: 3%;
  height: 70%;
  width: 20%;
  background-color: #792f00;
  font-size: 200%;
  color: white;
  cursor: pointer;
  border-radius: 12%;

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

.btnLotes:hover {
  transform: scale(1.1);
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
</style>
  