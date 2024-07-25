import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms";
import { useTransfer } from "../../utils/context/transfersContext";

const defaultFormValues = {
  amount: 0,
  receipt: "",
  sender: "",
  status: "pending",
};

function CardSection() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [users, setUsers] = useState([]);
  const { transfers, setTransfer } = useTransfer();

  useEffect(() => {
    async function callAPI() {
      const response = await fetch(`http://localhost:3001/users`);
      const data = await response.json();

      setUsers(data);
    }

    callAPI();
  }, []);

  useEffect(() => {
    setFormValues((values) => ({
      ...values,
      amount: transfers.amount,
      token: transfers.selectedToken,
      createdBy: user.username,
    }));
  }, [transfers, user.username]);

  // https://www.radix-ui.com/primitives/docs/components/select
  function CustomSelect({ label, name }) {
    return (
      <Select
        onValueChange={(value) => {
          setFormValues((values) => ({ ...values, [name]: value }));
        }}
        value={formValues[name]}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup onChange={handleChange}>
            {users.map(({ id, username }) => (
              <SelectItem key={id} value={username}>
                {username}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormValues((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/transactions", {
        method: "POST",
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
      setFormValues(defaultFormValues);
      setTransfer({});
    } catch (error) {
      // TODO: Error boundary
      console.error("Error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Token Transfer Requests</CardTitle>
          <CardDescription>
            {transfers.selectedToken
              ? transfers.selectedToken
              : "Select from the table area token"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Select component */}
          <div className="flex flex-row items-center justify-center space-x-4">
            <CustomSelect label="Select a sender" name="sender" />
            <div className="">to</div>
            <CustomSelect label="Select a recipient" name="receipt" />
          </div>
          {/* Input component */}
          <Input
            className="mt-4"
            data-testid="input-amount"
            defaultValue={0}
            name="amount"
            onChange={handleChange}
            placeholder="amount"
            type="number"
            value={formValues.amount}
          />
        </CardContent>
        <CardFooter>
          <Button data-testid="button-transfer">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default CardSection;
