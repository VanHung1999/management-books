/**
 * Constants for Book Edit Page
 * Centralized configuration for resources, messages, and validation rules
 */

import { 
  BookStatus, 
  BookCategory, 
  BookCondition, 
  BookFormat, 
  BookLanguage,
  NotificationType,
  ValidationRuleType,
  ButtonType,
  FormFieldType,
  EditBookFormField,
  EditBookAction,
  EditBookValidation,
  EditBookUIState
} from '../enums/editBook';

// ===== RESOURCES =====
export const RESOURCES = {
  BOOKS: 'books',
} as const;

// ===== API ENDPOINTS =====
export const API_ENDPOINTS = {
  BOOKS: '/books',
} as const;

// ===== ROUTES & NAVIGATION =====
export const ROUTES = {
  // Main pages
  HOME: '/',
  BOOKS: '/books',
  BOOKS_DETAIL: '/books/[id]',
  BOOKS_EDIT: '/books/[id]/edit',
  BOOKS_CREATE: '/books/create',
  
  // Auth pages
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Profile pages
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_SETTINGS: '/profile/settings',
  
  // Admin pages
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_BOOKS: '/admin/books',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_LOANS: '/admin/loans',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_OVERVIEW: '/dashboard/overview',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  
  // Error pages
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
} as const;

// ===== ROUTE PARAMETERS =====
export const ROUTE_PARAMS = {
  ID: '[id]',
  SLUG: '[slug]',
  CATEGORY: '[category]',
} as const;

// ===== ROUTE HELPERS =====
export const ROUTE_BUILDERS = {
  // Dynamic routes with parameters
  bookDetail: (id: string | number) => `/books/${id}`,
  bookEdit: (id: string | number) => `/books/${id}/edit`,
  bookCreate: () => '/books/create',
  
  // Category routes
  booksByCategory: (category: string) => `/books/category/${category}`,
  
  // User routes
  userProfile: (userId: string | number) => `/users/${userId}`,
  userBooks: (userId: string | number) => `/users/${userId}/books`,
  
  // Admin routes
  adminUserDetail: (userId: string | number) => `/admin/users/${userId}`,
  adminBookDetail: (bookId: string | number) => `/admin/books/${bookId}`,
  
  // Search routes
  searchBooks: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  searchBooksByCategory: (query: string, category: string) => 
    `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`,
} as const;

// ===== NAVIGATION CONFIGURATION =====
export const NAVIGATION = {
  // Main navigation items
  MAIN_MENU: [
    { key: 'home', label: 'Home', path: ROUTES.HOME, icon: 'HomeOutlined' },
    { key: 'books', label: 'Books', path: ROUTES.BOOKS, icon: 'BookOutlined' },
    { key: 'dashboard', label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'DashboardOutlined' },
  ],
  
  // User menu items
  USER_MENU: [
    { key: 'profile', label: 'Profile', path: ROUTES.PROFILE, icon: 'UserOutlined' },
    { key: 'settings', label: 'Settings', path: ROUTES.PROFILE_SETTINGS, icon: 'SettingOutlined' },
    { key: 'logout', label: 'Logout', path: ROUTES.LOGIN, icon: 'LogoutOutlined' },
  ],
  
  // Admin menu items
  ADMIN_MENU: [
    { key: 'admin-overview', label: 'Overview', path: ROUTES.ADMIN, icon: 'DashboardOutlined' },
    { key: 'admin-users', label: 'Users', path: ROUTES.ADMIN_USERS, icon: 'UserOutlined' },
    { key: 'admin-books', label: 'Books', path: ROUTES.ADMIN_BOOKS, icon: 'BookOutlined' },
    { key: 'admin-categories', label: 'Categories', path: ROUTES.ADMIN_CATEGORIES, icon: 'FolderOutlined' },
    { key: 'admin-loans', label: 'Loans', path: ROUTES.ADMIN_LOANS, icon: 'SwapOutlined' },
  ],
} as const;

