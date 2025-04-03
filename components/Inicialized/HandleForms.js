export const onChangeHandler = (campo, setCampo, value, CB, blur) => {
    return new Promise((resolve, reject) => {
      let campoaux = Object.create(campo);
      campoaux = {...campo}
      let auxiValueUno = undefined

      if(campo.name == 'confirContrasena'){
        auxiValueUno = campo.valuePassOrigin
      }

      if (campo.name == 'correo') {
        auxiValueUno = campo.creando
      }
      
    campo.validator(value, auxiValueUno).then((res) => {
      campoaux.value = res.text
      campoaux.error = res.error
      campoaux.errorText = res.errorText
      if (!blur) {
        campoaux.error = false
      }
      setCampo(campoaux)

      if (CB) {
        campo.visible = false;
      }

    })
    resolve(campoaux)
    })

  }

 

  export function validaErrosForm(inputsForm) {
    return new Promise((resolve, reject) => {
      
      return Promise.all(inputsForm.map((item) => {
        const inpForm = item['input']
        const setInp = item['setInpu']
        
        onChangeHandler(inpForm, setInp, inpForm.value, false, true).then((result) => {
          if (result.error) {
            console.log(result)
            reject()
          }else(
            resolve()
          ) 
        })
      })

    )

    })
  }