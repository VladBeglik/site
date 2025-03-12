import './App.css';
import { BrowserRouter } from "react-router-dom";
import RequestForm from "./Components/RequestForm.tsx";
import Contact from "./Components/Contact.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="bg-white">
                <header className="bg-white shadow p-4 fixed w-full top-0 z-10">
                    <div className="w-full px-12 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Название</h1>
                        <nav>
                            <ul className="flex space-x-6 text-black-700">
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Каталог</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Проекты</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Коллекции</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Публикации</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Материалы</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Дилеры</a>
                                </li>
                                <li><a href="#"
                                       className="relative after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Контакты</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <main className="mt-[4rem]">
                    <section className="my-8 min-h-screen flex items-center">
                        <div className="container mx-auto px-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-1/3 text-center">
                                    <p className="text-3xl font-bold text-black">
                                        Мебель на заказ
                                    </p>
                                    <button
                                        className="mt-4 px-6 py-2 bg-white border border-black text-black transition-colors duration-300 hover:bg-black hover:text-white">
                                        Подробнее
                                    </button>
                                </div>
                                <img src="src/assets/img.png" alt="Описание картинки" className="w-2/3 pt-20"/>
                            </div>
                        </div>
                    </section>


                    <section className="my-8 min-h-[50vh] flex items-center bg-white">
                        <div className="container mx-auto px-8">
                            <div className="flex flex-col lg:flex-row items-center justify-between">

                                {/* Левая колонка: текст */}

                                <div className="lg:w-1/2 mt-6 mr-10 lg:mt-0">
                                    <img
                                        src="src/assets/img_1.png"
                                        alt="Мебель с заботой о стиле и комфорте"
                                        className="w-6/8"
                                    />
                                </div>

                                {/* Правая колонка: изображение */}
                                <div className="lg:w-1/2 text-justify">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-black">
                                        Мебель с заботой о стиле и комфорте
                                    </h1>
                                    <p className="mt-4 text-black leading-relaxed pt-8 text-black">
                                        Это мягкая и корпусная мебель, созданная с вниманием к каждой детали.
                                        Коллекции вдохновлены современным дизайном и мировыми традициями
                                        изготовления мебели. Мы помогаем воплотить самые амбициозные интерьерные идеи в
                                        жизнь, благодаря творческому подходу к процессу производства. Разнообразие форм,
                                        текстиля и материалов обеспечивают пространство для фантазии и позволяют
                                        воплощать в жизнь захватывающие решения для любых комнат. Комфорт и
                                        непревзойденное качество, сдержанность и изысканность изделий – то, что ценят
                                        наши клиенты.
                                    </p>
                                </div>

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
