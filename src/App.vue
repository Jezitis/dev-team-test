<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <v-row calss="ma-0" align="center">
          <v-btn
            color="primary"
            dark
            @click="$router.push('/')"
            v-if="$route.path !== '/'"
            >Home</v-btn
          >
          <v-btn color="primary" dark @click="$router.push('/login')" v-else
            >Login</v-btn
          >
          <v-spacer></v-spacer>
          <v-avatar color="warning lighten-2" size="56">
            <span class="white--text text-h5">CJ</span>
          </v-avatar>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
