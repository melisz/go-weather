The random page offers the possibility to view random information from certain countries by means of 
a 'shuffle' button, including the weather data of the capital of the country.

<template>
  <div class="main-random">
    <div class="about">
      <h5>Random Country Information</h5>
      <button class="" title="New item" v-on:click="newRandom()">
        Shuffle
      </button>
    </div>

    <div class="information">
      <div class="data">
        <strong
          ><a>{{ weather.temperature }}</a></strong
        >
        <a style="font-style: italic"
          >&nbsp; -&nbsp;<i v-html="weatherCondition(weather)"></i></a
        ><br />
        <a>{{ getTime() }}</a
        ><br />
        <br />
        <span><img :src="country.flag" /></span>
      </div>

      <table class="table-div">
        <tbody>
          <td class="column-one">
            <tr>
              Capital
            </tr>
            <tr>
              Country
            </tr>
            <tr>
              Region
            </tr>
            <tr>
              Currency
            </tr>
            <tr>
              Language
            </tr>
            <tr>
              Population
            </tr>
          </td>
          <td class="column-two">
            <tr>
              <a>{{ country.capital }}</a>
            </tr>
            <tr>
              <a>{{ country.name }}</a>
            </tr>
            <tr>
              <a>{{ country.region }}</a>
            </tr>
            <tr>
              <a>{{ country.currencies }}</a>
            </tr>
            <tr>
              <a>{{ country.languages }}</a>
            </tr>
            <tr>
              <a>{{ country.population }}</a>
            </tr>
          </td>
        </tbody>
      </table>
    </div>
  </div>
</template>


  <script lang="ts">
import { Vue } from "vue-class-component";
import Country from "../types/country";
import City from "../types/city";
import dataservice from "../services/dataservice";

export default class Random extends Vue {
  path = "https://restcountries.eu/data/nld.svg" as string;

  country: Country = {
    name: "",
    capital: "",
    region: "",
    flag: "",
    currencies: "",
    languages: "",
    population: 0,
  };

  weather: City = {
    city: "",
    temperature: "",
    description: "",
    wind: "",
    forecast: null,
  };

  mounted(): void {
    window.scroll(0, 0);

    this.getData();
  }

  getData(): void {
    const city = this.citySelector();

    dataservice
      .getInfo(city)
      .then((response) => {
        this.country = response.data[0];
        this.country.languages = response.data[0].languages[0].name;
        this.country.currencies = response.data[0].currencies[0].name;
      })
      .catch((e) => {
        console.log(e);
      });

    dataservice
      .get(city)
      .then((response) => {
        this.weather = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  citySelector(): string {
    return [
      "Ottawa",
      "Stockholm",
      "Paris",
      "Lima",
      "Buenos Aires",
      "Canberra",
      "Tokyo",
      "Cairo",
      "Lisbon",
      "Beijing",
    ][Math.floor(Math.random() * 10)];
  }

  newRandom(): void {
    this.weather = {
      city: "",
      temperature: "",
      description: "",
      wind: "",
      forecast: null,
    };

    this.country = {
      name: "",
      capital: "",
      region: "",
      flag: "",
      currencies: "",
      languages: "",
      population: 0,
    };

    this.getData();
  }

  convertdate(): string {
    let date = new Date(Date.now());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return day + "-" + month + "-" + year;
  }

  getTime(): string {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
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
}
</script>

<style scoped>
.about {
  border: 1px solid rgba(24, 47, 77, 0.247);
  margin-bottom: 20px;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  background-color: rgba(24, 47, 77, 0.897);
  color: white;
}

button {
  box-shadow: inset 0 1px 0 0 #ffffff;
  background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
  background-color: #ededed;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #3b3b3b;
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 3px 20px;
  text-decoration: none;
  text-shadow: 0 1px 0 #ffffff;
}

button:active {
  position: relative;
  top: 1px;
}

button:hover {
  background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
  background-color: #f6f6f6;
}

.column-one {
  padding: 0 20px 0 70px;
  font-weight: bold;
  width: 130px;
  border-right: 1px solid rgba(24, 47, 77, 0.281);
}

.column-two {
  padding-left: 20px;
  min-width: 40%;
}

.data {
  display: inline-block;
  justify-items: center;
  height: 100%;
  padding: 5px;
}

img {
  height: 75px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.information {
  border-radius: 3px;
  padding-bottom: 5px;
  width: 80%;
  padding-top: 5px;
  display: inline-block;
  border: 1px solid rgba(24, 47, 77, 0.712);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.main-random {
  min-height: 100%;
  top: 0;
  bottom: 0;
}

.table-div {
  font-size: 18px;
  min-width: 50%;
  float: left;
  text-align: left;
  height: 100%;
}

@media (max-width: 780px) {
  .about {
    width: 100%;
  }

  .column-one {
    width: 50%;
    padding: 0;
    padding-left: 10px;
  }

  .column-two {
    padding-left: 10px;
    width: 400px;
  }

  .data {
    margin-bottom: 20px;
  }

  .information {
    width: 100%;
  }

  .table-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 16px;
  }
}
</style>