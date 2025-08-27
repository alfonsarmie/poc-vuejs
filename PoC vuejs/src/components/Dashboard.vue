<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1 class="dashboard-title">🌟 Dashboard Interactivo</h1>
      <p class="dashboard-subtitle">Arrastra y suelta para organizar tus widgets</p>
    </header>
    
    <div class="widgets-grid">
      <div 
        v-for="(widget, index) in widgets" 
        :key="index"
        class="widget"
        draggable="true"
        @dragstart="startDrag($event, index)"
        @dragover="onDragOver($event)"
        @dragleave="onDragLeave($event)"
        @drop="onDrop($event, index)"
        @dragend="onDragEnd($event)"
      >
        <component :is="widget.component" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDragAndDrop } from '../composables/useDragAndDrop'
import WidgetCrypto from './WidgetCrypto.vue'
import WidgetWeather from './WidgetWeather.vue'
import WidgetNotes from './WidgetNotes.vue'

// Layout inicial con persistencia
const defaultWidgets = [
  { component: WidgetCrypto },
  { component: WidgetWeather },
  { component: WidgetNotes }
]

const widgets = ref([...defaultWidgets])

// Cargar layout guardado
onMounted(() => {
  const savedLayout = localStorage.getItem('dashboardLayout')
  if (savedLayout) {
    try {
      const layout = JSON.parse(savedLayout)
      // Reconstruir componentes desde los nombres
      widgets.value = layout.map(item => ({
        component: getComponentByName(item.component)
      }))
    } catch (error) {
      console.warn('Error loading layout, using default:', error)
    }
  }
})

const getComponentByName = (name) => {
  const components = {
    'WidgetCrypto': WidgetCrypto,
    'WidgetWeather': WidgetWeather,
    'WidgetNotes': WidgetNotes
  }
  return components[name] || WidgetCrypto
}

const { startDrag, onDragOver, onDragLeave, onDrop, onDragEnd } = useDragAndDrop(widgets)
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.dashboard-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  color: #718096;
  font-weight: 400;
}

.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.widget {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.05),
    0 5px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  cursor: grab;
  min-height: 220px;
}

.widget:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
}

.widget:active {
  cursor: grabbing;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .widgets-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-title {
    font-size: 1.8rem;
  }
}
</style>