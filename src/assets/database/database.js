const database = [
  {
    user: "user1",
    password: "asdf",
    balance: [
      { token: "usd", amount: 1000 },
      { token: "eur", amount: 1000 },
      { token: "jpy", amount: 100 },
    ],
    transactions: [
      { to: "user2", token: "usd", status: "pending", amount: 100 },
    ],
  },
  {
    user: "user2",
    password: "asdasdff",
    balance: [
      { token: "usd", amount: 1000 },
      { token: "eur", amount: 1000 },
      { token: "jpy", amount: 100 },
    ],
  },
];

export default database;
