import { validaConfirPassword, validaGenero, validaMail, validaName, validaPassword } from "./validatorsForms";


export const nombre = {
    name: 'nombre',
    label: 'Nombres',
    dbName: 'nombres',
    error: false,
    value: '',
    errorText: '',
    validator: validaName
}

export const apellido = {
    name: 'apellido',
    label: 'Apellido',
    dbName: '',
    error: false,
    value: '',
    errorText: '',
    validator: validaName
}

export const genero = {
    name: 'genero',
    label: 'Genero',
    dbName: '',
    error: false,
    value: null,
    errorText: '',
    selectValues: [
        {value: 1, name: 'Prefiero no decirlo'},
        {value: 2, name: 'Masculino'},
        {value: 3, name: 'Femenino'}
    ] ,
    validator: validaGenero
}

export const contrasena = {
    name: 'contrasena',
    label: 'Contraseña',
    dbName: '',
    error: false,
    value: '',
    errorText: '',
    validator: validaPassword
}

export const confirContrasena = {
    name: 'confirContrasena',
    label: 'Confirmar contraseña',
    dbName: '',
    error: false,
    value: '',
    valuePassOrigin: '',
    errorText: '',
    validator: validaConfirPassword
}

export const correo = {
    name: 'correo',
    label: 'Correo',
    dbName: '',
    error: false,
    value: '',
    errorText: '',
    creando: false,
    validator: validaMail
}