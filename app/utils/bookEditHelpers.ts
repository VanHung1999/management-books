import { 
  NOTIFICATION_MESSAGES, 
  UI_TEXT, 
  CSS_CLASS_MAPS, 
  STATUS_TYPES,
  STATUS_LABELS,
  VALIDATION_RULES,
  FORM_CONFIG,
  RESPONSIVE_CONFIG,
  ROUTES,
  ROUTE_BUILDERS,
  REDIRECTS,
  BREADCRUMBS,
  NAVIGATION
} from '@/app/constants/bookEditConstants';

/**
 * Helper functions for Book Edit Page
 * Utility functions that work with constants
 */

// ===== NOTIFICATION HELPERS =====
export const createNotificationConfig = {
  success: {
    bookDescriptionUpdated: () => NOTIFICATION_MESSAGES.SUCCESS.BOOK_DESCRIPTION_UPDATED,
    bookStatusUpdated: () => NOTIFICATION_MESSAGES.SUCCESS.BOOK_STATUS_UPDATED,
    updateSuccessful: () => NOTIFICATION_MESSAGES.SUCCESS.UPDATE_SUCCESSFUL,
    statusUpdateSuccessful: () => NOTIFICATION_MESSAGES.SUCCESS.STATUS_UPDATE_SUCCESSFUL
  },
  error: {
    updateFailed: () => NOTIFICATION_MESSAGES.ERROR.UPDATE_FAILED,
    statusUpdateFailed: () => NOTIFICATION_MESSAGES.ERROR.STATUS_UPDATE_FAILED,
    validationError: (total: number, current: number) => ({
      message: NOTIFICATION_MESSAGES.ERROR.VALIDATION_ERROR.message,
      description: NOTIFICATION_MESSAGES.ERROR.VALIDATION_ERROR.description
        .replace('{total}', total.toString())
        .replace('{current}', current.toString())
    })
  }
};

// ===== CSS CLASS HELPERS =====
export const getStatusClass = (type: 'available' | 'loaned' | 'disabled' | 'renovated', classType: 'card' | 'number' | 'label') => {
  const classMap = CSS_CLASS_MAPS[`STATUS_${classType.toUpperCase()}` as keyof typeof CSS_CLASS_MAPS];
  return classMap[type];
};

// ===== STATUS CONFIGURATION =====
export const getStatusConfig = () => {
  return Object.values(STATUS_TYPES).map(type => ({
    type,
    label: STATUS_LABELS[type.toUpperCase() as keyof typeof STATUS_LABELS]
  }));
};

// ===== FORM VALIDATION HELPERS =====
export const getFormValidationRules = {
  description: () => [
    { required: true, message: VALIDATION_RULES.DESCRIPTION.REQUIRED },
    { min: VALIDATION_RULES.DESCRIPTION.MIN_LENGTH_VALUE, message: VALIDATION_RULES.DESCRIPTION.MIN_LENGTH }
  ],
  status: () => [
    { required: true, message: VALIDATION_RULES.STATUS.REQUIRED },
    { type: 'number' as const, min: VALIDATION_RULES.STATUS.MIN_VALUE_NUMBER, message: VALIDATION_RULES.STATUS.MIN_VALUE }
  ]
};

// ===== UI TEXT HELPERS =====
export const getUIText = {
  statusInfo: (num: number, current: number) => 
    UI_TEXT.STATUS_INFO.TOTAL_COPIES
      .replace('{num}', num.toString())
      .replace('{current}', current.toString()),
  
  statusWarning: (current: number, num: number) =>
    UI_TEXT.STATUS_INFO.WARNING
      .replace('{current}', current.toString())
      .replace('{num}', num.toString()),
  
  validationRules: (num: number, current: number) => [
    UI_TEXT.VALIDATION_INFO.RULES,
    UI_TEXT.VALIDATION_INFO.TOTAL_MUST_EQUAL
      .replace('{num}', num.toString())
      .replace('{current}', current.toString()),
    UI_TEXT.VALIDATION_INFO.VALUES_GREATER_EQUAL,
    UI_TEXT.VALIDATION_INFO.TOTAL_UNCHANGED,
    UI_TEXT.VALIDATION_INFO.LOANED_READONLY
  ].join('<br/>')
};

// ===== FORM CONFIGURATION HELPERS =====
export const getFormConfig = {
  textarea: () => ({
    rows: FORM_CONFIG.DESCRIPTION.TEXTAREA_ROWS,
    placeholder: FORM_CONFIG.DESCRIPTION.PLACEHOLDER
  }),
  
  inputNumber: (type: 'available' | 'loaned' | 'disabled' | 'renovated') => ({
    min: FORM_CONFIG.STATUS.INPUT_MIN,
    placeholder: FORM_CONFIG.STATUS.PLACEHOLDERS[type.toUpperCase() as keyof typeof FORM_CONFIG.STATUS.PLACEHOLDERS]
  })
};

// ===== RESPONSIVE CONFIGURATION =====
export const getResponsiveConfig = {
  statusCards: () => RESPONSIVE_CONFIG.STATUS_CARDS,
  inputFields: () => RESPONSIVE_CONFIG.INPUT_FIELDS
};

