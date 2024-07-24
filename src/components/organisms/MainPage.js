/**
 * {@link https://tailwindflex.com/@mohit/sky-gradient}
 * {@link https://tailwindflex.com/@oliver-hansen/tailwind-sidebar-layout}
 */
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth"; 

function MainPage() {
  useAuth();

  return (
    <div class="flex h-screen bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500" data-testid="main">
    {/* sidebar */}
    <div className="hidden md:flex flex-col w-64 bg-gray-800" data-testid="sidebar">
        <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">DAPP - Penalty</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Dashboard
                </Link>
            </nav>
        </div>
    </div>

    {/* Main content */}
    <div className="flex flex-col flex-1 overflow-y-auto" data-testid="main-content">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div className="flex items-center px-4">
                <button className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center pr-4">
                <button
                    className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
            <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
