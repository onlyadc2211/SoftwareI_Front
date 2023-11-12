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
            <h1 id="t">Ventas
                <button class="editButton" @click="print">
                    <img src="../images/imprimir.png" alt="">
                  </button>
            </h1>
            
            <div id="contenido">
                <div v-if="isVisible" class="popup">
                    <div class="popup-content">
                        <h2>Nueva venta</h2>
                        <div id="formulario">
                            <form @submit.prevent="submitForm2" class="form">

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
                                    <input type="date" id="fechaAfectacion" v-model="fechaVenta" required
                                        class="input-fieldDate" />
                                </div>

                                <div class="formButtons">
                                    <button type="submit" class="submit-button" @click="crearVenta">Agregar</button>
                                    <button @click="hidePopup2" class="submit-button">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="ventas">
                    <table id="table">
                        <thead>
                            <tr>
                                <th class="tableTitle">Id</th>
                                <th class="tableTitle">Comprador</th>
                                <th class="tableTitle">Cosecha</th>
                                <th class="tableTitle">Estado
                                    <button class="bntFiltro" @click="toggleFiltro">▼</button>
                                </th>
                                <th class="tableTitle">Total</th>
                                <th class="tableTitle">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="venta in ventasFiltradas" :key="venta.ID_LOTE" @click="showSale(venta)">
                                <td class="tdTableID">{{ venta.ID_VENTA }} </td>
                                <td class="tdTable">{{ venta.personas.NOMBRE_PERSONA }} {{ venta.personas.APELLIDO_PERSONA
                                }}
                                </td>
                                <td class="tdTable">{{ formatearFecha(venta.cosechas.FECHA_COSECHA) }}</td>
                                <td class="tdTable">{{ validateStatus(venta.ESTADO_VENTA) }}</td>
                                <td class="tdTable">{{ venta.VALOR_TOTAL_VENTA ?
                                    venta.VALOR_TOTAL_VENTA.toLocaleString('es-ES') : '' }}</td>
                                <td class="tdTable">{{ formatearFecha(venta.FECHA_VENTA) }}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
                <div class="botones">
                    <button class="btnLotes" @click="addWorker">Agregar venta</button>
                </div>


            </div>
        </div>
        <div v-if="isVisibleAddClient" class="popup">
            <div class="popup-content">
                <h2>Nuevo cliente</h2>
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
        <div v-if="isSaleVisible" class="popup2">
            <div class="popup-content3">
                <button class="deleteBtn" @click="submitFormDeleteSale">
                    <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                </button>
                <h2>Editar venta</h2>
                <h3 class="caract">Comprador: {{ selectedSale.personas.NOMBRE_PERSONA }}
                    {{ selectedSale.personas.APELLIDO_PERSONA }}</h3>
                <h3 class="caract">Cosecha: {{ formatearFecha(selectedSale.cosechas.FECHA_COSECHA) }}</h3>
                <h3 class="desc">Estado:{{ validateStatus(selectedSale.ESTADO_VENTA) }}</h3>
                <h3 class="desc">Total:{{ selectedSale.VALOR_TOTAL_VENTA }} </h3>
                <h3 class="desc">Fecha de venta: {{ formatearFecha(selectedSale.FECHA_VENTA) }}</h3>
                <div class="mainSaleDiv">
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditClient" class="form2">
                            <div class="form-group2">
                                <label for="venta_cliente">Cliente</label>
                                <div class="select-wrapper2">
                                    <select id="venta_cliente" v-model="clienteVentaUpdate" required class="input-field">
                                        <option v-for="trabajador in trabajadores" :value="trabajador.ID_PERSONA">
                                            {{ trabajador.NOMBRE_PERSONA }} {{ trabajador.APELLIDO_PERSONA }}
                                        </option>
                                    </select>
                                    <button class="btnAddClient" @click="addClient">+</button>
                                </div>
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditclient" @click="submitFormEditSaleClient"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditStatus" class="form2">
                            <div class="form-group2">
                                <label for="estadoProductoUpdate">Cambiar estado</label>
                                <select id="tipoPlanta" v-model="estadoVentaUpdate" required class="input-field">
                                    <option value="P">Pendiente</option>
                                    <option value="C">Pagado</option>
                                </select>
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditStatus" @click="submitFormEditSaleStaus"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditCrop" class="form2">
                            <div class="form-group2">
                                <label for="precioProductoUpdate">Cambiar cosecha:</label>
                                <select id="venta_cliente" v-model="cosechaVentaUpdate" required class="input-field">
                                    <option v-for="cosecha in cosechas" :value="cosecha.ID_COSECHA">
                                        {{ cosecha.FECHA_COSECHA }} ID: {{ cosecha.ID_COSECHA }}
                                    </option>
                                </select>
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditCrop" @click="submitFormEditSaleCrop"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2">
                        <form @submit.prevent="submitFormEditSaleDate" class="form2">
                            <div class="form-group2">
                                <label for="precioProductoUpdate">Cambiar fecha de venta:</label>
                                <input type="date" required class="input-field" v-model="fechaVentaUpdate">
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditStatus" @click="submitFormEditSaleDate"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2Prod">
                        <table id="table">
                            <thead>
                                <tr>
                                    <th class="tableTitle">Id producto</th>
                                    <th class="tableTitle">Nombre producto</th>
                                    <th class="tableTitle">Cantidad</th>
                                    <th class="tableTitle">Precio unitario</th>
                                    <th class="tableTitle">Subtotal</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
    
                                <tr v-for="factura in ventasFactura" :key="factura.ID_PRODUCTO" @click="showBill(factura)">
                                    <td class="tdTableID">{{ factura.ID_PRODUCTO }} </td>
                                    <td class="tdTable">{{ factura.productos.NOMBRE_PRODUCTO }}</td>
                                    <td class="tdTable">{{ factura.CANTIDAD_PRODUCTO}}</td>
                                    <td class="tdTable">{{ factura.PRECIO_VENTA_UNITARIO}}</td>
                                    <td class="tdTable">{{ factura.SUBTOTAL_VENTA_PRODUCTO}}</td>
                                    
                                </tr>
    
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="formButtons2">
                    <button @click="newBill" class="submit-button2">Añadir producto</button>
                    
                    <button @click="hideSale" class="submit-button2">Cerrar</button>
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
        <div v-if="isVisibleAddBill" class="popup">
            <div class="popup-content">
                <h2>Añadir producto</h2>
                <div id="formulario">
                    <form @submit.prevent="submitForm2" class="form">

                        <div class="form-group">
                            <label for="venta_cliente">Venta</label>
                            <div class="select-wrapper">
                                <textarea cols="1" rows="1" class="input-field"
                                    readonly>{{ formatearFecha(selectedSale.FECHA_VENTA) }}</textarea>
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

                            <input type="number" v-model="cantidad_producto_factura" @change="changeSubValue" required
                                class="input-field">
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Precio Unitario</label>

                            <textarea cols="1" rows="1" class="input-field" readonly>{{ precio_unitario_factura }}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="lote_Trabajador">Subtotal</label>

                            <textarea cols="1" rows="1" class="input-field" readonly>{{ subTotal }}</textarea>
                        </div>

                        <div class="formButtons">
                            <button type="submit" class="submit-button" @click="crearFactura">Agregar</button>
                            <button @click="hideBill" class="submit-button">Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isBillVisible" class="popupBill">
            <div class="popup-content4">
                <button class="deleteBtn" @click="submitFormDeleteBill">
                    <img src="../images/delete_btn.png" alt="Texto alternativo 1">
                </button>
                <h2>Editar producto</h2>
                <h3 class="caract">Venta: {{ formatearFecha(selectedBill.ventas.FECHA_VENTA) }} ID: {{ selectedBill.ID_VENTA }}
                </h3>
                <h3 class="caract">Producto: {{ selectedBill.productos.NOMBRE_PRODUCTO }}</h3>
                <h3 class="desc">Cantidad: {{ selectedBill.CANTIDAD_PRODUCTO }}</h3>
                <h3 class="desc">Subtotal:{{ selectedBill.SUBTOTAL_VENTA_PRODUCTO }} </h3>
                <h3 class="desc">Precio unitario{{ selectedBill.PRECIO_VENTA_UNITARIO }}</h3>
                <div class="mainSaleDiv2">
                    <div class="formulario3">
                        <form @submit.prevent="submitFormEditStatus" class="form2">
                            <div class="form-group2">
                                <label for="estadoProductoUpdate">Cambiar producto</label>
                                <select id="tipoPlanta" v-model="productoFacturaUpdate" required class="input-field3"
                                    @change="takeProduct2(), changeSubValue2()">
                                    <option v-for="producto in productos" :value="producto.ID_PRODUCTO">
                                        {{ producto.NOMBRE_PRODUCTO }}
                                    </option>
                                </select>
                            </div>
                            <div class="formButtons2">
                                <button type="submitEditStatus" @click="submitFormEditBillProduct"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario3">
                        <form @submit.prevent="submitFormEdit" class="form2">
                            <div class="form-group2">
                                <label for="precioProductoUpdate">Cambiar cantidad:</label>
                                <input type="number" required class="input-field3" @change="changeValue"
                                    v-model="cantidadFacturaUpdate">
                            </div>
                            <div class="formButtons3">
                                <button type="submitEditCrop" @click="submitFormEditBillValue"
                                    class="submit-button2">Cambiar</button>
                            </div>
                        </form>
                    </div>
                    <div class="formulario2T">
                        <form @submit.prevent="submitFormEditSaleDate" class="form2">
                            <div class="form-group2T">
                                <label for="precioProductoUpdate">Precio unitario</label>
                                <textarea cols="1" rows="1" class="input-fieldT"
                                    readonly>{{ precio_unitario_factura }}</textarea>
                            </div>
                            <div class="form-group2T">
                                <label for="precioProductoUpdate">Subtotal</label>
                                <textarea cols="1" rows="1" class="input-fieldT" readonly>{{ subTotal }}</textarea>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="formButtons3">

                    <button @click="hideBillSale" class="submit-button2">Cerrar</button>
                </div>
            </div>
        </div>
        <div v-if="isPrintVisible" class="myPopup2">
            <div class="myPopup-content2">
                <div class="printTitle">
                    <h2> Generar informe</h2>
                </div>
                <div class="printDates">
                    <div class="formularioPrint">
                        <form @submit.prevent="formPrint" class="form2">
                            <div class="form-group2">
                                <label for="precioProductoUpdate">Fecha inicio</label>
                                <input type="date" required class="input-field3" 
                                    v-model="date1Print">
                                    <label for="precioProductoUpdate">Fecha fin</label>
                                <input type="date" required class="input-field3" 
                                    v-model="date2Print">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="printButtons">
                    <button @click="printInform">Descargar</button>
                    <button @click="closePrint">Salir</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted,computed } from 'vue';
