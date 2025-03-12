export default function Contact() {
    return (
        <footer className="bg-black text-white p-12 w-full min-h-[50vh] flex items-center">
            <div className="container mx-auto flex justify-between items-center w-full">
                {/* Левая часть футера */}
                <div className="flex flex-col space-y-2">
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Каталог
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Проекты
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Коллекции
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Публикации
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Материалы
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Дилеры
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Контакты
                    </a>
                </div>

                {/* Средняя часть футера (социальные сети) */}
                <div className="flex space-x-4">
                    <a
                        href="https://vk.com/divan_c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        ВКонтакте
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Instagram
                    </a>
                </div>

                {/* Правая часть футера */}
                <div className="flex flex-col items-end space-y-2">
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Название
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Политика конфиденциальности
                    </a>
                    <a
                        href="#"
                        className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Условия использования
                    </a>
                    <p>© Название</p>
                    <p>Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}