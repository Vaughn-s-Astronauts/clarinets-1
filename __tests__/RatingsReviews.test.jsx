import renderer from 'react-test-renderer';
import ReviewsList from '../src/dist/Components/Ratings_Reviews/ReviewsList.jsx';

it('renders component when given an array', () => {
  const component = renderer.create(
    <ReviewsList shownReviews={[]}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});