import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token')?.value;

    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/login') && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/login'], // Add paths to match
};
