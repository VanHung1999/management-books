/**
 * Enum Types for Book Management System
 * Organized by different objects and their properties
 */

// ===== BOOK RELATED ENUMS =====

/**
 * Book Status Types - Represents the different states a book can be in
 */
export enum BookStatus {
  AVAILABLE = 'available',
  LOANED = 'loaned',
  DISABLED = 'disabled',
  RENOVATED = 'renovated'
}

/**
 * Book Categories - Different categories of books
 */
export enum BookCategory {
  FICTION = 'fiction',
  NON_FICTION = 'non-fiction',
  SCIENCE = 'science',
  TECHNOLOGY = 'technology',
  HISTORY = 'history',
  BIOGRAPHY = 'biography',
  EDUCATION = 'education',
  REFERENCE = 'reference',
  CHILDREN = 'children',
  YOUNG_ADULT = 'young-adult',
  MYSTERY = 'mystery',
  ROMANCE = 'romance',
  FANTASY = 'fantasy',
  THRILLER = 'thriller',
  HORROR = 'horror',
  POETRY = 'poetry',
  DRAMA = 'drama',
  COMEDY = 'comedy',
  RELIGION = 'religion',
  PHILOSOPHY = 'philosophy',
  PSYCHOLOGY = 'psychology',
  BUSINESS = 'business',
  HEALTH = 'health',
  COOKING = 'cooking',
  TRAVEL = 'travel',
  ART = 'art',
  MUSIC = 'music',
  SPORTS = 'sports',
  OTHER = 'other'
}

/**
 * Book Condition - Physical condition of the book
 */
export enum BookCondition {
  NEW = 'new',
  LIKE_NEW = 'like-new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  DAMAGED = 'damaged'
}

/**
 * Book Format - Physical format of the book
 */
export enum BookFormat {
  HARDCOVER = 'hardcover',
  PAPERBACK = 'paperback',
  EBOOK = 'ebook',
  AUDIOBOOK = 'audiobook',
  MAGAZINE = 'magazine',
  JOURNAL = 'journal',
  NEWSPAPER = 'newspaper'
}

/**
 * Book Language - Language of the book content
 */
export enum BookLanguage {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
  FRENCH = 'fr',
  GERMAN = 'de',
  SPANISH = 'es',
  ITALIAN = 'it',
  PORTUGUESE = 'pt',
  RUSSIAN = 'ru',
  CHINESE = 'zh',
  JAPANESE = 'ja',
  KOREAN = 'ko',
  ARABIC = 'ar',
  HINDI = 'hi',
  OTHER = 'other'
}

// ===== USER RELATED ENUMS =====

/**
 * User Roles - Different roles users can have in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  LIBRARIAN = 'librarian',
  MEMBER = 'member',
  GUEST = 'guest',
  MODERATOR = 'moderator'
}

/**
 * User Status - Account status of users
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
  PENDING = 'pending'
}

/**
 * User Gender - Gender options for user profiles
 */
export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say'
}

// ===== LOAN RELATED ENUMS =====

/**
 * Loan Status - Status of book loans
 */
export enum LoanStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
  LOST = 'lost',
  DAMAGED = 'damaged',
  CANCELLED = 'cancelled'
}

/**
 * Loan Type - Type of loan transaction
 */
export enum LoanType {
  REGULAR = 'regular',
  RENEWAL = 'renewal',
  RESERVE = 'reserve',
  INTER_LIBRARY = 'inter-library',
  DIGITAL = 'digital'
}

// ===== NOTIFICATION ENUMS =====

/**
 * Notification Type - Types of notifications
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  LOAN_REMINDER = 'loan-reminder',
  OVERDUE_NOTICE = 'overdue-notice',
  RESERVATION_READY = 'reservation-ready',
  SYSTEM_UPDATE = 'system-update'
}

/**
 * Notification Priority - Priority levels for notifications
 */
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// ===== SYSTEM ENUMS =====

/**
 * System Status - Overall system status
 */
export enum SystemStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance',
  ERROR = 'error'
}

/**
 * API Response Status - Status of API responses
 */
