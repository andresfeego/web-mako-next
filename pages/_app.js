import "./stylesGlobal.scss"
import React from 'react'
import { Provider } from 'react-redux'
import localStore from '../components/Inicialized/localStore'

const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <Provider store={localStore}>
      <Component {...pageProps} />
    </Provider>
  </React.Fragment>
)

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default App