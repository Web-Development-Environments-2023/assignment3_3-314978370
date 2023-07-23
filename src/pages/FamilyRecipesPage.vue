<template>
    <div class="container">
      <h1 class="title">Family Recipes</h1>
  
  <GenericRecipesPreviewList 
    v-if="familyRecipesAvailable"
    title="Family Recipes" 
    class="RandomRecipes center" 
    :isSpoonacularRecipe="false" 
    :max="-1"
    :recipes="familyRecipes"/>
  <div v-else>
    <br><br>
    Wow, such empty
  </div>
    </div>
  </template>
  <script>
  import GenericRecipesPreviewList from "../components/GenericRecipesPreviewList";
  import mixin from "../mixin";
  
  export default {
    components: {
      GenericRecipesPreviewList
    },
    data() {
      return {
        route: "familyRecipes",
        familyRecipes: []
      };
    },
    mixins: [mixin],
    computed: {
      familyRecipesAvailable() {
        return this.familyRecipes && this.familyRecipes.length > 0;
      }
    },
    mounted() {
      this.getFamilyRecipes();
    },//test
    methods: {
      getFamilyRecipes() {
        this.getRecipesInfosFromUser(this.route).then(recipes => {
          this.familyRecipes = recipes;
        });
      }
    }
  };
  </script>
  <style lang="scss" scoped>
  .container {
    margin: 10px 0 10px;
  }
  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }
  </style>