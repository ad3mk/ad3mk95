<template>
	<div>
		<b-row>
			<b-col cols="auto" class="mr-auto p-3">
				<h3>Your class and activities</h3>
			</b-col>
			<b-col cols="auto" class="p-3">
				<b-button variant="success">Add New</b-button>
			</b-col>
		</b-row>
		<table class="table b-table table-striped table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>1</td>
					<td>Rimon</td>
				</tr>

				<tr>
					<td>1</td>
					<td>Rimon</td>
				</tr>

				<tr>
					<td>1</td>
					<td>Rimon</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ age: 40, first_name: "Dickerson", last_name: "Macdonald" },
				{ age: 21, first_name: "Larsen", last_name: "Shaw" },
				{ age: 89, first_name: "Geneva", last_name: "Wilson" },
				{ age: 38, first_name: "Jami", last_name: "Carney" }
			]
		};
	}
};
</script>