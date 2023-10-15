<template>
    <div id="container">
        <div id="buttons">
            <button class="main-button" @click="goCropManagement">Cultivos</button>
            <button class="main-button">Ventas</button>
            <button class="main-button">Salir</button>
        </div>
        <div id="notifications">
            <button class="notification-button">
                <img src="../images/noti.png" alt="Icono 1">
            </button>
            <button class="notification-button">
                <img src="../images/user.png" alt="Icono 2">
            </button>
        </div>
        <div id="logoImg">
            <img src="../images/logo.png" alt="logo">
        </div>
    </div>
</template>
  
<script setup>
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    const router = useRouter();

    const goCropManagement = ()=>{
        router.push('/main/cropManagement');
    }
</script>
  
<style scoped>
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
}

#buttons {
    margin: 3%;
    margin-bottom: 3%;
    width: 40%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main-button {
    background-color: rgba(24, 22, 88, 255);
    border: none;
    cursor: pointer;
    margin-bottom: 40px;
    padding: 10px;
    color: white;
    height: 70px;
    width: 70%;
}

#logoImg {
    width: 100%;
    height: auto;
}

#logoImg img {
    width: 90%;
    height: 80%;
    border-radius: 10px;
    margin-top: 9%;
    margin-left: 4%;
}

#notifications {
    width: auto;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 10px;
    display: flex;
    margin-right: 30px;
}

.notification-button {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-right: 10px;
}

.notification-button img {
    width: 40px;
    height: 40px;
}
</style>
  