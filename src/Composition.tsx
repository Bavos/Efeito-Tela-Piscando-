import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {CinematicBackground} from './components/CinematicBackground';
import {IntroScene} from './scenes/IntroScene';
import {LetramentoIAScene} from './scenes/LetramentoIAScene';
import {HumanAIScene} from './scenes/HumanAIScene';
import {FuturoEducacaoScene} from './scenes/FuturoEducacaoScene';
import {FinalHeroScene} from './scenes/FinalHeroScene';
import {colors, fontFamily, sceneRanges} from './theme';

export const MainComposition = () => {
  const frame = useCurrentFrame();
  const finalFade = interpolate(frame, [870, 900], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.navy,
        overflow: 'hidden',
        fontFamily,
        color: colors.white
      }}
    >
      <CinematicBackground intensity={1} />

      <Sequence from={sceneRanges.intro.from} durationInFrames={sceneRanges.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={sceneRanges.letramento.from} durationInFrames={sceneRanges.letramento.duration}>
        <LetramentoIAScene />
      </Sequence>
      <Sequence from={sceneRanges.humanAi.from} durationInFrames={sceneRanges.humanAi.duration}>
        <HumanAIScene />
      </Sequence>
      <Sequence from={sceneRanges.futuro.from} durationInFrames={sceneRanges.futuro.duration}>
        <FuturoEducacaoScene />
      </Sequence>
      <Sequence from={sceneRanges.finalHero.from} durationInFrames={sceneRanges.finalHero.duration}>
        <FinalHeroScene />
      </Sequence>

      <AbsoluteFill
        style={{
          background: '#000',
          opacity: finalFade,
          pointerEvents: 'none'
        }}
      />
    </AbsoluteFill>
  );
};
