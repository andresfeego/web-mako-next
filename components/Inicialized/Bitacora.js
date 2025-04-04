import request from "superagent"
import {generaCodigo} from './GlobalFunctions'


export const EvBiClickButton = (flujo, etiqueta) => {

    const data = {
        tipoAccion: 4,
        flujo: flujo,
        etiqueta: etiqueta,
        hashSession: generateHashSession(),
        authenticated: false,
        usuario: 0,
        dispositivo: 'NA',
        navegador: 2,
        plataforma: 2,
        pais: 'COL'   //cambiar en base de datos => ubicacion()
    }

    saveDb(data)
}

export const EvBiVisita = (idComercio) => {

    const data = {
        tipoAccion: 2,
        flujo: 'Apertura local',
        etiqueta: idComercio,
        hashSession: generateHashSession(),
        authenticated: false,
        usuario: 0,
        dispositivo: 'NA',
        navegador: 2,
        plataforma: 2,
        pais: 'COL'   //cambiar en base de datos => ubicacion()
    }

    saveDb(data)
}

export const EvBiBusqueda = (flujo, busqueda) => {

    const data = {
        tipoAccion: 1,
        flujo: flujo,
        etiqueta: busqueda,
        hashSession: generateHashSession(),
        authenticated: false,
        usuario: 0,
        dispositivo: 'NA',
        navegador: 2,
        plataforma: 2,
        pais: 'COL'   //cambiar en base de datos => ubicacion()
    }

    saveDb(data)
}

function generateHashSession(){
    const DataHashSession = window.sessionStorage.getItem('hashSession');
    if (DataHashSession) {
        return DataHashSession
    } else {
        const hashSession = process.env.DEV_ENV ? 'SuperAdmin' : generaCodigo(60, true)
        window.sessionStorage.setItem('hashSession', hashSession)
        return hashSession

    }

}
























const saveDb = (data) => {
    return new Promise((resolve, reject) => {
        request
            .post(process.env.HOST_NAME + '/bitacora/nuevoEvento')
            .send(data)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {

                    reject("Error al guardar información de bitacora")

                } else {
                    resolve()

                }
            });
    })
}






function getBrowserType() {

    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}


function detectOS() {
    const platform = navigator.platform;
    if (platform.indexOf('Win') !== -1) return 'Windows';
    if (platform.indexOf('Mac') !== -1) return 'Mac OS';
    if (platform.indexOf('Linux') !== -1) return 'Linux';
    if (platform.indexOf('iPhone') !== -1) return 'iOS';
    if (platform.indexOf('Android') !== -1) return 'Android';
    if (platform.indexOf('iPad') !== -1) return 'iPad';
    return 'Unknown';
}
function ubicacion() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation not supported");
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return (latitude + ' ' + longitude);
    }

    function error() {
        alert("Unable to retrieve your location");
    }
}