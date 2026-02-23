import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Language = "hy" | "en";

const i18n = {
  hy: {
    coupleNames: "Արթուր և Լիաննա",
    invitationTagline: "Դուք հրավիրված եք",
    introMessage: "Սիրով հրավիրում ենք Ձեզ մեր հարսանյաց տոնին՝ մեր գեղեցիկ օրվա վայելքին",
    invitationSubtitle: "Երկու սիրտ մեկ ամբողջություն",
    programTitle: "Օրվա ծրագիրը",
    videoFallbackText: "Ձեր դիտարկիչը չի աջակցում տեսանյութի նվագարկմանը։",
    coupleMessageTitle: "Ուղերձ զույգից",
    coupleMessageText:
      "Արթուր և Լիաննա երկու սրտեր միավորվեցին մի հիասքանչ սիրով✨\n",
    coupleMessageSignature: "Սիրով՝ Արթուր և Լիաննա",
    topPhotoAlt: "Հարսանեկան գլխավոր լուսանկար",
    memoryPhotoAlt: "Հարսանեկան հիշողության լուսանկար",
    mapButton: "Բացել Google Maps-ում",
    locationAltChurch: "Եկեղեցի հարսանեկան արարողության համար",
    locationAltRestaurant: "Ռեստորան հարսանեկան տոնակատարության համար",
    churchLocationNote:
      "Մեր ծնողների օրհնությամբ, Աստծո կամքով՝ մենք դառնում ենք գեղեցիկ ընտանիք։",
    locations: [
      { title: "Եկեղեցի" },
      { title: "Հարսանյաց սրահ " },
    ],
    programItems: [
      { title: "Եկեղեցի", time: "15:00", align: "right", icon: "church" },
      { title: "Հարսանյաց սրահ", time: "17:00", align: "left", icon: "restaurant" },
    ],
  },
  en: {
    coupleNames: "Artur & Lianna",
    invitationTagline: "You are invited",
    introMessage: "With love, we invite you to our wedding celebration to enjoy the beauty of our special day",
    invitationSubtitle: "Two hearts, one whole",
    programTitle: "Program Of The Day",
    videoFallbackText: "Your browser does not support video playback.",
    coupleMessageTitle: "A Message From Us",
    coupleMessageText:
      "Artur and Lianna, two hearts united in beautiful love ✨\n",
    coupleMessageSignature: "With love, Artur & Lianna",
    topPhotoAlt: "Main wedding photo",
    memoryPhotoAlt: "Wedding memory photo",
    mapButton: "Open in Google Maps",
    locationAltRestaurant: "Wedding hall for the celebration",
    locationAltChurch: "Church for the wedding ceremony",
    churchLocationNote:
      "With our parents' blessing and by God's will, we are becoming a beautiful family.",
    locations: [
       { title: "Ceremony Church" },
      { title: "Wedding Hall" },
    ],
    programItems: [
      { title: "Church", time: "15:00", align: "right", icon: "church" },
      { title: "Wedding Hall", time: "17:00", align: "left", icon: "restaurant" },
    ],
  },
} as const;

const languageOptions = {
  hy: {
    iconUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Armenia.svg",
    label: "Armenian",
  },
  en: {
    iconUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_United_Kingdom%20%281-2%29.svg",
    label: "English",
  },
} as const;

const locationMedia = [
  {
    image: "/assets/locations/church.jpg",
    mapUrl: "https://maps.app.goo.gl/E8MxByJSJTqZuGmj7",
  },
  {
    image: "/assets/locations/restaurant.jpg",
    mapUrl: "https://maps.app.goo.gl/X422BEJA8RmTjCHi6",
  },
] as const;

const playerVideoSrc = "/assets/pair/bride.mp4";

