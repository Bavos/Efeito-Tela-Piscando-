import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {EnergyLines} from '../components/EnergyLines';
import {GlowTypography} from '../components/GlowTypography';
import {NeuralNetwork} from '../components/NeuralNetwork';
import {SourceFootnote} from '../components/SourceFootnote';
import {colors} from '../theme';

export const FinalHeroScene = () => {
  const frame = useCurrentFrame();
  const camera = interpolate(frame, [0, 240], [1, 1.045]);
  const heroOpacity = interpolate(frame, [0, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{transform: `scale(${camera})`, willChange: 'transform'}}>
      <CinematicBackground variant="final" intensity={1.12} />
      <EnergyLines count={26} goldBias opacity={0.74} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.22,
          backgroundImage:
            'radial-gradient(circle at 18% 18%, transparent 0 42px, rgba(216,166,74,0.22) 43px 44px, transparent 45px), radial-gradient(circle at 82% 77%, transparent 0 72px, rgba(79,183,255,0.18) 73px 74px, transparent 75px)',
          backgroundSize: '360px 360px, 520px 520px',
          filter: 'blur(0.3px)'
        }}
      />
      <NeuralNetwork finalHero labels={['Ética', 'Criatividade', 'Educação', 'Contexto', 'Futuro']} opacity={heroOpacity} scale={1.02} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 170}}>
        <GlowTypography variant="eyebrow" gold delay={10}>IAmazing School</GlowTypography>
        <GlowTypography delay={32} style={{marginTop: 26, fontSize: 68}}>
          Prepare sua escola para o futuro da IA
        </GlowTypography>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 92,
          right: 92,
          bottom: 205,
          textAlign: 'center'
        }}
      >
        <GlowTypography variant="subheadline" gold delay={86} style={{fontSize: 58, fontWeight: 760}}>
          IAmazing School
        </GlowTypography>
        <GlowTypography variant="subheadline" delay={112} style={{marginTop: 22, color: colors.muted, fontSize: 38}}>
          Letramento em IA para professores e alunos
        </GlowTypography>
        <div
          style={{
            margin: '44px auto 0',
            width: 'fit-content',
            padding: '20px 34px',
            borderRadius: 999,
            border: `1px solid ${colors.goldSoft}66`,
            color: colors.white,
            fontSize: 33,
            letterSpacing: 0.2,
            background: 'linear-gradient(90deg, rgba(216,166,74,0.18), rgba(79,183,255,0.12))',
            boxShadow: '0 0 44px rgba(216,166,74,0.20), inset 0 0 24px rgba(255,255,255,0.04)',
            opacity: interpolate(frame, [136, 166], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            transform: `translateY(${interpolate(frame, [136, 166], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`
          }}
        >
          iamazingschool.com.br
        </div>
      </div>
      <SourceFootnote />
    </AbsoluteFill>
  );
};
