import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {EnergyLines} from '../components/EnergyLines';
import {GlowTypography} from '../components/GlowTypography';
import {colors} from '../theme';

const buildings = [160, 270, 392, 535, 675, 800];

export const FuturoEducacaoScene = () => {
  const frame = useCurrentFrame();
  const camera = interpolate(frame, [0, 180], [0.96, 1.055]);

  return (
    <AbsoluteFill style={{transform: `scale(${camera})`, willChange: 'transform'}}>
      <CinematicBackground intensity={1} />
      <EnergyLines count={22} opacity={0.9} />
      <svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="schoolGlass" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(135,215,255,0.24)" />
            <stop offset="1" stopColor="rgba(216,166,74,0.08)" />
          </linearGradient>
        </defs>
        {buildings.map((x, index) => {
          const h = 260 + (index % 3) * 82;
          const appear = interpolate(frame, [index * 8, index * 8 + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <g key={x} opacity={appear}>
              <rect x={x} y={1110 - h} width="92" height={h} rx="14" fill="url(#schoolGlass)" stroke="rgba(255,255,255,0.12)" />
              {Array.from({length: 5}, (_, floor) => (
                <line key={floor} x1={x + 18} y1={1110 - h + 38 + floor * 46} x2={x + 74} y2={1110 - h + 38 + floor * 46} stroke={index % 2 ? colors.blueCore : colors.goldSoft} opacity="0.32" />
              ))}
            </g>
          );
        })}
        {[0, 1, 2, 3, 4].map((flow) => (
          <path
            key={flow}
            d={`M80 ${1280 + flow * 54} C 320 ${1130 + flow * 24}, 710 ${1390 - flow * 88}, 1000 ${1060 + flow * 40}`}
            fill="none"
            stroke={flow % 2 ? colors.goldSoft : colors.blueCore}
            strokeWidth="2"
            opacity="0.35"
            strokeDasharray="10 18"
            strokeDashoffset={-frame * (1.2 + flow * 0.2)}
            style={{filter: `drop-shadow(0 0 12px ${flow % 2 ? colors.goldSoft : colors.blueCore})`}}
          />
        ))}
      </svg>
      <div style={{position: 'absolute', left: 82, right: 82, top: 275}}>
        <GlowTypography variant="eyebrow" gold delay={4}>Futuro da educação</GlowTypography>
        <GlowTypography delay={26} style={{marginTop: 30, fontSize: 70}}>
          As escolas que se anteciparem sairão na frente.
        </GlowTypography>
      </div>
      <div style={{position: 'absolute', left: 118, right: 118, bottom: 270, display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center'}}>
        {['escolas modernas', 'aprendizado digital', 'salas futuristas', 'sistemas conectados'].map((item, index) => (
          <div
            key={item}
            style={{
              opacity: interpolate(frame, [40 + index * 8, 66 + index * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              padding: '16px 22px',
              borderRadius: 999,
              color: colors.muted,
              fontSize: 24,
              border: '1px solid rgba(255,255,255,0.11)',
              background: 'rgba(3,11,31,0.58)'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
