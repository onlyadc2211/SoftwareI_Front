<template>
    <div v-if="isVisible" class="popup2">
        <div class="popup-content2">
            <h2>Añadir sector</h2>
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
                    <div class="form-group2">
                        <label for="totalPlantas">Total de plantas:</label>
                        <input type="number" id="totalPlantas" v-model="totalPlantas" required class="input-field2" />
                    </div>
                    <div id="errorCorrection2"></div>
                    <div class="formButtons2">
                        <button type="submit2" class="submit-button2">Agregar</button>
                        <button @click="hidePopup2" class="submit-button2">Cerrar</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
</template>
<script setup>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const router = useRouter();
const isVisible= ref(false);
const addSection = () => {
    isPopup2Visible.value = true;
};
const showPopup2 = (val) => {
    isVisible.value = val;
};
const hidePopup2 = () => {
    isVisible.value = false;
};
const submitForm = async () => {
    try {
        const nuevoLote = {
            ID_LOTE: parseInt(id_lote.value),
            TOTAL_PLANTAS: parseInt(totalPlantas.value),
            NOMBRE_LOTE: nombreLote.value
        };

        const response = await axios.post('http://localhost:3000/api/lotes', nuevoLote);

        if (response.status === 200) {

            console.log('Lote agregado con éxito');
            id_lote.value = 0;
            nombreLote.value = '';
            totalPlantas.value = 0;

            router.push('/main/cropManagement/lots');
        }
    } catch (error) {

        console.error('Error al agregar el lote:', error);

    }
};


</script>

<style scoped>
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
    width: 50%;
    height: 70%;
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
    height: 85%;
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
  }
  
  .input-field2:focus {
    border: 2px solid #792f00;
    outline: none;
  }
  .formButtons2{
    margin-top: 5%;
    width: 100%;
    height: 20%;
    
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
    margin-left: 5%;
    margin-right: 5%;
    height: 50%;
    
  }
</style>