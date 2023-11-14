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
            <h1 id="t">Productos</h1>
            <div id="contenido">
                <div class="cosechas">
                    <div class="pests">
                        <div v-for="producto in productos" :key="producto.ID_PRODUCTO" class="crops-item"
                            @click="editProductVisible(producto)">
                            <div class="crops-content">
                                <h1>{{ producto.NOMBRE_PRODUCTO }} </h1>
                                <p>Precio: {{ producto.PRECIO_ACTUAL_PRODUCTO }} $</p>
                                <p>Estado: {{ validateStatus(producto.ESTADO_PRODUCTO) }}</p>
                                <div class="lotesAsignados">
                                    <p>Descripcion: {{ producto.DESCRIPCION_PRODUCTO }}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="botones">
                    <button class="btnLotes" @click="showAddCrop">Agregar</button>

                </div>
            </div>
        </div>

        <div v-if="isVisible" class="popup">
            <div class="popup-content">
                <h2>Añadir producto</h2>
                <div id="formulario">
                    <form @submit.prevent="submitFormAddProduct" class="formAdd">
                        <div class="form-group">
                            <label for="nombreLote">Nombre del producto:</label>
                            <input type="text" v-model="nombreProducto" required class="input-field" />
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Estado</label>
                            <select id="lote_Trabajador" v-model="estadoProducto" required class="input-field">
                                <option value="A"> Activo</option>
                                <option value="I"> Inactivo</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="nombreLote">Precio:</label>
                            <input type="number" v-model="precioProducto" required class="input-field" />
                        </div>
                        <div class="form-group">
                            <label for="nombreLote">Descripcion:</label>
                            <textarea rows="2" cols="50" v-model="descripcionProducto" required class="input-field" />
                        </div>

                        <div class="formButtons">
                            <button type="submit2" @click="submitFormAddProduct" class="submit-button">Agregar</button>
                            <button @click="hideAddProduct" class="submit-button">Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isVisibleEditProduct" class="popup2">
            <div class="popup-content3">
                <button class="deleteBtn" @click="submitFormDeleteProduct">
                    <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                </button>
                <h2>{{ selectedProduct.NOMBRE_PRODUCTO }}</h2>
                <h3 class="caract">Precio: {{ selectedProduct.PRECIO_ACTUAL_PRODUCTO }} $</h3>
                <h3 class="caract">Estado: {{ validateStatus(selectedProduct.ESTADO_PRODUCTO) }}</h3>
                <h3 class="desc">Descripcion: {{ selectedProduct.DESCRIPCION_PRODUCTO }}</h3>
                <div class="formulario2">
                    <form @submit.prevent="submitFormEditName" class="form2">
                        <div class="form-group2">
                            <label for="nombreLote">Nuevo nombre:</label>
                            <input type="text" v-model="nombreProductoUpdate" required class="input-field2" />
                        </div>
                        <div class="formButtons2">
                            <button type="submitEditName" @click="submitFormEditName"
                                class="submit-button2">Cambiar</button>
                        </div>
                    </form>
                </div>
                <div class="formulario2">
                    <form @submit.prevent="submitFormEditStatus" class="form2">
                        <div class="form-group2">
                            <label for="estadoProductoUpdate">Nuevo estado:</label>
                            <select id="tipoPlanta" v-model="estadoProductoUpdate" required class="input-field2">
                                <option value="A">Activo</option>
                                <option value="I">Inactivo</option>
                            </select>
                        </div>
                        <div class="formButtons2">
                            <button type="submitEditStatus" @click="submitFormEditStatus"
                                class="submit-button2">Cambiar</button>
                        </div>
                    </form>
                </div>
                <div class="formulario2">
                    <form @submit.prevent="submitFormEditStatus" class="form2">
                        <div class="form-group2">
                            <label for="precioProductoUpdate">Nuevo precio:</label>
                            <input type="number" v-model="precioProductoUpdate" required class="input-field2" />
                        </div>
                        <div class="formButtons2">
                            <button type="submitEditStatus" @click="submitFormEditValue"
                                class="submit-button2">Cambiar</button>
                        </div>
                    </form>
                </div>
                <div class="formulario2Desc">
                    <form @submit.prevent="submitFormEdit" class="form2">
                        <div class="form-group2">
                            <label for="nombreLote">Nueva descripción:</label>
                            <textarea cols="50" rows="1" v-model="descripcionProductoUpdate" required
                                class="input-field2"></textarea>
                        </div>
                        <div class="formButtons2">
                            <button type="submitEditDescription" @click="submitFormEditDescription"
                                class="submit-button2">Cambiar</button>
                        </div>
                    </form>
                </div>
                <div class="formButtons2">
                    <button @click="hideEditProduct" class="submit-button2">Cerrar</button>
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
</template>
    
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const router = useRouter();
const isVisible = ref(false);
const isVisibleEditProduct = ref(false);
const selectedProduct = ref(null);
const message = ref('');
const validate = ref(false);
const isAlertVisible = ref(false);
const messageDelete = ("¿Seguro que deseas eliminar el producto?");
const switchButton = ref(false);
const goHome = () => {
  router.push('/main');
}

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
const validateStatus = (status) => {
    if (status === "I") {
        return "Inactivo"
    } else {
        return "Activo"
    }
}
const editProductVisible = (producto) => {
    isVisibleEditProduct.value = true;
    selectedProduct.value = producto;
}
const hideEditProduct = () => {
    isVisibleEditProduct.value = false;
}

