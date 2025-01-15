import { useHead } from '@vueuse/head';
import { unref, computed } from 'vue';

/*
import { useDatosEmpresa } from '../stores'
const datosEmpresa = useDatosEmpresa();

console.log(datosEmpresa.empresa)
*/
let siteTitle = '';
let separator = '|';

export const usePageTitle = (pageTitle: any) =>
    useHead(
        computed(() => ({
            title: `${unref(pageTitle)} ${separator} ${siteTitle}`,
        }))
    );

export const useMeta = (data: any) => {
    return useHead({ ...data, title: `${data.title}` });
};
