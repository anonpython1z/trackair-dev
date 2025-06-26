import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AdminUser {
  id: string;
  username: string;
  role: "admin" | "super-admin";
  lastLogin?: Date;
}

interface AdminContextType {
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  admins: AdminUser[];
  addAdmin: (
    username: string,
    password: string,
    role: "admin" | "super-admin",
  ) => void;
  removeAdmin: (id: string) => void;
}

// Default admin accounts
const DEFAULT_ADMINS = [
  {
    id: "1",
    username: "admin",
    password: "trackair2024",
    role: "super-admin" as const,
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    role: "admin" as const,
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [admins, setAdmins] = useState<AdminUser[]>(
    DEFAULT_ADMINS.map(({ password, ...admin }) => admin),
  );

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("trackair-admin-auth");
    if (savedAuth) {
      const { user, timestamp } = JSON.parse(savedAuth);
      const oneDay = 24 * 60 * 60 * 1000;

      if (Date.now() - timestamp < oneDay) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("trackair-admin-auth");
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const admin = DEFAULT_ADMINS.find(
      (a) => a.username === username && a.password === password,
    );

    if (admin) {
      const user: AdminUser = {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        lastLogin: new Date(),
      };

      setCurrentUser(user);
      setIsAuthenticated(true);

      // Save to localStorage for persistence
      localStorage.setItem(
        "trackair-admin-auth",
        JSON.stringify({
          user,
          timestamp: Date.now(),
        }),
      );

      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("trackair-admin-auth");
  };

  const addAdmin = (
    username: string,
    password: string,
    role: "admin" | "super-admin",
  ) => {
    const newAdmin: AdminUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      role,
    };

    setAdmins((prev) => [...prev, newAdmin]);

    // In a real app, you'd also add to the DEFAULT_ADMINS or database
    // For now, this just adds to the display list
  };

  const removeAdmin = (id: string) => {
    if (id === "1") {
      // Prevent removing the main admin
      return;
    }
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        admins,
        addAdmin,
        removeAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
