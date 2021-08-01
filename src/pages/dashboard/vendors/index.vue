<template>
  <div class="w-100">
    <div>
      <div class="row">
        <!-- <div class="col-md-3">
          <el-select
            class="w-100 mb-3"
            v-model="sortValue"
            placeholder="Sort By"
          >
            <el-option class="w-100" label="Action" value="Action"> </el-option>
          </el-select>
        </div> -->
        <div class="col-md-10">
          <el-input
            v-model="search"
            class="d-inline-block mb-3"
            placeholder="Type to search"
            auto-complete="on"
          />
        </div>
      </div>
      <el-table
        v-loading="loadingUsers"
        :default-sort="{ prop: 'createdAt', order: 'descending' }"
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.fullname.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="row">
              <div class="col-md-6">
                <p>Full Name: {{ props.row.fullname}}</p>
                <p>Email: {{ props.row.email }}</p>
                <p>Mobile Number: {{ props.row.mobileNumber}}</p>
                <p>Business Name: {{ props.row.businessName}}</p>
                <p>Created At: {{ props.row.createdAt | toLocaleDate }}</p>
                <p>Location: {{ props.row.location }}</p>
                <p>Vendor Payout Percentage: {{ props.row.vendorPayoutPercentage}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Users" prop="fullname" sortable>
        </el-table-column>
        <el-table-column label="Created" prop="createdAt" sortable>
          <template slot-scope="scope">{{
            scope.row.createdAt | toLocaleDate
          }}</template>
        </el-table-column>
        <el-table-column label="Business Name" prop="businessName"> </el-table-column>
        <el-table-column label="location" prop="location"> </el-table-column>
        <el-table-column label="Email" prop="email"> </el-table-column>
        <el-table-column label="Payout Percentage" prop="vendorPayoutPercentage"> </el-table-column>
        <el-table-column label="Change %">
            <template slot-scope="scope">
            <el-input
            v-model="percentage"
            class="d-inline-block mb-3"
            placeholder="Type to search"
            auto-complete="on"
          />
          <el-button
              size="mini"
              type="success"
              @click="verifyTicket(scope.row._id, percentage)"
              >Change</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tickets from "@/helpers/tickets/index";
import users from "@/helpers/users/index";
export default {
  name: "tickets",
  data() {
    return {
      loadingUsers: false,
      tableData: [],
      search: "",
      sortValue: "",
      showInput:false,
      percentage:"",
      selectedUser: "",
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
    async getUsers() {
      this.loadingUsers = true;
      try {
        const response = await users.getUsers(this.$axios);
        const data = response.data.data;
        this.tableData = data.Users;
        this.loadingUsers = false;
      } catch (error) {
        console.error(error);
        this.loadingUsers = false;
      }
    },
    verifyTicket(ticketId) {
      this.$confirm(
        <el-input
            class="d-inline-block mb-3"
            placeholder="Type to search"
            auto-complete="on"
          />,
        "Change Payout percentage",
        {
          confirmButtonText: "Verify",
          cancelButtonText: "Cancel",
        }
      )
        .then(async () => {
          try {
            await tickets.verifyTicket(this.$axios, ticketId);
            this.getTickets();
          } catch (error) {
            console.error(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Verify ticket cancelled",
          });
        });
    },
    revokeTicket(ticketId) {
      this.$confirm(
        "Are you sure you want to revoke this ticket?",
        "Revoke Ticket",
        {
          confirmButtonText: "Revoke",
          cancelButtonText: "Cancel",
        }
      )
        .then(async () => {
          try {
            await tickets.revokeTicket(this.$axios, ticketId);
            this.getTickets();
          } catch (error) {
            console.error(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Revoke ticket cancelled",
          });
        });
    },
    showsInput(){
        this.loading = true;
    }
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
p.verifiedStatus {
  padding: 0 0.5em;
  border-radius: 3px;
  width: max-content;
}
.verified {
  background-color: rgb(134, 252, 140);
  border: 1px solid rgb(55, 196, 0);
}
.revoke {
  background-color: rgb(255, 255, 21);
  border: 1px solid rgb(230, 149, 0);
}
img.ticketCover {
  height: 300px;
  width: auto;
}
</style>