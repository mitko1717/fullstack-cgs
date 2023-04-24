export const THEME: any = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40'
  },
  fonts: {
    primary: 'Arial, sans-serif',
    secondary: 'Helvetica, sans-serif'
  },
  fontSizes: {
    small: '12px',
    medium: '16px',
    large: '20px'
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px'
  },
  margins: {
    mb: (value: keyof (typeof THEME)['spacing']) => `margin-bottom: ${THEME.spacing[value]};`,
    mt: (value: keyof (typeof THEME)['spacing']) => `margin-top: ${THEME.spacing[value]};`,
    ml: (value: keyof (typeof THEME)['spacing']) => `margin-left: ${THEME.spacing[value]};`,
    mr: (value: keyof (typeof THEME)['spacing']) => `margin-right: ${THEME.spacing[value]};`,
    mx: (value: keyof (typeof THEME)['spacing']) =>
      `margin-left: ${THEME.spacing[value]}; margin-right: ${THEME.spacing[value]};`,
    my: (value: keyof (typeof THEME)['spacing']) =>
      `margin-top: ${THEME.spacing[value]}; margin-bottom: ${THEME.spacing[value]};`
  },
  paddings: {
    pb: (value: keyof (typeof THEME)['spacing']) => `padding-bottom: ${THEME.spacing[value]};`,
    pt: (value: keyof (typeof THEME)['spacing']) => `padding-top: ${THEME.spacing[value]};`,
    pl: (value: keyof (typeof THEME)['spacing']) => `padding-left: ${THEME.spacing[value]};`,
    pr: (value: keyof (typeof THEME)['spacing']) => `padding-right: ${THEME.spacing[value]};`,
    px: (value: keyof (typeof THEME)['spacing']) =>
      `padding-left: ${THEME.spacing[value]}; padding-right: ${THEME.spacing[value]};`,
    py: (value: keyof (typeof THEME)['spacing']) =>
      `padding-top: ${THEME.spacing[value]}; padding-bottom: ${THEME.spacing[value]};`
  },

  mediaQueries: {
    desktop: `@media (min-width: 1024px) {
          :root {
            --device: desktop;
          }
        }`,
    tablet: `@media (min-width: 768px) and (max-width: 1023px) {
          :root {
            --device: tablet;
          }
        }`,
    mobile: `@media (max-width: 767px) {
          :root {
            --device: mobile;
          }
        }`
  }
};