import jsPDF from 'jspdf';

import 'jspdf-autotable';
import axios from 'axios';
const router = useRouter();
const isVisible = ref('');
const trabajadores = ref([]);
const cosechas = ref([]);
const isVisibleAddClient = ref(false);
const isSaleVisible = ref(false);
const selectedSale = ref(null);
const message = ref('');
const validate = ref(false);
const isAlertVisible = ref(false);
const messageDelete = ("¿Seguro que deseas eliminar la venta?");
const switchButton = ref(false);
const isVisibleAddBill = ref('');
const selectedProduct = ref(null);
const subTotal = ref();
const id_producto_factura = ref();
const cantidad_producto_factura = ref();
const precio_unitario_factura = ref();
const estadoVentaUpdate = ref();
const token = localStorage.getItem('token');
const isBillVisible = ref(false);
const selectedBill = ref(null);
const isPrintVisible = ref(false)

function combinarDetallesYVentas(detallesFactura, ventas) {
  const ventasConDetalles = {};

  detallesFactura.forEach(detalle => {
    const idVenta = detalle.ID_VENTA;
    if (!ventasConDetalles[idVenta]) {
      ventasConDetalles[idVenta] = {
        detalleFactura: [detalle],
        venta: null,
      };
    } else {
      ventasConDetalles[idVenta].detalleFactura.push(detalle);
    }
  });
  ventas.forEach(venta => {
    const idVenta = venta.ID_VENTA;
    if (ventasConDetalles[idVenta]) {
      ventasConDetalles[idVenta].venta = venta;
    } else {
      ventasConDetalles[idVenta] = {
        detalleFactura: [],
        venta: venta,
      };
    }
  });
  const resultadoFinal = Object.values(ventasConDetalles);
  return resultadoFinal;
}
function filtrarVentasPorFecha(ventasConDetalles, fechaInicio, fechaFin) {
  const fechaInicioObj = new Date(fechaInicio);
  const fechaFinObj = new Date(fechaFin);

  fechaFinObj.setHours(23, 59, 59, 999);

  const ventasFiltradas = ventasConDetalles.filter(venta => {
    const fechaVenta = new Date(venta.venta.FECHA_VENTA);
    fechaVenta.setHours(0, 0, 0, 0); 

    return fechaVenta >= fechaInicioObj && fechaVenta <= fechaFinObj;
  });

  const ventasEnRangoJSON = ventasFiltradas.map(venta => {
    return {
      venta: JSON.parse(JSON.stringify(venta.venta)),
      detalleFactura: venta.detalleFactura.map(detalle => JSON.parse(JSON.stringify(detalle))),
    };
  });

  return ventasEnRangoJSON;
}
function generarInformePDF(ventasEnRango, fechaInicio, fechaFin) {
  const pdf = new jsPDF();
  let yPosition = 10;

  const img = new Image();
  img.src = '../images/logo.jpeg';

  img.onload = function() {
    pdf.addImage(img, 'JPEG', 15, yPosition, 30, 30); 
  }

  pdf.setFontSize(18);
  const title = 'Informe de ventas Café Maness';
  const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  const xPosition = (pdf.internal.pageSize.width - titleWidth) / 2 + 40;
  pdf.text(title, xPosition, yPosition + 20);
  yPosition += 50; 

  pdf.setFontSize(14);
  const dateRange = `Desde ${date1Print.value} hasta ${date2Print.value}`;
  const dateRangeWidth = pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  const xDateRange = (pdf.internal.pageSize.width - dateRangeWidth) / 2;
  pdf.text(dateRange, xDateRange, yPosition);
  yPosition += 10;

  ventasEnRango.forEach((venta, index) => {

    const ventaData = [
      ['ID Venta', 'Fecha Venta','Estado Venta','Cliente', 'Total'],
      [venta.venta.ID_VENTA, venta.venta.FECHA_VENTA, validateStatus(venta.venta.ESTADO_VENTA),venta.venta.personas.NOMBRE_PERSONA +" " +
      venta.venta.personas.APELLIDO_PERSONA, venta.venta.VALOR_TOTAL_VENTA],
    ];

    pdf.setFillColor(200, 220, 255);
    pdf.autoTable({
      startY: yPosition,
      head: ventaData.slice(0, 1),
      body: ventaData.slice(1),
      theme: 'grid',
    });

    yPosition = pdf.autoTableEndPosY() + 10;

    const productosData = venta.detalleFactura.map(producto => [
      producto.ID_PRODUCTO,
      producto.productos.NOMBRE_PRODUCTO,
      producto.CANTIDAD_PRODUCTO,
      producto.PRECIO_VENTA_UNITARIO,
      producto.SUBTOTAL_VENTA_PRODUCTO,
    ]);

    pdf.setFillColor(240, 240, 240);
    pdf.autoTable({
      startY: yPosition,
      head: [['ID Producto', 'Nombre Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']],
      body: productosData,
      theme: 'grid',
    });

    yPosition = pdf.autoTableEndPosY() + 10;

    if (index < ventasEnRango.length - 1) {
      pdf.line(20, yPosition, 190, yPosition);
      yPosition += 10;
    }
  });

  const fileName = `InformeVentasCafeManess_${date1Print.value}_${date2Print.value}.pdf`;
  pdf.save(fileName);
}
const date1Print = ref();
const date2Print = ref();
const printInform = ()=>{
    const ventasFiltradas = filtrarVentasPorFecha(completeSales.value,date1Print.value,date2Print.value);
    
    if( ventasFiltradas.length != 0){
        generarInformePDF(ventasFiltradas);
    }else{
        alert("No se han encontrado ventas en ese rango de fechas")
    }
    
}
const completeSales = ref([])
const print = ()=>{
    isPrintVisible.value = true;
    completeSales.value = combinarDetallesYVentas(facturas.value,ventas.value);
    console.log(completeSales.value)
}
const closePrint = ()=>{
    isPrintVisible.value = false;
}