// ===== BREADCRUMB CONFIGURATION =====
export const BREADCRUMBS = {
  // Book related breadcrumbs
  BOOKS: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Books', path: ROUTES.BOOKS },
  ],
  
  BOOK_DETAIL: (bookName: string) => [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Books', path: ROUTES.BOOKS },
    { label: bookName, path: null }, // Current page, no link
  ],
  
  BOOK_EDIT: (bookName: string, bookId: string) => [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Books', path: ROUTES.BOOKS },
    { label: bookName, path: ROUTE_BUILDERS.bookDetail(bookId) },
    { label: 'Edit', path: null }, // Current page, no link
  ],
  
  BOOK_CREATE: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Books', path: ROUTES.BOOKS },
    { label: 'Create New Book', path: null }, // Current page, no link
  ],
  
  // Dashboard breadcrumbs
  DASHBOARD: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
  ],
  
  // Profile breadcrumbs
  PROFILE: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Profile', path: ROUTES.PROFILE },
  ],
  
  PROFILE_EDIT: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Profile', path: ROUTES.PROFILE },
    { label: 'Edit Profile', path: null }, // Current page, no link
  ],
} as const;

// ===== REDIRECT CONFIGURATION =====
export const REDIRECTS = {
  // After successful actions
  AFTER_LOGIN: ROUTES.DASHBOARD,
  AFTER_LOGOUT: ROUTES.HOME,
  AFTER_REGISTER: ROUTES.PROFILE,
  
  // After book operations
  AFTER_BOOK_CREATE: (bookId: string) => ROUTE_BUILDERS.bookDetail(bookId),
  AFTER_BOOK_UPDATE: (bookId: string) => ROUTE_BUILDERS.bookDetail(bookId),
  AFTER_BOOK_DELETE: ROUTES.BOOKS,
  
  // After profile operations
  AFTER_PROFILE_UPDATE: ROUTES.PROFILE,
  
  // Error redirects
  ON_UNAUTHORIZED: ROUTES.LOGIN,
  ON_NOT_FOUND: ROUTES.NOT_FOUND,
  ON_SERVER_ERROR: ROUTES.SERVER_ERROR,
} as const;

// ===== NOTIFICATION MESSAGES =====
export const NOTIFICATION_MESSAGES = {
  SUCCESS: {
    BOOK_DESCRIPTION_UPDATED: {
      type: NotificationType.SUCCESS,
      message: 'Success',
      description: 'Book description updated successfully!'
    },
    BOOK_STATUS_UPDATED: {
      type: NotificationType.SUCCESS, 
      message: 'Success', 
      description: 'Book status updated successfully!'
    },
    UPDATE_SUCCESSFUL: {
      type: NotificationType.SUCCESS,
      message: 'Update successful',
      description: 'Book description has been updated'
    },
    STATUS_UPDATE_SUCCESSFUL: {
      type: NotificationType.SUCCESS,
      message: 'Status update successful',
      description: 'Book status has been updated'
    }
  },
  ERROR: {
    UPDATE_FAILED: {
      type: NotificationType.ERROR,
      message: 'Update failed',
      description: 'Could not update book description'
    },
    STATUS_UPDATE_FAILED: {
      type: NotificationType.ERROR,
      message: 'Status update failed', 
      description: 'Could not update book status'
    },
    VALIDATION_ERROR: {
      type: NotificationType.ERROR,
      message: 'Validation Error',
      description: 'Total must equal {total} (current total: {current})'
    }
  }
} as const;

// ===== VALIDATION RULES =====
export const VALIDATION_RULES = {
  DESCRIPTION: {
    REQUIRED: {
      type: ValidationRuleType.REQUIRED,
      message: 'Please enter book description!'
    },
    MIN_LENGTH: {
      type: ValidationRuleType.MIN_LENGTH,
      message: 'Book description must be at least 10 characters!',
      value: 10
    }
  },
  STATUS: {
    REQUIRED: {
      type: ValidationRuleType.REQUIRED,
      message: 'Required!'
    },
    MIN_VALUE: {
      type: ValidationRuleType.MIN_VALUE,
      message: 'Must be >= 0!',
      value: 0
    }
  }
} as const;

// ===== FORM CONFIGURATION =====
export const FORM_CONFIG = {
  DESCRIPTION: {
    TYPE: FormFieldType.TEXTAREA,
    TEXTAREA_ROWS: 6,
    PLACEHOLDER: 'Enter book description...'
  },
  STATUS: {
    TYPE: FormFieldType.NUMBER,
    INPUT_MIN: 0,
    PLACEHOLDERS: {
      AVAILABLE: 'Available',
      LOANED: 'Loaned (read-only)',
      DISABLED: 'Disabled', 
      RENOVATED: 'Renovated'
    }
  }
} as const;

