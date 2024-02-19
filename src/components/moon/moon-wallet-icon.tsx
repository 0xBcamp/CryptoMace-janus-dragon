import { useState } from "react";
import { Button } from "../ui/button";
import { useMoonSDK } from "@/app/usemoonsdk";
import { useAccount } from "wagmi";

const MoonWalletIcon = () => {
  const { moon, disconnect: originalDisconnect } = useMoonSDK();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { address } = useAccount();

  // Function to format the address
  const formatAddress = (address: string) => {
    if (!address) return ""; // Return empty string if address is not provided
    const prefix = address.substring(0, 5); // Take first 5 characters
    const suffix = address.substring(address.length - 4); // Take last 4 characters
    return `${prefix}...${suffix}`; // Concatenate with ellipses in the middle
  };

  const disconnect = async () => {
    try {
      setIsLoading(true);
      setError(""); // Reset error state
      await originalDisconnect();
      // Perform any additional logic needed after successful disconnect
    } catch (error) {
      setError("Error disconnecting from Moon. Please try again."); // Update error message based on actual error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-4  flex flex-row items-center justify-between">
      <Button
        type="button"
        variant="secondary"
        className="bg-primary text-black p-2 rounded mt-2"
        onClick={disconnect}
      >
        {isLoading
          ? "Disconnecting..."
          : `${address && formatAddress(address)} Disconnect`}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MoonWalletIcon;
