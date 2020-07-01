<template>
  <div>
  <b-overlay :show="cargando" 
  :variant="variant"
  :opacity="opacity"
  :blur="blur"
  rounded="sm">
    <b-jumbotron class="header">
      <!--img src="../assets/img/inicio2.jpg" alt="" class="logo"-->
      <h1>Bienvenidos!!!</h1>
    </b-jumbotron>
    <h2 class="welcome">Encuentra tú personaje Favorito!!!</h2>
    <div class="home container">
      <b-container class="my-5">
        <b-row align-h="center">
          <b-col cols="8">
            <b-input-group align-h="center">
              <b-form-input
                size="sm"
                v-model="busqueda"
                class="mr-sm-2"
                placeholder="Ejemplo: Goku"
              ></b-form-input>
              <b-button
                size="sm"
                class="ml-2"
                variant="danger"
                @click="buscar()"
                >Buscar</b-button
              >
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
      <div class="row">
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :id="card.id"
          :name="card.name"
          :image="card.url_image"
          :gender="card.gender"
          :species="card.species"
          :status="card.status"
          :description="card.description"
          :planet="card.planetId"
          :type="card.type"
          :like="card.like"
          @makeLike="makeLike"
        />
      </div>
    </div>
    </b-overlay>
  </div>
</template>

<script>
// @ is an alias to /src//import Navbar from '@/components/Navbar.vue'
import Card from "@/components/Card.vue";
import firebase from "firebase";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      cards: [], //generamos arreglo para setear data. luego realizamos vfor las props se genera con los :id. :img etc
      busqueda: "",
      card: [],
      urlBusqueda: "",
      cargando: true,
      variant: 'light',
      opacity: 0.85,
      blur: '2px',
      personajesFavoritos: []
    };
  },
  mounted() {
    //paso 1: mounted=create colocandp axios.get y la url se coloca un proxy de cors
    this.getAllCharacters();
  },
  computed: {
    ...mapState("cards")
  },
  methods: {
    ...mapActions(["setCards", "makeLike"]),

    getAllCharacters() {

      axios
        .get(
          "https://us-central1-proyecto-dbz.cloudfunctions.net/personajes/personajes/" + firebase.auth().currentUser.email 
        )
        .then(data => {
          this.personajesFavoritos = data.data.personajesFavoritos;
        })
        .catch(err => {
          this.cargando = false;
        });

      axios
        .get(
          "https://dragonball-api.herokuapp.com/dragonball/api/character/all"
        )
        .then(data => {
          //let characters = data.data;
          data.data.forEach(character => {
            this.cards.push({
              id: character.id,
              name: character.name,
              url_image: character.url_image,
              gender: character.gender,
              especie: character.species,
              status: character.status,
              description: character.description,
              planet: character.planetId,
              type: character.type,
              like: false
            });
          });

          this.cards.forEach((s, i) => {
            let fav = this.personajesFavoritos.find(f => f.id == s.id)
            fav? this.cards[i].like = true : false
            console.log(this.cards[i]);
          })
          this.cargando = false;
        })
        .catch(error => {
          this.cargando = false;
        });
      this.setCards(this.cards); //ejecuta la acción del vuex
    },
    buscar() {
      this.buscarCharacter();
    },
    resetCards() {
      this.cards = [];
      this.cards.push(this.card);
    },
    buscarCharacter() {
      if (this.busqueda !== undefined && this.busqueda !== "") {
        axios
          .get(
            (this.urlBusqueda =
              "https://cors-anywhere.herokuapp.com/https://dragonball-api.herokuapp.com/dragonball/api/character/name/" +
              this.busqueda)
          )
          .then(data => {
            this.card = data.data;
            this.resetCards();
          })
          .catch(e => {
            alert("Personaje No encontrado");
          });
      } else {
        this.cards = [];
        this.getAllCharacters();
      }
    }
  },
  components: {
    Card,
  }
};
</script>
<style scoped lang="scss">
.header {
  background-image: url("../assets/img/inicio2.jpg");
  background-position: top;
  background-size: cover;
  height: 320px;
  color: white;
}

.welcome {
  height: 30px;
}
</style>
