import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ["en", "ru", "kz"];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ru','en','kz'],
 
  // Used when no locale matches
  defaultLocale: 'ru'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);