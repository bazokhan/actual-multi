import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = extendTheme({
  ...config,
  styles: {
    global: props => ({
      body: {
        bg: mode('bg.200', 'bg.800')(props),
        color: mode('bg.800', 'bg.200')(props)
      },
      section: {
        bg: mode('bg.200', 'bg.800')(props),
        color: mode('bg.800', 'bg.200')(props)
      },
      header: {
        bg: mode('bg.200', 'bg.800')(props),
        color: mode('bg.800', 'bg.200')(props)
      },
      footer: {
        bg: mode('bg.200', 'bg.800')(props),
        color: mode('bg.800', 'bg.200')(props)
      },
      a: {
        color: mode('bg.800', 'bg.200')(props),
        _hover: {
          color: mode('bg.600', 'bg.400')(props)
        }
      }
    })
  },
  colors: {
    main1: {
      100: '#FFFFFF',
      200: '#8BEFFF',
      300: '#8BF7FF',
      400: '#81ECEC',
      500: '#65B9B9',
      600: '#498585',
      700: '#2D5252',
      800: '#111F1F',
      900: '#000000'
    },
    main2: {
      100: '#FFFFFF',
      200: '#AF9BFF',
      300: '#A99BFF',
      400: '#A29BFE',
      500: '#817BCB',
      600: '#605C97',
      700: '#3F3C64',
      800: '#1E1D30',
      900: '#000000'
    },
    bg: {
      100: '#FFFFFF',
      200: '#F5F4FF',
      300: '#F4FAFF',
      400: '#DFE6E9',
      500: '#AEB3B5',
      600: '#7C8082',
      700: '#4B4D4E',
      800: '#191A1B',
      900: '#000000'
    }
  },
  components: {
    Button: {
      variants: {
        solid: props => ({
          bg: mode('main1.200', 'main1.800')(props),
          color: mode('bg.800', 'bg.200')(props),
          padding: '10px 20px',
          borderRadius: '0px',
          _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          },
          _active: {
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          }
        }),
        ghost: props => ({
          bg: mode('transparent', 'transparent')(props),
          color: mode('bg.800', 'bg.200')(props),
          padding: '10px 20px',
          borderRadius: '0px',
          _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: mode('bg.400', 'bg.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          },
          _active: {
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          }
        })
      }
    },
    IconButton: {
      variants: {
        solid: props => ({
          bg: mode('main1.200', 'main1.800')(props),
          color: mode('bg.800', 'bg.200')(props),
          padding: '10px 20px',
          borderRadius: '0px',
          _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          },
          _active: {
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          }
        }),
        ghost: props => ({
          bg: mode('transparent', 'transparent')(props),
          color: mode('bg.800', 'bg.200')(props),
          padding: '10px 20px',
          borderRadius: '0px',
          _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: mode('bg.400', 'bg.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          },
          _active: {
            bg: mode('main1.400', 'main1.600')(props),
            color: mode('bg.900', 'bg.100')(props),
            boxShadow: 'md'
          }
        })
      }
    }
  }
});

export default theme;
