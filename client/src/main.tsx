import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import "./index.css";
import "./styles/theme.css";
import { RouterProvider } from "@tanstack/react-router";
import queryClient from "./config/query.client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")!).render(
  <Provider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
