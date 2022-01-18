<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <v-row calss="ma-0" align="center">
          <v-btn
            class="mr-2"
            color="primary"
            dark
            @click="$router.push('/')"
            v-if="$route.path !== '/'"
            >Home</v-btn
          >
          <v-btn
            color="primary"
            dark
            @click="$router.push('/login')"
            v-if="!user && $route.path !== '/login'"
            >Login</v-btn
          >
          <v-btn color="primary" dark @click="logout" v-if="user">Logout</v-btn>
          <v-spacer></v-spacer>
          <span v-if="user" class="white--text text-h10">{{
            user.displayName
          }}</span>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "./firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",
  data: () => ({
    user: null,
  }),
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error);
        });
    },
    checkUser() {
      const user = auth.currentUser;
      if (user !== null) {
        this.user = user;
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        this.user = user;
      }
    })
  }
};
</script>
