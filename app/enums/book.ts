/**
 * Book-related enums and constants
 * Extracted from books page for better organization
 */

/**
 * Search type options for book filtering and searching
 */
export enum SearchType {
  NONE = "none",
  NAME = "name",
  AUTHOR = "author"
}

/**
 * Sort order options for book sorting
 * @deprecated Use SortDirection from utils/sort instead
 */
export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

/**
 * Category filter options for books
 */
export enum CategoryFilter {
  ALL = "all"
}

/**
 * Book status options
 */
export enum BookStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance",
  LOST = "lost"
}

/**
 * Book condition options
 */
export enum BookCondition {
  NEW = "new",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
  DAMAGED = "damaged"
}

/**
 * Book format options
 */
export enum BookFormat {
  HARDCOVER = "hardcover",
  PAPERBACK = "paperback",
  EBOOK = "ebook",
  AUDIOBOOK = "audiobook",
  MAGAZINE = "magazine",
  JOURNAL = "journal"
}

/**
 * Book language options
 */
export enum BookLanguage {
  VIETNAMESE = "vi",
  ENGLISH = "en",
  CHINESE = "zh",
  JAPANESE = "ja",
  KOREAN = "ko",
  FRENCH = "fr",
  GERMAN = "de",
  SPANISH = "es",
  RUSSIAN = "ru"
}

/**
 * Book genre categories
 */
export enum BookGenre {
  FICTION = "fiction",
  NON_FICTION = "non_fiction",
  SCIENCE = "science",
  TECHNOLOGY = "technology",
  HISTORY = "history",
  BIOGRAPHY = "biography",
  AUTOBIOGRAPHY = "autobiography",
  PHILOSOPHY = "philosophy",
  RELIGION = "religion",
  ART = "art",
  LITERATURE = "literature",
  POETRY = "poetry",
  DRAMA = "drama",
  COMEDY = "comedy",
  MYSTERY = "mystery",
  THRILLER = "thriller",
  ROMANCE = "romance",
  FANTASY = "fantasy",
  SCIENCE_FICTION = "science_fiction",
  HORROR = "horror",
  ADVENTURE = "adventure",
  TRAVEL = "travel",
  COOKING = "cooking",
  HEALTH = "health",
  BUSINESS = "business",
  EDUCATION = "education",
  REFERENCE = "reference",
  CHILDREN = "children",
  YOUNG_ADULT = "young_adult"
}

/**
 * Book loan status
 */
export enum LoanStatus {
  ACTIVE = "active",
  RETURNED = "returned",
  OVERDUE = "overdue",
  LOST = "lost",
  DAMAGED = "damaged"
}

/**
 * Book search fields
 */
export enum BookSearchField {
  TITLE = "title",
  AUTHOR = "author",
  ISBN = "isbn",
  PUBLISHER = "publisher",
  CATEGORY = "category",
  DESCRIPTION = "description",
  KEYWORDS = "keywords"
}
