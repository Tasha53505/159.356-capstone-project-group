// failingTest.test.js
describe('Guaranteed to fail test suite', () => {
    test('this test is guaranteed to  to show an example of what a failed test looks like', () => {
        expect(true).toBe(false);
    });
});
