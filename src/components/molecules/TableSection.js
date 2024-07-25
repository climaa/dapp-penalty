import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms";
import { useTransfer } from "../../utils/context/transfersContext";

function TableSection() {
  const [pool, setPool] = useState([]);
  const { setTransfer } = useTransfer();

  useEffect(() => {
    async function callAPI() {
      const response = await fetch(`http://localhost:3001/pool?_limit=10`);
      const data = await response.json();

      setPool(data);
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
          {pool.map(({ token, amount }) => (
            <TableRow key={token}>
              <TableCell className="font-medium">{token}</TableCell>
              <TableCell className="text-right">{amount}</TableCell>
              <TableCell className="text-right">
                <ArrowRightIcon
                  onClick={() => setTransfer({ selectedToken: token, amount })}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <p className="mt-3">Total rows {pool.length}</p>
        </TableFooter>
      </Table>
    </CardSection>
  );
}

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

export default TableSection;
