import TwoColumnPage from './TwoColumnPage';

it('test form toggle function', () => {
  let wrapper = shallow(<TwoColumnPage />);
  let button = wrapper.find('#togglePasswordBtn');
  button.simulate('click');
  expect(wrapper.togglePasswordEvent).toHaveBeenCalled();
});
