<template>
  <div id="terminal-container" class="terminal-container"></div>
</template>

<script setup>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ref, onMounted } from 'vue';

// Recibe `selectedDirectory` como prop
const props = defineProps({
  selectedDirectory: {
    type: String,
    required: true
  }
});

const terminal = ref(null);
const fitAddon = new FitAddon();

onMounted(() => {
  terminal.value = new Terminal();
  terminal.value.loadAddon(fitAddon);
  terminal.value.open(document.getElementById('terminal-container'));
  fitAddon.fit();

  // Mensaje inicial en la terminal
  terminal.value.writeln('Bienvenido a la terminal');
  terminal.value.writeln('Escribe un comando y presiona Enter para ejecutarlo.');

  terminal.value.onData(data => {
    const command = data.trim();
    if (command) {
      executeCommand(command);
    }
  });
});

function writeToTerminal(message) {
  terminal.value.writeln(message);
}

function executeCommand(command) {
  if (!props.selectedDirectory) {
    terminal.value.writeln('Error: No se ha seleccionado un directorio.');
    return;
  }

  terminal.value.writeln(`$ ${command}`);
  window.electron.ipcRenderer.invoke('execute-command', { command, directory: props.selectedDirectory })
    .then(output => {
      terminal.value.writeln(output);
    })
    .catch(error => {
      terminal.value.writeln(`Error: ${error}`);
    });
}

defineExpose({
  writeToTerminal
});
</script>


<style>
.terminal-container {
  width: 100%;
  height: 300px;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}
</style>
