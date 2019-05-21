import { LayoutComponent } from './layout.component';

/**
 * Layout component testing
 */
describe('LayoutComponent', () => {
  it('should make history back operation', () => {
    const location = jasmine.createSpyObj('Location', ['back']);
    const component = new LayoutComponent(location);
    component.onBackClicked();
    expect(location.back.calls.count()).toBe(1);
  });
});
