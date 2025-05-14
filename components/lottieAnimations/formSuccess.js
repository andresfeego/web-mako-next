import { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import Anim from '@/components/assets/animation/Form-success.json';
import styles from './styles.module.scss';

export default function FormSuccess({ text }) {
  const animRef = useRef();

  useEffect(() => {
    if (animRef.current) {
      animRef.current.setSpeed(2); // ⚡ acelera la animación (ajustable)
    }
  }, []);

  return (
    <div className={styles.container}>
      <Lottie
        animationData={Anim}
        loop={false}
        lottieRef={animRef}
      />
      <span className="text-center text-lg font-bold">{text}</span>
    </div>
  );
}
