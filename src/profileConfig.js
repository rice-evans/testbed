// Central place for your profile's headline info + media.
// bannerUrl / photoUrl point at /public — kept there (not imported/hashed like the gallery
// photos) specifically so index.html can preload the banner by a known, stable filename. That
// preload is what lets the browser start fetching it before React even mounts.
export const PROFILE = {
  name: 'Rhys Putra Evans',
  headline: 'Old Marlburian - Incoming iATPL Student @ 43 Air School - Aspiring Commercial Pilot',
  location: 'Bali, Indonesia – Singapore',
  bio: 'I recently completed the International Baccalaureate Diploma Programme at Marlborough College Malaysia and will begin SACAA integrated ATPL (iATPL) training at 43 Air School in November 2026. I have a strong passion for aviation and am committed to building a career as a commercial pilot, hopefully on corporate aircraft. I am particularly interested in airline operations, aviation safety, and the broader aviation industry, and I look forward to developing my knowledge and skills throughout my flight training journey.',
  openTo: 'Open to opportunities',
  bannerUrl: '/Banner.webp',
  photoUrl: '/Profile.webp'
};
