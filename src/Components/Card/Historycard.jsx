import React, { useState, useEffect } from "react";
import { getOrders } from "../../Api/user";
import useEcomeStore from "../../Store/ecom-store";
import { dateformat } from "../../utils/DateFormat";
import { numberFormat } from "../../utils/number";

const Historycard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomeStore((state) => state.token);

  useEffect(() => {
    hdlgetOrders(token);
  }, []);

  const hdlgetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status)=>{
    switch(status){
        case "Not Process":
            return 'bg-gray-200'
        case "Processing":
            return "bg-blue-200"
        case "Completed":
            return "bg-green-200"
        case "Cancel":
            return "bg-red-200"
        
    }
  }


  return (
    <div className="space-y">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>

      {/* คลุมAll */}
      <div className="space-y-4">
        {/* Card Loop order*/}

        {orders?.map((item, index) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <div key={index}>
                {/* Header */}
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm">Order date</p>
                    <p className="font-bold">{dateformat(item.updatedAt)}</p>
                  </div>

                  <div>
                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                      {item.orderStatus}
                      </span>
                      
                      </div>
                </div>

                {/* Table Loop product*/}
                <div>
                  <table className="border w-full ">
                    <thead>
                      <tr className="bg-gray-200">
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>ราคารวม</th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.products?.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{product.product.title}</td>
                            <td>{numberFormat(product.product.price)}</td>
                            <td>{product.count}</td>
                            <td>{numberFormat(product.count * product.product.price)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div>
                  <div className="text-right">
                    <p>ราคาสุทธิ</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Historycard;
