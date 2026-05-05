import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const LogoReveal = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [390, 430, 450], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const scale = interpolate(frame, [390, 430], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          fontSize: 118,
          fontWeight: 800,
          letterSpacing: 1.2,
          lineHeight: 1,
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
          backgroundImage: 'linear-gradient(90deg, #00E5FF 0%, #A855F7 55%, #FACC15 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 12px rgba(0,229,255,0.45), 0 0 24px rgba(168,85,247,0.35), 0 0 38px rgba(250,204,21,0.22)',
          padding: '0 36px'
        }}
      >
        Iamazing School
      </div>
    </AbsoluteFill>
  );
};
