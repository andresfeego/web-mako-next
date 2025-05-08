import Lottie from 'lottie-react';
import SuccessAnim from '@/components/assets/animation/Success.json'; // tu animación Lottie
import styles from "./styles.module.scss";
export default function Success({text}) {


  return (
    <div className={styles.container}>
      <Lottie animationData={SuccessAnim} loop={false} />
      <span className="text-center text-lg font-bold">{text}</span>
    </div>
  );
}
