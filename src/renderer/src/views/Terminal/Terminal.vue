<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
    <h2 class="text-xl">Bienvenido al Generador de CRUD</h2>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <div class="grid grid-cols-4 gap-4">
      <router-link
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
        to="/"
      >
        <i class="pi pi-home p-1 text-3xl"></i>
        <span>HOME</span>
      </router-link>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <input type="file" @change="selectDirectory" webkitdirectory directory multiple style="display: none;" ref="fileInput" />

  <div class="mb-5">
    <label for="addonsRight">Seleccionar Directorio</label>
    <div class="flex">
    <input 
      type="text" 
      v-model="selectedDirectory" 
      class="input-directory form-input ltr:rounded-r-none rtl:rounded-l-none" 
      placeholder="Selecciona o escribe el directorio" 
      readonly
    />
    <button @click="openFileDialog" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none">Seleccionar Directorio</button>
    </div>
  </div>



  </div>

  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <div class="grid grid-cols-5 gap-4">
      <button @click="executeCommand('npm install')" class="btn btn-primary btn-sm">npm install</button>
      <button @click="executeCommand('npm run dev')" class="btn btn-primary btn-sm">npm run dev</button>
      <button @click="executeCommand('npm build')" class="btn btn-primary btn-sm">npm build</button>
      <button @click="executeCommand('npm build:win')" class="btn btn-primary btn-sm">npm build:win</button>
      <button @click="executeCommand('rmdir /S /Q node_modules')" class="btn btn-danger btn-sm">Eliminar node_modules</button>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
    <textarea 
      v-model="commandInput" 
      class="terminal-input" 
      placeholder="Escribe un comando..."
      @keyup.enter="executeInputCommand"
    ></textarea>
    <button @click="executeInputCommand" class="btn btn-primary btn-sm">Ejecutar</button>
    <div class="terminal-output">
      <div v-for="(line, index) in terminalOutput" :key="index" class="terminal-line">
        {{ line }}
      </div>
    </div>
  </div>

  <Loading v-if="isLoading" />
</template>

<script setup>
import { ref } from 'vue';
import Loading from '../../components/LoadingOverlay.vue'
const selectedDirectory = ref(null);
const fileInput = ref(null);
const commandInput = ref("");
const terminalOutput = ref([]);
const isLoading = ref(false);

function selectDirectory(event) {
  const files = event.target.files;
  if (files.length > 0) {
    // Extraer el directorio base desde el path del primer archivo
    const fullPath = files[0].path;
    const directory = fullPath.substring(0, fullPath.lastIndexOf("\\"));
    selectedDirectory.value = directory;
    terminalOutput.value.push(`Directorio seleccionado: ${selectedDirectory.value}`);
  }
}

function openFileDialog() {
  fileInput.value.click();
}

async function executeCommand(command) {
  if (selectedDirectory.value) {
    try {
      isLoading.value = true;
      const result = await window.electron.ipcRenderer.invoke('execute-command', { 
        command, 
        directory: selectedDirectory.value 
      });
      terminalOutput.value.push(`$ ${command}`);
      terminalOutput.value.push(result);
    } catch (error) {
      terminalOutput.value.push(`Error: ${error.message}`);
    } finally {
      isLoading.value = false;
    }
  } else {
    terminalOutput.value.push('Por favor, selecciona un directorio primero.');
  }
}

function executeInputCommand() {
  if (commandInput.value.trim()) {
    executeCommand(commandInput.value);
    commandInput.value = "";
  }
}
</script>

<style>
.input-directory {
  width: 300px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.terminal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.terminal-output {
  background-color: #000;
  color: #fff;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  border-radius: 4px;
  font-family: monospace;
}

.terminal-line {
  white-space: pre-wrap;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
