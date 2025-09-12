// Resources and Constants for Management Books System

// Authentication resources
export const AUTH_RESOURCES = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  LOGOUT: 'auth/logout',
  REFRESH_TOKEN: 'auth/refresh',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
} as const;

// User management resources
export const USER_RESOURCES = {
  LIST: 'users',
  CREATE: 'users',
  UPDATE: 'users',
  DELETE: 'users',
  PROFILE: 'users/profile',
  CHANGE_PASSWORD: 'users/change-password',
} as const;

// Book management resources
export const BOOK_RESOURCES = {
  LIST: 'books',
  CREATE: 'books',
  UPDATE: 'books',
  DELETE: 'books',
  DETAIL: 'books',
  SEARCH: 'books/search',
  CATEGORIES: 'books/categories',
  AUTHORS: 'books/authors',
  PUBLISHERS: 'books/publishers',
} as const;


// Dashboard resources
export const DASHBOARD_RESOURCES = {
  STATS: 'dashboard/stats',
  RECENT_ACTIVITIES: 'dashboard/activities',
  CHARTS: 'dashboard/charts',
} as const;

// File upload resources
export const UPLOAD_RESOURCES = {
  IMAGES: 'upload/images',
  DOCUMENTS: 'upload/documents',
  BOOK_COVERS: 'upload/book-covers',
} as const;

// Settings resources
export const SETTINGS_RESOURCES = {
  GENERAL: 'settings/general',
  NOTIFICATIONS: 'settings/notifications',
  SECURITY: 'settings/security',
  BACKUP: 'settings/backup',
} as const;

// Page Routes - Frontend navigation
export const ROUTES = {
  // Authentication pages
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard pages
  DASHBOARD: '/dashboard',
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_ACTIVITIES: '/dashboard/activities',
  DASHBOARD_CHARTS: '/dashboard/charts',
  
  // User management pages
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/edit',
  USER_DETAIL: '/users/detail',
  
  // Book management pages
  BOOKS: '/books',
  BOOK_CREATE: '/books/create',
  BOOK_EDIT: '/books/edit',
  BOOK_DETAIL: '/books/detail',
  BOOK_CATEGORIES: '/books/categories',
  BOOK_AUTHORS: '/books/authors',
  BOOK_PUBLISHERS: '/books/publishers',
  BOOK_SEARCH: '/books/search',
  
  // Settings pages
  SETTINGS: '/settings',
  SETTINGS_GENERAL: '/settings/general',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  SETTINGS_SECURITY: '/settings/security',
  SETTINGS_BACKUP: '/settings/backup',
  
  // Other pages
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
} as const;

// Redirect URLs - Common redirect patterns
export const REDIRECTS = {
  // After authentication
  AFTER_LOGIN: '/dashboard',
  AFTER_LOGOUT: '/login',
  AFTER_REGISTER: '/login',
  AFTER_PASSWORD_RESET: '/login',
  
  // After successful operations
  AFTER_USER_CREATE: '/users',
  AFTER_USER_UPDATE: '/users',
  AFTER_USER_DELETE: '/users',
  AFTER_BOOK_CREATE: '/books',
  AFTER_BOOK_UPDATE: '/books',
  AFTER_BOOK_DELETE: '/books',
  
  // Error redirects
  UNAUTHORIZED_ACCESS: '/login',
  SESSION_EXPIRED: '/login',
  ACCESS_DENIED: '/unauthorized',
  
  // Default redirects
  DEFAULT_HOME: '/dashboard',
  DEFAULT_LOGIN: '/login',
  DEFAULT_ERROR: '/404',
} as const;

// Combined resources object
export const RESOURCES = {
  AUTH: AUTH_RESOURCES,
  USERS: USER_RESOURCES,
  BOOKS: BOOK_RESOURCES,
  DASHBOARD: DASHBOARD_RESOURCES,
  UPLOAD: UPLOAD_RESOURCES,
  SETTINGS: SETTINGS_RESOURCES,
} as const;

