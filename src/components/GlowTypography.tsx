import {CSSProperties, ReactNode} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';

type GlowTypographyProps = {
  children: ReactNode;
  variant?: 'headline' | 'subheadline' | 'eyebrow' | 'label' | 'cta';
  delay?: number;
  align?: CSSProperties['textAlign'];
  gold?: boolean;
  style?: CSSProperties;
};

const sizes = {
  headline: 78,
  subheadline: 43,
  eyebrow: 28,
  label: 24,
  cta: 34
};

export const GlowTypography = ({
  children,
  variant = 'headline',
  delay = 0,
  align = 'center',
  gold = false,
  style
}: GlowTypographyProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {damping: 24, stiffness: 72, mass: 0.85}
  });
  const opacity = interpolate(frame - delay, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const y = interpolate(entrance, [0, 1], [28, 0]);
  const pulse = 0.86 + Math.sin((frame + delay) * 0.035) * 0.14;

  return (
    <div
      style={{
        textAlign: align,
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        willChange: 'opacity, transform',
        color: gold ? colors.goldSoft : colors.white,
        fontSize: sizes[variant],
        fontWeight: variant === 'headline' ? 760 : 520,
        letterSpacing: variant === 'eyebrow' || variant === 'label' ? 5 : -1.2,
        lineHeight: variant === 'headline' ? 1.02 : 1.2,
        textTransform: variant === 'eyebrow' || variant === 'label' ? 'uppercase' : 'none',
        textShadow: gold
          ? `0 0 ${18 * pulse}px rgba(216,166,74,0.62), 0 0 ${46 * pulse}px rgba(216,166,74,0.22)`
          : `0 0 ${16 * pulse}px rgba(79,183,255,0.35), 0 0 ${42 * pulse}px rgba(255,255,255,0.12)`,
        ...style
      }}
    >
      {children}
    </div>
  );
};
