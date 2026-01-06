import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  // console.log(user?.email);

  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    // queryKey: ["orders", user?.email],
    // queryFn: async () => {
    //   const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`, {
    //     headers: {
    //       authorization: `Bearer ${token}`
    //     }
    //   });
    //  return res.json();
    // },

    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      //return data.payments || data.data || [];
      return Array.isArray(data) ? data : [];
    },
  });
  // console.log(orders);

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div className="section-container">
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* Texts */}
          <div className=" space-y-7 px-4">
            <h2 className="text-black md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track all your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table */}
      <div>
        <div>
          <div className="overflow-x-auto text-black">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Order date</th>
                  <th>transaction Id</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {Array.isArray(orders) &&
                  orders.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.createdAt}</td>
                      <td className="font-medium">{item.transactionId}</td>
                      <td>${item.price}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link to="/contact" className=" text-red">
                          Contact
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
