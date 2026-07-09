import { PROFILE } from '../../profileConfig.js';

const Hero = () => {
  const initials = PROFILE.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="hero">
      <div className="hero__photo">
        {PROFILE.photoUrl ? <img src={PROFILE.photoUrl} alt={PROFILE.name} /> : <span>{initials}</span>}
      </div>

      <div className="hero__text">
        <h1 className="hero__name">{PROFILE.name}</h1>
        <p className="hero__headline">{PROFILE.headline}</p>

        <div className="hero__meta">
          <span className="hero__meta-item">{PROFILE.location}</span>
          <span className="hero__meta-dot" aria-hidden="true">
            •
          </span>
          <span className="hero__meta-item hero__meta-item--badge">{PROFILE.openTo}</span>
        </div>

        <p className="hero__bio">{PROFILE.bio}</p>
      </div>
    </div>
  );
};

export default Hero;
