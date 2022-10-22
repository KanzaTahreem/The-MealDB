/**
 * @jest-environment jsdom
 */
import commentsCounter from '../counter/commentCounter.js'

describe('Counting the number of comments', () => {
    test('Return number of comments', () => {
        const comments = [
            {user: 1, comment: 'comment 1'},
            {user: 2, comment: 'comment 2'},
            {user: 3, comment: 'comment 3'},
            {user: 4, comment: 'comment 4'},
        ];
        const result = commentsCounter(comments);
        expect(result).toBe(4);
    });
});
