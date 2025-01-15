<template>
  <div>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <h2 class="text-xl">Bienvenido al Generador de Componentes de PrimeVue</h2>
    </div>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 flex items-center justify-center">
      <div class="grid grid-cols-5 gap-4">
        <!-- Router Links -->
        <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarCheckBox"
        >
          <i class="pi pi-check-square p-1 text-3xl"></i>
          <span>CHECKBOX</span>
        </button>

        <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarColorPicker"
        >
          <i class="pi pi-check-circle p-1 text-3xl"></i>
          <span>COLORPICKER</span>
        </button>

        <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarDatePicker"
        >
          <i class="pi pi-calendar p-1 text-3xl"></i>
          <span>DATEPICKER</span>
        </button>

        <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarButton"
        >
          <i class="pi pi-bars p-1 text-3xl"></i>
          <span>BUTTON</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarInput"
        >
          <i class="pi pi-pen-to-square p-1 text-3xl"></i>
          <span>INPUT</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarInputNumber"
        >
          <i class="pi pi-sort-numeric-down p-1 text-3xl"></i>
          <span>INPUTNUMBER</span>
        </button>


       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarInputMask"
        >
          <i class="pi pi-at p-1 text-3xl"></i>
          <span>INPUTMASK</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarInputOtp"
        >
          <i class="pi pi-pen-to-square p-1 text-3xl"></i>
          <span>OTP</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarRadioButton"
        >
          <i class="pi pi-check-circle p-1 text-3xl"></i>
          <span>RADIO</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarSelectButton"
        >
          <i class="pi pi-list-check p-1 text-3xl"></i>
          <span>SELECT BUTTON</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarTextarea"
        >
          <i class="pi pi-expand p-1 text-3xl"></i>
          <span>TEXTAREA</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarToggleButton"
        >
          <i class="pi pi-arrow-right-arrow-left p-1 text-3xl"></i>
          <span>TOGGLE BUTTON</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarToggleSwitch"
        >
          <i class="pi pi-verified p-1 text-3xl"></i>
          <span>TOGGLE SWITCH</span>
        </button>

       <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarCard"
        >
          <i class="pi pi-stop p-1 text-3xl"></i>
          <span>CARD</span>
        </button>

      <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarFieldset"
        >
          <i class="pi pi-credit-card p-1 text-3xl"></i>
          <span>FIELDSET</span>
        </button>

      <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarDrawer"
        >
          <i class="pi pi-window-maximize p-1 text-3xl"></i>
          <span>DRAWER</span>
        </button>

      <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarToast"
        >
          <i class="pi pi-tags p-1 text-3xl"></i>
          <span>TOAST</span>
        </button>

      <button
          class="btn btn-primary btn-sm flex flex-col items-center font-bold w-24 h-24 border border-gray-300 rounded-md shadow justify-center font-semibold"
          @click="fnGenerarSelect"
        >
          <i class="pi pi-sort p-1 text-3xl"></i>
          <span>SELECT</span>
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

/**************************************************/
const fnGenerarCheckBox = async () => {
  const { value: checkboxName } = await Swal.fire({
    title: "Enter Checkbox Name",
    input: "text",
    inputPlaceholder: "Enter the name of the checkbox",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a checkbox name!";
      }
    },
  });

  if (checkboxName) {
    const { value: checkboxType } = await Swal.fire({
      title: "Select Checkbox Type",
      input: "radio",
      inputOptions: {
        simple: "Simple",
        label: "With Label",
      },
      inputPlaceholder: "Select checkbox type",
      showCancelButton: true,
      confirmButtonText: "Generate",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a checkbox type!";
        }
      },
    });

    if (checkboxType) {
      let generatedCode = '';

      if (checkboxType === 'simple') {
        generatedCode = `
<div class="card flex justify-center">
  <Checkbox v-model="${checkboxName}" binary />
</div>
`;
      } else if (checkboxType === 'label') {
        generatedCode = `
<div class="flex items-center gap-2">
  <Checkbox v-model="${checkboxName}" inputId="id${checkboxName}" name="${checkboxName}"  />
  <label for="id${checkboxName}"> ${checkboxName.toUppercase()} </label>
</div>
`;
      }

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
  }
};

/**************************************************/
const fnGenerarColorPicker = async () => {
  const { value: colorPickerName } = await Swal.fire({
    title: "Enter Color Picker Name",
    input: "text",
    inputPlaceholder: "Enter the name of the color picker",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a color picker name!";
      }
    },
  });

  if (colorPickerName) {
    const { value: colorFormat } = await Swal.fire({
      title: "Select Color Format",
      input: "radio",
      inputOptions: {
        hex: "HEX",
        rgb: "RGB",
        hsb: "HSB",
      },
      inputPlaceholder: "Select color format",
      showCancelButton: true,
      confirmButtonText: "Generate",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a color format!";
        }
      },
    });

    if (colorFormat) {
      let generatedCode = '';

      if (colorFormat === 'hex') {
        generatedCode = `
<div class="card flex justify-center">
  <ColorPicker v-model="${colorPickerName}" format="hex" />
</div>
`;
      } else if (colorFormat === 'rgb') {
        generatedCode = `
<div class="card flex justify-center">
  <ColorPicker v-model="${colorPickerName}" format="rgb" />
</div>
`;
      } else if (colorFormat === 'hsb') {
        generatedCode = `
<div class="card flex justify-center">
  <ColorPicker v-model="${colorPickerName}" format="hsb" />
</div>
`;
      }

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
  }
};

