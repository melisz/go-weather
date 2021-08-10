# Go Weather Application

- This is an weather service application for observing weather information of different places and cities.

# General Information

### Main pages

- The **homepage** shows about 10 city's with weather data. Three sorting options are available.
- The **weather** detail page can show the details of the selected city on the home page, but it also offers the possibility to search for another place or city. The details include a forecast of the weather for the next three days.
- The **random** page offers the possibility to view random information from certain countries by means of a ‘shuffle’ button, including the weather data of the capital.
- The **footer** contains a sitemap of the routes of the application.

### APIs

The applications made use of the following three APIs:

- [https://goweather.herokuapp.com/weather](https://goweather.herokuapp.com/weather) -> For the weather details of every city.

*“**Note that some cities or towns are temporarily unavailable with the above API and that is why the application sometimes shows N/A**.*”

- [https://restcountries.eu/rest/v2/capital](https://restcountries.eu/rest/v2/capital) -> To get information about countries.
- [http://ip-api.com/json](http://ip-api.com/json) -> To show the weather data of the user's location.

### Technologies

- VueJS framework
- TypeScript
- HTML
- CSS

Others:

- Bootstrap
- Axios
- Router
- Font-Awesome

# Screenshots

<img width="959" alt="home" src="https://user-images.githubusercontent.com/82055247/126913754-d822b4c5-44f2-481e-9564-b8a124b73a0e.png">


<img width="959" alt="weatherpage" src="https://user-images.githubusercontent.com/82055247/126913744-18f538f6-b418-4c95-9a41-74fc7296839a.png">


<img width="959" alt="random" src="https://user-images.githubusercontent.com/82055247/126913726-859fd7ba-bf32-4e5f-8cf5-70478948a3b4.png">


<img width="192" alt="mobilehome" src="https://user-images.githubusercontent.com/82055247/126913699-f25aa8c2-3a82-41a6-8ccd-ddb9fb3283a2.png">


# Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# goweather" 
