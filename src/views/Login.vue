<template>
  <b-overlay :show="cargando" 
    :variant="variant"
    :opacity="opacity"
    :blur="blur"
    rounded="sm">
    <div class="about">
     <div class = "hero" > 
        <h1>Es hora de iniciar sesión!!!</h1>
        <img src="../assets/img/go.jpg" alt="" class="logo">
    </div>     
      <b-form class="mt-3 container">

        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="correo" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="contraseña" required type="password"></b-form-input>
        </b-form-group>

        <b-button variant="danger" class="mb-3" @click="login">Entrar</b-button>
      </b-form>

      <a @click.prevent="recuperar()">Olvidé Contraseña</a>
      <!--a @click.prevent="recuperar()" href="">Olvidé Contraseña</a-->
      
  </div>
  </b-overlay>
</template>

<script>
import Firebase from "firebase";

  export default {
    data(){
      return {
      correo: "",
      contraseña: "",
      cargando: false,
      variant: 'light',
      opacity: 0.85,
      blur: '2px'
      }
    },

    methods: {
    login() {
      this.cargando = true;
      Firebase.auth()
        .signInWithEmailAndPassword(this.correo, this.contraseña)
        .then(
          accept => {
            this.$alert("Se inicia sesión con Éxito", {
              confirmButtonText: "OK",
            });
            this.cargando = false;
            this.$store.commit("USER_LOGIN");
            this.$router.push({ name : 'Home'})
          },
          reject => {
            this.$alert("Datos No existen o Usuario incorrecto", {
              confirmButtonText: "OK",
            });
            console.log(reject.message)
            this.cargando = false;
          }
        );
    },
    recuperar(){
      if(this.correo !== undefined && this.correo !== ""){
        this.$store.dispatch("resetPassword", this.correo);
      }else{
        this.$alert("Debe escribir un correo", {
              confirmButtonText: "OK",
        });
      }
    }
  }
  }
    </script>

    <style scoped lang="scss">
.hero {
margin:10px;
text-align: center;
color: #444;

}
 .logo {
  width: 190px;
  
}
.form-control{
  display: inline-block!important;
  width: 40%!important;

  }
</style>