// ===== STATUS TYPES =====
export const STATUS_TYPES = {
  AVAILABLE: BookStatus.AVAILABLE,
  LOANED: BookStatus.LOANED, 
  DISABLED: BookStatus.DISABLED,
  RENOVATED: BookStatus.RENOVATED
} as const;

// ===== STATUS LABELS =====
export const STATUS_LABELS = {
  AVAILABLE: 'Available',
  LOANED: 'Loaned',
  DISABLED: 'Disabled', 
  RENOVATED: 'Renovated'
} as const;

// ===== CSS CLASS MAPPINGS =====
export const CSS_CLASS_MAPS = {
  STATUS_CARD: {
    available: 'statusCardAvailable',
    loaned: 'statusCardLoaned',
    disabled: 'statusCardDisabled',
    renovated: 'statusCardRenovated'
  },
  STATUS_NUMBER: {
    available: 'statusNumberAvailable',
    loaned: 'statusNumberLoaned', 
    disabled: 'statusNumberDisabled',
    renovated: 'statusNumberRenovated'
  },
  STATUS_LABEL: {
    available: 'statusLabelAvailable',
    loaned: 'statusLabelLoaned',
    disabled: 'statusLabelDisabled', 
    renovated: 'statusLabelRenovated'
  }
} as const;

// ===== UI TEXT =====
export const UI_TEXT = {
  LOADING: {
    TITLE: 'Loading...',
    ICON: 'BookOutlined'
  },
  ERROR: {
    TITLE: 'Book not found',
    BUTTON: 'Back to books'
  },
  BUTTONS: {
    BACK_TO_DETAIL: 'Back to book detail',
    EDIT_STATUS: 'Edit Status',
    CANCEL: 'Cancel',
    UPDATE_STATUS: 'Update Status',
    UPDATING: 'Updating...',
    UPDATE_DESCRIPTION: 'Update description'
  },
  CARD_TITLES: {
    STATUS_MANAGEMENT: 'Book Status Management',
    EDIT_DESCRIPTION: 'Edit book description',
    CURRENT_DESCRIPTION: 'Current description'
  },
  STATUS_INFO: {
    TOTAL_COPIES: 'Total Copies (num): {num} • Current Total: {current}',
    WARNING: 'Warning: Current total ({current}) doesn\'t match total copies ({num})'
  },
  VALIDATION_INFO: {
    RULES: 'Validation Rules:',
    TOTAL_MUST_EQUAL: '• Total must equal {num} copies (Current: {current})',
    VALUES_GREATER_EQUAL: '• All values must be >= 0',
    TOTAL_UNCHANGED: '• Note: Total copies (num) will remain unchanged',
    LOANED_READONLY: '• Note: Loaned count cannot be modified (read-only)'
  }
} as const;

// ===== RESPONSIVE BREAKPOINTS =====
export const RESPONSIVE_CONFIG = {
  STATUS_CARDS: {
    xs: 12,
    sm: 6
  },
  INPUT_FIELDS: {
    xs: 12, 
    sm: 6
  }
} as const;

// ===== ENUM-BASED CONSTANTS =====

/**
 * Book Categories with Labels
 */
export const BOOK_CATEGORIES = {
  [BookCategory.FICTION]: 'Fiction',
  [BookCategory.NON_FICTION]: 'Non-Fiction',
  [BookCategory.SCIENCE]: 'Science',
  [BookCategory.TECHNOLOGY]: 'Technology',
  [BookCategory.HISTORY]: 'History',
  [BookCategory.BIOGRAPHY]: 'Biography',
  [BookCategory.EDUCATION]: 'Education',
  [BookCategory.REFERENCE]: 'Reference',
  [BookCategory.CHILDREN]: 'Children',
  [BookCategory.YOUNG_ADULT]: 'Young Adult',
  [BookCategory.MYSTERY]: 'Mystery',
  [BookCategory.ROMANCE]: 'Romance',
  [BookCategory.FANTASY]: 'Fantasy',
  [BookCategory.THRILLER]: 'Thriller',
  [BookCategory.HORROR]: 'Horror',
  [BookCategory.POETRY]: 'Poetry',
  [BookCategory.DRAMA]: 'Drama',
  [BookCategory.COMEDY]: 'Comedy',
  [BookCategory.RELIGION]: 'Religion',
  [BookCategory.PHILOSOPHY]: 'Philosophy',
  [BookCategory.PSYCHOLOGY]: 'Psychology',
  [BookCategory.BUSINESS]: 'Business',
  [BookCategory.HEALTH]: 'Health',
  [BookCategory.COOKING]: 'Cooking',
  [BookCategory.TRAVEL]: 'Travel',
  [BookCategory.ART]: 'Art',
  [BookCategory.MUSIC]: 'Music',
  [BookCategory.SPORTS]: 'Sports',
  [BookCategory.OTHER]: 'Other'
} as const;

