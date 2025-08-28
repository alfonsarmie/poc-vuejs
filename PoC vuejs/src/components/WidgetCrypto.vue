<template>
  <div class="crypto-widget">
    <div class="widget-header">
      <h2 class="widget-title">
        <span class="emoji">💰</span>
        Bitcoin Price
      </h2>
      <div class="live-indicator"></div>
    </div>
    
    <div class="price-container">
      <p class="price">${{ formattedPrice }}</p>
      <div class="update-time">
        <span class="time-icon">⏰</span>
        Actualizado: {{ lastUpdate }}
      </div>
    </div>

    <div class="price-change">
      <div class="change-item">
        <span class="label">Change since the page loaded:</span>
        <span v-if="priceChange > 0" class="value positive">{{ priceChange }}%</span>
        <span v-else-if="priceChange < 0" class="value negative">{{ priceChange }}%</span>
        <span v-else="priceChange = 0" class="value neutral">No change yet!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const initialPrice = ref(null) // Variable reactiva
const price = ref(null) // Variable reactiva

let count = 0; // Contador para la primera carga


const lastUpdate = ref('00:00:00')

// Se actualiza automáticamente cuando price cambia
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price.value)
})



// Función para obtener el precio de la API
const fetchBitcoinPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    if (data && data.bitcoin && data.bitcoin.usd) {
      
      if (count == 0) {
        initialPrice.value = data.bitcoin.usd;
        price.value = initialPrice.value;
        count++;
      }else{
        price.value = data.bitcoin.usd;
      }

      lastUpdate.value = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  } catch (error) {
    console.error('Error al obtener el precio del Bitcoin:', error);
  }
};


// Calcular variacion desde el precio inicial
const priceChange = computed(() => { 

  if (initialPrice.value === null || price.value === null || price.value == initialPrice.value) return 0;
  
  const change = ((price.value - initialPrice.value) / initialPrice.value) * 100;
  return change.toFixed(6); // Retorna con dos decimales

})





onMounted(() => {
  // Simular actualización en tiempo real
  //Actualizar inmediatamente el precio desde la API
  fetchBitcoinPrice();
  
  // Luego actualizar cada 10 segundos
  const interval = setInterval(() => {
    fetchBitcoinPrice();
  }, 20000); // Cada 10 segundos
  


  // Limpiar intervalo al desmontar el componente, evita fugas de memoria (ejecucion segundo plano)
  onUnmounted(() => clearInterval(interval))

})



</script>






















<style scoped>
.crypto-widget {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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

.live-indicator {
  width: 12px;
  height: 12px;
  background-color: #48bb78;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.price-container {
  text-align: center;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #38a169;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', monospace;
}

.update-time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #718096;
  gap: 0.3rem;
}

.time-icon {
  font-size: 0.9rem;
}

.price-change {
  background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid #c6f6d5;
}

.change-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.85rem;
  color: #2d3748;
}

.value {
  font-weight: 600;
  font-size: 0.9rem;
}

.positive {
  color: #38a169;
}

.negative {
  color: #e53e3e;
}

.neutral {
  color: #718096;
}


@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>