/**************************************************/
const fnGenerarDatePicker = async () => {
  const { value: datePickerName } = await Swal.fire({
    title: "Enter Date Picker Name",
    input: "text",
    inputPlaceholder: "Enter the name of the date picker",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a date picker name!";
      }
    },
  });

  if (datePickerName) {
    const { value: datePickerType } = await Swal.fire({
      title: "Select Date Picker Type",
      input: "radio",
      inputOptions: {
        date: "Date Only",
        time: "Time Only",
        both: "Date and Time",
      },
      inputPlaceholder: "Select date picker type",
      showCancelButton: true,
      confirmButtonText: "Generate",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a date picker type!";
        }
      },
    });

    if (datePickerType) {
      let generatedCode = '';

      if (datePickerType === 'date') {
        generatedCode = `
<div class="card flex justify-center">
  <DatePicker v-model="${datePickerName}" dateFormat="dd/mm/yy" />
</div>
`;
      } else if (datePickerType === 'time') {
        generatedCode = `
<div class="card flex justify-center">
  <DatePicker v-model="${datePickerName}" timeOnly />
</div>
`;
      } else if (datePickerType === 'both') {
        generatedCode = `
<div class="flex-auto">
  <label for="datepicker-12h" class="font-bold block mb-2"> 12h Format </label>
  <DatePicker id="datepicker-12h" v-model="${datePickerName}" showTime hourFormat="12" fluid />
</div>
`;
      }

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
  }
};

/**************************************************/
const fnGenerarButton = async () => {
  const { value: buttonLabel } = await Swal.fire({
    title: "Enter Button Label",
    input: "text",
    inputPlaceholder: "Enter the label of the button",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a button label!";
      }
    },
  });

  if (buttonLabel) {
    const { value: hasIcon } = await Swal.fire({
      title: "Does the button have an icon?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the button has an icon",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let icon = '';
    let iconPos = '';

    if (hasIcon === 'yes') {
      const { value: iconName } = await Swal.fire({
        title: "Enter Icon Name",
        input: "text",
        inputPlaceholder: "Enter the name of the icon (e.g., pi pi-home)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide an icon name!";
          }
        },
      });

      if (iconName) {
        icon = `icon="${iconName}"`;

        const { value: iconPosition } = await Swal.fire({
          title: "Select Icon Position",
          input: "radio",
          inputOptions: {
            left: "Left",
            right: "Right",
            top: "Top",
            bottom: "Bottom",
          },
          inputPlaceholder: "Select icon position",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an icon position!";
            }
          },
        });

        if (iconPosition) {
          iconPos = `iconPos="${iconPosition}"`;
        }
      }
    }

    const { value: isRouter } = await Swal.fire({
      title: "Is the button a router link?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the button is a router link",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let routerLink = '';

    if (isRouter === 'yes') {
      const { value: routerPath } = await Swal.fire({
        title: "Enter Router Path",
        input: "text",
        inputPlaceholder: "Enter the router path (e.g., /)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a router path!";
          }
        },
      });

      if (routerPath) {
        routerLink = `as="router-link" to="${routerPath}"`;
      }
    }

    const { value: buttonColor } = await Swal.fire({
      title: "Select Button Color",
      input: "radio",
      inputOptions: {
        primary: "Primary",
        secondary: "Secondary",
        success: "Success",
        info: "Info",
        warn: "Warn",
        help: "Help",
        danger: "Danger",
        contrast: "Contrast",
        none: "None",
      },
      inputPlaceholder: "Select button color",
      showCancelButton: true,
      confirmButtonText: "Generate",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a button color!";
        }
      },
    });

    let color = '';

    if (buttonColor && buttonColor !== 'none') {
      color = `severity="${buttonColor}"`;
    }

    let generatedCode = `
<Button label="${buttonLabel}" ${icon} ${iconPos} ${routerLink} ${color} />
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

/**************************************************/
const fnGenerarInput = async () => {
  const { value: inputName } = await Swal.fire({
    title: "Enter Input Name",
    input: "text",
    inputPlaceholder: "Enter the name of the input",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide an input name!";
      }
    },
  });

  if (inputName) {
    const { value: hasFloatLabel } = await Swal.fire({
      title: "Does the input have a float label?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input has a float label",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let floatLabelCode = '';

    if (hasFloatLabel === 'yes') {
      const { value: floatLabelText } = await Swal.fire({
        title: "Enter Float Label Text",
        input: "text",
        inputPlaceholder: "Enter the text for the float label",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a float label text!";
          }
        },
      });

      if (floatLabelText) {
        floatLabelCode = `
<FloatLabel variant="on">
  <InputText id="${inputName}_label" v-model="${inputName}" />
  <label for="${inputName}_label">${floatLabelText}</label>
</FloatLabel>
`;
      }
    }

    const { value: inputSize } = await Swal.fire({
      title: "Select Input Size",
      input: "radio",
      inputOptions: {
        small: "Small",
        normal: "Normal",
        large: "Large",
      },
      inputPlaceholder: "Select input size",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an input size!";
        }
      },
    });

    let size = '';

    if (inputSize === 'small') {
      size = 'size="small"';
    } else if (inputSize === 'large') {
      size = 'size="large"';
    }

    let generatedCode = '';

    if (hasFloatLabel === 'yes') {
      generatedCode = floatLabelCode;
    } else {
      generatedCode = `
<div class="card flex justify-center">
  <InputText type="text" v-model="${inputName}" ${size} placeholder="Enter ${inputName}" />
