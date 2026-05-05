import {Composition} from 'remotion';
import {MainComposition} from './Composition';

export const Root = () => {
  return (
    <Composition
      id="Video"
      component={MainComposition}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={450}
    />
  );
};
