<template>
  <div>
  <b-overlay :show="cargando" 
    :variant="variant"
    :opacity="opacity"
    :blur="blur"
    rounded="sm">
    <div class="hero">
      <img src="../assets/img/logos.png" alt="" class="logo" />
      <h1>Regístrate</h1>
      <h2>Únete a nosotros!!!</h2>
    </div>
    <b-form class="my-3 container">
      <b-form-group id="input-group-3" label="Nombre:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="nombre"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Correo Electrónico:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="correo"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="contraseña"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button variant="danger" @click="ingreso">Entrar</b-button>
    </b-form>
    </b-overlay>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data() {
    return {
      nombre: "",
      correo: "",
      contraseña: "",
      error: "",
      cargando: false
    };
  },

  methods: {
    ingreso() {
      this.cargando = true;
      this.error = "";
      if (this.nombre && this.correo && this.contraseña) {
        Firebase.auth()
          .createUserWithEmailAndPassword(this.correo, this.contraseña)
          .then(user => {
            this.$alert("Usuario Creado con éxito", {
              confirmButtonText: "OK"
            });
            this.cargando = false;
            this.$router.push({ name: "Login" });
          })
          .catch(err => {
            this.$alert("Error al crear el usuario", {
              confirmButtonText: "OK"
            });
            this.cargando = false;
            this.error = err.message;
          });
      } else {
        this.cargando = false;
        this.$alert("Todos los campos son requeridos", {
          confirmButtonText: "OK"
        });
        this.error = "Todos los campos son requeridos";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.hero {
  margin: 15px;
  text-align: center;
  color: #444;
}
.logo {
  width: 60px;
  margin-left: 10px;
}
.form-control {
  display: inline-block !important;
  width: 40% !important;
}
</style>
