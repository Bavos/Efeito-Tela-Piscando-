import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const GlowBackground = () => {
  const frame = useCurrentFrame();
  const glowOpacity = interpolate(frame, [300, 380, 450], [0, 0.38, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(0,229,255,0.35) 0%, rgba(168,85,247,0.22) 26%, rgba(15,15,35,0.08) 47%, rgba(0,0,0,0) 70%), radial-gradient(circle at 50% 52%, rgba(250,204,21,0.12) 0%, rgba(0,0,0,0) 38%)',
        opacity: glowOpacity
      }}
    />
  );
};
