import React, { useEffect, useState } from 'react'
import { HiOutlineHeart } from "react-icons/hi";
import { Link } from 'react-router'
import { navbar } from "../data/Data";
import { MdOutlineShoppingBag } from 'react-icons/md';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { BiCategoryAlt, BiFilterAlt, BiHome } from 'react-icons/bi';
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 30)
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  const [isSidebarOpen, setIssidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIssidebarOpen(!isSidebarOpen)
  }

  const { data: cartProducts } = useSelector(
    (state) => state.cart
  );

  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div>
      <div className={` md:flex ${sticky ? "fixed header py-4 top-0 z-30 shadow-xl w-full transition-all ease-in-out duration-700" : ""}`}>
        <div className="w-10/12 m-auto flex flex-wrap justify-between items-center h-10 md:h-20">
          <div className="flex flex-wrap items-center text-4xl">
            <div className="p-0 m-0 text-xl font-semibold sm:text-3xl md:text-4xl">miniture</div>
          </div>

          <div className="flex flex-wrap items-center text-base">
            {navbar.map((val, key) => (
              <div key={key} className="ml-4">
                <Link className="active link-hover transition-all" to={val.path}>{val.nav}</Link>
              </div>
            ))}
          </div>
          <div className='hidden md:flex items-center gap-2'>
            <Link>
              <FaRegUser className="text-xl"/>
            </Link>
            <Link>
              <HiOutlineHeart className="text-2xl"/>
            </Link>
            <Link
              onClick={toggleSidebar}
              className={`relative`}
            >
              <MdOutlineShoppingBag className="text-2xl" />
              <div className="items_count">
                <span className="text-white text-base">{cartProducts.length}</span>
              </div>
            </Link>

          </div>


        </div>
      </div>

      <div className="w-screen fixed bottom-0 left-0 z-30 mx-auto h-[50px] bg-[#afafaf] flex justify-around items-center md:hidden">
        <Link
          onClick={() => handleLinkClick('category')}
          className={`flex justify-center items-center p-2 transition-all rounded-md ${activeLink === 'category' ? 'text-slate-200 bg-black' : 'text-black'
            }`}
        >
          <BiCategoryAlt className="text-2xl" />
        </Link>

        <Link
          onClick={() => handleLinkClick('BiFilterAlt')}
          className={`flex justify-center items-center p-2 transition-all rounded-md ${activeLink === 'BiFilterAlt' ? 'text-slate-200 bg-black' : 'text-black'
            }`}
        >
          <BiFilterAlt className="text-2xl" />
        </Link>

        <Link
          to="./"
          onClick={() => handleLinkClick('home')}
          className={`flex justify-center items-center p-2 transition-all rounded-md ${activeLink === 'home' ? 'text-slate-200 bg-black' : 'text-black'
            }`}
        >
          <BiHome className="text-2xl" />
        </Link>

        <Link
          onClick={() => {
            handleLinkClick('cart');
            toggleSidebar();
          }}
          className={`relative flex justify-center items-center p-2 transition-all rounded-md ${activeLink === 'cart' ? 'text-slate-200 bg-black' : 'text-black'
            }`}
        >
          <MdOutlineShoppingBag className="text-2xl" />
          <div className="items_count-bottom top-0 right-0">
            <span className="text-white text-base">{cartProducts.length}</span>
          </div>
        </Link>

        <Link
          onClick={() => handleLinkClick('user')}
          className={`flex justify-center items-center p-2 transition-all rounded-md ${activeLink === 'user' ? 'text-slate-200 bg-black' : 'text-black'
            }`}
        >
          <FaRegUser className="text-2xl" />
        </Link>
      </div>


      <div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => toggleSidebar()}
        />
      </div>
    </div>
  )
}

export default Header