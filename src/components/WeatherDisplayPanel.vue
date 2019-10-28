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
    /** Get the icon corresponding to a forecast element. */
    getForecastIcon(forecast) {
      return 'https://www.metaweather.com/static/img/weather/png/64/'+forecast.weather_state_abbr+'.png';
    },
    /** Get the predictability percentage corresponding to a forecast element. */
    getForecastPredictability(forecast) {
      return forecast.predictability;
    },
    /** Get the wind speed corresponding to a forecast element. */
    getForecastWindSpeed(forecast) {
      return forecast.wind_speed.toFixed(1);
    },
    /** Get the minimum temperature corresponding to a forecast element. */
    getForecastMinTemp(forecast) {
      return forecast.min_temp.toFixed(1);
    },
    /** Get the maximum temperature corresponding to a forecast element. */
    getForecastMaxTemp(forecast) {
      return forecast.max_temp.toFixed(1);
    },
    /** Get the humidity percentage corresponding to a forecast element. */
    getForecastHumidity(forecast) {
      return forecast.humidity;
    }

  },
  computed: {
    /** The value (string) of the selected location. */
    selectedLocationFullTitle() {
      if (this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return this.$store.getters.getSelectedLocationInfo.title+', '+this.$store.getters.getSelectedLocationInfo.parent.title;
      }
      return null;
    },
    /** The 6-days weather forecast data of the selected location. */
    forecasts() {
      if (this.$store.getters.getSelectedLocationInfo.length !== 0) {
        return this.$store.getters.getSelectedLocationInfo.consolidated_weather;
      }
      return null;
    }
  }

}

</script>
