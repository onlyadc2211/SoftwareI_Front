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
                <button class="notification-button" @click="goHome">
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
            <h1 id="t">Personas</h1>
            <div id="contenido">
                <div v-if="isVisibleAddBill" class="popup">
                    <div class="popup-content">
                        <h2>Crear factura</h2>
                        <div id="formulario">
                            <form @submit.prevent="submitForm2" class="form">

                                <div class="form-group">
                                    <label for="venta_cliente">Venta</label>
                                    <div class="select-wrapper">
                                        <select id="venta_cliente" v-model="id_venta_factura" required class="input-field">
                                            <option v-for="venta in ventas" :value="venta.ID_VENTA">
                                                {{ formatearFecha(venta.FECHA_VENTA) }} ID: {{ venta.ID_VENTA }}
                                            </option>
                                        </select>
                                        <button class="btnAddClient" @click="addSale">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lote_Trabajador">Producto</label>
                                    <select id="venta_cliente" v-model="id_producto_factura" required class="input-field"
                                        @change="takeProduct(), changeSubValue()">
                                        <option v-for="producto in productos" :value="producto.ID_PRODUCTO">
                                            {{ producto.NOMBRE_PRODUCTO }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="lote_Trabajador">Cantidad</label>

                                    <input type="number" v-model="cantidad_producto_factura" @change="changeSubValue"
                                        required class="input-field">
                                </div>
                                <div class="form-group">
                                    <label for="lote_Trabajador">Precio Unitario</label>

                                    <textarea cols="1" rows="1" class="input-field"
                                        readonly>{{ precio_unitario_factura }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="lote_Trabajador">Subtotal</label>

                                    <textarea cols="1" rows="1" class="input-field" readonly>{{ subTotal }}</textarea>
                                </div>

                                <div class="formButtons">
                                    <button type="submit" class="submit-button" @click="crearFactura">Agregar</button>
                                    <button @click="hidePopup2" class="submit-button">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="facturas">
                    <table id="table">
                        <thead>
                            <tr>
                                <th class="tableTitle">Cédula</th>
                                <th class="tableTitle">Nombre</th>
                                <th class="tableTitle">Apellido</th>
                                <th class="tableTitle">Teléfono</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="persona in personas" :key="persona.ID_PERSONA" @click="showSale(persona)">
                                <td class="tdTableID"> {{persona.ID_PERSONA}} </td>
                                <td class="tdTable">{{ persona.NOMBRE_PERSONA}}</td>
                                <td class="tdTable">{{ persona.APELLIDO_PERSONA}}</td>
                                <td class="tdTable">{{ persona.TELEFONO_PERSONA}}</td>
                                

                            </tr>

                        </tbody>
                    </table>

                </div>
                <div class="botones">
                    <button class="btnLotes" @click="addClient">Agregar persona</button>
                </div>

            </div>
        </div>
        <div v-if="isVisibleAddSale" class="popup">
            <div class="popup-content">
                <h2>Nueva venta</h2>
                <div id="formulario">
                    <form @submit.prevent="submitFormAddBill" class="form">

                        <div class="form-group">
                            <label for="venta_cliente">Cliente</label>
                            <div class="select-wrapper">
                                <select id="venta_cliente" v-model="clienteVenta" required class="input-field">
                                    <option v-for="trabajador in trabajadores" :value="trabajador.ID_PERSONA">
                                        {{ trabajador.NOMBRE_PERSONA }} {{ trabajador.APELLIDO_PERSONA }}
                                    </option>
                                </select>
                                <button class="btnAddClient" @click="addClient">+</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Cosecha</label>
                            <select id="lote_Trabajador" v-model="cosechaVenta" required class="input-field">
                                <option v-for="cosecha in cosechas" :value="cosecha.ID_COSECHA">
                                    {{ cosecha.FECHA_COSECHA }} ID: {{ cosecha.ID_COSECHA }}
                                </option>

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Estado</label>
                            <select id="lote_Trabajador" v-model="estadoVenta" required class="input-field">
                                <option value="P"> Pendiente</option>
                                <option value="C"> Pagado</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="fechaAfectacion">Fecha de venta</label>
                            <input type="date" id="fechaAfectacion" v-model="fechaVenta" required class="input-fieldDate" />
                        </div>

                        <div class="formButtons">
                            <button type="submit" class="submit-button" @click="crearVenta">Agregar</button>
                            <button @click="hideAddSale" class="submit-button">Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isVisibleAddClient" class="popup">
            <div class="popup-content">
                <h2>Nueva persona</h2>
                <div id="formulario">
                    <form @submit.prevent="submitFormClient" class="form">
                        <div class="form-group">
                            <label for="lote_Trabajador">Numero de documento</label>

                            <input type="text" v-model="clientCedule" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Nombre</label>

                            <input type="text" v-model="clientName" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Apellido</label>

                            <input type="text" v-model="clientLastName" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Télefono</label>

                            <input type="number" v-model="clientPhone" required class="input-field">
                        </div>


                        <div class="formButtons">
                            <button type="submit" class="submit-button" @click="crearCliente">Agregar</button>
                            <button @click="addClientClose" class="submit-button">Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isBillVisible" class="popup2">
            <div class="popup-content3">
                <button class="deleteBtn" @click="submitFormDeletePerson">
                    <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                </button>
                <h2>Editar persona</h2>
                <h3 class="caract">Nombre:{{selectedPerson.NOMBRE_PERSONA}} {{ selectedPerson.APELLIDO_PERSONA }} </h3>
                <h3 class="caract">Número de identificación:{{selectedPerson.ID_PERSONA}} </h3>
                <h3 class="caract">Télefono:{{selectedPerson.TELEFONO_PERSONA}} </h3>
                
                <div class="mainSaleDiv">
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditName" class="form2">
                            <div class="form-group2">
                                <label for="venta_cliente">Cambiar nombre</label>
                                <input type="text"  required class="input-field" v-model="newNamePerson">
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditSale" @click="submitFormEditNamePerson"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditSale" class="form2">
                            <div class="form-group2">
                                <label for="venta_cliente">Cambiar apellido</label>
                                <input type="text"  required class="input-field" v-model="newLastNamePerson">
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditSale" @click="submitFormEditLastNamePerson"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditSale" class="form2">
                            <div class="form-group2">
                                <label for="venta_cliente">Cambiar télefono</label>
                                <input type="text"  required class="input-field" v-model="newCellphonePerson">
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditSale" @click="submitFormEditCellphonePerson"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="formButtons2">
                    <button @click="hideBill" class="submit-button2">Cerrar</button>
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
const isVisibleAddBill = ref('');
const trabajadores = ref([]);
const cosechas = ref([]);
const isVisibleAddClient = ref(false);
const isVisibleAddSale = ref(false);
const id_venta_factura = ref();
const precio_unitario_factura = ref();
const id_producto_factura = ref();
const cantidad_producto_factura = ref();
const productos = ref([]);
const selectedProduct = ref(null);
const subTotal = ref();
const selectedPerson = ref(null);
const isBillVisible = ref(false);
const productoFacturaUpdate = ref();
const cantidadFacturaUpdate = ref();
const message = ref('');
const switchButton = ref(false);
const validate = ref(false);
const isAlertVisible = ref(false);
const messageDelete = ("¿Seguro que deseas eliminar la factura?");
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
    router.push('/main');
}

const submitFormDeletePerson = async () => {
    openAlert("¿Seguro deseas eliminar la persona?");
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
            const response = await axios.delete(`http://localhost:3000/api/person/${selectedPerson.value.ID_PERSONA}`, config);
            if (response.status === 200) {
                console.log('Persona eliminada con éxito');
                alert("Persona eliminada con éxito");
                hideBill()
                location.reload();
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
            console.error('Error al eliminar persona', error);

            if (error.response.status === 500) {
                alert("No es posible eliminar personas con registros activos");
            }

        }
    } else {

    }
};

