<template>
  <div class="my-4">
    <el-row class="mb-4">
      <el-col :span="12">
        <el-input
          prefix-icon="el-icon-search"
          v-model="search"
          placeholder="Type to search"
        />
      </el-col>
      <el-col :span="12">
        <el-button icon="el-icon-plus" class="ml-auto d-block" type="primary"
          >Add new</el-button
        >
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column property="name" label="Name" show-overflow-tooltip>
      </el-table-column>
      <el-table-column property="created" label="Created" show-overflow-tooltip>
      </el-table-column>
      <el-table-column property="cost" label="Cost" show-overflow-tooltip>
      </el-table-column>
      <el-table-column property="status" label="Status" show-overflow-tooltip>
        <template></template>
      </el-table-column>
      <el-table-column
        property="dateUpdated"
        label="Date updated"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rentals",
  data() {
    return {
      tableData: [
        {
          dateUpdated: "11-22-3333",
          name: "Microphone 2e45",
          created: "11-22-3333",
          cost: "$50",
          status: "Cancelled",
        },
      ],
      multipleSelection: [],
      search: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    getData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
  },
  created() {
    // this.getData();
  },
};
</script>

<style>
</style>