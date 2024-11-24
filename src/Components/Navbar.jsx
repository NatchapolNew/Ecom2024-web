import React,{useState} from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../Store/ecom-store";
import { ChevronDown } from 'lucide-react';
const Navbar = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state)=>state.user)
  const logout = useEcomStore((state)=>state.logout)
  
  const [isOpen,setIsOpen] = useState(false)

  const toggleDropdown = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">

            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>


            <NavLink to={"/"} className={({isActive})=>
              isActive
              ?  "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }
            >
              Home
              </NavLink>

            <NavLink to={"/shop"}
            className={({isActive})=>
              isActive
              ?  "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }>
            Shop
            </NavLink>



            {/* Badge */}
            <NavLink to={"/cart"} 
             className={({isActive})=>
              isActive
              ?  "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }
            >
              Cart
              {carts.length > 0 && (
                <span
                  className="absolute top-0
             bg-red-500 rounded-full px-2"
                >
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

              {
                user
                ?<div className="flex items-center gap-4">
              <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200 px-2
                                  py-3 rounded-md">
                <img 
                className="w-8 h-8"
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-business-man-avatars-flat-icons-pack-people-456324.png?f=webp&w=256" alt="" />
                <ChevronDown />
              </button>
              
              {
              isOpen && (
              <div className="absolute top-16 bg-white shadow-md z-50">
                <Link to={"user/history"}className="block px-4 py-2 hover:bg-slate-200">
                History
                </Link>

                <button onClick={()=>logout()} className="block px-4 py-2 hover:bg-slate-200">
                Logout
                </button>

              </div>)
              }

              


          </div>

                :
                
            <div className="flex items-center gap-4">
            <NavLink to={"/register"}
             className={({isActive})=>
              isActive
              ?  "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }
            >Register
            </NavLink>
            <NavLink to={"/login"}
             className={({isActive})=>
              isActive
              ?  "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }
            >Login
            </NavLink>
          </div>
              }

          

          

            



        </div>
      </div>
    </nav>
  );
};

export default Navbar;
