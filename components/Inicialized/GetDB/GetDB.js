
import request from "superagent"



export async function getEmpresas(busqueda, ciudad, categoria, signal, limInf, limSup) {
    //console.log(limSup)
    const limiteInf = limInf ? limInf : 0
    const limiteSup = limSup ? limSup : 9000000000

    const response = await fetch(process.env.HOST_NAME + '/empresas',
        {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Validation data coming from a form usually
                ciudad: ciudad,
                busServicios: busqueda,
                busCategoria: categoria,
                limInf: limiteInf,
                limSup: limiteSup
            }),
            signal: signal
        })



    if (response.ok) {
        return await response.json()
    } else {
        return null
    }



}

export async function usuarioExiste(idUsuario) {

    const response = await fetch(process.env.HOST_NAME + '/usuario/usuarioExiste/' + idUsuario,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })



    if (response.ok) {
        const result = await response.json()
        if (result.length == 0) {
            return null
        } else {
            return result[0]
        }
    } else {
        return null
    }



}

export async function loginUsuario(correo, pass) {


    const response = await fetch(process.env.HOST_NAME + '/usuario/loginUsuario',
        {
            method: 'POST',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo,
                pass
            })
        })

        if (response.ok) {
            return await response.json()
        } else {
            return null
        }
    
}

export async function getUsuario(idUser) {


    const response = await fetch(process.env.HOST_NAME + '/usuario/usuarioXid/' + idUser,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const responseJson = await response.json()
            const userReturn = responseJson[0];
            const rolesDB = await getRolesUsuario(idUser);
            if (rolesDB.length > 0) {
                const roles = rolesDB.map(a => a.id_rol)
                userReturn.roles = roles
                userReturn.rolesDB = rolesDB
            } else {
                userReturn.roles = [5]
                userReturn.rolesDB = [5]
            }
            return userReturn
        } else {
            return null
        }
    
}

export async function getRolesUsuario(idUser) {


    const response = await fetch(process.env.HOST_NAME + '/usuario/rolesXid/' + idUser,
        {
            method: 'GET',
            headers: {
                // Check what headers the API needs. A couple of usuals right below
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const responseJson = await response.json()
            return responseJson
        } else {
            return null
        }
    
}