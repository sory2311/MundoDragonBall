<template>
  <div>
  <b-overlay :show="cargando" 
    :variant="variant"
    :opacity="opacity"
    :blur="blur"
    rounded="sm">
    <div class="hero">
      <h1>Tús Favoritos</h1>
      <img src="../assets/img/hq.jpg" alt="" class="logo" />
    </div>
    <div class="container pt-2">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Género</th>
            <th scope="col">Tipo</th>
            <th scope="col" colspan="2">Estado</th>
          </tr>
        </thead>
        <tbody>
          <!--div v-if="loading" class="text-center">
            < v-if condicional con un booleano>
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
          </div-->
          <tr
            v-for="(personaje, index) in this.personajes"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ personaje.name }}</td>
            <td>{{ personaje.description }}</td>
            <td>{{ personaje.gender }}</td>
            <td>{{ personaje.type }}</td>

            <td>
              <b-button variant="danger" @click="eliminar(index)"
                >Eliminar</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </b-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import axios from "axios";

export default {
  name: "Favoritos",
  data() {
    return {
      favoritos: [],
      cargando: true,
      personajes: [],
      cargando: false,
      variant: 'light',
      opacity: 0.85,
      blur: '2px'
    };
  },
  mounted() {
    //paso 1: mounted=create cuando cargo pag llama a favoritos
    this.getFavoritos();
  },
  methods: {
    getFavoritos() {
      this.cargando = true;
      axios
        .get(
          "https://us-central1-proyecto-dbz.cloudfunctions.net/personajes/personajes/" +
            firebase.auth().currentUser.email
        )
        .then(data => {
          this.cargando = false;
          this.personajes = data.data.personajesFavoritos;
        })
        .catch(err => {
          this.cargando = false;
        });
    },
    eliminar(id) {
      this.cargando = true;
      //eliminamos el favorito
      this.personajes.splice(id, 1);
      let data = {
        email: firebase.auth().currentUser.email,
        favoritos: {
          personajesFavoritos: this.personajes
        }
      };
      axios
        .post(
          "https://us-central1-proyecto-dbz.cloudfunctions.net/personajes/personaje",
          data
        )
        .then(data => {
          this.$alert("Favorito eliminado correctamente", {
              confirmButtonText: "OK"
            });
            this.cargando = false;
        })
        .catch(err =>{
          this.cargando = false;
        });
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
  width: 150px;
}
</style>
