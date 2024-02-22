
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
            signal
        })



    if (response.ok) {
        return await response.json()
    } else {
        return null
    }



}