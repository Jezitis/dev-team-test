<template>
  <v-container class="fill-height ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-col cols="6">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            :disabled="!authorized"
          ></v-text-field>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
            :disabled="!authorized"
          ></v-text-field>
          <v-combobox
            v-model="tags"
            :items="availableTags"
            item-text="Name"
            deletable-chips
            label="Tags"
            multiple
            chips
            @change="$v.tags.$touch()"
            @blur="$v.tags.$touch()"
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
export default {
  name: "EditCard",
  mixins: [validationMixin],

  validations: {
    name: { required },
    title: { required },
    tags: { required },
  },

  data: () => ({
    name: "",
    title: "",
    tags: [],
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
  }),

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required && errors.push("Tags are required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
  },
  async beforeMount() {
    this.loading = true;
    try {
      const response = await fetch(
        `https://api.in.dev-team.club/people/${this.$route.params.id}`
      );
      if (response.ok) {
        let result = await response.json();
        this.name = result.Name;
        this.title = result.Title;
        this.tags = result.Tags;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>