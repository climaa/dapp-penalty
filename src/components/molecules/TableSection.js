import { useEffect, useState } from "react";
import { ArrowRightIcon } from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms";
import { useTransfer } from "../../utils/context/transfersContext";

function CardSection({ children }) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>A list of your recent balances.</CardTitle>
        <CardDescription>Select from the table area token</CardDescription>
        <CardContent className="p-0">{children}</CardContent>
      </CardHeader>
    </Card>
  );
}

function TableSection() {
  const [balance, setBalance] = useState([]);
  const { setTransfer } = useTransfer();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user.id;

    async function callAPI() {
      const response = await fetch(
        `http://localhost:3001/balance?id=${userId}`
      );
      const data = await response.json();

      setBalance(data);
    }

    callAPI();
  }, []);

  return (
    <CardSection>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tokens</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {balance.map(({ token, amount }) => (
            <TableRow>
              <TableCell className="font-medium">{token}</TableCell>
              <TableCell className="text-right">{amount}</TableCell>
              <TableCell className="text-right">
                <ArrowRightIcon onClick={() => setTransfer({ selectedToken: token })}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardSection>
  );
}

export default TableSection;