export enum ApiResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  VALIDATION_ERROR = 'validation-error',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not-found',
  SERVER_ERROR = 'server-error'
}

/**
 * File Upload Status - Status of file uploads
 */
export enum FileUploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// ===== UI ENUMS =====

/**
 * Theme Mode - UI theme options
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

/**
 * Layout Size - Different layout sizes
 */
export enum LayoutSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large'
}

/**
 * Button Type - Different button types
 */
export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  GHOST = 'ghost',
  TEXT = 'text',
  LINK = 'link'
}

/**
 * Form Field Type - Different form field types
 */
export enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  MULTI_SELECT = 'multi-select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  DATETIME = 'datetime',
  FILE = 'file',
  URL = 'url',
  PHONE = 'phone'
}

// ===== VALIDATION ENUMS =====

/**
 * Validation Rule Type - Types of validation rules
 */
export enum ValidationRuleType {
  REQUIRED = 'required',
  MIN_LENGTH = 'min-length',
  MAX_LENGTH = 'max-length',
  MIN_VALUE = 'min-value',
  MAX_VALUE = 'max-value',
  EMAIL = 'email',
  URL = 'url',
  PHONE = 'phone',
  REGEX = 'regex',
  CUSTOM = 'custom'
}

/**
 * Validation Severity - Severity levels for validation errors
 */
export enum ValidationSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

// ===== SORT ENUMS =====

/**
 * Sort Direction - Direction for sorting
 */
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * Sort Field - Common fields for sorting
 */
export enum SortField {
  NAME = 'name',
  TITLE = 'title',
  AUTHOR = 'author',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  PUBLISHED_DATE = 'published_date',
  DUE_DATE = 'due_date',
  STATUS = 'status',
  PRIORITY = 'priority'
}

// ===== FILTER ENUMS =====

/**
 * Filter Operator - Operators for filtering
 */
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  IN = 'in',
  NOT_IN = 'not_in',
  BETWEEN = 'between',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null'
}

/**
 * Date Range - Predefined date ranges
 */
export enum DateRange {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  THIS_WEEK = 'this_week',
  LAST_WEEK = 'last_week',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  THIS_QUARTER = 'this_quarter',
  LAST_QUARTER = 'last_quarter',
  THIS_YEAR = 'this_year',
  LAST_YEAR = 'last_year',
  CUSTOM = 'custom'
}

// ===== EDIT BOOK SPECIFIC ENUMS =====

/**
 * Edit Book Form Fields - Specific fields for book editing
 */
export enum EditBookFormField {
  NAME = 'name',
  AUTHOR = 'author',
  CATEGORY = 'category',
  DESCRIPTION = 'description',
  ISBN = 'isbn',
  PUBLISHER = 'publisher',
  PUBLISHED_DATE = 'published_date',
  LANGUAGE = 'language',
  FORMAT = 'format',
  CONDITION = 'condition',
  TOTAL_COPIES = 'total_copies',
  AVAILABLE_COPIES = 'available_copies',
  LOANED_COPIES = 'loaned_copies',
  DISABLED_COPIES = 'disabled_copies',
  RENOVATED_COPIES = 'renovated_copies'
}

/**
 * Edit Book Action - Actions that can be performed on book editing
 */
export enum EditBookAction {
  UPDATE_DESCRIPTION = 'update_description',
  UPDATE_STATUS = 'update_status',
  UPDATE_INFO = 'update_info',
  ADD_COPIES = 'add_copies',
  REMOVE_COPIES = 'remove_copies',
  CHANGE_CATEGORY = 'change_category',
  CHANGE_CONDITION = 'change_condition'
}

/**
 * Edit Book Validation - Validation types specific to book editing
 */
export enum EditBookValidation {
  STATUS_TOTAL_MISMATCH = 'status_total_mismatch',
  NEGATIVE_COPIES = 'negative_copies',
  INVALID_ISBN = 'invalid_isbn',
  REQUIRED_FIELDS = 'required_fields',
  DUPLICATE_BOOK = 'duplicate_book'
}

/**
 * Edit Book UI State - UI states for the edit book page
 */
