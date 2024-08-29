import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./assets/fonts/Merriweather-Regular.woff2') format('woff2'), url('./assets/fonts/Merriweather-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./assets/fonts/Merriweather-Bold.woff2') format('woff2'), url('./assets/fonts/Merriweather-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Merriweather';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('./assets/fonts/Merriweather-Italic.woff2') format('woff2'), url('./assets/fonts/Merriweather-Italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Merriweather';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('./assets/fonts/Merriweather-BoldItalic.woff2') format('woff2'), url('./assets/fonts/Merriweather-BoldItalic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Cabinet Grotesk';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('./assets/fonts/CabinetGrotesk-ExtraBold.woff2') format('woff2'), url('./assets/fonts/CabinetGrotesk-ExtraBold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Cabinet Grotesk';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./assets/fonts/CabinetGrotesk-Bold.woff2') format('woff2'), url('./assets/fonts/CabinetGrotesk-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Satoshi';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./assets/fonts/Satoshi-Regular.woff2') format('woff2'), url('./assets/fonts/Satoshi-Regular.woff2') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Satoshi';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./assets/fonts/Satoshi-Light.woff2') format('woff2'), url('./assets/fonts/Satoshi-Light.woff2') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Neue Montreal';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./assets/fonts/NeueMontreal-Regular.otf') format('otf'), url('./assets/fonts/NeueMontreal-Regular.otf') format('otf');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Neue Montreal';
        font-style: bold;
        font-weight: 500;
        font-display: swap;
        src: url('./assets/fonts/NeueMontreal-Bold.otf') format('otf'), url('./assets/fonts/NeueMontreal-Bold.otf') format('otf');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
)

export default Fonts
