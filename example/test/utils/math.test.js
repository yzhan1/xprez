require = require('esm')(module);

const assert = require('assert');
const mathUtil = require('../../app/utils/math.util').default;

describe(('math.test.js'), () => {
  it('should return 2', () => {
    assert.strictEqual(2, mathUtil.addOne(1));
  });
});