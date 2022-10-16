export default {
  getTodos: async (request, h) => {
    const query = `SELECT * FROM todos;`;
    try {
      // methode pour faire une requete a la bdd avec le module hapi-postgres
      const result = await request.pg.client.query(query);
      return result.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
