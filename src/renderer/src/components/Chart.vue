<template>
  <div class="p-4  rounded-lg shadow-md dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart as ChartJS } from 'chart.js/auto'

// Propiedades del componente
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  legends: {
    type: Array,
    required: true
  }
})

// Referencia al canvas del gráfico
const chartCanvas = ref(null)

onMounted(() => {
  if (!chartCanvas.value) {
    console.error("No se encontró el canvas para renderizar el gráfico.")
    return
  }

  // Inicialización del gráfico usando las propiedades definidas
  new ChartJS(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.labels, // Acceso correcto a labels
      datasets: props.data.map((dataset, index) => ({
        label: props.legends[index],
        data: dataset,
        backgroundColor: `${props.colors[index]}80`, // Color transparente
        borderColor: props.colors[index],
        borderWidth: 2,
        fill: true
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#e5e7eb' } }
      }
    }
  })
})
</script>

<style>


/* Ajusta el canvas */
canvas {
  width: 100%; /* Ajusta el ancho del gráfico al contenedor */
  max-height: 400px; /* Establece una altura máxima para evitar que crezca demasiado */
  display: block; /* Evita espacios extra alrededor del canvas */
}
</style>
