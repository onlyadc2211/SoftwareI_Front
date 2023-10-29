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
        <div v-if="isPopupVisible" class="popup2">
          <div class="popup-content2">
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
        <div v-if="isVisible2" class="popup3">
          <div class="popup-content3">
            <h2>Añadir cosecha</h2>
            <div id="formulario3">
              <form @submit.prevent="submitForm2" class="form3">
                <div class="form-group3">
                  <label for="idCosecha">Fecha cosecha</label>
                  <select id="idCosecha" v-model="id_cos" required class="input-field3">
                    <option v-for="cosecha in cosechas" :value="cosecha.ID_COSECHA">
                      {{ formatearFecha(cosecha.FECHA_COSECHA) }} </option>
                  </select>
                </div>
                <div class="form-group3">
                  <label for="nombreLote">Cantidad de la cosecha </label>
                  <input type="number" id="fechaAfectacion" v-model="cantidadPlantasCosecha" required
                    class="input-field3" />
                </div>

                <div id="errorCorrection3"></div>
                <div class="formButtons23">
                  <button type="submit3" @click="submitForm" class="submit-button3">Agregar</button>
                  <button @click="hideAddCrops" class="submit-button3">Cerrar</button>
                </div>
              </form>

            </div>

          </div>
        </div>

        <div id="cont1" class="contenedores">
          <div class="nPlantas">
            <h1>Total Plantas: {{ plantsNumber }}</h1>

          </div>
          <div class="navegateButtons">
            <button @click="sPests" class="nB">
              <img src="../images/plagas_btn.png" alt="Texto alternativo 1">
            </button>

            <button class="nB" @click="sCrops">
              <img src="../images/cafe_btn.png" alt="Texto alternativo 1">
            </button>
            <button @click="sWorkers" class="nB">
              <img src="../images/trabajador_btn.png" alt="Texto alternativo 1">
            </button>
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
                    <tr v-for="plaga in historialPlagas" :key="plaga.ID_PLAGA" @click="dataPests(plaga)">
                      <td>{{ plaga.plagas.NOMBRE_PLAGA }}</td>
                      <td>{{ formatearFecha(plaga.FECHA_AFECTACION) }}</td>
                      <td>{{ validateStatus(plaga.ESTADO_PLAGA)  }}</td>
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
                    <tr v-for="trabajador in historialTrabajadores" :key="trabajador.ID_PERSONA"
                      @click="dataWorker(trabajador)">
                      <td>{{ trabajador.personas.NOMBRE_PERSONA }} {{ trabajador.personas.APELLIDO_PERSONA }}</td>
                      <td>{{ formatearFecha(trabajador.FECHA_ASIGNACION) }}</td>
                      <td>{{ validateStatus(trabajador.ESTADO_ASIGNACION) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="showCrops" id="divCrops">
              <h1 id="tituloPlagas">Cosechas</h1>
              <div id="historialCosechas">
                <table id="cosechasTable">
                  <thead>
                    <tr>
                      <th class="tableTitle">Fecha cosecha</th>
                      <th class="tableTitle">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cosecha in historialCosechas" :key="cosecha.ID_COSECHA" @click="dataCrop(cosecha)">
                      <td>{{ formatearFecha(cosecha.cosechas.FECHA_COSECHA) }}</td>
                      <td>{{ cosecha.CANTIDAD }}</td>
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

                <div class="lote-content" @click="showSector(sector)">
                  <h1 class="text">Sector {{ sector.ID_SECTOR }}</h1>
                  <p class="text">N° plantas {{ sector.NUMERO_PLANTAS }}</p>
                  <p class="text"> {{ sector.tipo_plantas.NOMBRE_PLANTA }}</p>
                </div>

              </div>
              <div v-if="isSectorVisible" class="popup4">
                <div class="popup-content4">
                  <button class="deleteBtn" @click="deleteSector">
                    <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                  </button>
                  <h2>Sector {{ selectedSector.ID_SECTOR }}</h2>
                  <div class="sector">
                    <div class="info">
                      <h4>Numero de plantas {{ selectedSector.NUMERO_PLANTAS }}</h4>
                      <h4>Tipo de planta: {{ selectedSector.tipo_plantas.NOMBRE_PLANTA }}</h4>
                    </div>
                    <div class="editar">
                      <h4>Editar lote</h4>
                      <form class="ediSecForm" @submit.prevent="editSect">
                        <div class="editFormGroup">
                          <label for="sec">Tipo planta</label>
                          <select id="tipoPlanta" v-model="tPlantasUpdate" required class="">
                            <option value="1">cafe 1</option>
                            <option value="2">cafe 2</option>
                            <option value="3">cafe 3</option>

                          </select>
                        </div>
                        <div class="editFormGroup">
                          <label for="sec">Numero de plantas</label>
                          <input type="number" v-model="nPlantasUpdate">
                        </div>
                        <div class="editSecButtons">
                          <button @click="editSect">Editar</button>
                          <button @click="hideSector">Cancelar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="btns">
            <button class="btnInfo" @click="addPests">
              Plagas
            </button>
            <button class="btnInfo" @click="showAddCrops">
              Cosecha
            </button>
            <button class="btnInfo" @click="addSection">
              Añadir seccion
            </button>
          </div>
          <div v-if="isWorkerVisible" class="popupWorker">
            <div class="popup-contentWorker">
              <button class="deleteBtn" @click="removeWorker">
                <img src="../images/delete_btn.png" alt="Texto alternativo 1">
              </button>
              <h2>{{ selectedWorker.personas.NOMBRE_PERSONA }} {{ selectedWorker.personas.APELLIDO_PERSONA }} </h2>
              <div class="sector">
                <div class="info">
                  <h4>Fecha asignación: {{ formatearFecha(selectedWorker.FECHA_ASIGNACION) }}</h4>
                  <h4>Estado: {{ selectedWorker.ESTADO_ASIGNACION }}</h4>
                </div>
                <div class="editarWorker">
                  <h4>Cambiar estado</h4>
                  <form class="ediSecForm" @submit.prevent="editSect">
                    <div class="editFormGroup">
                      <label for="sec">Estado: </label>
                      <select id="tipoPlanta" v-model="newStatusWorker" required class="">
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                      </select>
                    </div>
                    <div class="editSecButtons">
                      <button @click="editWorker">Cambiar</button>
                      <button @click="hideDataWorker">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isPestsVisible" class="popupPests">
            <div class="popup-contentPests">
              <button class="deleteBtn" @click="deletePests">
                <img src="../images/delete_btn.png" alt="Texto alternativo 1">
              </button>
              <h2>Plaga: {{selectedPest.plagas.NOMBRE_PLAGA}}</h2>
              <div class="sector">
                <div class="info">
                  <h4>Fecha afectación: {{ formatearFecha(selectedPest.FECHA_AFECTACION) }}</h4>
                  <h4>Estado: {{selectedPest.ESTADO_PLAGA }}</h4>
                </div>
                <div class="editarPests">
                  <h4>Cambiar estado</h4>
                  <form class="editPestForm" @submit.prevent="editSect">
                    <div class="editFormGroup">
                      <label for="sec">Estado: </label>
                      <select id="tipoPlanta" v-model="newStatusPest" required class="">
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                      </select>
                    </div>
                    <div class="editSecButtons">
                      <button @click="editPests">Cambiar</button>
                      <button @click="dataPestsHide">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isCropVisible" class="popupPests">
            <div class="popup-contentPests">
              <button class="deleteBtn" @click="removeCrop">
                <img src="../images/delete_btn.png" alt="Texto alternativo 1">
              </button>
              <h2>Cosecha: {{formatearFecha(selectedCrop.cosechas.FECHA_COSECHA)}}</h2>
              <div class="sector">
                <div class="info">                  
                  <h4>Cantidad recolectado: {{selectedCrop.CANTIDAD}}</h4>
                </div>
                <div class="editarPests">
                  <h4>Cambiar cantidad recolectada</h4>
                  <form class="editPestForm" @submit.prevent="editCrop">
                    <div class="editFormGroup">
                      <label for="sec">Cantidad </label>
                      <input type="number" v-model="newCropValue">                      
                    </div>
                    <div class="editSecButtons">
                      <button @click="editCrop">Cambiar</button>
                      <button @click="dataCrophide">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
const nameLot = ref('');
const plantsNumber = ref(0);
const lotId = parseInt(router.currentRoute.value.params.id);
const sectors = ref([]);
const isPopupVisible = ref(false);
const id_sec = ref();
const id_plant = ref('');
const nPlants = ref('');
const isVisible = ref('');
const isVisible2 = ref('');
const fechaAfec = ref('');
const id_plaga = ref('');
const showWorkers = ref(false);
const showPests = ref(true);
const showCrops = ref(false);
const isSectorVisible = ref(false);
const selectedSector = ref(null);
const tPlantasUpdate = ref();
const nPlantasUpdate = ref();
const isWorkerVisible = ref(false);
const selectedWorker = ref(null);
const newStatusWorker = ref('');
const newStatusPest = ref('');
const isPestsVisible = ref(false);
const selectedPest = ref(null);
const selectedCrop = ref(null);
const isCropVisible = ref(false);
const newCropValue = ref('');
const validateStatus=(status)=>{
  if (status === "I") {
    return "Inactivo"
  } else {
    return "Activo"
  }
}
const dataCrop = (crop) => {
  isCropVisible.value = true;
  selectedCrop.value = crop;
  
}
const dataCrophide = () => {
  isCropVisible.value = false;
  
  
}

const dataPests = (plaga) => {
  isPestsVisible.value = true;
  selectedPest.value = plaga;
  console.log(selectedPest.value)
}
const dataPestsHide = (plaga) => {
  isPestsVisible.value = false;
}
const dataWorker = (trabajador) => {
  isWorkerVisible.value = true;
  selectedWorker.value = trabajador
}
const hideDataWorker = () => {
  isWorkerVisible.value = false;
}
const editSect = async () => {
  try {
    const sectorUpdate = {
      ID_LOTE: lotId,
      ID_TIPO_PLANTA: parseInt(tPlantasUpdate.value),
      NUMERO_PLANTAS: nPlantasUpdate.value,
    };

    const response = await axios.put(`http://localhost:3000/api/sectores/${selectedSector.value.ID_SECTOR}`, sectorUpdate);

    if (response.status === 200) {
      console.log('Sector actualizado con éxito');
      alert("Sector actualizado con éxito");
      hideSector();
      location.reload();
    } else {
      console.error('Error al actualizar sector');
    }
  } catch (error) {
    console.error('Error al actualizar', error);
  }
};
const editCrop = async () => {
  try {
    const sectorUpdate = {
      ID_LOTE: lotId,
      ID_COSECHA: parseInt(selectedCrop.value.ID_COSECHA),
      CANTIDAD: newCropValue.value,
    };

    const response = await axios.put(`http://localhost:3000/api/historial/cosechas/${lotId}/${selectedCrop.value.ID_COSECHA}`, sectorUpdate);

    if (response.status === 200) {
      console.log('Cosecha actualizada con éxito');
      alert("Cosecha actualizada con éxito");
      dataPestsHide();
      location.reload();
    } else {
      console.error('Error al actualizar');
    }
  } catch (error) {
    console.error('Error al actualizar', error);
  }
};
const removeCrop = async()=>{
  try {
    const id_crop = selectedCrop.value.ID_COSECHA;
    const id_lote = lotId
    const response = await axios.delete(`http://localhost:3000/historial/cosechas/${id_lote}/${id_crop}`);
    if (response.status === 200) {
      alert("Cosecha eliminada exitosamente");
      dataCrophide();
      location.reload();
    } else {
      console.error('Error al eliminar cosecha');
    }
  } catch (error) {
    console.error('Error al eliminar cosecha', error);
  }
};
const removeWorker = async()=>{
  try {
    const id_persona = selectedWorker.value.ID_PERSONA;
    const id_lote = selectedWorker.value.ID_LOTE;
    const response = await axios.delete(`http://localhost:3000/api/userlotes/${id_lote}/${id_persona}`);
    if (response.status === 200) {
      console.log("Plaga borrada exitosamente");
      alert("Trabajador eliminado exitosamente");
      hideDataWorker();
      location.reload();
    } else {
      console.error('Error al eliminar plaga');
    }
  } catch (error) {
    console.error('Error al eliminar plaga', error);
  }
};
const editWorker = async () => {
  try {
    const workerUpdate = {
      ID_LOTE: lotId,
      ID_PERSONA: selectedWorker.value.ID_PERSONA,
      FECHA_ASIGNACION: selectedWorker.FECHA_ASIGNACION,
      ESTADO_ASIGNACION: newStatusWorker.value,
    };

    const response = await axios.put(`http://localhost:3000/api/userlotes/${lotId}/${selectedWorker.value.ID_PERSONA}`, workerUpdate);

    if (response.status === 200) {
      console.log('Trabajador actualizado con éxito');
      hideDataWorker();
      location.reload();
    } else {
      console.error('Error al actualizar trabajador');
    }
  } catch (error) {
    console.error('Error al actualizar trabajador', error);
  }
};
const editPests = async () => {

  try {
    console.log(new Date(selectedPest.value.FECHA_AFECTACION))
    const pestId = selectedPest.value.ID_PLAGA;
    const lot = lotId;
    const fechaAfectacion = new Date(selectedPest.value.FECHA_AFECTACION);
    const newStatus = newStatusPest.value;

    const response = await axios.patch(`http://localhost:3000/api/historial/plagas/${lot}/${pestId}`,{
       FECHA_AFECTACION: fechaAfectacion, ESTADO_PLAGA: newStatus
  });

    if (response.status === 200) {
      console.log('Plaga actualizado con éxito');
      hideDataWorker();
      location.reload();
    } else {
      console.error('Error al actualizar plaga');
    }
  } catch (error) {
    console.error('Error al actualizar plaga', error);
  }
};
const deleteSector = async () => {
  try {
    console.log(selectedSector.ID_SECTOR)
    const response = await fetch(`http://localhost:3000/api/sectores/${selectedSector.value.ID_SECTOR}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log("Sector borrado exitosamente")
      hideSector();
      location.reload();
    } else {
      console.error('Error al eliminar sector');
    }
  } catch (error) {
    console.error('Error al eliminar sector', error);
  }
};
const deletePests = async () => {
  try {
    const pestId = selectedPest.value.ID_PLAGA;
    const lot = lotId;
    const fechaAfectacion = new Date(selectedPest.value.FECHA_AFECTACION);
    console.log(fechaAfectacion)
    const response = await axios.delete(`http://localhost:3000/api/historial/plagas/${lot}/${pestId}`, {
      data: { FECHA_AFECTACION : fechaAfectacion } 
    });

    if (response.status === 200) {
      console.log("Plaga borrada exitosamente");
      dataPestsHide();
      location.reload();
    } else {
      console.error('Error al eliminar plaga');
    }
  } catch (error) {
    console.error('Error al eliminar plaga', error);
  }
};



const showSector = (sector) => {
  isSectorVisible.value = true;
  selectedSector.value = sector;


}
const hideSector = () => {
  isSectorVisible.value = false;

}

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const year = fecha.getUTCFullYear();
  const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
  const day = String(fecha.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const sWorkers = () => {
  showWorkers.value = true
  showPests.value = false
  showCrops.value = false
}
const sPests = () => {
  showWorkers.value = false
  showPests.value = true
  showCrops.value = false
}
const sCrops = () => {
  showWorkers.value = false
  showPests.value = false
  showCrops.value = true

}

const showAddCrops = () => {
  isVisible2.value = true;

};
const hideAddCrops = () => {
  isVisible2.value = false;
};

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
    const response = await fetch(`http://localhost:3000/api/lotes/Spers/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      historialTrabajadores.value = data.lotes_personas;
    } else {
      console.error('Error al obtener el historial de plagas.');
    }
  } catch (error) {
    console.error('Error al obtener el historial de plagas:', error);
  }
};

const historialCosechas = ref([]);
const fetchHistorialCosechas = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/lotes/Scos/${lotId}`);
    if (response.ok) {
      const data = await response.json();
      historialCosechas.value = data.historial_cosechas;
    } else {
      console.error('Error al obtener el historial de plagas.');
    }
  } catch (error) {
    console.error('Error al obtener el historial de plagas:', error);
  }
};
const cosechas = ref([]);
const fetchCosechas = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/cosechas`);
    if (response.ok) {
      const data = await response.json();
      cosechas.value = data;
    } else {
      console.error('Error al obtener el historial de plagas.');
    }
  } catch (error) {
    console.error('Error al obtener el historial de plagas:', error);
  }
};
const fetchHistorialPlagas = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/lotes/Splag/${lotId}`);
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

    const response = await fetch(`http://localhost:3000/api/lotes/Splag/${lotId}`);
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
      location.reload();
    }
  } catch (error) {

    console.error('Error al agregar Sector:', error);

  }
};
const id_cos = ref();
const cantidadPlantasCosecha = ref();
const submitForm2 = async () => {
  try {

    const nuevaPlaga = {
      ID_LOTE: lotId,
      ID_COSECHA: parseInt(id_cos.value),
      CANTIDAD: parseInt(cantidadPlantasCosecha.value),
    };

    const response = await axios.post('http://localhost:3000/api/historial/cosechas', nuevaPlaga);

    if (response.status === 200) {
      location.reload();
      hideAddCrops()
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
  fetchHistorialCosechas();
  fetchCosechas();
});
</script>

  
<style scoped>
.popupPests {
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

.popup-contentPests {
  background-color: #fff;
  width: 30%;
  height: 60%;
  border-radius: 15px;
  border: 3px solid #792f00;
  display: flex;
  flex-direction: column;
}

.popup-contentPests h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0%;
}

.editarPests {
  height: 68%;
  width: 95%;
  margin: 2%;
  border: 3px solid #792f00;
  border-radius: 20px;

}
.editPestFormForm {
  display: flex;
  flex-direction: column;

  margin: 0%;
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
  width: 30%;
  height: 60%;
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

.editarWorker {
  height: 68%;
  width: 95%;
  margin: 2%;
  border: 3px solid #792f00;
  border-radius: 20px;

}

.popup4 {
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

.popup-content4 {
  background-color: #fff;
  width: 30%;
  height: 70%;
  border-radius: 15px;
  border: 3px solid #792f00;
  display: flex;
  flex-direction: column;
}

.popup-content4 h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0%;
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
  height: 60px;
  width: 15%;
}

.deleteBtn:hover {
  transform: scale(1.1);
}

.deleteBtn img {
  width: 80%;
  height: 70%;
}

.sector {
  height: 70%;
  width: 96%;
  margin: 2%;

}

.info {
  height: 20%;
  width: 95%;
  margin: 3%;

}

.info h4 {
  margin: 1%;
}

.ediSecForm {
  display: flex;
  flex-direction: column;

  margin: 0%;
}

.editFormGroup {
  display: flex;
  flex-direction: column;
  height: 30%;
  margin-left: 2%;
}

.editFormGroup input {
  border-radius: 20px;
  border: 2px solid#792f00;
  height: 98%;
  font-size: 20px;
  width: 105%;
}

.editFormGroup select {
  border-radius: 20px;
  border: 2px solid#792f00;
  height: 90%;
  font-size: 20px;
}

.editSecButtons button {
  margin: 4%;
  margin-left: 11%;
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

.editar {
  height: 71%;
  width: 95%;
  margin: 2%;
  border: 3px solid #792f00;
  border-radius: 20px;

}

.editar h4 {
  margin: 1%;
}

.navegateButtons {
  height: 15%;
  width: 94%;
  margin-left: 2%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

}

.nB img {
  width: 80%;
  height: 38px;
  vertical-align: middle;



}

.navegateButtons button {
  margin: 2%;
  margin-bottom: 1%;
  margin-left: 0%;
  height: 80%;
  width: 14%;
  cursor: pointer;
  background-color: transparent;
  border-radius: 6px;
}

.navegateButtons button:hover {
  transform: scale(1.1);
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

.form-group select {
  width: 160%;
}

.form-group input {
  width: 150%;
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
  height: 30px;

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
  margin-bottom: 0%;
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
  height: 63%;
  border-radius: 15px;
  border: 3px solid #792f00;
}

.popup-content2 h2 {
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
  height: 55%;
  width: 98%;
  margin: 1%;
  float: inline-start;
  border: 2px solid #792f00;
  border-radius: 3%;
}

.nPlantas {
  height: 19%;
  width: 98%;
  margin: 3%;
  float: inline-start;


}

#plagasTable th {
  text-align: center;
  padding-left: 5%;

}

#plagasTable tr {
  cursor: pointer;


}

#workersTable tr {
  cursor: pointer;


}

#plagasTable td {
  text-align: center;
  padding-left: 10%;

}

