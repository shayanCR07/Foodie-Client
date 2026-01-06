import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email && !loading, // 🔑 MOST IMPORTANT LINE
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/cart?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      return res.json();
    },
  });

  return [cart, refetch, isLoading];
};

export default useCart;
