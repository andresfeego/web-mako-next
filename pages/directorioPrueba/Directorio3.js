import { useEffect } from 'react';

const Directorio3 = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      window.location.href = `https://mako.guru/${id}`;
    }
  }, []);

  return (
    <div>
      Redirigiendo...
    </div>
  );
};

export default Directorio3;