import axios from "axios";

export default axios.create({
  baseURL: "https://goweather.herokuapp.com/weather",
  headers: {
    "Content-type": "application/json"
  },
});