</div>
`;
    }

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

/**************************************************/
const fnGenerarInputNumber = async () => {
  const { value: inputName } = await Swal.fire({
    title: "Enter Input Number Name",
    input: "text",
    inputPlaceholder: "Enter the name of the input number",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide an input number name!";
      }
    },
  });

  if (inputName) {
    const { value: useGrouping } = await Swal.fire({
      title: "Use Grouping?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number uses grouping",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let groupingCode = useGrouping === 'no' ? ':useGrouping="false"' : '';

    const { value: hasFractionDigits } = await Swal.fire({
      title: "Set Fraction Digits?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number has fraction digits",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let fractionDigitsCode = '';

    if (hasFractionDigits === 'yes') {
      const { value: minFractionDigits } = await Swal.fire({
        title: "Enter Minimum Fraction Digits",
        input: "number",
        inputPlaceholder: "Enter the minimum fraction digits",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a minimum fraction digits!";
          }
        },
      });

      const { value: maxFractionDigits } = await Swal.fire({
        title: "Enter Maximum Fraction Digits",
        input: "number",
        inputPlaceholder: "Enter the maximum fraction digits",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a maximum fraction digits!";
          }
        },
      });

      fractionDigitsCode = `:minFractionDigits="${minFractionDigits}" :maxFractionDigits="${maxFractionDigits}"`;
    }

    const { value: hasMinMax } = await Swal.fire({
      title: "Set Min and Max Values?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number has min and max values",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let minMaxCode = '';

    if (hasMinMax === 'yes') {
      const { value: minValue } = await Swal.fire({
        title: "Enter Minimum Value",
        input: "number",
        inputPlaceholder: "Enter the minimum value",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a minimum value!";
          }
        },
      });

      const { value: maxValue } = await Swal.fire({
        title: "Enter Maximum Value",
        input: "number",
        inputPlaceholder: "Enter the maximum value",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a maximum value!";
          }
        },
      });

      minMaxCode = `:min="${minValue}" :max="${maxValue}"`;
    }

    const { value: hasLocale } = await Swal.fire({
      title: "Set Locale?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number has a locale",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let localeCode = '';

    if (hasLocale === 'yes') {
      const { value: locale } = await Swal.fire({
        title: "Enter Locale",
        input: "text",
        inputPlaceholder: "Enter the locale (e.g., en-US)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a locale!";
          }
        },
      });

      localeCode = `locale="${locale}"`;
    }

    const { value: hasPrefixSuffix } = await Swal.fire({
      title: "Set Prefix and Suffix?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number has prefix and suffix",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let prefixSuffixCode = '';

    if (hasPrefixSuffix === 'yes') {
      const { value: prefix } = await Swal.fire({
        title: "Enter Prefix",
        input: "text",
        inputPlaceholder: "Enter the prefix",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a prefix!";
          }
        },
      });

      const { value: suffix } = await Swal.fire({
        title: "Enter Suffix",
        input: "text",
        inputPlaceholder: "Enter the suffix",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a suffix!";
          }
        },
      });

      prefixSuffixCode = `prefix="${prefix}" suffix="${suffix}"`;
    }

    const { value: showButtons } = await Swal.fire({
      title: "Show Buttons?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input number shows buttons",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let buttonsCode = '';

    if (showButtons === 'yes') {
      const { value: buttonLayout } = await Swal.fire({
        title: "Select Button Layout",
        input: "radio",
        inputOptions: {
          horizontal: "Horizontal",
          vertical: "Vertical",
        },
        inputPlaceholder: "Select button layout",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select a button layout!";
          }
        },
      });

      buttonsCode = `showButtons buttonLayout="${buttonLayout}"`;
    }

    const { value: inputSize } = await Swal.fire({
      title: "Select Input Size",
      input: "radio",
      inputOptions: {
        small: "Small",
        normal: "Normal",
        large: "Large",
      },
      inputPlaceholder: "Select input size",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an input size!";
        }
      },
    });

    let size = '';

    if (inputSize === 'small') {
      size = 'size="small"';
    } else if (inputSize === 'large') {
      size = 'size="large"';
    }

    let generatedCode = `
<InputNumber v-model="${inputName}" inputId="${inputName}_id" ${groupingCode} ${fractionDigitsCode} ${minMaxCode} ${localeCode} ${prefixSuffixCode} ${buttonsCode} ${size} fluid />
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

/**************************************************/
const fnGenerarInputMask = async () => {
  const { value: inputName } = await Swal.fire({
    title: "Enter Input Mask Name",
    input: "text",
    inputPlaceholder: "Enter the name of the input mask",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide an input mask name!";
      }
    },
  });

  if (inputName) {
    const { value: mask } = await Swal.fire({
      title: "Enter Mask",
      input: "text",
      inputPlaceholder: "Enter the mask (e.g., 99-999999)",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a mask!";
        }
      },
    });

    if (mask) {
      const { value: hasFloatLabel } = await Swal.fire({
        title: "Does the input mask have a float label?",
        input: "radio",
        inputOptions: {
          yes: "Yes",
          no: "No",
        },
        inputPlaceholder: "Select if the input mask has a float label",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an option!";
          }
        },
      });

      let floatLabelCode = '';

      if (hasFloatLabel === 'yes') {
        const { value: floatLabelText } = await Swal.fire({
          title: "Enter Float Label Text",
          input: "text",
          inputPlaceholder: "Enter the text for the float label",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a float label text!";
            }
          },
        });

        if (floatLabelText) {
          floatLabelCode = `
<FloatLabel variant="on">
  <InputMask id="${inputName}_label" v-model="${inputName}" mask="${mask}" />
  <label for="${inputName}_label">${floatLabelText}</label>
</FloatLabel>
`;
        }
      }

      const { value: inputSize } = await Swal.fire({
        title: "Select Input Size",
        input: "radio",
        inputOptions: {
          small: "Small",
          normal: "Normal",
          large: "Large",
        },
        inputPlaceholder: "Select input size",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an input size!";
          }
        },
      });

      let size = '';

      if (inputSize === 'small') {
        size = 'size="small"';
      } else if (inputSize === 'large') {
        size = 'size="large"';
      }

      let generatedCode = '';

      if (hasFloatLabel === 'yes') {
        generatedCode = floatLabelCode;
      } else {
        generatedCode = `
<div class="flex-auto">
  <label for="${inputName}" class="font-bold block mb-2">${inputName.charAt(0).toUpperCase() + inputName.slice(1)}</label>
  <InputMask id="${inputName}" v-model="${inputName}" mask="${mask}" placeholder="${mask}" ${size} fluid />
</div>
`;
      }

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
  }
};