export enum EditBookUIState {
  LOADING = 'loading',
  EDITING = 'editing',
  SAVING = 'saving',
  SUCCESS = 'success',
  ERROR = 'error',
  VALIDATING = 'validating'
}

// ===== EXPORT TYPES =====

/**
 * Export all enum types for easy importing
 */
export type AllEnums = 
  | BookStatus
  | BookCategory
  | BookCondition
  | BookFormat
  | BookLanguage
  | UserRole
  | UserStatus
  | UserGender
  | LoanStatus
  | LoanType
  | NotificationType
  | NotificationPriority
  | SystemStatus
  | ApiResponseStatus
  | FileUploadStatus
  | ThemeMode
  | LayoutSize
  | ButtonType
  | FormFieldType
  | ValidationRuleType
  | ValidationSeverity
  | SortDirection
  | SortField
  | FilterOperator
  | DateRange
  | EditBookFormField
  | EditBookAction
  | EditBookValidation
  | EditBookUIState;

/**
 * Helper type to get all possible values from an enum
 */
export type EnumValues<T> = T[keyof T];

/**
 * Helper type to create a union of all enum values
 */
export type AllEnumValues = EnumValues<typeof BookStatus>
  | EnumValues<typeof BookCategory>
  | EnumValues<typeof BookCondition>
  | EnumValues<typeof BookFormat>
  | EnumValues<typeof BookLanguage>
  | EnumValues<typeof UserRole>
  | EnumValues<typeof UserStatus>
  | EnumValues<typeof UserGender>
  | EnumValues<typeof LoanStatus>
  | EnumValues<typeof LoanType>
  | EnumValues<typeof NotificationType>
  | EnumValues<typeof NotificationPriority>
  | EnumValues<typeof SystemStatus>
  | EnumValues<typeof ApiResponseStatus>
  | EnumValues<typeof FileUploadStatus>
  | EnumValues<typeof ThemeMode>
  | EnumValues<typeof LayoutSize>
  | EnumValues<typeof ButtonType>
  | EnumValues<typeof FormFieldType>
  | EnumValues<typeof ValidationRuleType>
  | EnumValues<typeof ValidationSeverity>
  | EnumValues<typeof SortDirection>
  | EnumValues<typeof SortField>
  | EnumValues<typeof FilterOperator>
  | EnumValues<typeof DateRange>
  | EnumValues<typeof EditBookFormField>
  | EnumValues<typeof EditBookAction>
  | EnumValues<typeof EditBookValidation>
  | EnumValues<typeof EditBookUIState>;

// ===== ENUM UTILITY FUNCTIONS =====

/**
 * Get all values from an enum as an array
 */
export function getEnumValues<T extends Record<string, string | number>>(enumObject: T): T[keyof T][] {
  return Object.values(enumObject) as T[keyof T][];
}

/**
 * Get all keys from an enum as an array
 */
export function getEnumKeys<T extends Record<string, string | number>>(enumObject: T): (keyof T)[] {
  return Object.keys(enumObject);
}

/**
 * Check if a value is a valid enum value
 */
export function isValidEnumValue<T extends Record<string, string | number>>(
  enumObject: T, 
  value: unknown
): value is T[keyof T] {
  return Object.values(enumObject).includes(value as T[keyof T]);
}

/**
 * Get enum key by value
 */
export function getEnumKeyByValue<T extends Record<string, string | number>>(
  enumObject: T, 
  value: T[keyof T]
): keyof T | undefined {
  return Object.keys(enumObject).find(key => enumObject[key] === value);
}

/**
 * Create a mapping object from enum values to labels
 */
export function createEnumLabelMap<T extends Record<string, string | number>>(
  enumObject: T,
  labelFunction?: (key: keyof T, value: T[keyof T]) => string
): Record<T[keyof T], string> {
  const map: Record<string, string> = {};
  
  Object.entries(enumObject).forEach(([key, value]) => {
    const label = labelFunction 
      ? labelFunction(key as keyof T, value as T[keyof T])
      : key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    
    map[value as string] = label;
  });
  
  return map as Record<T[keyof T], string>;
}
