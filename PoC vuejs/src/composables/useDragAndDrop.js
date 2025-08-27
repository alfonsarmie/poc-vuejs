import { ref } from 'vue'

export function useDragAndDrop(widgets) {
  const draggedItem = ref(null)
  const isDragging = ref(false)

  const startDrag = (event, index) => {
    isDragging.value = true
    draggedItem.value = index
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', index.toString())
    
    // Efecto visual al arrastrar
    event.currentTarget.style.opacity = '0.5'
  }

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    
    // Efecto visual al pasar sobre otro widget
    event.currentTarget.style.background = '#f0f9ff'
    event.currentTarget.style.border = '2px dashed #3b82f6'
  }

  const onDragLeave = (event) => {
    // Restaurar estilos al salir
    event.currentTarget.style.background = 'white'
    event.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)'
  }

  const onDrop = (event, targetIndex) => {
    event.preventDefault()
    
    // Restaurar estilos
    event.currentTarget.style.background = 'white'
    event.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)'
    
    if (draggedItem.value !== null && draggedItem.value !== targetIndex) {
      // Reordenar los widgets
      const items = [...widgets.value]
      const [movedItem] = items.splice(draggedItem.value, 1)
      items.splice(targetIndex, 0, movedItem)
      
      widgets.value = items
      
      // Guardar en localStorage
      localStorage.setItem('dashboardLayout', JSON.stringify(items))
    }
    
    isDragging.value = false
    draggedItem.value = null
  }

  const onDragEnd = (event) => {
    // Restaurar estilos al finalizar
    event.currentTarget.style.opacity = '1'
    event.currentTarget.style.background = 'white'
    event.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)'
    
    isDragging.value = false
    draggedItem.value = null
  }

  return {
    startDrag,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    isDragging
  }
}