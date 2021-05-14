<template>
  <div class="w-100">
    <div>
      <div class="row">
        <div class="col-md-3">
          <el-select
            class="w-100 mb-3"
            v-model="sortValue"
            placeholder="Sort By"
          >
            <el-option class="w-100" label="Action" value="Action"> </el-option>
          </el-select>
        </div>
        <div class="col-md-7">
          <el-input
            v-model="search"
            class="d-inline-block mb-3"
            placeholder="Type to search"
            auto-complete="on"
          />
        </div>
        <div class="col-md-2">
          <Newticket />
        </div>
      </div>

      <el-table
        v-loading="loadingTickets"
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.eventName.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="row">
              <div class="col-md-6">
                <p>Event Name: {{ props.row.eventName }}</p>
                <p>Category: {{ props.row.category }}</p>
                <p>Created At: {{ props.row.createdAt | toLocaleDate }}</p>
                <p>Event Venue: {{ props.row.eventVenue }}</p>
                <p>Event Address: {{ props.row.venueAddress }}</p>
                <p>Status: {{ props.row.verified | verifiedStatus }}</p>
                <p>Start Selling: {{ props.row.ticketSaleStartDate }}</p>
                <p>Stop Selling: {{ props.row.ticketSaleEndDate }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Event Name" prop="eventName"> </el-table-column>
        <el-table-column label="Created" prop="createdAt">
          <template slot-scope="scope">{{
            scope.row.createdAt | toLocaleDate
          }}</template>
        </el-table-column>
        <el-table-column label="Category" prop="category"> </el-table-column>
        <el-table-column label="Venue" prop="eventVenue"> </el-table-column>
        <el-table-column label="Status" prop="verified">
          <template slot-scope="scope"
            ><p
              class="verifiedStatus"
              v-bind:class="{
                verified: scope.row.verified,
                revoke: !scope.row.verified,
              }"
            >
              {{ scope.row.verified | verifiedStatus }}
            </p></template
          >
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.verified"
              size="mini"
              type="success"
              @click="verifyTicket(scope.row._id)"
              >Verify ticket</el-button
            >
            <el-button
              v-else
              size="mini"
              @click="revokeTicket(scope.row._id)"
              type="secondary"
              >Revoke ticket</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tickets from "@/helpers/tickets/index";
import Newticket from "@/components/newTicket/index";
export default {
  name: "tickets",
  components: {
    Newticket,
  },
  data() {
    return {
      loadingTickets: false,
      tableData: [],
      search: "",
      sortValue: "",
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
    async getTickets() {
      this.loadingTickets = true;
      try {
        const response = await tickets.getAllTickets(this.$axios);
        const data = response.data.data;
        this.tableData = data.tickets;
        this.loadingTickets = false;
      } catch (error) {
        console.error(error);
        this.loadingTickets = false;
      }
    },
    verifyTicket(ticketId) {
      this.$confirm(
        "Are you sure you want to verify this ticket?",
        "Verify Ticket",
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
            await tickets.verifyTicket(this.$axios, ticketId);
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
  },
  created() {
    this.getTickets();
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
</style>