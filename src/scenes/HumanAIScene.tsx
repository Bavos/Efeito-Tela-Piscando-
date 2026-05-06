import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {EnergyLines} from '../components/EnergyLines';
import {GlowTypography} from '../components/GlowTypography';
import {NeuralNetwork} from '../components/NeuralNetwork';
import {colors} from '../theme';

const pillars = ['criatividade', 'ética', 'colaboração', 'pensamento crítico'];

export const HumanAIScene = () => {
  const frame = useCurrentFrame();
  const orbit = Math.sin(frame * 0.018) * 16;

  return (
    <AbsoluteFill style={{transform: `translate3d(${orbit}px, 0, 0) scale(1.025)`, willChange: 'transform'}}>
      <CinematicBackground variant="classroom" intensity={1} />
      <EnergyLines count={12} goldBias opacity={0.62} />
      <NeuralNetwork scale={0.72} opacity={0.42} />
      <div style={{position: 'absolute', left: 115, right: 115, top: 305}}>
        <GlowTypography delay={8}>A IA não substitui professores.</GlowTypography>
        <GlowTypography variant="subheadline" gold delay={62} style={{marginTop: 34, fontSize: 54}}>
          Ela amplia o potencial humano.
        </GlowTypography>
      </div>
      <div style={{position: 'absolute', left: 114, right: 114, top: 825, height: 520}}>
        <div
          style={{
            position: 'absolute',
            left: 250,
            top: 75,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(247,251,255,0.14), rgba(79,183,255,0.08) 45%, transparent 72%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 80px rgba(79,183,255,0.18), inset 0 0 60px rgba(216,166,74,0.08)'
          }}
        />
        {pillars.map((pillar, index) => {
          const angle = (Math.PI * 2 * index) / pillars.length + frame * 0.006;
          const x = 330 + Math.cos(angle) * 310;
          const y = 245 + Math.sin(angle) * 190;
          const visible = interpolate(frame, [index * 10, index * 10 + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div
              key={pillar}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                opacity: visible,
                padding: '18px 24px',
                borderRadius: 999,
                border: `1px solid ${index % 2 ? colors.blueCore : colors.goldSoft}55`,
                color: colors.white,
                fontSize: 25,
                letterSpacing: 0.4,
                background: 'rgba(5,17,42,0.72)',
                boxShadow: `0 0 30px ${index % 2 ? colors.blueCore : colors.goldSoft}22`,
                textTransform: 'capitalize'
              }}
            >
              {pillar}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
