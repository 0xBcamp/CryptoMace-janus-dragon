import React, { useState } from "react";
import { useMoonSDK } from "../../app/usemoonsdk";
import {
  EmailLoginInput,
  EmailSignupInput,
  EmailSignupResponse,
} from "@moonup/moon-api"; // Ensure this path is correct
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(true);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [authenticatedAddress, setAuthenticatedAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { moon, connect, createAccount, disconnect, updateToken, initialize } =
    useMoonSDK();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleInitializeAndConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      await initialize();
      await connect();
      console.log("Connected to Moon");

      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting to Moon", error);
      setError("Error connecting to Moon");
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    try {
      setLoading(true);
      setError(null);

      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");

        // Sign up the user
        const auth = moon?.getAuthSDK();
        const signupRequest: EmailSignupInput = {
          email,
          password,
        };
        console.log("Signing up...");
        const signupResponse: any = await auth?.emailSignup(signupRequest);
        console.log("Signup successful:", signupResponse);

        setSignupSuccess(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      // Authenticate the user and sign in
      const auth = moon?.getAuthSDK();
      const loginRequest: EmailLoginInput = {
        email,
        password,
      };
      console.log("Authenticating...");
      const loginResponse: any = await auth?.emailLogin(loginRequest);
      console.log("Authentication successful:", loginResponse);

      // Set tokens and email
      console.log("Updating tokens and email...");
      await updateToken(
        loginResponse.data.token,
        loginResponse.data.refreshToken
      );
      moon?.MoonAccount.setEmail(email);
      moon?.MoonAccount.setExpiry(loginResponse.data.expiry);
      console.log("Tokens and email updated!");

      // Perform sign-in logic with MoonSDK
      console.log("Creating account...");
      const newAccount = await createAccount();
      console.log("New Account Data:", newAccount?.data);
      console.log("Setting expiry and navigating...");
      moon?.MoonAccount.setExpiry(loginResponse.data.expiry);
      setSignInSuccess(true);
      setAuthenticatedAddress(newAccount?.data.data.address);
      console.log("Authenticated Address:", newAccount.data.data.address);
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Error signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      setError(null);

      // Disconnect from Moon
      console.log("Disconnecting...");
      await disconnect();
      console.log("Disconnected");
      setIsConnected(false);
    } catch (error) {
      console.error("Error during disconnection:", error);
      setError("Error disconnecting from Moon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-96">
      {!isConnected && (
        <div>
          <Button variant="default" onClick={handleInitializeAndConnect}>
            {loading ? "Connecting..." : "Connect to Moon Wallet"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {isConnected && !signupSuccess && !signInSuccess && (
        <form className="bg-primary shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Sign up for a Moon Account
            </h2>
            <Input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-2"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-2"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border p-2 rounded mb-2 ${
                passwordError ? "border-red-500" : ""
              }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button variant="default" onClick={handleSignup}>
              {loading ? "Signing up..." : "Sign up for a Moon Account"}
            </Button>
            {error && <p className="text-red-500 ml-2">{error}</p>}
          </div>
        </form>
      )}

      {signupSuccess && !signInSuccess && isConnected && (
        <div className="mb-4 text-center text-primary">
          <p>Congratulations! Your Moon account is created.</p>
          <p>Created an account to sign in.</p>
          <form className="bg-black  shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
              <Input
                type="email"
                placeholder="Email"
                className="w-full border-primary text-primary p-2 rounded mb-2"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                className="w-full border-primary text-primary p-2 rounded mb-2"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex justify-center">
              <Button variant="default" onClick={handleSignIn}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              {error && <p className="text-red-500 ml-2">{error}</p>}
            </div>
          </form>
        </div>
      )}

      {signInSuccess && isConnected && (
        <div className="mt-4 text-center bg-primary-foreground rounded-full flex flex-row items-center justify-between">
          <p>{authenticatedAddress}</p>
          <Button
            type="button"
            variant="secondary"
            className="bg-red-500 text-white p-2 rounded mt-2"
            onClick={handleDisconnect}
          >
            {loading ? "Disconnecting..." : "Disconnect"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
