import { MwtoolsPage } from './app.po';

describe('mwtools App', () => {
  let page: MwtoolsPage;

  beforeEach(() => {
    page = new MwtoolsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
