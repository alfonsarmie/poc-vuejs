<template>
  <div class="weather-widget">
    <div class="widget-header">
      <h2 class="widget-title">
        <span class="emoji">🌤️</span>
        Clima
      </h2>
      <span class="location">Buenos Aires</span>
    </div>
    
    <div class="weather-content">
      <div class="temperature">24°C</div>
      <div class="condition">Soleado</div>
    </div>

    <div class="weather-details">
      <div class="detail">
        <span class="label">💧 Humedad</span>
        <span class="value">65%</span>
      </div>
      <div class="detail">
        <span class="label">💨 Viento</span>
        <span class="value">12 km/h</span>
      </div>
    </div>
  </div>
</template>

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