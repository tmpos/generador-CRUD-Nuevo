  // @ts-nocheck
import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import * as path from 'path'
import os from 'os';
const { exec } = require('child_process');
import fs from 'fs/promises';
import { optimizer, is } from '@electron-toolkit/utils'; 
import icon from '../../resources/icon.png?asset';
import { generadorPrimeVue } from '../../src/renderer/src/archivos/generadorPrimeVue.js';
import { generadorVue } from '../../src/renderer/src/archivos/generadorVueVristo.js';
import { generadorVueCrear } from '../../src/renderer/src/archivos/generadorVueVristoCrear.js';

import { generadorVueActualizar } from '../../src/renderer/src/archivos/generadorVueVristoActualizar.js';
import { generadorVueLeer } from '../../src/renderer/src/archivos/generadorVueVristoLeer.js';

import { generadorPrimeVueLeer} from '../../src/renderer/src/archivos/generadorPrimeVueLeer.js';
import { generadorPrimeVueCrear } from '../../src/renderer/src/archivos/generadorPrimeVueCrear.js';
import { generadorPrimeVueActualizar } from '../../src/renderer/src/archivos/generadorPrimeVueActualizar.js';

import { generadorVueCampos } from '../../src/renderer/src/archivos/generadorVueVristoCampos.js';
import { generadorVuePlantillaVristo } from '../../src/renderer/src/archivos/generadorVueVristoPlantilla.js';
import { generadorVuePlantillaPrimeVue } from '../../src/renderer/src/archivos/generadorVuePrimeVuePlantilla.js';
import { generadorFromularioVristo } from '../../src/renderer/src/archivos/generadorFormularioVristo.js';
import { generadorFromularioPrimeVue } from '../../src/renderer/src/archivos/generadorFormularioPrimeVue.js';