function ProgramIcon({ kind }: { kind: "spark" | "restaurant" | "cocktail" | "church" | "moon" }) {
  if (kind === "spark") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M12 3.5L13.9 8.1L18.5 10L13.9 11.9L12 16.5L10.1 11.9L5.5 10L10.1 8.1L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "restaurant") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M7 4V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 4V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.5 12V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15 4C16.9 6 16.9 10 15 12V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "cocktail") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M5.5 6H18.5L12 13L5.5 6Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 13V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9.5 19H14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15.2 4.8L17.2 2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "church") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M12 3V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 5H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M6 20V11L12 7L18 11V20M10 20V15H14V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M16.5 6.5C16.5 9 14.5 11 12 11C9.5 11 7.5 13 7.5 15.5C7.5 18 9.5 20 12 20C16 20 19.5 16.5 19.5 12.5C19.5 9.6 18.3 7 16.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Welcome() {
  const [language, setLanguage] = useState<Language>("hy");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const activeLanguage = i18n[language];
  const otherLanguage: Language = language === "hy" ? "en" : "hy";

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    let sound: any = null;
    let onScroll: (() => void) | null = null;
    let played = false;
    let cancelled = false;

    import("howler")
      .then(({ Howl }) => {
        if (cancelled) return;

        // primary source is wedding-song.mp3; fallback to bride.mp4 if load fails
        sound = new Howl({
          src: ["/assets/wedding-song.mp3"],
          html5: true,
          preload: true,
          volume: 0.9,
          onloaderror: () => {
            // unload failed sound and try fallback
            try {
              sound && sound.unload && sound.unload();
            } catch (e) {}
            sound = new Howl({
              src: ["/assets/wedding-song.mp3"],
              html5: true,
              preload: true,
              volume: 0.9,
            });
          },
        });

        onScroll = () => {
          if (window.scrollY >= 1 && !played) {
            played = true;
            try {
              sound && sound.play && sound.play();
            } catch (e) {
              // play may be blocked by autoplay policies
            }
            if (onScroll) window.removeEventListener("scroll", onScroll);
          }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        if (window.scrollY >= 1) onScroll();
      })
      .catch(() => {
        // ignore
      });

    return () => {
      cancelled = true;
      if (onScroll) window.removeEventListener("scroll", onScroll);
      try {
        sound && sound.unload && sound.unload();
      } catch (e) {}
    };
  }, []);

  return (
    <main className={`invitation-page ${language === "hy" ? "lang-hy" : "lang-en"}`}>
      <div className="language-switcher" ref={languageMenuRef}>
        <button
          type="button"
          className="flag-button"
          aria-expanded={isLangMenuOpen}
          aria-label={`Selected language: ${languageOptions[language].label}`}
          onClick={() => setIsLangMenuOpen((prev) => !prev)}
        >
          <img
            src={languageOptions[language].iconUrl}
            alt={languageOptions[language].label}
            className="flag-image"
          />
        </button>
        {isLangMenuOpen && (
          <button
            type="button"
            className="flag-button flag-button-option"
            onClick={() => {
              setLanguage(otherLanguage);
              setIsLangMenuOpen(false);
            }}
            aria-label={`Switch to ${languageOptions[otherLanguage].label}`}
          >
            <img
              src={languageOptions[otherLanguage].iconUrl}
              alt={languageOptions[otherLanguage].label}
              className="flag-image"
            />
          </button>
        )}
      </div>

      <motion.section
        className="invitation-stage"
        aria-label="Wedding Invitation"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.div
          className="invitation-reveal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <div className="top-logo-slot" aria-hidden="true">
            <motion.img
              src="/logo.png"
              alt="Wedding logo"
              className="top-logo-image"
              initial={{ opacity: 0, width: 0, height: 0 }}
              animate={{ opacity: 1, width: 200, height: 200 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            />
          </div>
          <h1
            className={`invitation-title ${language === "en"
              ? "invitation-title-en"
              : "invitation-title-hy"
              }`}
          >
            {activeLanguage.coupleNames}
          </h1>
          <h2 className="invitation-date invitation-date-en">
            11.04.2026
          </h2>

          <h3 className={`invitation-intro-message ${language === "en"
              ? "invitation-message-en"
              : "invitation-message-hy"
              }`}
          >
            {activeLanguage.introMessage}
          </h3>

          <div className="hero-photo-wrap hero-photo-wrap-first" aria-label="Wedding preview image">
            <div className="hero-photo-sketch" aria-hidden="true" />
            <img
              src="/assets/pair/pair_1.jpg"
              alt={activeLanguage.topPhotoAlt}
              className="hero-photo-image"
            />
          </div>
          <p className="invitation-subtitle">{activeLanguage.invitationSubtitle}</p>
        </motion.div>
      </motion.section>

      <motion.section
        className="locations-section"
        aria-label="Event locations"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="locations-grid">
          {locationMedia.map((location, index) => (
            <motion.article
              key={location.image}
              className="location-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <img
                src={location.image}
                alt={
                  index === 0
                    ? activeLanguage.locationAltChurch
                    : activeLanguage.locationAltRestaurant
                }
                className="location-image"
              />
              <div className="location-content">
                <h3 className="location-name">{activeLanguage.locations[index].title}</h3>
                {index === 0 && (
                  <p className="location-note">{activeLanguage.churchLocationNote}</p>
                )} 
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="location-map-button"
                >
                  {activeLanguage.mapButton}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mid-photo-section"
        aria-label="Wedding memory preview"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="hero-photo-wrap" aria-label="Wedding preview image">
          <div className="hero-photo-sketch" aria-hidden="true" />
          <img
            src="/assets/pair/pair_2.jpg"
            alt={activeLanguage.memoryPhotoAlt}
            className="hero-photo-image"
          />
        </div>
      </motion.section>

      <motion.section
        className="program-section"
        aria-label="Program of the day"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="program-title">{activeLanguage.programTitle}</h2>
        <div className="program-track" aria-hidden="true" />
        <div className="program-list">
          {activeLanguage.programItems.map((item, index) => (
            <motion.article
              key={`${item.title}-${item.time}`}
              className={`program-item program-item-${item.align}`}
              initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="program-name-row">
                <span className="program-icon" aria-hidden="true">
                  <ProgramIcon kind={item.icon} />
                </span>
                <h3 className="program-name">{item.title}</h3>
              </div>
              <p className="program-time">{item.time}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="video-section"
        aria-label="Wedding video player"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="video-player-shell">
          <video
            className="video-player"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src={playerVideoSrc} type="video/mp4" />
            {activeLanguage.videoFallbackText}
          </video>
        </div>
      </motion.section>

      <motion.section
        className={`couple-message-section ${language === "en" ? "couple-message-en" : "couple-message-hy"
          }`}
        aria-label="Message from the wedding pair"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="couple-message-kicker">{activeLanguage.coupleMessageTitle}</p>
        <blockquote className="couple-message-text">
          {activeLanguage.coupleMessageText}
        </blockquote>
        <p className="couple-message-signature">{activeLanguage.coupleMessageSignature}</p>
      </motion.section>
    </main>
  );
}
