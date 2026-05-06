export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30;
export const DURATION_IN_FRAMES = 900;

export const colors = {
  navy: '#030B1F',
  navySoft: '#071633',
  electricBlue: '#4FB7FF',
  blueCore: '#87D7FF',
  gold: '#D8A64A',
  goldSoft: '#F2D58A',
  white: '#F7FBFF',
  muted: '#B9C9DA'
};

export const fontFamily =
  'Inter, SF Pro Display, General Sans, Montserrat, Arial, Helvetica, sans-serif';

export const sceneRanges = {
  intro: {from: 0, duration: 150},
  letramento: {from: 150, duration: 150},
  humanAi: {from: 300, duration: 180},
  futuro: {from: 480, duration: 180},
  finalHero: {from: 660, duration: 240}
};

export const cinematicEase = (value: number) => 1 - Math.pow(1 - value, 3);
