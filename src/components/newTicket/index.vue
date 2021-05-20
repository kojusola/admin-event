<template>
  <div class="d-flex justify-content-end">
    <el-button
      type="primary"
      size="medium"
      class="ml-auto w-100"
      icon="el-icon-plus"
      @click="dialogVisible = true"
      ref="openDialogBtn"
      >create new</el-button
    >
    <el-dialog
      title="New Ticket"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-button
        v-if="createATicket"
        @click="createATicket = false"
        icon="el-icon-back"
        circle
      ></el-button>
      <div class="eventForm" v-show="!createATicket">
        <div class="d-flex">
          <div class="mb-3 w-100">
            <div
              id="upload-btn"
              @click="triggerUpload"
              class="bg-light w-100 my-3 d-flex justify-content-center align-items-center"
            >
              <div>
                <span class="text-center text-primary">Click to upload</span>
              </div>
            </div>
            <p class="text-center m-0 small" v-if="NoOfImages >= 1">
              Image uploaded
            </p>
            <div
              class="w-100 initialImage"
              :style="{
                backgroundImage: `url(${newTicketForm.ticketImage.avatar})`,
              }"
              v-if="
                editTicketData &&
                newTicketForm.ticketImage &&
                !newTicketForm.image
              "
            ></div>
            <input
              class="d-none"
              ref="uploadBtn"
              type="file"
              @change="getImageFile"
              accept="image/*"
            />
          </div>
        </div>
        <el-form
          :label-position="'top'"
          :rules="eventValidation"
          :model="newTicketForm"
          ref="eventsForm"
          status-icon
        >
          <el-form-item label="Event name" prop="eventName">
            <el-input
              v-model="newTicketForm.eventName"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Event venue" prop="eventVenue">
            <el-input
              v-model="newTicketForm.eventVenue"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Venue Address" prop="venueAddress">
            <el-input
              v-model="newTicketForm.venueAddress"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Event Time" prop="eventTime">
            <el-time-select
              v-model="newTicketForm.eventTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
              }"
              placeholder="Select time"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="Event Start Date" prop="eventStartDate">
            <el-date-picker
              v-model="newTicketForm.eventStartDate"
              type="date"
              placeholder="Pick a day"
              class="w-100"
              format="dd/MM/yyyy"
              value-format="MM-dd-yyyy"
            >
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Event End Date" prop="eventEndDate">
            <el-date-picker
              v-model="newTicketForm.eventEndDate"
              type="date"
              placeholder="Pick a day"
              class="w-100"
              format="dd/MM/yyyy"
              value-format="MM-dd-yyyy"
            >
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-select
              class="category"
              v-model="newTicketForm.category"
              placeholder="Choose category"
            >
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Ticket Sales Start Date"
            prop="ticketSaleStartDate"
          >
            <el-date-picker
              v-model="newTicketForm.ticketSaleStartDate"
              type="date"
              placeholder="Pick a day"
              class="w-100"
              format="dd/MM/yyyy"
              value-format="MM-dd-yyyy"
            >
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Ticket Sales End Date" prop="ticketSaleEndDate">
            <el-date-picker
              v-model="newTicketForm.ticketSaleEndDate"
              type="date"
              placeholder="Pick a day"
              class="w-100"
              format="dd/MM/yyyy"
              value-format="MM-dd-yyyy"
            >
              >
            </el-date-picker>
          </el-form-item>
          <el-button
            type="primary"
            class="mt-3 w-100"
            @click="validateForm('eventsForm')"
            >Create Tickets</el-button
          >
        </el-form>
      </div>
      <div class="ticketform" v-show="createATicket">
        <el-form
          :label-position="'top'"
          :rules="ticketsValidation"
          :model="ticketForm"
          ref="ticketForm"
          status-icon
        >
          <div class="ticketTabsContainer py-3">
            <el-button
              class="primary position-relative"
              @click="goToTicket(ticket)"
              v-for="ticket in allTickets"
              :key="ticket._id"
              v-bind:type="ticketForm._id === ticket._id ? 'primary' : ''"
              >{{ ticket.ticketName }}
              <el-button
                @click="deleteCurrentTicket(ticket)"
                type="danger"
                icon="el-icon-close"
                class="delete position-absolute"
              ></el-button>
            </el-button>
            <el-button @click="addNewTicket('ticketForm')" plain
              >Add <i class="el-icon-plus el-icon-right"></i
            ></el-button>
          </div>
          <el-form-item label="Ticket name (Regular, VIP)" prop="ticketName">
            <el-input
              v-model="ticketForm.ticketName"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
              type="textarea"
              placeholder="please type here"
              v-model="ticketForm.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="No of tickets to be sold" prop="numberOfTickets">
            <el-input
              v-model="ticketForm.numberOfTickets"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="Paid ticket">
            <el-switch v-model="ticketIsPaid"> </el-switch>
          </el-form-item>
          <el-form-item v-show="ticketIsPaid" label="Price" prop="price">
            <el-input v-model="ticketForm.price" autocomplete="on">
              <el-select
                v-model="ticketForm.currency"
                slot="prepend"
                placeholder="NGN"
                value-key="id"
                class="text-dark"
              >
                <el-option
                  class="text-secondary fw-normal"
                  label="NGN"
                  value="₦"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="mt-3 w-100 ms-0"
            @click="validateForm('ticketForm')"
            >Submit tickets <loader v-if="loading"
          /></el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tickets from "@/helpers/tickets/index";