/**************************************************/
const fnGenerarInputOtp = async () => {
  const { value: inputName } = await Swal.fire({
    title: "Enter Input OTP Name",
    input: "text",
    inputPlaceholder: "Enter the name of the input OTP",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide an input OTP name!";
      }
    },
  });

  if (inputName) {
    const { value: hasMask } = await Swal.fire({
      title: "Use Mask?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input OTP uses a mask",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let maskCode = hasMask === 'yes' ? 'mask' : '';

    const { value: integerOnly } = await Swal.fire({
      title: "Integer Only?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input OTP is integer only",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let integerOnlyCode = integerOnly === 'yes' ? 'integerOnly' : '';

    const { value: variant } = await Swal.fire({
      title: "Select Variant",
      input: "radio",
      inputOptions: {
        filled: "Filled",
        none: "None",
      },
      inputPlaceholder: "Select input OTP variant",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a variant!";
        }
      },
    });

    let variantCode = variant === 'filled' ? 'variant="filled"' : '';

    const { value: inputSize } = await Swal.fire({
      title: "Select Input Size",
      input: "radio",
      inputOptions: {
        small: "Small",
        normal: "Normal",
        large: "Large",
      },
      inputPlaceholder: "Select input size",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an input size!";
        }
      },
    });

    let size = '';

    if (inputSize === 'small') {
      size = 'size="small"';
    } else if (inputSize === 'large') {
      size = 'size="large"';
    }

    const { value: hasCustomTemplate } = await Swal.fire({
      title: "Use Custom Template?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the input OTP uses a custom template",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let customTemplateCode = '';

    if (hasCustomTemplate === 'yes') {
      const { value: otpLength } = await Swal.fire({
        title: "Enter OTP Length",
        input: "number",
        inputPlaceholder: "Enter the length of the OTP",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide an OTP length!";
          }
        },
      });

      if (otpLength) {
        customTemplateCode = `
<InputOtp v-model="${inputName}" :length="${otpLength}" style="gap: 0">
  <template #default="{ attrs, events, index }">
    <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
    <div v-if="index === 3" class="px-4">
      <i class="pi pi-minus" />
    </div>
  </template>
</InputOtp>
`;
      }
    }

    let generatedCode = '';

    if (hasCustomTemplate === 'yes') {
      generatedCode = customTemplateCode;
    } else {
      generatedCode = `
<InputOtp v-model="${inputName}" ${maskCode} ${integerOnlyCode} ${variantCode} ${size} />
`;
    }

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

/**************************************************/
const fnGenerarRadioButton = async () => {
  const { value: radioName } = await Swal.fire({
    title: "Enter Radio Button Name",
    input: "text",
    inputPlaceholder: "Enter the name of the radio button",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a radio button name!";
      }
    },
  });

  if (radioName) {
    const { value: radioValue } = await Swal.fire({
      title: "Enter Radio Button Value",
      input: "text",
      inputPlaceholder: "Enter the value of the radio button",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a radio button value!";
        }
      },
    });

    if (radioValue) {
      const { value: hasLabel } = await Swal.fire({
        title: "Does the radio button have a label?",
        input: "radio",
        inputOptions: {
          yes: "Yes",
          no: "No",
        },
        inputPlaceholder: "Select if the radio button has a label",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an option!";
          }
        },
      });

      let labelCode = '';

      if (hasLabel === 'yes') {
        const { value: labelText } = await Swal.fire({
          title: "Enter Label Text",
          input: "text",
          inputPlaceholder: "Enter the text for the label",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a label text!";
            }
          },
        });

        if (labelText) {
          labelCode = `<label for="${radioName}_id">${labelText}</label>`;
        }
      }

      const { value: variant } = await Swal.fire({
        title: "Select Variant",
        input: "radio",
        inputOptions: {
          filled: "Filled",
          none: "None",
        },
        inputPlaceholder: "Select radio button variant",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select a variant!";
          }
        },
      });

      let variantCode = variant === 'filled' ? 'variant="filled"' : '';

      const { value: inputSize } = await Swal.fire({
        title: "Select Input Size",
        input: "radio",
        inputOptions: {
          small: "Small",
          normal: "Normal",
          large: "Large",
        },
        inputPlaceholder: "Select input size",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an input size!";
          }
        },
      });

      let size = '';

      if (inputSize === 'small') {
        size = 'size="small"';
      } else if (inputSize === 'large') {
        size = 'size="large"';
      }

      let generatedCode = `
<div class="flex items-center gap-2">
  <RadioButton v-model="${radioName}" inputId="${radioName}_id" name="${radioName}" value="${radioValue}" ${variantCode} ${size} />
  ${labelCode}
</div>
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
  }
};

/**************************************************/
const fnGenerarSelectButton = async () => {
  const { value: selectButtonName } = await Swal.fire({
    title: "Enter Select Button Name",
    input: "text",
    inputPlaceholder: "Enter the name of the select button",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a select button name!";
      }
    },
  });

  if (selectButtonName) {
    const { value: options } = await Swal.fire({
      title: "Enter Options",
      input: "text",
      inputPlaceholder: "Enter the options separated by commas (e.g., One-Way, Return)",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide options!";
        }
      },
    });

    if (options) {
      const optionsArray = options.split(',').map(option => option.trim());

      const { value: isMultiple } = await Swal.fire({
        title: "Is the select button multiple?",
        input: "radio",
        inputOptions: {
          yes: "Yes",
          no: "No",
        },
        inputPlaceholder: "Select if the select button is multiple",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an option!";
          }
        },
      });

      let multipleCode = isMultiple === 'yes' ? 'multiple' : '';

      const { value: inputSize } = await Swal.fire({
        title: "Select Input Size",
        input: "radio",
        inputOptions: {
          small: "Small",
          normal: "Normal",
          large: "Large",
        },
        inputPlaceholder: "Select input size",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an input size!";
          }
        },
      });

      let size = '';

      if (inputSize === 'small') {
        size = 'size="small"';
      } else if (inputSize === 'large') {
        size = 'size="large"';
      }

      let generatedCode = `
