const assert = require("assert");
const loginService = require("../../src/services/login.service.js");

const loginSuccess = {
  username: "fishc0",
  password: "12345",
};

const loginWrongPassword = {
  username: "fishc0",
  password: "00000",
};

const loginEmptyHouse = {
  username: "adevuyst0",
  password: "00000",
};

const loginUserNotFound = {
  username: "ppp1",
  password: "00000",
};

const housesData = [
  {
    "_id": {
      "$oid": "64320bf0fc13ae1e696b0eea"
    },
    "code": "AKRHSR",
    "name": "Jamima",
    "users": [
      {
        "user": "Lexine"
      },
      {
        "user": "Eliza"
      },
      {
        "user": "Jennica"
      },
      {
        "user": "Cacilie"
      }
    ]
  },
  {
    "_id": {
      "$oid": "64320bf0fc13ae1e696b0eeb"
    },
    "code": "FSHLBQ",
    "name": "Lorraine",
    "users": [
      {
        "user": "Stillmann"
      },
      {
        "user": "Katlin"
      },
      {
        "user": "Eloise"
      },
      {
        "user": "Randee"
      },
      {
        "user": "Ambrosi"
      }
    ]
  },
  {
    "_id": {
      "$oid": "64320bf0fc13ae1e696b0eec"
    },
    "code": "JCBGKO",
    "name": "Misty",
    "users": [
      {
        "user": "Shanna"
      },
      {
        "user": "Emelen"
      },
      {
        "user": "Bathsheba"
      },
      {
        "user": "Delcine"
      }
    ]
  }
];

const houseCodeCorrect = ["AKRHSR"];
const houseCodeWrong = ["00000"];


describe("Login Service", () => {
  describe("#findHouseCode(houses, password)", () => {
    it("should return the house object with matching house code", async () => {
      const house = await loginService.findHouseCode(housesData, houseCodeCorrect[0]);
      assert.strictEqual(typeof house, "object");
    });

    it("should return the undefined if no matching house code is found", async () => {
      const house = await loginService.findHouseCode(housesData, houseCodeWrong[0]);
      assert.strictEqual(house, undefined);
    });
  });

  describe("#getUser(input_data)", () => {
    it('should return "Login successfully" if username and password are correct', async () => {
      const message = await loginService.getUser(loginSuccess);
      assert.strictEqual(message, "Login successfully");
    });

    it('should return "Wrong password" if only the password is wrong', async () => {
      await assert.rejects(
        async () => {
          await loginService.getUser(loginWrongPassword);
        },
        {
          name: "Error",
          message: "Wrong password",
        }
      );
    });

    it('should return "User has not been invited into a house" if the user has empty houses array', async () => {
      await assert.rejects(
        async () => {
          await loginService.getUser(loginEmptyHouse);
        },
        {
          name: "Error",
          message: "User has not been invited into a house",
        }
      );
    });

    it('should return "Username not found" if the username is not found', async () => {
      await assert.rejects(
        async () => {
          await loginService.getUser(loginUserNotFound);
        },
        {
          name: "Error",
          message: "Username not found",
        }
      );
    });
  });
});
