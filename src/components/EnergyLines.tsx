import {useMemo} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

type EnergyLinesProps = {
  count?: number;
  goldBias?: boolean;
  opacity?: number;
};

export const EnergyLines = ({count = 18, goldBias = false, opacity = 1}: EnergyLinesProps) => {
  const frame = useCurrentFrame();
  const lines = useMemo(
    () =>
      Array.from({length: count}, (_, index) => ({
        top: 120 + ((index * 197) % 1580),
        left: -180 + ((index * 83) % 260),
        width: 620 + ((index * 47) % 380),
        delay: index * 9,
        rotate: -18 + (index % 7) * 6,
        color: goldBias || index % 3 === 0 ? colors.goldSoft : colors.blueCore
      })),
    [count, goldBias]
  );

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'}}>
      {lines.map((line, index) => {
        const travel = interpolate((frame + line.delay) % 150, [0, 150], [-180, 1260]);
        const alpha = 0.08 + Math.sin((frame + line.delay) * 0.04) * 0.035;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: line.top,
              left: line.left + travel,
              width: line.width,
              height: 1,
              opacity: alpha * opacity,
              transform: `rotate(${line.rotate}deg)`,
              background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
              filter: `drop-shadow(0 0 10px ${line.color})`,
              willChange: 'transform, opacity'
            }}
          />
        );
      })}
    </div>
  );
};