<SelectButton v-model="${selectButtonName}" :options="[${optionsArray.map(option => `'${option}'`).join(', ')}]" ${multipleCode} ${size} />
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
  }
};

/**************************************************/
const fnGenerarTextarea = async () => {
  const { value: textareaName } = await Swal.fire({
    title: "Enter Textarea Name",
    input: "text",
    inputPlaceholder: "Enter the name of the textarea",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a textarea name!";
      }
    },
  });

  if (textareaName) {
    const { value: rows } = await Swal.fire({
      title: "Enter Number of Rows",
      input: "number",
      inputPlaceholder: "Enter the number of rows",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide the number of rows!";
        }
      },
    });

    if (rows) {
      const { value: cols } = await Swal.fire({
        title: "Enter Number of Columns",
        input: "number",
        inputPlaceholder: "Enter the number of columns",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide the number of columns!";
          }
        },
      });

      if (cols) {
        const { value: hasAutoResize } = await Swal.fire({
          title: "Use Auto Resize?",
          input: "radio",
          inputOptions: {
            yes: "Yes",
            no: "No",
          },
          inputPlaceholder: "Select if the textarea uses auto resize",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an option!";
            }
          },
        });

        let autoResizeCode = hasAutoResize === 'yes' ? 'autoResize' : '';

        const { value: hasFloatLabel } = await Swal.fire({
          title: "Does the textarea have a float label?",
          input: "radio",
          inputOptions: {
            yes: "Yes",
            no: "No",
          },
          inputPlaceholder: "Select if the textarea has a float label",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an option!";
            }
          },
        });

        let floatLabelCode = '';

        if (hasFloatLabel === 'yes') {
          const { value: floatLabelText } = await Swal.fire({
            title: "Enter Float Label Text",
            input: "text",
            inputPlaceholder: "Enter the text for the float label",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value) {
                return "You need to provide a float label text!";
              }
            },
          });

          if (floatLabelText) {
            floatLabelCode = `
<FloatLabel variant="on">
  <Textarea id="${textareaName}_label" v-model="${textareaName}" rows="${rows}" cols="${cols}" style="resize: none" />
  <label for="${textareaName}_label">${floatLabelText}</label>
</FloatLabel>
`;
          }
        }

        const { value: inputSize } = await Swal.fire({
          title: "Select Input Size",
          input: "radio",
          inputOptions: {
            small: "Small",
            normal: "Normal",
            large: "Large",
          },
          inputPlaceholder: "Select input size",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an input size!";
            }
          },
        });

        let size = '';

        if (inputSize === 'small') {
          size = 'size="small"';
        } else if (inputSize === 'large') {
          size = 'size="large"';
        }

        const { value: placeholder } = await Swal.fire({
          title: "Enter Placeholder Text",
          input: "text",
          inputPlaceholder: "Enter the placeholder text",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a placeholder text!";
            }
          },
        });

        let placeholderCode = placeholder ? `placeholder="${placeholder}"` : '';

        let generatedCode = '';

        if (hasFloatLabel === 'yes') {
          generatedCode = floatLabelCode;
        } else {
          generatedCode = `
<Textarea v-model="${textareaName}" rows="${rows}" cols="${cols}" ${autoResizeCode} ${size} ${placeholderCode} />
`;
        }

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
    }
  }
};

