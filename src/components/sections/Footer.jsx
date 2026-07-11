import { useState, useEffect } from 'react';
import { Share2, Mail, X, Link as LinkIcon, Instagram, FileDown } from 'lucide-react';

const Footer = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [contactCopied, setContactCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState('https://rhysprofile.com');
  
  const contactEmail = 'rhys.p.evans@gmail.com';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfileUrl(window.location.href);
    }
  }, []);

  // Prevent background scrolling when either modal overlay window is open
  useEffect(() => {
    if (isShareOpen || isContactOpen || isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isShareOpen, isContactOpen, isPrivacyOpen]);

  const handleShareCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleContactCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setContactCopied(true);
      setTimeout(() => setContactCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const shareGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=Check out this profile&body=Here is the profile link: ${encodeURIComponent(profileUrl)}`;
  const shareWhatsappUrl = `https://api.whatsapp.com/send?text=Check out this profile: ${encodeURIComponent(profileUrl)}`;

  // Direct target endpoints for contact interactions
  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`;
  const instagramUrl = `https://www.instagram.com/rice_evans_/`;
  const contactWhatsappUrl = `https://wa.me/60123716139`;

  return (
    <footer className="footer">
      <div className="footer__actions">
        <button type="button" className="footer__btn footer__btn--primary" onClick={() => setIsShareOpen(true)}>
          <Share2 size={16} strokeWidth={1.8} />
          Share profile
        </button>
        <button type="button" className="footer__btn footer__btn--ghost" onClick={() => setIsContactOpen(true)}>
          <Mail size={16} strokeWidth={1.8} />
          Contact me
        </button>
        <a
          href="/attachments/Rhys-Evans-CV.pdf"
          download="Rhys-Evans-CV.pdf"
          className="footer__btn footer__btn--icon"
          aria-label="Download CV as PDF"
          title="Download CV (PDF)"
        >
          <FileDown size={18} strokeWidth={1.8} />
        </a>
      </div>

      <div className="footer__copyright">
        <button
          type="button"
          className="footer__privacy-link"
          onClick={() => setIsPrivacyOpen(true)}
        >
          Privacy Policy
        </button>
        <span className="footer__copyright-divider">·</span>
        Rhys Putra Evans, 2026
      </div>

      {/* ---------- SHARE PROFILE MODAL OVERLAY ---------- */}
      {isShareOpen && (
        <div className="share-overlay" onClick={() => setIsShareOpen(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <button className="share-modal__close" onClick={() => setIsShareOpen(false)} aria-label="Close Share Modal">
              <X size={18} strokeWidth={2.5} />
            </button>
            <h3 className="share-modal__title">Share Profile</h3>
            <div className={`share-modal__link-box ${shareCopied ? 'share-modal__link-box--copied' : ''}`} onClick={handleShareCopy}>
              <span className="share-modal__url">{profileUrl}</span>
              {shareCopied && <span className="share-modal__tooltip">Copied!</span>}
            </div>
            <p className="share-modal__label">Share this link via</p>
            <div className="share-modal__apps">
              <a href={shareGmailUrl} target="_blank" rel="noopener noreferrer" className="share-modal__app-btn share-modal__app-btn--gmail" title="Share via Gmail">
                <Mail size={20} />
              </a>
              <a href={shareWhatsappUrl} target="_blank" rel="noopener noreferrer" className="share-modal__app-btn share-modal__app-btn--whatsapp" title="Share via WhatsApp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <button type="button" onClick={handleShareCopy} className="share-modal__app-btn share-modal__app-btn--link" title="Copy link to clipboard">
                <LinkIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- CONTACT ME MODAL OVERLAY ---------- */}
      {isContactOpen && (
        <div className="share-overlay" onClick={() => setIsContactOpen(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <button className="share-modal__close" onClick={() => setIsContactOpen(false)} aria-label="Close Contact Modal">
              <X size={18} strokeWidth={2.5} />
            </button>
            <h3 className="share-modal__title">Contact Me</h3>
            
            {/* Centered Modifier class added here */}
            <div className={`share-modal__link-box share-modal__link-box--centered ${contactCopied ? 'share-modal__link-box--copied' : ''}`} onClick={handleContactCopy}>
              <span className="share-modal__url">{contactEmail}</span>
              {contactCopied && <span className="share-modal__tooltip">Copied!</span>}
            </div>

            <p className="share-modal__label">Contact me via</p>
            <div className="share-modal__apps">
              <a href={directGmailUrl} target="_blank" rel="noopener noreferrer" className="share-modal__app-btn share-modal__app-btn--gmail" title="Email via Gmail">
                <Mail size={20} />
              </a>
              
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="share-modal__app-btn share-modal__app-btn--instagram" title="Visit Instagram">
                <Instagram size={20} />
              </a>
              
              <a href={contactWhatsappUrl} target="_blank" rel="noopener noreferrer" className="share-modal__app-btn share-modal__app-btn--whatsapp" title="Chat via WhatsApp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ---------- PRIVACY POLICY MODAL OVERLAY ---------- */}
      {isPrivacyOpen && (
        <div className="privacy-overlay" onClick={() => setIsPrivacyOpen(false)}>
          <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="privacy-modal__close"
              onClick={() => setIsPrivacyOpen(false)}
              aria-label="Close Privacy Policy"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
            <h3 className="privacy-modal__title">Privacy Policy</h3>
            <div className="privacy-modal__body">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                Last updated: July 2026
              </p>
              <p>
                This Privacy Policy explains how I use analytics on this website and what
                information is collected when you visit. I have designed this website with
                privacy in mind, and only limited, anonymous usage data is collected to help
                improve performance and user experience.
              </p>

              <h4>Information I Collect</h4>
              <p>
                This website uses Cloudflare Analytics to collect anonymous, aggregated usage
                information. This may include general information such as page views, referring
                websites, browser type, operating system, device type, and approximate location
                at a country or regional level.
              </p>
              <p>
                Cloudflare Analytics does not use cookies, fingerprinting, or other invasive
                tracking methods to identify visitors.
              </p>

              <h4>How I Use It</h4>
              <p>
                The information collected is used only in aggregate to understand how visitors
                interact with the website, monitor performance, and improve functionality.
              </p>
              <p>
                Analytics data is not sold, rented, or used for advertising purposes, and I do
                not share this information with third parties.
              </p>

              <h4>What I Don't Collect</h4>
              <p>
                I do not collect, store, or have access to any personal, sensitive, or
                identifiable information.
              </p>
              <p>
                I cannot identify individual visitors, track specific people, or access
                information that would reveal who has visited the site. Any analytics information
                available to me is anonymous and intended only for understanding general website
                usage.
              </p>

              <h4>Contact</h4>
              <p>
                If you have any questions about this Privacy Policy or the use of analytics on
                this website, please contact me: Email: rhys.p.evans@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
