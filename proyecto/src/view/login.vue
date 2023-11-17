<template>
  <div id="container">
    <div id="d1">
      <carousel></carousel>
    </div>
    <div id="d2">
      <form @submit.prevent="submitForm">
        <template v-if="!registrationFormVisible && !personRegistrationVisible">
          <!-- Formulario de inicio de sesión -->
          <h2 class="form-title">Inicio de Sesión</h2>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" v-model="usuario" id="usuario" required>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                id="password"
                required
              />
            
            </div>
          </div>
        </template>

        <template v-else-if="registrationFormVisible">
          <!-- Formulario de registro de usuarios -->
          <h2 class="form-title">Registro</h2>

          <label for="cedula">Cédula:</label>
          <input type="text" v-model="cedula" id="cedula" required>

          <label for="rol">Rol:</label>
          <select v-model="rol" id="rol" required>
            <option value="1">Usuario</option>
            <option value="2">Trabajador</option>
            <option value="3">Administrador</option>
            
          </select>

          <label for="usuarioRegistro">Usuario:</label>
          <input type="text" v-model="usuarioRegistro" id="usuarioRegistro" required>

          <label for="correo">Correo:</label>
          <input type="email" v-model="correo" id="correo" required>

          <label for="contrasena">Contraseña:</label>
          <input type="password" v-model="contrasena" id="contrasena" required>

          <label for="confirmarContrasena">Confirmar Contraseña:</label>
          <input type="password" v-model="confirmarContrasena" id="confirmarContrasena" required>
        </template>

        <template v-else-if="personRegistrationVisible && !showLoginForm">
          <!-- Formulario de registro de personas -->
          <h2 class="form-title">Registro de Personas</h2>

          <label for="cedulaPersona">Cédula:</label>
          <input type="text" v-model="cedulaPersona" id="cedulaPersona" required>

          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nombre" id="nombre" required>

          <label for="apellido">Apellido:</label>
          <input type="text" v-model="apellido" id="apellido" required>

          <label for="telefono">Teléfono:</label>
          <input type="text" v-model="telefono" id="telefono" required>
          
        </template>

        <div v-if="registroExitoso" class="success-message">Registrado con éxito</div>
        <div v-if="registroError" class="bad-message">El usuario ya existe</div>
        <div v-if="diferentPassword" class="differentPass">Las contraseñas no coinciden</div>
        <div class="button-container">
          <button type="submit" id="submitBtn">{{ registrationFormVisible ? 'Registrarse' : (personRegistrationVisible ? 'Registrar' : 'Entrar') }}</button>
          <button v-if="!registrationFormVisible && !personRegistrationVisible" @click="togglePersonRegistration" id="personRegistrationBtn">Registrar Persona</button>
          <button @click="toggleForm"  id="toggleFormBtn">{{ registrationFormVisible ? 'Cancelar' : (personRegistrationVisible ? 'Registrar Usuario' : 'Registrar Usuario') }}</button>
          <button v-if="personRegistrationVisible" @click="goToLogin" id="goToLoginBtn">Ir al Inicio de Sesión</button>
          
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
const registroError = ref(false);
const diferentPassword = ref(false);
const router = useRouter();
const registrationFormVisible = ref(false);
const personRegistrationVisible = ref(false);
const loginError = ref('');
const showLoginForm = ref(false); 

const cedula = ref('');
const rol = ref('');
const usuarioRegistro = ref('');
const correo = ref('');
const contrasena = ref('');
const usuario = ref('');
const password = ref('');
const confirmarContrasena = ref('');
const cedulaPersona = ref('');
const nombre = ref('');
const apellido = ref('');
const telefono = ref('');

const toggleForm = () => {
  registrationFormVisible.value = !registrationFormVisible.value;
  personRegistrationVisible.value = false;
  registroExitoso.value = false;
  registroError.value = false;
  diferentPassword.value = false;
  showLoginForm.value = '';
  cedulaPersona.value = '';
  nombre.value = '';
  apellido.value = '';
  telefono.value = '';
};

const togglePersonRegistration = () => {
  personRegistrationVisible.value = !personRegistrationVisible.value;
  registrationFormVisible.value = false;
  registroExitoso.value = false;
  registroError.value = false;
  diferentPassword.value = false;
  showLoginForm.value = false;
};
const goToLogin = () => {
  showLoginForm.value = true;
  personRegistrationVisible.value = false;
}


