// export default {
//     methods: {
//         isLoggedIn() {
//             return this.$root.store.username
//         },

//         async checkAuthorization(stayOnPage){
//             if (!this.$root.store.username) { return false }
//             let route = 'lastViewedRecipes'
//             try {
//                 const url = this.$root.store.server_domain + `/users/${this.$root.store.username}/${route}`
//                 const response = await this.axios.get(url /*, { withCredentials: true }*/);
//                 return true;
//             }
//             catch (error) {
//                 console.log(error);
//                 if (error.response.status == 401) {
//                     this.handleCookieExpired(stayOnPage)
//                     return false
//                 }
//             }
//         },

//         handleCookieExpired(stayOnPage) {
//             this.$root.store.logout()
//             //this.$root.toast("Expired", "Your user has been disconnected. Please login again", "error")
//             if(!stayOnPage) {
//                 this.$router.push("/login")
//             }
//         },

//         async getRecipesIdsFromUser(route, stayOnPageInCaseOfLogout = false) {
//             if (!this.$root.store.username || !route) { return }
//             try {
//                 const url = this.$root.store.server_domain + `/users/${this.$root.store.username}/${route}`
//                 const response = await this.axios.get(url /*, { withCredentials: true }*/);
//                 return response.data;
//             }
//             catch (error) {
//                 console.log(error);
//                 if (error.response.status == 401) { //unauthorized => cookie expired / logged out
//                     this.handleCookieExpired(stayOnPageInCaseOfLogout)
//                 }
//             }
//         },

//         async getRecipesInfosFromUser(route, stayOnPageInCaseOfLogout = false) {
//             if (!this.$root.store.username || !route) { return }
//             try {
//                 const url = this.$root.store.server_domain + `/users/${this.$root.store.username}/${route}`
//                 const response = await this.axios.get(url /*, { withCredentials: true }*/);
//                 return response.data;
//             }
//             catch (error) {
//                 console.log(error);
//                 if (error.response.status == 401) { //unauthorized => cookie expired / logged out
//                     this.handleCookieExpired(stayOnPageInCaseOfLogout)
//                 }
//             }
//         },

//         async getSpoonacularRecipesInfo(recipesIds) {
//             if (!recipesIds) { return }
//             let requestArray = recipesIds.map(id => {
//                 const url = this.$root.store.server_domain + `/recipes/info/${id}`
//                 return this.axios.get(url)
//             })
//             let result = []
//             try {
//                 let responseArray = await this.axios.all(requestArray)
//                 responseArray.forEach(response => {
//                     result.push(response.data)
//                 })
//             }
//             catch (error) {
//                 console.log(recipesIds);
//                 console.log(error);
//             }
//             return result
//         },

//         async getUserRecipeById(recipeId) {
//             if (!this.$root.store.username) { return }
//             const privateRecipesPromise = this.getRecipesInfosFromUser("recipes")
//             const familyRecipesPromise = this.getRecipesInfosFromUser("familyRecipes")
//             let values = await Promise.all([privateRecipesPromise, familyRecipesPromise])

//             let recipes = values[0].concat(values[1])
//             let result = recipes.find(recipe => recipe.id == recipeId)
//             console.log(result)
//             return result
//         },

//         async userRecipeIdsContainsId(recipeId, route, stayOnPageInCaseOfLogout = false){
//             if (!this.$root.store.username) { return }
//             try {
//                 const url = this.$root.store.server_domain + `/users/${this.$root.store.username}/${route}`
//                 const response = await this.axios.get(url);
//                 let recipeIds = response.data;
                
//                 let result = recipeIds.indexOf(parseInt(recipeId)) >= 0
//                 return result
//             }
//             catch (error) {
//                 console.log(error);
//                 if (error.response.status == 401) { //unauthorized => cookie expired / logged out
//                     this.handleCookieExpired(stayOnPageInCaseOfLogout)
//                 }
//             }
//         },

//         async addUserRecipeId(recipeId, route, stayOnPageInCaseOfLogout = false){
//             if (!this.$root.store.username) { return }
//             try {
//                 const url = this.$root.store.server_domain + `/users/${this.$root.store.username}/${route}`
//                 const response = await this.axios.post(
//                     url, {recipeId: parseInt(recipeId)}
//                 );
//             }
//             catch (error) {
//                 console.log(error);
//                 if (error.response.status == 401) { //unauthorized => cookie expired / logged out
//                     this.handleCookieExpired(stayOnPageInCaseOfLogout)
//                 }
//             }
//         },

//         async userViewedRecipe(recipeId) {
//             return await this.userRecipeIdsContainsId(recipeId, "lastViewedRecipes")
//         },

//         async userFavoritedRecipe(recipeId){
//             return await this.userRecipeIdsContainsId(recipeId, "favoriteRecipes")
//         },

//         async favoriteRecipe(recipeId){
//             await this.addUserRecipeId(recipeId, "favoriteRecipes")
//         },

//         async viewRecipe(recipeId) {
//             await this.addUserRecipeId(recipeId, "lastViewedRecipes")
//         },

