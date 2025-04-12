import './App.css';
import { BrowserRouter, Link } from "react-router-dom";
import { useState } from "react";
import RequestForm from "./Components/RequestForm.tsx";
import Contact from "./Components/Contact.tsx";
import { Menu, X } from "lucide-react";
import ImageSlider from "./Components/ImageSlider.tsx";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <div className="bg-white">
                <header className="bg-white shadow p-2 sm:p-4 fixed w-full top-0 z-10">
                    <div className="w-full px-4 sm:px-6 flex justify-between items-center">
                        <h1 className="text-2xl sm:text-4xl font-bold">Название</h1>
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <nav className={`${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'} lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto transition-all duration-300 absolute lg:relative top-16 lg:top-auto left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none`}>
                            <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-black-700">
                                {['Проекты', 'Материалы', 'Контакты'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </header>

                <main className="pt-16">
                    <section className="my-4 sm:my-8 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6">
                        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12">
                            <div className="lg:w-1/4 text-center lg:text-left flex flex-col items-center lg:items-start">
                                <div className="flex flex-col items-center lg:items-start">
                                    <p className="text-3xl sm:text-4xl font-bold text-black w-full">Мебель на заказ</p>
                                    <button
                                        className="px-6 sm:px-8 py-3 sm:py-4 border border-black text-black transition duration-300 hover:bg-black hover:text-white text-lg sm:text-xl mt-4 self-center rounded-md">
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-lg">
                                <img src={`${import.meta.env.BASE_URL}/img.png`} alt="Описание картинки"
                                     className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"/>
                            </div>
                        </div>
                    </section>

                    <section className="my-4 sm:my-8 py-12 sm:py-16 flex items-center bg-stone-50">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-3xl sm:text-4xl font-bold text-black text-center pb-4">
                                    Мебель с заботой о стиле и комфорте
                                </h1>
                                <p className="mt-4 leading-relaxed text-black text-justify text-base sm:text-xl">
                                    это мягкая и корпусная мебель, созданная с вниманием к каждой детали. Наши коллекции
                                    вдохновлены современным дизайном и мировыми традициями изготовления мебели. Мы
                                    помогаем воплотить самые амбициозные интерьерные идеи в жизнь, благодаря творческому
                                    подходу к процессу производства. Разнообразие форм, текстиля и материалов
                                    обеспечивают пространство для фантазии и позволяют воплощать в жизнь захватывающие
                                    решения для любых комнат. Комфорт и непревзойденное качество, сдержанность и
                                    изысканность изделий - то, что ценят наши клиенты.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[40vh] sm:h-[50vh] md:h-[70vh] w-full">
                        {/* Левая картинка */}
                        <Link to="/collection-2025" className="relative group cursor-pointer overflow-hidden">
                            <div className="relative w-full h-full">
                                <img
                                    src={`${import.meta.env.BASE_URL}/img.png`}
                                    alt="Диваны"
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Диваны</h2>
                                </div>
                            </div>
                        </Link>

                        {/* Средняя картинка */}
                        <Link to="/another-page" className="relative group cursor-pointer overflow-hidden">
                            <div className="relative w-full h-full">
                                <img
                                    src={`${import.meta.env.BASE_URL}/img11.png`}
                                    alt="Кровати"
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Кровати</h2>
                                </div>
                            </div>
                        </Link>

                        {/* Правая картинка */}
                        <Link to="/another-page" className="relative group cursor-pointer overflow-hidden">
                            <div className="relative w-full h-full">
                                <img
                                    src={`${import.meta.env.BASE_URL}/img11.png`}
                                    alt="Стулья"
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Стулья</h2>
                                </div>
                            </div>
                        </Link>
                    </section>

                    <section className="my-4 sm:my-8 py-12 sm:py-16 flex items-center bg-stone-50">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-3xl sm:text-4xl font-bold text-black text-left pb-4">
                                    Дизайн в гармонии с пространством
                                </h1>
                                <p className="mt-4 leading-relaxed text-black text-justify text-lg sm:text-2xl">
                                    Каждый предмет мебели Furman обладает собственной индивидуальностью.
                                    Но вместе с этим, благодаря принципу модульности, с легкостью встраивается
                                    в экосистему любого дома. Кровати с мягкими изголовьями, стильные модульные диваны,
                                    изящные стулья и кресла зададут настроение любому помещению. Оригинальные стеллажи,
                                    уникальные обеденные и журнальные столы, элегантные комоды,
                                    тумбы и консоли сделают комнату функциональной.
                                </p>
                            </div>
                        </div>
                    </section>
                    <RequestForm/>
                    <Contact/>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;