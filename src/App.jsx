import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Instagram,
  Facebook,
  Mail,
  Music,
  Users,
  Star,
  Heart,
  Menu,
  X,
  Play,
  ArrowRight,
  Quote,
  Youtube,
  Send,
  CheckCircle,
  Loader2,
  Sparkles,
  Volume2,
  VolumeX,
  ChevronUp,
  Pause
} from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';

const GOLD = '#C9A55A';

const YISHAMA_PARTNER_URL = 'https://www.yishama.com/Shaaya';
const KALIMBA_PARTNER_URL =
  'https://www.kalimba.co.il/%D7%9B%D7%9C%D7%99%D7%9D/p/348/-%D7%A4%D7%90%D7%A0%D7%98%D7%9D-D-AMARA-%D7%9B%D7%95%D7%9C%D7%9C-%D7%A7%D7%99%D7%99%D7%A1-Pantam-drum';
const SAMYAMA_PARTNER_URL = 'https://samyama.life/';

// --- Custom SVG Icons ---

const TikTokIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AppleMusicIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 361 361" fill="currentColor" className={className}>
    <path d="M255.5 0h-150C47.3 0 0 47.3 0 105.5v150C0 313.7 47.3 361 105.5 361h150c58.2 0 105.5-47.3 105.5-105.5v-150C361 47.3 313.7 0 255.5 0zM280 237.6c0 26.7-20.3 49.5-47.3 51.9-3 .3-5.4.4-8.2.4-14.7 0-26-5.8-33.7-11.2-10-7-15.4-15.3-15.7-15.8l-.3-.5v-.6c0-1.5 1-2.8 2.5-3.2.5-.1.9-.2 1.4-.2 1 0 2 .4 2.7 1.2 0 0 5.2 7.3 14.1 13.1 6.6 4.3 15.5 8.5 28.2 7.4 20.4-1.8 35.5-19.3 35.5-40.9V130.5c0-2.3-1.1-4.4-3-5.7s-4.2-1.7-6.4-1.1L152 148.3c-3.2.9-5.4 3.8-5.4 7.1v106c0 26.7-20.3 49.5-47.3 51.9-3 .3-5.5.4-8.2.4-14.7 0-26-5.8-33.7-11.2-10-7-15.4-15.3-15.7-15.8l-.3-.5v-.6c0-1.5 1-2.8 2.5-3.2.5-.1.9-.2 1.4-.2 1 0 2 .4 2.7 1.2 0 0 5.2 7.3 14.2 13.1 6.6 4.3 15.5 8.5 28.2 7.4 20.4-1.8 35.5-19.3 35.5-41V130.6c0-9.6 6.3-18 15.5-20.6l101.3-28.1c4.1-1.1 8.5-.5 12.1 1.8 3.6 2.3 5.7 6.1 5.7 10.3v143.6z"/>
  </svg>
);

const SpotifyIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AmazonIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z"/>
  </svg>
);

// --- Shared Components ---

const Logo = ({ className = 'h-8 sm:h-10 md:h-12' }) => (
  <img src="/logo-transparent.png" alt="SHAAYA" className={`${className} w-auto object-contain`} />
);

const GoldText = ({ children }) => (
  <span style={{ color: GOLD }}>{children}</span>
);

const SocialLinks = ({ size = 18, className = '' }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <a href="https://www.instagram.com/daniel_shaya" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#E1306C' }} aria-label="Instagram">
      <Instagram size={size} />
    </a>
    <a href="https://www.facebook.com/profile.php?id=61588113399250" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#4267B2' }} aria-label="Facebook">
      <Facebook size={size} />
    </a>
    <a href="https://www.youtube.com/channel/UC80_83SPXBji6OsByzC5NRA" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#FF0000' }} aria-label="YouTube">
      <Youtube size={size} />
    </a>
    <a href="https://www.tiktok.com/@shaaya_d" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#69C9D0' }} aria-label="TikTok">
      <TikTokIcon size={size} />
    </a>
    <a href="https://open.spotify.com/artist/7sjTH5RSnYRzdKt6MwVahE" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#1DB954' }} aria-label="Spotify">
      <SpotifyIcon size={size} />
    </a>
    <a href="https://music.apple.com/il/artist/shaaya/1876665852" target="_blank" rel="noopener noreferrer"
      className="transition-colors duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center hover:opacity-80"
      style={{ color: '#FC3C44' }} aria-label="Apple Music">
      <AppleMusicIcon size={size} />
    </a>
  </div>
);

const PageTransition = ({ children, id }) => (
  <div id={id} className="animate-fade-in min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 section-anchor">
    {children}
  </div>
);

// --- useInView hook (lazy-mount heavy embeds when near viewport) ---
const useInView = (rootMargin = '300px') => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);
  return [ref, inView];
};

// --- useIsMobile hook ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1024px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

// --- Contact Form helpers ---

// Allow international numbers: digits with an optional leading +
const sanitizePhone = (value) => {
  let v = value.replace(/[^\d+]/g, '');
  v = v.startsWith('+') ? '+' + v.slice(1).replace(/\+/g, '') : v.replace(/\+/g, '');
  return v.slice(0, 16);
};

const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

// --- Contact Form Modal ---

