export async function generadorVueCampos(datosJSON) {
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const camposTabla = datosJSON.fields
  .filter(campo => campo.name !== 'ID') 
  .map(field => {
    return `     
      "${field.name}": "${field.name}",
      "${field.name.toUpperCase()}": "${field.name.toUpperCase()}",
      "${capitalizeFirstLetter(field.name)}": "${capitalizeFirstLetter(field.name)}",`;
  })
  .join('\n');

const camposArray = datosJSON.fields
  .filter(campo => campo.name !== 'ID')
  .map(field => `'${field.name}'`)
  .join(', ');


return `
******************************************************
************|- INICIO DE LA PARTE DEL MENU -|********
******************************************************
{
"label": "${capitalizeFirstLetter(datosJSON.tableName)}",
"to": "/${datosJSON.tableName}",
"permiso": "Administrador,Soporte",
"icon": "pi pi-circle"
},
************|-FIN DE LA PARTE DEL MENU -|********
*******************************************************
************|- INICIO DE LA PARTE DEL ROUTER -|********
*******************************************************
    {
        path: '/${datosJSON.tableName}',
        name: '${datosJSON.tableName}',
        component: () => import('../views/${capitalizeFirstLetter(datosJSON.tableName)}/${capitalizeFirstLetter(datosJSON.tableName)}.vue'),
    },
******************************************************
//ESTA PARTE ES SOLO SI ES MULTIPAGE
******************************************************
    {
        path: '/crear${datosJSON.tableName}',
        name: 'crear${datosJSON.tableName}',
        component: () => import('@/views/${capitalizeFirstLetter(datosJSON.tableName)}/Crear${capitalizeFirstLetter(datosJSON.tableName)}.vue'),
    },
    {
        path: '/editar${datosJSON.tableName}/:id',
        name: 'editar${datosJSON.tableName}',
        component: () => import('@/views/${capitalizeFirstLetter(datosJSON.tableName)}/Editar${capitalizeFirstLetter(datosJSON.tableName)}.vue'),
    },

************|-FIN DE LA PARTE DEL ROUTER -|***********
**********************|-CAMPOS-|**********************
"${camposArray}"
******************************************************
{
   ${camposTabla}
}

`;
}
