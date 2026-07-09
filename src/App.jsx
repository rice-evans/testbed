import { useEffect, useRef, useState, useCallback } from 'react';
import LineSidebar from './components/LineSidebar.jsx';
import PageBanner from './components/PageBanner.jsx';
import Section from './components/Section.jsx';
import Hero from './components/sections/Hero.jsx';
import Experience from './components/sections/Experience.jsx';
import Education from './components/sections/Education.jsx';
import Events from './components/sections/Events.jsx';
import Certificates from './components/sections/Certificates.jsx';
import Media from './components/sections/Media.jsx';
import Footer from './components/sections/Footer.jsx';
import './App.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'events', label: 'Events' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'media', label: 'Media' }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef({});
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef(null);

  const registerSection = useCallback((id, el) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  const handleNavClick = (index, label) => {
    const id = NAV_ITEMS[index].id;
    const el = sectionRefs.current[id];
    if (!el) return;
    isClickScrolling.current = true;
    setActiveIndex(index);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (isClickScrolling.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = NAV_ITEMS.findIndex(item => item.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <PageBanner />

      <div className="layout">
        <aside className="layout__sidebar">
          <div className="layout__sidebar-inner">
            <LineSidebar
              items={NAV_ITEMS.map(i => i.label)}
              activeIndex={activeIndex}
              onItemClick={handleNavClick}
              accentColor="#0A66C2"
              textColor="#56626d"
              markerColor="#c9cdd1"
              proximityRadius={90}
              maxShift={10}
              markerLength={36}
              itemGap={24}
              fontSize={0.95}
              smoothing={130}
              falloff="smooth"
            />
          </div>
        </aside>

        <main className="layout__content">
          <Section id="overview" register={registerSection} noEyebrow variant="hero">
            <Hero />
          </Section>

          <Section id="experience" index="01" eyebrow="Experience" title="Where I've worked" register={registerSection}>
            <Experience />
          </Section>

          <Section id="education" index="02" eyebrow="Education" title="Where I studied" register={registerSection}>
            <Education />
          </Section>

          <Section id="events" index="03" eyebrow="Events" title="Talks & appearances" register={registerSection}>
            <Events />
          </Section>

          <Section id="certificates" index="04" eyebrow="Certificates" title="Credentials" register={registerSection}>
            <Certificates />
          </Section>

          <Section id="media" index="05" eyebrow="Media" title="Photos & documents" register={registerSection}>
            <Media />
          </Section>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
