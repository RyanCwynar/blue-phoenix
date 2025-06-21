import React from "react";
import Logo from "../common/Logo";
import Menu from "../common/Menu";

const menuItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Features",
    url: "#Benefits",
  },
  {
    title: "Get Started",
    url: "/notes",
  },
  {
    title: "Reviews",
    url: "#reviews",
  },
];

const Footer = () => {
  return (
    <>
      <div className="container hidden sm:block py-12">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center pb-6">
          <Logo />
          <Menu menuItems={menuItems} />
        </div>
        <div className="pt-8 border-t-[#929292] border-t border-solid">
          <h3 className="text-gray-900 text-xl not-italic font-semibold leading-[30px] font-montserrat pb-2">
            Manage your stem cell care with Blue Phoenix
          </h3>
          <div className="flex justify-between">
            <p className="text-gray-600 font-montserrat text-base not-italic font-normal leading-6">
              Access your records and appointments from anywhere.
            </p>
            <p className="text-gray-600 font-inter text-base not-italic font-normal leading-6">
              © 2023 Blue Phoenix. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="container sm:hidden pt-7 pl-6 pr-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-6">
            <Logo />
            <h3 className="text-[#101828] text-base not-italic font-semibold leading-[18px] font-montserrat">
              Manage your stem cell care with Blue Phoenix
            </h3>
            <p className="text-[#101828] font-montserrat text-base not-italic font-light leading-[18px]">
              Access your records and appointments from anywhere.
            </p>
          </div>
          <div className="min-w-[100px]">
            <Menu menuItems={menuItems} />
          </div>
        </div>
        <p className="text-[#667085] font-inter text-center text-base not-italic font-light leading-[18px] py-11">
          © 2023 Blue Phoenix. All rights reserved. <br />
          <span className="mt-1"> Icons by Icons8</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
