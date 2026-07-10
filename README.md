# Your Profile

A single-page personal profile site — a LinkedIn-style page you fully control, with an animated
line-marker sidebar for navigation (React Bits' `LineSidebar`, adapted with scroll-spy so it
tracks the section you're viewing).

## Structure

```
src/
  App.jsx                     layout, scroll-spy, section order
  App.css                     all page styling / design tokens
  index.css                   global reset + fonts
  components/
    LineSidebar.jsx / .css    the left nav
    Section.jsx                shared section wrapper (dotted divider, numbering, "Add" button)
    sections/
      Hero.jsx                 name, headline, bio — edit the PROFILE object at the top
      Experience.jsx            edit the JOBS array
      Education.jsx              edit the SCHOOLS array
      Events.jsx                  edit the EVENTS array
      Certificates.jsx             edit the CERTS array
      Media.jsx                     photo grid placeholders
      Footer.jsx                     Share profile / Contact me buttons (not yet wired up)
```

Each section's content lives in a plain array or object at the top of its file — edit those
directly, no CMS needed.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel via GitHub

1. Push this project to a new GitHub repository.
2. In Vercel, click **Add New → Project** and import that repo.
3. Vercel auto-detects Vite — framework preset "Vite", build command `npm run build`,
   output directory `dist`. Leave the defaults and click **Deploy**.
4. Every push to your main branch will redeploy automatically.

## Not finished yet

The **Share profile** and **Contact me** buttons at the bottom are in place but not wired up
(see the `TODO` in `Footer.jsx`) — ready for you to hook up to a share sheet / mailto or contact
form once you're ready.
