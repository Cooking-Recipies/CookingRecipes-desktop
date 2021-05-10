import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import LoggedUserProfile from "../views/UserProfile/LoggedUserProfile";
import AddRecipe from "../views/Recipes/Add/AddRecipe";
import ProfilePicture from "../views/UserProfile/content/management/ProfilePicture";
import ProfileUploadedPhotos from "../views/UserProfile/content/management/ProfileUploadedPhotos";
import BrowseRecipes from "../views/Recipes/Display/BrowseRecipes";
import DisplayRecipe from "../views/Recipes/Display/DisplayRecipe";
import ProfileDisplay from "../views/UserProfile/ProfileDisplay";
import UserRecipes from "../views/Recipes/Display/UserRecipes";
import EditRecipe from "../views/Recipes/Manage/EditRecipe";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    name: 'LoggedUserProfile',
    component: LoggedUserProfile
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
  {
    path: '/browseRecipes',
    name: 'BrowseRecipes',
    component: BrowseRecipes
  },
  {
    path: '/displayRecipe',
    name: 'DisplayRecipe',
    component: DisplayRecipe
  },
  {
    path: '/profileDisplay',
    name: 'ProfileDisplay',
    component: ProfileDisplay
  },
  {
    path: '/userRecipes',
    name: 'UserRecipes',
    component: UserRecipes
  },
  {
    path: '/editRecipe',
    name: 'EditRecipe',
    component: EditRecipe
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
