<template>
  <v-container class="fill-height ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-overlay :value="showMessage">
        <v-progress-circular v-if="loading" indeterminate size="64"></v-progress-circular>
        <v-alert type="success" v-if="!loading && success">Data updated!</v-alert>
        <v-alert type="error" v-if="!loading && errorMessage">Oops! There is an error: {{errorMessage}}</v-alert>
      </v-overlay>
      <v-col cols="6">
        <form>
          <v-text-field
            v-model="person.name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.person.name.$touch()"
            @blur="$v.person.name.$touch()"
            :disabled="!authorized"
          ></v-text-field>
          <v-text-field
            v-model="person.title"
            :error-messages="titleErrors"
            label="Title"
            required
            @input="$v.person.title.$touch()"
            @blur="$v.person.title.$touch()"
            :disabled="!authorized"
          ></v-text-field>
          <v-combobox
            v-model="person.tags"
            :items="availableTags"
            item-text="Name"
            deletable-chips
            label="Tags"
            multiple
            chips
            @change="$v.person.tags.$touch()"
            @blur="$v.person.tags.$touch()"
            :disabled="!authorized"
          ></v-combobox>
          <v-btn class="mr-4" @click="submit" :disabled="!authorized">
            submit
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
export default {
  name: "EditCard",
  mixins: [validationMixin],

  validations: {
    person: {
      name: { required },
      title: { required },
      tags: { required },
    }
  },

  data: () => ({
    token: null,
    person: {
      name: "",
      title: "",
      tags: [],
    },
    availableTags: [
      {
        Name: "C++",
        Color: "FF7E00",
      },
      {
        Name: "JS",
        Color: "8CBED6",
      },
      {
        Name: "SASS",
        Color: "3B7A57",
      },
      {
        Name: "CSS",
        Color: "960018",
      },
      {
        Name: "NPM",
        Color: "E4D00A",
      },
      {
        Name: "VueJS",
        Color: "9966CC",
      },
    ],
    loading: false,
    authorized: false,
    showMessage: false,
    success: false,
    errorMessage: null,
  }),

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.person.tags.$dirty) return errors;
      !this.$v.person.tags.required && errors.push("Tags are required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.person.name.$dirty) return errors;
      !this.$v.person.name.required && errors.push("Name is required.");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.person.title.$dirty) return errors;
      !this.$v.person.title.required && errors.push("Title is required");
      return errors;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.showMessage = true;
        this.loading = true;
        try {
          const response = await fetch(`https://api.in.dev-team.club/people/${this.$route.params.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'X-Auth-Token': `${this.token}`
            },
            body: JSON.stringify(this.person)
          });
          if (response.ok) {
            this.showMessage = true;
            this.success = true;
          }
        } catch (error) {
          this.showMessage = true;
          this.errorMessage = error.message;
        } finally {
          this.loading = false;
          setTimeout(() => {
            this.showMessage = false;
            this.errorMessage = null;
            this.success = false;
            this.$router.push("/");
          }, 2000)
        }
      }
    },
  },
  async beforeMount() {
    this.showMessage = true;
    this.loading = true;
    try {
      const response = await fetch(
        `https://api.in.dev-team.club/people/${this.$route.params.id}`
      );
      if (response.ok) {
        let result = await response.json();
        this.person.name = result.Name;
        this.person.title = result.Title;
        this.person.tags = result.Tags;
      }
      onAuthStateChanged(auth, async(user) => {
      if (user !== null) {
        this.token = await user.getIdToken();
        this.authorized = true;
      }
    })
    } catch (error) {
      this.showMessage = true;
      this.errorMessage = error.message;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = null;
      }, 2000)
    } finally {
      this.loading = false;
      this.showMessage = false;
      this.errorMessage = null;
    }
  },
};
</script>