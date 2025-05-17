import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AgentPage from "./pages/AgentPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,  // Wrap all routes inside AuthProvider
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/agent",
        element: (
          <ProtectedRoute role="agent">
            <AgentPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