const submitForm = async () => {
  try {
    loginError.value = '';
    registroError.value = false;
    registroExitoso.value = false;
    diferentPassword.value = false;

    if (registrationFormVisible.value) {
     



      if (contrasena.value === confirmarContrasena.value) {
        const response = await axios.post('http://localhost:3000/api/connection', {
          ID_PERSONA: cedula.value,
          ID_ROL: parseInt(rol.value),
          NOMBRE_USUARIO: usuarioRegistro.value,
          CORREO_USUARIO: correo.value,
          PASSWORD_USUARIO: contrasena.value,
        });

        console.log('Respuesta del servidor (Registro de Usuarios):', response.data);

        if (response.status === 200) {
          console.log("Usuario registrado correctamente");
          registroExitoso.value = true;
          // Limpiar campos después del registro exitoso
          cedula.value = '';
          rol.value = '';
          usuarioRegistro.value = '';
          correo.value = '';
          contrasena.value = '';
          confirmarContrasena.value = '';
        } else {
          console.log("No se pudo crear usuario");
          registroExitoso.value = false;
        }
      } else {
        console.error('La contraseña y la confirmación no coinciden.');
        diferentPassword.value = true;
      }
    } else if (personRegistrationVisible.value) {
      // Lógica para el formulario de registro de personas
      const response = await axios.post('http://localhost:3000/api/person', {
        ID_PERSONA: cedulaPersona.value,
        NOMBRE_PERSONA: nombre.value,
        APELLIDO_PERSONA: apellido.value,
        TELEFONO_PERSONA: telefono.value,
      });

      console.log('Respuesta del servidor (Registro de Personas):', response.data);

      if (response.status === 200) {
        console.log("Persona registrada correctamente");
        registroExitoso.value = true;
        // Limpiar campos después del registro exitoso
        cedulaPersona.value = '';
        nombre.value = '';
        apellido.value = '';
        telefono.value = '';
      } else {
        console.log("No se pudo registrar persona");
        registroExitoso.value = false;
      }
    } else {
      // Lógica para el formulario de inicio de sesión (login)
      const response = await axios.post('http://localhost:3000/api/login', {
        nombre_usuario: usuario.value,
        password_usuario: password.value,
      });

      console.log('Respuesta del servidor (Login):', response.data);

      if (response.status === 200) {
        const yourToken = response.data.token
        localStorage.setItem('token', yourToken);
        if (response.data.rol === "Administrador" ) {
          router.push('/main');
        }else if(response.data.rol === "Trabajador"){
          router.push('/mainWorker');
        }
        
        console.log("Logueado correctamente");
      } 
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error.message);
    
    if (error.response && error.response.status === 404) {
      console.log("Usuario no encontrado");
      loginError.value = 'Usuario no encontrado';
      alert("Usuario o contraseña incorrectos")
    }
    if (error.response && error.response.status === 401) {
      console.log("Contraseña incorrecta");
      loginError.value = 'Contraseña incorrecta';
      alert("Usuario o contraseña incorrectos")
    }
    
    if (error.response && error.response.status === 400) {
      console.log("Error en la solicitud");
      registroError.value = true;
    } else {
      registroError.value = false;
    }
  }
};

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>

<style scoped>

#btnMostrar{
  color: #000000;
}
#loginError{
  color: red;
  font-size: 20px;
}
.password-input {
  position: relative;
}

.password-input input {
  width: calc(100% - 32px);
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  margin: 0;
}

.password-input button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  background: none;
  border: none;
  cursor: pointer;
}

#container {
  display: flex;
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  width: 80%;
  max-width: 1400px;
  height: 90vh;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 3%;
  background-color:#fee1cc;
  border-radius: 2%;
}

#d1 {
  flex: 1;
  background-color:#fee1cc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90%;
}

#d2 {
  flex: 1;
  background-color:#fee1cc;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  border-radius: 20px;

}

form {
  width: 90%;
  max-width: 400px;
  height: 85%;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.form-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 2px;
}

.form-group input{
  margin-bottom: 16px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #000000;
  background-color: transparent;
  margin: 0;
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
  border: none;
  border-bottom: 1px solid #000000;
  background-color: transparent;
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 7px;
}

button {
  width: 30%;
  padding: 12px;
  background-color: #792f00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  margin: 3%;
}

.success-message {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}
.bad-message {
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}
.differentPass{
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}
</style>