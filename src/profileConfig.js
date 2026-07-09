// Central place for your profile's headline info + media.
// bannerUrl / photoUrl point at /public — kept there (not imported/hashed like the gallery
// photos) specifically so index.html can preload the banner by a known, stable filename. That
// preload is what lets the browser start fetching it before React even mounts.
export const PROFILE = {
  name: 'Your Name',
  headline: 'What you do, in one clear line — e.g. Product Designer at Company',
  location: 'City, Country',
  bio: 'A short paragraph about who you are, what you focus on, and what you\u2019re looking for. Two to three sentences is plenty — this is the first thing people read.',
  openTo: 'Open to opportunities',
  bannerUrl: '/Banner.webp',
  photoUrl: '/Profile.webp'
};
