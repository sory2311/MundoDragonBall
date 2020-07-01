import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    correo: "",
    contraseña: "",
    nombre: "",
    cards: [],
    favoritos: [],
    userLogin: false
    //cargando:false
  },
  getters: {
    getUserLogin(state){
      return state.userLogin;
    }
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
      //state.cargando=false
    },
    MAKE_LIKE(state, id) {
      state.cards.forEach((character, index) => {
        if (character.id === id) {
          state.cards[index].like = true;
        }
      });
    },
    SET_FAVORITO(state, personajesFavoritos){
      state.favoritos = personajesFavoritos;
    },
    USER_LOGIN(state){
      state.userLogin = !state.userLogin;
    }
  },
  actions: {
    setCards({ commit }, cards) {
      commit("SET_CARDS", cards); //ejecuta el mutations
    },
    makeLike({ commit, state, dispatch }, id) {
      commit("MAKE_LIKE", id);
    },
    setFavorito({ commit, state }, payload) {
      let personajesFavoritos = state.favoritos;
      personajesFavoritos.push(payload);
      //se construye body para guardar
      let data = {
        email: firebase.auth().currentUser.email,
        favoritos: {
          personajesFavoritos: personajesFavoritos
        }
      };
      axios
        .post(
          "https://us-central1-proyecto-dbz.cloudfunctions.net/personajes/personaje",
          data
        )
        .then(data => {
          commit("SET_FAVORITO", personajesFavoritos);
        });
    },
    resetPassword({commit, state}, email){
      firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
          alert("Se ha enviado un correo a la dirección " + email + " para restablecer la contraseña");
        })
        .catch(function(error) {
          alert("Error al enviar correo para la cuenta " + email);
        });
    }
  },
  modules: {}
});
