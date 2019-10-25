<template>
  <fieldset class="fieldset" id="weather-display-panel">
    <legend>Weather forecast of {{ selectedLocationFullTitle }}</legend>
    <div class="table">
      <div class="columns is-multiline">
        <div class="column" id="forecast-element" v-for="forecast in forecasts">
          <h4>{{ forecast.applicable_date }}</h4>
          <img id="element-icon" :src="getForecastIcon(forecast)"/>
          <h5>{{ forecast.weather_state_name }}</h5>
          <p>
            Predictability: {{ getForecastPredictability(forecast) }}% <br>
            Wind speed: {{ getForecastWindSpeed(forecast) }} mph <br>
            Min. temperature: {{ getForecastMinTemp(forecast) }} °C <br>
            Max. temperature: {{ getForecastMaxTemp(forecast) }} °C <br>
            Humidity: {{ getForecastHumidity(forecast) }}%
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>

export default {
  name: 'WeatherDisplayPanel',
  methods: {
    getForecastIcon(forecast) {
      return 'https://www.metaweather.com/static/img/weather/png/64/'+forecast.weather_state_abbr+'.png';
    },
    getForecastPredictability(forecast) {
      return forecast.predictability;
    },
    getForecastWindSpeed(forecast) {
      return forecast.wind_speed.toFixed(1);
    },
    getForecastMinTemp(forecast) {
      return forecast.min_temp.toFixed(1);
    },
    getForecastMaxTemp(forecast) {
      return forecast.max_temp.toFixed(1);
    },
    getForecastHumidity(forecast) {
      return forecast.humidity;
    }

  },
  computed: {
    selectedLocationFullTitle() {
      if (this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return this.$store.getters.getSelectedLocationInfo.title+', '+this.$store.getters.getSelectedLocationInfo.parent.title;
      }
      return null;
    },
    forecasts() {
      if (this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return this.$store.getters.getSelectedLocationInfo.consolidated_weather;
      }
      return null;
    }
  }

}

</script>
