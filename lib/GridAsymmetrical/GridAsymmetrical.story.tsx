import { StoryWrapper } from '../../components/StoryWrapper/StoryWrapper';
import attributes from './attributes.json';
import { GridAsymmetrical } from './GridAsymmetrical';

export default { title: 'GridAsymmetrical' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={GridAsymmetrical} />;
}
