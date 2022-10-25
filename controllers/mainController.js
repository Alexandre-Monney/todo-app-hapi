export default {
  getTodos: async (request, h) => {
    const query = `SELECT * FROM todos ORDER BY id ASC;`;
    try {
      // methode pour faire une requete a la bdd avec le module hapi-postgres
      const result = await request.pg.client.query(query);
      const formated = {
        data: result.rows.map((e) => ({
          type: "todo",
          id: e.id,
          attributes: { todo: e.todo, done: e.done },
        })),
      };
      return formated;
    } catch (err) {
      console.log(err);
    }
  },
  addTodo: async (request, h) => {
    // Recuperation de la valeur de l'input envoyée par le front
    const {
      data: {
        attributes: { todo },
      },
    } = request.payload;
    console.log(todo);
    // requete préparée pour prevention injection sql
    const query = `INSERT INTO todos (todo) VALUES($1) RETURNING id,todo,done;`;
    try {
      const result = await request.pg.client.query(query, [todo]);
      // Formattage pour correspondre au modele JSON:API pour le front EmberJS
      const formated = {
        data: result.rows.map((e) => ({
          type: "todo",
          id: e.id,
          attributes: { todo: e.todo, done: e.done },
        })),
      };
      return formated;
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
      console.log("deleted todo : ", id);
      const formated = {
        data: result.rows.map((e) => ({
          type: "todo",
          id: e.id,
          attributes: { todo: e.todo, done: e.done },
        })),
      };
      return formated;
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (request, h) => {
    const { id } = request.params;
    const {
      data: {
        attributes: { done },
      },
    } = request.payload;
    console.log(done);
    // console.log(JSON.parse(done).done);
    const query = `UPDATE todos SET done=$1 WHERE id=$2 RETURNING id,todo,done;`;
    try {
      const result = await request.pg.client.query(query, [done, id]);
      const formated = {
        data: result.rows.map((e) => ({
          type: "todo",
          id: e.id,
          attributes: { todo: e.todo, done: e.done },
        })),
      };
      return formated;
    } catch (err) {
      console.log(err);
    }
  },
};
