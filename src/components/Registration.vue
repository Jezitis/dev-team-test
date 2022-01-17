<template>
  <v-container class="fill-height ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-card>
        <v-card-title>
          <span class="text-h5">Fill the information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" required v-model="user.email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="user.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="$router.push('/login')">
            Login
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$router.push('/')">
            Home
          </v-btn>
          <v-btn color="blue darken-1" text @click="userRegistration">
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase/config';
export default {
  name: "RegForm",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async userRegistration() {
      try {
        const res = await createUserWithEmailAndPassword(auth, this.user.email, this.user.password);
        console.log(res);
        if(res.user) {
          await updateProfile(auth.currentUser, {
            displayName: this.user.email
          })
        }
      } catch (error) {
         alert(error.message);
      } finally {
        this.$router.push('/login')
      }
    }
  }
};
</script>