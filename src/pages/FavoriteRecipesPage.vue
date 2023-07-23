<!-- <template>
    <div class="container">
      <h1 class="title">Favorite Recipes</h1>
  
      <GenericRecipesPreviewList
        v-if="favoriteRecipesExist()"
        title="Favorite Recipes"
        class="RandomRecipes center"
        :isSpoonacularRecipe="true"
        :max="-1"
        :recipes="getFavoriteRecipes()"
      />
  
      <div v-else>
        <br /><br />
        Wow, such empty
      </div>
    </div>
  </template>
  
  <script>
  import GenericRecipesPreviewList from "../components/GenericRecipesPreviewList";
  import mixin from "../mixin";
  
  export default {
    components: {
      GenericRecipesPreviewList,
    },
    data() {
      return {
        favoriteRecipes: [],
        route: "favoriteRecipes",
      };
    },
    mixins: [mixin],
    mounted() {
      if (this.isUserLoggedIn()) {
        this.loadFavoriteRecipes();
      }
    },
    methods: {
      favoriteRecipesExist() {
        return this.favoriteRecipes && this.favoriteRecipes.length > 0;
      },
      getFavoriteRecipes() {
        return this.favoriteRecipes;
      },
      loadFavoriteRecipes() {
        this.getRecipesIdsFromUser(this.route)
          .then((recipeIds) => {
            this.getSpoonacularRecipesInfo(recipeIds)
              .then((recipes) => {
                this.favoriteRecipes = recipes;
                let recipesFavoritedPromises = recipes.map((recipe) => {
                  return this.userFavoritedRecipe(recipe.id);
                });
                Promise.all(recipesFavoritedPromises).then((boolArr) => {
                  this.favoriteRecipes.forEach((recipe, idx) => {
                    recipe.isFavorite = boolArr[idx];
                    let recipesViewedPromises = recipes.map((recipe) => {
                      return this.userViewedRecipe(recipe.id);
                    });
                    Promise.all(recipesViewedPromises).then((boolArr) => {
                      this.favoriteRecipes.forEach((recipe, idx) => {
                        recipe.isViewed = boolArr[idx];
                      });
                    });
                  });
                });
              });
          });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .Recipes {
    margin: 10px 0 10px;
  }
  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }
  </style>
   -->

   <template>
    <div class="container">
      <h1 class="title">Favorite Recipes</h1>
  
      <GenericRecipesPreviewList
        v-if="favoriteRecipesExist()"
        title="Favorite Recipes"
        class="RandomRecipes center"
        :isSpoonacularRecipe="true"
        :max="-1"
        :recipes="getFavoriteRecipes()"
      />
  
      <div v-else>
        <br /><br />
        Wow, such empty
      </div>
    </div>
  </template>
  
  <script>
  import GenericRecipesPreviewList from "../components/GenericRecipesPreviewList";
  import mixin from "../mixin";
  
  export default {
    components: {
      GenericRecipesPreviewList,
    },
    data() {
      return {
        favoriteRecipes: [],
        route: "favoriteRecipes",
      };
    },
    mixins: [mixin],
    mounted() {
      this.checkUserLoggedIn();
      this.loadFavoriteRecipes();
    },
    methods: {
      favoriteRecipesExist() {
        return this.favoriteRecipes && this.favoriteRecipes.length > 0;
      },
      getFavoriteRecipes() {
        return this.favoriteRecipes;
      },
      checkUserLoggedIn() {
        if (!this.$root.store.username) {
          console.log("User not logged in");
        } else {
          console.log("User is logged in");
        }
      },
      loadFavoriteRecipes() {
        this.getRecipesIdsFromUser(this.route)
          .then((recipeIds) => {
            this.getSpoonacularRecipesInfo(recipeIds)
              .then((recipes) => {
                this.favoriteRecipes = recipes;
              });
          });
      },
      getFavoriteRecipeCount() {
        return this.favoriteRecipes.length;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .Recipes {
    margin: 10px 0 10px;
  }
  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }
  </style>
  