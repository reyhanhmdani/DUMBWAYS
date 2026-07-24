import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  // const [isLoading, setIsLoading] = useState(false);

  // simulasi login
  const simulasiLogin = (email, password) => {
    // generate dummy token dan user object
    console.log("login dengan : ", email, password);

    const dummyToken = "jwt-simulasi-token-1234567";
    const dummyUser = {
      id: 1,
      name: email.split("@")[0].toUpperCase(),
      email: email,
      role: email.toLowerCase().includes("admin") ? "ADMIN" : "USER",
    };

    setToken(dummyToken);
    setUser(dummyUser);
    localStorage.setItem("token", dummyToken);
    localStorage.setItem("user", JSON.stringify(dummyUser));

    return { success: true, user: dummyUser };
  };

  // logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        simulasiLogin,
        logout,
        // isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus di pakai di dalam AuthProvider");
  }
  return context;
};
