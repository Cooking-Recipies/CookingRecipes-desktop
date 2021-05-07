import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import ProfileCard from "../views/UserProfile/ProfileCard";
import AddRecipe from "../views/Recipes/AddRecipe";
import ProfilePicture from "../views/UserProfile/content/ProfilePicture";
import ProfileUploadedPhotos from "../views/UserProfile/content/ProfileUploadedPhotos";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'ProfileCard',
    component: ProfileCard
  },
  {
    path: '/profilePicture',
    name: 'ProfilePicture',
    component: ProfilePicture
  },
  {
    path: '/profileUploadedPhotos',
    name: 'ProfileUploadedPhotos',
    component: ProfileUploadedPhotos
  },
  {
    path: '/addRecipe',
    name: 'Recipe',
    component: AddRecipe
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
