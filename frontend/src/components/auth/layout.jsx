import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section for Welcome Message */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-gray-800 w-1/2 px-12 relative">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
        <div className="relative max-w-xl space-y-6 text-left text-white z-10">
          <h1 className="text-5xl font-extrabold tracking-wider text-white animate-fadeIn">
            Welcome to Luxora
          </h1>
          <p className="text-lg leading-relaxed opacity-70">
            Elevate your style with the finest fashion pieces, crafted for those
            who appreciate the art of luxury.
          </p>
        </div>
      </div>

      {/* Right Section for Form Outlet */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12 sm:px-8 lg:px-10 transition-all duration-300 ease-in-out">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
