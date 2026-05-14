import { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import stylesGeneral from '../../../Listas.module.scss';
import styles from './FlujosNavegacion.module.scss';
import { transparent } from '@/components/Inicialized/ModalStyles';
import { getBitacoraEventos, getBitacoraEventosBySession } from '@/components/Inicialized/data/helpersGetDB';
import { resolveEventMeta } from '@/components/Inicialized/EventCatalog';
import {
  FiSearch,
  FiEye,
  FiMousePointer,
  FiLogIn,
  FiCheckCircle,
  FiXCircle,
  FiFlag,
  FiSend,
  FiTag,
  FiGift,
  FiLogOut,
  FiHelpCircle,
} from 'react-icons/fi';

const PAGE_SIZE = 50;

const iconMap = {
  search: FiSearch,
  eye: FiEye,
  click: FiMousePointer,
  login: FiLogIn,
  auth_ok: FiCheckCircle,
  auth_fail: FiXCircle,
  claim_start: FiFlag,
  claim_done: FiSend,
  coupon_claim: FiTag,
  coupon_redeem: FiGift,
  logout: FiLogOut,
  unknown: FiHelpCircle,
};

function EventIcon({ eventName }) {
  const meta = resolveEventMeta(eventName);
  const IconComp = iconMap[meta.icon] || FiHelpCircle;
  return <IconComp color={meta.color} size={20} />;
}

function safeString(value, fallback = '-') {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

const FlujosNavegacion = () => {
  const [items, setItems] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState('evento');
  const [sessionTrack, setSessionTrack] = useState([]);
  const [loadingTrack, setLoadingTrack] = useState(false);

  const loadEvents = async (offset = 0) => {
    setLoading(true);
    try {
      const data = await getBitacoraEventos(PAGE_SIZE, offset);
      const newItems = data?.items || [];
      setItems((prev) => (offset === 0 ? newItems : [...prev, ...newItems]));
      setHasMore(Boolean(data?.hasMore));
      setNextOffset(data?.nextOffset ?? null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(0);
  }, []);

  const handleLoadMore = () => {
    if (loading || !hasMore || nextOffset === null) return;
    loadEvents(nextOffset);
  };

  const openEvent = async (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
    setActiveTab('evento');
    setSessionTrack([]);
    if (!event?.session_id) return;
    setLoadingTrack(true);
    try {
      const track = await getBitacoraEventosBySession(event.session_id);
      setSessionTrack(track?.items || []);
    } finally {
      setLoadingTrack(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
    setSessionTrack([]);
  };

  return (
    <div className={stylesGeneral.lista}>
      <span className={stylesGeneral.title}>Eventos de bitácora</span>

      <div className={stylesGeneral.contentLista}>
        {items.map((event) => {
          const meta = resolveEventMeta(event.event_name);
          return (
            <button key={event.id} className={styles.eventRow} onClick={() => openEvent(event)}>
              <div className={styles.iconWrap}>
                <EventIcon eventName={event.event_name} />
              </div>
              <div className={styles.summary}>
                <span className={styles.linePrimary}>{meta.title || safeString(event.event_name)}</span>
                <span className={styles.line}>{safeString(event.event_action)}</span>
                <span className={styles.line}>{safeString(event.event_label, safeString(event.session_id))}</span>
              </div>
            </button>
          );
        })}

        <div className={styles.loadMoreWrap}>
          {hasMore ? (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Cargando...' : 'Cargar más'}
            </button>
          ) : (
            <span className={styles.endText}>No hay más eventos</span>
          )}
        </div>
      </div>

      <Modal open={openModal} onClose={closeModal}>
        <div style={{ ...transparent, width: 'min(980px, 92vw)' }}>
          <div className={styles.modalCard}>
            <CloseIcon className="cerrarModal" onClick={closeModal} style={{ color: '#fff' }} />
            <div className={styles.tabs}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'evento' ? styles.active : ''}`}
                onClick={() => setActiveTab('evento')}
              >
                Evento
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'session' ? styles.active : ''}`}
                onClick={() => setActiveTab('session')}
              >
                Track de sesión
              </button>
            </div>

            {activeTab === 'evento' && selectedEvent && (
              <pre className={styles.jsonBox}>{JSON.stringify(selectedEvent, null, 2)}</pre>
            )}

            {activeTab === 'session' && (
              <div className={styles.sessionTrack}>
                {loadingTrack ? (
                  <span>Cargando track...</span>
                ) : sessionTrack.length === 0 ? (
                  <span>Sin eventos para esta sesión.</span>
                ) : (
                  sessionTrack.map((event) => {
                    const meta = resolveEventMeta(event.event_name);
                    return (
                      <div key={event.id} className={styles.trackRow}>
                        <div className={styles.iconWrap}>
                          <EventIcon eventName={event.event_name} />
                        </div>
                        <div className={styles.trackInfo}>
                          <span className={styles.trackTitle}>{meta.title}</span>
                          <span className={styles.trackMeta}>
                            {safeString(event.occurred_at)} · {safeString(event.event_action)} · {safeString(event.event_label)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FlujosNavegacion;
