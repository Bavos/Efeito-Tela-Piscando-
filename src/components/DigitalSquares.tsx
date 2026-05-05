import {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type Square = {
  x: number;
  y: number;
  size: number;
  delay: number;
  blinkBase: number;
  intensity: number;
  glow: number;
};

const TOTAL_SQUARES = 900;

const createRandom = (seed: number) => {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

export const DigitalSquares = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const squares = useMemo(() => {
    const random = createRandom(20260505);
    return Array.from({length: TOTAL_SQUARES}, (): Square => {
      return {
        x: random() * width,
        y: random() * height,
        size: 2 + random() * 6,
        delay: random() * 210,
        blinkBase: 0.4 + random() * 1.6,
        intensity: 0.25 + random() * 0.75,
        glow: random() > 0.74 ? 1 : 0
      };
    });
  }, [height, width]);

  const visibleCount = Math.floor(
    interpolate(frame, [0, 120, 300, 390, 450], [50, 170, 430, 820, 350], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  );

  const speedMultiplier = interpolate(frame, [0, 120, 300, 390, 450], [0.7, 1.1, 2.2, 3.1, 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill>
      {squares.slice(0, visibleCount).map((square, index) => {
        const localTime = Math.max(0, frame - square.delay);
        const pulse = Math.sin(localTime * 0.08 * square.blinkBase * speedMultiplier + index * 0.31);
        const opacity = interpolate(pulse, [-1, 1], [0.03, square.intensity]);

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: square.x,
              top: square.y,
              width: square.size,
              height: square.size,
              borderRadius: 1,
              opacity,
              backgroundColor: '#FFFFFF',
              filter: square.glow ? 'blur(0.4px)' : 'none',
              boxShadow: square.glow ? '0 0 6px rgba(255,255,255,0.9)' : 'none',
              willChange: 'opacity, transform'
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
