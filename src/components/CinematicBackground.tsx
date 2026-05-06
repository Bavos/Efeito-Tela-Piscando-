import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

type CinematicBackgroundProps = {
  intensity?: number;
  variant?: 'default' | 'classroom' | 'final';
};

export const CinematicBackground = ({intensity = 1, variant = 'default'}: CinematicBackgroundProps) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.08;
  const breath = 0.82 + Math.sin(frame * 0.025) * 0.18;
  const finalBoost = variant === 'final' ? 1.35 : 1;

  return (
    <AbsoluteFill style={{backgroundColor: colors.navy}}>
      <AbsoluteFill
        style={{
          opacity: 0.94 * intensity,
          backgroundImage: `
            radial-gradient(circle at 50% ${31 + Math.sin(frame * 0.01) * 2}%, rgba(79,183,255,${0.18 * finalBoost}) 0%, rgba(79,183,255,0.05) 21%, transparent 46%),
            radial-gradient(circle at 52% 56%, rgba(216,166,74,${0.14 * breath * finalBoost}) 0%, rgba(216,166,74,0.035) 31%, transparent 58%),
            linear-gradient(180deg, #020817 0%, #071633 43%, #030B1F 100%)`
        }}
      />
      <AbsoluteFill
        style={{
          opacity: variant === 'classroom' ? 0.22 : 0.13,
          transform: `translate3d(${Math.sin(frame * 0.012) * 18}px, ${-drift % 80}px, 0) scale(1.08)`,
          backgroundImage:
            'linear-gradient(rgba(135,215,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(216,166,74,0.07) 1px, transparent 1px)',
          backgroundSize: '112px 112px',
          maskImage: 'radial-gradient(circle at 50% 44%, black 0%, transparent 70%)'
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            'radial-gradient(ellipse at 18% 28%, rgba(216,166,74,0.22), transparent 26%), radial-gradient(ellipse at 82% 62%, rgba(79,183,255,0.20), transparent 28%)',
          filter: 'blur(22px)'
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.32) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.32) 100%)'
        }}
      />
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [0, 45], [0, 1], {extrapolateRight: 'clamp'}),
          boxShadow: 'inset 0 0 220px rgba(0,0,0,0.68)'
        }}
      />
    </AbsoluteFill>
  );
};
