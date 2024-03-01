import { useEffect } from 'react';

const Directorio3 = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      // Redirección
      window.location.href = `https://mako.guru/${id}`;
    }
  }, []);

  // Puedes renderizar el contenido de la página si lo necesitas
  return (
    <div>
      Redirigiendo...
    </div>
  );
};

export default Directorio3;