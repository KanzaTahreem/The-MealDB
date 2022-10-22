/**
 * @jest-environment jsdom
 */

import ItemCounter from '../counter/itemsCounter.js';

test('should count elements if .meals-section is present', () => {
  document.body.innerHTML = '<div class="meals-section"></div>';
  expect(ItemCounter()).toBe(0);

  document.body.innerHTML = '<div class="meals-section"><div>meal1</div></div>';
  expect(ItemCounter()).toBe(1);
});

test('should return 0 if .meals-section is not present', () => {
  document.body.innerHTML = '';
  expect(ItemCounter()).toBe(0);
});
