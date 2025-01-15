<template>
  <div>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <h2 class="text-xl">Bienvenido al Generador de Componentes VRISTO</h2>
    </div>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <div class="grid grid-cols-5 gap-4">
        <!-- Router Links -->

        <a 
          href="#" class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
          @click="downloadFile"
        >
          <i class="pi pi-angle-double-down p-1 text-3xl"></i> 
          <span>ARCHIVOS</span>
        </a>


      <router-link 
        class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
        to="/components"
      >
        <i class="pi pi-box p-1 text-3xl"></i> 
        <span>COMPONENTS</span>
      </router-link>


        <button 
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
          @click="fnGenerarPlantilla"
        >
          <i class="pi pi-pen-to-square p-1 text-3xl"></i> 
          <span>PLANTILLA</span>
        </button>

        <button 
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
          @click="fnGenerarModal"
        >
          <i class="pi pi-box p-1 text-3xl"></i> 
          <span>MODAL</span>
        </button>

        <!-- Button to Generate Fetch Code -->
        <button 
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold" 
          @click="promptForTable"
        >
          <i class="pi pi-wifi p-1 text-3xl"></i> 
          <span>Generar FETCH</span>
        </button>


      </div>
    </div>
  </div>
</template>

<script setup>
  // @ts-nocheck
import {
  enviarDatosPorPost,
  eliminarDatos,
  obtenerIdsSeleccionados,
  borrarTodoslosDatos,
  nfecha,
  encryptarPassword,
  generarCodigoUnico,
  arrayToObjetoFromTabla,
  peticionesFetch,
  envioElectron,
  mensajetoast,
  toast,
  crearTablaSiNoExiste,
  peticiones,
  lasMayusculas,
} from "../funciones/funciones.js";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Function to prompt for table name and generate fetch code
const promptForTable = async () => {
  const { value: tableName } = await Swal.fire({
    title: "Enter Table Name",
    input: "text",
    inputPlaceholder: "Enter the name of the table",
    showCancelButton: true,
    confirmButtonText: "Generate",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a table name!";
      }
    },
  });

  if (tableName) {
    // Generate Fetch Code
    const generatedCode = `
const fetch${capitalizeFirstLetter(tableName)} = async () => {
  try {
    const response = await peticionesFetch(
      \`\${link.value}\${api.value}\`,
      'datosarraypost',
      { tabla: '${tableName}' },
      tokenCifrado.value,
      'POST'
    );
    ${tableName}Data.value = response;
    //${tableName}DataNames.value = response.map(${tableName}=>${tableName}.name);
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to fetch data from ${tableName}', 
      life: 3000 
    });
  }
};
`;

    // Show the generated code in a SweetAlert modal
    await Swal.fire({
      title: "Generated Code",
      html: `
        <textarea 
          readonly 
          style="width: 100%; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; font-family: monospace;"
        >${generatedCode}</textarea>
      `,
      showCloseButton: true,
      confirmButtonText: "Copy to Clipboard",
      didOpen: () => {
        const textarea = document.querySelector("textarea");
        if (textarea) textarea.select(); // Automatically select the code
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(generatedCode).then(() => {
          Swal.fire("Copied!", "The code has been copied to your clipboard.", "success");
        });
      }
    });
  }
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


