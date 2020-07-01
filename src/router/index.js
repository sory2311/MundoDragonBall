import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Firebase from "firebase";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    meta: { requiresAuth: true },
    component: () => import( '../views/Favoritos.vue')
    
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue'),
    alias: [ '/ingresa', '/ingresar', '/loguearse', '/logueate']
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

  router.beforeEach((to, from, next) => {    //es la puerta de entrada para redireccionar
    let user = Firebase.auth().currentUser //guardo una variable user auntenticacion del login
    /*let authRequired = to.matched.some((route) => route.meta.login)  //guardo una variable auth 
    if (!user && authRequired) {  //si la ruta tiene un propiedad login; authRequired devuelve true o false (ruta restringida)
      next('login')                      //login si esta ok me redireccionaba a la siguiente pag
    } else if (user && !authRequired) {          //  USER DEVUELVE NULL
      from.name == Home ? false : next(Home); //si la ruta de donde provengo es home no hace nada; evita un bucle infinito
    } else { } */
      next()
    
})
export default router;

