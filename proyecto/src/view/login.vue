<template>
  <div id="container">
    <div id="d1">
      <carousel></carousel>
    </div>
    <div id="d2">
      <form @submit.prevent="submitForm">
        <template v-if="!registrationFormVisible">
          <!-- Formulario de inicio de sesión -->
          <h2 class="form-title">Inicio de Sesión</h2>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" v-model="usuario" required>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" v-model="password" required>
          </div>
        </template>

        <template v-else>
          <!-- Formulario de registro -->
          <h2 class="form-title">Registro</h2>
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nombre" required>

          <label for="apellido">Apellido:</label>
          <input type="text" v-model="apellido" required>

          <label for="usuarioRegistro">Usuario:</label>
          <input type="text" v-model="usuarioRegistro" required>

          <label for="telefono">Teléfono:</label>
          <input type="tel" v-model="telefono" required>

          <label for="correo">Correo:</label>
          <input type="email" v-model="correo" required>

          <label for="contrasena">Contraseña:</label>
          <input type="password" v-model="contrasena" required>

          <label for="confirmarContrasena">Confirmar Contraseña:</label>
          <input type="password" v-model="confirmarContrasena" required>
        </template>
        <div v-if="registroExitoso" class="success-message">Registrado con éxito</div>
        <div class="button-container">
          <button type="submit">{{ registrationFormVisible ? 'Registrarse' : 'Entrar' }}</button>
          <button @click="toggleForm">{{ registrationFormVisible ? 'Cancelar' : 'Registrar Administrador' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Carousel from '@/components/carrousel.vue';
import { useRouter } from 'vue-router';
const registroExitoso = ref(false);
const router = useRouter();
const registrationFormVisible = ref(false);
const nombre = ref('');
const apellido = ref('');
const usuarioRegistro = ref('');
const telefono = ref('');
const correo = ref('');
const contrasena = ref('');
const usuario = ref('');
const password = ref('');
const confirmarContrasena = ref('');

const toggleForm = () => {
  registrationFormVisible.value = !registrationFormVisible.value;
  registroExitoso.value = false;
};

const submitForm = async () => {
  try {
    if (registrationFormVisible.value) {
      if (contrasena.value === confirmarContrasena.value) {
        const response = await axios.post('http://localhost:3000/api/registro', {
          nombre: nombre.value,
          apellido: apellido.value,
          usuario: usuarioRegistro.value,
          telefono: telefono.value,
          correo: correo.value,
          contrasena: contrasena.value,
        });

        console.log('Respuesta del servidor:', response.data);
        if (response.data.message === 'Usuario registrado') {
          console.log("usuario registrado")
          registroExitoso.value = true;
          nombre.value = '';
          apellido.value = '';
          usuarioRegistro.value = '';
          telefono.value = '';
          correo.value = '';
          contrasena.value = '';
          confirmarContrasena.value = '';
        } else {
          registroExitoso.value = false;
        }
      } else {
        console.error('La contraseña y la confirmación no coinciden.');
      }
    } else {
      const response = await axios.post('http://localhost:3000/api/login', {
        usuario: usuario.value,
        contrasena: password.value,
      });

      console.log('Respuesta del servidor:', response.data);
      if (response.data.message === 'Usuario encontrado') {
        router.push('/cropManagement');
      } else {

      }
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error.message);
  }
};
</script>

<style scoped>
#container {
  display: flex;
  height: 100vh;
}

#d1 {
  flex: 1;
  background-color: rgb(6, 69, 69);
  background-image: url('../images/fondo2.jpg');
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#d2 {
  flex: 1;
  background-image: url('../images/cafe.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

form {
  width: 90%;
  max-width: 400px;
  height: 85%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.form-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 2px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 3px;
  font-size: 20px;
}

input,
select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 7px;
}

button {
  width: 40%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

.success-message {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}
</style>