// Combined routes object
export const NAVIGATION = {
  ROUTES: ROUTES,
  REDIRECTS: REDIRECTS,
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  VERSION: 'v1',
  TIMEOUT: 10000, // 10 seconds
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  get AUTH_LOGIN() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.LOGIN}`; },
  get AUTH_REGISTER() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.REGISTER}`; },
  get AUTH_LOGOUT() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.LOGOUT}`; },
  get AUTH_REFRESH() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.REFRESH_TOKEN}`; },
  get AUTH_FORGOT_PASSWORD() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.FORGOT_PASSWORD}`; },
  get AUTH_RESET_PASSWORD() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${AUTH_RESOURCES.RESET_PASSWORD}`; },
  
  // User endpoints
  get USERS_LIST() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${USER_RESOURCES.LIST}`; },
  get USERS_CREATE() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${USER_RESOURCES.CREATE}`; },
  get USERS_PROFILE() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${USER_RESOURCES.PROFILE}`; },
  get USERS_CHANGE_PASSWORD() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${USER_RESOURCES.CHANGE_PASSWORD}`; },
  
  // Book endpoints
  get BOOKS_LIST() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.LIST}`; },
  get BOOKS_CREATE() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.CREATE}`; },
  get BOOKS_SEARCH() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.SEARCH}`; },
  get BOOKS_CATEGORIES() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.CATEGORIES}`; },
  get BOOKS_AUTHORS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.AUTHORS}`; },
  get BOOKS_PUBLISHERS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${BOOK_RESOURCES.PUBLISHERS}`; },
  
  
  
  
  
  
  // Dashboard endpoints
  get DASHBOARD_STATS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${DASHBOARD_RESOURCES.STATS}`; },
  get DASHBOARD_ACTIVITIES() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${DASHBOARD_RESOURCES.RECENT_ACTIVITIES}`; },
  get DASHBOARD_CHARTS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${DASHBOARD_RESOURCES.CHARTS}`; },
  
  
  // Upload endpoints
  get UPLOAD_IMAGES() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${UPLOAD_RESOURCES.IMAGES}`; },
  get UPLOAD_DOCUMENTS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${UPLOAD_RESOURCES.DOCUMENTS}`; },
  get UPLOAD_BOOK_COVERS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${UPLOAD_RESOURCES.BOOK_COVERS}`; },
  
  // Settings endpoints
  get SETTINGS_GENERAL() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${SETTINGS_RESOURCES.GENERAL}`; },
  get SETTINGS_NOTIFICATIONS() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${SETTINGS_RESOURCES.NOTIFICATIONS}`; },
  get SETTINGS_SECURITY() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${SETTINGS_RESOURCES.SECURITY}`; },
  get SETTINGS_BACKUP() { return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}/${SETTINGS_RESOURCES.BACKUP}`; },
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Response Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// File Upload Constants
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB for images
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  USER_PERMISSIONS: 'user_permissions',
  BOOKS_LIST: 'books_list',
  BOOKS_DETAIL: 'books_detail',
  DASHBOARD_STATS: 'dashboard_stats',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  TABLE_PREFERENCES: 'table_preferences',
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  // Email patterns
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  EMAIL_STRICT: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Password patterns
  PASSWORD_WEAK: /^.{6,}$/, // At least 6 characters
  PASSWORD_MEDIUM: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, // At least 6 chars with letters and numbers
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Strong password
  
  // Name patterns
  NAME: /^[a-zA-Z\s]{2,50}$/, // 2-50 characters, letters and spaces only
  NAME_STRICT: /^[a-zA-Z\s'-]{2,50}$/, // Includes apostrophes and hyphens
  FIRST_NAME: /^[a-zA-Z]{2,30}$/,
  LAST_NAME: /^[a-zA-Z\s'-]{2,30}$/,
  
  // Phone number patterns
  PHONE_BASIC: /^[0-9+\-\s()]+$/, // Basic phone with numbers, +, -, spaces, parentheses
  PHONE_US: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, // US format
  PHONE_INTERNATIONAL: /^\+?[1-9]\d{1,14}$/, // International format
  PHONE_MOBILE: /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/, // Mobile format
  
  // ISBN patterns
  ISBN_10: /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
  ISBN_13: /^(?:ISBN(?:-13)?:? )?(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$/,
  ISBN_ANY: /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
  
  // URL patterns
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  URL_STRICT: /^https?:\/\/(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}(\/.*)?$/,
  
  // Date patterns
  DATE_YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
  DATE_DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
  DATE_MM_DD_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
  DATETIME: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  
  // Time patterns
  TIME_24H: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  TIME_12H: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
  
  // Number patterns
  POSITIVE_INTEGER: /^[1-9]\d*$/,
  NON_NEGATIVE_INTEGER: /^\d+$/,
  DECIMAL: /^\d+\.\d+$/,
  CURRENCY: /^\$?\d+(\.\d{2})?$/,
  PERCENTAGE: /^\d+(\.\d+)?%?$/,
  
  // Alphanumeric patterns
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHANUMERIC_WITH_SPACES: /^[a-zA-Z0-9\s]+$/,
  ALPHANUMERIC_WITH_SPECIAL: /^[a-zA-Z0-9\s\-_.,!?]+$/,
  
  // Special patterns
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/, // 3-20 chars, letters, numbers, underscore
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // URL-friendly slug
  HASHTAG: /^#[a-zA-Z0-9_]+$/, // Hashtag format
  MENTION: /^@[a-zA-Z0-9_]+$/, // Mention format
  
  // File patterns
  IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|doc|docx|txt|rtf)$/i,
  VIDEO_EXTENSION: /\.(mp4|avi|mov|wmv|flv|webm)$/i,
  AUDIO_EXTENSION: /\.(mp3|wav|ogg|aac|flac)$/i,
  
  // Address patterns
  ZIP_CODE_US: /^\d{5}(-\d{4})?$/,
  ZIP_CODE_CA: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
  POSTAL_CODE: /^[A-Za-z0-9\s-]{3,10}$/,
  
  // Credit card patterns
  CREDIT_CARD: /^[0-9]{13,19}$/,
  CVV: /^[0-9]{3,4}$/,
  
  // Social security patterns
  SSN_US: /^\d{3}-\d{2}-\d{4}$/,
  
  // IP address patterns
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  IPV6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
  
  // Color patterns
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  RGB_COLOR: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  RGBA_COLOR: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0\.\d+)\s*\)$/,
  
  // Version patterns
  SEMANTIC_VERSION: /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/,
  
  // UUID patterns
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_SIMPLE: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    required: true,
    pattern: REGEX_PATTERNS.EMAIL,
    message: 'Please enter a valid email address'
  },
  PASSWORD: {
    required: true,
    pattern: REGEX_PATTERNS.PASSWORD_MEDIUM,
    message: 'Password must be at least 6 characters with letters and numbers'
  },
  NAME: {
    required: true,
    pattern: REGEX_PATTERNS.NAME,
    message: 'Name must be 2-50 characters, letters and spaces only'
  },
  PHONE: {
    pattern: REGEX_PATTERNS.PHONE_BASIC,
    message: 'Please enter a valid phone number'
  },
  ISBN: {
    pattern: REGEX_PATTERNS.ISBN_ANY,
    message: 'Please enter a valid ISBN'
  },
} as const;

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
  SHOW_TOTAL: (total: number, range: [number, number]) => 
    `${range[0]}-${range[1]} of ${total} items`,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm:ss',
  TIME: 'HH:mm:ss',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Book Status
export const BOOK_STATUS = {
  AVAILABLE: 'available',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Export all resources for easy access
export default {
  RESOURCES,
  ROUTES,
  REDIRECTS,
  NAVIGATION,
  API_ENDPOINTS,
  HTTP_METHODS,
  STATUS_CODES,
  PAGINATION,
  UPLOAD_LIMITS,
  CACHE_KEYS,
  STORAGE_KEYS,
  REGEX_PATTERNS,
  VALIDATION_RULES,
  TABLE_CONFIG,
  DATE_FORMATS,
  USER_ROLES,
  ORDER_STATUS,
  BOOK_STATUS,
  NOTIFICATION_TYPES,
};
