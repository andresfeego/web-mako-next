import { usuarioExiste } from '@/components/Inicialized/data/helpersGetDB';

import { errorText, HelpTexts } from "./HelpTexts"

export const validaMail = (text, creandoUsuario) => {
    return new Promise((resolve, reject) => {
        if (text == '') {
            resolve({ error: true, text: text, errorText: HelpTexts.vacioGeneral })
        } else {
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expr.test(text)) {
                resolve({ error: true, text: text, errorText: HelpTexts.formatoMail })
            } else {
                console.log('creando usuario', creandoUsuario);
                if (creandoUsuario) {
                    usuarioExiste(text).then((result) => {
                        console.log('result usuario existe', result)
                        if (result) {
                            resolve({ error: true, text: text, errorText: HelpTexts.usuarioExiste })
                        } else {
                            resolve({ error: false, text: text, errorText: ''})
                        }
                    }).catch((err) => {
                        resolve({ error: true, text: text, errorText: HelpTexts.impValiUsuario })
                    })
                } else {
                    resolve({ error: false, text: text, errorText: '' })
                }
            }
        }
    })
}


export const validaPassword = (text) => {
    return new Promise((resolve, reject) => {
        if (text == '') {
            resolve({ error: true, text: text, errorText: HelpTexts.vacioGeneral })
        } else {
            if (text.length > 35) {
                resolve({ error: true, text: text, errorText: (HelpTexts.textoLimiteGeneral + '35') })
            } else {
                resolve({ error: false, text: text, errorText: '' })
            }
        }

    })
}

export const validaConfirPassword = (confirPass, pass) => {
    return new Promise((resolve, reject) => {
        if (confirPass == '') {
            resolve({ error: true, text: confirPass, errorText: HelpTexts.vacioGeneral })
        } else {
            if (confirPass != pass) {
                resolve({ error: true, text: confirPass, errorText: (HelpTexts.NoConfirPass) })
            } else {
                resolve({ error: false, text: confirPass, errorText: '' })
            }
        }

    })
}


export const validaName = (text) => {
    return new Promise((resolve, reject) => {

        if (text == '') {
            resolve({ error: true, text: text, errorText: HelpTexts.vacioGeneral })
        } else {
            var expr = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
            if (!expr.test(text)) {
                resolve({ error: true, text: text, errorText: HelpTexts.soloTextoGeneral })
            } else {
                if (text.length > 30) {
                    resolve({ error: true, text: text, errorText: (HelpTexts.textoLimiteGeneral + '30') })
                } else {
                    resolve({ error: false, text: text, errorText: '' })
                }
            }
        }

    })
}

export const validaCelular = (text) => {
    return new Promise((resolve, reject) => {
        if (text == '') {
            resolve({ error: true, text: text, errorText: HelpTexts.vacioGeneral })
        } else {
            var expr = /^[0-9]+$/;
            if (!expr.test(text)) {
                resolve({ error: true, text: text, errorText: HelpTexts.soloNumeroGeneral })
            } else {
                if (text.length > 10) {
                    resolve({ error: true, text: text, errorText: (HelpTexts.textoLimiteGeneral + '10') })
                } else {
                    resolve({ error: false, text: text, errorText: '' })
                }
            }
        }
    })
}

export const validaDocumento = (text) => {
    return new Promise((resolve, reject) => {
        if (text == '') {
            resolve({ error: true, text: text, errorText: HelpTexts.vacioGeneral })
        } else {
            var expr = /^[0-9]+$/;
            if (!expr.test(text)) {
                resolve({ error: true, text: text, errorText: HelpTexts.soloNumeroGeneral })
            } else {
                if (text.length > 11) {
                    resolve({ error: true, text: text, errorText: (HelpTexts.textoLimiteGeneral + '11') })
                } else {
                    resolve({ error: false, text: text, errorText: '' })
                }
            }
        }
    })
}

export const validaTipoDocumento = (value) => {
    return new Promise((resolve, reject) => {
        if (value == '') {
            resolve({ error: true, text: value, errorText: HelpTexts.sinDatoCB })
        } else {
            resolve({ error: false, text: value, errorText: '' })
        }

    })
}

export const validaGenero = (value) => {
    return new Promise((resolve, reject) => {
        if (!value) {
            resolve({ error: true, text: value, errorText: HelpTexts.sinDatoCB })
        } else {
            resolve({ error: false, text: value, errorText: '' })
        }

    })
}

export const validaImgUrl = (text) => {
    return new Promise((resolve, reject) => {
        
        resolve({ error: false, text: text, errorText: '' })

    })
}



