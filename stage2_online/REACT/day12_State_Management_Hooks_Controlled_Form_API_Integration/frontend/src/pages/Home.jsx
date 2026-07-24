import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-gray-800">Product</h1>
      {/* <p className=""></p> */}

      <Link to="/Product">
        <Button
          size="lg"
          className="text-lg px-8"
        >
          Liat Product
        </Button>
      </Link>
    </div>
  );
}
