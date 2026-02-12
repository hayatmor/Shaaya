import React, { useState, useEffect, useRef } from 'react';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
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
  Calendar,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- TikTok SVG Icon (not in lucide) ---
const TikTokIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- WhatsApp SVG Icon ---
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Shared Components ---

const Logo = ({ className = 'h-8 sm:h-10 md:h-12' }) => (
  <img 
    src="/logo-transparent.png" 
    alt="SHAAYA" 
    className={`${className} w-auto object-contain`}
  />
);

const SocialLinks = ({ size = 18, className = '' }) => (
  <div className={`flex items-center gap-5 ${className}`}>
    <a 
      href="https://www.instagram.com/daniel_shaya" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-400 hover:text-white active:text-white transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Instagram"
    >
      <Instagram size={size} />
    </a>
    <a 
      href="https://www.facebook.com/dshaya?mibextid=wwXIfr&rdid=ti8EKJIgVDyhzmCg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AXTLXZQrJ%2F%3Fmibextid%3DwwXIfr%26ref%3D1#" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-400 hover:text-white active:text-white transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Facebook"
    >
      <Facebook size={size} />
    </a>
    <a 
      href="https://www.youtube.com/channel/UCKiAPaAouYL5zeKKhZ-Pomg" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-400 hover:text-white active:text-white transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="YouTube"
    >
      <Youtube size={size} />
    </a>
    <a 
      href="https://www.tiktok.com/@daniel_shaya?_r=1&_t=ZS-93pUPzRMaG5" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-400 hover:text-white active:text-white transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="TikTok"
    >
      <TikTokIcon size={size} />
    </a>
  </div>
);

const PageTransition = ({ children }) => (
  <div className="animate-fade-in min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
    {children}
  </div>
);

// --- Contact Form Modal ---

