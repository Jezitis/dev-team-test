<template>
  <v-container class="fill-height ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-overlay :value="showMessage">
        <v-alert type="error">Oops! There is an error: {{errorMessage}}</v-alert>
      </v-overlay>
      <v-card>
        <v-card-title>
          <span class="text-h5">Please login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="user.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="user.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="$router.push('/registration')"
          >
            Sign Up
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$router.push('/')">
            Home
          </v-btn>
          <v-btn color="blue darken-1" text @click="userLogin"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      showMessage: false,
      errorMessage: null,
    };
  },
  methods: {
    async userLogin() {
      try {
        await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        this.$router.push("/");
      } catch (error) {
          this.showMessage = true;
          this.errorMessage = error.message;
      } finally {
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = null;
        }, 2000)
      }
    },
  },
};
</script>