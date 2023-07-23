import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  { path: "/", name: "main", component: Main },
  { path: "/about", name: "about", component: () => import("./pages/AboutPage") },
  { path: "/user-recipe/:recipeId", name: "user-recipe", component: () => import("./pages/RecipeViewPage") },
  { path: "/register", name: "register", component: () => import("./pages/RegisterPage") },
  { path: "/login", name: "login", component: () => import("./pages/LoginPage") },
  { path: "/search", name: "search", component: () => import("./pages/SearchPage") },
  { path: "/private-recipes", name: "private-recipes", component: () => import("./pages/PrivateRecipesPage") },
  { path: "/family-recipes", name: "family-recipes", component: () => import("./pages/FamilyRecipesPage") },
  { path: "/favorite-recipes", name: "favorite-recipes", component: () => import("./pages/FavoriteRecipesPage") },
  { path: "/recipe/:recipeId", name: "recipe", component: () => import("./pages/RecipeViewPage") },
  { path: "*", name: "notFound", component: NotFound },
];

export default routes;
