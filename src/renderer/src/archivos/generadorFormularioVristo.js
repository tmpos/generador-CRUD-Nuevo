export async function generadorFromularioVristo(datosJSON) {
    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const camposCrear = datosJSON.fields
        .filter(campo => campo.name !== 'ID')
        .map(field => {
            const tamano = `${field.sizeXS} ${field.sizeSM} ${field.sizeMD} ${field.sizeLG} ${field.sizeXL} ${field.size2XL}`;
            if (field.frontType === 'input') {
                return `<div class="${tamano}">
                            <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                            <input type="${field.properties}" class="form-input ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${field.name}" name="crear${field.name}" id="${field.name}" />
                        </div>`;
            } else if (field.frontType === 'textarea' || field.frontType === 'tablajson') {
                return `<div class="${tamano}">
                            <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                            <textarea id="crear${field.name}" rows="3" class="form-textarea ${field.classes}" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" placeholder="${capitalizeFirstLetter(field.name)}"></textarea>
                        </div>`;
            } else if (field.frontType === 'select') {
                const formattedOptions = field.options
                    .split(',')
                    .map(option => `'${option.trim()}'`)
                    .join(',');
                return `<div class="${tamano}">
                            <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                            <multiselect
                                v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}"
                                :options="[${formattedOptions}]"
                                class="custom-multiselect ${field.classes}"
                                :searchable="true"
                                placeholder="${capitalizeFirstLetter(field.name)}"
                                selected-label=""
                                select-label=""
                                deselect-label=""
                                ${field.attributes}
                            ></multiselect>
                        </div>`;
            } else if (field.frontType === 'selectnormal') {
                const formattedOptions = field.options
                    .split(',')
                    .map(option => `<option value="${option.trim()}">${option.trim()}</option>`);
                return `<div class="${tamano}">
                            <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                            <select v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" ${field.attributes} class="w-full form-select ${field.classes}">
                                ${formattedOptions}
                            </select>
                        </div>`;
            } else if (field.frontType === 'datepicker') {
                return `<div class="${tamano}">
                            <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                            <flat-pickr v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ${field.classes}" :config="basic"></flat-pickr>
                        </div>`;
            }else if(field.frontType === 'timepicker'){
        return `<div class="${tamano}">
                    <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                    <flat-pickr v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ${field.classes}" :config="preloadingTime"></flat-pickr>
            </div>`;
            } else if (field.frontType === 'checkbox') {
                return `<div class="${tamano}">
                            <label class="inline-flex">
                                <input type="checkbox" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-checkbox ${field.classes}" />
                                <span>{{t('${field.name.toUpperCase()}')}}</span>
                            </label>
                        </div>`;
            } else if (field.frontType === 'radio') {
                return `<div class="${tamano}">
                            <label class="inline-flex">
                                <input type="radio" ${field.attributes} v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" name="${field.name}" class="form-radio ${field.classes}" />
                                <span>{{t('${field.name.toUpperCase()}')}}</span>
                            </label>
                        </div>`;
            } else if (field.frontType === 'toggle') {
                return `<div class="${tamano}">
                            <label class="w-12 h-6 relative">
                                <input type="checkbox" ${field.attributes} class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer ${field.classes}" id="crear${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" />
                                <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                            </label>
                        </div>`;
            } else if (field.frontType === 'inputgroup') {
                if (field.properties === 'prepend') {
                    return `<div class="${tamano}">
                                <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                                <div class="flex">
                                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                                </div>
                            </div>`;
                } else if (field.properties === 'append') {
                    return `<div class="${tamano}">
                                <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                                <div class="flex">
                                    <input id="addonsRight" ${field.attributes} type="text" placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input ltr:rounded-r-none rtl:rounded-l-none ${field.classes}" />
                                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                                </div>
                            </div>`;
                } else {
                    return `<div class="${tamano}">
                                <label for="${field.name}">{{t('${field.name.toUpperCase()}')}}</label>
                                <div class="flex">
                                    <div class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        $
                                    </div>
                                    <input type="text" ${field.attributes} placeholder="${field.name}" v-model="datoscampos${capitalizeFirstLetter(datosJSON.tableName)}.${field.name}" class="form-input rounded-none ${field.classes}" />
                                    <button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"><i class="pi pi-plus"></i></button>
                                </div>
                            </div>`;
                }
            } else if (field.name === 'imagen' && datosJSON.useImage) {
                return `<div class="form-group col-span-12">
                            <label for="imagenAgregarDatos">{{t('IMAGEN')}}</label>
                            <FileUploader
                                ref="fileUploaderRef"
                                :uploadUrl="uploadUrl"
                                :additionalData="additionalData"
                                :autoUpload="false"
                                :onSuccess="handleSuccess"
                                :onError="handleError"
                                :showPreview="true"
                                class="${field.classes}"
                                ${field.attributes}
                            />
                        </div>`;
            }
        })
        .join('\n');

    return `
    <form id="formulario${capitalizeFirstLetter(datosJSON.tableName)}">
        <div class="box-body">
            <div class="row grid grid-cols-12 gap-4" id="campos${capitalizeFirstLetter(datosJSON.tableName)}">
                ${camposCrear}
            </div>
        </div>
    </form>
`;
}
