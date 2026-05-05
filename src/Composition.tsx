import {AbsoluteFill} from 'remotion';
import {DigitalSquares} from './components/DigitalSquares';
import {GlowBackground} from './components/GlowBackground';
import {LogoReveal} from './components/LogoReveal';

export const MainComposition = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        overflow: 'hidden',
        fontFamily: 'Inter, Arial, Helvetica, sans-serif'
      }}
    >
      <GlowBackground />
      <DigitalSquares />
      <LogoReveal />
    </AbsoluteFill>
  );
};
