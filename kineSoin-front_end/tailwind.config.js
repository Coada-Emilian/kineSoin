/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';

module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './src/**/**/*.{html,js,ts,jsx,tsx}',
    './docs/**/*.html/',
  ],
  theme: {
    extend: {
      colors: {
        primaryTeal: '#6FFFE9',
        secondaryTeal: '#00E0D1',
        primaryBlue: '#003249',
        secondaryBlue: '#007EA7',
        primaryRed: '#D85071',
        lightGrey: '#cdcdcd',
        container: '#BFF3F3',
      },
      fontSize: {
        xxs: '0.636rem',
        xxxs: '0.5rem',
        xxxxs: '0.4rem',
      },

      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        homePage: "url('/images/homepage_main_photo.webp')",
        patientConnectionPage:
          "url('/images/patientConnexionPage_mainAlt.webp')",
        therapistConnectionPage:
          "url('/images/therapistConnexionPage_main.webp')",
        patientFirstRegisterPage:
          "url('/images/patientRegisterFirstForm_mainAlt.webp')",
        patientSecondRegisterPage:
          "url('/images/patientRegisterSecondForm_main.webp')",
        patientThirdRegisterPage:
          "url('/images/patientRegisterThirdForm_main.webp')",
        confirmationPage: "url('/images/confirmationPage.webp')",
      },
      boxShadow: {
        mobileNav: '2px 0px 14px 3px rgba(0,0,0,0.2)',
        around: '1px 1px 7px 0px rgba(50,50,50,0.25)',
        pink: '1px 1px 4px 0px rgb(216, 80, 113, 0.7)',
        message: '0px -2px 19px -1px rgba(0,0,0,0.1)',
      },
      screens: {
        xxs: '0px',
        xs: '496px', // Example custom breakpoint
      },
      spacing: {
        header: '4rem',
      },
    },
  },
  plugins: [],
};
