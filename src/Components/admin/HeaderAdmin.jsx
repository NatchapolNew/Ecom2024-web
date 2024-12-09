import React from "react";
import useEcomStore from "../../Store/ecom-store";
import { dateformat } from "../../utils/DateFormat";
const HeaderAdmin = () => {
  const user = useEcomStore((state) => state.user);
  console.log(user);
  return (
    <>
      <header className="bg-white h-16 flex items-center px-6">
        <div className="flex font-semibold">
          <p>Email : </p>
          <p className="ml-1">{user.email}</p>
          <p className="ml-5">ชื่อผู้ใช้งาน:</p>
          <p className="ml-1">{user.name}</p>
          <p className="ml-5">สถานะ:</p>
          <p className="ml-1">{user.role}</p>
          <p className="ml-5">สร้างเมื่อวันที่:</p>
          <p className="ml-1">{dateformat(user.createdAt)}</p>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