/**
 * Book Formats with Labels
 */
export const BOOK_FORMATS = {
  [BookFormat.HARDCOVER]: 'Hardcover',
  [BookFormat.PAPERBACK]: 'Paperback',
  [BookFormat.EBOOK]: 'E-Book',
  [BookFormat.AUDIOBOOK]: 'Audiobook',
  [BookFormat.MAGAZINE]: 'Magazine',
  [BookFormat.JOURNAL]: 'Journal',
  [BookFormat.NEWSPAPER]: 'Newspaper'
} as const;

/**
 * Book Conditions with Labels
 */
export const BOOK_CONDITIONS = {
  [BookCondition.NEW]: 'New',
  [BookCondition.LIKE_NEW]: 'Like New',
  [BookCondition.GOOD]: 'Good',
  [BookCondition.FAIR]: 'Fair',
  [BookCondition.POOR]: 'Poor',
  [BookCondition.DAMAGED]: 'Damaged'
} as const;

/**
 * Book Languages with Labels
 */
export const BOOK_LANGUAGES = {
  [BookLanguage.ENGLISH]: 'English',
  [BookLanguage.VIETNAMESE]: 'Vietnamese',
  [BookLanguage.FRENCH]: 'French',
  [BookLanguage.GERMAN]: 'German',
  [BookLanguage.SPANISH]: 'Spanish',
  [BookLanguage.ITALIAN]: 'Italian',
  [BookLanguage.PORTUGUESE]: 'Portuguese',
  [BookLanguage.RUSSIAN]: 'Russian',
  [BookLanguage.CHINESE]: 'Chinese',
  [BookLanguage.JAPANESE]: 'Japanese',
  [BookLanguage.KOREAN]: 'Korean',
  [BookLanguage.ARABIC]: 'Arabic',
  [BookLanguage.HINDI]: 'Hindi',
  [BookLanguage.OTHER]: 'Other'
} as const;

/**
 * Edit Book Form Fields Configuration
 */
export const EDIT_BOOK_FORM_FIELDS = {
  [EditBookFormField.NAME]: {
    type: FormFieldType.TEXT,
    label: 'Book Name',
    required: true,
    placeholder: 'Enter book name'
  },
  [EditBookFormField.AUTHOR]: {
    type: FormFieldType.TEXT,
    label: 'Author',
    required: true,
    placeholder: 'Enter author name'
  },
  [EditBookFormField.CATEGORY]: {
    type: FormFieldType.SELECT,
    label: 'Category',
    required: true,
    options: BOOK_CATEGORIES
  },
  [EditBookFormField.DESCRIPTION]: {
    type: FormFieldType.TEXTAREA,
    label: 'Description',
    required: false,
    placeholder: 'Enter book description'
  },
  [EditBookFormField.ISBN]: {
    type: FormFieldType.TEXT,
    label: 'ISBN',
    required: false,
    placeholder: 'Enter ISBN number'
  },
  [EditBookFormField.PUBLISHER]: {
    type: FormFieldType.TEXT,
    label: 'Publisher',
    required: false,
    placeholder: 'Enter publisher name'
  },
  [EditBookFormField.LANGUAGE]: {
    type: FormFieldType.SELECT,
    label: 'Language',
    required: true,
    options: BOOK_LANGUAGES
  },
  [EditBookFormField.FORMAT]: {
    type: FormFieldType.SELECT,
    label: 'Format',
    required: true,
    options: BOOK_FORMATS
  },
  [EditBookFormField.CONDITION]: {
    type: FormFieldType.SELECT,
    label: 'Condition',
    required: true,
    options: BOOK_CONDITIONS
  }
} as const;

// ===== TYPE DEFINITIONS =====
export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];
export type ResourceType = typeof RESOURCES[keyof typeof RESOURCES];
export type BookCategoryType = keyof typeof BOOK_CATEGORIES;
export type BookFormatType = keyof typeof BOOK_FORMATS;
export type BookConditionType = keyof typeof BOOK_CONDITIONS;
export type BookLanguageType = keyof typeof BOOK_LANGUAGES;
