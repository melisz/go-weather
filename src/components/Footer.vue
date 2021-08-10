This component is the footer of the web application. It contains a logo, copyright and a sitemap.

<template>
  <div class="box2">
    <div class="footer">
      <div class="footdiv">
        <div class="logo">
          <i class="fas fa-cloud-moon fa-2x icon"></i>
          <h6>Go Weather</h6>
          <p style="color: white; font-size: 12px">© 2019 - 2021</p>
        </div>
        <div class="box">
          <router-link class="footer-text" to="/sitemap">Sitemap</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: fit-content;
  float: right;
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  position: absolute;
  padding-right: 24px;
  padding-top: 23px;
}

.footdiv {
  padding-top: 12px;
  height: 100%;
  display: flex;
  justify-content: center;
}

.footer {
  margin-top: 20px;
  height: 100px;
  box-shadow: 5px 5px 5px rgba(128, 128, 128, 0.767);
  position: relative;
  left: 0;
  background-color: rgba(24, 47, 77, 0.897);
  bottom: 0;
  margin-bottom: 0;
  margin-top: fit-content;
  width: 100%;
  list-style-type: none;
}

.footer-text {
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}

.footer-text:hover {
  color: rgb(126, 126, 126);
}

h6 {
  color: white;
  float: right;
  font-weight: bold;
  margin-top: 15px;
  color: rgb(255, 248, 187);
}

.icon {
  float: right;
  margin-left: 5px;
  color: rgb(255, 248, 187);
}

.logo {
  height: 100%;
}

.logotext {
  float: right;
  color: white;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 15px;
}

@media (max-width: 580px) {
  .box {
    padding-right: 10px;
  }
}
</style>