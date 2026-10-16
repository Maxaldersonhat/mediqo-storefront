'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { count } = useCart();

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-[#0F3D3E] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] sm:px-6 sm:text-xs">

          {/* Location */}
          <div className="flex min-w-0 items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M256 48c-79.5 0-144 64.5-144 144 0 96 144 272 144 272s144-176 144-272c0-79.5-64.5-144-144-144z" />
              <circle cx="256" cy="192" r="48" />
            </svg>

            <span className="truncate">
              Biashara Street, Zana Exhibition, 1st Floor, Shop M2, Nairobi
              <span className="hidden sm:inline"> · Opposite KCB Bank</span>
            </span>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/254700119111"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 font-medium transition-opacity hover:opacity-80"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.49 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.95L.05 24l6.3-1.65a11.87 11.87 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.43-8.42zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.52-5.27C2.15 6.45 6.59 2 12.05 2c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.91 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
            </svg>

            <span>0700 119 111</span>
          </a>

        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/mediqo-logo.png"
              alt="MediQo Solutions"
              className="h-10 w-10 object-contain"
            />

            <span>
              <span className="block text-sm font-bold leading-tight text-gray-900">
                MediQo Solutions
              </span>

              <span className="block text-[11px] leading-tight text-gray-500">
                Everyday care, delivered
              </span>
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-lg border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-50"
            aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="176" cy="416" r="16" />
              <circle cx="400" cy="416" r="16" />
              <path d="M48 80h48l48 256h224l48-192H112" />
            </svg>

            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5A524] text-[10px] font-bold text-[#0F3D3E]">
                {count}
              </span>
            )}
          </Link>

        </div>
      </header>
    </>
  );
}
