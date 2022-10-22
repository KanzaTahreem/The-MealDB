/**
 * @jest-environment jsdom
 */

import commentsCounter from '../counter/commentCounter.js';

test('should count elements if. meal-comments is present', () => {
  document.body.innerHTML = "<div class='meal-comments'> </div>";
  expect(commentsCounter()).toBe(0);

  document.body.innerHTML = '<div class="meal-comments"><div>comment</div></div>';
  expect(commentsCounter()).toBe(1);
});

test('should return 0 if .meal-comments is not present', () => {
  document.body.innerHTML = '';
  expect(commentsCounter()).toBe(0);
});

describe('Counting the number of comments', () => {
  test('Return number of comments', () => {
    const comments = [];
    const result = commentsCounter(comments);
    expect(result).toBe(0);
  });
});