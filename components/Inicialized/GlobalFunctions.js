import Resizer from "react-image-file-resizer";


export const MaysPrimera = (string) => {
    var salida = string.toLowerCase();
    return salida.charAt(0).toUpperCase() + salida.slice(1);
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export const generaCodigo = (length, min) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (min) {
      characters       = 'abcdefghijklmnopqrstuvwxyz_0123456789';
    }
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
   console.log(result)
    
    return result;
}



export const resizeFile = (file, height, width, type, compress) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "webp",
      compress,
      0,
      (uri) => {
        resolve(uri);
      },
      type
    );
  });