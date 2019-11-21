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
          <th>Title</th>
          <th>Price</th>
          <th>Time</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(myActivity, i) in myActivities" :key="i">
          <td>{{ myActivity.topic }}</td>
          <td>{{ myActivity.title }}</td>
          <td>{{ myActivity.price }}</td>
          <td>{{ myActivity.activityTime }}</td>
          <td>{{ myActivity.activityLength }}</td>
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

    <b-modal
      id="add-modal"
      scrollable
      title="Add new class/activity"
      v-model="addModal"
      size="lg"
      hide-footer
      centered
    >
      <div class="p-3">
        <b-form @submit="onSubmitAdd" @reset="onResetAdd">
          <b-form-group id="input-group-1" label="Topic:" label-for="input-1">
            <b-form-select
              id="input-1"
              v-model="newActivity.topic"
              :options="topics"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-2" label="Title:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="newActivity.title"
              type="text"
              required
              placeholder="Enter Title..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Description:"
            label-for="input-3"
          >
            <b-form-textarea
              id="input-3"
              v-model="newActivity.description"
              placeholder="Description..."
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group id="input-group-4" label="Price:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="newActivity.price"
              type="number"
              required
              placeholder="Enter Price..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Location:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="newActivity.location"
              type="text"
              required
              placeholder="Enter Location..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-6" label="Time:" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="newActivity.activityTime"
              type="text"
              required
              placeholder="Class/activity time..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Duration:"
            label-for="input-7"
          >
            <b-form-input
              id="input-7"
              v-model="newActivity.activityLength"
              type="text"
              required
              placeholder="Class/activity length..."
            ></b-form-input>
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary" class="mr-3">Add</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      id="edit-modal"
      scrollable
      title="Edit this class/activity"
      v-model="editModal"
      size="lg"
      hide-footer
      centered
    >
      <div class="p-3">
        <b-form @submit="onSubmitEdit">
          <b-form-group
            id="edit-input-group-1"
            label="Topic:"
            label-for="edit-input-1"
          >
            <b-form-select
              id="edit-input-1"
              v-model="clickedActivity.topic"
              :options="topics"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="edit-input-group-2"
            label="Title:"
            label-for="edit-input-2"
          >
            <b-form-input
              id="edit-input-2"
              v-model="clickedActivity.title"
              type="text"
              required
              placeholder="Enter Title..."
            ></b-form-input>
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
            <b-form-input
              id="edit-input-4"
              v-model="clickedActivity.price"
              type="number"
              required
              placeholder="Enter Price..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="edit-input-group-5"
            label="Location:"
            label-for="edit-input-5"
          >
            <b-form-input
              id="edit-input-5"
              v-model="clickedActivity.location"
              type="text"
              required
              placeholder="Enter Location..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="edit-input-group-6"
            label="Time:"
            label-for="edit-input-6"
          >
            <b-form-input
              id="edit-input-6"
              v-model="clickedActivity.activityTime"
              type="text"
              required
              placeholder="Class/activity time..."
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="edit-input-group-7"
            label="Duration:"
            label-for="edit-input-7"
          >
            <b-form-input
              id="edit-input-7"
              v-model="clickedActivity.activityLength"
              type="text"
              required
              placeholder="Class/activity length..."
            ></b-form-input>
          </b-form-group>

          <br />
          <b-button type="submit" variant="primary" class="mr-3">Save</b-button>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      id="delete-modal"
      scrollable
      title="Are you sure?"
      v-model="deleteModal"
      size="sm"
      hide-footer
      centered
    >
      <div class="p-2">
        <p>Do you really want to delete '{{ clickedActivity.title }}'</p>
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
    </b-modal>

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
        title: "",
        description: "",
        price: "",
        location: "",
        activityTime: "",
        activityLength: "",
        userEmail: ""
      },
      clickedActivity: {},
      topics: [
        { value: "", text: "--Select--" },
        { value: "Math", text: "Math" },
        { value: "English", text: "English" },
        { value: "Sports Club", text: "Sports Club" }
      ],
      errorMessage: "",
      successMessage: ""
    };
  },

  computed: {
    ...mapGetters({
      activities: "getActivities",
      userEmail: "getLoggedUserEmail"
    }),
    myActivities() {
      let onlyMyActivities = this.activities.filter(item => {
        return item.userEmail === this.userEmail;
      });

      return onlyMyActivities;
    }
  },

  methods: {
    ...mapActions({
      addActivity: "addActivity",
      deleteActivity: "deleteActivity",
      editActivity: "editActivity"
    }),
    onSubmitAdd(evt) {
      this.errorMessage = "";
      evt.preventDefault();
      this.newActivity.id = "id" + Date.now() + Math.floor(Math.random() * 100);
      this.newActivity.userEmail = this.userEmail;
      this.newActivity.ratings = [];
      this.addActivity(this.newActivity);
      this.addModal = false;
      this.onResetAdd();
      this.successMessage = "Added successfully!";
    },
    onResetAdd(evt) {
      if (evt) {
        evt.preventDefault();
      }

      // Reset our form values
      this.newActivity = {
        id: "",
        topic: "",
        title: "",
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
    }
  },

  watch: {
    errorMessage: function(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
    },

    successMessage: function(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.successMessage = "";
        }, 2000);
      }
    }
  }
};
</script>
