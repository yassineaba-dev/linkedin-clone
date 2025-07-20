import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Add a default query function to handle queries without explicit queryFn
      queryFn: async ({ queryKey }) => {
        // Handle different query keys
        if (queryKey[0] === 'authUser') {
          // Replace with your actual auth user fetch function
          return await fetch('/api/auth/user').then(res => res.json());
        }
        if (queryKey[0] === 'posts') {
          // Replace with your actual posts fetch function
          return await fetch('/api/posts').then(res => res.json());
        }
        throw new Error(`No queryFn provided and no default handler for key: ${queryKey[0]}`);
      },
      // Other default options
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// For React Router future flags (optional)
const routerConfig = {
  future: {
    v7_startTransition: true,      // Opt-in to v7 behavior early
    v7_relativeSplatPath: true,    // Opt-in to v7 behavior early
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter {...routerConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);