const showAddCrop = () => {
    isVisible.value = true;
}
const hideAddProduct = () => {
    isVisible.value = false;
}
const nombreProducto = ref('');
const precioProducto = ref('');
const estadoProducto = ref('');
const descripcionProducto = ref('');
const config = {
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
};
const submitFormAddProduct = async () => {
    try {
        const nuevoProducto = {
            NOMBRE_PRODUCTO: nombreProducto.value,
            PRECIO_ACTUAL_PRODUCTO: precioProducto.value,
            ESTADO_PRODUCTO: estadoProducto.value,
            DESCRIPCION_PRODUCTO: descripcionProducto.value
        };

        const response = await axios.post('http://localhost:3000/api/productos', nuevoProducto,config);

        if (response.status === 200) {
            console.log('producto agregado con éxito');
            alert("producto agregado con éxito")
            nombreProducto.value = '';
            precioProducto.value = '';
            estadoProducto.value = '';
            descripcionProducto.value = '';
            hideAddProduct();
            location.reload();

        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);

    }
};
const nombreProductoUpdate = ref('');
const submitFormEditName = async () => {
    try {
        const nameUpdate = {
            NOMBRE_PRODUCTO: nombreProductoUpdate.value,
            PRECIO_ACTUAL_PRODUCTO: selectedProduct.value.PRECIO_ACTUAL_PRODUCTO,
            ESTADO_PRODUCTO: selectedProduct.value.ESTADO_PRODUCTO,
            DESCRIPCION_PRODUCTO: selectedProduct.value.DESCRIPCION_PRODUCTO
        };
        const response = await axios.put(`http://localhost:3000/api/productos/${selectedProduct.value.ID_PRODUCTO}`, nameUpdate,config);
        if (response.status === 200) {
            console.log('Producto editado con éxito');
            alert("Producto editado con éxito")
            nombreProductoUpdate.value = '';
            hideEditProduct();
            location.reload();
        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);


    }
};
const estadoProductoUpdate = ref('');
const submitFormEditStatus = async () => {
    try {
        const nameUpdate = {
            NOMBRE_PRODUCTO: selectedProduct.value.NOMBRE_PRODUCTO,
            PRECIO_ACTUAL_PRODUCTO: selectedProduct.value.PRECIO_ACTUAL_PRODUCTO,
            ESTADO_PRODUCTO: estadoProductoUpdate.value,
            DESCRIPCION_PRODUCTO: selectedProduct.value.DESCRIPCION_PRODUCTO
        };
        const response = await axios.put(`http://localhost:3000/api/productos/${selectedProduct.value.ID_PRODUCTO}`, nameUpdate,config);
        if (response.status === 200) {
            console.log('Producto editado con éxito');
            alert("Producto editado con éxito")
            estadoProductoUpdate.value = '';
            hideEditProduct();
            location.reload();
        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);


    }
};
const precioProductoUpdate = ref('');
const submitFormEditValue = async () => {
    try {
        const nameUpdate = {
            NOMBRE_PRODUCTO: selectedProduct.value.NOMBRE_PRODUCTO,
            PRECIO_ACTUAL_PRODUCTO: parseInt(precioProductoUpdate.value),
            ESTADO_PRODUCTO: selectedProduct.value.ESTADO_PRODUCTO,
            DESCRIPCION_PRODUCTO: selectedProduct.value.DESCRIPCION_PRODUCTO
        };
        const response = await axios.put(`http://localhost:3000/api/productos/${selectedProduct.value.ID_PRODUCTO}`, nameUpdate,config);
        if (response.status === 200) {
            console.log('Producto editado con éxito');
            alert("Producto editado con éxito")
            estadoProductoUpdate.value = '';
            hideEditProduct();
            location.reload();
        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);


    }
};
const descripcionProductoUpdate = ref('');
const submitFormEditDescription = async () => {
    try {
        const nameUpdate = {
            NOMBRE_PRODUCTO: selectedProduct.value.NOMBRE_PRODUCTO,
            PRECIO_ACTUAL_PRODUCTO: selectedProduct.value.PRECIO_ACTUAL_PRODUCTO,
            ESTADO_PRODUCTO: selectedProduct.value.ESTADO_PRODUCTO,
            DESCRIPCION_PRODUCTO: descripcionProductoUpdate.value
        };
        const response = await axios.put(`http://localhost:3000/api/productos/${selectedProduct.value.ID_PRODUCTO}`, nameUpdate,config);
        if (response.status === 200) {
            console.log('Producto editado con éxito');
            alert("Producto editado con éxito")
            estadoProductoUpdate.value = '';
            hideEditProduct();
            location.reload();
        }
    } catch (error) {

        console.error('Error al agregar cosecha: ', error);


    }
};


