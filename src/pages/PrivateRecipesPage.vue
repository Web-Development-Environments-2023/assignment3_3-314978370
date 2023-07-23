<template>
    <div class="container">
      <h1 class="title">Private Recipes</h1>
  
      <GenericRecipesPreviewList
        v-if="privateRecipesExist()"
        title="Private Recipes"
        class="RandomRecipes center"
        :isSpoonacularRecipe="false"
        :max="-1"
        :recipes="getPrivateRecipes()"
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
        route: "recipes",
        privateRecipes: [],
      };
    },
    mixins: [mixin],
    mounted() {
      this.getRecipesInfosFromUser(this.route).then((recipes) => {
        this.privateRecipes = recipes;
      });
    },
    methods: {
      privateRecipesExist() {
        return this.privateRecipes && this.privateRecipes.length > 0;
      },
      getPrivateRecipes() {
        return this.privateRecipes;
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
  