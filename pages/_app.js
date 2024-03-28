import "./stylesGlobal.scss"
import React from 'react'
import { DataProvider } from '../components/Inicialized/DataProvider'
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from "../components/Inicialized/ThemeMaterialUi";
import Script from 'next/script'

import { SpeedInsights } from '@vercel/speed-insights/next';

const App = ({ Component, pageProps }) => {


  return (



    <React.Fragment>
      <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=db1cd646-84d1-4e26-820f-80450b7ba0cd"> </Script>
      <ThemeProvider theme={customTheme}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          transition={Slide}
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover />

        <DataProvider>


          <NextTopLoader
            color="#34C1BB"
            initialPosition={0.5}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 13px #34C1BB,0 0 8px #34C1BB"
            zIndex={1600}
            showAtBottom={false}
          />

          <Component {...pageProps} />
          <SpeedInsights />

        </DataProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default App