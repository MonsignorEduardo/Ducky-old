import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    console.log('Middleware working');
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.SECURE_TOKEN === 'true',
    });
    console.log('🚀 ~ file: middleware.ts ~ line 10 ~ middleware ~ token', token);

    if (!token) {
        // If the user is not authenticated, redirects to the login page https://nextjs.org/docs/api-reference/next/server#static-methods
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Example of a "matcher" that filters where the middleware should be applied
// https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
    matcher: ['/commands', '/birthdays'],
};
