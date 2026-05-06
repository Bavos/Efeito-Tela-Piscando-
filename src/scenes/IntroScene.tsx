import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {EnergyLines} from '../components/EnergyLines';
import {GlowTypography} from '../components/GlowTypography';
import {NeuralNetwork} from '../components/NeuralNetwork';
import {colors} from '../theme';

export const IntroScene = () => {
  const frame = useCurrentFrame();
  const camera = interpolate(frame, [0, 150], [1, 1.08]);
  const light = interpolate(frame, [0, 90], [0.22, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{transform: `scale(${camera})`, willChange: 'transform'}}>
      <CinematicBackground variant="classroom" intensity={light} />
      <EnergyLines count={14} goldBias opacity={0.8} />
      <NeuralNetwork scale={0.82} opacity={0.52 * light} />
      <div style={{position: 'absolute', inset: 0, opacity: 0.4 * light}}>
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            style={{
              position: 'absolute',
              left: 170 + row * 92,
              right: 170 + row * 45,
              top: 980 + row * 145,
              height: 92,
              borderRadius: 16,
              border: `1px solid ${colors.blueCore}22`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.035), rgba(216,166,74,0.06), rgba(255,255,255,0.02))',
              transform: `perspective(700px) rotateX(58deg) translateY(${Math.sin(frame * 0.025 + row) * 8}px)`,
              boxShadow: '0 0 34px rgba(79,183,255,0.11)'
            }}
          />
        ))}
        {['professor', 'alunos', 'interfaces semânticas'].map((label, index) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: 190 + index * 220,
              top: 760 + (index % 2) * 96,
              width: 118,
              height: 208,
              borderRadius: '58px 58px 22px 22px',
              background: `linear-gradient(180deg, rgba(247,251,255,0.12), ${index === 0 ? 'rgba(216,166,74,0.16)' : 'rgba(79,183,255,0.13)'})`,
              border: '1px solid rgba(255,255,255,0.08)',
              filter: 'blur(0.2px)',
              boxShadow: '0 0 26px rgba(216,166,74,0.12)'
            }}
          />
        ))}
      </div>
      <div style={{position: 'absolute', left: 92, right: 92, top: 250}}>
        <GlowTypography variant="eyebrow" gold delay={4}>Transformação educacional</GlowTypography>
        <GlowTypography delay={22} style={{marginTop: 28}}>O mundo mudou.</GlowTypography>
        <GlowTypography variant="subheadline" delay={70} style={{marginTop: 34, color: colors.muted}}>
          A inteligência artificial já faz parte da educação.
        </GlowTypography>
      </div>
    </AbsoluteFill>
  );
};
