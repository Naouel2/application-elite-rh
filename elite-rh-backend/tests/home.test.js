const formationController = require("../controllers/formationController");

describe("Test the root path", () => {

    test("It should response the GET method", async () => {
      const response = await formationController.getAllFormations();
      expect(response.statusCode).toBe(200);
    });
});
