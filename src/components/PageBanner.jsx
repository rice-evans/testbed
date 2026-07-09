import { PROFILE } from '../profileConfig.js';

// The banner sits behind both the sidebar and the top of the main column. Over the sidebar it's
// covered by a soft fade (see .layout__sidebar::before in App.css) so the two blend into each
// other instead of meeting at a hard edge. Drawn in the same hairline language as the sidebar
// and section dividers, so it reads as one consistent signature rather than a stock photo.
const LineArt = () => (
  <svg viewBox="0 0 1200 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="0" y="0" width="1200" height="280" fill="var(--accent-soft)" />
    <path
      d="M0 210 L140 150 L230 190 L340 90 L430 170 L520 120 L610 200 L700 110 L800 175 L900 130 L1000 195 L1100 140 L1200 185"
      fill="none"
      stroke="var(--line)"
      strokeWidth="1.5"
    />
    <path
      d="M0 240 L120 195 L220 225 L320 150 L420 215 L540 165 L640 230 L760 155 L860 220 L980 170 L1090 225 L1200 190"
      fill="none"
      stroke="var(--ink-faint)"
      strokeWidth="1.5"
      opacity="0.55"
    />
    <path
      d="M0 265 L150 230 L260 255 L380 195 L480 245 L600 205 L710 260 L830 200 L940 250 L1060 215 L1200 250"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.75"
    />
    <line x1="0" y1="279" x2="1200" y2="279" stroke="var(--line)" strokeWidth="1" strokeDasharray="1 5" />
  </svg>
);

const PageBanner = () => (
  <div className="page-banner">{PROFILE.bannerUrl ? <img src={PROFILE.bannerUrl} alt="" /> : <LineArt />}</div>
);

export default PageBanner;
