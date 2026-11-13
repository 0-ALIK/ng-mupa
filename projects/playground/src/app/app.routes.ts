import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'componentes/icono',
  },
  {
    path: 'fundamentos',
    loadComponent: () =>
      import('./pages/fundamentos/fundamentos-page.component').then(
        (modulo) => modulo.FundamentosPageComponent,
      ),
  },
  {
    path: 'componentes/icono',
    loadComponent: () =>
      import('./pages/icono/icono-page.component').then((modulo) => modulo.IconoPageComponent),
  },
  {
    path: 'componentes/button',
    loadComponent: () =>
      import('./pages/button/button-page.component').then((modulo) => modulo.ButtonPageComponent),
  },
  {
    path: 'componentes/toggle-button',
    loadComponent: () =>
      import('./pages/toggle-button/toggle-button-page.component').then(
        (modulo) => modulo.ToggleButtonPageComponent,
      ),
  },
  {
    path: 'componentes/pill',
    loadComponent: () =>
      import('./pages/pill/pill-page.component').then((modulo) => modulo.PillPageComponent),
  },
  {
    path: 'componentes/voice-pill',
    loadComponent: () =>
      import('./pages/voice-pill/voice-pill-page.component').then(
        (modulo) => modulo.VoicePillPageComponent,
      ),
  },
  {
    path: 'componentes/checkbox',
    loadComponent: () =>
      import('./pages/checkbox/checkbox-page.component').then(
        (modulo) => modulo.CheckboxPageComponent,
      ),
  },
  {
    path: 'componentes/field',
    loadComponent: () =>
      import('./pages/field/field-page.component').then((modulo) => modulo.FieldPageComponent),
  },
  {
    path: 'componentes/select',
    loadComponent: () =>
      import('./pages/select/select-page.component').then((modulo) => modulo.SelectPageComponent),
  },
  {
    path: 'componentes/date-picker',
    loadComponent: () =>
      import('./pages/date-picker/date-picker-page.component').then(
        (modulo) => modulo.DatePickerPageComponent,
      ),
  },
  {
    path: 'componentes/breadcrumb',
    loadComponent: () =>
      import('./pages/breadcrumb/breadcrumb-page.component').then(
        (modulo) => modulo.BreadcrumbPageComponent,
      ),
  },
  {
    path: 'componentes/landing-nav',
    loadComponent: () =>
      import('./pages/landing-nav/landing-nav-page.component').then(
        (modulo) => modulo.LandingNavPageComponent,
      ),
  },
  {
    path: 'componentes/pagination',
    loadComponent: () =>
      import('./pages/pagination/pagination-page.component').then(
        (modulo) => modulo.PaginationPageComponent,
      ),
  },
  {
    path: 'componentes/avatar',
    loadComponent: () =>
      import('./pages/avatar/avatar-page.component').then((modulo) => modulo.AvatarPageComponent),
  },
  {
    path: 'componentes/avatar-group',
    loadComponent: () =>
      import('./pages/avatar-group/avatar-group-page.component').then(
        (modulo) => modulo.AvatarGroupPageComponent,
      ),
  },
  {
    path: 'componentes/toast',
    loadComponent: () =>
      import('./pages/toast/toast-page.component').then((modulo) => modulo.ToastPageComponent),
  },
  {
    path: 'componentes/sidebar',
    loadComponent: () =>
      import('./pages/sidebar/sidebar-page.component').then(
        (modulo) => modulo.SidebarPageComponent,
      ),
  },
  {
    path: 'componentes/area-chart',
    loadComponent: () =>
      import('./pages/area-chart/area-chart-page.component').then(
        (modulo) => modulo.AreaChartPageComponent,
      ),
  },
  {
    path: 'componentes/bar-chart',
    loadComponent: () =>
      import('./pages/bar-chart/bar-chart-page.component').then(
        (modulo) => modulo.BarChartPageComponent,
      ),
  },
  {
    path: 'componentes/bar-list',
    loadComponent: () =>
      import('./pages/bar-list/bar-list-page.component').then(
        (modulo) => modulo.BarListPageComponent,
      ),
  },
  {
    path: 'componentes/line-chart',
    loadComponent: () =>
      import('./pages/line-chart/line-chart-page.component').then(
        (modulo) => modulo.LineChartPageComponent,
      ),
  },
  {
    path: 'componentes/pie-chart',
    loadComponent: () =>
      import('./pages/pie-chart/pie-chart-page.component').then(
        (modulo) => modulo.PieChartPageComponent,
      ),
  },
  {
    path: 'componentes/radar-chart',
    loadComponent: () =>
      import('./pages/radar-chart/radar-chart-page.component').then(
        (modulo) => modulo.RadarChartPageComponent,
      ),
  },
  {
    path: 'componentes/radial-chart',
    loadComponent: () =>
      import('./pages/radial-chart/radial-chart-page.component').then(
        (modulo) => modulo.RadialChartPageComponent,
      ),
  },
  {
    path: 'componentes/distribution-bar',
    loadComponent: () =>
      import('./pages/distribution-bar/distribution-bar-page.component').then(
        (modulo) => modulo.DistributionBarPageComponent,
      ),
  },
  {
    path: 'componentes/banner',
    loadComponent: () =>
      import('./pages/banner/banner-page.component').then((modulo) => modulo.BannerPageComponent),
  },
  {
    path: 'componentes/lattice-loader',
    loadComponent: () =>
      import('./pages/lattice-loader/lattice-loader-page.component').then(
        (modulo) => modulo.LatticeLoaderPageComponent,
      ),
  },
  {
    path: 'componentes/bubble',
    loadComponent: () =>
      import('./pages/bubble/bubble-page.component').then((modulo) => modulo.BubblePageComponent),
  },
  {
    path: 'componentes/card',
    loadComponent: () =>
      import('./pages/card/card-page.component').then((modulo) => modulo.CardPageComponent),
  },
  {
    path: 'componentes/page-header',
    loadComponent: () =>
      import('./pages/page-header/page-header-page.component').then(
        (modulo) => modulo.PageHeaderPageComponent,
      ),
  },
  {
    path: 'componentes/data-table',
    loadComponent: () =>
      import('./pages/data-table/data-table-page.component').then(
        (modulo) => modulo.DataTablePageComponent,
      ),
  },
  {
    path: 'componentes/confetti',
    loadComponent: () =>
      import('./pages/confetti/confetti-page.component').then(
        (modulo) => modulo.ConfettiPageComponent,
      ),
  },
  {
    path: 'componentes/marquee',
    loadComponent: () =>
      import('./pages/marquee/marquee-page.component').then(
        (modulo) => modulo.MarqueePageComponent,
      ),
  },
  {
    path: 'componentes/contador-numerico',
    loadComponent: () =>
      import('./pages/contador-numerico/contador-numerico-page.component').then(
        (modulo) => modulo.ContadorNumericoPageComponent,
      ),
  },
  {
    path: 'componentes/logo-loop',
    loadComponent: () =>
      import('./pages/logo-loop/logo-loop-page.component').then(
        (modulo) => modulo.LogoLoopPageComponent,
      ),
  },
  {
    path: 'componentes/tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs-page.component').then((modulo) => modulo.TabsPageComponent),
  },
  {
    path: 'componentes/switch',
    loadComponent: () =>
      import('./pages/switch/switch-page.component').then((modulo) => modulo.SwitchPageComponent),
  },
  {
    path: 'componentes/segmented',
    loadComponent: () =>
      import('./pages/segmented/segmented-page.component').then(
        (modulo) => modulo.SegmentedPageComponent,
      ),
  },
  {
    path: 'componentes/radio',
    loadComponent: () =>
      import('./pages/radio/radio-page.component').then((modulo) => modulo.RadioPageComponent),
  },
  {
    path: 'componentes/accordion',
    loadComponent: () =>
      import('./pages/accordion/accordion-page.component').then(
        (modulo) => modulo.AccordionPageComponent,
      ),
  },
  {
    path: 'componentes/menu',
    loadComponent: () =>
      import('./pages/menu/menu-page.component').then((modulo) => modulo.MenuPageComponent),
  },
  {
    path: 'componentes/progress',
    loadComponent: () =>
      import('./pages/progress/progress-page.component').then(
        (modulo) => modulo.ProgressPageComponent,
      ),
  },
  {
    path: 'componentes/file-upload',
    loadComponent: () =>
      import('./pages/file-upload/file-upload-page.component').then(
        (modulo) => modulo.FileUploadPageComponent,
      ),
  },
  {
    path: 'componentes/range',
    loadComponent: () =>
      import('./pages/range/range-page.component').then((modulo) => modulo.RangePageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
