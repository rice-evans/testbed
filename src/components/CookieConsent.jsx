import { useState, useEffect } from 'react';

const STORAGE_KEY = 'analytics-consent-acknowledged';
const FADE_MS = 350; // must match the CSS transition duration in .cookie-consent--closing

// First-visit-only disclaimer bar for Cloudflare Analytics. Uses localStorage
// so it only ever shows once per browser, not on every page load.
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch (err) {
      // localStorage can throw in some private-browsing contexts — fail safe
      // by still showing the notice rather than crashing.
      setVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (err) {
      // Nothing we can do if storage is unavailable — just dismiss for this session.
    }
    // Trigger the fade/slide-out transition, then unmount once it's finished
    // rather than snapping the bar away instantly.
    setClosing(true);
    setTimeout(() => setVisible(false), FADE_MS);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-consent${closing ? ' cookie-consent--closing' : ''}`} role="status">
      <p className="cookie-consent__text">
        This website uses Cloudflare Analytics to collect anonymous usage data that helps me
        improve site performance and functionality. No personal, sensitive, or identifiable
        information is collected or accessible to me. To find out more, a full privacy policy
        can be found at the bottom of this page.
      </p>
      <button type="button" className="cookie-consent__btn" onClick={handleAcknowledge}>
        Acknowledge
      </button>
    </div>
  );
};

export default CookieConsent;
