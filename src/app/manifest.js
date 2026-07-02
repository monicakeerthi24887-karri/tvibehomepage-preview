export default function manifest() {
  return {
    name: 'TVIBE Festival',
    short_name: 'TVIBE',
    description: 'Toronto\'s ultimate multicultural music & culture festival.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fcfcfc',
    theme_color: '#fcfcfc',
    orientation: 'portrait-primary',
    icons: [
      {
        src: 'https://tvibe.ca/wp-content/uploads/2026/05/TVIBE-BLACK-LOGO-1.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable any',
      },
    ],
  };
}
