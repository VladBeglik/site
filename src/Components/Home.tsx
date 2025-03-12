
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
        </>
    );
}