/**************************************************************/
async function loadConfig() {
  const userDataPath = app.getPath('userData')
  const configPath = path.join(userDataPath, 'config.json')

  try {
    const data = await fs.readFile(configPath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error al leer el archivo de configuración:', err)
    // Si el archivo no existe, crea uno con valores por defecto
    const defaultConfig = {
      VITE_LINKURL: 'https://crud.tmposrd.com',
      VITE_LINK_API: '/api2',
      VITE_LINK_UPDATE: 'https://actualizacion.tmposrd.com',
      VITE_TOKEN: '1234567890abc',
      VITE_TOKEN_CORTO: '1234',
      VITE_PATRON_TELEFONO: '+1(###) ###-####',
      VITE_PATRON_CEDULA: '###-#######-#',
      VITE_THEME: 'materia',
      VITE_IMPRESORA_LOCAL: 'http://printer.test',
      impresora: {
        preview: false,
        width: '80000',
        height: '295000',
        margin: '0 0 0 0',
        copies: 1,
        silent: true,
        printerName: 'POS80',
        timeOutPerLine: 1000
      },
      impresoraLabel: {
        preview: false,
        width: '50800',
        height: '76200',
        margin: '0 0 0 0',
        copies: 1,
        silent: true,
        printerName: '4BARCODE',
        timeOutPerLine: 1000
      },
      VITE_ID_EMPRESA: '1',
      VITE_UPDATE: 'false',
      VITE_PRODUCTION: 'false',
      VITE_CAJERO_ACTIVO: 'true'
    }
    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8')
    return defaultConfig
  }
}

/**************************************************************/


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/***********************************************************************/
async function plantillaVueVristo(datos){
    try{
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;
        console.log("datosJSON", datosJSON);

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }

        // Crear directorio de destino
        const downloadsPath = join(os.homedir(), 'Downloads', capitalizeFirstLetter(datosJSON.tableName));
        await fs.mkdir(downloadsPath, { recursive: true });
        
        const plantillaCampos = await generadorVuePlantillaVristo(datosJSON);
        const filePathCampos = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
        await fs.writeFile(filePathCampos, plantillaCampos, 'utf8');
        return { success: true, path: filePathCampos };

    }catch(error){
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}
/***********************************************************************/
async function plantillaPrimeVue(datos){
    try{
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;
        console.log("datosJSON", datosJSON);

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }

        // Crear directorio de destino
        const downloadsPath = join(os.homedir(), 'Downloads', capitalizeFirstLetter(datosJSON.tableName));
        await fs.mkdir(downloadsPath, { recursive: true });
        
        const plantillaCampos = await generadorVuePlantillaPrimeVue(datosJSON);
        const filePathCampos = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
        await fs.writeFile(filePathCampos, plantillaCampos, 'utf8');
        return { success: true, path: filePathCampos };

    }catch(error){
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}
/***********************************************************************/
async function formularioVristo(datos) {
    try {
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }

        const plantillaCampos = await generadorFromularioVristo(datosJSON);
        return { success: true, formulario: plantillaCampos };
    } catch (error) {
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}
/***********************************************************************/
async function formularioPrimeVue(datos) {
    try {
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }

        const plantillaCampos = await generadorFromularioPrimeVue(datosJSON);
        return { success: true, formulario: plantillaCampos };
    } catch (error) {
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}
/***********************************************************************/
async function guardarArchivoVueVristo(datos) {
    try {
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;
        console.log("datosJSON", datosJSON);

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }


        //generadorVuePlantillaVristo(datosJSON)
        

        // Crear directorio de destino
        const downloadsPath = join(os.homedir(), 'Downloads', capitalizeFirstLetter(datosJSON.tableName));
        await fs.mkdir(downloadsPath, { recursive: true });
        
        const plantillaCampos = await generadorVueCampos(datosJSON);
        const filePathCampos = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.txt`);
        await fs.writeFile(filePathCampos, plantillaCampos, 'utf8');

        if (!datosJSON.useModal) {
            // Resolver plantillas si las funciones generadoras son asíncronas
            const plantillaCrear = await generadorVueCrear(datosJSON);
            const plantillaLeer = await generadorVueLeer(datosJSON);
            const plantillaActualizar = await generadorVueActualizar(datosJSON);

            // Definir rutas para los archivos
            const filePathLeer = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            const filePathCrear = join(downloadsPath, `Crear${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            const filePathActualizar = join(downloadsPath, `Editar${capitalizeFirstLetter(datosJSON.tableName)}.vue`);

            // Escribir archivos
            await fs.writeFile(filePathLeer, plantillaLeer, 'utf8');
            await fs.writeFile(filePathCrear, plantillaCrear, 'utf8');
            await fs.writeFile(filePathActualizar, plantillaActualizar, 'utf8');

            return { 
                success: true, 
                paths: {
                    leer: filePathLeer,
                    crear: filePathCrear,
                    actualizar: filePathActualizar
                }
            };
        } else {
            const filePath = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            let plantilla;
            if(datosJSON.usePrime){
                console.log('estoy Aqui')
               plantilla = await generadorPrimeVue(datosJSON);
            }else if(datosJSON.useNodejs){
               plantilla = await generadorVue(datosJSON);

            }

            await fs.writeFile(filePath, plantilla, 'utf8');
            return { success: true, path: filePath };
        }
    } catch (error) {
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}


/************************************************************************/
async function guardarArchivoVue(datos) {
    try {
        const datosJSON = typeof datos === 'string' ? JSON.parse(datos) : datos;
        console.log("datosJSON", datosJSON);

        // Validar datosJSON
        if (!datosJSON.tableName || typeof datosJSON.tableName !== 'string') {
            throw new Error("El nombre del menú no está definido o no es una cadena válida.");
        }


        //generadorVuePlantillaVristo(datosJSON)

        if(datosJSON.useNodejs){
            const retorno = await guardarArchivoVueVristo(datosJSON)
            return retorno;
        }

        // Crear directorio de destino
        const downloadsPath = join(os.homedir(), 'Downloads', capitalizeFirstLetter(datosJSON.tableName));
        await fs.mkdir(downloadsPath, { recursive: true });
        
        const plantillaCampos = await generadorVueCampos(datosJSON);
        const filePathCampos = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.txt`);
        await fs.writeFile(filePathCampos, plantillaCampos, 'utf8');

        if (!datosJSON.useModal) {
            // Resolver plantillas si las funciones generadoras son asíncronas
            const plantillaCrear = await generadorPrimeVueCrear(datosJSON);
            const plantillaLeer = await generadorPrimeVueLeer(datosJSON);
            const plantillaActualizar = await generadorPrimeVueActualizar(datosJSON);

            // Definir rutas para los archivos
            const filePathLeer = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            const filePathCrear = join(downloadsPath, `Crear${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            const filePathActualizar = join(downloadsPath, `Editar${capitalizeFirstLetter(datosJSON.tableName)}.vue`);

            // Escribir archivos
            await fs.writeFile(filePathLeer, plantillaLeer, 'utf8');
            await fs.writeFile(filePathCrear, plantillaCrear, 'utf8');
            await fs.writeFile(filePathActualizar, plantillaActualizar, 'utf8');

            return { 
                success: true, 
                paths: {
                    leer: filePathLeer,
                    crear: filePathCrear,
                    actualizar: filePathActualizar
                }
            };
        } else {
            const filePath = join(downloadsPath, `${capitalizeFirstLetter(datosJSON.tableName)}.vue`);
            let plantilla;
            if(datosJSON.usePrime){
               plantilla = await generadorPrimeVue(datosJSON);
            }else if(datosJSON.useNodejs){
               plantilla = await generadorVue(datosJSON);

            }

            await fs.writeFile(filePath, plantilla, 'utf8');
            return { success: true, path: filePath };
        }
    } catch (error) {
        console.error('Error al guardar los archivos:', error.message);
        return { success: false, message: error.message };
    }
}

/************************************************************************/
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    });
    mainWindow.maximize();
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

// Manejador para guardar el archivo Vue desde el renderer
ipcMain.handle('datosjson', async (event, datosJSON) => {
    return await guardarArchivoVue(datosJSON);
});


ipcMain.handle('plantillaVristo', async (event, datosJSON) => {
    return await plantillaVueVristo(datosJSON);
});
/**********************************************************************/
ipcMain.handle('plantillaPrimeVue', async (event, datosJSON) => {
    return await plantillaPrimeVue(datosJSON);
});
/**********************************************************************/
ipcMain.handle('formularioVristo', async (event, datosJSON) => {
    return await formularioVristo(datosJSON);
});
/**********************************************************************/
ipcMain.handle('formularioPrimeVue', async (event, datosJSON) => {
    return await formularioPrimeVue(datosJSON);
});
/**********************************************************************/
  ipcMain.handle('datosarchivo', async () => {
    const config = await loadConfig()
    return config
  })
/**********************************************************************/
ipcMain.handle('execute-command', async (event, { command, directory }) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: directory }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(`stdout: ${stdout}`);
    });
  });
});
/**********************************************************************/
// Inicialización de la aplicación Electron
app.whenReady().then(() => {
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    ipcMain.on('ping', () => console.log('pong'));

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
