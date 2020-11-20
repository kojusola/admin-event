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
        <el-button
          icon="el-icon-plus"
          @click="newRentalDialog = true"
          class="ml-auto d-block"
          type="primary"
          >Add New</el-button
        >
        <el-dialog title="New Rental" :visible.sync="newRentalDialog" :close-on-click-modal="false" :close-on-press-escape="false">
          <el-upload
              class="upload-demo"
              :auto-upload="false"
              :on-remove="handleRemove"
              :file-list="imageList"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
          <el-form
            :rules="rules"
            :model="newRentalForm"
            ref="newRentalForm"
            status-icon
            :label-position="'top'"
          >
            <el-form-item label="Name" prop="name">
              <el-input
                v-model="newRentalForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <div class="row">
              <div class="col-6">
                <el-form-item label="Price" prop="price">
                  <el-input
                    class="price_input"
                    v-model="newRentalForm.price"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-6">
                <el-form-item label="quantity">
                  <el-input-number
                    class="w-100"
                    v-model="newRentalForm.quantity"
                    :min="1"
                    :max="100"
                  ></el-input-number>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="Description" prop="description">
              <el-input
                type="textarea"
                v-model="newRentalForm.description"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <div class="d-flex justify-content-between">
              <el-button @click="cancelForm('newRentalForm')">Cancel</el-button>
              <el-button type="primary" @click="submitForm('newRentalForm')">Create</el-button>
            </div>
          </el-form>
        </el-dialog>
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
      newRentalDialog: false,
      imageList: [],
      newRentalForm: {
        name: "",
        price: "",
        quantity: 1,
        description: "",
        image: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "product name is required",
            trigger: ["blur", "change"],
          },
          { min: 3, message: "name is too short", trigger: ["blur", "change"] },
        ],
        price: [
          { required: true, message: "price is required", trigger: ["blur", "change"] },
        ],
        description: [
          {
            required: true,
            message: "product description is required",
            trigger: ["blur", "change"],
          },
          { min: 3, message: "description is too short", trigger: ["blur", "change"] },
        ],
      },
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
    submitForm(rentalsForm) {
      this.$refs[rentalsForm].validate((valid) => {
        if (valid) {
          this.$message({
            message: "Product created",
            type: "success",
          });
          console.log(this.newRentalForm, this.imageList)
        } else {
          this.$message.error("Oops, Something is not right");
          return false;
        }
      });
    },
    async cancelForm(rentalsForm){
          this.$confirm(`All information will be lost. Close?`).then(()=> {
              this.newRentalDialog = false
              this.$refs[rentalsForm].resetFields();
              this.$message({
                  type: 'info',
                  message: 'Create Rental cancelled'
                }); 
          }).catch(()=> {});
    },
    handleRemove(image, imageList){
      console.log(this.imageList, image, imageList)
    }
    
  },
  created() {
    // this.getData();
  },
};
</script>

<style scoped lang="scss">
</style>
