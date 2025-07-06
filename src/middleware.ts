import type { NextRequest } from "next/server";
// import linguiConfig from "../lingui.config";

// const { locales } = linguiConfig;

export function middleware(request: NextRequest) {
  return;
  // const { pathname } = request.nextUrl;
  // const pathnameHasLocale = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  // );

  // if (pathnameHasLocale) {
  //   return;
  // }

  // const locale = getRequestLocale(request.headers);
  // request.nextUrl.pathname = `/${locale}${pathname}`;
  // return NextResponse.redirect(request.nextUrl);
}

// function getRequestLocale(requestHeaders: Headers) {
//   const langHeader = requestHeaders.get("accept-language") || undefined;
//   const languages = new Negotiator({
//     headers: { "accept-language": langHeader },
//   }).languages(locales.slice());
//   const activeLocale = languages[0] || locales[0] || "en";
//   return activeLocale;
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
