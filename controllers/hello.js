import fetch from "node-fetch";

export default {
  test: (request, h) => {
    return "Hello Alexou";
  },
  testi: async (request, h) => {
    const result = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = result.json();
    return data;
  },
};
