<template>
  <div class="clock-widget">
    <div class="widget-header">
      <h2 class="widget-title">
        <span class="emoji">⏰</span>
        Reloj Rosario
      </h2>
    </div>
    
    <div class="clock-container">
      <div class="analog-clock">
        <div class="clock-face">
          <div
            class="hand hour-hand"
            :style="{ transform: `rotate(${hourRotation}deg)` }"
          ></div>
          <div
            class="hand minute-hand"
            :style="{ transform: `rotate(${minuteRotation}deg)` }"
          ></div>
          <div
            class="hand second-hand"
            :style="{ transform: `rotate(${secondRotation}deg)` }"
          ></div>
          <div class="center-dot"></div>
        </div>
      </div>
      
      <div class="digital-time">
        <span class="time-icon">🕒</span>
        {{ digitalTime }}
      </div>
    </div>

    <div class="time-info">
      <div class="info-item">
        <span class="label">Ciudad</span>
        <span class="value">Rosario, Argentina</span>
      </div>
      <div class="info-item">
        <span class="label">Zona Horaria</span>
        <span class="value">UTC-3</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Hora actual ajustada a Rosario (UTC-3)
const localTime = ref(new Date())
const rosarioTime = computed(() => {
  const now = localTime.value

  // Convertir a UTC y ajustar a UTC-3 (Rosario)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  return new Date(utc - (3 * 60 * 60000)) // Restar 3 horas para UTC-3
})

// Calcular rotaciones para las manecillas
const hourRotation = computed(() => {
  return (rosarioTime.value.getHours() % 12) * 30 + rosarioTime.value.getMinutes() * 0.5
})

const minuteRotation = computed(() => {
  return rosarioTime.value.getMinutes() * 6
})

const secondRotation = computed(() => {
  return rosarioTime.value.getSeconds() * 6
})

const digitalTime = computed(() => {
  return rosarioTime.value.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

// Actualizar la hora cada segundo
let interval

// Iniciar el intervalo para actualizar cada segundo
onMounted(() => {
  interval = setInterval(() => {
    localTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.clock-widget {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
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

.clock-container {
  text-align: center;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.analog-clock {
  margin-bottom: 1.2rem;
}

.clock-face {
  position: relative;
  width: 140px;
  height: 140px;
  border: 8px solid #2d3748;
  border-radius: 50%;
  margin: 0 auto;
  background: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.hand {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom center;
  border-radius: 4px;
  transition: transform 0.2s cubic-bezier(0.4, 2.3, 0.8, 1);
}

.hour-hand {
  width: 5px;
  height: 35px;
  margin-left: -2.5px;
  background: #2d3748;
  z-index: 3;
}

.minute-hand {
  width: 3px;
  height: 50px;
  margin-left: -1.5px;
  background: #4a5568;
  z-index: 2;
}

.second-hand {
  width: 2px;
  height: 60px;
  margin-left: -1px;
  background: #e53e3e;
  z-index: 1;
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #e53e3e;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.digital-time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #2d3748;
  font-weight: 600;
  gap: 0.5rem;
  background: #f7fafc;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-family: 'Inter', monospace;
  margin-top: 0.8rem;
}

.time-icon {
  font-size: 1.3rem;
}

.time-info {
  background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #cbd5e0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 0.85rem;
  color: #4a5568;
}

.value {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2d3748;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>