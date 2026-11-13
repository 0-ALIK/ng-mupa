import { dispararConfeti } from './confetti.util';

describe('dispararConfeti', () => {
  let matchMediaOriginal: typeof window.matchMedia;

  beforeEach(() => {
    matchMediaOriginal = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = matchMediaOriginal;
  });

  it('no crea partículas cuando el movimiento está reducido', () => {
    window.matchMedia = ((consulta: string) =>
      ({
        matches: consulta.includes('prefers-reduced-motion'),
        media: consulta,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia;

    const lienzosAntes = document.querySelectorAll('canvas').length;
    dispararConfeti();
    const lienzosDespues = document.querySelectorAll('canvas').length;

    expect(lienzosDespues).toBe(lienzosAntes);
  });
});
