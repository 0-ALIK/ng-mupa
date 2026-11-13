/*
 * API pública de mupa-ui
 * Sistema de diseño Lego — Alcaldía de Panamá
 */

// Fundamentos
export { MupaIcon } from './lib/icon/icon.component';
export { ICONOS, NOMBRES_ICONOS } from './lib/icon/icon.types';
export type { IconoNodo, NombreIcono } from './lib/icon/icon.types';

// Acciones
export { MupaButton } from './lib/button/button.component';
export type { TamanoBoton, TipoBoton, VarianteBoton } from './lib/button/button.types';
export { MupaToggleButton } from './lib/toggle-button/toggle-button.component';
export type {
  TamanoToggleButton,
  VarianteToggleButton,
} from './lib/toggle-button/toggle-button.types';
export { MupaPill } from './lib/pill/pill.component';
export { COLORES_PILL, CONFIGURACION_CONTORNO, CONFIGURACION_SOLIDA } from './lib/pill/pill.types';
export type {
  ColorPill,
  ConfiguracionColorPill,
  DisenoPill,
  TamanoPill,
} from './lib/pill/pill.types';
export { MupaVoicePill } from './lib/voice-pill/voice-pill.component';
export type {
  EventoDetencionVoz,
  EventoErrorVoz,
  EventoInicioVoz,
  FaseVoicePill,
  FormaVoicePill,
  FuenteVoz,
  ModoVoicePill,
  RazonDetencionVoz,
} from './lib/voice-pill/voice-pill.types';

// Formularios
export { MupaCheckbox } from './lib/checkbox/checkbox.component';
export type { EstadoCheckbox } from './lib/checkbox/checkbox.types';
export { MupaInputDirective } from './lib/input/input.directive';
export { MupaSelect } from './lib/select/select.component';
export type { GrupoSelect, OpcionSelect } from './lib/select/select.types';
export { MupaDatePicker } from './lib/date-picker/date-picker.component';
export type {
  CeldaCalendario,
  ModoDatePicker,
  RangoFechas,
} from './lib/date-picker/date-picker.types';

// Gráficos
export { MupaAreaChart } from './lib/area-chart/area-chart.component';
export { RANGOS_AREA } from './lib/area-chart/area-chart.types';
export type {
  DatoAreaChart,
  RangoAreaChart,
  SerieAreaChart,
} from './lib/area-chart/area-chart.types';
export { MupaBarChart } from './lib/bar-chart/bar-chart.component';
export type { DatoBarChart, SerieBarChart } from './lib/bar-chart/bar-chart.types';
export { MupaBarList } from './lib/bar-list/bar-list.component';
export type { ItemBarList } from './lib/bar-list/bar-list.types';
export { MupaDistributionBar } from './lib/distribution-bar/distribution-bar.component';
export type {
  ItemDistribucion,
  TonoDistribucion,
} from './lib/distribution-bar/distribution-bar.types';
export { MupaLineChart } from './lib/line-chart/line-chart.component';
export { MupaLineChartLabel } from './lib/line-chart/line-chart-label.component';
export type { DatoLineChartLabel } from './lib/line-chart/line-chart-label.types';
export type { DatoLineChart, SerieLineChart } from './lib/line-chart/line-chart.types';
export { MupaPieChart } from './lib/pie-chart/pie-chart.component';
export type { ListaEtiquetasPie, PorcionPieChart } from './lib/pie-chart/pie-chart.types';
export { MupaRadarChart } from './lib/radar-chart/radar-chart.component';
export type {
  CuadriculaRadar,
  DatoRadarChart,
  SerieRadarChart,
} from './lib/radar-chart/radar-chart.types';
export { MupaRadialChart } from './lib/radial-chart/radial-chart.component';
export type { ItemRadialChart } from './lib/radial-chart/radial-chart.types';
export type { DireccionTendencia } from './lib/chart-utils/chart.types';

// Mensajes y estados
export { MupaBanner } from './lib/banner/banner.component';
export { TONOS_BANNER } from './lib/banner/banner.types';
export type { ConfiguracionTonoBanner, TonoBanner } from './lib/banner/banner.types';
export { MupaLatticeLoader } from './lib/lattice-loader/lattice-loader.component';
export {
  ETIQUETAS_PATRON_LATTICE,
  MARCAS_LATTICE,
  PATRONES_LATTICE,
  PATRONES_POR_CUADRICULA,
} from './lib/lattice-loader/lattice-loader.types';
export type {
  DefinicionPatronLattice,
  EstadoLattice,
  FormaLattice,
  NombrePatronLattice,
  PatronLattice,
} from './lib/lattice-loader/lattice-loader.types';
export { MupaBubble } from './lib/bubble/bubble.component';
export { MupaBubbleCard } from './lib/bubble/bubble-card.component';
export { MupaBubbleContent } from './lib/bubble/bubble-content.component';
export { MupaBubbleGroup } from './lib/bubble/bubble-group.component';
export { MupaBubbleReactions } from './lib/bubble/bubble-reactions.component';
export { MupaBubbleSuggestions } from './lib/bubble/bubble-suggestions.component';
export { VARIANTES_BURBUJA } from './lib/bubble/bubble.types';
export type {
  AlineacionBurbuja,
  AnchoBurbuja,
  ConfiguracionVarianteBurbuja,
  ElementoSugerenciaBurbuja,
  PosicionBurbuja,
  SugerenciaBurbuja,
  VarianteBurbuja,
} from './lib/bubble/bubble.types';

