import { getBody } from '../lib/utils';

describe('getBody', () => {
  test('gets the empty body from the HTML', (done) => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Test Title</title>
      </head>
      <body>
      </body>
    </html>`;
    const expected = `
      `;
    
    expect(getBody(html)).toBe(expected);
    done();
  });

  test('gets the body with from the HTML', (done) => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>
          Test Title
        </title>
      </head>
      <body>
        <p>
          Hello world!
        </p>
      </body>
    </html>`;
    
    const expected = `
        <p>
          Hello world!
        </p>
      `;
    
    expect(getBody(html)).toBe(expected);
    done();
  });

  test('gets the body with conflicting image URL', (done) => {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>
          Test Title
        </title>
      </head>
      <body>
        <p>
          Hello world!
        </p>
        <img src="https://example.com/</body>.png">
      </body>
    </html>`;
    
    const expected = `
        <p>
          Hello world!
        </p>
        <img src="https://example.com/</body>.png">
      `;
    
    expect(getBody(html)).toBe(expected);
    done();
  });
});
