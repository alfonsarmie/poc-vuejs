<template>
  <div class="weather-widget">
    <div class="widget-header">
      <h2 class="widget-title">
        <span class="emoji">🌤️</span>
        Clima
      </h2>
      <span class="location">{{ location }}</span>
    </div>
    
    <div class="weather-content">
      <div class="temperature">{{ weather.temperature }}°C</div>
      <div class="condition">{{ weather.condition }}</div>
    </div>

    <div class="weather-details">
      <div class="detail">
        <span class="label">💧 Humedad</span>
        <span class="value">{{ weather.humidity }}%</span>
      </div>
      <div class="detail">
        <span class="label">💨 Viento</span>
        <span class="value">{{ weather.windSpeed }} km/h</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const location = ref('Rosario, Argentina');
  const weather = ref({
    temperature: null,
    condition: '',
    humidity: null,
    windSpeed: null
  });

  const API_KEY = '87d32cfbd101d057c3f6f33d56a90a67'; // Reemplaza esto con tu clave
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Rosario,AR&units=metric&lang=es&appid=${API_KEY}`;

  //const API = 'https://api.openweathermap.org/data/3.0/onecall?lat=33&lon=60&exclude={part}&appid={API key}'


  // Función para obtener los datos del clima
  const fetchWeather = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data && data.main && data.weather && data.wind) {
        weather.value.temperature = Math.round(data.main.temp);
        weather.value.humidity = data.main.humidity;
        weather.value.condition = data.weather[0].description;
        weather.value.windSpeed = Math.round(data.wind.speed * 3.6); // Convertir m/s a km/h
      }
    } catch (error) {
      console.error('Error al obtener el clima:', error);
    }
  };

  onMounted(() => {
    fetchWeather();
  });
  
</script>



<style scoped>
.weather-widget {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.widget-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  margin: 0;
}

.emoji {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.location {
  font-size: 0.8rem;
  background: #e6f7ff;
  color: #1890ff;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.weather-content {
  text-align: center;
  margin-bottom: 1.5rem;
}

.temperature {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 0.3rem;
}

.condition {
  font-size: 1rem;
  color: #666;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.detail {
  background: #f7fafc;
  padding: 0.8rem;
  border-radius: 12px;
  text-align: center;
}

.label {
  display: block;
  font-size: 0.8rem;
  color: #718096;
  margin-bottom: 0.2rem;
}

.value {
  display: block;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}
</style>