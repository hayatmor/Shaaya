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
  ExternalLink
} from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';

const GOLD = '#C9A55A';

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

// --- useIsMobile hook ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

// --- Contact Form Modal ---

const ContactModal = ({ isOpen, onClose, preselectedInterest = '' }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', interest: preselectedInterest, message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (preselectedInterest) setFormData(prev => ({ ...prev, interest: preselectedInterest }));
  }, [preselectedInterest]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', interest: preselectedInterest, message: '' });
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, preselectedInterest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) { alert(t('contact.form.phoneError')); return; }
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border-t sm:border border-white/10 rounded-t-2xl sm:rounded-sm w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up p-6 sm:p-8 md:p-10 safe-bottom">
        <button onClick={onClose} className="absolute top-4 left-4 text-zinc-500 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><X size={20} /></button>
        <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        <h3 className="text-xl sm:text-2xl font-light text-white mb-2">{t('modal.title')}<GoldText>{t('modal.titleGold')}</GoldText></h3>
        <p className="text-zinc-500 text-sm mb-6 sm:mb-8">{t('modal.subtitle')}</p>
        <form ref={formRef} className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name')} required className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} required pattern="\d{10}" minLength="10" maxLength="10" dir={isRtl ? 'rtl' : 'ltr'} className={`w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base ${isRtl ? 'text-right' : 'text-left'}`} />
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

