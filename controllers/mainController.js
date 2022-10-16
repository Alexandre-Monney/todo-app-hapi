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
  addTodo: async (request, h) => {
    // Recuperation de la valeur de l'input envoyée par le front
    const { todo } = request.payload;
    // A revoir requete préparée pour injection sql
    const query = `INSERT INTO todos (todo) VALUES('${todo}');`;
    try {
      const result = await request.pg.client.query(query);
      //! return inutile probablement car la réponse ne contient pas grand chose
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (request, h) => {
    // Recuperation de l'id via l'url
    const { id } = request.params;
    const query = `DELETE FROM todos WHERE id=${id}`;
    try {
      const result = await request.pg.client.query(query);
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (request, h) => {
    const { id } = request.params;
    const { done } = request.payload;
    const query = `UPDATE todos SET done=${done} WHERE id=${id}`;
    try {
      const result = await request.pg.client.query(query);
      return result;
    } catch (err) {
      console.log(err);
    }
  },
};
