<template>
  <div>
    <b-row>
      <b-col cols="auto" class="mr-auto p-3">
        <h3>Your class and activities</h3>
      </b-col>
      <b-col cols="auto" class="p-3">
        <b-button variant="primary" @click="addModal = true">Add New</b-button>
      </b-col>
    </b-row>
    <table class="table b-table table-striped table-hover">
      <thead>
        <tr>
          <th>Topic</th>
          <th>Price</th>
          <th>Time</th>
          <th>Duration</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(myActivity, i) in myActivities" :key="i">
          <td>{{ myActivity.topic }}</td>
          <td>{{ myActivity.price }}</td>
          <td>{{ myActivity.activityTime }}</td>
          <td>{{ myActivity.activityLength }}</td>
          <td>
            {{ myActivity.averageRating }}({{ myActivity.ratings.length }})
          </td>
          <td>
            <b-button
              size="sm"
              class="mr-2"
              variant="success"
              @click="
                editModal = true;
                clickedActivity = myActivity;
              "
              >Edit</b-button
            >
            <b-button
              size="sm"
              class="mr-2"
              variant="danger"
              @click="
                deleteModal = true;
                clickedActivity = myActivity;
              "
              >Delete</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>

    <my-modal v-model="addModal" title="Add new class/activity" width="555px">
      <div class="p-3">
        <b-form @submit="onSubmitAdd" @reset="onResetAdd">
          <b-form-group id="input-group1" label="Topic:" label-for="input-1">
            <input
              id="input-1"
              v-model="newActivity.topic"
              type="text"
              required
              placeholder="Enter Topic..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Description:"
            label-for="input-3"
          >
            <textarea
              id="input-3"
              v-model="newActivity.description"
              placeholder="Description..."
              rows="3"
              max-rows="6"
              required
              class="form-control"
            ></textarea>
          </b-form-group>

          <b-form-group id="input-group-4" label="Price:" label-for="input-4">
            <input
              id="input-4"
              v-model="newActivity.price"
              type="number"
              required
              placeholder="Enter Price..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Location:"
            label-for="input-5"
          >
            <input
              id="input-5"
              v-model="newActivity.location"
              type="text"
              required
              placeholder="Enter Location..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group id="input-group-6" label="Time:" label-for="input-6">
            <input
              id="input-6"
              v-model="newActivity.activityTime"
              type="text"
              required
              placeholder="Class/activity time..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Duration:"
            label-for="input-7"
          >
            <input
              id="input-7"
              v-model="newActivity.activityLength"
              type="text"
              required
              placeholder="Class/activity length..."
              class="form-control"
            />
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary" class="mr-3">Add</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </my-modal>

    <my-modal
      v-model="editModal"
      title="Edit this class/activity"
      width="555px"
    >
      <div class="p-3">
        <b-form @submit="onSubmitEdit">
          <b-form-group id="input-group1" label="Topic:" label-for="input-1">
            <input
              id="input-1"
              v-model="clickedActivity.topic"
              type="text"
              required
              placeholder="Enter Topic..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="edit-input-group-3"
            label="Description:"
            label-for="edit-input-3"
          >
            <b-form-textarea
              id="edit-input-3"
              v-model="clickedActivity.description"
              placeholder="Description..."
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="edit-input-group-4"
            label="Price:"
            label-for="edit-input-4"
          >
            <input
              id="edit-input-4"
              v-model="clickedActivity.price"
              type="number"
              required
              placeholder="Enter Price..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="edit-input-group-5"
            label="Location:"
            label-for="edit-input-5"
          >
            <input
              id="edit-input-5"
              v-model="clickedActivity.location"
              type="text"
              required
              placeholder="Enter Location..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="edit-input-group-6"
            label="Time:"
            label-for="edit-input-6"
          >
            <input
              id="edit-input-6"
              v-model="clickedActivity.activityTime"
              type="text"
              required
              placeholder="Class/activity time..."
              class="form-control"
            />
          </b-form-group>

          <b-form-group
            id="edit-input-group-7"
            label="Duration:"
            label-for="edit-input-7"
          >
            <input
              id="edit-input-7"
              v-model="clickedActivity.activityLength"
              type="text"
              required
              placeholder="Class/activity length..."
              class="form-control"
            />
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary" class="mr-3">Save</b-button>
        </b-form>
      </div>
    </my-modal>

    <my-modal v-model="deleteModal" width="444px" title="Are you sure?">
      <div class="p-2">
        <p>Do you really want to delete '{{ clickedActivity.topic }}'</p>
        <b-button
          type="submit"
          variant="primary"
          class="mr-3"
          @click="deleteActivityNow"
          >Yes</b-button
        >
        <b-button type="reset" variant="danger" @click="deleteModal = false"
          >No</b-button
        >
      </div>
    </my-modal>

    <b-alert
      show
      v-if="errorMessage"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
    >
      <p class="text-center mrb-0">{{ errorMessage }}</p>
    </b-alert>

    <b-alert
      show
      v-if="successMessage"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="success"
    >
      <p class="text-center mrb-0">{{ successMessage }}</p>
    </b-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      form: {},
      newActivity: {
        id: "",
        topic: "",
        description: "",
        price: "",
        location: "",
        activityTime: "",
        activityLength: "",
        userEmail: ""
      },
      clickedActivity: {},
      errorMessage: "",
      successMessage: ""
    };
  },
  mounted() {
    // add new field averageRating to all activity
    setTimeout(() => {
      this.activities.forEach(item => {
        this.calculateAverageRating(item);
      });
    }, 1000);
  },

  computed: {
    //get data from store
    ...mapGetters({
      activities: "getActivities",
      userEmail: "getLoggedUserEmail"
    }),

    // activities created by me
    myActivities() {
      let onlyMyActivities = this.activities.filter(item => {
        return item.userEmail === this.userEmail;
      });
      return onlyMyActivities;
    }
  },

  methods: {
    // map store actions
    ...mapActions({
      addActivity: "addActivity",
      deleteActivity: "deleteActivity",
      editActivity: "editActivity"
    }),

    onSubmitAdd(evt) {
      this.errorMessage = "";
      evt.preventDefault();

      // create an id for uniquely identifying the activity
      this.newActivity.id = "id" + Date.now() + Math.floor(Math.random() * 100);

      this.newActivity.userEmail = this.userEmail;
      this.newActivity.ratings = [];

      //disspatch/call store method
      this.addActivity(this.newActivity);
      this.addModal = false;
      this.onResetAdd();

      this.successMessage = "Added successfully!";
    },

    onResetAdd(evt) {
      // prevent submitting the form
      if (evt) {
        evt.preventDefault();
      }

      // Reset our form values
      this.newActivity = {
        id: "",
        topic: "",
        description: "",
        price: "",
        location: "",
        activityTime: "",
        activityLength: "",
        userEmail: ""
      };
    },

    onSubmitEdit(evt) {
      this.errorMessage = "";
      evt.preventDefault();

      this.editActivity(this.clickedActivity);
      this.successMessage = "Activity edited successfully!";
      this.editModal = false;
    },

    deleteActivityNow() {
      this.deleteModal = false;
      this.deleteActivity(this.clickedActivity.id);
      this.successMessage = "Deleted successfully!";
    },

    calculateAverageRating(activity) {
      let averageRating = 0;

      if (activity.ratings.length > 0) {
        let totalRating = 0;

        // calculate the sum of all ratings
        activity.ratings.forEach(rating => {
          totalRating += parseInt(rating.value);
        });

        // calculate average rating
        averageRating = totalRating / activity.ratings.length;

        // Round to two decimal place
        averageRating = averageRating.toFixed(2);
      }
      activity.averageRating = averageRating;
    }
  },

  watch: {
    errorMessage: function(newVal) {
      if (newVal) {
        // Automatically hide message after 2 seconds
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
    },

    successMessage: function(newVal) {
      if (newVal) {
        // Automatically hide message after 2 seconds
        setTimeout(() => {
          this.successMessage = "";
        }, 2000);
      }
    }
  }
};
</script>
