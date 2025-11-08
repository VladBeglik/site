import React from 'react';
import RequestForm from "./RequestForm.tsx";
import Contact from "./Contact.tsx";
import ProjectsGallery from "./ProjectsGallery.tsx";

const HomePage: React.FC = () => {
    return (
        <main className="pt-16 bg-white">
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
                    <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
                        <div className="flex flex-col items-center lg:items-start space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight animate-fade-in">
                                Мебель на заказ
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-md lg:max-w-none animate-fade-in-delay">
                                Создаем уникальную мебель для вашего дома с любовью к деталям
                            </p>
                            <button
                                className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-black text-black transition-all duration-300 hover:bg-black hover:text-white text-lg sm:text-xl font-medium rounded-lg shadow-lg hover:shadow-xl active:scale-95 transform animate-fade-in-delay-2">
                                Подробнее
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl animate-fade-in-delay-3">
                        <img 
                            src={`${import.meta.env.BASE_URL}projects/sofas/sofas-001.jpg`} 
                            alt="Мебель на заказ"
                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                if ((img as any).dataset.fallbackApplied === '1') return;
                                (img as any).dataset.fallbackApplied = '1';
                                img.src = `/projects/sofas/sofas-001.jpg`;
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 flex items-center">
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
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black">Проекты</h2>
                        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            Изучите наши лучшие работы и проекты. Каждый предмет мебели создан с любовью к деталям и вниманием к потребностям клиентов.
                        </p>
                    </div>
                    <ProjectsGallery />
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black">Дизайн в гармонии с пространством</h2>
                        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8">
                            Каждый предмет мебели Furman обладает собственной индивидуальностью. Но вместе с этим, благодаря принципу модульности, с легкостью встраивается в экосистему любого дома. Кровати с мягкими изголовьями, стильные модульные диваны, изящные стулья и кресла зададут настроение любому помещению. Оригинальные стеллажи, уникальные обеденные и журнальные столы, элегантные комоды, тумбы и консоли сделают комнату функциональной.
                        </p>
                    </div>
                </div>
            </section>
            <div id="contacts-section">
                <RequestForm/>
            </div>
            <Contact/>
        </main>
    );
};

export default HomePage;
