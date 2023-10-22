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
            <h1 id="t">Agregar lote</h1>
            <div id="contenido">
                <div id="formulario">
                    <form @submit.prevent="submitForm" class="form">
                        <div class="form-group">
                            <label for="idLote">Id Lote</label>
                            <input type="number" id="totalPlantas" v-model="id_lote" required class="input-field" />
                        </div>
                        <div class="form-group">
                            <label for="nombreLote">Nombre del lote:</label>
                            <input type="text" id="nombreLote" v-model="nombreLote" required class="input-field" />
                        </div>
                        <div class="form-group">
                            <label for="totalPlantas">Total de plantas:</label>
                            <input type="number" id="totalPlantas" v-model="totalPlantas" required class="input-field" />
                        </div>
                        <div id="errorCorrection"></div>
                        <button type="submit" class="submit-button">Agregar</button>
                    </form>
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
const nombreLote = ref('');
const id_lote = ref('');
const totalPlantas = ref(0);
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
    try {
        const nuevoLote = {
            ID_LOTE: parseInt(id_lote.value),
            TOTAL_PLANTAS: parseInt(totalPlantas.value),
            NOMBRE_LOTES: nombreLote.value
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
.form {
    width: 90%;
    max-width: 700px;
    height: 85%;
    padding: 30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 50%;
}

.form-group label {
    text-align: left;
    display: block;
    font-size: 20px;
    font-weight: bold;
}

.input-field {
    padding: 8px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
}

.input-field:focus {
    border: 2px solid #792f00;
    outline: none;
}

.submit-button {
    background-color: #792f00;
    color: white;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 40%;
}

.submit-button:hover {
    background-color: #542200;
}

#container {
    display: flex;
    font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
    width: 90%;
    height: 90vh;
    margin: auto;
    margin-top: 3%;
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

#contenido {
    margin: 1%;
    margin-bottom: 0;
    background-color: #ffa364;
    height: 84%;
    width: 98%;
    border-radius: 3%;
    border-bottom: 0%;
    display: flex;
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
</style>
    