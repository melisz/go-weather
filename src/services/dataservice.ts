import http from "../http-common";
import http2 from "../http-common2";
import City from "../types/city";

/* This data service is made to call the http connections using axios. It also serves for code reuse. */

class DataService {

  citys = [] as City[];

  city: City = {
    city: "",
    temperature: "",
    description: "",
    wind: "",
    forecast: null,
  };

  getCityArray(): string[] {
    const cityArray = [
      "Amsterdam",
      "Dublin",
      "Rome",
      "Tokyo",
      "Hamburg",
      "Barcelona",
      "Vancouver",
      "Shanghai",
      "Manchester",
      "Lisbon",
      "Canberra",
      "Cairo",
    ];

    return cityArray;
  }

  get(city: string) {
    return http.get("/" + city);
  }

  getInfo(city: string) {
    return http2.get("/" + city);
  }
}

export default new DataService();