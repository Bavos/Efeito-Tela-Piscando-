import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

const references = [
  'UNESCO AI Competency Frameworks (2024)',
  'OECD AI and the Future of Skills',
  'Stanford HAI AI Index 2025',
  'WEF Future of Jobs 2025'
];

export const SourceFootnote = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [150, 182], [0, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const y = interpolate(frame, [150, 182], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 78,
        right: 78,
        bottom: 74,
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        textAlign: 'center',
        color: colors.muted,
        fontSize: 18,
        lineHeight: 1.35,
        letterSpacing: 0.25,
        textShadow: '0 0 14px rgba(79,183,255,0.22)',
        willChange: 'opacity, transform'
      }}
    >
      <span style={{color: colors.goldSoft, fontWeight: 620}}>Fontes de referência:</span>{' '}
      {references.join(' · ')}
    </div>
  );
};
