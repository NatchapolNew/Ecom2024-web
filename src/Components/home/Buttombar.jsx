import React from "react";
import { Link } from "react-router-dom";
const Buttombar = () => {
  return (
    <div>
      <div className=" bg-black w-full h-full ">
        <div className="flex flex-wrap justify-center gap-36 p-10">
          <div>
            <p className="text-white font-bold text-2xl">เกี่ยวกับเรา</p>
            <ul className="text-gray-400 mt-4 ">
              <li className="hover:text-gray-300">
                <Link to={"/"}>ติดต่อเรา</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>เกี่ยวกับเรา</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>ข้อกำหนดและเงื่อนไข</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>นโยบายความเป็นส่วนตัว</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-2xl">บริการลูกค้า</p>
            <ul className="text-gray-400 mt-4">
              <li className="hover:text-gray-300">
                <Link to={"/"}>การจัดส่งสินค้า</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>การรับประกันสินค้า</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>การยกเลิกการสั่งซื้่อสินค้า</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to={"/"}>การคืนสินค้าการคืนเงิน</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-2xl">เกี่ยวกับเรา</p>
            <ul className="text-gray-400 mt-4">
              <li>
                <p to={"/"}>แขวงบางไผ่ เขตบางแค กรุงเทพฯ10160</p>
              </li>
              <li>
                <p to={"/"}>โทรศัพท์ : -</p>
              </li>
              <li>
                <p to={"/"}>อีเมล: natchapol.saiwoothi@hotmail.com</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between px-52 py-4">
          <div className="text-white">
            <p>Copyright © 2024 Natchapol All rights reserved.</p>
          </div>

          <div>
            <ul className="text-white flex gap-4">
              <li className="hover:text-red-600"><Link to={'/'}>ข้อกำหนดและเงื่อนไข</Link></li>
              <li className="hover:text-red-600"><Link to={'/'}>นโยบายความเป็นส่วนตัว</Link></li>
              <li className="hover:text-red-600"><Link to={'/'}>การจัดการคุกกี้</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttombar;
