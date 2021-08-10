The Home Page of the website. Shows about 10 city's with weather data.

<template>
  <div class="container-home">
    <div>
      <div class="header-div">
        <div class="time">
          <i class="fas fa-map-marker-alt fa-2x"></i>
          <a
            >&nbsp;<strong>{{ locWeather.city }}</strong></a
          ><br />
          <span
            ><a class="temp">{{ locWeather.temperature }}&nbsp;</a>
            <i v-html="weatherCondition(locWeather)"></i
          ></span>
        </div>
        <div class="title"><strong>Weather Overview</strong></div>
        <div class="sort">
          <select class="select" @change="onChange($event)">
            <option value="" disabled selected hidden>Sort</option>
            <option>A-Z</option>
            <option>Temperature</option>
            <option>Wind</option>
          </select>
        </div>
      </div>
      <div>
        <table class="table-responsive" style="width: 100%">
          <tr class="table-head">
            <th>City</th>
            <th>°C</th>
            <th>Wind</th>
            <th>State</th>
            <th>Description</th>
          </tr>

          <div class="head-table" v-for="city in citys" :key="city.city">
            <tr class="visibility">
              <th>City</th>
              <th>°C</th>
              <th>Wind</th>
              <th class="state">State</th>
              <th class="description">Description</th>
            </tr>
            <tr>
              <td>
                <a class="link" v-on:click="navigate(city)">{{ city.city }}</a>
              </td>
              <td>{{ splitJoin(city.temperature) }}</td>
              <td>{{ city.wind }}</td>
              <td class="state">
                <i v-html="weatherCondition(city)"></i>
              </td>
              <td class="description">{{ city.description }}</td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import dataService from "../services/dataservice";
import City from "../types/city";
import dataservice from "../services/dataservice";
import router from "../router/index";

export default class Home extends Vue {
  citys = [] as City[];

  locWeather: City = {
    city: "",
    temperature: "",
    description: "",
    wind: "",
    forecast: null,
  };

  mounted(): void {
    this.getLocation();

    const cityArray = dataService.getCityArray();

    for (let i = 0; i < cityArray.length; i++) {
      dataService
        .get(cityArray[i])
        .then((response) => {
          response.data.city = cityArray[i];
          dataservice.citys.push(response.data);
          this.citys.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  navigate(city: City): void {
    dataService.city = city;
    router.push({ name: "City-Detail", params: { id: city.city } });
  }

  onChange(e: any): void {
    if (e.target.value === "Wind") {
      this.sortWind();
    } else if (e.target.value === "Temperature") {
      this.sortDegrees();
    } else if (e.target.value === "A-Z") {
      this.sortAZ();
    }
  }

  sortDegrees(): void {
    this.citys.sort((a, b) => {
      let tempA = parseInt(a.temperature),
        tempB = parseInt(b.temperature);

      if (tempA < tempB) {
        return -1;
      }
      if (tempA > tempB) {
        return 1;
      }
      return 0;
    });
  }

  sortAZ(): void {
    this.citys.sort((a, b) => {
      if (a.city < b.city) {
        return -1;
      }
      if (a.city > b.city) {
        return 1;
      }
      return 0;
    });
  }

  sortWind(): void {
    this.citys.sort((a, b) => {
      let windA = parseInt(a.wind),
        windB = parseInt(b.wind);

      if (windA < windB) {
        return -1;
      }
      if (windA > windB) {
        return 1;
      }
      return 0;
    });
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

  getLocation(): void {
    const ipApi = "http://ip-api.com/json";

    fetch(ipApi)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dataService.get(data.city).then((response) => {
          response.data.city = data.city;
          this.locWeather = response.data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  splitJoin(text: string): number {
    if (text.charAt(0) === "-") {
      let date = "-";
      date = date += text.charAt(1) + text.charAt(2);
      return parseInt(date);
    }
    return parseInt(text);
  }
}
</script>

<style scoped>
.container-home {
  min-height: 100%;
  top: 0;
  bottom: 0;
}

.header-div {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.link {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(24, 47, 77);
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
  color: #ddd;
  color: rgb(133, 165, 192);
}

.select {
  width: 175px;
  margin-bottom: 15px;
}

.sort {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: fit-content;
  margin-top: 40px;
}

table {
  border: none;
  font-family: sans-serif;
  font-size: 17px;
  color: rgb(29, 29, 29);
  margin-top: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.table-head {
  height: 50px;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 2px 6px 2px;
}

.table-style {
  box-shadow: rgba(0, 0, 0, 0.35) 0 3px 8px 5px;
}

td {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7px;
  border-bottom: 1px solid rgba(24, 47, 77, 0.103);
}

.temp {
  font-size: 27px;
  text-decoration: none;
  color: rgb(54, 54, 54);
  font-weight: bold;
}

th {
  background-color: rgba(24, 47, 77, 0.897);
  padding: 7px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

th,
td {
  width: 100%;
}

.time {
  max-width: 100%;
  width: 100%;
  color: rgb(54, 54, 54);
  font-size: 15px;
  position: relative;
  width: 100%;
  display: inline-block;
  margin-top: 0;
  border-radius: 2px;
  font-weight: lighter;
}

.title {
  font-size: 25px;
  padding: 10px;
  margin-bottom: -45px;
  color: rgb(54, 54, 54);
  font-family: sans-serif;
  position: relative;
  width: 100%;
}

tr {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
}

.visibility {
  display: none;
}

@media (max-width: 580px) {
  .description {
    min-height: 160px;
  }

  .header {
    height: 100%;
  }

  .header-div {
    display: flex;
    flex-direction: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
  }

  .head-table {
    display: inline-flex;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    margin-bottom: 20px;
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

  .sort {
    padding-top: 20px;
  }

  .state {
    min-height: 70px;
  }

  table {
    font-size: 16px;
    margin-top: 0;
  }

  .table-head {
    display: none;
  }

  .table-style {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
  }

  td {
    min-height: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  th {
    min-height: 15px;
    border-bottom: 1px solid rgba(167, 167, 167, 0.144);
    width: 100%;
  }

  .title {
    border-bottom: 1px solid gray;
  }

  .time {
    border-bottom: 1px solid gray;
  }

  tr {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    margin: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
  }

  .visibility {
    display: inline-flex;
  }
}
</style>