// ===== STATUS VALIDATION HELPERS =====
export const validateStatusTotal = (currentTotal: number, expectedTotal: number) => {
  return currentTotal === expectedTotal;
};

export const calculateStatusTotal = (available: number, loaned: number, disabled: number, renovated: number) => {
  return available + loaned + disabled + renovated;
};

// ===== ROUTE HELPERS =====
export const getRouteHelpers = {
  // Book routes
  getBookDetailUrl: (id: string | number) => ROUTE_BUILDERS.bookDetail(id),
  getBookEditUrl: (id: string | number) => ROUTE_BUILDERS.bookEdit(id),
  getBookCreateUrl: () => ROUTE_BUILDERS.bookCreate(),
  
  // Navigation routes
  getHomeUrl: () => ROUTES.HOME,
  getBooksUrl: () => ROUTES.BOOKS,
  getDashboardUrl: () => ROUTES.DASHBOARD,
  getProfileUrl: () => ROUTES.PROFILE,
  
  // Admin routes
  getAdminUrl: () => ROUTES.ADMIN,
  getAdminUsersUrl: () => ROUTES.ADMIN_USERS,
  getAdminBooksUrl: () => ROUTES.ADMIN_BOOKS,
  
  // Auth routes
  getLoginUrl: () => ROUTES.LOGIN,
  getRegisterUrl: () => ROUTES.REGISTER,
  getForgotPasswordUrl: () => ROUTES.FORGOT_PASSWORD,
  
  // Search routes
  getSearchUrl: (query: string) => ROUTE_BUILDERS.searchBooks(query),
  getSearchByCategoryUrl: (query: string, category: string) => 
    ROUTE_BUILDERS.searchBooksByCategory(query, category),
};

// ===== REDIRECT HELPERS =====
export const getRedirectHelpers = {
  // After successful operations
  getAfterLoginUrl: () => REDIRECTS.AFTER_LOGIN,
  getAfterLogoutUrl: () => REDIRECTS.AFTER_LOGOUT,
  getAfterRegisterUrl: () => REDIRECTS.AFTER_REGISTER,
  
  // After book operations
  getAfterBookCreateUrl: (bookId: string) => REDIRECTS.AFTER_BOOK_CREATE(bookId),
  getAfterBookUpdateUrl: (bookId: string) => REDIRECTS.AFTER_BOOK_UPDATE(bookId),
  getAfterBookDeleteUrl: () => REDIRECTS.AFTER_BOOK_DELETE,
  
  // After profile operations
  getAfterProfileUpdateUrl: () => REDIRECTS.AFTER_PROFILE_UPDATE,
  
  // Error redirects
  getUnauthorizedUrl: () => REDIRECTS.ON_UNAUTHORIZED,
  getNotFoundUrl: () => REDIRECTS.ON_NOT_FOUND,
  getServerErrorUrl: () => REDIRECTS.ON_SERVER_ERROR,
};

// ===== BREADCRUMB HELPERS =====
export const getBreadcrumbHelpers = {
  // Book breadcrumbs
  getBooksBreadcrumb: () => BREADCRUMBS.BOOKS,
  getBookDetailBreadcrumb: (bookName: string) => BREADCRUMBS.BOOK_DETAIL(bookName),
  getBookEditBreadcrumb: (bookName: string, bookId: string) => BREADCRUMBS.BOOK_EDIT(bookName, bookId),
  getBookCreateBreadcrumb: () => BREADCRUMBS.BOOK_CREATE,
  
  // Dashboard breadcrumbs
  getDashboardBreadcrumb: () => BREADCRUMBS.DASHBOARD,
  
  // Profile breadcrumbs
  getProfileBreadcrumb: () => BREADCRUMBS.PROFILE,
  getProfileEditBreadcrumb: () => BREADCRUMBS.PROFILE_EDIT,
};

// ===== NAVIGATION HELPERS =====
export const getNavigationHelpers = {
  // Get navigation menus
  getMainMenu: () => NAVIGATION.MAIN_MENU,
  getUserMenu: () => NAVIGATION.USER_MENU,
  getAdminMenu: () => NAVIGATION.ADMIN_MENU,
  
  // Check if route is active
  isActiveRoute: (currentPath: string, routePath: string) => {
    if (routePath === currentPath) return true;
    if (routePath.includes('[id]') && currentPath.match(/^\/books\/\d+$/)) return true;
    return false;
  },
  
  // Get menu item by key
  getMenuItemByKey: (menu: any[], key: string) => {
    return menu.find(item => item.key === key);
  },
};

// ===== URL VALIDATION HELPERS =====
export const getUrlValidationHelpers = {
  // Check if URL is valid
  isValidUrl: (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Check if route exists
  isValidRoute: (path: string) => {
    const allRoutes = Object.values(ROUTES);
    return allRoutes.some(route => route === path || path.match(route.replace('[id]', '\\d+')));
  },
  
  // Sanitize URL parameters
  sanitizeUrlParam: (param: string) => {
    return encodeURIComponent(param.replace(/[^a-zA-Z0-9\s-]/g, ''));
  },
};