const submitFormDeleteProduct = async () => {
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
            const response = await axios.delete(`http://localhost:3000/api/productos/${selectedProduct.value.ID_PRODUCTO}`,config);
            if (response.status === 200) {
                console.log('Producto eliminado con éxito');
                alert("Producto eliminado con éxito");
                estadoProductoUpdate.value = '';
                hideEditProduct();
                location.reload();
            }
        } catch (error) {
            console.error('Error al agregar cosecha: ', error);
            alert("No es posible eliminar productos vinculados en registros");
        }
    } else {
        // El usuario canceló la eliminación, no hagas nada.
    }
};

const productos = ref([])
const fetchProductos = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/productos`,config);
        if (response.ok) {
            const data = await response.json();
            productos.value = data;
        } else {
            console.error('Error al obtener productos');
        }
    } catch (error) {
        console.error('Error al obtener productos', error);
    }
};
const allCrops = ref([])
const fetchAllCrops = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/cosechas`,config);
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
    router.push("/main/salesManagement");
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
    fetchProductos();
    fetchAllCrops();
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
    width: 30%;
    height: 75%;
    border-radius: 15px;
    border: 3px solid #792f00;
}

.popup-content h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0%;
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
    margin-left: auto;
}

.deleteBtn:hover {
    transform: scale(1.1);
}

.deleteBtn img {
    width: 80%;
    height: 70%;
}

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
    align-items: center;
}

.botones button {
    margin-left: auto;
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
    height: 85%;
    border-radius: 15px;
    border: 3px solid #792f00;
    display: flex;
    flex-direction: column;
}

.popup-content3 {
    background-color: #fff;
    width: 30%;
    height: 97%;
    border-radius: 15px;
    border: 3px solid #792f00;
    display: flex;
    flex-direction: column;
    max-height: 800px;
}

.popup-content3 h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0%;
    margin-bottom: 0;
}

.caract {
    margin-left: 2%;
    margin-bottom: 0%;
    margin-top: 0%;
}

.desc {
    margin-top: 1%;
    margin-bottom: 0%;
    margin-left: 2%;


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
    width: 98%;
    height: 30%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin: 2%;


}


.form-group2 {
    display: flex;
    flex-direction: column;
    width: 99%;


}

.form-group2 select {
    padding: 3px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-top: 0%;
    width: 99%;
}

.form-group2 label {
    text-align: left;
    display: block;
    font-size: 15px;
    font-weight: bold;
    margin-top: 0%;
}

.input-field2 {
    padding: 2px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 0.2%;
    width: 95%;
}


.input-field2:focus {
    border: 2px solid #792f00;
    outline: none;
}

.formButtons2 {
    margin-top: 2%;
    width: 100%;
    height: 70%;

    display: flex;
    flex-direction: column;
}


.submit-button2:hover {
    transform: scale(1, 1);
    background-color: #542200;

}

.submit-button2 {
    background-color: #792f00;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 30%;
    height: 30px;
    margin-left: auto;
    margin-right: 2%;
}


.formulario2 {
    width: 95%;
    margin: 2%;
    display: flex;
    height: 14%;
    border: 3px solid #792f00;
    border-radius: 15px;
}

.formulario2Desc {
    width: 95%;
    margin: 2%;
    display: flex;
    height: 14%;
    border: 3px solid #792f00;
    border-radius: 15px;
}

.formAdd {
    width: 90%;
    max-width: 700px;
    height: 85%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

}

#formulario {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98%;
    margin: 2%;
}

.form-group {
    display: flex;
    flex-direction: column;
    width: 98%;

}

.form-group textarea {
    width: 90%;
}

.form-group select {
    width: 95%;
}

.form-group input {
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
    margin-bottom: 7%;
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
    height: 30px;

}</style>
    