/**************************************************/
const fnGenerarToggleButton = async () => {
  const { value: toggleButtonName } = await Swal.fire({
    title: "Enter Toggle Button Name",
    input: "text",
    inputPlaceholder: "Enter the name of the toggle button",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a toggle button name!";
      }
    },
  });

  if (toggleButtonName) {
    const { value: onLabel } = await Swal.fire({
      title: "Enter On Label",
      input: "text",
      inputPlaceholder: "Enter the on label (e.g., On)",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide an on label!";
        }
      },
    });

    if (onLabel) {
      const { value: offLabel } = await Swal.fire({
        title: "Enter Off Label",
        input: "text",
        inputPlaceholder: "Enter the off label (e.g., Off)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide an off label!";
          }
        },
      });

      if (offLabel) {
        const { value: hasIcons } = await Swal.fire({
          title: "Use Icons?",
          input: "radio",
          inputOptions: {
            yes: "Yes",
            no: "No",
          },
          inputPlaceholder: "Select if the toggle button uses icons",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an option!";
            }
          },
        });

        let onIcon = '';
        let offIcon = '';

        if (hasIcons === 'yes') {
          const { value: onIconName } = await Swal.fire({
            title: "Enter On Icon Name",
            input: "text",
            inputPlaceholder: "Enter the name of the on icon (e.g., pi pi-lock)",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value) {
                return "You need to provide an on icon name!";
              }
            },
          });

          if (onIconName) {
            onIcon = `onIcon="${onIconName}"`;

            const { value: offIconName } = await Swal.fire({
              title: "Enter Off Icon Name",
              input: "text",
              inputPlaceholder: "Enter the name of the off icon (e.g., pi pi-lock-open)",
              showCancelButton: true,
              confirmButtonText: "Next",
              cancelButtonText: "Cancel",
              inputValidator: (value) => {
                if (!value) {
                  return "You need to provide an off icon name!";
                }
              },
            });

            if (offIconName) {
              offIcon = `offIcon="${offIconName}"`;
            }
          }
        }

        const { value: inputSize } = await Swal.fire({
          title: "Select Input Size",
          input: "radio",
          inputOptions: {
            small: "Small",
            normal: "Normal",
            large: "Large",
          },
          inputPlaceholder: "Select input size",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to select an input size!";
            }
          },
        });

        let size = '';

        if (inputSize === 'small') {
          size = 'size="small"';
        } else if (inputSize === 'large') {
          size = 'size="large"';
        }

        const { value: additionalClass } = await Swal.fire({
          title: "Enter Additional Class",
          input: "text",
          inputPlaceholder: "Enter additional CSS class (e.g., w-36)",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide an additional class!";
            }
          },
        });

        let additionalClassCode = additionalClass ? `class="${additionalClass}"` : '';

        let generatedCode = `
<ToggleButton v-model="${toggleButtonName}" onLabel="${onLabel}" offLabel="${offLabel}" ${onIcon} ${offIcon} ${size} ${additionalClassCode} />
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
    }
  }
};

/**************************************************/
const fnGenerarToggleSwitch = async () => {
  const { value: toggleSwitchName } = await Swal.fire({
    title: "Enter Toggle Switch Name",
    input: "text",
    inputPlaceholder: "Enter the name of the toggle switch",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a toggle switch name!";
      }
    },
  });

  if (toggleSwitchName) {
    const { value: hasCustomHandle } = await Swal.fire({
      title: "Use Custom Handle?",
      input: "radio",
      inputOptions: {
        yes: "Yes",
        no: "No",
      },
      inputPlaceholder: "Select if the toggle switch uses a custom handle",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an option!";
        }
      },
    });

    let customHandleCode = '';

    if (hasCustomHandle === 'yes') {
      const { value: checkedIcon } = await Swal.fire({
        title: "Enter Checked Icon Class",
        input: "text",
        inputPlaceholder: "Enter the icon class for checked state (e.g., pi-check)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a checked icon class!";
          }
        },
      });

      if (checkedIcon) {
        const { value: uncheckedIcon } = await Swal.fire({
          title: "Enter Unchecked Icon Class",
          input: "text",
          inputPlaceholder: "Enter the icon class for unchecked state (e.g., pi-times)",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide an unchecked icon class!";
            }
          },
        });

        if (uncheckedIcon) {
          customHandleCode = `
<ToggleSwitch v-model="${toggleSwitchName}">
  <template #handle="{ checked }">
    <i :class="['!text-xs pi', { '${checkedIcon}': checked, '${uncheckedIcon}': !checked }]" />
  </template>
</ToggleSwitch>
`;
        }
      }
    }

    let generatedCode = '';

    if (hasCustomHandle === 'yes') {
      generatedCode = customHandleCode;
    } else {
      generatedCode = `
<ToggleSwitch v-model="${toggleSwitchName}" />
`;
    }

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

/**************************************************/
const fnGenerarCard = async () => {
  const { value: cardType } = await Swal.fire({
    title: "Select Card Type",
    input: "radio",
    inputOptions: {
      simple: "Simple Card",
      advanced: "Advanced Card",
    },
    inputPlaceholder: "Select the type of card",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to select a card type!";
      }
    },
  });

  if (cardType) {
    let generatedCode = '';

    if (cardType === 'simple') {
      const { value: title } = await Swal.fire({
        title: "Enter Card Title",
        input: "text",
        inputPlaceholder: "Enter the title of the card",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a card title!";
          }
        },
      });

      if (title) {
        const { value: content } = await Swal.fire({
          title: "Enter Card Content",
          input: "textarea",
          inputPlaceholder: "Enter the content of the card",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide card content!";
            }
          },
        });

        if (content) {
          generatedCode = `
<Card>
  <template #title>${title}</template>
  <template #content>
    <p class="m-0">
      ${content}
    </p>
  </template>
