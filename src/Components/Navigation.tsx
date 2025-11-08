import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToContacts = () => {
        const contactsSection = document.getElementById('contacts-section');
        if (contactsSection) {
            contactsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const isAdminPage = location.pathname === '/admin';

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-sm p-3 sm:p-4 fixed w-full top-0 z-50 transition-all duration-300">
            <div className="w-full px-4 sm:px-6 flex justify-between items-center">
                <Link 
                    to="/"
                    className="text-2xl sm:text-4xl font-bold cursor-pointer hover:opacity-80 transition-all duration-300 active:scale-95"
                    onClick={scrollToTop}
                >
                    Название
                </Link>
                <button
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Открыть меню"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <nav className={`${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'} lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto transition-all duration-500 ease-out absolute lg:relative top-full lg:top-auto left-0 w-full lg:w-auto bg-white/95 backdrop-blur-sm lg:bg-transparent p-6 lg:p-0 shadow-xl lg:shadow-none border-t border-gray-100 lg:border-none`}>
                    <ul className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 text-black-700">
                        {!isAdminPage && (
                            <>
                                {['Проекты', 'Материалы', 'Контакты'].map((item, index) => (
                                    <li key={item} className={`transition-all duration-300 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0 lg:translate-x-0 lg:opacity-100'}`} style={{ transitionDelay: menuOpen ? `${index * 100}ms` : '0ms' }}>
                                        {item === 'Контакты' ? (
                                            <button 
                                                onClick={() => {
                                                    scrollToContacts();
                                                    setMenuOpen(false);
                                                }}
                                                className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer text-lg lg:text-base font-medium transition-all duration-300 hover:text-gray-600 active:scale-95"
                                            >
                                                {item}
                                            </button>
                                        ) : (
                                            <a href="#" className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full text-lg lg:text-base font-medium transition-all duration-300 hover:text-gray-600">
                                                {item}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </>
                        )}
                        {isAdminPage && (
                            <li className={`transition-all duration-300 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0 lg:translate-x-0 lg:opacity-100'}`} style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}>
                                <Link 
                                    to="/"
                                    className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full text-lg lg:text-base font-medium transition-all duration-300 hover:text-gray-600 flex items-center gap-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Settings size={16} />
                                    На главную
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
