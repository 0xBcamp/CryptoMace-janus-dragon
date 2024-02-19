"use client";
import { Source_Code_Pro as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import Providers from "./providers";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`Graphql error ${message}`);
      if (locations) {
        locations.forEach((location) => {
          console.log(
            `Location: Line ${location.line}, Column: ${location.column}`
          );
        });
      }
      if (path) {
        console.log(`Path: ${path.join(" -> ")}`);
      }
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError.message}`);
  }
});
const link = from([
  errorLink,
  new HttpLink({
    uri: "https://macepapa-backend-jd-final-production.up.railway.app/",
  }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </Providers>
      </body>
    </html>
  );
}
