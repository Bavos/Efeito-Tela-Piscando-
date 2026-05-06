import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {EnergyLines} from '../components/EnergyLines';
import {FloatingCards} from '../components/FloatingCards';
import {GlowTypography} from '../components/GlowTypography';
import {colors} from '../theme';

export const LetramentoIAScene = () => {
  const frame = useCurrentFrame();
  const camera = interpolate(frame, [0, 150], [1.03, 0.98]);

  return (
    <AbsoluteFill style={{transform: `scale(${camera})`, willChange: 'transform'}}>
      <CinematicBackground intensity={0.94} />
      <EnergyLines count={16} opacity={0.72} />
      <FloatingCards />
      <div style={{position: 'absolute', left: 86, right: 86, top: 230}}>
        <GlowTypography variant="eyebrow" gold>Letramento em IA</GlowTypography>
        <GlowTypography variant="headline" delay={18} style={{marginTop: 26, fontSize: 68}}>
          A habilidade do século 21.
        </GlowTypography>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 130,
          right: 130,
          bottom: 245,
          padding: '28px 32px',
          borderRadius: 28,
          border: `1px solid ${colors.goldSoft}33`,
          background: 'rgba(3,11,31,0.58)',
          color: colors.muted,
          fontSize: 30,
          lineHeight: 1.35,
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(216,166,74,0.10)'
        }}
      >
        Entender ferramentas, limites, contexto e responsabilidade.
      </div>
    </AbsoluteFill>
  );
};
