import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the user agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Get the path
  const { pathname } = request.nextUrl;
  
  // If it's a mobile device and they are visiting the main site (not already in /app)
  // and not requesting static files, API routes, or the web app itself
  if (
    isMobile && 
    !pathname.startsWith('/pwa') && 
    !pathname.startsWith('/app') && 
    !pathname.startsWith('/_next') && 
    !pathname.startsWith('/api') &&
    !pathname.match(/\.(.*)$/) // Don't redirect file requests (like .png, .ico)
  ) {
    // Redirect to the web app
    const appUrl = new URL('/pwa', request.url);
    return NextResponse.redirect(appUrl);
  }
  
  return NextResponse.next();
}

// Only run middleware on paths that could be pages
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
