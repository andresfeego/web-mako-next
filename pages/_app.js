import "./stylesGlobal.scss"
import React from 'react'
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { customTheme } from "../components/Inicialized/ThemeMaterialUi";
import Script from 'next/script'
import { GoogleAnalytics } from "nextjs-google-analytics";
import ScreenSizeOverlay from '@/components/Dev/ScreenSizeOverlay';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import useUsuarioStore from '@/components/Stores/useUsuarioStore';
import { verificarSesionActiva } from '@/components/utils/verificarSesion';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
 
 
  const router = useRouter();

  useEffect(() => {
    verificarSesionActiva(); // Validación inicial

    // Validación al cambiar de pestaña
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') verificarSesionActiva();
    };

    // Validación al cambiar de URL interna
    const handleRouteChange = () => {
      verificarSesionActiva();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

 
  return (



    <React.Fragment>
      <ScreenSizeOverlay />
      <GoogleAnalytics trackPageViews />
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