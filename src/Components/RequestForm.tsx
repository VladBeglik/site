import { useState } from "react";

export default function RequestForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Имитация отправки формы
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        alert("Заявка отправлена!");
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Задайте нам вопрос</h2>
                        <p className="text-gray-600 text-lg">
                            или свяжитесь для сотрудничества
                        </p>
                    </div>

                    <form className="space-y-8 p-8 sm:p-12" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Как вас зовут?</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border-b-2 border-black outline-none py-3 text-xl"
                                placeholder="Введите ваше имя"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Ваш контактный e-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-b-2 border-black outline-none py-3 text-xl"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Ваше сообщение</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full border-b-2 border-black outline-none py-3 text-xl h-32 resize-none"
                                placeholder="Опишите ваш вопрос или предложение"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-8 py-4 border border-black text-black transition duration-300 hover:bg-black hover:text-white text-xl
                                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить →'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
