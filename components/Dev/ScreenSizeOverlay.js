import { useEffect, useState, useRef } from 'react';

const LOCAL_STORAGE_KEY = 'mako-debug-position';

const ScreenSizeOverlay = () => {
  const [isClient, setIsClient] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [screenInfo, setScreenInfo] = useState({ width: 0, height: 0, dpr: 1 });
  const [debugInfo, setDebugInfo] = useState({
    touch: false,
    hover: false,
    orientation: 'portrait',
  });

  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const boxRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Guardar en localStorage
  const savePosition = (top, left) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ top, left }));
  };

  // Leer de localStorage
  const loadSavedPosition = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.top && parsed.left) {
          setPosition({ top: parsed.top, left: parsed.left });
        }
      } catch (err) {
        console.warn('Error parsing saved position', err);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      loadSavedPosition();

      const updateSizes = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
        setScreenInfo({
          width: window.screen.width,
          height: window.screen.height,
          dpr: window.devicePixelRatio,
        });
        setDebugInfo({
          touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
          hover: window.matchMedia('(hover: hover)').matches,
          orientation: window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape',
        });
      };

      updateSizes();
      window.addEventListener('resize', updateSizes);
      window.addEventListener('orientationchange', updateSizes);
      return () => {
        window.removeEventListener('resize', updateSizes);
        window.removeEventListener('orientationchange', updateSizes);
      };
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e) => {
      if (!dragging.current) return;
      const newTop = `${e.clientY - offset.current.y}px`;
      const newLeft = `${e.clientX - offset.current.x}px`;
      setPosition({ top: newTop, left: newLeft });
    };

    const handleMouseUp = () => {
      dragging.current = false;
      savePosition(position.top, position.left);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClient, position]);

  const handleMouseDown = (e) => {
    if (!boxRef.current) return;
    dragging.current = true;
    const rect = boxRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  if (process.env.SCREEN_SIZE_OVERLAY == false || !isClient) return null;

  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        fontSize: '1.1rem',
        lineHeight: 1.5,
        padding: '1rem 2rem',
        borderRadius: '12px',
        zIndex: 9999,
        cursor: 'grab',
        userSelect: 'none',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      }}
    >
      <div>📱 Viewport: {viewport.width} × {viewport.height}</div>
      <div>🖥️ Screen: {screenInfo.width} × {screenInfo.height}</div>
      <div>🔬 DPR: {screenInfo.dpr}</div>
      <div>🖐️ Touch: {debugInfo.touch ? '✅' : '❌'}</div>
      <div>🖱️ Hover: {debugInfo.hover ? '✅' : '❌'}</div>
      <div>🧭 Orientation: {debugInfo.orientation}</div>
    </div>
  );
};

export default ScreenSizeOverlay;
