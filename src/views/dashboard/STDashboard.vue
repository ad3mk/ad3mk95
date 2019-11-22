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
        <strong class="m-1">Filter Result</strong>
      </b-col>

      <b-col md="2">
        <b-form-select v-model="filterTopic" :options="filterTopics" size="sm" class="m-1"></b-form-select>
      </b-col>
      <b-col md="4">
        <span class="m-1 mr-2">Price</span>
        <b-form-input
          v-model="priceMin"
          type="number"
          placeholder="Min"
          class="small-input m-1"
          size="sm"
        ></b-form-input>-
        <b-form-input
          v-model="priceMax"
          type="number"
          placeholder="Max"
          class="small-input m-1"
          size="sm"
        ></b-form-input>
      </b-col>
      <b-col md="4">
        <span class="m-1 mr-2">Rating</span>
        <b-form-input
          v-model="ratingMin"
          type="number"
          placeholder="Min"
          class="small-input m-1"
          size="sm"
        ></b-form-input>-
        <b-form-input
          v-model="ratingMax"
          type="number"
          placeholder="Max"
          class="small-input m-1 mr-3"
          size="sm"
        ></b-form-input>

        <span class="clear-filter" title="clear filter" @click="clearFilter">x</span>
      </b-col>
    </b-row>
    <table class="table b-table table-striped table-hover mt-5" v-if="filteredResult.length > 0">
      <thead>
        <tr>
          <th @click="sortBy('topic')" class="sortable">
            Topic
            <span
              class="arrow-up"
              v-if="sorting.sortBy === 'topic' && sorting.order === 'descending'"
            ></span>

            <span
              class="arrow-down"
              v-if="sorting.sortBy === 'topic' && sorting.order === 'ascending'"
            ></span>
          </th>
          <th @click="sortBy('price')" class="sortable">
            Price
            <span
              class="arrow-up"
              v-if="sorting.sortBy === 'price' && sorting.order === 'descending'"
            ></span>

            <span
              class="arrow-down"
              v-if="sorting.sortBy === 'price' && sorting.order === 'ascending'"
            ></span>
          </th>
          <th>Time</th>
          <th>Duration</th>
          <th>By</th>
          <th @click="sortBy('rating')" class="sortable">
            Rating
            <span
              class="arrow-up"
              v-if="sorting.sortBy === 'rating' && sorting.order === 'descending'"
            ></span>

            <span
              class="arrow-down"
              v-if="sorting.sortBy === 'rating' && sorting.order === 'ascending'"
            ></span>
          </th>
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
            {{ activity.averageRating }} ({{ activity.ratings.length }})
            <b-button
              size="sm"
              class="mr-2 ml-3"
              variant="success"
              @click="
                ratingModal = true;
                clickedActivity = activity;
              "
            >Rate Now</b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <br />

    <my-modal title="Rate this class/activity" v-model="ratingModal" width="444px">
      <div class="p-2">
        <p>Current average rating is {{ clickedActivity.averageRating }} ({{clickedActivity.ratings.length}})</p>

        <p>
          Your Rating:
          <span v-if="myGivenRating > -1">
            {{ myGivenRating }}
            <br />(Your rating can not be changed)
          </span>
        </p>
        <!-- <star-rating
          @rated="giveRating($event)"
          :rating="myRating"
          v-if="myGivenRating === -1"
        ></star-rating>-->

        <my-rating @rated="giveRating($event)" :rating="myRating" v-if="myGivenRating === -1"></my-rating>
      </div>
    </my-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      searchKeyword: "",
      searchResults: [],
      priceMin: "",
      priceMax: "",
      ratingMin: "",
      ratingMax: "",
      filterTopic: "",
      ratingModal: false,
      clickedActivity: {
        ratings: []
      },
      myRating: 0,
      sorting: {
        sortBy: "none",
        order: "ascending"
      }
    };
  },

  computed: {
    //get data from store
    ...mapGetters({
      activities: "getActivities",
      loggedUserEmail: "getLoggedUserEmail"
    }),

    myGivenRating() {
      let myGivenRating = -1; // Not rated by me yet

      // Not selected any activity
      if (!this.clickedActivity.id) {
        return myGivenRating;
      }

      let givenIndex = this.clickedActivity.ratings.findIndex(item => {
        return item.userEmail === this.loggedUserEmail;
      });

      // Already rated
      if (givenIndex > -1) {
        myGivenRating = this.clickedActivity.ratings[givenIndex].value;
      }

      return myGivenRating;
    },

    filteredResult() {
      let fResult = this.searchResults.filter(item => {
        // filter by topic
        if (this.filterTopic && this.filterTopic !== item.topic) {
          return false;
        }

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

        // filter by rating
        let ratingMin = parseFloat(this.ratingMin);
        let ratingMax = parseFloat(this.ratingMax);
        let averageRating = parseFloat(item.averageRating);
        if (this.ratingMin !== "" && this.ratingMax !== "") {
          if (
            averageRating < ratingMin ||
            averageRating > ratingMax ||
            ratingMin > ratingMax
          ) {
            return false;
          }
        }

        return true;
      });

      // sort by topic
      if (
        this.sorting.sortBy === "topic" &&
        this.sorting.order === "ascending"
      ) {
        fResult.sort((a, b) => {
          if (a.topic < b.topic) {
            return -1;
          }
          if (a.topic > b.topic) {
            return 1;
          }

          return 0;
        });
      } else if (
        this.sorting.sortBy === "topic" &&
        this.sorting.order === "descending"
      ) {
        fResult.sort((a, b) => {
          if (a.topic < b.topic) {
            return 1;
          }
          if (a.topic > b.topic) {
            return -1;
          }

          return 0;
        });
      }

      // sort by price
      if (
        this.sorting.sortBy === "price" &&
        this.sorting.order === "ascending"
      ) {
        fResult.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } else if (
        this.sorting.sortBy === "price" &&
        this.sorting.order === "descending"
      ) {
        fResult.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      }

      // sort by rating
      if (
        this.sorting.sortBy === "rating" &&
        this.sorting.order === "ascending"
      ) {
        fResult.sort((a, b) => {
          return parseFloat(a.averageRating) - parseFloat(b.averageRating);
        });
      } else if (
        this.sorting.sortBy === "rating" &&
        this.sorting.order === "descending"
      ) {
        fResult.sort((a, b) => {
          return parseFloat(b.averageRating) - parseFloat(a.averageRating);
        });
      }

      return fResult;
    },

    filterTopics() {
      // get list of topics of search results
      let fTopics = [{ text: "--Select topic--", value: "" }]; // { text: '', value: '' }
      this.searchResults.forEach(searchItem => {
        let existIndex = fTopics.findIndex(topicItem => {
          return topicItem.text === searchItem.topic;
        });

        // Not added the topic
        if (existIndex === -1) {
          fTopics.push({ text: searchItem.topic, value: searchItem.topic });
        }
      });

      return fTopics;
    }
  },

  methods: {
    // mat store actions/methods
    ...mapActions({
      editActivity: "editActivity"
    }),

    searchNow() {
      if (!this.searchKeyword) {
        this.searchResults = [];
        return;
      }

      this.searchResults = this.activities.filter(item => {
        // case insensitive search
        return item.topic
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });

      // Calculate average rating
      this.searchResults.forEach(result => {
        this.calculateAverageRating(result);
      });
    },

    calculateAverageRating(activity) {
      let averageRating = 0;

      if (activity.ratings.length > 0) {
        let totalRating = 0;

        activity.ratings.forEach(rating => {
          totalRating += parseInt(rating.value);
        });

        averageRating = totalRating / activity.ratings.length;
      }
      activity.averageRating = averageRating;
    },

    clearFilter() {
      this.priceMin = "";
      this.priceMax = "";
      this.ratingMin = "";
      this.ratingMax = "";
      this.filterTopic = "";
    },

    giveRating(r) {
      this.clickedActivity.ratings.push({
        userEmail: this.loggedUserEmail,
        value: r
      });

      // Update the activity on store with ratings
      this.editActivity(this.clickedActivity);

      // Recalculate new average ratings
      this.calculateAverageRating(this.clickedActivity);
    },

    sortBy(by) {
      this.sorting.sortBy = by;
      this.sorting.order =
        this.sorting.order === "ascending" ? "descending" : "ascending";
    }
  }
};
</script>