const config = {
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
};
const showBill = (b) => {
    isBillVisible.value = true;
    selectedBill.value = b;
}
const hideBillSale = () => {
    isBillVisible.value = false;

}
const submitFormDeleteBill = async () => {
    openAlert("¿Seguro deseas eliminar el producto de la factura?");
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
            const response = await axios.delete(`http://localhost:3000/api/detalle_facturas/${selectedBill.value.ID_VENTA}/${selectedBill.value.ID_PRODUCTO}`, config);
            if (response.status === 200) {
                console.log('Factura eliminada con éxito');
                alert("Producto eliminado con éxito");
                hideBill()
                location.reload();
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
            console.error('Error al eliminar venta ', error);

            if (error.response.status === 500) {
                alert("No es posible eliminar facturas con registros activos");
            }

        }
    } else {

    }
};
const cantidadFacturaUpdate = ref();
const submitFormEditBillValue = async () => {
    try {
        const newData = {
            ID_VENTA: selectedBill.value.ID_VENTA,
            ID_PRODUCTO: selectedBill.value.ID_PRODUCTO,
            CANTIDAD_PRODUCTO: cantidadFacturaUpdate.value
        }
        const response = await axios.put(`http://localhost:3000/api/detalle_facturas/${selectedBill.value.ID_VENTA}/${selectedBill.value.ID_PRODUCTO}`, newData,config);
        if (response.status === 200) {
            console.log('Factura editada con éxito');
            alert("Factura editada con éxito")
            cantidadFacturaUpdate.value = null;
            hideBillSale();
            fetchVentasFactura();
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al editar factura ', error);
        if (error.response.status === 500) {
            alert("No es posile editar la factura, el producto ya se encuentra registrado");
        }


    }
};
const productoFacturaUpdate = ref();
const submitFormEditBillProduct = async () => {
    try {
        const newData = {
            ID_VENTA: selectedBill.value.ID_VENTA,
            ID_PRODUCTO: parseInt(productoFacturaUpdate.value),
            CANTIDAD_PRODUCTO: selectedBill.value.CANTIDAD_PRODUCTO
        };
        const response = await axios.put(`http://localhost:3000/api/detalle_facturas/${selectedBill.value.ID_VENTA}/${selectedBill.value.ID_PRODUCTO}`, newData,config);
        if (response.status === 200) {
            console.log('Factura editada con éxito');
            alert("Factura editada con éxito")
            productoFacturaUpdate.value = '';
            hideBillSale();
            fetchVentasFactura();
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al editar factura ', error);
        
        if (error.response.status === 500) {
            alert("No es posile editar la factura, el producto ya se encuentra registrado");
        }


    }
};
const estadoFiltrado = ref(null);
const toggleFiltro = () => {
  if (estadoFiltrado.value === 'C') {
    estadoFiltrado.value = 'P';
  } else if (estadoFiltrado.value === 'P') {
    estadoFiltrado.value = null; 
  } else {
    estadoFiltrado.value = 'C';
  }
};

const ventasFiltradas = computed(() => {
  if (estadoFiltrado.value === null) {
    return ventas.value; 
  } else {
    return ventas.value.filter(venta => venta.ESTADO_VENTA === estadoFiltrado.value);
  }
});

const takeProduct = () => {
    selectedProduct.value = productos.value.find(producto => producto.ID_PRODUCTO === id_producto_factura.value);
    precio_unitario_factura.value = selectedProduct.value.PRECIO_ACTUAL_PRODUCTO;
    console.log(precio_unitario_factura.value)
}
const selectedProductBill = ref(null)
const takeProduct2 = () => {
    selectedProductBill.value = productos.value.find(producto => producto.ID_PRODUCTO === productoFacturaUpdate.value);
    precio_unitario_factura.value = selectedProductBill.value.PRECIO_ACTUAL_PRODUCTO;
    
}
const changeSubValue = () => {
    subTotal.value = cantidad_producto_factura.value * precio_unitario_factura.value
}
const changeSubValue2 = () => {
    subTotal.value = selectedProductBill.value.PRECIO_ACTUAL_PRODUCTO * parseInt(selectedBill.value.CANTIDAD_PRODUCTO)

    
}
const newBill = () => {
    isVisibleAddBill.value = true;
};
const hideBill = () => {
    isVisibleAddBill.value = false;
};

const submitFormEditSaleStaus = async () => {
    try {
        const newData = {
            ID_PERSONA: selectedSale.value.ID_PERSONA,
            ID_COSECHA: selectedSale.value.ID_COSECHA,
            ESTADO_VENTA: estadoVentaUpdate.value,
            FECHA_VENTA: selectedSale.value.FECHA_VENTA

        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.put(`http://localhost:3000/api/ventas/${selectedSale.value.ID_VENTA}`, newData,config);
        if (response.status === 200) {
            console.log('Venta editada con éxito');
            alert("Venta editada con éxito")
            estadoVentaUpdate.value = '';
            hideSale();
            location.reload();
        }
    } catch (error) {
        console.error('Error al editar venta ', error);
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }

    }
};
const clienteVentaUpdate = ref();
const submitFormEditSaleClient = async () => {
    try {
        const newData = {

            ID_PERSONA: clienteVentaUpdate.value,
            ID_COSECHA: selectedSale.value.ID_COSECHA,
            ESTADO_VENTA: selectedSale.value.ESTADO_VENTA,
            FECHA_VENTA: selectedSale.value.FECHA_VENTA

        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        
        const response = await axios.put(`http://localhost:3000/api/ventas/${selectedSale.value.ID_VENTA}`, newData,config);
        if (response.status === 200) {
            console.log('Venta editada con éxito');
            alert("Venta editada con éxito")
            clienteVentaUpdate.value = '';
            hideSale();
            location.reload();
        }
    } catch (error) {
        console.error('Error al editar venta ', error);
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }

    }
};
const cosechaVentaUpdate = ref();
const submitFormEditSaleCrop = async () => {
    try {
        const newData = {

            ID_PERSONA: selectedSale.value.ID_PERSONA,
            ID_COSECHA: cosechaVentaUpdate.value,
            ESTADO_VENTA: selectedSale.value.ESTADO_VENTA,
            FECHA_VENTA: selectedSale.value.FECHA_VENTA

        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.put(`http://localhost:3000/api/ventas/${selectedSale.value.ID_VENTA}`, newData,config);
        if (response.status === 200) {
            console.log('Venta editada con éxito');
            alert("Venta editada con éxito")
            clienteVentaUpdate.value = '';
            hideSale();
            location.reload();
        }
    } catch (error) {
        console.error('Error al editar venta ', error);
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }

    }
};
const fechaVentaUpdate = ref();
const submitFormEditSaleDate = async () => {
    try {
        const newData = {

            ID_PERSONA: selectedSale.value.ID_PERSONA,
            ID_COSECHA: selectedSale.value.ID_COSECHA,
            ESTADO_VENTA: selectedSale.value.ESTADO_VENTA,
            FECHA_VENTA: new Date(fechaVenta.value)

        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        
        const response = await axios.put(`http://localhost:3000/api/ventas/${selectedSale.value.ID_VENTA}`, newData,config);
        if (response.status === 200) {
            console.log('Venta editada con éxito');
            alert("Venta editada con éxito")
            clienteVentaUpdate.value = '';
            hideSale();
            location.reload();
        }
    } catch (error) {
        console.error('Error al editar venta ', error);
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }

    }
};
const crearFactura = async () => {
    try {

        const newData = {
            ID_VENTA: selectedSale.value.ID_VENTA,
            ID_PRODUCTO: id_producto_factura.value,
            CANTIDAD_PRODUCTO: cantidad_producto_factura.value

        }
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        console.log(config)
        const response = await axios.post(`http://localhost:3000/api/detalle_facturas`, newData,config);
        if (response.status === 200) {
            console.log("Factura agregada correctamente");
            alert("Factura generada correctamente");
            hideBill();
            location.reload();

        } else {
            console.error('Error al actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar', error);
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
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
const submitFormDeleteSale = async () => {
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
            const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
            const response = await axios.delete(`http://localhost:3000/api/ventas/${selectedSale.value.ID_VENTA}`,config);
            if (response.status === 200) {
                console.log('Producto eliminado con éxito');
                alert("Venta eliminada con éxito");
                hideSale();
                location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar venta ', error);
            if (error.response.status === 500) {
                alert("No es posible eliminar ventas con registros activos");
            }
            if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }

        }
    } else {

    }
};


const showSale = (s) => {
    isSaleVisible.value = true;
    selectedSale.value = s;
    fetchVentasFactura();
}
const hideSale = () => {
    isSaleVisible.value = false;

}
const addClient = () => {
    isVisibleAddClient.value = true;
}

const addClientClose = () => {
    isVisibleAddClient.value = false;
}
const fetchCosechas = async () => {
    try {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`http://localhost:3000/api/cosechas`,config);
        if (response.ok) {
            const data = await response.json();
            cosechas.value = data;
        } else {
            console.error('Error al obtener el historial de cosechas.');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener el historial de cosechas:', error);
    }
};
const ventas = ref([])
const fetchVentas = async () => {
    try {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
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
const ventasFactura = ref([])
const fetchVentasFactura = async () => {
    try {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`http://localhost:3000/api/detalle_facturas/ventas/${selectedSale.value.ID_VENTA}`,config);
        if (response.ok) {
            const data = await response.json();
            ventasFactura.value = data;
            console.log(ventasFactura.value)
            
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
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const newData = {
            ID_PERSONA: clientCedule.value,
            NOMBRE_PERSONA: clientName.value,
            APELLIDO_PERSONA: clientLastName.value,
            TELEFONO_PERSONA: clientPhone.value.toString(),
        }
        const response = await axios.post(`http://localhost:3000/api/person`, newData,config);
        if (response.status === 200) {
            console.log("Cliente agregado correctamente");
            clientCedule.value = null;
            clientName.value = null;
            clientLastName.value =null;
            clientPhone.value = null;
            alert("Cliente agregado correctamente");
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
        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.post(`http://localhost:3000/api/ventas`, newData,config);
        if (response.status === 200) {
            console.log("Venta agregada correctamente");
            alert("Venta agregada correctamente");
            clienteVenta.value =null;
            cosechaVenta.value = null;
            estadoVenta.value = null;
            fechaVenta.value = null;
            hidePopup2();
            fetchVentas();
            

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




const validateStatus = (status) => {
    if (status === "C") {
        return "Pagado"
    } else {
        return "Pendiente"
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
    router.push("/main/salesManagement");
}
const goHome = () => {
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
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`http://localhost:3000/api/person`);
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
const productos = ref([])
const fetchProductos = async () => {
    try {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`http://localhost:3000/api/productos`,config);
        if (response.ok) {
            const data = await response.json();
            productos.value = data;
        } else {
            
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener el historial de productos', error);
    }
};
const facturas = ref([])
const fetchFacturas = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/detalle_facturas`,config);
        if (response.ok) {
            const data = await response.json();
            facturas.value = data;
            console.log(facturas.value)
        } else {
            console.error('Error al obtener el historial de facturas.');
        }
    } catch (error) {
        if (error.response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        console.error('Error al obtener el historial de facturas:', error);
    }
};

onMounted(() => {
    obtenerTrabajadores();
    fetchCosechas();
    fetchVentas();
    fetchProductos();
    fetchFacturas();
});
</script>
    
<style scoped>

.editButton {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .editButton img {
    width: 150%;
    height: 35px;
  }
  
  .editButton :hover {
    transform: scale(1.1);
  }
  
.formulario2T {
    width: 195%;
    margin: 2%;
    display: flex;
    height: 80%;
    border: 3px solid #792f00;
    border-radius: 15px;
    margin-bottom: 0%;
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
.input-fieldT {
    padding: 4px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 5%;
    width: 91%;
}
.bntFiltro{
    cursor: pointer;
}
.myPopup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
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
.printButtons{
    display: flex;
    justify-content: center;
    margin-top: 3%;
}
.printButtons button {
    background-color: #792f00;
    color: white;
    height: 45px;
    width: 100px;
    border-radius: 15px;
    margin-left: 10%;
    margin-right: 10%;
    cursor: pointer;
}
.myPopup2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.7);


}

.myPopup-content2 {
    background-color: #fff;
    width: 400px;
    height: 400px;
    border-radius: 15px;
    border: 3px solid #792f00;
}
.printTitle{
    display: flex;
    justify-content: center;
    text-align: center;
}
.printDates{
    display: block;
    justify-content: center;
    align-items: center;
    height: 60%;
    margin-bottom: 0%;
}
.formularioPrint {
    width: 95%;
    margin: 2%;
    display: flex;
    height: 90%;
    border: 3px solid #792f00;
    border-radius: 20px;
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
.popupBill {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(128, 128, 128, 0.5); 
    z-index: 1;

}

.popup-content3 {
    background-color: #fff;
    width: 80%;
    height: 95%;
    border-radius: 15px;
    border: 3px solid #792f00;
    display: flex;
    flex-direction: column;
    max-height: 800px;
}
.popup-content4 {
    background-color: #fff;
    width: 40%;
    height: 82%;
    border-radius: 15px;
    border: 3px solid #792f00;
    display: flex;
    flex-direction: column;
    max-height: 800px;
}
.popup-content4 h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0%;
    margin-bottom: 0;
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
.formulario3 {
    width: 90%;
    margin: 2%;
    display: flex;
    height: 90%;
    border: 3px solid #792f00;
    border-radius: 15px;
}
.formulario2Prod {
    width: 190%;
    margin: 2%;
    display: flex;
    height: 85%;
    border: 3px solid #792f00;
    border-radius: 15px;
    overflow-y: scroll;
}
.formulario2Prod table{
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
    height: 90%;
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
.formButtons3 {
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
    grid-gap: 10px;
    height: 60%;
}
.mainSaleDiv2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
    height: 90%;
    
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
    width: 5%;
}
.deleteBtn2 {
    align-self: flex-end;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 2%;
    margin-bottom: 0%;
    height: 40px;
    width: 5%;
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

.ventas {

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
    height: 70%;
    width: 20%;
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
    background-color: rgba(128, 128, 128, 0.5); 
    z-index: 4;

}

.popup-content {
    background-color: #fff;
    width: 30%;
    height: 90%;
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
    margin-top: 0%;
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
    width: 91%;
}
.input-field3{
    padding: 3px;
    font-size: 20px;
    border: 2px solid#792f00;
    border-radius: 20px;
    display: block;
    margin-bottom: 2%;
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

}</style>
    