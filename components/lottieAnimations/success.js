import Lottie from 'lottie-react';
import SuccessAnim from '@/components/assets/animation/Success.json';
import styles from "./styles.module.scss";
import { useRef, useEffect } from 'react';

export default function Success({ text }) {
  const animRef = useRef();

  useEffect(() => {
    if (animRef.current) {
      animRef.current.setSpeed(2); // ⚡ ajusta velocidad a gusto (1.5x aquí)
    }
  }, []);

  return (
    <div className={styles.container}>
      <Lottie
        animationData={SuccessAnim}
        loop={false}
        lottieRef={animRef}
      />
      <span className="text-center text-lg font-bold">{text}</span>
    </div>
  );
}
