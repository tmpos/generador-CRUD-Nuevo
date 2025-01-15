<template>
  <div>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <h2 class="text-xl">Bienvenido al Generador de Componentes de PrimeVue</h2>
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
        to="/componentsprimevue"
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
/**********************************************************************/
const promptForTable = async () => {
  const { value: tableName } = await Swal.fire({
    title: "Enter Table Name",
    input: "text",
    inputPlaceholder: "Enter the name of the table",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a table name!";
      }
    },
  });

  if (tableName) {
    const { value: queryType } = await Swal.fire({
      title: "Select Query Type",
      input: "select",
      inputOptions: {
        datoscampo: "datoscampo",
        datosporcampocondicion: "datosporcampocondicion",
        datostimestamp: "datostimestamp",
        datosarray: "datosarray",
        datosarraypost: "datosarraypost",
        campos: "campos",
        ultimosx: "ultimosx",
        camposytipo: "camposytipo",
        buscarduplicados: "buscarduplicados",
        datoscondicion: "datoscondicion",
        datoscondicionultimo: "datoscondicionultimo",
        datosarraycondicion: "datosarraycondicion",
        datosarraydoblecondicion: "datosarraydoblecondicion",
        datosporcolumna: "datosporcolumna",
        tablas: "tablas",
        insertar: "insertar",
        actualizarcampos: "actualizarcampos",
        borrar: "borrar",
        borrartodo: "borrartodo",
        contarregistros: "contarregistros",
        datosmax: "datosmax",
        codificarpassword: "codificarpassword",
      },
      inputPlaceholder: "Select query type",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a query type!";
        }
      },
    });

    if (queryType) {
      let additionalFields = {};
      let method = "GET";

      switch (queryType) {
        case "datoscampo":
          additionalFields = {
            campo: { input: "text", placeholder: "Enter field name" },
            valor: { input: "text", placeholder: "Enter value" },
          };
          method = "GET";
          break;
        case "datosporcampocondicion":
          additionalFields = {
            campos: { input: "text", placeholder: "Enter fields (default *)" },
            campo: { input: "text", placeholder: "Enter field name" },
            valor: { input: "text", placeholder: "Enter value" },
          };
          method = "POST";
          break;
          case "datosarraycondicion":
            additionalFields = {
              campo: { input: "text", placeholder: "Enter field name" },
              valor: { input: "text", placeholder: "Enter value" },
            };
            method = "POST";
            break;
        case "datostimestamp":
          additionalFields = {
            campo: { input: "text", placeholder: "Enter field name" },
            fechainicio: { input: "text", placeholder: "Enter start date" },
            fechafin: { input: "text", placeholder: "Enter end date" },
          };
          method = "POST";
          break;
        case "datosarraypost":
        case "insertar":
        case "borrartodo":
        case "contarregistros":
          method = "POST";
          break;
        case "datosarray":
        case "campos":
        case "tablas":
          method = "GET";
          break;
        case "actualizarcampos":
        case "borrar":
          additionalFields = {
            id: { input: "text", placeholder: "Enter ID" },
          };
          method = "POST";
          break;
        case "datosmax":
          additionalFields = {
            campo: { input: "text", placeholder: "Enter field name" },
          };
          method = "POST";
          break;
        case "codificarpassword":
          additionalFields = {
            password: { input: "password", placeholder: "Enter password" },
          };
          method = "POST";
          break;
        // Add cases for other query types as needed
      }

      const additionalValues = await promptForAdditionalFields(additionalFields);

      if (additionalValues) {
        const generatedCode = generateFetchCode(tableName, queryType, additionalValues, method);

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
    }
  }
};

const promptForAdditionalFields = async (fields) => {
  const inputs = {};
  for (const [key, value] of Object.entries(fields)) {
    const { value: inputValue } = await Swal.fire({
      title: `Enter ${key}`,
      input: value.input,
      inputPlaceholder: value.placeholder,
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return `You need to provide a value for ${key}!`;
        }
      },
    });
    if (inputValue) {
      inputs[key] = inputValue;
    } else {
      return null;
    }
  }
  return inputs;
};

const generateFetchCode = (tableName, queryType, additionalValues, method) => {
  let params = `{ tabla: '${tableName}' }`;
  if (additionalValues) {
    params = `{ tabla: '${tableName}', ${Object.entries(additionalValues).map(([key, value]) => `${key}: '${value}'`).join(", ")} }`;
  }

  return `
const fetch${capitalizeFirstLetter(tableName)}${capitalizeFirstLetter(queryType)} = async () => {
  try {
    const response = await peticionesFetch(
      \`\${link.value}\${api.value}\`,
      '${queryType}',
      ${params},
      tokenCifrado.value,
      '${method}'
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
};
/**********************************************************************/
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
    title: "Select Position",
    input: "select",
    inputOptions: {
      "top": "Top",
      "right": "Right",
      "bottom": "Bottom",
      "left": "Left",
      "topleft": "Topleft",
      "topright": "Topright",
      "bottomleft": "Bottomleft",
      "bottomright": "Bottomright",
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
      "75": "Grande",
      "50": "Mediana",
      "30": "Chica"
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
<Dialog v-model:visible="visible${title}" position="${animation || 'top'}" modal :style="{ width: '${size}rem' }" header="${title}">
  <template #header>
    <div class="inline-flex align-items-center justify-content-center gap-2">
      <span class="font-bold white-space-nowrap">${title}</span>
    </div>
  </template>

  <fieldset class="border p-3 rounded mb-2">
    <legend class="float-none w-auto px-2">${title}</legend>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        
      </div>
    </div>
  </fieldset>

  <template #footer>
      <Button label="Cerrar" outlined severity="secondary" @click="visible${title} = false" autofocus />
  </template>
</Dialog>

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
    const envio = await window.electron.ipcRenderer.invoke('plantillaPrimeVue', JSON.stringify(jsonData));
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
  const url = 'https://tmposrd.com/actualizaciones/crud/archivos/primeVue.zip';
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
      link.download = 'primeVue.zip';
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
