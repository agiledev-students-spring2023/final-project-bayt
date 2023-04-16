const assert = require('chai').assert;
const { gets, update } = require('../../src/controllers/prof.controller.js');

describe('gets', function () {
  it('should return user data with expected properties', async function () {
    const req = { params: { username: 'badbunny' } };
    const res = { json: function (data) { this.data = data } };
    await gets(req, res);
    const expectedProps = ['id','username', 'email', 'role', 'telephone', 'rooms', 'password'];
    const userProps = Object.keys(res.data);
    assert.deepStrictEqual(userProps, expectedProps);
  });
});

describe('update', () => {
    describe('update', function () {
        it('should update user data for an existing username', async function () {
          const req = { params: { username: 'badbunny' }, body: { telephone: '574-327-3449' } };
          const res = { send: function (data) { this.data = data } };
          await update(req, res);
          // Assert that the response data is not empty
          assert.notStrictEqual(res.data, undefined);
          // Assert that the response data contains the updated telephone number
          assert.strictEqual(res.data.telephone, '574-327-3449');
        });
    });
});

