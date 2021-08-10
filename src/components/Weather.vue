This is the weather detail page. Furthermore, this page offers the possibility to search for the 
weather of other places or cities.

<template>
  <div class="box3">
    <div class="header">
      <div class="search">
        <div class="search-box">
          <input
            v-model="message"
            type="text"
            title="Enter a city"
            placeholder="Search"
            @keyup.enter="submit(message)"
          />
          <button @click="reset()" class="btn btn-default" title="Reset">
            <i class="fa fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div class="location-div" v-if="city.temperature !== '' && !checkWarning">
        <div class="location-box">
          <span
            ><i class="fas fa-map-marker-alt"></i>
            <a class="location">&nbsp;{{ capitalize() }} </a>&nbsp;
          </span>
          <div>
            <strong style="font-size: 20px"
              >{{ city.temperature }}&nbsp;</strong
            >
            <i v-html="weatherCondition(city)"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-if="checkWarning" class="alert">
      <strong>• Error!</strong> <a>Only letters can be used </a>
    </div>

    <div class="table-style" v-if="city.temperature !== '' && !checkWarning">
      <table class="table-responsive">
        <tr class="table-head">
          <th><a class="invisible">Empty </a></th>
          <th class="table-head"><a>Today </a></th>
          <th class="table-head" v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr>
          <td><strong>Date</strong></td>
          <td class="first-column">{{ convertdate(0) }}</td>
          <td v-for="city in city.forecast" :key="city.city">
            {{ convertdate(city.day) }}
          </td>
        </tr>

        <tr class="header-div">
          <th><a class="invisible">Empty </a></th>
          <th><a>Today </a></th>
          <th v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr>
          <td><strong>°C</strong></td>
          <td class="first-column">{{ city.temperature }}</td>
          <td v-for="city in city.forecast" :key="city.city">
            {{ city.temperature }}
          </td>
        </tr>

        <tr class="header-div">
          <th><a class="invisible">Empty </a></th>
          <th><a>Today </a></th>
          <th v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr class="style">
          <td><strong>Wind</strong></td>
          <td class="first-column">{{ city.wind }}</td>
          <td v-for="city in city.forecast" :key="city.city">
            {{ city.wind }}
          </td>
        </tr>

        <tr class="header-div">
          <th><a class="invisible">Empty </a></th>
          <th><a>Today </a></th>
          <th v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr class="style">
          <td><strong>UV-Index</strong></td>
          <td class="first-column">
            <a v-html="checkUV()"></a>
          </td>
          <td v-for="city in city.forecast" :key="city.city">
            <a v-html="checkUV()"></a>
          </td>
        </tr>

        <tr class="header-div">
          <th><a class="invisible">Empty </a></th>
          <th><a>Today </a></th>
          <th v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr class="style">
          <td><strong>Running Adivse</strong></td>
          <td class="first-column">
            <i v-html="runningAdvise(city)"></i>
          </td>
          <td v-for="city in city.forecast" :key="city.city">
            <i v-html="runningAdvise(city)"></i>
          </td>
        </tr>

        <tr class="header-div" style="margin-bottom: 0">
          <th><a class="invisible">Empty </a></th>
          <th><a>Today </a></th>
          <th v-for="city in city.forecast" :key="city.city">
            {{ getDay(city.day) }}
          </th>
        </tr>

        <tr style="margin-bottom: 0">
          <td><strong>Wind Direction</strong></td>
          <td class="first-column">
            <i v-html="windDirection(city)"></i>
          </td>
          <td v-for="city in city.forecast" :key="city.city">
            <i v-html="windDirection(city)"></i>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <h4>Please enter a city</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import City from "../types/city";
import dataService from "../services/dataservice";
import router from "../router/index";

export default class Weather extends Vue {
  checkWarning = false;
  message = "" as string;

  city: City = {
    city: "",
    temperature: "",
    description: "",
    wind: "",
    forecast: null,
  };

  mounted(): void {
    window.scroll(0, 0);

    this.city = dataService.city;

    if (this.$route.params.id != undefined) {
      this.submit(this.$route.params.id as string);
    }
  }

  reset(): void {
    dataService.city = {
      city: "",
      temperature: "",
      description: "",
      wind: "",
      forecast: null,
    };

    this.city = {
      city: "",
      temperature: "",
      description: "",
      wind: "",
      forecast: null,
    };
    router.push({ name: "Weather per City" });
  }

  capitalize(): string {
    return this.city.city.charAt(0).toUpperCase() + this.city.city.slice(1);
  }

  windDirection(item: City): any {
    const wind = parseInt(item.wind);
    if (wind > 20) {
      return '<i class="fas fa-location-arrow"></i>';
    } else if (wind < 20 && wind > 13) {
      return '<i class="fas fa-location-arrow fa-flip-vertical fa-flip-horizontal"></i>';
    } else if (wind > 4 && wind < 14) {
      return '<i class="fas fa-location-arrow fa-flip-vertical"></i>';
    } else {
      return '<i class="fas fa-location-arrow fa-flip-horizontal"></i>';
    }
  }

