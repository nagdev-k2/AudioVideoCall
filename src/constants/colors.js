const randomColor = `#${Math.floor(Math.random() * 16777215)
  .toString(16)
  .padStart(6, '0')}`;

export default {
  primaryColor: '#0093E9',
  white: '#ffffff',
  black: '#000',
  lightgrey: 'lightgrey',
  grey: 'grey',
  red: 'red',
  yellow: '#FFDE00',
  green: '#00e676',
  randomColor,
};
