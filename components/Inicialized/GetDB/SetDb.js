import request from "superagent"


export const crearEmpresaBasica = (data) => {

    return new Promise((resolve, reject) => {


        request
            .post(process.env.HOST_NAME + '/crearEmpresaBasica')
            .accept('application/json')
            .send(data)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {

                    reject("Error al guardar información de empresa")

                } else {
                    resolve()

                }
            });
    })
}

export const uploadLogo = ( image ) => {

    return new Promise((resolve, reject) => {


        request
      .post(process.env.HOST_NAME + '/uploadLogo')
      .attach('image', image)
      .set('accept', 'json')
      .end((err, res) => {
                if (err) {

                    reject("Error al guardar información de empresa")

                } else {
                    const response =   JSON.parse(res.text)
                    resolve(response)

                }
            });
    })
}


export const nuevoUsuario = (nombre, apellido, correo, pass, genero, tkgoogle, tkfacebook) => {

    return new Promise((resolve, reject) => {


        request
            .post(process.env.HOST_NAME + '/usuario/nuevoUsuario')
            .accept('application/json')
            .send({
                nombre, 
                apellido, 
                correo, 
                pass, 
                genero,
                tkgoogle,
                tkfacebook
            })
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {

                    reject("Error al guardar información de usuario")

                } else {
                    resolve(res.body.insertId)

                }
            });
    })
}