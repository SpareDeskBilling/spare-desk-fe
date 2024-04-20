const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '400px',
      tall: { raw: '(min-width: 700px), (min-height: 800px)' },
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        alabaster: '#F9FAFF',
        almond: '#EFDCCA',
        blackGreen: '#1A191C',
        blackCow: '#4A4844',
        blueBell: '#94A4C9',
        cloud: '#C4C4C4',
        comet: '#5B6275',
        coralRed: '#F64040',
        davyGrey: '#4B5563',
        dawnPink: '#EBECED',
        greenHaze: '#07B055',
        greyCloud: '#B4B7BD',
        greyChateau: '#A5AAB1',
        grey: '#999690',
        harp: '#E9EDF2',
        hawksBlue: '#D4DDFC',
        lemonGrass: '#999999',
        linen: '#FEECEC',
        lightGrey: '#D9D9D9',
        lightOrange: '#FFEFE0',
        offGreen: '#E6F7F6',
        oldLace: '#FEF5E9',
        osloGrey: '#858D9D',
        paleGreen: '#EBFFF4',
        paleSlate: '#BFBFBF',
        persianGreen: '#0AAAA1',
        primaryColor: '#2653F1',
        rhino: '#394466',
        roseWhite: '#FFF6F6',
        santaGrey: '#9AA3B0',
        secondaryColor: '#5E7799',
        slateGrey: '#7E818D',
        snowDrift: '#F3FBF7',
        tealishBlue: '#96B5F7',
        titanWhite: '#E9EEFE',
        whiteLilac: '#F6F6F6',
        whiteSmoke: '#F3F5F7',
        warningRed: '#F55E5E',
        mercury: '#E5E7EB',
        frenchBlue: '#0B78C2',
        tropicalBlue: '#CCDAEB',
        cloudyBlue: '#A6C9E1',
        softPeach: '#EDEDED',
        ghostWhite: '#FAFAFA',
        aquaSqueeze: '#E6F7EE',
        pastelOrange: '#F69A40',
        lightPink: '#FEF2F2',
        floralWhite: '#FFFAF6',
        milkWhite: '#FFFBFB',
        lavenderMist: '#DEE5FD',
        amour: '#FCE9E9'
      },
      animation: {
        'slide-to-left': 'slide-left 0.7s ease-in forwards',
        'slide-out-to-left': 'slide-out-left 0.7s ease-in forwards',
        'slide-to-right': 'slide-right 0.7s ease-in forwards',
        'slide-out-from-right': 'slide-out-right 0.7s ease-in forwards',
        'zoom-to-front': 'zoom-in 0.7s ease-in-out',
        'zoom-to-front-fast': 'zoom-in 0.25s ease-in-out',
        'zoom-to-back': 'zoom-out 0.7s ease-in-out forwards',
        'ripple-effect': 'ripple 3s ease forwards',
        rotate: 'rotation 2s infinite',
        'loading-ellipsis': 'ellipsis steps(4,end) 900ms infinite',
        'slide-infinite': 'slide-back-and-forth 1.5s ease-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        'slide-left': {
          '0%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        },
        'slide-out-left': {
          '0%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        'slide-back-and-forth': {
          '0%': {
            transform: 'translateX(-50%)'
          },
          '50%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'slide-out-right': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        },
        'zoom-in': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: 0
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1
          }
        },
        'zoom-out': {
          '0%': {
            transform: 'scale(1)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(0.8)',
            opacity: 0
          }
        },
        ripple: {
          '0%': {
            opacity: 0.5,
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(50)',
            opacity: 0.3
          },
          '100%': {
            opacity: 0,
            transform: 'scale(100)'
          }
        },
        rotation: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        },
        ellipsis: {
          to: {
            width: '1.25rem'
          }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' }
        }
      },
      spacing: {
        20: '20%'
      },
      translate: {
        '2px': '2px'
      },
      width: {
        15: '15%',
        44: '44%',
        96: '96%',
        220: '220px',
        250: '250px',
        350: '350px'
      },
      height: {
        '40px': '40px',
        '100px': '100px',
        '550px': '550px'
      },
      fontFamily: {
        inter: ['Inter']
      },
      text: {
        '10px': '10px'
      },
      boxShadow: {
        shadowBottom: '0px 4px 4px rgba(91, 98, 117, 0.05)',
        shadowBottomTwlightLite: '0px 4px 14px 4px rgba(80, 80, 135, 0.06)',
        shadowBottomRed: '0px 4px 14px 4px rgba(255, 0, 0, 0.06)',
        shadowBottomLightBlack: '0px 1px 6px rgba(0, 0, 0, 0.11)'
      },
      backgroundImage: {
        offerBadgeBackground:
          'url("/src/assets/images/OfferBadgeBackground.png")',
        spikesPattern: 'url("/src/assets/images/SpikesMeshPattern.png")'
      },
      screens: {
        'mui-sm': '600px',
        'mui-md': '900px',
        'mui-lg': '1200px'
      },
      cursor: {
        'not-allowed':
          'url("/src/assets/images/CursorNotAllowed.png"), not-allowed'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
