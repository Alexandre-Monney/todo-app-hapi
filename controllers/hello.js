import fetch from "node-fetch";

export default {
  getTodos: async (request, h) => {
    const query = `SELECT * FROM todos;`;
    try {
      const result = await request.pg.client.query(query);
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
