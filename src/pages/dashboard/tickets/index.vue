<template>
  <div class="w-100">
    <div>
      <div class="row">
        <div class="col-md-3">
          <el-select
            class="w-100 mr-3 mb-3"
            v-model="value"
            placeholder="Select"
          >
            <el-option class="w-100" label="Action" value="Action"> </el-option>
          </el-select>
        </div>
        <div class="col-md-3">
          <el-select
            class="w-100 mr-3 mb-3"
            v-model="value"
            placeholder="Select"
          >
            <el-option class="w-100" label="Action" value="Action"> </el-option>
          </el-select>
        </div>
        <div class="col-md-4">
          <el-input
            v-model="search"
            class="d-inline-block mb-3 w-auto mr-3"
            placeholder="Type to search"
            auto-complete="on"
          />
        </div>
        <div class="col-md-2">
          <el-button type="primary" class="w-100">New Ticket</el-button>
        </div>
      </div>

      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>Name: {{ props.row.name }}</p>
            <p>Created: {{ props.row.created }}</p>
            <p>venue: {{ props.row.venue }}</p>
            <p>Status: {{ props.row.status }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column label="Created" prop="created"> </el-table-column>
        <el-table-column label="Cost" prop="cost"> </el-table-column>
        <el-table-column label="Venue" prop="venue"> </el-table-column>
        <el-table-column label="Status" prop="status"> </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Accept</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Revoke</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "tickets",
  data() {
    return {
      tableData: [
        {
          created: "2016-05-03",
          name: "Tom",
          cost: "$1200",
          venue: "Online",
          status: "Revoked",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style>
</style>