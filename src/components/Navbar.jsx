import { useState } from "react";
import { Bell, Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-8 py-3 shadow-md flex justify-between items-center bg-white fixed top-0 z-10">
      <div className="text-xl font-semibold flex items-center gap-2">
        <span className="text-black">😃 Mood Tracker</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a href="#" className=" text-black">Home</a>
        <a href="#Calender" className="text-gray-700 hover:text-black">Calendar</a>
        <a href="#summary" className="text-gray-700 hover:text-black">Summary</a>
        <Bell className="text-gray-700 w-5 h-5" />
        <img
          src="https://randomuser.me/api/portraits/women/75.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-4 py-3 md:hidden z-10">
          <a href="#" className="text-gray-700">Home</a>
          <a href="#Calender" className="text-gray-700">Calendar</a>
          <a href="#summary" className="text-gray-700">Summary</a>
          <div className="flex items-center gap-4 mt-2">
            <Bell className="text-gray-700 w-5 h-5" />
            <img
              src="https://randomuser.me/api/portraits/women/75.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
