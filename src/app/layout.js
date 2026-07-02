import Script from "next/script";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BokehBackground from "@/components/BokehBackground";

export const metadata = {
  title: {
    default: "TVIBE - Multicultural Music & Culture Festival",
    template: "%s | TVIBE Festival",
  },
  description: "2 days of music, food, shopping, creators, culture, and unforgettable vibes for the whole family in Toronto.",
  metadataBase: new URL("https://tvibe.ca"),
  openGraph: {
    title: "TVIBE - Multicultural Music & Culture Festival",
    description: "2 days of music, food, shopping, creators, culture, and unforgettable vibes for the whole family in Toronto.",
    url: "https://tvibe.ca",
    siteName: "TVIBE",
    images: [
      {
        url: "https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png",
        width: 1200,
        height: 630,
        alt: "TVIBE Festival",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TVIBE - Multicultural Music & Culture Festival",
    description: "2 days of music, food, shopping, creators, culture, and unforgettable vibes for the whole family in Toronto.",
    images: ["https://tvibe.ca/wp-content/uploads/2026/05/HOME-PAGE-MAIN-HERO.png"],
  },
  appleWebApp: {
    capable: true,
    title: "TVIBE",
    statusBarStyle: "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fcfcfc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1406967821089230');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-transparent text-[#1a1a1a] font-satoshi font-normal pb-20 md:pb-0 relative">
        <BokehBackground />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1406967821089230&ev=PageView&noscript=1" 
            alt="" 
          />
        </noscript>
        {children}
        <AudioPlayer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
