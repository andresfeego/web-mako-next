const path = require('path')
const withImages = require('next-images')


module.exports = {
  ...withImages(),
  sassOptions: {
    includePaths: [path.join(__dirname, './components/Inicialized')],
    prependData: `@import "variables.scss";`,


  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/directorio-empresarial',
        permanent: true,
      },
    ]
  },
  future: {
    webpack5: true,
  },
  env: {
    //HOST_NAME: 'http://localhost:3020/api/responseMako',
    HOST_NAME: 'https://feegosystem.com:8443/api/responseMako',
  },
    quiet: true
}
