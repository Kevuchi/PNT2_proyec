<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
//rutear de nuevo al home si el login es válido!!
/*
antes del ruteo guardar el usuario en el store de pinia
*/
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const handleLogin = () => {
      if (username.value && password.value) {
        alert(`Bienvenido, ${username.value}!`);
        errorMessage.value = "";
      } else {
        errorMessage.value = "Por favor, complete todos los campos.";
      }
    };

    return { username, password, errorMessage, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