const ContactModal = ({ isOpen, onClose, preselectedInterest = '' }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', interest: preselectedInterest, message: '' });
  const [status, setStatus] = useState('idle');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (preselectedInterest) setFormData(prev => ({ ...prev, interest: preselectedInterest }));
  }, [preselectedInterest]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', interest: preselectedInterest, message: '' });
      setStatus('idle');
      setPhoneError('');
      document.body.style.overflow = 'hidden';
      // Move focus into the dialog and close on Escape
      setTimeout(() => formRef.current?.querySelector('input')?.focus(), 50);
      const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, preselectedInterest, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: sanitizePhone(value) }));
      setPhoneError('');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone(formData.phone)) { setPhoneError(t('contact.form.phoneError')); return; }
    setStatus('sending');
    const msg = `*פנייה חדשה מהאתר* 🎵\n\n*שם:* ${formData.name}\n*טלפון:* ${formData.phone}\n*סוג התעניינות:* ${formData.interest}\n\n*הודעה:*\n${formData.message}`;
    window.open(`https://wa.me/972526464647?text=${encodeURIComponent(msg)}`, '_blank');
    setStatus('sent');
    setFormData({ name: '', phone: '', interest: preselectedInterest, message: '' });
    setTimeout(() => { setStatus('idle'); onClose(); }, 3000);
  };

  if (!isOpen) return null;

  const interestOptions = t('contact.form.interestOptions', { returnObjects: true }) || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? 'rtl' : 'ltr'} role="dialog" aria-modal="true" aria-label={t('modal.title') + t('modal.titleGold')}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border-t sm:border border-white/10 rounded-t-2xl sm:rounded-sm w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up p-6 sm:p-8 md:p-10 safe-bottom">
        <button onClick={onClose} className="absolute top-4 left-4 text-zinc-500 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><X size={20} /></button>
        <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        <h3 className="text-xl sm:text-2xl font-light text-white mb-2">{t('modal.title')}<GoldText>{t('modal.titleGold')}</GoldText></h3>
        <p className="text-zinc-400 text-sm mb-6 sm:mb-8">{t('modal.subtitle')}</p>
        <form ref={formRef} className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name')} required className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base" />
          <div>
            <input type="tel" inputMode="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} required maxLength="16" dir="ltr" aria-invalid={!!phoneError} className={`w-full bg-transparent border-b focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base ${isRtl ? 'text-right' : 'text-left'} ${phoneError ? 'border-red-500/70' : 'border-zinc-800'}`} />
            {phoneError && <p className="text-red-400 text-xs mt-1.5" role="alert">{phoneError}</p>}
          </div>
          <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full bg-[#0a0a0a] border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-zinc-400 font-light transition-colors appearance-none cursor-pointer text-base">
            <option value="">{t('contact.form.interest')}</option>
            {interestOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          <textarea rows="3" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message')} className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors resize-none placeholder:text-zinc-700 text-base"></textarea>
          <button type="submit" disabled={status === 'sending'} className={`w-full py-4 border text-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase flex items-center justify-center gap-3 min-h-[48px] ${status === 'sending' ? 'opacity-50 cursor-not-allowed border-zinc-700' : 'border-zinc-700'} ${status === 'sent' ? 'border-green-500/50 text-green-400' : ''}`}>
            {status === 'idle' && <><Send size={16} />{t('contact.form.send')}</>}
            {status === 'sending' && <><Loader2 size={16} className="animate-spin" />{t('contact.form.sending')}</>}
            {status === 'sent' && <><CheckCircle size={16} />{t('contact.form.sent')}</>}
            {status === 'error' && <><X size={16} />{t('contact.form.error')}</>}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Pages ---

const VideoCard = ({ videoId, title, label, labelStyle, distroLink, listenText, compact = false, className = '' }) => {
  const [expanded, setExpanded] = useState(false);
  const closeBtnRef = useRef(null);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
      const onKeyDown = (e) => { if (e.key === 'Escape') setExpanded(false); };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  const thumbWrapClass = compact
    ? 'w-full h-[clamp(52px,14svh,130px)] sm:h-[clamp(72px,18svh,150px)] md:h-[clamp(88px,20svh,170px)] rounded-lg overflow-hidden relative group cursor-pointer'
    : 'w-full aspect-video rounded-lg overflow-hidden relative group cursor-pointer';

  return (
    <>
      <div className={`flex flex-col items-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 ${compact ? 'gap-1.5 p-2 sm:p-2.5' : 'gap-3 p-3 sm:p-4'} ${className}`}>
        <span className={`tracking-[0.2em] uppercase leading-none ${compact ? 'text-[9px] sm:text-[10px]' : 'text-[10px] sm:text-xs'}`} style={labelStyle}>{label}</span>
        <p className={`font-serif italic text-white leading-tight ${compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'}`}>{title}</p>
        <button type="button" onClick={() => setExpanded(true)} className={thumbWrapClass}>
          <img src={thumb} alt={title} decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className={`rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform ${compact ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-12 h-12 sm:w-14 sm:h-14'}`}>
              <Play size={compact ? 18 : 22} className="fill-white text-white ml-0.5" />
            </div>
          </div>
        </button>
        <a href={distroLink} target="_blank" rel="noopener noreferrer"
          className={`btn-sparkle border rounded-full tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 hover:bg-white hover:text-black shrink-0 ${compact ? 'px-3 py-1.5 text-[10px] sm:text-[11px]' : 'px-5 py-2 text-xs'}`}
          style={{ borderColor: GOLD + '60', color: GOLD }}>
          <Play size={compact ? 12 : 14} />
          {listenText}
        </a>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 animate-fade-in" onClick={() => setExpanded(false)} role="dialog" aria-modal="true" aria-label={title}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative w-full max-w-4xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <button ref={closeBtnRef} onClick={() => setExpanded(false)} aria-label="Close"
              className="absolute -top-10 right-0 sm:-top-12 sm:-right-2 text-zinc-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-10">
              <X size={28} />
            </button>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-white font-serif italic text-lg mt-4">{title}</p>
          </div>
        </div>
      )}
    </>
  );
};