// Function to generate modal based on user input
const fnGenerarModal = async () => {
  // Prompt for title
  const { value: title } = await Swal.fire({
    title: "Enter Modal Title",
    input: "text",
    inputPlaceholder: "Enter the modal title",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a title!";
      }
    },
  });

  if (!title) return; // If the user cancels, exit

  // Prompt for animation
  const { value: animation } = await Swal.fire({
    title: "Select Animation",
    input: "select",
    inputOptions: {
      "ease-out": "Ease-Out",
      "ease-in": "Ease-In",
      "ease-in-out": "Ease-In-Out",
      "none": "No Animation",
    },
    inputPlaceholder: "Select an animation type",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
  });

  if (!animation) return; // If the user cancels, exit

  // Prompt for size
  const { value: size } = await Swal.fire({
    title: "Enter Modal Width (e.g., max-w-lg, max-w-md)",
    input: "select",
    inputOptions: {
      "max-w-2xl": "Grande",
      "max-w-xl": "Mediana",
      "max-w-sm": "Chica"
    },
    showCancelButton: true,
    confirmButtonText: "Generate",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a size!";
      }
    },
  });

  if (!size) return; // If the user cancels, exit

  // Generate Modal Code
  const generatedCode = `


<TransitionRoot appear :show="modalVisible${title}" as="template">
    <Dialog as="div" @close="modalVisible${title} = false" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed inset-0 bg-[black]/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start justify-center px-4 py-8">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark ${size}">
              <button type="button" class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none" @click="modalVisible${title} = false">
                <i class="pi pi-times"></i>
              </button>
              <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">${title}</div>
              <div class="p-5">
                
                <p>
                Este es el contenido de la modal. Puedes personalizarlo según sea necesario.
               </p>

                <div class="flex justify-end items-center mt-8">
                  <button type="button" @click="modalVisible${title} = false" class="btn btn-outline-danger">Discard</button>
                  <button type="button" @click="modalVisible${title} = false" class="btn btn-primary ltr:ml-4 rtl:mr-4">Save</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

`;

  // Show the generated code in a SweetAlert modal
  await Swal.fire({
    title: "Generated Modal Code",
    html: `
      <textarea 
        readonly 
        style="width: 100%; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; font-family: monospace;"
      >${generatedCode}</textarea>
    `,
    showCloseButton: true,
    confirmButtonText: "Copy to Clipboard",
    didOpen: () => {
      const textarea = document.querySelector("textarea");
      if (textarea) textarea.select(); // Automatically select the code
    },
  }).then((result) => {
    if (result.isConfirmed) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        Swal.fire("Copied!", "The modal code has been copied to your clipboard.", "success");
      });
    }
  });
};

const fnGenerarPlantilla = async () => {
  // Importa SweetAlert2 si aún no lo has hecho (solo si no está disponible globalmente)
  // import Swal from 'sweetalert2';

  const { value: nombre } = await Swal.fire({
    title: 'Generar Plantilla',
    text: 'Ingresa un nombre para la plantilla:',
    input: 'text', // Tipo de entrada: texto
    inputPlaceholder: 'Nombre de la plantilla',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return '¡El nombre es obligatorio!';
      }
    }
  });

  if (nombre) {
    const jsonData = {
      tableName: nombre
    }
    const envio = await window.electron.ipcRenderer.invoke('plantillaVristo', JSON.stringify(jsonData));
    console.log("envio", envio);
 
     if (envio.success) {
      toast.add({
        severity: 'success',
        summary: 'OK',
        detail: 'PLANTILLA generada correctamente',
        life: 3000,
      });
    } else {
      toast.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al Generar la PLANTILLA',
        life: 3000,
      });
    }


  } else {
    console.log('Acción cancelada por el usuario');
  }
};


// Function to download file and show progress
const downloadFile = () => {
  const url = 'https://tmposrd.com/actualizaciones/crud/archivos/vristo.zip';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';

  let progressSwal;

  xhr.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      if (!progressSwal) {
        progressSwal = Swal.fire({
          title: 'Descargando...',
          html: `Progreso: ${percentComplete.toFixed(2)}%`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      } else {
        progressSwal.update({
          html: `Progreso: ${percentComplete.toFixed(2)}%`,
        });
      }
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'vristo.zip';
      link.click();
      Swal.fire('Descarga Completa', 'El archivo ha sido descargado correctamente.', 'success');
    } else {
      Swal.fire('Error', 'Hubo un problema al descargar el archivo.', 'error');
    }
  };

  xhr.onerror = () => {
    Swal.fire('Error', 'Hubo un problema al descargar el archivo.', 'error');
  };

  xhr.send();
};

</script>

<style scoped>
/* Optional styling */
</style>
