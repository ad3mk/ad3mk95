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
				<b-button variant="primary">Search</b-button>
			</b-col>
		</b-row>

		<br />
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchKeyword: ""
		};
	}
};
</script>