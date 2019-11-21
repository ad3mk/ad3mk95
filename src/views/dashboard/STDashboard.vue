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
    <table class="table b-table table-striped table-hover">
      <thead>
        <tr>
          <th>Topic</th>
          <th>Title</th>
          <th>Price</th>
          <th>Time</th>
          <th>Duration</th>
          <th>By</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(activity, i) in searchResults" :key="i">
          <td>{{ activity.topic }}</td>
          <td>{{ activity.title }}</td>
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
      searchResults: []
    };
  },

  computed: {
    ...mapGetters({
      activities: "getActivities"
    })
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
