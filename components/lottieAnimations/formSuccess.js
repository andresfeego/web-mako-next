import Lottie from 'lottie-react';
import Anim from '@/components/assets/animation/Form-success.json'; // tu animación Lottie
import styles from "./styles.module.scss";
export default function FormSuccess({text}) {


  return (
    <div className={styles.container}>
      <Lottie animationData={Anim} loop={false} />
      <span className="text-center text-lg font-bold">{text}</span>
    </div>
  );
}