const newNamePerson = ref();
const submitFormEditNamePerson = async () => {
    try {
        const newData = {
            ID_PERSONA: selectedPerson.ID_PERSONA,
            NOMBRE_PERSONA: newNamePerson.value,
            APELLIDO_PERSONA: selectedPerson.value.APELLIDO_PERSONA,
            TELEFONO_PERSONA: selectedPerson.value.TELEFONO_PERSONA
        };
        const response = await axios.put(`http://localhost:3000/api/person/${selectedPerson.value.ID_PERSONA}`, newData,config);
        if (response.status === 200) {
            console.log('Persona editada con éxito');
            alert("Persona editada con éxito")
            newNamePerson.value = '';
            hideBill();
            location.reload();
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al editar Persona ', error);


    }
};
const newLastNamePerson = ref();
const submitFormEditLastNamePerson = async () => {
    try {
        const newData = {
            ID_PERSONA: selectedPerson.ID_PERSONA,
            NOMBRE_PERSONA: selectedPerson.NOMBRE_PERSONA,
            APELLIDO_PERSONA: newLastNamePerson.value,
            TELEFONO_PERSONA: selectedPerson.value.TELEFONO_PERSONA
        };
        const response = await axios.put(`http://localhost:3000/api/person/${selectedPerson.value.ID_PERSONA}`, newData,config);
        if (response.status === 200) {
            console.log('Persona editada con éxito');
            alert("Persona editada con éxito")
            newNamePerson.value = '';
            hideBill();
            location.reload();
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al editar Persona ', error);


    }
};
const newCellphonePerson = ref();
const submitFormEditCellphonePerson = async () => {
    try {
        const newData = {
            ID_PERSONA: selectedPerson.ID_PERSONA,
            NOMBRE_PERSONA: selectedPerson.NOMBRE_PERSONA,
            APELLIDO_PERSONA: selectedPerson.value.APELLIDO_PERSONA,
            TELEFONO_PERSONA: newCellphonePerson.value
        };
        const response = await axios.put(`http://localhost:3000/api/person/${selectedPerson.value.ID_PERSONA}`, newData,config);
        if (response.status === 200) {
            console.log('Persona editada con éxito');
            alert("Persona editada con éxito")
            newNamePerson.value = '';
            hideBill();
            location.reload();
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al editar Persona ', error);


    }
};
const fetchProductos = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/productos`,config);
        if (response.ok) {
            const data = await response.json();
            productos.value = data;
            
        } else {
            console.error('Error al obtener el historial de productos');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener el historial de productos', error);
    }
};

const takeProduct = () => {

    selectedProduct.value = productos.value.find(producto => producto.ID_PRODUCTO === productoFacturaUpdate.value);
    precio_unitario_factura.value = selectedProduct.value.PRECIO_ACTUAL_PRODUCTO;
    console.log(precio_unitario_factura.value)
}

const changeSubValue = () => {
    subTotal.value = selectedPerson.value.CANTIDAD_PRODUCTO * precio_unitario_factura.value
}


const changeValue = () => {
    subTotal.value = cantidadFacturaUpdate.value * selectedPerson.value.PRECIO_VENTA_UNITARIO;
    precio_unitario_factura.value = selectedPerson.value.PRECIO_VENTA_UNITARIO;
}

const crearFactura = async () => {
    try {

        const newData = {
            ID_VENTA: id_venta_factura.value,
            ID_PRODUCTO: id_producto_factura.value,
            CANTIDAD_PRODUCTO: cantidad_producto_factura.value

        }
        
        const response = await axios.post(`http://localhost:3000/api/detalle_facturas`, newData,config);
        if (response.status === 200) {
            console.log("Factura agregada correctamente");
            alert("Factura correctamente");
            hidePopup2();
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
const showSale = (b) => {
    isBillVisible.value = true;
    selectedPerson.value = b;
}
const hideBill = () => {
    isBillVisible.value = false;

}

const addClient = () => {
    isVisibleAddClient.value = true;
}
const addSale = () => {
    isVisibleAddSale.value = true;
}

const hideAddSale = () => {
    isVisibleAddSale.value = false;
}
const addClientClose = () => {
    isVisibleAddClient.value = false;
}
const fetchCosechas = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/cosechas`,config);
        if (response.ok) {
            const data = await response.json();
            cosechas.value = data;
        } else {
            console.error('Error al obtener el historial de cosechas');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener el historial de cosechas', error);
    }
};
const personas = ref([])
const fetchFacturas = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/person`,config);
        if (response.ok) {
            const data = await response.json();
            personas.value = data;
            console.log(facturas.value)
        } else {
            console.error('Error al obtener personas.');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener personas', error);
    }
};

const ventas = ref([])
const fetchVentas = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/ventas`,config);
        if (response.ok) {
            const data = await response.json();
            ventas.value = data;

        } else {
            console.error('Error al obtener ventas');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener ventas:', error);
    }
};
const clientCedule = ref('');
const clientName = ref('');
const clientLastName = ref('');
const clientPhone = ref();
const crearCliente = async () => {
    try {

        const newData = {
            ID_PERSONA: clientCedule.value,
            NOMBRE_PERSONA: clientName.value,
            APELLIDO_PERSONA: clientLastName.value,
            TELEFONO_PERSONA: clientPhone.value.toString(),
        }
        const response = await axios.post(`http://localhost:3000/api/person`, newData,config);
        if (response.status === 200) {
            console.log("Persona agregada correctamente");
            alert("Persona agregada correctamente");
            addClientClose();
            location.reload();
            addWorker();

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
const clienteVenta = ref('');
const cosechaVenta = ref();
const estadoVenta = ref('');
const fechaVenta = ref(null);
const crearVenta = async () => {
    try {

        const newData = {

            ID_PERSONA: clienteVenta.value,
            ID_COSECHA: cosechaVenta.value,
            ESTADO_VENTA: estadoVenta.value,
            FECHA_VENTA: new Date(fechaVenta.value)
        }
        console.log(newData)
        const response = await axios.post(`http://localhost:3000/api/ventas`, newData,config);
        if (response.status === 200) {
            console.log("Venta agregada correctamente");
            alert("Venta agregada correctamente");
            hidePopup2();
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



const formatearFecha = ref((fechaISO) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = new Date(fechaISO).toLocaleDateString(undefined, options);
    return fechaFormateada;
});
const addWorker = () => {
    isVisibleAddBill.value = true;
};
const hidePopup2 = () => {
    isVisibleAddBill.value = false;
};
const goBack = () => {
    router.push("/main");
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
const obtenerTrabajadores = async () => {
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

onMounted(() => {
    obtenerTrabajadores();
    fetchCosechas();
    fetchVentas();
    fetchFacturas();
    fetchProductos();
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

.popup-content3 {
    background-color: #fff;
    width: 50%;
    height: 75%;
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

.formulario2 {
    width: 90%;
    margin: 2%;
    display: flex;
    height: 85%;
    border: 3px solid #792f00;
    border-radius: 15px;
}

.formulario2T {
    width: 90%;
    margin: 2%;
    display: flex;
    height: 75%;
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

.form2 {
    width: 98%;
    height: 99%;
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

.form-group2T {
    display: flex;
    flex-direction: column;
    width: 99%;
}

.form-group2T label {
    text-align: left;
    display: block;
    font-size: 15px;
    font-weight: bold;
    margin-top: 0%;
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
    margin-top: 4%;
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
    margin-top: 0%;
    width: 100%;
    height: 70%;
    display: flex;


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

.mainSaleDiv {

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    height: 60%;
}

.select-wrapper2 {
    display: flex;
    align-items: center;
    justify-content: center;

}


.select-wrapper2 select {
    flex: 1;
    border: 2px solid #792f00;
    border-radius: 20px;
    font-size: 20px;

}

.select-wrapper2 .btnAddClient {
    background-color: #792f00;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    margin-left: 5px;
}



.select-wrapper {
    display: flex;
    align-items: center;
}

.select-wrapper select {
    flex: 1;
    border: 2px solid #792f00;
    border-radius: 20px;
    font-size: 20px;

}

.select-wrapper .btnAddClient {
    background-color: #792f00;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    margin-left: 5px;
}

#cliente-group .btnAddClient {
    background-color: transparent;
    border: none;
    color: #792f00;
    /* Color original del texto del botón */
    cursor: pointer;
    font-size: 20px;
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

.info h4 {
    margin: 2%;
}

.editarWorker {
    height: 24%;
    width: 95%;
    margin: 2%;
    border: 3px solid #792f00;
    border-radius: 20px;

}

.editarWorker h4 {
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
    height: 40px;
    width: 7%;
}

.exitButton {

    height: 10%;
    display: flex;
    justify-content: space-around;
}

.exitButton button {
    margin-left: auto;
    margin-right: 3%;
    width: 25%;
    height: 60%;
    border-radius: 20px;
    background-color: #792f00;
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

.editarWorker2 h4 {
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

.editSecButtons {
    margin-top: 1%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 99%;
    margin-left: 2%;

}

.editSecButtons2 {
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

tr {
    cursor: pointer;
}

tr:hover {
    transform: scale(1.1);
}

.facturas {

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

#table {
    width: 100%;
    border-collapse: collapse;
}

#table th,
#table td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
}

#table th {
    background-color: #ccc;
}

#table tr:nth-child(even) {
    background-color: #f2f2f2;
}

#table tr:hover {
    background-color: #ddd;
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
    height: 80vh;
    margin: auto;
    margin-top: 3%;
    background-color: #ffa364;
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
    background-color: #fee1ca;
    height: 100%;
    border-bottom-left-radius: 2%;
    border-bottom-right-radius: 2%;
}

.btnLotes {
    margin: 3%;
    height: 80%;
    width: 25%;
    background-color: #792f00;
    font-size: 30px;
    color: white;
    cursor: pointer;
    border-radius: 20px;
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
    z-index: 2;

}

.popup-content {
    background-color: #fff;
    width: 30%;
    height: 85%;
    border-radius: 15px;
    border: 3px solid #792f00;

}

.popup-content h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15%;
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

.form-group input {
    width: 85%;
}

.form-group textarea {
    width: 85%;
    resize: none;

    overflow-y: hidden;
}

.input-field {
    padding: 8px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 10%;
    width: 91%;
}

.input-fieldT {
    padding: 4px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 5%;
    width: 91%;
}

.input-fieldDate {
    padding: 8px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 10%;
    width: 85%;
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
    margin-top: 4%;

}</style>
    