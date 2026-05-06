import {Composition} from 'remotion';
import {MainComposition} from './Composition';
import {DURATION_IN_FRAMES, FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './theme';

export const Root = () => {
  return (
    <Composition
      id="Video"
      component={MainComposition}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      fps={FPS}
      durationInFrames={DURATION_IN_FRAMES}
      defaultProps={{}}
    />
  );
};
