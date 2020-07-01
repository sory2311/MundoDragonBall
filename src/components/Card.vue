<template>
  <div class="gohan col-3">
    <div>
      <div class="card-img-top">
        <img :src="image" alt="" class="logo" />
        <div class="card-body">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">{{ description }}</p>
        </div>
      </div>

      <!--svg @click="makeLike" style="width:30px;height:30px" viewBox="0 0 24 24"-->
      <svg @click="makeLike" style="width:30px;height:30px" viewBox="0 0 24 24">
        <path
          :fill="like ? 'black' : 'white'"
          stroke="black"
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Navbar from '@/components/Navbar.vue'
import axios from "axios";
export default {
  name: "Card",
  data() {
    return {
      character: ""
    };
  },
  props: [
    "id",
    "name",
    "image",
    "species",
    "status",
    "description",
    "gender",
    "type",
    "planet",
    "like"
  ],
  methods: {
    makeLike(like, id) {
      //this.agregarFavoritos();
      this.$emit("makeLike", this.id);
      let payload = {
        name: this.name,
        gender: this.gender,
        species: this.species,
        description: this.description,
        type: this.type,
        image: this.image,
        planet: this.planetId,
        status: this.status
      };
      this.$store.dispatch("setFavorito", payload);
    }
  }
};
</script>

<style scoped lang="scss">
.gohan {
  text-align: center;
  margin: 40px;
}
.card-text {
  height: 100px;
  overflow-y: scroll;
}
.logo {
  background-size: cover;
  width: 200px;
  height: 330px;
}
</style>
