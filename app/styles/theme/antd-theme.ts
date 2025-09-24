/**
 * Ant Design Theme Configuration
 * Import Ant Design colors and create theme tokens
 */

import { theme } from 'antd';

// Get Ant Design default theme
const { defaultAlgorithm, defaultSeed } = theme;

// Create theme instance with all tokens
const antdTheme = {
  algorithm: defaultAlgorithm,
  token: {
    ...defaultSeed,
    // Custom overrides can be added here
  },
};

// Get the computed theme tokens
const computedTheme = theme.defaultAlgorithm(antdTheme.token);

// Export theme colors as CSS variables
export const themeColors = {
  // Primary Colors
  primary: computedTheme.colorPrimary,
  primaryHover: computedTheme.colorPrimaryHover,
  primaryActive: computedTheme.colorPrimaryActive,
  primaryBg: computedTheme.colorPrimaryBg,
  primaryBgHover: computedTheme.colorPrimaryBgHover,
  primaryBorder: computedTheme.colorPrimaryBorder,
  primaryBorderHover: computedTheme.colorPrimaryBorderHover,
  primaryText: computedTheme.colorPrimaryText,
  primaryTextHover: computedTheme.colorPrimaryTextHover,
  primaryTextActive: computedTheme.colorPrimaryTextActive,

  // Success Colors
  success: computedTheme.colorSuccess,
  successHover: computedTheme.colorSuccessHover,
  successActive: computedTheme.colorSuccessActive,
  successBg: computedTheme.colorSuccessBg,
  successBgHover: computedTheme.colorSuccessBgHover,
  successBorder: computedTheme.colorSuccessBorder,
  successBorderHover: computedTheme.colorSuccessBorderHover,
  successText: computedTheme.colorSuccessText,
  successTextHover: computedTheme.colorSuccessTextHover,
  successTextActive: computedTheme.colorSuccessTextActive,

  // Warning Colors
  warning: computedTheme.colorWarning,
  warningHover: computedTheme.colorWarningHover,
  warningActive: computedTheme.colorWarningActive,
  warningBg: computedTheme.colorWarningBg,
  warningBgHover: computedTheme.colorWarningBgHover,
  warningBorder: computedTheme.colorWarningBorder,
  warningBorderHover: computedTheme.colorWarningBorderHover,
  warningText: computedTheme.colorWarningText,
  warningTextHover: computedTheme.colorWarningTextHover,
  warningTextActive: computedTheme.colorWarningTextActive,

  // Error Colors
  error: computedTheme.colorError,
  errorHover: computedTheme.colorErrorHover,
  errorActive: computedTheme.colorErrorActive,
  errorBg: computedTheme.colorErrorBg,
  errorBgHover: computedTheme.colorErrorBgHover,
  errorBorder: computedTheme.colorErrorBorder,
  errorBorderHover: computedTheme.colorErrorBorderHover,
  errorText: computedTheme.colorErrorText,
  errorTextHover: computedTheme.colorErrorTextHover,
  errorTextActive: computedTheme.colorErrorTextActive,

  // Text Colors
  text: computedTheme.colorText,
  textSecondary: computedTheme.colorTextSecondary,
  textTertiary: computedTheme.colorTextTertiary,
  textQuaternary: computedTheme.colorTextQuaternary,
  textDisabled: computedTheme.colorTextTertiary,

  // Background Colors
  bgContainer: computedTheme.colorBgContainer,
  bgElevated: computedTheme.colorBgElevated,
  bgLayout: computedTheme.colorBgLayout,
  bgSpotlight: computedTheme.colorBgSpotlight || computedTheme.colorBgContainer,
  bgMask: computedTheme.colorBgMask || 'rgba(0, 0, 0, 0.45)',

  // Border Colors
  border: computedTheme.colorBorder,
  borderSecondary: computedTheme.colorBorderSecondary,

  // Fill Colors
  fill: computedTheme.colorFill,
  fillSecondary: computedTheme.colorFillSecondary,
  fillTertiary: computedTheme.colorFillTertiary,
  fillQuaternary: computedTheme.colorFillQuaternary,

  // Spacing
  marginXS: '4px',
  marginSM: '8px',
  marginMD: '16px',
  marginLG: '24px',
  marginXL: '32px',
  marginXXL: '48px',

  paddingXS: '4px',
  paddingSM: '8px',
  paddingMD: '16px',
  paddingLG: '24px',
  paddingXL: '32px',
  paddingXXL: '48px',

  // Border Radius
  borderRadius: antdTheme.token.borderRadius,
  borderRadiusSM: '4px',
  borderRadiusLG: '8px',
  borderRadiusXL: '8px',
};

export default antdTheme;