const HomePage = ({ videoRef, onNavigate }) => {
  const { t } = useTranslation();
  return (
    <div id="home" className="home-min-viewport relative w-full flex flex-col">
      <div className="absolute inset-0 bg-black">
        <video ref={videoRef} autoPlay loop playsInline muted preload="auto" poster="/background-poster.jpg" className="w-full h-full object-cover opacity-50">
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]/90 pointer-events-none" />
      <div
        className="relative z-20 flex flex-col flex-1 w-full max-w-5xl mx-auto px-3 sm:px-5 text-center
          pt-[calc(env(safe-area-inset-top,0px)+3.75rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+4.25rem)]
          pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+5rem))]"
      >
        {/* Top block: subtitle, logo, tagline, CTA — compact vertical rhythm */}
        <div className="shrink-0 flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 animate-slide-up">
          <h1 className="sr-only">SHAAYA – דניאל שעיה, אמן האנדפאן והפנטם | Daniel Shaaya, Handpan Artist & Musician</h1>
          <p className="tracking-[0.18em] sm:tracking-[0.25em] text-[10px] sm:text-xs uppercase drop-shadow-lg leading-tight" style={{ color: GOLD }}>{t('home.subtitle')}</p>
          <img
            src="/logo-transparent.png"
            alt="SHAAYA"
            className="w-auto max-w-[min(88vw,520px)] h-[clamp(3rem,11svh,5.5rem)] sm:h-[clamp(3.25rem,12svh,6.5rem)] md:h-[clamp(3.5rem,13svh,7.5rem)] object-contain drop-shadow-2xl"
          />
          <p className="text-[clamp(0.7rem,2.8vw,0.95rem)] sm:text-sm md:text-base font-light text-zinc-200 max-w-xl mx-auto leading-snug drop-shadow-md px-1">
            {t('home.tagline1')}<GoldText>{t('home.tagline1gold')}</GoldText>.
            <br />
            {t('home.tagline2')}<GoldText>{t('home.tagline2gold')}</GoldText>.
          </p>
          <div className="flex justify-center items-center pt-0.5 sm:pt-1">
            <a href="https://wa.me/972526464647" target="_blank" rel="noopener noreferrer"
              className="btn-sparkle px-4 sm:px-6 py-2 sm:py-2.5 border border-white/30 backdrop-blur-sm hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-300 rounded-full tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2 min-h-[40px] sm:min-h-[44px]">
              <WhatsAppIcon size={16} className="text-green-500 sm:w-[18px] sm:h-[18px]" />
              {t('home.cta')}
            </a>
          </div>
        </div>

        {/* Middle: new album spotlight + releases */}
        <div className="flex-1 flex flex-col justify-center py-2 sm:py-3 w-full max-w-[min(100%,42rem)] lg:max-w-[min(100%,58rem)] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3 w-full items-stretch">
            {/* Album spotlight — centered on desktop, on top on mobile */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('music')}
              className="order-1 lg:order-2 col-span-2 lg:col-span-1 group rounded-xl border backdrop-blur-sm bg-gradient-to-br from-zinc-900/70 to-black/50 p-2 sm:p-2.5 flex lg:flex-col items-center gap-2.5 lg:gap-1.5 text-start lg:text-center transition-all duration-300 hover:border-white/40 cursor-pointer"
              style={{ borderColor: GOLD + '55', boxShadow: `0 0 24px ${GOLD}18` }}
              aria-label={`INWARD – ${t('home.albumNewLabel')}`}
            >
              <div className="relative shrink-0">
                <img
                  src="/covers/inward.jpg"
                  alt="INWARD"
                  decoding="async"
                  className="h-[clamp(56px,12svh,96px)] lg:h-[clamp(72px,17svh,150px)] aspect-square w-auto rounded-lg object-cover shadow-lg shadow-black/60 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute -top-1.5 -start-1.5 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-black font-medium" style={{ backgroundColor: GOLD }}>
                  {t('music.newBadge')}
                </span>
              </div>
              <div className="flex-1 lg:flex-none min-w-0 flex flex-col items-start lg:items-center gap-0.5 lg:gap-1">
                <span className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase leading-tight" style={{ color: GOLD }}>
                  {t('home.albumNewLabel')}
                </span>
                <p className="font-serif italic text-white leading-tight text-sm sm:text-base lg:text-lg">INWARD</p>
                <span
                  className="btn-sparkle mt-0.5 px-3 py-1.5 sm:px-4 rounded-full text-[9px] sm:text-[10px] tracking-wider uppercase text-black font-medium flex items-center gap-1.5 transition-all duration-300 group-hover:brightness-110"
                  style={{ backgroundColor: GOLD }}
                >
                  <Play size={11} />
                  {t('home.albumBuyCta')}
                </span>
              </div>
            </button>
            <VideoCard
              videoId="Uas_RFaPxzM"
              title="Afterglow"
              label={t('home.latestRelease')}
              labelStyle={{ color: GOLD }}
              distroLink="https://distrokid.com/hyperfollow/shaaya/afterglow"
              listenText={t('home.listenNow')}
              compact
              className="order-2 lg:order-1 h-full"
            />
            <VideoCard
              videoId="5iR5e0fqGlM"
              title="When the Steel is Cold"
              label={'\u00A0'}
              labelStyle={{ color: 'transparent' }}
              distroLink="https://distrokid.com/hyperfollow/shaaya/when-the-steel-is-cold"
              listenText={t('home.listenNow')}
              compact
              className="order-3 h-full"
            />
          </div>
        </div>

        {/* Partners — pinned to bottom of viewport stack */}
        <div className="shrink-0 w-full max-w-2xl mx-auto border-t border-white/10 pt-2 sm:pt-2.5 mt-1">
          <p className="text-[10px] sm:text-xs font-light tracking-[0.12em] sm:tracking-[0.16em] uppercase mb-2 sm:mb-2.5 leading-tight">
            <GoldText>{t('home.partnersHeading')}</GoldText>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8">
            <a
              href={YISHAMA_PARTNER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center min-h-[40px] w-[min(30%,120px)] sm:w-[min(30%,160px)] md:w-[190px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              aria-label={t('home.partnerAltYishama')}
            >
              <img
                src="/partners/yishama.png"
                alt={t('home.partnerAltYishama')}
                className="h-8 sm:h-9 md:h-10 w-full max-h-10 object-contain object-center opacity-95 transition-all duration-300 ease-out drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] group-hover:opacity-100 group-hover:brightness-110 group-hover:saturate-125 group-hover:drop-shadow-[0_0_22px_rgba(201,165,90,0.55)]"
              />
            </a>
            <a
              href={KALIMBA_PARTNER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center min-h-[40px] w-[min(30%,120px)] sm:w-[min(30%,160px)] md:w-[190px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              aria-label={t('home.partnerAltKalimba')}
            >
              <img
                src="/partners/kalimba-dark.png"
                alt={t('home.partnerAltKalimba')}
                className="h-8 sm:h-9 md:h-10 w-full max-h-10 object-contain object-center opacity-95 transition-all duration-300 ease-out drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] group-hover:opacity-100 group-hover:brightness-110 group-hover:saturate-125 group-hover:drop-shadow-[0_0_22px_rgba(201,165,90,0.55)]"
              />
            </a>
            <a
              href={SAMYAMA_PARTNER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center min-h-[40px] w-[min(30%,120px)] sm:w-[min(30%,160px)] md:w-[190px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              aria-label={t('home.partnerAltSamyama')}
            >
              <img
                src="/partners/samyama.png"
                alt={t('home.partnerAltSamyama')}
                className="h-8 sm:h-9 md:h-10 w-full max-h-10 object-contain object-center opacity-95 transition-all duration-300 ease-out drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] group-hover:opacity-100 group-hover:brightness-110 group-hover:saturate-125 group-hover:drop-shadow-[0_0_22px_rgba(201,165,90,0.55)]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <PageTransition id="about">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-10 sm:gap-14 md:gap-20 items-center max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 space-y-6 sm:space-y-8">
            <div className="w-16 h-[1px]" style={{ backgroundColor: GOLD + '40' }}></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-white">
              {t('about.title1')}<GoldText>{t('about.titleGold')}</GoldText> <br />
              <span className="font-serif italic" style={{ color: GOLD + 'AA' }}>{t('about.titleShaaya')}</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed sm:leading-loose font-light">
              <p>{t('about.bio1')}<GoldText>{t('about.bio1gold')}</GoldText>{t('about.bio1rest')}</p>
              <p>{t('about.bio2pre')}<GoldText>{t('about.bio2gold')}</GoldText>{t('about.bio2rest')}</p>
              <p>{t('about.bio3')}<GoldText>{t('about.bio3gold')}</GoldText>{t('about.bio3rest')}</p>
              <ul className="grid grid-cols-1 gap-3 pt-4 text-sm text-zinc-500">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }}/> {t('about.list1')}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }}/> {t('about.list2')}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }}/> {t('about.list3')}</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative mt-4 sm:mt-6 md:mt-0">
            <div className="bg-zinc-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out relative group rounded-sm">
              <img src="/daniel-about.png" alt="Daniel Shaaya" loading="lazy" decoding="async" className="w-full h-auto object-contain" />
            </div>
            <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-full h-full z-[-1] hidden md:block" style={{ border: `1px solid ${GOLD}15` }}></div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const ServicesPage = ({ onOpenContactModal }) => {
  const { t } = useTranslation();
  const serviceIcons = [
    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
    <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
    <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
    <Music className="w-5 h-5 sm:w-6 sm:h-6" />
  ];
  const items = t('services.items', { returnObjects: true }) || [];
  const interestValues = t('services.interestValues', { returnObjects: true }) || [];

  return (
    <PageTransition id="services">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>{t('services.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white"><GoldText>{t('services.title')}</GoldText>{t('services.titleRest')}</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-light text-xs sm:text-sm px-2">{t('services.subtitle')}<GoldText>{t('services.subtitleGold')}</GoldText></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, idx) => (
            <div key={idx} className="group p-4 sm:p-5 border border-white/5 hover:border-white/20 bg-[#080808] transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-white/5 rounded-full group-hover:text-white transition-colors" style={{ color: GOLD }}>{serviceIcons[idx]}</div>
                {idx === 0 && <span className="text-[10px] border px-2 py-0.5 rounded-full" style={{ borderColor: GOLD + '40', color: GOLD }}>{t('services.new')}</span>}
              </div>
              <h3 className="text-base sm:text-lg font-light mb-1.5 text-white">{s.title}</h3>
              <p className="text-zinc-500 font-medium mb-3 text-[11px] sm:text-xs">{s.subtitle}</p>
              <p className="text-zinc-400 leading-relaxed mb-4 font-light text-xs flex-grow line-clamp-4">{s.description}</p>
              <div className="grid grid-cols-1 gap-y-1.5 border-t border-white/5 pt-3 mb-3">
                {(s.details || []).map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-500">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }}></span>{d}
                  </div>
                ))}
              </div>
              <button onClick={() => onOpenContactModal(interestValues[idx] || s.title)} className="w-full mt-auto flex items-center justify-center gap-2 text-white text-[11px] tracking-wider border py-2.5 transition-all hover:text-black" style={{ borderColor: GOLD + '30' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
                {s.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const ReelCard = ({ reel }) => {
  const [wrapRef, inView] = useInView('400px');
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group flex flex-col items-center">
      <a href={`https://www.instagram.com/reel/${reel.id}/`} target="_blank" rel="noopener noreferrer"
        className="relative rounded-[2rem] sm:rounded-[2.5rem] border-[3px] sm:border-4 border-zinc-600 bg-black p-1 sm:p-1.5 shadow-lg shadow-black/50 transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-xl group-hover:shadow-black/60 w-full block">
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full z-20 border border-zinc-700/50"></div>
        <div className="rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-black relative">
          <div ref={wrapRef} className="reel-embed-wrapper aspect-[9/16] w-full">
            {inView && (
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                scrolling="no"
                loading="lazy"
                title={reel.title}
                onLoad={() => setLoaded(true)}
                className={`transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            {!loaded && (
              <div className="absolute inset-0 reel-skeleton flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Play size={18} className="fill-zinc-600 text-zinc-600 ml-0.5" />
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 z-10 sm:hidden flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play size={20} className="fill-white text-white ml-0.5" />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1 sm:py-1.5">
          <div className="w-1/3 h-1 bg-zinc-600 rounded-full"></div>
        </div>
      </a>
      <div className="mt-2.5 sm:mt-3">
        <p className="text-[11px] sm:text-xs text-zinc-300 font-light text-center leading-snug">{reel.title}</p>
      </div>
    </div>
  );
};

// Fills the last grid slot and invites visitors to follow on Instagram
const FollowCard = () => {
  const { t } = useTranslation();
  return (
    <div className="group flex flex-col items-center">
      <a href="https://www.instagram.com/daniel_shaya" target="_blank" rel="noopener noreferrer"
        className="relative rounded-[2rem] sm:rounded-[2.5rem] border-[3px] sm:border-4 border-zinc-600 bg-black p-1 sm:p-1.5 shadow-lg shadow-black/50 transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-xl group-hover:shadow-black/60 w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-label="Instagram – @daniel_shaya">
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full z-20 border border-zinc-700/50"></div>
        <div className="rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden relative aspect-[9/16] bg-gradient-to-b from-zinc-900 via-[#0d0b08] to-black flex flex-col items-center justify-center gap-3 px-3 text-center">
          <Instagram size={28} className="transition-transform duration-300 group-hover:scale-110" style={{ color: '#E1306C' }} />
          <p className="text-[11px] sm:text-xs text-zinc-300 font-light leading-snug">{t('gallery.moreOnInstagram')}</p>
          <span className="text-[10px] sm:text-xs font-light" style={{ color: GOLD }} dir="ltr">@daniel_shaya</span>
        </div>
        <div className="flex justify-center py-1 sm:py-1.5">
          <div className="w-1/3 h-1 bg-zinc-600 rounded-full"></div>
        </div>
      </a>
      <div className="mt-2.5 sm:mt-3">
        <p className="text-[11px] sm:text-xs text-zinc-500 font-light text-center leading-snug">{t('gallery.followMe')}</p>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const { t } = useTranslation();
  const originals = [
    { id: 'DIeAdFWN1NE', title: 'ארץ - עידן רייכל' },
    { id: 'DMXFaa8t6vK', title: 'מנגינת שקיעה' },
    { id: 'DIi0-gLN9Zs', title: 'צלילים מהלב' },
    { id: 'DI3VuiWt_BQ', title: 'אלתור חופשי' },
    { id: 'DNbLNijtrW-', title: 'מעגל קסמים' },
    { id: 'DPli4NfiD7W', title: 'קצב ונשמה' },
    { id: 'DRraf2JCGIo', title: 'הופעה חיה' },
  ];
  const covers = [
    { id: 'DNJJNQetzpS', title: 'זכיתי לאהוב - עברי לידר' },
    { id: 'DAngCE3NuO0', title: 'תוכו רצוף אהבה - ישי ריבו' },
    { id: 'DM7b2w-NpOv', title: 'דרישת שלום מחיים אחרים - עידן רייכל' },
    { id: 'DH3CRKcxswT', title: 'מדברים לאט - עידן רייכל' },
  ];

  return (
    <PageTransition id="gallery">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>{t('gallery.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">{t('gallery.title')}<GoldText>{t('gallery.titleGold')}</GoldText></h2>
          <p className="text-zinc-400 font-light text-sm">{t('gallery.subtitle')}</p>
        </div>
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl font-light text-white mb-6 text-center">
            <span className="inline-block border-b pb-1" style={{ borderColor: GOLD + '50' }}>{t('gallery.originals')}<GoldText>{t('gallery.originalsGold')}</GoldText></span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {originals.map((reel, i) => <ReelCard key={i} reel={reel} />)}
            <FollowCard />
          </div>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-light text-white mb-6 text-center">
            <span className="inline-block border-b pb-1" style={{ borderColor: GOLD + '50' }}><GoldText>{t('gallery.coversGold')}</GoldText>{t('gallery.coversRest')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {covers.map((reel, i) => <ReelCard key={i} reel={reel} />)}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// --- Music Shop Page ---

const RELEASES = [
  {
    id: 'inward',
    title: 'INWARD',
    typeKey: 'music.typeEp',
    year: '2026',
    price: '$5.94',
    cover: '/covers/inward.jpg',
    itunes: 'https://music.apple.com/us/album/inward-ep/6787771547',
    amazon: 'https://music.amazon.com/artists/B098HLF15T/shaaya',
    tracks: [
      { name: 'Between a Story and a Tale', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/88/8b/19888b9c-63c1-a0b3-3c02-46236c84b68c/mzaf_12894117201529059392.plus.aac.p.m4a' },
      { name: 'Geshem', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/1c/83/b31c838f-4635-db03-053c-4f807490fef9/mzaf_13945832316417884606.plus.aac.p.m4a' },
      { name: 'Where the body listens', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/da/61/ec/da61ec69-c7f2-567d-7a88-f8a0cc4ee494/mzaf_9463538586505596765.plus.aac.p.m4a' },
      { name: 'Jasmine Scent', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/31/09/0d/31090da7-1246-628a-fd46-76fa50912bc3/mzaf_3211555180112719572.plus.aac.p.m4a' },
      { name: 'Flow Motion', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4c/80/b0/4c80b074-83ad-2949-c26c-bac37c859b52/mzaf_3080979285786457470.plus.aac.p.m4a' },
      { name: 'Sparks', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/95/28/04/952804eb-1587-7b08-91e4-552147385550/mzaf_2626283797884234121.plus.aac.p.m4a' }
    ],
    isNew: true
  },
  {
    id: 'afterglow',
    title: 'Afterglow',
    typeKey: 'music.typeSingle',
    year: '2026',
    price: '$1.29',
    cover: '/covers/afterglow.jpg',
    itunes: 'https://music.apple.com/us/album/afterglow-single/1879111260',
    amazon: 'https://music.amazon.com/albums/B0GP2R2RQL',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f1/bd/d7/f1bdd7bd-f91b-5a8c-08a7-1e2f40ce310e/mzaf_16969473337731002242.plus.aac.p.m4a'
  },
  {
    id: 'steel',
    title: 'When the Steel is Cold',
    typeKey: 'music.typeSingle',
    year: '2026',
    price: '$0.99',
    cover: '/covers/steel.jpg',
    itunes: 'https://music.apple.com/us/album/when-the-steel-is-cold-single/1877189108',
    amazon: 'https://www.amazon.com/dp/B0GMYZ5RW7',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/88/d7/54/88d754b9-52d5-349e-51a1-489f4d51d632/mzaf_16418395601153423300.plus.aac.p.m4a'
  }
];

const BuyButtons = ({ release, large = false }) => {
  const { t } = useTranslation();
  const base = `flex items-center justify-center gap-2 rounded-full tracking-wider uppercase transition-all duration-300 min-h-[44px] ${large ? 'px-6 py-3 text-xs sm:text-sm' : 'px-4 py-2.5 text-[11px]'}`;
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 w-full">
      <a href={release.itunes} target="_blank" rel="noopener noreferrer"
        className={`${base} btn-sparkle flex-1 text-black font-medium hover:brightness-110`}
        style={{ backgroundColor: GOLD }}>
        <AppleMusicIcon size={large ? 18 : 15} />
        {t('music.buyItunes')}
      </a>
      <a href={release.amazon} target="_blank" rel="noopener noreferrer"
        className={`${base} flex-1 border text-white hover:bg-white hover:text-black`}
        style={{ borderColor: GOLD + '60' }}>
        <AmazonIcon size={large ? 18 : 15} />
        {t('music.buyAmazon')}
      </a>
    </div>
  );
};

const MusicPage = () => {
  const { t } = useTranslation();
  const featured = RELEASES[0];
  const singles = RELEASES.slice(1);
  const audioRef = useRef(null);
  const [playingSrc, setPlayingSrc] = useState(null);

  const togglePreview = (src) => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (playingSrc === src) {
      audio.pause();
      setPlayingSrc(null);
      return;
    }
    audio.src = src;
    audio.play().catch(() => {});
    setPlayingSrc(src);
  };

  // Stop the preview when leaving the page
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return (
    <PageTransition id="music">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>{t('music.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">{t('music.shopTitle')}<GoldText>{t('music.shopTitleGold')}</GoldText></h2>
          <p className="text-zinc-400 font-light text-sm max-w-xl mx-auto">{t('music.shopSubtitle')}</p>
        </div>

        {/* Featured EP */}
        <div className="relative rounded-2xl border bg-gradient-to-br from-zinc-900/60 to-[#080808] overflow-hidden mb-8 sm:mb-10" style={{ borderColor: GOLD + '35' }}>
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-[42%] shrink-0">
              <img src={featured.cover} alt={featured.title} decoding="async" className="w-full h-full aspect-square object-cover" />
              <span className="absolute top-4 start-4 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-black font-medium" style={{ backgroundColor: GOLD }}>{t('music.newBadge')}</span>
            </div>
            <div className="flex-1 p-5 sm:p-8 flex flex-col gap-4 sm:gap-5">
              <div>
                <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                  {t(featured.typeKey)} · {featured.year} · {t('music.trackCount', { num: featured.tracks.length })}
                </span>
                <h3 className="text-3xl sm:text-4xl font-light text-white mt-1 tracking-wide">{featured.title}</h3>
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1" dir="ltr">
                {featured.tracks.map((track, i) => {
                  const isPlaying = playingSrc === track.preview;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => togglePreview(track.preview)}
                        className={`w-full flex items-center gap-2.5 py-0.5 text-sm font-light text-start transition-colors rounded ${isPlaying ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        aria-label={`${t('music.previewLabel')} – ${track.name}`}
                      >
                        <span className="w-4 shrink-0 flex items-center justify-center" style={{ color: GOLD }}>
                          {isPlaying ? <Pause size={12} /> : <Play size={12} className="opacity-70" />}
                        </span>
                        {track.name}
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="text-[10px] text-zinc-600 -mt-2" dir="ltr">{t('music.previewHint')}</p>
              <div className="mt-auto pt-1 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-white">{featured.price}</span>
                  <span className="text-xs text-zinc-500">{t('music.fullEp')}</span>
                </div>
                <BuyButtons release={featured} large />
              </div>
            </div>
          </div>
        </div>

        {/* Singles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {singles.map((release) => (
            <div key={release.id} className="group rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/25 transition-all duration-300 flex flex-col">
              <div className="overflow-hidden">
                <img src={release.cover} alt={release.title} loading="lazy" decoding="async" className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">{t(release.typeKey)} · {release.year}</span>
                    <h3 className="text-lg sm:text-xl font-light text-white">{release.title}</h3>
                  </div>
                  <span className="text-lg font-light shrink-0" style={{ color: GOLD }}>{release.price}</span>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreview(release.preview)}
                  className={`self-start flex items-center gap-1.5 text-[11px] tracking-wider uppercase transition-colors ${playingSrc === release.preview ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  aria-label={`${t('music.previewLabel')} – ${release.title}`}
                >
                  {playingSrc === release.preview ? <Pause size={12} style={{ color: GOLD }} /> : <Play size={12} style={{ color: GOLD }} />}
                  {t('music.previewLabel')}
                </button>
                <div className="mt-auto">
                  <BuyButtons release={release} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center rounded-xl border px-6 py-8 sm:py-10 mb-10 sm:mb-12" style={{ borderColor: GOLD + '30', backgroundColor: GOLD + '08' }}>
          <Heart size={20} className="mx-auto mb-3" style={{ color: GOLD }} />
          <h3 className="text-lg sm:text-2xl font-light text-white mb-2">{t('music.ctaTitle')}<GoldText>{t('music.ctaTitleGold')}</GoldText></h3>
          <p className="text-zinc-400 font-light text-sm max-w-lg mx-auto">{t('music.ctaText')}</p>
        </div>

        <audio ref={audioRef} onEnded={() => setPlayingSrc(null)} preload="none" />

        {/* Streaming */}
        <div className="text-center space-y-4">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400">{t('music.streamingPrompt')}</p>
          <div className="flex justify-center items-center gap-3">
            <a href="https://open.spotify.com/artist/7sjTH5RSnYRzdKt6MwVahE" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-[#1DB954] hover:border-white/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Spotify">
              <SpotifyIcon size={18} />
            </a>
            <a href="https://music.apple.com/il/artist/shaaya/1876665852" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-[#FC3C44] hover:border-white/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Apple Music">
              <AppleMusicIcon size={18} />
            </a>
            <a href="https://www.youtube.com/channel/UC80_83SPXBji6OsByzC5NRA" target="_blank" rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-red-500 hover:border-white/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const RecommendationsPage = () => {
  const { t } = useTranslation();
  const items = t('recommendations.items', { returnObjects: true }) || [];
  const goldWordsHe = { 'לב': true, 'אושר': true, 'פאנטם': true };

  const highlightGold = (text) => {
    if (typeof text !== 'string') return text;
    const words = Object.keys(goldWordsHe);
    const regex = new RegExp(`(${words.join('|')})`, 'g');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      goldWordsHe[part] ? <GoldText key={i}>{part}</GoldText> : part
    );
  };

  return (
    <PageTransition id="recommendations">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>{t('recommendations.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">{t('recommendations.title')}<GoldText>{t('recommendations.titleGold')}</GoldText></h2>
          <p className="text-zinc-400 font-light text-xs sm:text-sm max-w-lg mx-auto">{t('recommendations.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-sm transition-all duration-500 ${i === 0 ? 'md:row-span-2 bg-gradient-to-br from-zinc-900/80 to-[#080808] border border-white/5 hover:border-white/15' : 'bg-[#080808] border border-white/5 hover:border-white/15'}`}>
              <div className={`absolute top-0 left-0 w-20 h-20 opacity-[0.02] ${i === 0 ? 'w-24 h-24' : ''}`}>
                <Quote className="w-full h-full" />
              </div>
              <div className={`relative z-10 p-4 sm:p-6 ${i === 0 ? 'sm:p-7 flex flex-col justify-between h-full' : ''}`}>
                <div className={`mb-3 sm:mb-4 ${i === 0 ? 'mb-4 sm:mb-5' : ''}`}>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center group-hover:opacity-80 transition-colors" style={{ backgroundColor: GOLD + '15' }}>
                    <Quote size={i === 0 ? 16 : 12} style={{ color: GOLD }} />
                  </div>
                </div>
                <p className={`leading-relaxed font-light text-zinc-300 mb-4 sm:mb-5 ${i === 0 ? 'text-base sm:text-lg md:text-xl font-serif italic' : 'text-sm sm:text-base'}`}>
                  &ldquo;{highlightGold(item.text)}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <div className="w-8 h-[1px]" style={{ backgroundColor: GOLD + '40' }}></div>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide" style={{ color: GOLD }}>{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', interest: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [phoneError, setPhoneError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') { setFormData(prev => ({ ...prev, [name]: sanitizePhone(value) })); setPhoneError(''); }
    else { setFormData(prev => ({ ...prev, [name]: value })); }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone(formData.phone)) { setPhoneError(t('contact.form.phoneError')); return; }
    setStatus('sending');
    const msg = `*פנייה חדשה מהאתר* 🎵\n\n*שם:* ${formData.name}\n*טלפון:* ${formData.phone}\n*סוג התעניינות:* ${formData.interest}\n\n*הודעה:*\n${formData.message}`;
    window.open(`https://wa.me/972526464647?text=${encodeURIComponent(msg)}`, '_blank');
    setStatus('sent');
    setFormData({ name: '', phone: '', interest: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const interestOptions = t('contact.form.interestOptions', { returnObjects: true }) || [];

  return (
    <PageTransition id="contact">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase block mb-4 sm:mb-6" style={{ color: GOLD }}>{t('contact.label')}</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-thin mb-8 sm:mb-12 text-white">
              {t('contact.title')}<span className="font-serif italic" style={{ color: GOLD }}>{t('contact.titleGold')}</span>
            </h2>
            <div className="space-y-8 sm:space-y-10">
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="https://wa.me/972526464647" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-full hover:bg-green-500 hover:text-white transition-all duration-500 group min-w-[48px] min-h-[48px] justify-center text-green-500"
                  aria-label="WhatsApp">
                  <WhatsAppIcon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="mailto:pantamexperience@gmail.com"
                  className="flex items-center gap-3 p-3.5 sm:p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 group min-w-[48px] min-h-[48px] justify-center"
                  aria-label="Email">
                  <Mail size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">{t('contact.followMe')}</h3>
                <SocialLinks size={22} />
              </div>
            </div>
          </div>
          <form ref={formRef} className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name')} required className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors placeholder:text-zinc-700 text-base" />
            <div>
              <input type="tel" inputMode="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} required maxLength="16" dir="ltr" aria-invalid={!!phoneError} className={`w-full bg-transparent border-b focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors placeholder:text-zinc-700 text-base ${isRtl ? 'text-right' : 'text-left'} ${phoneError ? 'border-red-500/70' : 'border-zinc-800'}`} />
              {phoneError && <p className="text-red-400 text-xs mt-1.5" role="alert">{phoneError}</p>}
            </div>
            <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full bg-[#050505] border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-zinc-400 font-light transition-colors appearance-none cursor-pointer text-base">
              <option value="">{t('contact.form.interest')}</option>
              {interestOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message')} required className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors resize-none placeholder:text-zinc-700 text-base"></textarea>
            <button type="submit" disabled={status === 'sending'} className={`w-full px-10 sm:px-12 py-4 border text-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase flex items-center justify-center gap-3 min-h-[48px] ${status === 'sending' ? 'opacity-50 cursor-not-allowed border-zinc-700' : ''} ${status === 'sent' ? 'border-green-500/50 text-green-400' : ''}`}
              style={{ borderColor: status === 'idle' ? GOLD + '50' : undefined }}
              onMouseEnter={e => { if (status === 'idle') { e.currentTarget.style.backgroundColor = GOLD; } }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              {status === 'idle' && <><Send size={16} />{t('contact.form.send')}</>}
              {status === 'sending' && <><Loader2 size={16} className="animate-spin" />{t('contact.form.sending')}</>}
              {status === 'sent' && <><CheckCircle size={16} />{t('contact.form.sent')}</>}
              {status === 'error' && <><X size={16} />{t('contact.form.error')}</>}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

// --- Mobile Full Page (single-page scroll) ---

const MobileFullPage = ({ videoRef, onOpenContactModal, onNavigate }) => {
  return (
    <div className="mobile-full-page">
      <HomePage videoRef={videoRef} onNavigate={onNavigate} />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <AboutPage />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <ServicesPage onOpenContactModal={onOpenContactModal} />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <GalleryPage />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <MusicPage />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <RecommendationsPage />
      <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: GOLD + '30' }}></div>
      <ContactPage />
    </div>
  );
};

// --- Main App ---

const PAGE_IDS = ['home', 'about', 'services', 'gallery', 'music', 'recommendations', 'contact'];

const pageFromHash = () => {
  const h = window.location.hash.slice(1);
  return PAGE_IDS.includes(h) ? h : 'home';
};

const App = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState(pageFromHash);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalInterest, setContactModalInterest] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [heroVisible, setHeroVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 900);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Keep document.title in sync with the visible section and language (SEO / sharing / history)
  const currentSection = isMobile ? activeSection : activePage;
  useEffect(() => {
    document.title = t(`seo.titles.${currentSection}`, { defaultValue: 'SHAAYA | Handpan Artist' });
  }, [currentSection, i18n.language, t]);

  // Mobile: track which section is on screen (scroll-spy) and whether the hero is visible
  useEffect(() => {
    if (!isMobile || !('IntersectionObserver' in window)) return;
    const sections = PAGE_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));

    let heroObs;
    const hero = document.getElementById('home');
    if (hero) {
      heroObs = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
      heroObs.observe(hero);
    }
    return () => { spy.disconnect(); heroObs?.disconnect(); };
  }, [isMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setIsMusicPlaying(false);
    // Respect reduced-motion preference: show the poster instead of the moving video
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  const toggleMusic = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    if (isMusicPlaying) { v.muted = true; setIsMusicPlaying(false); }
    else { v.muted = false; setIsMusicPlaying(true); }
  };

  // Lock scroll only when mobile menu is open (allow page scroll at high zoom on home)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Mute when navigating away from home on desktop
  useEffect(() => {
    if (!isMobile && activePage !== 'home') {
      const v = videoRef.current;
      if (v) { v.muted = true; setIsMusicPlaying(false); }
    }
  }, [activePage, isMobile]);

  const navigateTo = useCallback((page) => {
    setIsMenuOpen(false);
    if (isMobile) {
      const el = document.getElementById(page);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${page}`);
      }
    } else {
      setActivePage(page);
      window.history.pushState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isMobile]);

  // Sync page with URL hash (back/forward buttons, direct links)
  useEffect(() => {
    const onHashChange = () => {
      const page = pageFromHash();
      if (isMobile) {
        const el = document.getElementById(page);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActivePage(page);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isMobile]);

  const openContactModal = (interest = '') => { setContactModalInterest(interest); setContactModalOpen(true); };
  const closeContactModal = () => { setContactModalOpen(false); setContactModalInterest(''); };

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'music', label: t('nav.music') },
    { id: 'recommendations', label: t('nav.recommendations') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const renderPage = () => {
    if (isMobile) {
      return <MobileFullPage videoRef={videoRef} onOpenContactModal={openContactModal} onNavigate={navigateTo} />;
    }
    switch(activePage) {
      case 'home': return <HomePage videoRef={videoRef} onNavigate={navigateTo} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage onOpenContactModal={openContactModal} />;
      case 'gallery': return <GalleryPage />;
      case 'music': return <MusicPage />;
      case 'recommendations': return <RecommendationsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage videoRef={videoRef} onNavigate={navigateTo} />;
    }
  };

  const showMusicButton = isMobile ? heroVisible : activePage === 'home';

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-white/20 overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 safe-top ${scrolled || (!isMobile && activePage !== 'home') ? 'bg-[#050505]/95 backdrop-blur-sm py-2.5 sm:py-3 border-b border-white/5' : 'bg-transparent py-3 sm:py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => navigateTo('home')}><Logo /></div>
          <div className="hidden lg:flex gap-4 xl:gap-8 text-xs font-light tracking-[0.15em] uppercase text-zinc-400 items-center">
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                className={`hover:text-white transition-colors relative group ${!isMobile && activePage === item.id ? 'text-white' : ''}`}>
                {item.label}
                <span className={`absolute -bottom-2 ${isRtl ? 'right-0' : 'left-0'} h-[1px] transition-all duration-300 ${!isMobile && activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ backgroundColor: GOLD }}></span>
              </a>
            ))}
            <LanguageSwitcher className="ml-4" />
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <SocialLinks size={18} />
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-[100dvh] bg-[#050505] z-40 flex flex-col items-center justify-center gap-7 sm:gap-10 text-xl sm:text-2xl font-light tracking-widest animate-fade-in safe-top safe-bottom">
            <button className="absolute top-4 left-4 text-white min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setIsMenuOpen(false)}><X size={28} /></button>
            {menuItems.map((item) => {
              const isActive = isMobile ? activeSection === item.id : activePage === item.id;
              return (
                <a key={item.id} href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                  className={`transition-colors min-h-[44px] flex items-center ${isActive ? 'underline underline-offset-8 decoration-1' : 'text-zinc-400'}`}
                  style={isActive ? { color: GOLD } : {}}>
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 sm:pt-8"><SocialLinks size={22} /></div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">{renderPage()}</main>

      {/* Footer - shown on non-home desktop pages, or always on mobile after scroll */}
      {(isMobile || activePage !== 'home') && (
        <footer className="py-6 sm:py-8 bg-black border-t border-white/5 safe-bottom">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
            {/* Crawlable section links (real anchors, not JS buttons) */}
            <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {menuItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                  className="text-zinc-500 hover:text-white text-[11px] tracking-widest uppercase transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="text-zinc-600 text-[11px] font-light text-center max-w-2xl leading-relaxed">{t('footer.tagline')}</p>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-500 text-xs tracking-widest">&copy; {new Date().getFullYear()} SHAAYA. {t('footer.rights')}</p>
              <SocialLinks size={16} className="opacity-50 hover:opacity-100 transition-opacity" />
              <div className="opacity-30 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigateTo('home')}><Logo className="h-6 sm:h-8" /></div>
            </div>
          </div>
        </footer>
      )}

      {/* Floating Music Button */}
      {showMusicButton && (
        <button type="button" onClick={toggleMusic}
          className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] start-4 sm:start-8 z-40 backdrop-blur-md border text-white p-3 sm:p-3.5 rounded-full transition-all duration-500 group min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center animate-fade-in touch-manipulation ${isMusicPlaying ? 'bg-white/10 border-white/20' : 'bg-white/15 border-white/30 animate-music-pulse hover:bg-white hover:text-black'}`}
          aria-label={isMusicPlaying ? t('home.muteMusic') : t('home.playMusic')}>
          {isMusicPlaying ? <Volume2 size={22} className="group-hover:scale-110 transition-transform" /> : <VolumeX size={22} className="group-hover:scale-110 transition-transform" />}
        </button>
      )}

      {/* Back to top (mobile long page) */}
      {isMobile && showBackToTop && !isMenuOpen && (
        <button type="button"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.replaceState(null, '', '#home'); }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] end-4 z-40 backdrop-blur-md bg-white/10 border border-white/20 text-white p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center animate-fade-in touch-manipulation hover:bg-white hover:text-black transition-colors"
          aria-label={t('nav.backToTop')}>
          <ChevronUp size={22} />
        </button>
      )}

      <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} preselectedInterest={contactModalInterest} />
    </div>
  );
};

export default App;
