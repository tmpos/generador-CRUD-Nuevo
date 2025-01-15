<template>
    <div class="file-uploader" style="margin:0 !important">
        <h2 class="mb-2 uppercase">Subir archivos</h2>

        <!-- Input para seleccionar archivos -->
        <div class="file-upload-container" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">
            <div class="file-upload-area" :class="{ dragging: isDragging }">
                <p v-if="!files.length">Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos</p>
                <input type="file" multiple :accept="acceptedFileTypes" @change="handleFileUpload"
                    style="display: none;" ref="fileInput" />
                <button class="btn-upload" @click="selectFiles" type="button">Seleccionar archivos</button>
            </div>
        </div>

        <!-- Mostrar archivos seleccionados (previsualización) si showPreview es true -->
        <div v-if="showPreview && files.length" class="previews">
            <div v-for="(file, index) in files" :key="index" class="preview">
                <!-- Si es una imagen, mostrar la previsualización -->
                <div v-if="isImage(file)">
                    <img :src="getImagePreview(file)" alt="Vista previa" width="100" />
                </div>
                <!-- Si no es una imagen, mostrar un icono genérico -->
                <div v-else class="file-icon">📄</div>
                <!-- Botón para eliminar el archivo -->
                <button @click="removeFile(index)">X</button>
            </div>
        </div>

        <!-- Botón para subir archivos manualmente si autoUpload es false -->
        <div v-if="!props.autoUpload && files.length">
            <button @click.prevent="uploadFiles" class="btn-upload-manual">Subir Archivos</button>
        </div>

        <!-- Mensaje de estado de la subida -->
        <div v-if="uploadStatus === 'uploading'" class="uploading-message">Subiendo archivos...</div>
        <div v-if="uploadStatus === 'success'" class="success-message">Archivos subidos exitosamente</div>
        <div v-if="uploadStatus === 'error'" class="error-message">Error al subir los archivos</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Props recibidas del componente padre
const props = defineProps({
  uploadUrl: {
    type: String,
    required: true
  },
  additionalData: {
    type: Object,
    default: () => ({})
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  onSuccess: Function, // Callback para cuando la subida es exitosa
  onError: Function,    // Callback para cuando la subida falla
  showPreview: {
    type: Boolean,
    default: true // Mostrar previsualización por defecto
  }
});

// Variables reactivas
const files = ref([]);
const isDragging = ref(false);
const uploadStatus = ref('');

// Tipos de archivos permitidos
const acceptedFileTypes = 'image/*,.pdf,.txt,.doc,.docx';

// Función para manejar la selección de archivos desde el input
const handleFileUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);
  files.value = selectedFiles;

  // Si autoUpload está activado, subimos automáticamente
  if (props.autoUpload) {
    uploadFiles();
  }
};

// Función para subir los archivos al servidor
const uploadFiles = async () => {
  if (!props.uploadUrl) return;

  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append('files[]', file);
  });

  // Añadir la ruta y otros datos adicionales si existen
  if (props.additionalData) {
    Object.keys(props.additionalData).forEach(key => {
      formData.append(key, props.additionalData[key]);
    });
  }

  try {
    uploadStatus.value = 'uploading'; // Estado: subiendo

    const response = await axios.post(props.uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    uploadStatus.value = 'success'; // Estado: éxito

    if (props.onSuccess) {
      props.onSuccess(response.data);
    }

    files.value = [];

  } catch (error) {
    uploadStatus.value = 'error'; // Estado: error
    //console.error('Error al subir los archivos:', error);

    // Ejecutar el callback de error si se ha proporcionado
    if (props.onError) {
      props.onError(error);
    }
  }
};

// Verificar si el archivo es una imagen
const isImage = (file) => file.type.startsWith('image/');

// Obtener una URL para la previsualización de imágenes
const getImagePreview = (file) => URL.createObjectURL(file);

// Función para eliminar un archivo de la lista
const removeFile = (index) => files.value.splice(index, 1);

// Función para abrir el selector de archivos
const selectFiles = () => document.querySelector('input[type="file"]').click();

// Funciones para manejar el arrastre de archivos
const handleDragOver = () => isDragging.value = true;

const handleFileDrop = (event) => {
  isDragging.value = false;
  const droppedFiles = Array.from(event.dataTransfer.files);
  files.value = droppedFiles;

  if (props.autoUpload) {
    uploadFiles();
  }
};

defineExpose({
  uploadFiles
});
</script>

<style scoped>
/* Estilos del componente */
.file-uploader {
  margin: 20px;
}

/* Otros estilos... */
.btn-upload-manual {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-upload-manual:hover {
  background-color: #0056b3;
}

/* Estilos del componente */
.file-uploader {
  margin: 20px;
}

.file-upload-container {
  border: 2px dashed #ccc;
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.file-upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
}

.file-upload-area.dragging {
  border-color: #333;
}

.file-upload-area p {
  font-size: 16px;
  color: #777;
}

.previews {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.preview {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.file-icon {
  font-size: 48px;
}

.preview button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

img {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.uploading-message,
.success-message,
.error-message {
  margin-top: 20px;
  font-size: 16px;
}

.uploading-message {
  color: #007bff;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}
</style>
