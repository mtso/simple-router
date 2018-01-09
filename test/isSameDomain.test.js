import { isSameDomain } from '../lib/utils';

describe('isSameDomain', () => {
  test('returns true for relative hrefs', (done) => {
    const href1 = '../foo/bar/';
    const href2 = './foo/bar.html';

    expect(isSameDomain(href1)).toBe(true);
    expect(isSameDomain(href2)).toBe(true);
    done();
  });

  test('returns true for absolute hrefs', (done) => {
    const href1 = '/static/img/foo.png';
    const href2 = '/about/';

    expect(isSameDomain(href1)).toBe(true);
    expect(isSameDomain(href2)).toBe(true);
    done();
  });

  test('returns true for index path', (done) => {
    const indexPath = '/';

    expect(isSameDomain(indexPath)).toBe(true);
    done();
  })
});