import loader from "@/components/loader/index";
export default {
  name: "newTicket",
  props: ["editTicketData"],
  components: {
    loader,
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Number of tickets must be a number"));
        } else {
          callback();
        }
      }, 500);
    };
    var checkPriceNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Price must be a number"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      dialogVisible: false,
      ticketIsPaid: true,
      loading: false,
      NoOfImages: 0,
      allTickets: [],
      newTicketFormInitailState: null,
      ticketFormInitailState: null,
      createATicket: false,
      newTicketForm: {
        eventName: "",
        eventVenue: "",
        eventTime: "",
        venueAddress: "",
        eventStartDate: "",
        eventEndDate: "",
        ticketSaleStartDate: "",
        ticketSaleEndDate: "",
        category: "",
        image: null,
        categories: [],
      },
      ticketForm: {
        ticketName: "",
        description: "",
        numberOfTickets: "",
        price: "",
        currency: "₦",
      },
      categories: [
        {
          value: "Education",
          label: "Education",
        },
        {
          value: "Party",
          label: "Party",
        },
        {
          value: "Coperate",
          label: "Coperate",
        },
        {
          value: "Concert",
          label: "Concert",
        },
        {
          value: "Album Launch",
          label: "Album Launch",
        },
        {
          value: "Comedy show",
          label: "Comedy show",
        },
        {
          value: "Conference",
          label: "Conference",
        },
        {
          value: "Fashion and Style",
          label: "Fashion and Style",
        },
        {
          value: "Festival",
          label: "Festival",
        },
        {
          value: "Food and drink",
          label: "Food and drink",
        },
        {
          value: "Sports",
          label: "Sports",
        },
        {
          value: "Theatre play",
          label: "Theatre play",
        },
      ],
      eventValidation: {
        eventName: [
          {
            required: true,
            message: "Event name is required",
            trigger: "blur",
          },
        ],
        eventVenue: [
          {
            required: true,
            message: "Location is required",
            trigger: "blur",
          },
        ],
        eventTime: [
          {
            required: true,
            message: "Event time is required",
            trigger: "blur",
          },
        ],
        venueAddress: [
          {
            required: true,
            message: "Venue address is required",
            trigger: "blur",
          },
        ],
        eventStartDate: [
          {
            required: true,
            message: "Event start date is required",
            trigger: "blur",
          },
        ],
        eventEndDate: [
          {
            required: true,
            message: "Event end date is required",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "category is required",
            trigger: ["blur", "change"],
          },
        ],
        ticketSaleStartDate: [
          {
            required: true,
            message: "Start date is required",
            trigger: "blur",
          },
        ],
        ticketSaleEndDate: [
          {
            required: true,
            message: "End date is required",
            trigger: "blur",
          },
        ],
      },
      ticketsValidation: {
        ticketName: [
          {
            required: true,
            message: "Ticket name is required",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Description is required",
            trigger: "blur",
          },
        ],
        numberOfTickets: [
          {
            required: true,
            message: "Number of tickets is required",
            trigger: "blur",
          },
          {
            validator: checkNumber,
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Price is required",
            trigger: "blur",
          },
          {
            validator: checkPriceNumber,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    noOfTickets: function () {
      return this.allTickets.length;
    },
  },
  watch: {
    editTicketData() {
      if (this.editTicketData) {
        const ticketData = { ...this.editTicketData };
        const tickets = ticketData.categories;
        this.newTicketForm = ticketData;
        this.allTickets = tickets;
        this.ticketForm = this.allTickets[0];
        this.allTickets.forEach((item) => {
          item.currency = "₦";
          const price = item.price;
          if (price !== "") {
            const spreadPrice = price.split("");
            const currency = spreadPrice[0];
            if (isNaN(currency)) {
              item.currency = currency;
              spreadPrice.shift();
              const newPrice = spreadPrice.join();
              const x = newPrice.replace(/,/g, "");
              console.log(x);
              item.price = x;
            }
          }
        });
        this.dialogVisible = true;
      }
    },
    ticketForm() {
      if (this.ticketForm.price) {
        if (this.ticketForm.price !== "") {
          this.ticketIsPaid = true;
        } else {
          this.ticketIsPaid = false;
        }
      }
    },
  },
  methods: {
    handleClose(done) {
      if (this.editTicketData) {
        this.dialogVisible = false;
        this.newTicketForm.image = {};
        this.createATicket = false;
        this.$emit("resetProp");
        this.newTicketForm = this.newTicketFormInitailState;
        this.ticketForm = this.ticketFormInitailState;
      } else {
        this.$confirm("All data will be lost. Are you sure?")
          .then(() => {
            this.dialogVisible = false;
            this.newTicketForm.image = {};
            done();
          })
          .catch(() => {});
      }
      this.$refs["eventsForm"].resetFields();
      this.$refs["ticketForm"].resetFields();
    },
    validateForm(formName) {
      let formData;
      if (this.createATicket) {
        formData = { ...this.ticketForm };
      } else {
        formData = { ...this.newTicketForm };
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Object.keys(formData).map((item) => {
            if (typeof formData[item] == "string") {
              formData[item] = formData[item].trim();
            }
          });
          if (!this.createATicket) {
            this.createATicket = true;
            return;
          }
          if (formData.price !== "") {
            formData.price = formData.currency.concat(formData.price);
          }
          delete formData.currency;
          const ticketExists = this.allTickets.find(
            (item) => item._id == this.ticketForm._id
          );
          // const ticketNameExists = this.allTickets.find(
          //   (item) => item.ticketName == this.ticketForm.ticketName
          // );
          // console.log(ticketExists, ticketNameExists, this.allTickets);
          if (!ticketExists) {
            const ticket = {
              ticketName: this.ticketForm.ticketName,
              description: this.ticketForm.description,
              numberOfTickets: this.ticketForm.numberOfTickets,
              price: this.ticketForm.price,
            };
            this.allTickets.push(ticket);
            this.ticketForm = this.ticketFormInitailState;
          }
          if (this.editTicketData) {
            this.updateTickets();
          } else {
            this.sendTickets();
          }
        } else {
          return false;
        }
      });
    },
    goToTicket(ticket) {
      this.ticketForm = ticket;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    addNewTicket(formName) {
      console.log(this.ticketForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const ticketExixts = this.allTickets.find(
            (item) => item._id === this.ticketForm._id
          );
          if (ticketExixts?._id === this.ticketForm?._id) {
            this.ticketForm = this.ticketFormInitailState;
            this.$refs["ticketForm"].resetFields();
          } else {
            const formData = {
              ticketName: this.ticketForm.ticketName,
              description: this.ticketForm.description,
              numberOfTickets: this.ticketForm.numberOfTickets,
              price: this.ticketForm.price,
            };
            this.allTickets.push(formData);
            this.ticketForm = this.ticketFormInitailState;
            this.$refs["ticketForm"].resetFields();
          }
        } else {
          return false;
        }
      });
    },
    deleteCurrentTicket(ticket) {
      if (this.noOfTickets > 0) {
        const index = this.allTickets.findIndex((t) => t._id === ticket._id);
        this.allTickets.splice(index, 1);
        if (this.allTickets.length < 1 && index < 1) {
          Object.keys(this.ticketForm).forEach(
            (item) => (this.ticketForm[item] = "")
          );
        } else {
          if (index === 0) {
            this.ticketForm = this.allTickets[index];
          } else {
            this.ticketForm = this.allTickets[index - 1];
          }
        }
      }
    },
    prepareApiFormData() {
      const formData = new FormData();
      formData.append("image", this.newTicketForm.image);
      formData.append("eventName", this.newTicketForm.eventName);
      formData.append("eventVenue", this.newTicketForm.eventVenue);
      formData.append("eventTime", this.newTicketForm.eventTime);
      formData.append("venueAddress", this.newTicketForm.venueAddress);
      formData.append("eventStartDate", this.newTicketForm.eventStartDate);
      formData.append("eventEndDate", this.newTicketForm.eventEndDate);
      formData.append(
        "ticketSaleEndDate",
        this.newTicketForm.ticketSaleEndDate
      );
      formData.append(
        "ticketSaleStartDate",
        this.newTicketForm.ticketSaleStartDate
      );
      formData.append("category", this.newTicketForm.category);
      formData.append(
        "categories",
        JSON.stringify(this.newTicketForm.categories)
      );
      return formData;
    },
    async sendTickets() {
      this.loading = true;
      this.newTicketForm.categories = this.allTickets;
      console.log(this.newTicketForm);
      const data = { ...this.newTicketForm };
      parseInt(data.numberOfTickets);
      const formData = this.prepareApiFormData();
      try {
        const response = await tickets.createTicket(this.$axios, formData);
        console.log(response);
        this.loading = false;
        this.dialogVisible = false;
        this.cleanUpForm();
        this.editTicketData
          ? this.$emit("editedTicket")
          : this.$emit("ticketCreated"); // you might want to reduce this line to just one line: ticketsUpdated and reduce the cluster
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    cleanUpForm() {
      this.newTicketForm = this.newTicketFormInitailState;
      this.ticketForm = this.ticketFormInitailState;
      this.allTickets = [];
      this.newTicketForm.image = null;
      this.createATicket = false;
    },
    async updateTickets() {
      this.loading = true;
      try {
        const response = await tickets.updateTicket(
          this.$axios,
          this.newTicketForm._id,
          this.newTicketForm
        );
        console.log(response);
        this.loading = false;
        this.$emit("editedTicket");
        this.handleClose();
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    triggerUpload() {
      this.$refs.uploadBtn.click();
    },
    getImageFile() {
      this.newTicketForm.image = this.$refs.uploadBtn.files[0];
      this.NoOfImages++;
    },
  },
  created() {
    this.newTicketFormInitailState = this.newTicketForm;
    this.ticketFormInitailState = this.ticketForm;
  },
};
</script>
<style scoped>
.el-select /deep/ div.el-input {
  width: 90px;
}
.el-select.category,
.category /deep/ .el-input,
.el-date-editor.el-input {
  width: 100% !important;
}
div#upload-btn {
  cursor: pointer;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #30a2e2;
}
.initialImage {
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
}
div.ticketTabsContainer {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;
  scroll-behavior: smooth;
}
.delete {
  top: -5px;
  right: -10px;
  padding: 0.2rem;
  border-radius: 100%;
}
</style>
