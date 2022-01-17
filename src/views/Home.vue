<template>
  <v-container>
    <v-row>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-col cols="3" v-for="person in persons" :key="person.Id">
        <router-link :to="`edit/${person.Id}`">
          <card :person="person" :loading="loading" />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      persons: [],
      loading: false,
      currentPage: 0,
      allLoaded: false,
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.in.dev-team.club/people?pp=8&p=${this.currentPage}`
        );
        if (response.ok) {
          let result = await response.json();
          if (result.length > 0) {
            result.forEach((item) => this.persons.push(item));
          } else this.allLoaded = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.currentPage++;
      }
    },
  },
  async beforeMount() {
    this.getData();
  },
  async mounted() {
    window.onscroll = async () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.allLoaded) {
        this.getData();
      }
    };
  },
};
</script>