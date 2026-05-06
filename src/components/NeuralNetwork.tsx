import {useMemo} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

type Node = {x: number; y: number; r: number; type: 'gold' | 'blue'; label?: string};
type NeuralNetworkProps = {
  finalHero?: boolean;
  labels?: string[];
  scale?: number;
  opacity?: number;
};

const baseNodes: Node[] = [
  {x: 540, y: 430, r: 15, type: 'gold', label: 'Futuro'},
  {x: 385, y: 610, r: 12, type: 'blue', label: 'Ética'},
  {x: 665, y: 650, r: 13, type: 'gold', label: 'Criatividade'},
  {x: 505, y: 830, r: 20, type: 'gold', label: 'Educação'},
  {x: 720, y: 930, r: 11, type: 'blue', label: 'Contexto'},
  {x: 340, y: 1010, r: 11, type: 'blue'},
  {x: 585, y: 1135, r: 14, type: 'gold'},
  {x: 430, y: 1265, r: 10, type: 'blue'},
  {x: 700, y: 1320, r: 12, type: 'gold'},
  {x: 530, y: 1490, r: 16, type: 'gold'}
];

const edges = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5], [5, 6], [4, 6], [6, 7], [6, 8], [7, 9], [8, 9], [1, 5], [4, 8]
];

export const NeuralNetwork = ({finalHero = false, labels = [], scale = 1, opacity = 1}: NeuralNetworkProps) => {
  const frame = useCurrentFrame();
  const nodes = useMemo(() => baseNodes, []);
  const labelSet = new Set(labels);
  const push = finalHero ? interpolate(frame, [0, 240], [0.94, 1.02]) : interpolate(frame, [0, 180], [0.92, 1.02]);

  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${scale * push})`,
        transformOrigin: '50% 50%',
        overflow: 'visible',
        willChange: 'transform, opacity'
      }}
    >
      <defs>
        <filter id="softBloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.goldSoft} />
          <stop offset="54%" stopColor={colors.gold} />
          <stop offset="100%" stopColor={colors.blueCore} />
        </linearGradient>
      </defs>

      {finalHero && (
        <g opacity="0.18">
          {[0, 1, 2].map((ring) => (
            <ellipse
              key={ring}
              cx="540"
              cy="950"
              rx={230 + ring * 92 + Math.sin(frame * 0.015 + ring) * 7}
              ry={565 + ring * 82 + Math.cos(frame * 0.014 + ring) * 9}
              fill="none"
              stroke={ring % 2 ? colors.blueCore : colors.goldSoft}
              strokeWidth="1.2"
              strokeDasharray="9 18"
              transform={`rotate(${frame * 0.025 * (ring % 2 ? -1 : 1)} 540 950)`}
            />
          ))}
        </g>
      )}

      {edges.map(([a, b], index) => {
        const from = nodes[a];
        const to = nodes[b];
        const pathOpacity = 0.31 + Math.sin(frame * 0.035 + index) * 0.12;
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#goldBlue)"
              strokeWidth={finalHero ? 2.2 : 1.5}
              opacity={pathOpacity}
              filter="url(#softBloom)"
            />
            <circle
              r={finalHero ? 4 : 3}
              fill={index % 2 ? colors.blueCore : colors.goldSoft}
              opacity="0.86"
              filter="url(#softBloom)"
            >
              <animateMotion dur={`${4.5 + (index % 4) * 0.6}s`} repeatCount="indefinite" path={`M${from.x},${from.y} L${to.x},${to.y}`} />
            </circle>
          </g>
        );
      })}

      {nodes.map((node, index) => {
        const color = node.type === 'gold' ? colors.goldSoft : colors.blueCore;
        const pulse = 1 + Math.sin(frame * 0.045 + index) * 0.14;
        const labelVisible = node.label && (labelSet.size === 0 || labelSet.has(node.label));
        return (
          <g key={index}>
            <circle cx={node.x} cy={node.y} r={node.r * 3.6 * pulse} fill={color} opacity="0.08" filter="url(#softBloom)" />
            <circle cx={node.x} cy={node.y} r={node.r * 1.75 * pulse} fill={color} opacity="0.18" filter="url(#softBloom)" />
            <circle cx={node.x} cy={node.y} r={node.r * pulse} fill={color} opacity="0.95" filter="url(#softBloom)" />
            <circle cx={node.x - node.r * 0.25} cy={node.y - node.r * 0.28} r={node.r * 0.28} fill="#fff" opacity="0.82" />
            {labelVisible && (
              <text
                x={node.x + (node.x > 540 ? 26 : -26)}
                y={node.y - 22}
                textAnchor={node.x > 540 ? 'start' : 'end'}
                fill={node.type === 'gold' ? colors.goldSoft : colors.white}
                fontSize={finalHero ? 31 : 24}
                fontWeight="560"
                letterSpacing="1.4"
                opacity={interpolate(frame, [18 + index * 4, 42 + index * 4], [0, 0.94], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                })}
                style={{filter: `drop-shadow(0 0 14px ${color})`}}
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