  runningAdvise(item: City): any {
    if (
      parseInt(item.temperature) > 21 ||
      parseInt(item.temperature) < 8 ||
      parseInt(item.wind) > 20
    ) {
      return "<a>Bad</a>";
    } else {
      return "<a>Good</a>";
    }
  }

  checkUV(): any {
    let month = new Date();
    if (
      month.getMonth() == 5 ||
      month.getMonth() == 6 ||
      month.getMonth() == 7
    ) {
      return "<a>High</a>";
    } else if (month.getMonth() == 8 || month.getMonth() == 9) {
      return "<a>Medium</a>";
    }
    return "<a>Low</a>";
  }

  weatherCondition(city: City): any {
    const description = city.description;
    if (description.includes("rain") || description.includes("Rain")) {
      return '<i class="fas fa-cloud-showers-heavy fa-2x"></i>';
    } else if (description.includes("Sun") || description.includes("sun")) {
      return '<i class="far fa-sun fa-2x"></i>';
    } else if (description.includes("Clear") || description.includes("clear")) {
      return '<i class="far fa-sun fa-2x"></i>';
    } else if (description.includes("thunderstorm")) {
      return '<i class="fas fa-bolt fa-2x"></i>';
    } else if (description.includes("cloud")) {
      return '<i class="fas fa-cloud-sun fa-2x"></i>';
    } else {
      return "<a>N/A</a>";
    }
  }

  convert(text: string): string {
    if (text.charAt(0) == "+") {
      return text.slice(0, 1);
    }
    return text;
  }

  convertdate(plusDays: number): string {
    let date = new Date(Date.now() + plusDays * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return day + "-" + month + "-" + year;
  }

  isLetterOrNumber(message: any): boolean {
    return /^[A-Za-z ]+$/.test(message);
  }

  getDay(plusDays: number): string {
    let date = new Date(
      Date.now() + plusDays * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-NL", { weekday: "long" });
    return date;
  }

  getCity(id: string): void {
    if (this.searchCity(id) == true) {
      this.searchCity(id);
    } else {
      dataService
        .get(id)
        .then((response) => {
          if (response.data.temperature != null) {
            this.city = response.data;
            this.city.city = id;
          }
        })
        .catch((e) => {
          alert("City not found or temporary not available");
          console.log(e);
        });
    }
  }

  searchCity(id: string): boolean {
    if (this.isLetterOrNumber(id)) {
      this.checkWarning = false;
    } else {
      this.checkWarning = true;
    }

    let item;
    dataService.citys.forEach((e) => {
      if (e.city === id) {
        this.city = e;
        item = e;
      }
    });

    if (item != null) {
      this.city = item;
      return true;
    } else {
      return false;
    }
  }

  submit(message: string): void {
    router.push({ name: "City-Detail", params: { id: message } });
    this.getCity(message);
  }
}
</script>

<style scoped>
a,
p {
  text-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
}

.box3 {
  font-family: sans-serif;
  min-height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 100%;
  color: rgb(65, 65, 65);
}

.first-column {
  border-left: 2px solid rgba(255, 102, 0, 0.623);
  border-right: 2px solid rgba(255, 102, 0, 0.623);
  padding-bottom: -2px;
  padding-top: -2px;
}

.header {
  margin-bottom: 20px;
  width: 100%;
  overflow: hidden;
}

.header-div {
  display: none;
}

input {
  width: 300px;
}

.location {
  text-decoration: none;
  font-size: 17px;
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  color: rgb(36, 36, 36);
}

.location-box {
  width: 100%;
  padding-right: 30px;
  display: flex;
  flex-direction: row;
  height: 43px;
  line-height: 55px;
  text-align: center;
  justify-content: flex-end;
}

.location-div {
  display: flex;
  flex-direction: column;
  justify-content: left;
  float: right;
  width: 50%;
  text-decoration: none;
  font-size: 17px;
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  color: rgb(36, 36, 36);
}

.search {
  width: 50%;
  padding-top: 5px;
  float: left;
}

.search-box {
  height: 100%;
  float: left;
  margin-left: 30px;
}

table {
  border: none;
  font-family: sans-serif;
  font-size: 17px;
  color: rgb(29, 29, 29);
}

.table-style {
  box-shadow: rgba(0, 0, 0, 0.35) 0 3px 8px 5px;
}

td {
  width: 300px;
  height: 40px;
}

th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(24, 47, 77, 0.897);
  color: white;
  height: 40px;
}

tr {
  width: 300px;
}

@media (max-width: 780px) {
  .first-column {
    box-shadow: 0 0 4px rgb(255, 102, 0) inset;
    border: none;
  }

  .header {
    height: 100%;
  }

  .header-div {
    display: inline-flex;
  }

  .location-box {
    width: 100%;
    justify-content: center;
  }

  .location-div {
    width: 100%;
    float: none;
    margin: 0;
  }

  .search {
    width: 100%;
    float: none;
    margin-bottom: 5px;
  }

  .search-box {
    float: none;
    margin: 0;
  }

  table td {
    width: 100%;
    text-align: center;
  }

  table th {
    width: 100%;
  }

  table tr {
    text-align: center;
    width: 50%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-items: left;
  }

  td {
    border-bottom: 1px solid rgba(128, 128, 128, 0.233);
  }

  tr {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    margin-bottom: 20px;
  }
}
</style>