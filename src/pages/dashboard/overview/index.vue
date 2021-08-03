<template>
  <div class="w-100">
      <div class="row ">
        <div class="w-100 display-flex ">
            <el-card class="box-card col-md-3 " style="min-height: 300px;" align="middle" οnclick="">
              <div class="el-card__body mid">
                <h1>Revenue</h1>
                <div class="content-flex">
                  <h3>&#8358;</h3>
                  <h3>{{tableData.revenue}}</h3>

                </div>
              </div>
            </el-card>
            <el-card class="box-card col-md-4" style="min-height: 300px;" align="middle" οnclick="">
              <div class="el-card__body mid">
                <h1>Total Number of Tickets</h1>
                <div class="content mid">
                  <h3>{{tableData.ticket}}</h3>

                </div>
              </div>
            </el-card>
            <el-card class="box-card col-md-4" style="min-height: 300px;" align="middle" οnclick="">
              <div class="el-card__body mid">
                <h1>Total Number of Vendors</h1>
                <div class="content  mid">
                  <h3>{{tableData.vendors}}</h3>

                </div>
              </div>
            </el-card>
        </div>
          <div class="w-100 display-flex ">
            <el-card class="box-card col-md-4 " style="min-height: 500px;" align="middle" οnclick="">
              <div class="el-card__body mid">
                <h1>Number of Registered Customers</h1>
                 <div class="content  mid">
                  <h3>{{tableData.customers}}</h3>

                </div>
              </div>
            </el-card>
            <el-card class="box-card col-md-8" style="min-height: 500px;" align="middle" οnclick="">
              <div class="el-card__body mid">
                <h1>Best Selling Tickets</h1>
              </div>
            </el-card>
        </div>
      </div>
  </div>
</template>

<script>
import profile from "@/helpers/overview/index";
export default {
    name: 'overview',
     data() {
    return {
      loadingOverview: false,
      tableData: null,
    };
  },
  filters: {
    toLocaleDate: function (dateString) {
      if (!dateString) return "";
      dateString = new Date(dateString).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return dateString;
    },
    verifiedStatus: function (verifiedStatus) {
      if (!verifiedStatus) {
        return "Unverified";
      } else {
        return "Verified";
      }
    },
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getOverview() {
      this.loadingOverview = true;
      try {
        const response = await profile.getOverview(this.$axios);
        const data = response.data.data;
        this.tableData = data;
        this.loadingOverview = false;
      } catch (error) {
        console.error(error);
        this.loadingOverview = false;
      }
    }
  },
  created() {
    this.getOverview();
  },
}
</script>

<style scoped>
   .el-card {
    margin-right: 20px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
  }
  .display-flex{
    display: flex;
    padding: 40px;
    justify-content: space-between;
  }
  .content{
    margin-top:50px;
    align-content: center;
    text-align: center;
    font-size:30px;
  }
  .content-flex{
    margin-top:80px;
    display:flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    margin:auto;
    font-size:30px;
  }
  .content span, .content-flex span{
    font-size:20px;
  }
</style>