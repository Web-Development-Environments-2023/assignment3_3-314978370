export const shared_data = {
  
    server_domain: "http://localhost:3000",
    //sessionStorage
    //localStorage
    //username: localStorage.username,
    username: localStorage.username,

    search_results: localStorage.search_results,

    //placeholder_image: "https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png",
    placeholder_image: "https://res.cloudinary.com/dhekdgcff/image/upload/v1595092560/placeholder_n4wagf.jpg",
  
    updateLastSearch(search_results){
      if(search_results){
        sessionStorage.setItem("search_results", search_results)
        this.search_results = search_results
      }
    },

    login(username) {
      localStorage.setItem("username", username);
      localStorage.setItem("search_results", [])
      this.username = username;
      this.search_results = []
      console.log("login", this.username);
    },
  
    logout() {
      console.log("logout");
      localStorage.removeItem("username");
      localStorage.removeItem("search_results")
      this.username = undefined;
      this.search_results = undefined
    },
};