</Card>
`;
        }
      }
    } else if (cardType === 'advanced') {
      const { value: headerImage } = await Swal.fire({
        title: "Enter Header Image URL",
        input: "text",
        inputPlaceholder: "Enter the URL of the header image",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a header image URL!";
          }
        },
      });

      if (headerImage) {
        const { value: title } = await Swal.fire({
          title: "Enter Card Title",
          input: "text",
          inputPlaceholder: "Enter the title of the card",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a card title!";
            }
          },
        });

        if (title) {
          const { value: subtitle } = await Swal.fire({
            title: "Enter Card Subtitle",
            input: "text",
            inputPlaceholder: "Enter the subtitle of the card",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value) {
                return "You need to provide a card subtitle!";
              }
            },
          });

          if (subtitle) {
            const { value: content } = await Swal.fire({
              title: "Enter Card Content",
              input: "textarea",
              inputPlaceholder: "Enter the content of the card",
              showCancelButton: true,
              confirmButtonText: "Next",
              cancelButtonText: "Cancel",
              inputValidator: (value) => {
                if (!value) {
                  return "You need to provide card content!";
                }
              },
            });

            if (content) {
              const { value: footerContent } = await Swal.fire({
                title: "Enter Card Footer Content",
                input: "textarea",
                inputPlaceholder: "Enter the footer content of the card",
                showCancelButton: true,
                confirmButtonText: "Next",
                cancelButtonText: "Cancel",
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to provide card footer content!";
                  }
                },
              });

              if (footerContent) {
                generatedCode = `
<Card style="width: 25rem; overflow: hidden">
  <template #header>
    <img alt="user header" src="${headerImage}" />
  </template>
  <template #title>${title}</template>
  <template #subtitle>${subtitle}</template>
  <template #content>
    <p class="m-0">
      ${content}
    </p>
  </template>
  <template #footer>
    <div class="flex gap-4 mt-1">
      ${footerContent}
    </div>
  </template>
</Card>
`;
              }
            }
          }
        }
      }
    }

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

/**************************************************/
const fnGenerarFieldset = async () => {
  const { value: legend } = await Swal.fire({
    title: "Enter Fieldset Legend",
    input: "text",
    inputPlaceholder: "Enter the legend of the fieldset",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a fieldset legend!";
      }
    },
  });

  if (legend) {
    const { value: content } = await Swal.fire({
      title: "Enter Fieldset Content",
      input: "textarea",
      inputPlaceholder: "Enter the content of the fieldset",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide fieldset content!";
        }
      },
    });

    if (content) {
      const { value: isToggleable } = await Swal.fire({
        title: "Is the Fieldset Toggleable?",
        input: "radio",
        inputOptions: {
          yes: "Yes",
          no: "No",
        },
        inputPlaceholder: "Select if the fieldset is toggleable",
        showCancelButton: true,
        confirmButtonText: "Generate",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to select an option!";
          }
        },
      });

      let toggleableCode = isToggleable === 'yes' ? ':toggleable="true"' : '';

      let generatedCode = `
<Fieldset legend="${legend}" ${toggleableCode}>
  <p class="m-0">
    ${content}
  </p>
</Fieldset>
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
  }
};

/**************************************************/
const fnGenerarDrawer = async () => {
  const { value: drawerName } = await Swal.fire({
    title: "Enter Drawer Name",
    input: "text",
    inputPlaceholder: "Enter the name of the drawer",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a drawer name!";
      }
    },
  });

  if (drawerName) {
    const { value: position } = await Swal.fire({
      title: "Select Drawer Position",
      input: "radio",
      inputOptions: {
        left: "Left",
        right: "Right",
        top: "Top",
        bottom: "Bottom",
        full: "Full",
      },
      inputPlaceholder: "Select the position of the drawer",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a position!";
        }
      },
    });

    if (position) {
      const { value: header } = await Swal.fire({
        title: "Enter Drawer Header",
        input: "text",
        inputPlaceholder: "Enter the header of the drawer",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide a drawer header!";
          }
        },
      });

      if (header) {
        const { value: content } = await Swal.fire({
          title: "Enter Drawer Content",
          input: "textarea",
          inputPlaceholder: "Enter the content of the drawer",
          showCancelButton: true,
          confirmButtonText: "Generate",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide drawer content!";
            }
          },
        });

        let positionCode = '';
        let styleCode = '';

        if (position === 'top' || position === 'bottom') {
          styleCode = 'style="height: auto"';
        }

        if (position !== 'left') {
          positionCode = `position="${position}"`;
        }

        let generatedCode = `
<Drawer v-model:visible="${drawerName}" header="${header}" ${positionCode} ${styleCode}>
  <p>${content}</p>
</Drawer>
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
    }
  }
};

/**************************************************/
const fnGenerarToast = async () => {
  const { value: severity } = await Swal.fire({
    title: "Select Toast Severity",
    input: "select",
    inputOptions: {
      success: "Success",
      info: "Info",
      warn: "Warn",
      error: "Error",
      secondary: "Secondary",
      contrast: "Contrast",
    },
    inputPlaceholder: "Select the severity of the toast",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to select a severity!";
      }
    },
  });

  if (severity) {
    const { value: summary } = await Swal.fire({
      title: "Enter Toast Summary",
      input: "text",
      inputPlaceholder: "Enter the summary of the toast",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a toast summary!";
        }
      },
    });

    if (summary) {
      const { value: detail } = await Swal.fire({
        title: "Enter Toast Detail",
        input: "textarea",
        inputPlaceholder: "Enter the detail of the toast",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide toast detail!";
          }
        },
      });

      if (detail) {
        const { value: life } = await Swal.fire({
          title: "Enter Toast Duration",
          input: "number",
          inputPlaceholder: "Enter the duration of the toast in milliseconds",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a toast duration!";
            }
          },
        });

        if (life) {
          const { value: position } = await Swal.fire({
            title: "Select Toast Position",
            input: "radio",
            inputOptions: {
              none: "None",
              tl: "Top Left",
              bl: "Bottom Left",
              br: "Bottom Right",
            },
            inputPlaceholder: "Select the position of the toast",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
              if (!value) {
                return "You need to select a position!";
              }
            },
          });

          if (position) {
            const { value: isSticky } = await Swal.fire({
              title: "Is the Toast Sticky?",
              input: "radio",
              inputOptions: {
                yes: "Yes",
                no: "No",
              },
              inputPlaceholder: "Select if the toast is sticky",
              showCancelButton: true,
              confirmButtonText: "Generate",
              cancelButtonText: "Cancel",
              inputValidator: (value) => {
                if (!value) {
                  return "You need to select an option!";
                }
              },
            });

            let positionCode = position !== 'none' ? `group: '${position}',` : '';
            let lifeCode = isSticky === 'no' ? `life: ${life},` : '';

            let generatedCode = `
