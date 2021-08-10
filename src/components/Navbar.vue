The navigation of the web application

<template>
  <div class="navbar">
    <div class="content">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/city">Weather</router-link></li>
      <li><router-link to="/random">Random</router-link></li>
    </div>
    <div class="box">
      <div class="logo">
        <h5>Go Weather</h5>
        <i class="fas fa-cloud-moon fa-3x icon"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    window.scroll(0, 0);
  },
};
</script>

<style scoped>
.box {
  width: 50px;
  margin-right: 0;
  right: 0;
  width: 100%;
  position: relative;
  z-index: -1;
}

.content {
  margin-left: 3%;
  position: relative;
}

h5 {
  float: right;
  font-weight: bold;
  margin-top: 28px;
  color: rgb(255, 248, 187);
}

.icon {
  float: right;
  margin-left: 5px;
  color: rgb(255, 248, 187);
}

li {
  float: left;
  margin-right: 1%;
  margin-top: 3px;
  margin-bottom: 3px;
}

.logo {
  display: flex;
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}

.navbar {
  display: inline-block;
  box-shadow: 5px 5px 5px rgba(128, 128, 128, 0.767);
  position: sticky;
  margin-bottom: 2%;
  z-index: 2;
  background-color: rgba(24, 47, 77, 0.897);
  top: 0;
  width: 100%;
  list-style-type: none;
}

.navbar a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 19px;
  font-weight: bold;
}

.navbar a:hover {
  background-color: rgb(209, 234, 255);
}

.nothing {
  color: rgb(255, 217, 187);
}
</style>