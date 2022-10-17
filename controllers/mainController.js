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
    const query = `INSERT INTO todos (todo) VALUES($1) RETURNING id,todo,done;`;
    try {
      const result = await request.pg.client.query(query, [todo]);
      //! return inutile probablement car la réponse ne contient pas grand chose ( a regarder dans la requete sql direct )
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (request, h) => {
    // Recuperation de l'id via l'url
    const { id } = request.params;
    const query = `DELETE FROM todos WHERE id=$1`;
    try {
      const result = await request.pg.client.query(query, [id]);
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (request, h) => {
    const { id } = request.params;
    const { done } = request.payload;
    const query = `UPDATE todos SET done=$1 WHERE id=$2 RETURNING id,todo,done;`;
    try {
      const result = await request.pg.client.query(query, [done, id]);
      return result.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
