import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';

const cards = [
  {name: 'ChatGPT', x: 160, y: 520, accent: colors.goldSoft},
  {name: 'Claude', x: 560, y: 610, accent: colors.blueCore},
  {name: 'Gemini', x: 130, y: 880, accent: colors.blueCore},
  {name: 'Grok', x: 575, y: 990, accent: colors.goldSoft}
];

export const FloatingCards = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, opacity: 0.48}}>
        {cards.map((card, index) =>
          cards.slice(index + 1).map((target) => (
            <line
              key={`${card.name}-${target.name}`}
              x1={card.x + 170}
              y1={card.y + 86}
              x2={target.x + 170}
              y2={target.y + 86}
              stroke="url(#cardLine)"
              strokeWidth="1.6"
              strokeDasharray="8 16"
            />
          ))
        )}
        <defs>
          <linearGradient id="cardLine" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={colors.goldSoft} />
            <stop offset="1" stopColor={colors.blueCore} />
          </linearGradient>
        </defs>
      </svg>
      {cards.map((card, index) => {
        const entrance = spring({frame: frame - index * 8, fps, config: {damping: 26, stiffness: 80}});
        const yFloat = Math.sin(frame * 0.035 + index) * 16;
        const opacity = interpolate(frame - index * 8, [0, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={card.name}
            style={{
              position: 'absolute',
              left: card.x,
              top: card.y,
              width: 340,
              height: 172,
              opacity,
              transform: `translate3d(0, ${interpolate(entrance, [0, 1], [44, 0]) + yFloat}px, 0) rotateX(2deg)`,
              border: `1px solid ${card.accent}55`,
              borderRadius: 28,
              background: 'linear-gradient(145deg, rgba(8,24,55,0.72), rgba(5,13,32,0.38))',
              boxShadow: `0 0 38px ${card.accent}24, inset 0 0 34px rgba(255,255,255,0.035)`,
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 34px',
              willChange: 'transform, opacity'
            }}
          >
            <div style={{fontSize: 34, fontWeight: 720, color: colors.white, letterSpacing: -0.3}}>{card.name}</div>
            <div style={{marginTop: 14, fontSize: 18, color: colors.muted, letterSpacing: 2.4, textTransform: 'uppercase'}}>interface de IA</div>
            <div style={{marginTop: 22, width: 120, height: 2, background: `linear-gradient(90deg, ${card.accent}, transparent)`}} />
          </div>
        );
      })}
    </div>
  );
};
