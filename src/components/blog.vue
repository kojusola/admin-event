<template>
  <div>
    <el-button type="primary" class="d-block ml-auto my-3" icon="el-icon-plus">New blog post</el-button>
    <div class="row">
      <div class="col-md-3">
        <el-card shadow="hover">
          <div class="card-header-img">
              <img src="https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" class="img-fluid" alt="image">
          </div>
          <div class="my-2">
            <b>How to start Selling on Events Trolley</b>
          </div>
          <span class="text-gray small">10 mins ago</span>
        </el-card>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'blog'
}
</script>

<style scoped>
.el-card__body{
   height: 350px;
  }
</style>