#workersTable th {
  text-align: center;
  padding: 10px 20px;

}

#workersTable td {
  text-align: center;
  padding-left: 3%;

}


#historialPlagas {
  overflow-y: auto;
  max-height: 25vh;
  width: 98%;
  margin: 1%;
  float: inline-start;

}

#historialTrabajadores {
  overflow-y: auto;
  max-height: 25vh;
  width: 98%;
  margin: 1%;
  float: inline-start;

}

#historialCosechas {
  overflow-y: auto;
  max-height: 25vh;
  width: 98%;
  margin: 1%;
  float: inline-start;


}
#historialCosechas tr{
  cursor: pointer;
}

#cosechasTable th {
  text-align: center;
  padding: 10px 20px;

}

#cosechasTable td {
  text-align: center;
  padding-left: 3%;

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
  height: 90vh;
  max-height: 80vh;
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

tr:hover {
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

.popup3 {
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

.popup-content3 {
  background-color: #fff;
  width: 30%;
  height: 50%;
  border-radius: 15px;
  border: 3px solid #792f00;
}

.popup-content3 h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form3 {
  width: 90%;
  max-width: 700px;
  height: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

}

.form-group3 {
  display: flex;
  flex-direction: column;

  width: 60%;
}

.form-group3 select {
  width: 148%;
}

.form-group3 label {
  text-align: left;
  display: block;
  font-size: 15px;
  font-weight: bold;
}

.input-field3 {
  padding: 8px;
  font-size: 20px;
  border: 2px solid#792f00;
  border-radius: 20px;
  display: block;
  margin-bottom: 10%;
  width: 140%;
}

.input-field3:focus {
  border: 2px solid #792f00;
  outline: none;
}

.formButtons3 {
  margin-top: 5%;
  width: 100%;
  height: 70%;

}


.submit-button3:hover {
  background-color: #542200;
}

.submit-button3 {
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

#formulario3 {
  margin: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  height: 75%;
  width: 90%;
}</style>
  