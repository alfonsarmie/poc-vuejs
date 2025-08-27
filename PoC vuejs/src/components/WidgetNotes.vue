<template>
  <div class="notes-widget">
    <div class="widget-header">
      <h2 class="widget-title">
        <span class="emoji">📝</span>
        Notas
      </h2>
      <div class="notes-actions">
        <button 
          @click="clearNotes" 
          class="action-btn"
          title="Limpiar notas"
        >
          🗑️
        </button>
        <button 
          @click="toggleFocusMode" 
          class="action-btn"
          :class="{ 'active': focusMode }"
          title="Modo concentración"
        >
          🔍
        </button>
      </div>
    </div>
    
    <div class="notes-content" :class="{ 'focus-mode': focusMode }">
      <textarea
        v-model="note"
        placeholder="Escribe tus ideas aquí..."
        class="notes-textarea"
        :class="{ 'focus-mode': focusMode }"
        @focus="isFocused = true"
        @blur="isFocused = false"
        ref="textareaRef"
      ></textarea>
      
      <div class="notes-footer">
        <div class="notes-stats">
          <span class="char-count">{{ note.length }} caracteres</span>
          <span class="word-count">{{ wordCount }} palabras</span>
        </div>
        <div class="save-status">
          <span v-if="isSaving" class="saving">⏳ Guardando...</span>
          <span v-else class="saved">✅ Guardado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'

const note = ref('')
const isSaving = ref(false)
const isFocused = ref(false)
const focusMode = ref(false)
const textareaRef = ref(null)
let saveTimeout = null

// Estadísticas
const wordCount = computed(() => {
  return note.value.trim() ? note.value.trim().split(/\s+/).length : 0
})

// Cargar notas guardadas
onMounted(() => {
  const savedNote = localStorage.getItem('dashboardNote')
  if (savedNote) {
    note.value = savedNote
  }
})

// Guardar con debounce
watch(note, (newValue) => {
  isSaving.value = true
  
  // Cancelar el guardado anterior si existe
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  // Guardar después de 1 segundo de inactividad
  saveTimeout = setTimeout(() => {
    localStorage.setItem('dashboardNote', newValue)
    isSaving.value = false
  }, 1000)
})

const clearNotes = () => {
  if (confirm('¿Estás seguro de que quieres borrar todas las notas?')) {
    note.value = ''
    localStorage.removeItem('dashboardNote')
  }
}

const toggleFocusMode = () => {
  focusMode.value = !focusMode.value
  if (focusMode.value && textareaRef.value) {
    textareaRef.value.focus()
  }
}
</script>

<style scoped>
.notes-widget {
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

.notes-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: #edf2f7;
  transform: scale(1.1);
}

.action-btn.active {
  background: #bee3f8;
  border-color: #63b3ed;
}

.notes-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notes-content.focus-mode {
  background: #fffaf0;
  border-radius: 12px;
  padding: 0.5rem;
}

.notes-textarea {
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  resize: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  transition: all 0.3s ease;
  background: white;
}

.notes-textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.notes-textarea.focus-mode {
  background: #fffaf0;
  border-color: #f6ad55;
  font-size: 1.1rem;
  line-height: 1.6;
}

.notes-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  padding: 0.5rem 0;
}

.notes-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #718096;
}

.char-count, .word-count {
  background: #f7fafc;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-weight: 500;
}

.save-status {
  font-size: 0.8rem;
}

.saving {
  color: #ed8936;
  font-weight: 500;
}

.saved {
  color: #38a169;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .notes-footer {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .notes-stats {
    gap: 0.5rem;
  }
}
</style>