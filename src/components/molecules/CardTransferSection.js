import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../atoms";
import { useTransfer } from "../../utils/context/transfersContext";

function CardSection() {
  const { transfers } = useTransfer();

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Token Transfer Requests</CardTitle>
        <CardDescription>
          {transfers.selectedToken ? transfers.selectedToken : 'Select from the table area token'}
        </CardDescription>
      </CardHeader>
      <CardContent>Content here</CardContent>
      <CardFooter>Footer here</CardFooter>
    </Card>
  );
}

export default CardSection;
