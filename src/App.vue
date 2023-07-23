<!-- <template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import mixin from "./mixin"

export default {
  name: "App",
  mixins: [mixin],
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
<template>
  <div id="app">
    <!-- Our API server is: {{ getServerDomain() }} <br>
    Server response is: {{ serverAliveResponse }} -->
    <div id="nav">
      <router-link :to="{ name: 'main' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link> |
      <router-link :to="{ name: 'search' }">Search</router-link> |
      <!-- {{ !isUserLoggedIn() }} -->
      <br>
      <span v-if="!isUserLoggedIn()">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <!-- {{ getUserUsername() }}:  -->
        <span>
          <b-dropdown id="dropdown-1" :text="getUserUsername()" class="m-md-2">
            <b-dropdown-item>
              <router-link :to="{ name: 'private-recipes' }">Private Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'family-recipes' }">Family Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'favorite-recipes' }">Favorite Recipes</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </span>
        <button @click="logout">Logout</button>|
        <!-- <router-link :to="{ name: 'private-recipes' }">Private Recipes</router-link> |
        <router-link :to="{ name: 'family-recipes' }">Family Recipes</router-link> |
        <router-link :to="{ name: 'favorite-recipes' }">Favorite Recipes</router-link> -->
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line
import mixin from "./mixin";

export default {
  name: "App",
  data() {
    return {
      serverAliveResponse: "",
    };
  },
  created() {
    //this.serverAliveResponse()
    if (this.isLoggedIn()) {
      this.checkAuthorization(true);
    }
  },
  mixins: [mixin],
  methods: {
    async logout() {
      const url = this.getServerDomain() + "/logout";
      const response = await this.axios.get(url);
      this.getUserStore().logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    // eslint-disable-next-line vue/no-dupe-keys
    async serverAliveResponse() {
      try {
        let server = this.getServerDomain();
        const response = await this.axios.get(server + "/alive");
        this.serverAliveResponse = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
