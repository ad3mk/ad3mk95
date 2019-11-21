<template>
  <div>
    <b-row>
      <b-col>
        <b-form-input
          id="input-2"
          v-model="searchKeyword"
          type="text"
          placeholder="Search class/activity ..."
          ref="searchKeyword"
        ></b-form-input>
      </b-col>
      <b-col>
        <b-button variant="primary" @click="searchNow">Search</b-button>
      </b-col>
    </b-row>
    <br />
    <b-row v-if="searchResults.length > 0">
      <b-col md="2">
        <strong>Filter Result</strong>
      </b-col>

      <b-col md="4">
        <b-form-select
          v-model="filterTopic"
          :options="filterTopics"
          size="sm"
        ></b-form-select>
      </b-col>
      <b-col md="3">
        <span class="mr-2">Price</span>
        <b-form-input
          v-model="priceMin"
          type="number"
          placeholder="Min"
          class="small-input"
          size="sm"
        ></b-form-input>
        -
        <b-form-input
          v-model="priceMax"
          type="number"
          placeholder="Max"
          class="small-input"
          size="sm"
        ></b-form-input>
      </b-col>
      <b-col md="3">
        <span class="mr-2">Rating</span>
        <b-form-input
          v-model="ratingMin"
          type="number"
          placeholder="Min"
          class="small-input"
          size="sm"
        ></b-form-input>
        -
        <b-form-input
          v-model="ratingMax"
          type="number"
          placeholder="Max"
          class="small-input"
          size="sm"
        ></b-form-input>
      </b-col>
    </b-row>

    <table class="table b-table table-striped table-hover mt-5">
      <thead>
        <tr>
          <th>Topic</th>
          <th>Price</th>
          <th>Time</th>
          <th>Duration</th>
          <th>By</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(activity, i) in filteredResult" :key="i">
          <td>{{ activity.topic }}</td>
          <td>{{ activity.price }}</td>
          <td>{{ activity.activityTime }}</td>
          <td>{{ activity.activityLength }}</td>
          <td>{{ activity.userEmail }}</td>
          <td>
            5
            <b-button
              size="sm"
              class="mr-2"
              variant="danger"
              @click="
                deleteModal = true;
                clickedActivity = activity;
              "
            >
              Rate Now
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <br />
  </div>
</template>

<script>
import { /*mapActions, */ mapGetters } from "vuex";

export default {
  data() {
    return {
      searchKeyword: "",
      searchResults: [],
      priceMin: "",
      priceMax: "",
      ratingMin: "",
      ratingMax: "",
      filterTopic: ""
    };
  },

  computed: {
    ...mapGetters({
      activities: "getActivities"
    }),

    filteredResult() {
      //return this.searchResults;
      let fResult = this.searchResults.filter(item => {
        // filter by price
        let priceMin = parseFloat(this.priceMin);
        let priceMax = parseFloat(this.priceMax);
        let itemPrice = parseFloat(item.price);
        if (this.priceMin !== "" && this.priceMax !== "") {
          if (
            itemPrice < priceMin ||
            itemPrice > priceMax ||
            priceMin > priceMax
          ) {
            return false;
          }
        }

        // filter by topic
        if (this.filterTopic && this.filterTopic !== item.topic) {
          return false;
        }

        return true;
      });

      return fResult;
    },

    filterTopics() {
      let fTopics = [{ text: "--Select a topic--", value: "" }]; // { text: '', value: '' }
      this.searchResults.forEach(searchItem => {
        let existIndex = fTopics.findIndex(topicItem => {
          return topicItem.text === searchItem.topic;
        });

        if (existIndex === -1) {
          fTopics.push({ text: searchItem.topic, value: searchItem.topic });
        }
      });

      return fTopics;
    }
  },

  methods: {
    searchNow() {
      if (!this.searchKeyword) {
        this.searchResults = "";
        return;
      }
      this.searchResults = this.activities.filter(item => {
        return item.topic
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });
    }
  }
};
</script>

<style>
.small-input {
  width: 70px;
  display: inline;
}
</style>