// Avatares
export { MupaAvatar } from './lib/avatar/avatar.component';
export { ESTADOS_AVATAR, TINTES_AVATAR } from './lib/avatar/avatar.types';
export type { EstadoAvatar, InfoEstadoAvatar, PersonaAvatar } from './lib/avatar/avatar.types';
export { MupaAvatarGroup } from './lib/avatar-group/avatar-group.component';

// Notificaciones
export { MupaToast } from './lib/toast/toast.component';
export { MupaToaster } from './lib/toast/toaster.component';
export { MupaToastService } from './lib/toast/toast.service';
export { TONOS_TOAST } from './lib/toast/toast.types';
export type {
  AccionToast,
  ConfiguracionTonoToast,
  OpcionesToast,
  ToastVisible,
  TonoToast,
} from './lib/toast/toast.types';

// Contenido
export { MupaCard } from './lib/card/card.component';
export {
  MupaCardActionsDirective,
  MupaCardFooterDirective,
  MupaCardHeaderDirective,
  MupaCardMediaDirective,
} from './lib/card/card-slots.directive';
export type {
  BordeCard,
  DireccionCard,
  EspaciadoCard,
  EstadoVisualCard,
  NivelTituloCard,
  RadioCard,
  SombraCard,
} from './lib/card/card.types';
export { MupaDataTable } from './lib/data-table/data-table.component';
export { MupaTemplateDirective } from './lib/data-table/template.directive';
export { TONOS_ESTADO_POR_DEFECTO, TONOS_ESTADO_TABLA } from './lib/data-table/data-table.types';
export type {
  AccionTabla,
  AlineacionColumnaTabla,
  ColumnaTabla,
  ConfiguracionEstadoTabla,
  RegistroTabla,
  TipoColumnaTabla,
  TonoEstadoTabla,
} from './lib/data-table/data-table.types';
export { MupaPageHeader } from './lib/page-header/page-header.component';
export type {
  AccionPageHeader,
  FiltroPageHeader,
  MigasPageHeader,
} from './lib/page-header/page-header.types';

// Navegación
export { MupaBreadcrumb } from './lib/breadcrumb/breadcrumb.component';
export type {
  ElementoBreadcrumb,
  EventoNavegacionBreadcrumb,
  SeparadorBreadcrumb,
} from './lib/breadcrumb/breadcrumb.types';
export { MupaLandingNav } from './lib/landing-nav/landing-nav.component';
export type { DisenoLandingNav, ElementoLandingNav } from './lib/landing-nav/landing-nav.types';
export { MupaNavLink } from './lib/nav-link/nav-link.component';
export type { EstadoNavLink } from './lib/nav-link/nav-link.types';
export { MupaPagination } from './lib/pagination/pagination.component';
export type { VariantePaginacion } from './lib/pagination/pagination.types';
export { MupaSidebar } from './lib/sidebar/sidebar.component';
export { esRamaSidebar } from './lib/sidebar/sidebar.types';
export type {
  EnlaceSidebar,
  EventoNavegacionSidebar,
  GrupoSidebar,
  RamaSidebar,
  UsuarioSidebar,
} from './lib/sidebar/sidebar.types';

// Recursos visuales
export { MupaConfetti } from './lib/confetti/confetti.component';
export { MupaBotonConfeti } from './lib/confetti/boton-confeti.component';
export { MupaDisparadorConfeti } from './lib/confetti/disparador-confeti.directive';
export { MupaConfettiService } from './lib/confetti/confetti.service';
export { COLORES_CONFETI, dispararConfeti } from './lib/confetti/confetti.util';
export type { OpcionesConfeti, VarianteBotonConfeti } from './lib/confetti/confetti.types';

export { MupaMarquee } from './lib/marquee/marquee.component';
export { MupaTestimonio } from './lib/marquee/testimonio.component';

export { MupaContadorNumerico } from './lib/contador-numerico/contador-numerico.component';
export type { DireccionContador } from './lib/contador-numerico/contador-numerico.types';

export { MupaLogoLoop } from './lib/logo-loop/logo-loop.component';
export type {
  DireccionLogoLoop,
  ItemImagenLogoLoop,
  ItemLogoLoop,
  ItemPlantillaLogoLoop,
} from './lib/logo-loop/logo-loop.types';

// Interacción y formularios
export { MupaTabs } from './lib/tabs/tabs.component';
export type { Pestana } from './lib/tabs/tabs.types';
export { MupaSwitch } from './lib/switch/switch.component';
export { MupaSegmented } from './lib/segmented/segmented.component';
export type { OpcionSegmentada } from './lib/segmented/segmented.types';
export { MupaRadio } from './lib/radio/radio.component';
export type { OpcionRadio, OrientacionRadio, VarianteRadio } from './lib/radio/radio.types';
export { MupaAccordion } from './lib/accordion/accordion.component';
export type { ItemAcordeon } from './lib/accordion/accordion.types';
export { MupaMenu } from './lib/menu/menu.component';
export type { GrupoMenu, ItemMenu } from './lib/menu/menu.types';
export { MupaProgress } from './lib/progress/progress.component';
export { MupaFileUpload } from './lib/file-upload/file-upload.component';
export { MupaRange } from './lib/range/range.component';