const VideoCard = ({ videoId, title, label, labelStyle, distroLink, listenText }) => {
  const [expanded, setExpanded] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  return (
    <>
      <div className="flex flex-col items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase" style={labelStyle}>{label}</span>
        <p className="text-base sm:text-lg font-serif italic text-white">{title}</p>
        <button onClick={() => setExpanded(true)} className="w-full aspect-video rounded-lg overflow-hidden relative group cursor-pointer">
          <img src={thumb} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play size={22} className="fill-white text-white ml-0.5" />
            </div>
          </div>
        </button>
        <a href={distroLink} target="_blank" rel="noopener noreferrer"
          className="btn-sparkle px-5 py-2 border rounded-full text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-black"
          style={{ borderColor: GOLD + '60', color: GOLD }}>
          <Play size={14} />
          {listenText}
        </a>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 animate-fade-in" onClick={() => setExpanded(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative w-full max-w-4xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <button onClick={() => setExpanded(false)}
              className="absolute -top-10 right-0 sm:-top-12 sm:-right-2 text-zinc-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-10">
              <X size={28} />
            </button>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
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

const HomePage = ({ isMusicPlaying, videoRef }) => {
  const { t } = useTranslation();
  return (
    <div id="home" className="relative min-h-[100dvh] sm:h-[100dvh] w-full flex flex-col items-center justify-center sm:overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video ref={videoRef} autoPlay loop playsInline preload="auto" className="w-full h-full object-cover opacity-50">
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl space-y-3 sm:space-y-5 animate-slide-up mt-20 sm:mt-20 pb-8 sm:pb-0">
        <p className="tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase drop-shadow-lg" style={{ color: GOLD }}>{t('home.subtitle')}</p>
        <img src="/logo-transparent.png" alt="SHAAYA" className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto mx-auto drop-shadow-2xl object-contain" />
        <p className="text-sm sm:text-base md:text-lg font-light text-zinc-200 max-w-xl mx-auto leading-relaxed drop-shadow-md px-2">
          {t('home.tagline1')}<GoldText>{t('home.tagline1gold')}</GoldText>.
          <br />
          {t('home.tagline2')}<GoldText>{t('home.tagline2gold')}</GoldText>.
        </p>
        <div className="pt-3 sm:pt-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://wa.me/972526464647" target="_blank" rel="noopener noreferrer"
            className="btn-sparkle px-6 sm:px-8 py-3 border border-white/30 backdrop-blur-sm hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-300 rounded-full tracking-widest text-xs sm:text-sm uppercase flex items-center gap-3 min-h-[48px]">
            <WhatsAppIcon size={18} className="text-green-500" />
            {t('home.cta')}
          </a>
        </div>
        {/* Latest Releases */}
        <div className="pt-4 sm:pt-6 w-full max-w-xs sm:max-w-2xl mx-auto px-2">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
            <VideoCard
              videoId="Uas_RFaPxzM"
              title="Afterglow"
              label={t('home.latestRelease')}
              labelStyle={{ color: GOLD }}
              distroLink="https://distrokid.com/hyperfollow/shaaya/afterglow"
              listenText={t('home.listenNow')}
            />
            <VideoCard
              videoId="5iR5e0fqGlM"
              title="When the Steel is Cold"
              label={'\u00A0'}
              labelStyle={{ color: 'transparent' }}
              distroLink="https://distrokid.com/hyperfollow/shaaya/when-the-steel-is-cold"
              listenText={t('home.listenNow')}
            />
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
              <img src="/daniel-about.png" alt="Daniel Shaaya" className="w-full h-auto object-contain" />
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
                onMouseEnter={e => { e.target.style.backgroundColor = GOLD; e.target.style.color = '#000'; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>
                {s.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
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
    { id: 'DMXFaa8t6vK', title: 'רגע מוזיקלי' },
  ];
  const covers = [
    { id: 'DNJJNQetzpS', title: 'זכיתי לאהוב - עברי לידר' },
    { id: 'DAngCE3NuO0', title: 'תוכו רצוף אהבה - ישי ריבו' },
    { id: 'DM7b2w-NpOv', title: 'דרישת שלום מחיים אחרים - עידן רייכל' },
    { id: 'DH3CRKcxswT', title: 'מדברים לאט - עידן רייכל' },
  ];

  const ReelCard = ({ reel }) => (
    <div className="group flex flex-col items-center">
      <a href={`https://www.instagram.com/reel/${reel.id}/`} target="_blank" rel="noopener noreferrer"
        className="relative rounded-[2rem] sm:rounded-[2.5rem] border-[3px] sm:border-4 border-zinc-600 bg-black p-1 sm:p-1.5 shadow-lg shadow-black/50 transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-xl group-hover:shadow-black/60 w-full block">
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full z-20 border border-zinc-700/50"></div>
        <div className="rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-black relative">
          <div className="reel-embed-wrapper aspect-[9/16] w-full">
            <iframe
              src={`https://www.instagram.com/reel/${reel.id}/embed/`}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
              loading="lazy"
              title={reel.title}
            />
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

  return (
    <PageTransition id="gallery">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>{t('gallery.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">{t('gallery.title')}<GoldText>{t('gallery.titleGold')}</GoldText></h2>
          <p className="text-zinc-500 font-light text-sm">{t('gallery.subtitle')}</p>
        </div>
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl font-light text-white mb-6 text-center">
            <span className="inline-block border-b pb-1" style={{ borderColor: GOLD + '50' }}>{t('gallery.originals')}<GoldText>{t('gallery.originalsGold')}</GoldText></span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {originals.map((reel, i) => <ReelCard key={i} reel={reel} />)}
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

// --- Music Page ---

const MusicPage = () => {
  const { t } = useTranslation();
  return (
    <PageTransition id="music">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10 sm:mb-14 space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>{t('music.label')}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white"><GoldText>{t('music.title')}</GoldText></h2>
          <p className="text-zinc-500 font-light text-sm">{t('music.subtitle')}</p>
        </div>

        <div className="space-y-10 sm:space-y-14">

          {/* Afterglow - Latest Release */}
          <div className="space-y-6 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: GOLD + '20' }}>
                  <Sparkles size={16} style={{ color: GOLD }} />
                </div>
                <div>
                  <h3 className="text-lg font-light text-white">Afterglow</h3>
                  <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: GOLD }}>New Release</span>
                </div>
              </div>
              <a href="https://distrokid.com/hyperfollow/shaaya/afterglow" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded-full text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
                style={{ borderColor: GOLD + '40', color: GOLD }}>
                <Play size={12} />
                {t('home.listenNow')}
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/album/3Y3Fqmf0lVdEaPZHtbyBGb"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify - Afterglow"
              />
            </div>
          </div>

          {/* When the Steel is Cold */}
          <div className="space-y-6 p-5 sm:p-6 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5">
                  <Music size={16} className="text-zinc-400" />
                </div>
                <h3 className="text-lg font-light text-white">When the Steel is Cold</h3>
              </div>
              <a href="https://distrokid.com/hyperfollow/shaaya/when-the-steel-is-cold" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded-full text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black border-white/20 text-zinc-400">
                <Play size={12} />
                {t('home.listenNow')}
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Apple Music */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AppleMusicIcon size={16} className="text-[#FC3C44]" />
                <span className="text-sm text-zinc-400">{t('music.appleMusicTitle')}</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-zinc-900/50 border border-white/5">
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="175"
                  style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px', margin: '0 auto', display: 'block' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.music.apple.com/il/song/when-the-steel-is-cold/1877189109"
                  title="Apple Music - When the Steel is Cold"
                />
              </div>
            </div>

            {/* Spotify */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SpotifyIcon size={16} className="text-[#1DB954]" />
                <span className="text-sm text-zinc-400">{t('music.spotifyTitle')}</span>
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/track/6ILXxlykjl3FWNhB5l52uD"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify - When the Steel is Cold"
                />
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="text-center">
            <a href="https://www.youtube.com/channel/UC80_83SPXBji6OsByzC5NRA" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-300 hover:bg-white hover:text-black group"
              style={{ borderColor: GOLD + '40', color: GOLD }}>
              <Youtube size={22} className="group-hover:text-red-500 transition-colors" />
              <span className="tracking-wider text-sm uppercase">{t('music.watchOnYoutube')}</span>
              <ExternalLink size={14} />
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
          <p className="text-zinc-500 font-light text-xs sm:text-sm max-w-lg mx-auto">{t('recommendations.subtitle')}</p>
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') { setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 10) })); }
    else { setFormData(prev => ({ ...prev, [name]: value })); }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) { alert(t('contact.form.phoneError')); return; }
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
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} required pattern="\d{10}" minLength="10" maxLength="10" dir={isRtl ? 'rtl' : 'ltr'} className={`w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors placeholder:text-zinc-700 text-base ${isRtl ? 'text-right' : 'text-left'}`} />
            <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full bg-[#050505] border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-zinc-400 font-light transition-colors appearance-none cursor-pointer text-base">
              <option value="">{t('contact.form.interest')}</option>
              {interestOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message')} required className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors resize-none placeholder:text-zinc-700 text-base"></textarea>
            <button type="submit" disabled={status === 'sending'} className={`w-full px-10 sm:px-12 py-4 border text-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase flex items-center justify-center gap-3 min-h-[48px] ${status === 'sending' ? 'opacity-50 cursor-not-allowed border-zinc-700' : ''} ${status === 'sent' ? 'border-green-500/50 text-green-400' : ''}`}
              style={{ borderColor: status === 'idle' ? GOLD + '50' : undefined }}
              onMouseEnter={e => { if (status === 'idle') { e.target.style.backgroundColor = GOLD; } }}
              onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}>
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

const MobileFullPage = ({ isMusicPlaying, videoRef, onOpenContactModal }) => {
  return (
    <div className="mobile-full-page">
      <HomePage isMusicPlaying={isMusicPlaying} videoRef={videoRef} />
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

const App = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalInterest, setContactModalInterest] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => setIsVideoReady(true);
    video.addEventListener('playing', onPlaying);
    video.muted = true;
    setIsMusicPlaying(false);
    video.play().then(() => {
      setIsVideoReady(true);
    }).catch(() => {});
    return () => { video.removeEventListener('playing', onPlaying); };
  }, []);

  const toggleMusic = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    if (isMusicPlaying) { v.muted = true; setIsMusicPlaying(false); }
    else { v.muted = false; setIsMusicPlaying(true); }
  };

  // Scroll lock: on desktop, lock only on home; on mobile, don't lock (single-page scroll)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isMobile && activePage === 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activePage, isMenuOpen, isMobile]);

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
      }
    } else {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      return <MobileFullPage isMusicPlaying={isMusicPlaying} videoRef={videoRef} onOpenContactModal={openContactModal} />;
    }
    switch(activePage) {
      case 'home': return <HomePage isMusicPlaying={isMusicPlaying} videoRef={videoRef} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage onOpenContactModal={openContactModal} />;
      case 'gallery': return <GalleryPage />;
      case 'music': return <MusicPage />;
      case 'recommendations': return <RecommendationsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage isMusicPlaying={isMusicPlaying} videoRef={videoRef} />;
    }
  };

  // Determine if we should show the music button
  const showMusicButton = isMobile ? isVideoReady : (activePage === 'home' && isVideoReady);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-white/20 overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 safe-top ${scrolled || (!isMobile && activePage !== 'home') ? 'bg-[#050505]/95 backdrop-blur-sm py-2.5 sm:py-3 border-b border-white/5' : 'bg-transparent py-3 sm:py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => navigateTo('home')}><Logo /></div>
          <div className="hidden lg:flex gap-4 xl:gap-8 text-xs font-light tracking-[0.15em] uppercase text-zinc-400 items-center">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => navigateTo(item.id)}
                className={`hover:text-white transition-colors relative group ${!isMobile && activePage === item.id ? 'text-white' : ''}`}>
                {item.label}
                <span className={`absolute -bottom-2 ${isRtl ? 'right-0' : 'left-0'} h-[1px] transition-all duration-300 ${!isMobile && activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ backgroundColor: GOLD }}></span>
              </button>
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
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => navigateTo(item.id)}
                className={`transition-colors min-h-[44px] flex items-center ${!isMobile && activePage === item.id ? 'underline underline-offset-8 decoration-1' : 'text-zinc-400'}`}
                style={!isMobile && activePage === item.id ? { color: GOLD } : {}}>
                {item.label}
              </button>
            ))}
            <div className="pt-4 sm:pt-8"><SocialLinks size={22} /></div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">{renderPage()}</main>

      {/* Footer - shown on non-home desktop pages, or always on mobile after scroll */}
      {(isMobile || activePage !== 'home') && (
        <footer className="py-6 sm:py-8 bg-black border-t border-white/5 safe-bottom">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-xs tracking-widest">&copy; {new Date().getFullYear()} SHAAYA. {t('footer.rights')}</p>
            <SocialLinks size={16} className="opacity-50 hover:opacity-100 transition-opacity" />
            <div className="opacity-30 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigateTo('home')}><Logo className="h-6 sm:h-8" /></div>
          </div>
        </footer>
      )}

      {/* Floating Music Button */}
      {showMusicButton && (
        <button onClick={toggleMusic}
          className={`fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 backdrop-blur-md border text-white p-3.5 sm:p-4 rounded-full transition-all duration-500 group min-w-[48px] min-h-[48px] flex items-center justify-center animate-fade-in ${isMusicPlaying ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white hover:text-black'}`}
          aria-label={isMusicPlaying ? t('home.muteMusic') : t('home.playMusic')}>
          {isMusicPlaying ? <Volume2 size={22} className="group-hover:scale-110 transition-transform" /> : <VolumeX size={22} className="group-hover:scale-110 transition-transform" />}
        </button>
      )}

      <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} preselectedInterest={contactModalInterest} />
    </div>
  );
};

export default App;
