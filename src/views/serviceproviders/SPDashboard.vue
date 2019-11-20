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
				<tr v-for="i in 9" :key="i">
					<td>Math</td>
					<td>Math class 1</td>
					<td>$1200</td>
					<td>12 November, 12:08 PM</td>
					<td>1 hour</td>
					<td>
						<b-button size="sm" class="mr-2" variant="success" @click="editModal = true">Edit</b-button>
						<b-button size="sm" class="mr-2" variant="danger" @click="deleteModal = true">Delete</b-button>
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
				<b-form @submit="onSubmit" @reset="onReset">
					<b-form-group id="input-group-1" label="Email address:" label-for="input-1">
						<b-form-input
							id="input-1"
							v-model="form.email"
							type="email"
							required
							placeholder="Enter email"
							ref="email"
						></b-form-input>
					</b-form-group>

					<b-form-group id="input-group-2" label="Password:" label-for="input-2">
						<b-form-input
							id="input-2"
							v-model="form.password"
							type="password"
							required
							placeholder="Enter password"
							ref="password"
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
				<b-form @submit="onSubmit" @reset="onReset">
					<b-form-group id="input-group-1" label="Email address:" label-for="input-1">
						<b-form-input
							id="input-1"
							v-model="form.email"
							type="email"
							required
							placeholder="Enter email"
							ref="email"
						></b-form-input>
					</b-form-group>

					<b-form-group id="input-group-2" label="Password:" label-for="input-2">
						<b-form-input
							id="input-2"
							v-model="form.password"
							type="password"
							required
							placeholder="Enter password"
							ref="password"
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
			title="Are you sure?"
			v-model="deleteModal"
			size="sm"
			hide-footer
			centered
		>
			<div class="p-2">
				<p>Do you really want to delete this activity/class?</p>
				<b-button type="submit" variant="primary" class="mr-3">Yes</b-button>
				<b-button type="reset" variant="danger">No</b-button>
			</div>
		</b-modal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			addModal: false,
			editModal: false,
			deleteModal: false,
			form: {}
		};
	},

	methods: {
		onSubmit(evt) {
			this.errorMessage = "";
			evt.preventDefault();

			// alert(JSON.stringify(this.form));
			let existIndex = this.users.findIndex(user => {
				return user.email === this.form.email;
			});

			if (existIndex === -1) {
				this.errorMessage = "Email not registered!";
				this.$refs.email.focus();
				return;
			}

			if (this.users[existIndex].password !== this.form.password) {
				this.errorMessage = "Wrong password!";
				this.$refs.password.focus();
				return;
			}

			this.login(this.users[existIndex]);

			this.successMessage = "Logged in successfully!";
			this.$router.push("/dashboard");
			// this.onReset();
		},
		onReset(evt) {
			if (evt) {
				evt.preventDefault();
			}

			// Reset our form values
			this.form.email = "";
			this.form.name = "";
			this.form.role = "Student";
			this.form.password = "";
			this.form.cPassword = "";
			// Trick to reset/clear native browser form validation state
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		}
	}
};
</script>