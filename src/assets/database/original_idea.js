/**
 * TODO: 
 * - Balance not negative
 * - Balance not a number
 */
const database = [
  {
    user: "user1",
    password: "asdf",
    balance: [
      { token: "1de062ce-677d-4e35-9929-f8e96fe5109a", amount: 1124 },
      { token: "a6bbffbd-355a-4795-9f3a-c224da4bbd23", amount: 1528 },
      { token: "fd8a6d2b-6ebf-4a76-8d1f-919cd56ffd22", amount: 1523 },
      { token: "7ff66ec2-32d2-4472-90d8-357a9eef742d", amount: 1934 },
      { token: "31099149-83dc-435d-8140-8ebf39069e6f", amount: 1365 },
      { token: "6addca87-a2f1-4a8d-80ce-728e588265aa", amount: 1734 },
      { token: "d41388fd-b47b-445c-9134-5b3d95afa0a0", amount: 1543 },
      { token: "4d58cd3e-5130-4bdb-9d32-b26f7fcbc9c6", amount: 1973 },
      { token: "440e1dc3-d665-4866-bdc0-ed45b843c65c", amount: 1725 },
      { token: "72bb5f81-1a1a-4ffc-9c69-e240d2b29f35", amount: 1258 },
    ],
    transactions: [
      {
        to: "user2",
        token: "1de062ce-677d-4e35-9929-f8e96fe5109",
        status: "pending",
        amount: 100,
      },
    ],
  },
  {
    user: "user2",
    password: "dailyNews%",
    balance: [
      { token: "ebc81e18-dca7-40fd-ad0a-b30a24a7eca0", amount: 1339 },
      { token: "8e33fd73-12ac-41d3-95b4-78657d3e10d8", amount: 1462 },
      { token: "8958ba02-66a2-44c8-af0a-2f5070797bb6", amount: 1784 },
    ],
    transactions: [],
  },
];

export default database;
