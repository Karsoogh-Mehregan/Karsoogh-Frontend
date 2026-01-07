import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoIcon from '../assets/Karsoogh.ico';

type NavbarItemData = {
  content: string;
  href: string;
};

const NavBarItems: NavbarItemData[] = [
  { content: 'خانه', href: '/' },
  { content: 'درباره ما', href: '/About' },
];

const NavItems = () => {
  return (
    <div className="hidden md:flex items-center gap-10 h-full">
      {NavBarItems.map(({ content, href }, index) => (
        <a
          key={index}
          href={href}
          className="relative flex items-center h-full text-gray-300 text-base font-semibold hover:text-white transition-colors group"
        >
          {content}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
        </a>
      ))}
    </div>
  );
};

const Logo = () => {
  return (
    <div className="group cursor-pointer">
      <img
        src={logoIcon}
        alt="Karsoogh Logo"
        className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
      />
    </div>
  );
};

const LoginButton = () => {
  return (
    <a
      href="/login"
      className="flex items-center justify-center cursor-pointer select-none border border-white/20 text-white px-5 py-1.5 md:px-6 md:py-2 rounded-lg font-bold hover:bg-white/10 transition-all hover:-translate-y-0.5 active:scale-95 text-sm md:text-base"
    >
      ورود
    </a>
  );
};

const SingUpButton = () => {
  return (
    <a
      href="/sign-up"
      className="hidden md:flex items-center justify-center cursor-pointer select-none bg-white text-[#0d1117] px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all hover:-translate-y-0.5 active:scale-95"
    >
      ثبت نام
    </a>
  );
};

const Hamburger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button className="md:hidden text-white p-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
};

const MobileMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`
          absolute top-full left-0 w-full 
          border-t border-white/5 border-b border-white/10
          transition-all duration-300 ease-in-out md:hidden
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
    >
      <div className="w-full h-full bg-gray-900/95 backdrop-blur-md">
        <ul className="flex flex-col items-center gap-8 text-xl py-10">
          {NavBarItems.map((item, index) => (
            <li key={index}>
              <a
                onClick={() => setIsOpen(false)}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.content}
              </a>
            </li>
          ))}

          {/* Sign Up Button inside Mobile Menu */}
          <li className="w-full px-10">
            <a
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-4 bg-white text-[#0d1117] rounded-xl font-bold active:scale-95 transition-transform shadow-lg"
            >
              ثبت نام
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800/30 backdrop-blur-md border-b border-white/10 flex items-center z-50">
      <div className="w-[90%] max-w-12xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center gap-12 md:gap-16 h-full">
          <Logo />
          <NavItems />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <LoginButton />
          <SingUpButton />

          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navbar;
