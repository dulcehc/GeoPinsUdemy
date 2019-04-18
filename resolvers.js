const user = {
  _id: "1",
  name: "Dulce",
  email: "dulce.hernandezc@gmail.com",
  picture: "soomeurl"
}

module.exports = {
  Query: {
    me: () => user
  }
}