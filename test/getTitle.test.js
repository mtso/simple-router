import { getTitle } from '../lib/utils';

describe('getTitle', () => {
  test('gets the title from the HTML', (done) => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Test Title</title>
      </head>
      <body>
      </body>
    </html>`;
    
    expect(getTitle(html)).toBe('Test Title');
    done();
  });

  test('gets the multi-line title from the HTML', (done) => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>
          Test Title
        </title>
      </head>
      <body>
      </body>
    </html>`;
    
    const expected = `
          Test Title
        `;
    
    expect(getTitle(html)).toBe(expected);
    done();
  });
});
