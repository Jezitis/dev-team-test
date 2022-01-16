<template>
  <v-card :loading="loading" class="mx-auto my-12 rounded-xl" max-width="374" min-height="520">
    <v-img height="250" :src="person.Photo" aspect-ratio="1" class="image">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      <v-row align="end" justify="start" class="fill-height mt-1 d-flex flex-column">
        <v-col cols="auto" class="pa-1 pr-3" v-for="tag in person.Tags" :key="tag.Name">
          <v-chip :color="`#${tag.Color}`" text-color="white" class="chip">
            {{ tag.Name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-img>

    <v-card-title>{{ person.Name ? person.Name : "No name" }}</v-card-title>
    <v-card-subtitle>{{
      person.Title ? person.Title : "No title"
    }}</v-card-subtitle>

    <v-card-text>
      <div class="info-block">
        <h4 class="heading">
          Profit
          <span
            class="heading__span"
            >+${{
              person.Profit[0].Amount ? person.Profit[0].Amount : 0
            }}</span
          >
        </h4>
        <v-progress-linear
          height="10"
          background-color="grey lighten-3"
          :color="person.Profit[0].Color ? `#${person.Profit[0].Color}` : black"
          :value="person.Profit[0].Amount ? person.Profit[0].Amount : 0"
          rounded
        ></v-progress-linear>
      </div>
      <div class="info-block">
        <h4 class="heading">Attention <span class="heading__span">48 h</span></h4>
        <v-row no-gutters v-if="person.Attention && person.Attention.length > 0">
          <v-col v-for="(item, index) in person.Attention" :key="index">
            <v-progress-linear
              height="10"
              background-color="grey lighten-3"
              :color="item.Color ? `#${item.Color}` : white"
              value="100"
            >
            </v-progress-linear>
          </v-col>
        </v-row>
        <v-row no-gutters v-else>
          <v-col>
            <v-progress-linear
              height="10"
              color="grey lighten-3"
              value="100"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </div>
      <div class="info-block">
        <v-row dense v-if="person.Attention && person.Attention.length > 0">
          <v-col cols="6" v-for="(item, index) in person.Attention" :key="index" class="rounded-lg">
            <v-progress-linear
              height="25"
              background-color="grey lighten-3"
              :color="item.Color ? `#${item.Color}` : white"
              :value="item.Amount ? item.Amount : 0"
              rounded
            >
            <template v-slot:default="{ value }">
              <strong style="color: white">{{ Math.ceil(value) }}%</strong>
            </template>
            </v-progress-linear>
          </v-col>
        </v-row>
        <v-row dense v-else>
          <v-col cols="12" class="rounded-lg">
            <v-progress-linear
              height="25"
              color="grey"
              :value="0"
              rounded
            >
            <template v-slot:default="{ value }">
              <strong style="color: white">{{ Math.ceil(value) }}%</strong>
            </template>
            </v-progress-linear>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Card",
  props: {
    person: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
  .chip {
    width: 80px;
    right: -40px;
    transition: right 0.2s linear;
    font-weight: 500;

    &:hover {
      right: 0px;
      transition: right 0.2s linear;
    }
  }
  .image {
    border-radius: 24px;
  }

  .info-block {
    padding-top: 16px;
  }

  .heading {
    display: flex;
    justify-content: space-between;

    &__span {
      font-weight: normal;
    }
  }
</style>