//         applyImagePlaceholder(recipes) {
//             recipes.forEach(recipe => {
//                 if (!recipe.imageUrl) {
//                     recipe.imageUrl = this.$root.store.placeholder_image
//                     //"~./assets/recipe_placholder.png"
//                 }
//             })
//         }
//     },
// }
export default {
    methods: {
      isLoggedIn() {
        return this.$root.store.username;
      },
  
      async checkAuthorization(stayOnPage) {
        if (!this.$root.store.username) {
          return false;
        }
  
        const route = 'lastViewedRecipes';
        try {
          const url = `${this.$root.store.server_domain}/users/${this.$root.store.username}/${route}`;
          const response = await this.axios.get(url /*, { withCredentials: true }*/);
          return true;
        } catch (error) {
          console.log(error);
          if (error.response.status === 401) {
            this.handleCookieExpired(stayOnPage);
            return false;
          }
        }
      },
  
      handleCookieExpired(stayOnPage) {
        this.$root.store.logout();
        // this.$root.toast("Expired", "Your user has been disconnected. Please login again", "error")
        if (!stayOnPage) {
          this.$router.push('/login');
        }
      },
  
      async getRecipesIdsFromUser(route, stayOnPageInCaseOfLogout = false) {
        if (!this.$root.store.username || !route) {
          return;
        }
  
        try {
          const url = `${this.$root.store.server_domain}/users/${this.$root.store.username}/${route}`;
          const response = await this.axios.get(url /*, { withCredentials: true }*/);
          return response.data;
        } catch (error) {
          console.log(error);
          if (error.response.status === 401) {
            // Unauthorized => cookie expired / logged out
            this.handleCookieExpired(stayOnPageInCaseOfLogout);
          }
        }
      },
  
      async getRecipesInfosFromUser(route, stayOnPageInCaseOfLogout = false) {
        return this.getRecipesIdsFromUser(route, stayOnPageInCaseOfLogout);
      },
  
      async getSpoonacularRecipesInfo(recipesIds) {
        if (!recipesIds) {
          return;
        }
  
        const requestArray = recipesIds.map(id => {
          const url = `${this.$root.store.server_domain}/recipes/info/${id}`;
          return this.axios.get(url);
        });
  
        const result = [];
        try {
          const responseArray = await this.axios.all(requestArray);
          responseArray.forEach(response => {
            result.push(response.data);
          });
        } catch (error) {
          console.log(recipesIds);
          console.log(error);
        }
        return result;
      },
  
      async getUserRecipeById(recipeId) {
        if (!this.$root.store.username) {
          return;
        }
        const privateRecipesPromise = this.getRecipesInfosFromUser('recipes');
        const familyRecipesPromise = this.getRecipesInfosFromUser('familyRecipes');
        const values = await Promise.all([privateRecipesPromise, familyRecipesPromise]);
  
        const recipes = values[0].concat(values[1]);
        const result = recipes.find(recipe => recipe.id === recipeId);
        console.log(result);
        return result;
      },
  
      async userRecipeIdsContainsId(recipeId, route, stayOnPageInCaseOfLogout = false) {
        return this.getRecipesIdsFromUser(route, stayOnPageInCaseOfLogout).then(response => {
          const recipeIds = response.data;
          return recipeIds.indexOf(parseInt(recipeId)) >= 0;
        }).catch(error => {
          console.log(error);
          if (error.response.status === 401) {
            // Unauthorized => cookie expired / logged out
            this.handleCookieExpired(stayOnPageInCaseOfLogout);
          }
        });
      },
  
      async addUserRecipeId(recipeId, route, stayOnPageInCaseOfLogout = false) {
        if (!this.$root.store.username) {
          return;
        }
  
        try {
          const url = `${this.$root.store.server_domain}/users/${this.$root.store.username}/${route}`;
          await this.axios.post(url, { recipeId: parseInt(recipeId) });
        } catch (error) {
          console.log(error);
          if (error.response.status === 401) {
            // Unauthorized => cookie expired / logged out
            this.handleCookieExpired(stayOnPageInCaseOfLogout);
          }
        }
      },
  
      async userViewedRecipe(recipeId) {
        return this.userRecipeIdsContainsId(recipeId, 'lastViewedRecipes');
      },
  
      async userFavoritedRecipe(recipeId) {
        return this.userRecipeIdsContainsId(recipeId, 'favoriteRecipes');
      },
  
      async favoriteRecipe(recipeId) {
        await this.addUserRecipeId(recipeId, 'favoriteRecipes');
      },
  
      async viewRecipe(recipeId) {
        await this.addUserRecipeId(recipeId, 'lastViewedRecipes');
      },
  
      applyImagePlaceholder(recipes) {
        recipes.forEach(recipe => {
          if (!recipe.imageUrl) {
            recipe.imageUrl = this.$root.store.placeholder_image;
            // "~./assets/recipe_placholder.png"
          }
        });
      }
    },
  };
  