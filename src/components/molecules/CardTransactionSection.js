import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms";
import { useTransfer } from "../../utils/context/transfersContext";
import { useEffect } from "react";

function CardTransactionSection() {
  const [transactions, setTransactions] = useState([]);
  const { transfers } = useTransfer();

  async function callTransactionsAPI() {
    const response = await fetch(`http://localhost:3001/transactions`);
    const data = await response.json();

    setTransactions(data);
  }

  async function updateTransactionAPI(id, status) {
    const obj = transactions.find((transaction) => transaction.id === id);
    const formValues = {
      ...obj,
      status,
    }
    try {
      const response = await fetch(`http://localhost:3001/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
  
      if (!response.ok) {
        // TODO: Error boundary
        throw new Error(`Error: ${response.statusText}`);
      }
  
      await response.json();
      callTransactionsAPI();
    } catch (error) {
      // TODO: Error boundary
      console.error("Error:", error);
    }
  }

  function handleChangeStatus(id, value) {
    updateTransactionAPI(id, value)
  }

  // https://www.radix-ui.com/primitives/docs/components/select
  function CustomSelect({ value, id }) {
    return (
      <Select onValueChange={(value) => handleChangeStatus(id, value)} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Change the status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="approved">approved</SelectItem>
            <SelectItem value="declined">declined</SelectItem>
            <SelectItem value="completed">completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  useEffect(() => {
    callTransactionsAPI();
  }, []);

  useEffect(() => {
    callTransactionsAPI();
  }, [transfers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions section</CardTitle>
        <CardDescription>Here you can see all the transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(
              ({ id, sender, receipt, amount, token, status }) => (
                <TableRow key={id}>
                  <TableCell>{sender}</TableCell>
                  <TableCell>{receipt}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{token}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>
                    <CustomSelect id={id} value={status} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="mt-3">
                Total rows {transactions.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CardTransactionSection;
