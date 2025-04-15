import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '', title: 'Dashboard', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: '/courses', title: 'Courses', icon: 'ft-book-open', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
{ path: '/proposal', title: 'Proposals', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
{
  path: '/partnerships', title: 'Partnerships', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
},
{ path: '/entreprise', title: 'Entreprises', icon: 'ft-briefcase', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
{ path: '/center', title: 'Centers', icon: 'ft-map-pin', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
{ path: '/scraping', title: 'Scraping', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
{ path: '/potentialpartners', title: 'Potential', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

  { path: '/chat', title: 'Chat', icon: 'ft-message-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/taskboard', title: 'Task Board', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/calendar', title: 'Calendar', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  
  
  {
    path: '', title: 'Components', icon: 'ft-box', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Bootstrap', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/components/buttons', title: 'Buttons', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/ng-buttons', title: 'NG Buttons', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/alerts', title: 'Alerts', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/badges', title: 'Badges', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/dropdowns', title: 'Dropdowns', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/media', title: 'Media Objects', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/pagination', title: 'Pagination', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/progress', title: 'Progress Bars', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/models', title: 'Modals', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/collapse', title: 'Collapse', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/lists', title: 'List', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/accordion', title: 'Accordion', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/carousel', title: 'Carousel', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/popover', title: 'Popover', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/rating', title: 'Rating', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/navs', title: 'Navs', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/tooltip', title: 'Tooltip', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/typeahead', title: 'Typeahead', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Extra', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/components/sweetalerts', title: 'Sweet Alert', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/toastr', title: 'Toastr', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/nouislider', title: 'NoUI Slider', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/upload', title: 'Upload', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/dragndrop', title: 'Drag and Drop', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/tour', title: 'Tour', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/cropper', title: 'Image Cropper', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/avatar', title: 'Avatar', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/swiper', title: 'Swiper', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
    ]
  },
  {
    path: '', title: 'Forms', icon: 'ft-edit', class: 'has-sub', badge: 'New', badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Elements', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/forms/inputs', title: 'Inputs', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/input-groups', title: 'Input Groups', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/radio', title: 'Radio', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/checkbox', title: 'Checkbox', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/switch', title: 'Switch', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/select', title: 'Select', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/editor', title: 'Editor', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/tags', title: 'Input Tags', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/datepicker', title: 'Datepicker', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/timepicker', title: 'Timepicker', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      { path: '/forms/layout', title: 'Layouts', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/forms/validation', title: 'Validation', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/forms/archwizard', title: 'Wizard', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  
 
  {
    path: '', title: 'Cards', icon: 'ft-layers', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/cards/basic', title: 'Basic Cards', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/cards/advanced', title: 'Advanced Cards', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  
  {
    path: '', title: 'Charts', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      { path: '/charts/chartjs', title: 'ChartJs', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/chartist', title: 'Chartist', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/apex', title: 'Apex', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/ngx', title: 'NGX', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Pages', icon: 'ft-copy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
     

      {
        path: '', title: 'Vertical Timeline', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/timeline-vertical-center', title: 'Center', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      
      { path: '/pages/account-settings', title: 'Account Settings', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/invoice', title: 'Invoice', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/comingsoon', title: 'Coming Soon', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/pages/kb', title: 'Knowledge Base', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  
];
