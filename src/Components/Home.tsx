
export default function Home() {
    return (
        <>
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

            <section className="pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 text-center">
                            Мебель с заботой о стиле и комфорте
                        </h2>
                        <div className="text-lg sm:text-xl leading-relaxed text-gray-700 space-y-6">
                            <p>
                                Это мягкая и корпусная мебель, созданная с вниманием к каждой детали. Наши коллекции вдохновлены современным дизайном и мировыми традициями изготовления мебели.
                            </p>
                            <p>
                                Мы помогаем воплотить самые амбициозные интерьерные идеи в жизнь, благодаря творческому подходу к процессу производства.
                            </p>
                            <p>
                                Разнообразие форм, текстиля и материалов обеспечивают пространство для фантазии и позволяют воплощать в жизнь захватывающие решения для любых комнат.
                            </p>
                            <p>
                                Комфорт и непревзойденное качество, сдержанность и изысканность изделий - то, что ценят наши клиенты.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}