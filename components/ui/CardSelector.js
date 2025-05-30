import { useRef } from 'react';
import styles from './CardSelector.module.scss';

/**
 * @param {string}  label          — Texto que se muestra debajo (“Frente”, “Respaldo”…)
 * @param {string}  placeholderSrc — URL del ícono / imagen ilustrativa
 * @param {File}    file           — File actual (para mostrar preview). Puede ser null
 * @param {Function} onFileChange  — callback(file)  ← File | null
 */
export default function CardSelector({ label, placeholderSrc, file, onFileChange }) {
  const inputRef = useRef(null);

  const handleChoose = () => inputRef.current?.click();

  const handleChange = (e) => {
    const newFile = e.target.files?.[0] || null;
    onFileChange?.(newFile);
  };

  const preview = file ? URL.createObjectURL(file) : placeholderSrc;

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      <button className={styles.button} type="button" onClick={handleChoose}>
        <img src={preview} alt={label} className={styles.img} />
      </button>

      <span className={styles.label}>{label}</span>
    </div>
  );
}
