/** Variantes del logo institucional. */
export type VarianteLogo = 'horizontal' | 'vertical' | 'escudo' | 'isotipo';

/** Versión cromática del logo. */
export type TemaLogo = 'color' | 'blanco';

/** Tamaño relativo del logo. */
export type TamanoLogo = 'sm' | 'md' | 'lg';

/** Archivos empaquetados en `assets/branding`. */
export const ARCHIVOS_LOGO: Readonly<Record<VarianteLogo, Partial<Record<TemaLogo, string>>>> = {
  horizontal: {
    color: 'assets/branding/logo-alcaldia-navy.svg',
    blanco: 'assets/branding/logo-horizontal-white.png',
  },
  vertical: {
    color: 'assets/branding/logo-alcaldia-vertical-blue.png',
    blanco: 'assets/branding/logo-vertical-white.png',
  },
  escudo: {
    color: 'assets/branding/logo-escudo-blue.png',
  },
  isotipo: {
    color: 'assets/branding/hatillo-isotipo.svg',
  },
};

/** Alturas por variante y tamaño, en píxeles. */
export const ALTURAS_LOGO: Readonly<Record<VarianteLogo, Record<TamanoLogo, number>>> = {
  horizontal: { sm: 24, md: 32, lg: 48 },
  vertical: { sm: 56, md: 72, lg: 96 },
  escudo: { sm: 32, md: 44, lg: 60 },
  isotipo: { sm: 24, md: 32, lg: 48 },
};
