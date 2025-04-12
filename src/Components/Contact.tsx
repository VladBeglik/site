export default function Contact() {
    return (
        <footer
            className="bg-black text-white p-12 w-full min-h-[50vh] flex flex-col items-center sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Каталог</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Проекты</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Коллекции</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Публикации</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Материалы</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Дилеры</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Контакты</a>
            </div>

            <div className="flex space-x-4 text-center sm:text-left">
                <a href="https://vk.com/divan_c" target="_blank" rel="noopener noreferrer"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">ВКонтакте</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Instagram</a>
            </div>

            <div className="flex flex-col items-center sm:items-end space-y-2 text-center sm:text-left">
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Название</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Политика
                    конфиденциальности</a>
                <a href="#"
                   className="relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full">Условия
                    использования</a>
                <p>© Название</p>
                <p>Все права защищены.</p>
            </div>
        </footer>
    );
}