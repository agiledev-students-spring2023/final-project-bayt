const assert = require('chai').assert;
const fs = require('fs');
const { gets, update } = require('../../src/controllers/prof.controller.js');

describe('gets', function () {
    it('should return user data for an existing username', async function () {
      const req = { params: { username: 'bunny' } };
      const res = { json: function (data) { this.data = data } };
      await gets(req, res);
      const expectedData = { username: 'bunny', role: 'traitor' };
      assert.deepEqual({username: res.data.username, role: res.data.role}, expectedData);
    });

});

describe('update', () => {
    describe('update', function () {
        it('should update user data for an existing username', async function () {
          const req = { params: { username: 'bunny' }, body: { telephone: '574-327-3449' } };
          const res = { send: function (data) { this.data = data } };
          await update(req, res);
          const data = JSON.parse(fs.readFileSync(require.resolve('../../src/json/hardCode.json')));
          assert.deepEqual(data.find(d => d.username === 'bunny'), { id: 2, username: 'bunny', email: 'bunny@nyu.edu', role: 'traitor', telephone: '574-327-3449', rooms: 'Apt 1551', password: 'password' });
          assert.deepEqual(res.data, { id: 2, username: 'bunny', email: 'bunny@nyu.edu', role: 'traitor', telephone: '574-327-3449', rooms: 'Apt 1551', password: 'password' });
        });
    });
});