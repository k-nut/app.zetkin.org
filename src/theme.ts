import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import { createElement } from 'react';
import { createTheme } from '@mui/material/styles';
import { Figtree } from 'next/font/google';
import { Localization } from '@mui/x-data-grid/utils/getGridLocalization';
import { daDK, deDE, nbNO, svSE } from '@mui/x-data-grid-pro';

import { themePalette } from 'themePalette';

//Font family
const figtree = Figtree({ subsets: ['latin-ext'] });

const oldThemePalette = {
  background: {
    default: '#F9F9F9',
  },
  error: {
    main: '#EE323E',
  },
  filterCategoryColors: {
    darkBlue: { pale: '#BED0F9', strong: '#2563EB' },
    green: { pale: '#D1F39A', strong: '#A3E635' },
    lightBlue: { pale: '#93E9EB', strong: '#28D4D7' },
    orange: { pale: '#FDD497', strong: '#FBA930' },
    pink: { pale: ' #FCE4EC', strong: '#F48FB1' },
    purple: { pale: '#E5C0F5', strong: '#C026D3' },
    red: { pale: '#F1A8A8', strong: '#DC2626' },
    teal: { pale: '#99E9CC ', strong: '#34D399' },
    yellow: { pale: '#EEEA8F', strong: '#DDD520' },
  },
  info: {
    main: '#3598c5',
  },
  onSurface: {
    disabled: '#231F2061',
    high: '#231F20DE',
    medium: '#231F2099',
  },
  outline: {
    main: 'rgba(0,0,0,0.12)',
  },
  primary: {
    main: '#ED1C55',
  },
  secondary: {
    light: '#9f9f9f',
    main: 'rgba(0, 0, 0, 0.6)',
  },
  statusColors: {
    blue: 'rgba(25, 118, 210, 1)',
    gray: 'rgba(0, 0, 0, 0.12)',
    green: 'rgba(102, 187, 106, 1)',
    orange: 'rgba(245, 124, 0, 1)',
    red: 'rgba(239, 83, 80, 1)',
  },
  success: {
    light: '#9fdfb8',
    main: '#0eae4e',
  },
  text: {
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
  transparentGrey: {
    light: 'rgba(0,0,0,0.04)',
  },
  viewColumnGallery: {
    blue: '#1976D2',
    purple: '#BA68C8',
    red: '#ED1C55',
  },
  warning: {
    main: '#ee8432',
  },
};

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '1rem',
          textTransform: 'uppercase',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-cell': {
            fontSize: 16,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: themePalette.onSurface.medium,
            fontWeight: 'bold',
          },
          '& [role="toolbar"]': {
            '& > *': {
              margin: '0 4px',
              marginRight: 15,
              marginTop: 5,
            },
            display: 'flex',
            justifyContent: 'flex-end',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: 120,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        colorSecondary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#ED1C55',
          },
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 3000,
      },
    },
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          children: createElement('span'),
        },
        indicatorColor: 'primary',
        textColor: 'primary',
      },
      styleOverrides: {
        indicator: {
          '& > span': {
            backgroundColor: '#ED1C55',
            maxWidth: 100,
            width: '100%',
          },
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
        },
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
        },
      },
    },
  },
  palette: oldThemePalette,
  typography: {
    fontFamily: 'azo-sans-web, sans-serif',
    h2: {
      lineHeight: 'unset',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
});

// The new theme.
export const newTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '&.MuiButton-containedError': {
              backgroundColor: '#EE7B7B',
            },
            '&.MuiButton-containedPrimary': {
              backgroundColor: '#5D5D5D',
              color: '#B0B0B0',
            },
            '&.MuiButton-containedWarning': {
              backgroundColor: '#FAED8E',
            },
            '&.MuiButton-outlinedPrimary': {
              borderColor: '#B0B0B0',
              color: '#888888',
            },
            '&.MuiButton-textPrimary': {
              color: '#888888',
            },
          },
          ':hover': {
            boxShadow: 'none',
          },
          boxShadow: 'none',
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#B0B0B0',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.625rem',
          fontWeight: 600,
          lineHeight: '0.875rem',
        },
      },
    },
  },
  elevation: {
    bottom: {
      big: {
        light: '0rem 0.25rem 2.5rem 0rem #00000014',
        medium: '0rem 0.25rem 2.5rem 0rem #0000001F',
      },
      small: {
        light: '0rem 0.25rem 1.25rem 0rem #00000014',
        medium: '0rem 0.25rem 1.25rem 0rem #0000001F',
      },
    },
    top: {
      big: {
        light: '0.rem -0.25rem 2.25rem 0rem #00000014',
        medium: '0rem -0.25rem 2.25rem 0rem #0000001F',
      },
      small: {
        light: '0rem -0.25rem 1.25rem 0rem #00000014',
        medium: '0rem -0.25rem 1.25rem 0rem #0000001F',
      },
    },
  },
  palette: themePalette,
  typography: {
    body1: undefined,
    body2: undefined,
    bodyMdRegular: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 300,
      letterSpacing: '0.01rem',
      lineHeight: '1.5rem',
    },
    bodyMdSemiBold: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.01rem',
      lineHeight: '1.5rem',
    },
    bodySmRegular: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 300,
      letterSpacing: '0.01rem',
      lineHeight: '1.313rem',
    },
    bodySmSemiBold: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.01rem',
      lineHeight: '1.313rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: undefined,
    fontFamily: figtree.style.fontFamily,
    fontSize: 16,
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
    headingLg: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1.375rem',
      fontWeight: 400,
      letterSpacing: '-0.005rem',
      lineHeight: '1.788rem',
    },
    headingMd: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1.125rem',
      fontWeight: 400,
      letterSpacing: '-0.005rem',
      lineHeight: '1.463rem',
    },
    headingSm: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '-0.005rem',
      lineHeight: '1.3rem',
    },
    labelLgMedium: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.938rem',
      fontWeight: 400,
      letterSpacing: '0.03rem',
      lineHeight: '1.406rem',
    },
    labelLgSemiBold: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.938rem',
      fontWeight: 500,
      letterSpacing: '0.03rem',
      lineHeight: '1.406rem',
    },
    labelMdMedium: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.03rem',
      lineHeight: '1.313rem',
    },
    labelMdRegular: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 300,
      letterSpacing: '0.03rem',
      lineHeight: '1.313rem',
    },
    labelMdSemiBold: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.03rem',
      lineHeight: '1.313rem',
    },
    labelSmMedium: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.813rem',
      fontWeight: 400,
      letterSpacing: '0.03rem',
      lineHeight: '1.219rem',
    },
    labelSmSemiBold: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.813rem',
      fontWeight: 500,
      letterSpacing: '0.03rem',
      lineHeight: '1.219rem',
    },
    labelXlMedium: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.03rem',
      lineHeight: '1.5rem',
    },
    linkMd: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: '1.5rem',
    },
    linkSm: {
      fontFamily: figtree.style.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: '1.313rem',
    },
    overline: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
  },
});

const locales: Record<string, Localization> = {};
locales['da'] = daDK;
locales['de'] = deDE;
locales['nn'] = nbNO;
locales['sv'] = svSE;

export const themeWithLocale = (lang: string) => {
  return createTheme(theme, locales[lang]);
};

export default theme;
