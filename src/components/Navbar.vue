<template>
  <div>

    <b-navbar class="banner" toggleable="lg" type="dark" >
      
      <b-navbar-brand href="#">
        
        <img src="../assets/img/logo1.png" alt="" class="logos">
       
       </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
        <b-navbar-nav v-if="userLogin">
          <router-link to="/" class="routerLink nav-link">Home</router-link>
        </b-navbar-nav>

      <!-- SI NO ESTÁ LOGUEADO -->
      <!--b-navbar-nav v-if=this.$store.state.visible-->
        <b-navbar-nav v-if="!userLogin">
          <router-link to="/registro" class="routerLink nav-link">Regístrate</router-link>
        </b-navbar-nav>

        <!--b-navbar-nav v-if=this.$store.state.visible-->
        <b-navbar-nav v-if="!userLogin">
          <router-link to="/login" class="routerLink nav-link">Login</router-link>
        </b-navbar-nav>

        <b-navbar-nav v-if="userLogin">
          <router-link to="/favoritos" class="routerLink nav-link">Favoritos</router-link>
        </b-navbar-nav>

      <!-- SOLO SI EL USUARIO ESTÁ REGISTRADO -->
          <b-nav-item-dropdown right v-if="userLogin">
      <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Usuario</em>
            </template>
            <b-dropdown-item @click="salir">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>


        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
  </div>
</template>

<script>
import Firebase from "firebase";
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  computed:{
    userLogin(){
      return this.$store.getters.getUserLogin;
    }
  },
  methods: {
 salir() {
      Firebase.auth()
        .signOut()
        .then(() => {
            this.$alert("Sesión cerrada correctamente", {
                confirmButtonText: "OK"
              });
            this.$store.commit("USER_LOGIN");
            this.$router.push({ name: "Login"});
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.banner{
  background-color: #e67e22!important;
}


.logos{
  width: 300px;
  heigth: 150px;
  margin-left:10px;
  
}


</style>