toast.add({
  severity: '${severity}',
  summary: '${summary}',
  detail: '${detail}',
  ${lifeCode}
  ${positionCode}
});
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
        }
      }
    }
  }
};

/**************************************************/
const fnGenerarSelect = async () => {
  const { value: modelName } = await Swal.fire({
    title: "Enter Model Name",
    input: "text",
    inputPlaceholder: "Enter the name of the model",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value) {
        return "You need to provide a model name!";
      }
    },
  });

  if (modelName) {
    const { value: options } = await Swal.fire({
      title: "Enter Options",
      input: "text",
      inputPlaceholder: "Enter the options separated by commas (e.g., City1, City2)",
      showCancelButton: true,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide options!";
        }
      },
    });

    if (options) {
      const optionsArray = options.split(',').map(option => option.trim());

      const { value: optionLabel } = await Swal.fire({
        title: "Enter Option Label",
        input: "text",
        inputPlaceholder: "Enter the label for the options (e.g., name)",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to provide an option label!";
          }
        },
      });

      if (optionLabel) {
        const { value: placeholder } = await Swal.fire({
          title: "Enter Placeholder",
          input: "text",
          inputPlaceholder: "Enter the placeholder text",
          showCancelButton: true,
          confirmButtonText: "Next",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to provide a placeholder!";
            }
          },
        });

        if (placeholder) {
          const { value: additionalClass } = await Swal.fire({
            title: "Enter Additional Class",
            input: "text",
            inputPlaceholder: "Enter additional CSS class (e.g., w-full md:w-56)",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: hasCheckmark } = await Swal.fire({
            title: "Use Checkmark?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select uses a checkmark",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: hasHighlightOnSelect } = await Swal.fire({
            title: "Highlight on Select?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select highlights on select",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: isEditable } = await Swal.fire({
            title: "Is the Select Editable?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select is editable",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: hasFilter } = await Swal.fire({
            title: "Use Filter?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select uses a filter",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: hasShowClear } = await Swal.fire({
            title: "Show Clear Button?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select shows a clear button",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: hasFloatLabel } = await Swal.fire({
            title: "Does the select have a float label?",
            input: "radio",
            inputOptions: {
              yes: "Yes",
              no: "No",
            },
            inputPlaceholder: "Select if the select has a float label",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          const { value: inputSize } = await Swal.fire({
            title: "Select Input Size",
            input: "radio",
            inputOptions: {
              small: "Small",
              normal: "Normal",
              large: "Large",
            },
            inputPlaceholder: "Select input size",
            showCancelButton: true,
            confirmButtonText: "Next",
            cancelButtonText: "Cancel",
          });

          let checkmarkCode = hasCheckmark === 'yes' ? 'checkmark ' : '';
          let highlightOnSelectCode = hasHighlightOnSelect === 'no' ? ':highlightOnSelect="false" ' : '';
          let editableCode = isEditable === 'yes' ? 'editable ' : '';
          let filterCode = hasFilter === 'yes' ? 'filter ' : '';
          let showClearCode = hasShowClear === 'yes' ? 'showClear ' : '';
          let sizeCode = '';

          if (inputSize === 'small') {
            sizeCode = 'size="small" ';
          } else if (inputSize === 'large') {
            sizeCode = 'size="large" ';
          }

          let floatLabelCode = '';

          if (hasFloatLabel === 'yes') {
            const { value: floatLabelText } = await Swal.fire({
              title: "Enter Float Label Text",
              input: "text",
              inputPlaceholder: "Enter the text for the float label",
              showCancelButton: true,
              confirmButtonText: "Next",
              cancelButtonText: "Cancel",
              inputValidator: (value) => {
                if (!value) {
                  return "You need to provide a float label text!";
                }
              },
            });

            if (floatLabelText) {
              floatLabelCode = `
<FloatLabel variant="on">
  <Select v-model="${modelName}" inputId="on_label" :options="[${optionsArray.map(option => `'${option}'`).join(', ')}]" optionLabel="${optionLabel}" class="w-full" />
  <label for="on_label">${floatLabelText}</label>
</FloatLabel>
`;
            }
          }

          let generatedCode = '';

          if (hasFloatLabel === 'yes') {
            generatedCode = floatLabelCode;
          } else {
            generatedCode = `
<Select v-model="${modelName}" :options="[${optionsArray.map(option => `'${option}'`).join(', ')}]" optionLabel="${optionLabel}" placeholder="${placeholder}" ${checkmarkCode}${highlightOnSelectCode}${editableCode}${filterCode}${showClearCode}${sizeCode}class="${additionalClass}" />
`;
          }

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
      }
    }
  }
};

/**************************************************/
</script>

<style scoped>
/* Optional styling */
</style>