const ContactModal = ({ isOpen, onClose, preselectedInterest = '' }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: preselectedInterest,
    message: ''
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (preselectedInterest) {
      setFormData(prev => ({ ...prev, interest: preselectedInterest }));
    }
  }, [preselectedInterest]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        interest: preselectedInterest,
        message: ''
      });
      setStatus('idle');
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, preselectedInterest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For phone, only allow digits and limit to 10 characters
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone is exactly 10 digits
    if (formData.phone.length !== 10) {
      alert('מספר הטלפון חייב להכיל 10 ספרות');
      return;
    }
    
    setStatus('sending');

    const whatsappMessage = `*פנייה חדשה מהאתר* 🎵\n\n*שם:* ${formData.name}\n*טלפון:* ${formData.phone}\n*סוג התעניינות:* ${formData.interest}\n\n*הודעה:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/972526464647?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setStatus('sent');

    setFormData({ name: '', phone: '', interest: preselectedInterest, message: '' });
    setTimeout(() => {
      setStatus('idle');
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal - slides up from bottom on mobile, centered on desktop */}
      <div className="relative bg-[#0a0a0a] border-t sm:border border-white/10 rounded-t-2xl sm:rounded-sm w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up p-6 sm:p-8 md:p-10 safe-bottom">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-zinc-500 hover:text-white active:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X size={20} />
        </button>

        {/* Pull indicator for mobile */}
        <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-6 sm:hidden"></div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2">פרטים והרשמה</h3>
        <p className="text-zinc-500 text-sm mb-6 sm:mb-8">מלאו את הפרטים ונחזור אליכם בהקדם</p>

        <form ref={formRef} className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="שם מלא" 
            required
            className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base" 
          />
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="טלפון (10 ספרות)" 
            required
            pattern="\d{10}"
            minLength="10"
            maxLength="10"
            className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors placeholder:text-zinc-700 text-base" 
          />
          <select 
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a0a] border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-zinc-400 font-light transition-colors appearance-none cursor-pointer text-base"
          >
            <option value="">בחר סוג התעניינות</option>
            <option value="נגינה באירועים והופעות">נגינה באירועים והופעות</option>
            <option value="סדנה זוגית">סדנה זוגית</option>
            <option value="סדנה למשפחות">סדנה למשפחות</option>
            <option value="סדנה לצוותים">סדנה לצוותים</option>
            <option value="שיעורים פרטיים">שיעורים פרטיים</option>
            <option value="אחר">אחר</option>
          </select>
          <textarea 
            rows="3" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="ההודעה שלך..." 
            className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 text-white font-light transition-colors resize-none placeholder:text-zinc-700 text-base"
          ></textarea>
          
          <button 
            type="submit"
            disabled={status === 'sending'}
            className={`w-full py-4 border border-zinc-700 text-white hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-500 tracking-widest text-sm uppercase flex items-center justify-center gap-3 min-h-[48px] ${
              status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
            } ${status === 'sent' ? 'border-green-500/50 text-green-400' : ''}`}
          >
            {status === 'idle' && (
              <>
                <Send size={16} />
                שלח הודעה
              </>
            )}
            {status === 'sending' && (
              <>
                <Loader2 size={16} className="animate-spin" />
                שולח...
              </>
            )}
            {status === 'sent' && (
              <>
                <CheckCircle size={16} />
                נשלח בהצלחה!
              </>
            )}
            {status === 'error' && (
              <>
                <X size={16} />
                שגיאה, נסה שנית
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ isMusicPlaying, videoRef }) => {
  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background Layer with Audio */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />

      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl space-y-3 sm:space-y-5 animate-slide-up mt-16 sm:mt-20">
        <p className="text-zinc-400 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase drop-shadow-lg">Handpan Artist & Musician</p>
        <img 
          src="/logo-transparent.png" 
          alt="SHAAYA" 
          className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto mx-auto drop-shadow-2xl object-contain"
        />
        <p className="text-sm sm:text-base md:text-lg font-light text-zinc-200 max-w-xl mx-auto leading-relaxed drop-shadow-md px-2">
          מסע מוזיקלי של הקשבה, קצב וחיבור.
          <br />
          המנגינה תלווה אותנו תמיד.
        </p>
        
        <div className="pt-3 sm:pt-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://wa.me/972526464647"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-300 rounded-full tracking-widest text-xs sm:text-sm uppercase flex items-center gap-3 min-h-[48px]"
          >
            <WhatsAppIcon size={18} />
            ליצירת קשר
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <PageTransition>
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-10 sm:gap-14 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 space-y-6 sm:space-y-8">
          <div className="w-16 h-[1px] bg-white/20"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-white">
            היי, אני דניאל <br />
            <span className="text-zinc-500 font-serif italic">(Shaaya)</span>
          </h2>
          <div className="space-y-4 sm:space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed sm:leading-loose font-light">
            <p>
              אבא, איש משפחה, ומתופף בנשמה. האהבה שלי למוזיקה התחילה בגיל שש, כשמצאתי את עצמי מתופף בלי הפסקה, וכבר אז היה לי ברור שמוזיקה תהיה חלק בלתי נפרד מהחיים שלי.
            </p>
            <p>
              את הפאנטם פגשתי לראשונה בגיל 17, אבל רק ב־2019 קניתי את הכלי הראשון שלי - ומהרגע שהצלילים הראשונים פגשו את האצבעות, התחיל סיפור אהבה עמוק.
            </p>
            <p>
              מאז, אני מופיע, מלמד, מוביל סדנאות, ומלווה אירועים דרך הנגינה המיוחדת של הפאנטם - כלי שמשלב עדינות, עומק, מדיטטיביות ונגישות נדירה. אני מאמין שלכולנו מגיע מרחב של הקשבה, רוגע, יצירה וחיבור.
            </p>
            <ul className="grid grid-cols-1 gap-3 pt-4 text-sm text-zinc-500">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-500 rounded-full flex-shrink-0"/> הופעות אינטימיות ואירועים</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-500 rounded-full flex-shrink-0"/> סדנאות פאנטם (זוגות, משפחות, ארגונים)</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-500 rounded-full flex-shrink-0"/> שיעורים פרטיים וליווי מוזיקלי</li>
            </ul>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative mt-4 sm:mt-6 md:mt-0">
           <div className="bg-zinc-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out relative group rounded-sm">
              <img 
                src="/daniel-about.png" 
                alt="דניאל שעיה מנגן בפאנטם" 
                className="w-full h-auto object-contain"
              />
           </div>
           <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-full h-full border border-white/5 z-[-1] hidden md:block"></div>
        </div>
      </div>
    </div>
  </PageTransition>
);

const ServicesPage = ({ onOpenContactModal }) => {
  const services = [
    {
      title: "נגינה באירועים והופעות",
      subtitle: "צלילים שעוצרים את הזמן. אווירה שנוגעת בנשמה.",
      description: "מוזיקה חיה שמשדרגת כל אירוע והופכת אותו לבלתי נשכח. צלילי הפאנטם יוצרים תדר ייחודי של רוגע, חגיגיות וקסם, המשתלב בהרמוניה מושלמת עם אופי האירוע. מתאים לקבלות פנים, חופות, אירועי חברה ומעגלים פרטיים.",
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      interestValue: "נגינה באירועים והופעות",
      details: ["מותאם אישית לאופי האירוע", "יוצר אווירה יוקרתית ומרגשת", "הגברה איכותית ומקצועית", "לפרטים והזמנת תאריך"],
      highlight: true,
      ctaText: "לפרטים והזמנת תאריך"
    },
    {
      title: "סדנת פאנטם זוגית",
      subtitle: "חיבור דרך צליל. אהבה דרך מוזיקה.",
      description: "סדנה אינטימית ומרגשת שבה תגלו את היכולת של מוזיקה לפתוח את הלב. נחקור טכניקות פשוטות, ניצור הרמוניה משותפת ונצלול לעולם של רוגע ונוכחות. חוויה בלתי נשכחת של תקשורת ללא מילים.",
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      interestValue: "סדנה זוגית",
      details: ["משך: שעה וחצי", "זוג אחד בלבד", "מחיר: 600 ₪ (בסטודיו)", "אופציה להגעה עד הבית"],
      highlight: false,
      ctaText: "לפרטים והרשמה"
    },
    {
      title: "סדנה למשפחות",
      subtitle: "רגע של חיבור. צליל של אהבה.",
      description: "הזדמנות לעצור את המרוץ ולנשום יחד. ננגן, נתנסה בתרגולים חווייתיים של דמיון ותנועה, וניצור מרחב בטוח שבו כל אחד מבני המשפחה יכול לבטא את עצמו. מתאים לילדים מגיל 7-8 ומעלה.",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      interestValue: "סדנה למשפחות",
      details: ["משך: 1.5 - 3 שעות", "מינימום 3 משתתפים", "מחיר: 200-350 ₪ למשתתף", "חוויה מגבשת ומאחדת"],
      highlight: false,
      ctaText: "לפרטים והרשמה"
    },
    {
      title: "סדנה לצוותים",
      subtitle: "השראה, הקשבה וצמיחה משותפת",
      description: "חוויה מוזיקלית שמחברת בין אנשים. כל משתתף מקבל כלי, ויחד יוצרים הרמוניה משותפת שמחדדת מיומנויות של קצב, תקשורת והקשבה. הדרך המושלמת לצאת מהשגרה ולהתחבר מחדש.",
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
      interestValue: "סדנה לצוותים",
      details: ["משך: שעה וחצי", "מינימום 5 משתתפים", "מתאים לארגונים וחברות", "מחיר בהתאם לכמות המשתתפים"],
      highlight: false,
      ctaText: "לפרטים והרשמה"
    },
    {
      title: "שיעורים פרטיים",
      subtitle: "ליווי אישי במסע המוזיקלי",
      description: "מסע של גילוי עצמי דרך הצליל. השיעורים מותאמים אישית (מתחילים ומתקדמים) ומשלבים טכניקה, דינמיקה, ופיתוח שפה מוזיקלית אישית. המפגשים מתקיימים בסטודיו שלי בכפר הנגיד.",
      icon: <Music className="w-5 h-5 sm:w-6 sm:h-6" />,
      interestValue: "שיעורים פרטיים",
      details: ["מותאם לכל רמה", "פיתוח טכניקה והקשבה", "יצירה ואלתור", "אווירה תומכת ומקצועית"],
      highlight: false,
      ctaText: "לפרטים והרשמה"
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
           <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Experiences</span>
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">סדנאות והופעות</h2>
           <p className="text-zinc-400 max-w-2xl mx-auto font-light text-xs sm:text-sm px-2">מגוון אפשרויות למפגש עם עולם הפאנטם</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group p-4 sm:p-5 border border-white/5 hover:border-white/20 active:border-white/20 bg-[#080808] transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                 <div className="p-2 bg-white/5 rounded-full text-zinc-300 group-hover:text-white transition-colors">
                    {service.icon}
                 </div>
                 {service.highlight && <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-zinc-400">חדש</span>}
              </div>
              
              <h3 className="text-base sm:text-lg font-light mb-1.5 text-white">{service.title}</h3>
              <p className="text-zinc-500 font-medium mb-3 text-[11px] sm:text-xs">{service.subtitle}</p>
              
              <p className="text-zinc-400 leading-relaxed mb-4 font-light text-xs flex-grow line-clamp-4">
                {service.description}
              </p>
              
              <div className="grid grid-cols-1 gap-y-1.5 border-t border-white/5 pt-3 mb-3">
                {service.details.slice(0, 3).map((detail, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-500">
                    <span className="w-1 h-1 bg-zinc-600 rounded-full flex-shrink-0"></span>
                    {detail}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onOpenContactModal(service.interestValue)}
                className="w-full mt-auto flex items-center justify-center gap-2 text-white text-[11px] tracking-wider border border-white/10 hover:bg-white hover:text-black active:bg-white active:text-black py-2.5 transition-all"
              >
                {service.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const GalleryPage = () => (
  <PageTransition>
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
       <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-3 sm:mb-4">Gallery</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4 tracking-wide">גלריית וידאו</h2>
          <p className="text-zinc-500 font-light text-sm sm:text-base">טעימה מהצלילים והיצירה שלי</p>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="aspect-video bg-zinc-900 relative group overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 active:border-white/20 transition-all rounded-sm">
                <div className="absolute inset-0 flex items-center justify-center z-20">
                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-active:scale-110 group-hover:bg-white/10 transition-all duration-300">
                      <Play size={18} className="fill-white text-white ml-0.5 sm:ml-1" />
                   </div>
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-700 text-xs tracking-widest uppercase">
                   סרטון הדגמה {i}
                </div>
             </div>
          ))}
       </div>
    </div>
  </PageTransition>
);

const RecommendationsPage = () => {
  const testimonials = [
    {
      name: "דולב ג'ורג'",
      text: "אחי, תודה על שיעור מעבר לציפיות! היחס אישי, המקצועיות, מלוא תשומת הלב וההתאמה בין התרגילים לרמת הנגינה הפכו את זה משיעור לחוויה של ממש.",
      initials: "ד״ג"
    },
    {
      name: "טל שריזלי",
      text: "שיעור איתך זה באמת חגיגה ללב, לאוזן ולנשמה. הדרך שאתה מלמד מוזיקה היא פשוט כיפית, קשובה ומקצועית. אתה באמת עושה חשק ללמוד עוד.",
      initials: "ט״ש"
    },
    {
      name: "טליה טוקר",
      text: "נשמה יפה! הסישן האחרון מה זה פתח אותי! ישבתי כמה שעות ברצף ועפתי עם עצמי. הולכת ומשתחררת וזה אושר גדול ותודה ענקית.",
      initials: "ט״ט"
    },
    {
       name: "תלמיד/ה נוספ/ת",
       text: "החוויה קסומה והאווירה שדניאל יוצר פשוט ממכרת. דניאל מורה בחסד עליון שיודע בדיוק איך לגשת ואיך לפתוח את עולם הפאנטם בפני כל אחד.",
       initials: "✦"
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
         {/* Header */}
         <div className="text-center mb-6 sm:mb-8 space-y-2">
             <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Testimonials</span>
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">מה אומרים עליי</h2>
             <p className="text-zinc-500 font-light text-xs sm:text-sm max-w-lg mx-auto">חלק מהמילים היפות שקיבלתי מתלמידים ומשתתפים</p>
         </div>

         {/* Masonry-style grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`group relative overflow-hidden rounded-sm transition-all duration-500 ${
                  i === 0 ? 'md:row-span-2 bg-gradient-to-br from-zinc-900/80 to-[#080808] border border-white/5 hover:border-white/15' :
                  'bg-[#080808] border border-white/5 hover:border-white/15'
                }`}
              >
                {/* Decorative accent */}
                <div className={`absolute top-0 left-0 w-20 h-20 opacity-[0.02] ${
                  i === 0 ? 'w-24 h-24' : ''
                }`}>
                  <Quote className="w-full h-full" />
                </div>
                
                <div className={`relative z-10 p-4 sm:p-6 ${i === 0 ? 'sm:p-7 flex flex-col justify-between h-full' : ''}`}>
                  {/* Quote icon */}
                  <div className={`mb-3 sm:mb-4 ${i === 0 ? 'mb-4 sm:mb-5' : ''}`}>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Quote size={i === 0 ? 16 : 12} className="text-zinc-500" />
                    </div>
                  </div>

                  {/* Quote text */}
                  <p className={`leading-relaxed font-light text-zinc-300 mb-4 sm:mb-5 ${
                    i === 0 
                      ? 'text-base sm:text-lg md:text-xl font-serif italic' 
                      : 'text-sm sm:text-base'
                  }`}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-zinc-400 font-medium flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-white">{t.name}</p>
                    </div>
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
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For phone, only allow digits and limit to 10 characters
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone is exactly 10 digits
    if (formData.phone.length !== 10) {
      alert('מספר הטלפון חייב להכיל 10 ספרות');
      return;
    }
    
    setStatus('sending');

    const whatsappMessage = `*פנייה חדשה מהאתר* 🎵\n\n*שם:* ${formData.name}\n*טלפון:* ${formData.phone}\n*סוג התעניינות:* ${formData.interest}\n\n*הודעה:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/972526464647?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setStatus('sent');

    setFormData({ name: '', phone: '', interest: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24">
          <div>
            <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase block mb-4 sm:mb-6">Contact</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-thin mb-8 sm:mb-12 text-white">
              בואו <span className="font-serif italic text-zinc-400">נדבר.</span>
            </h2>
            
            <div className="space-y-8 sm:space-y-10">
              {/* Quick Contact Icons */}
              <div className="flex items-center gap-4 sm:gap-6">
                <a 
                  href="https://wa.me/972526464647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 sm:p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-500 group min-w-[48px] min-h-[48px] justify-center"
                  aria-label="שלח הודעת WhatsApp"
                >
                  <WhatsAppIcon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="mailto:pantamexperience@gmail.com"
                  className="flex items-center gap-3 p-3.5 sm:p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-500 group min-w-[48px] min-h-[48px] justify-center"
                  aria-label="שלח אימייל"
                >
                  <Mail size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">עקבו אחריי</h3>
                <SocialLinks size={22} />
              </div>
            </div>
          </div>

          <form ref={formRef} className="space-y-6 sm:space-y-8 mt-0 md:mt-0" onSubmit={handleSubmit}>
            <div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="שם מלא" 
                required
                className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors placeholder:text-zinc-700 text-base" 
              />
            </div>
            <div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="טלפון (10 ספרות)" 
                required
                pattern="\d{10}"
                minLength="10"
                maxLength="10"
                className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors placeholder:text-zinc-700 text-base" 
              />
            </div>
            <div>
               <select 
                 name="interest"
                 value={formData.interest}
                 onChange={handleChange}
                 required
                 className="w-full bg-[#050505] border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-zinc-400 font-light transition-colors appearance-none cursor-pointer text-base"
               >
                  <option value="">בחר סוג התעניינות</option>
                  <option value="נגינה באירועים והופעות">נגינה באירועים והופעות</option>
                  <option value="סדנה זוגית">סדנה זוגית</option>
                  <option value="סדנה למשפחות">סדנה למשפחות</option>
                  <option value="סדנה לצוותים">סדנה לצוותים</option>
                  <option value="שיעורים פרטיים">שיעורים פרטיים</option>
                  <option value="אחר">אחר</option>
               </select>
            </div>
            <div>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="ההודעה שלך..." 
                required
                className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-400 outline-none py-3 sm:py-4 text-white font-light transition-colors resize-none placeholder:text-zinc-700 text-base"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={status === 'sending'}
              className={`w-full px-10 sm:px-12 py-4 border border-zinc-700 text-white hover:bg-white hover:text-black active:bg-white active:text-black transition-all duration-500 tracking-widest text-sm uppercase flex items-center justify-center gap-3 min-h-[48px] ${
                status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
              } ${status === 'sent' ? 'border-green-500/50 text-green-400' : ''}`}
            >
              {status === 'idle' && (
                <>
                  <Send size={16} />
                  שלח הודעה
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  שולח...
                </>
              )}
              {status === 'sent' && (
                <>
                  <CheckCircle size={16} />
                  נשלח בהצלחה!
                </>
              )}
              {status === 'error' && (
                <>
                  <X size={16} />
                  שגיאה, נסה שנית
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

// --- Main App ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalInterest, setContactModalInterest] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle music (unmute/mute video audio)
  const toggleMusic = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMusicPlaying) {
      video.muted = true;
      setIsMusicPlaying(false);
    } else {
      video.muted = false;
      setIsMusicPlaying(true);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Mute video when leaving home page
  useEffect(() => {
    if (activePage !== 'home' && isMusicPlaying) {
      const video = videoRef.current;
      if (video) {
        video.muted = true;
        setIsMusicPlaying(false);
      }
    }
  }, [activePage, isMusicPlaying]);

  const navigateTo = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactModal = (interest = '') => {
    setContactModalInterest(interest);
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setContactModalInterest('');
  };

  const menuItems = [
    { id: 'home', label: 'ראשי' },
    { id: 'about', label: 'אודות' },
    { id: 'services', label: 'סדנאות והופעות' },
    { id: 'gallery', label: 'וידאו' },
    { id: 'recommendations', label: 'המלצות' },
    { id: 'contact', label: 'צור קשר' }
  ];

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage isMusicPlaying={isMusicPlaying} videoRef={videoRef} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage onOpenContactModal={openContactModal} />;
      case 'gallery': return <GalleryPage />;
      case 'recommendations': return <RecommendationsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage isMusicPlaying={isMusicPlaying} videoRef={videoRef} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-white/20 overflow-x-hidden" dir="rtl">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 safe-top ${scrolled || activePage !== 'home' ? 'bg-[#050505]/95 backdrop-blur-sm py-2.5 sm:py-3 border-b border-white/5' : 'bg-transparent py-3 sm:py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="cursor-pointer opacity-90 hover:opacity-100 active:opacity-100 transition-opacity" onClick={() => navigateTo('home')}>
             <Logo />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 xl:gap-10 text-xs font-light tracking-[0.15em] uppercase text-zinc-400">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id)}
                className={`hover:text-white transition-colors relative group ${activePage === item.id ? 'text-white' : ''}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 right-0 h-[1px] bg-white transition-all duration-300 ${activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          {/* Social Icons (desktop only) */}
          <div className="hidden lg:block">
            <SocialLinks size={18} />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="תפריט"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-[100dvh] bg-[#050505] z-40 flex flex-col items-center justify-center gap-7 sm:gap-10 text-xl sm:text-2xl font-light tracking-widest animate-fade-in safe-top safe-bottom">
            <button 
              className="absolute top-4 left-4 text-white min-w-[44px] min-h-[44px] flex items-center justify-center" 
              onClick={() => setIsMenuOpen(false)}
              aria-label="סגור תפריט"
            >
              <X size={28} />
            </button>
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id)} 
                className={`active:text-zinc-500 transition-colors min-h-[44px] flex items-center ${activePage === item.id ? 'text-white underline underline-offset-8 decoration-1' : 'text-zinc-400'}`}
              >
                {item.label}
              </button>
            ))}
            {/* Social links in mobile menu */}
            <div className="pt-4 sm:pt-8">
              <SocialLinks size={22} />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* Minimal Footer */}
      {activePage !== 'home' && (
        <footer className="py-6 sm:py-8 bg-black border-t border-white/5 safe-bottom">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-xs tracking-widest">
              &copy; {new Date().getFullYear()} SHAAYA. ALL RIGHTS RESERVED.
            </p>
            <SocialLinks size={16} className="opacity-50 hover:opacity-100 transition-opacity" />
            <div className="opacity-30 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigateTo('home')}>
               <Logo className="h-6 sm:h-8" />
            </div>
          </div>
        </footer>
      )}

      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 backdrop-blur-md border text-white p-3.5 sm:p-4 rounded-full transition-all duration-500 group min-w-[48px] min-h-[48px] flex items-center justify-center ${
          isMusicPlaying 
            ? 'bg-white/10 border-white/20 hover:bg-white/15' 
            : 'bg-white/5 border-white/10 hover:bg-white hover:text-black'
        }`}
        aria-label={isMusicPlaying ? 'השתק מוזיקה' : 'הפעל מוזיקה'}
      >
        {isMusicPlaying ? (
          <Volume2 size={22} className="group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={22} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Contact Modal (for service cards) */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={closeContactModal} 
        preselectedInterest={contactModalInterest} 
      />
    </div>
  );
};

export default App;
