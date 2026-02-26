import { Jura, Rubik_Marker_Hatch } from 'next/font/google';

export const jura = Jura({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jura',
  display: 'swap',
});

export const rubikMarkerHatch = Rubik_Marker_Hatch({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-rubik-marker-hatch',
  display: 'swap',
});