// Navigation utilities for routing and redirects

import { ROUTES, REDIRECTS } from '../constants';

// Navigation helper functions
export const NavigationUtils = {
  // Get route by key
  getRoute: (key: keyof typeof ROUTES): string => {
    return ROUTES[key];
  },

  // Get redirect by key
  getRedirect: (key: keyof typeof REDIRECTS): string => {
    return REDIRECTS[key];
  },

  // Check if route exists
  isValidRoute: (route: string): boolean => {
    return Object.values(ROUTES).includes(route as any);
  },

  // Get all routes
  getAllRoutes: (): typeof ROUTES => {
    return ROUTES;
  },

  // Get all redirects
  getAllRedirects: (): typeof REDIRECTS => {
    return REDIRECTS;
  },

  // Build route with parameters
  buildRoute: (route: string, params?: Record<string, string | number>): string => {
    if (!params) return route;
    
    let builtRoute = route;
    Object.entries(params).forEach(([key, value]) => {
      builtRoute = builtRoute.replace(`:${key}`, String(value));
    });
    
    return builtRoute;
  },

  // Get route segments
  getRouteSegments: (route: string): string[] => {
    return route.split('/').filter(segment => segment !== '');
  },

  // Check if route is active
  isActiveRoute: (currentPath: string, targetRoute: string): boolean => {
    return currentPath === targetRoute || currentPath.startsWith(targetRoute + '/');
  },

  // Get parent route
  getParentRoute: (route: string): string => {
    const segments = route.split('/').filter(segment => segment !== '');
    if (segments.length <= 1) return '/';
    return '/' + segments.slice(0, -1).join('/');
  },

  // Get breadcrumb path
  getBreadcrumbPath: (route: string): Array<{ label: string; path: string }> => {
    const segments = route.split('/').filter(segment => segment !== '');
    const breadcrumbs: Array<{ label: string; path: string }> = [
      { label: 'Home', path: ROUTES.HOME }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        label,
        path: currentPath
      });
    });

    return breadcrumbs;
  }
};

// Common navigation patterns
export const CommonRedirects = {
  // Authentication redirects
  toLogin: () => ROUTES.LOGIN,
  toRegister: () => ROUTES.REGISTER,
  toDashboard: () => ROUTES.DASHBOARD,
  toForgotPassword: () => ROUTES.FORGOT_PASSWORD,

  // User management redirects
  toUsers: () => ROUTES.USERS,
  toUserProfile: () => ROUTES.USER_PROFILE,
  toUserCreate: () => ROUTES.USER_CREATE,
  toUserEdit: (id: string | number) => ROUTES.USER_EDIT.replace(':id', String(id)),
  toUserDetail: (id: string | number) => ROUTES.USER_DETAIL.replace(':id', String(id)),

  // Book management redirects
  toBooks: () => ROUTES.BOOKS,
  toBookCreate: () => ROUTES.BOOK_CREATE,
  toBookEdit: (id: string | number) => ROUTES.BOOK_EDIT.replace(':id', String(id)),
  toBookDetail: (id: string | number) => ROUTES.BOOK_DETAIL.replace(':id', String(id)),
  toBookCategories: () => ROUTES.BOOK_CATEGORIES,
  toBookAuthors: () => ROUTES.BOOK_AUTHORS,
  toBookPublishers: () => ROUTES.BOOK_PUBLISHERS,
  toBookSearch: () => ROUTES.BOOK_SEARCH,

  // Settings redirects
  toSettings: () => ROUTES.SETTINGS,
  toSettingsGeneral: () => ROUTES.SETTINGS_GENERAL,
  toSettingsNotifications: () => ROUTES.SETTINGS_NOTIFICATIONS,
  toSettingsSecurity: () => ROUTES.SETTINGS_SECURITY,
  toSettingsBackup: () => ROUTES.SETTINGS_BACKUP,

  // Error redirects
  toNotFound: () => ROUTES.NOT_FOUND,
  toUnauthorized: () => ROUTES.UNAUTHORIZED,
  toServerError: () => ROUTES.SERVER_ERROR,
};

// Route validation
export const RouteValidation = {
  // Check if user has access to route
  hasAccess: (route: string, userRole: string): boolean => {
    // Define route access rules
    const accessRules: Record<string, string[]> = {
      [ROUTES.DASHBOARD]: ['admin', 'manager', 'staff'],
      [ROUTES.USERS]: ['admin', 'manager'],
      [ROUTES.USER_CREATE]: ['admin', 'manager'],
      [ROUTES.USER_EDIT]: ['admin', 'manager'],
      [ROUTES.USER_DELETE]: ['admin'],
      [ROUTES.BOOKS]: ['admin', 'manager', 'staff'],
      [ROUTES.BOOK_CREATE]: ['admin', 'manager', 'staff'],
      [ROUTES.BOOK_EDIT]: ['admin', 'manager', 'staff'],
      [ROUTES.BOOK_DELETE]: ['admin', 'manager'],
      [ROUTES.SETTINGS]: ['admin', 'manager'],
    };

    const allowedRoles = accessRules[route] || ['admin', 'manager', 'staff', 'customer'];
    return allowedRoles.includes(userRole);
  },

  // Get accessible routes for user role
  getAccessibleRoutes: (userRole: string): string[] => {
    return Object.values(ROUTES).filter(route => 
      RouteValidation.hasAccess(route, userRole)
    );
  }
};

// Export default navigation object
export default {
  ROUTES,
  REDIRECTS,
  NavigationUtils,
  CommonRedirects,
  RouteValidation,
};
