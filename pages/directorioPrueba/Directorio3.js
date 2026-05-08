import { useEffect } from 'react';

const Directorio3 = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    
    if (id) {
      window.location.href = `${siteUrl}/${id}`;
    }
  }, []);

  return (
    <div>
      Redirigiendo...
    </div>
  );
};

export default Directorio3;
