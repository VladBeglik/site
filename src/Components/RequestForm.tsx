import { useState } from "react";

interface Country {
    code: string;
    name: string;
    flag: string;
}

const countries: Country[] = [
    { code: "+7", name: "Россия", flag: "🇷🇺" },
    { code: "+380", name: "Украина", flag: "🇺🇦" },
    { code: "+375", name: "Беларусь", flag: "🇧🇾" },
    { code: "+7", name: "Казахстан", flag: "🇰🇿" },
    { code: "+994", name: "Азербайджан", flag: "🇦🇿" },
    { code: "+374", name: "Армения", flag: "🇦🇲" },
];

export default function RequestForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Имитация отправки формы
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        alert("Заявка отправлена!");
        setName("");
        setPhone("");
        setMessage("");
    };

    const getPhonePlaceholder = (countryCode: string) => {
        switch (countryCode) {
            case "+7":
                return "+7 (___) ___-__-__";
            case "+380":
                return "+380 (__) ___-__-__";
            case "+375":
                return "+375 (__) ___-__-__";
            case "+994":
                return "+994 (__) ___-__-__";
            case "+374":
                return "+374 (__) ___-__-__";
            default:
                return "Введите номер";
        }
    };

    const formatPhone = (value: string, countryCode: string) => {
        const numbers = value.replace(/\D/g, '');
        let formattedValue = '';
        
        switch (countryCode) {
            case "+7":
                if (numbers.length > 0) {
                    formattedValue += '+7 (';
                    if (numbers.length > 1) {
                        formattedValue += numbers.slice(1, 4);
                    }
                    if (numbers.length > 4) {
                        formattedValue += ') ' + numbers.slice(4, 7);
                    }
                    if (numbers.length > 7) {
                        formattedValue += '-' + numbers.slice(7, 9);
                    }
                    if (numbers.length > 9) {
                        formattedValue += '-' + numbers.slice(9, 11);
                    }
                }
                break;
            case "+380":
                if (numbers.length > 0) {
                    formattedValue += '+380 (';
                    if (numbers.length > 3) {
                        formattedValue += numbers.slice(3, 5);
                    }
                    if (numbers.length > 5) {
                        formattedValue += ') ' + numbers.slice(5, 8);
                    }
                    if (numbers.length > 8) {
                        formattedValue += '-' + numbers.slice(8, 10);
                    }
                    if (numbers.length > 10) {
                        formattedValue += '-' + numbers.slice(10, 12);
                    }
                }
                break;
            case "+375":
                if (numbers.length > 0) {
                    formattedValue += '+375 (';
                    if (numbers.length > 3) {
                        formattedValue += numbers.slice(3, 5);
                    }
                    if (numbers.length > 5) {
                        formattedValue += ') ' + numbers.slice(5, 8);
                    }
                    if (numbers.length > 8) {
                        formattedValue += '-' + numbers.slice(8, 10);
                    }
                    if (numbers.length > 10) {
                        formattedValue += '-' + numbers.slice(10, 12);
                    }
                }
                break;
            case "+994":
                if (numbers.length > 0) {
                    formattedValue += '+994 (';
                    if (numbers.length > 3) {
                        formattedValue += numbers.slice(3, 5);
                    }
                    if (numbers.length > 5) {
                        formattedValue += ') ' + numbers.slice(5, 8);
                    }
                    if (numbers.length > 8) {
                        formattedValue += '-' + numbers.slice(8, 10);
                    }
                    if (numbers.length > 10) {
                        formattedValue += '-' + numbers.slice(10, 12);
                    }
                }
                break;
            case "+374":
                if (numbers.length > 0) {
                    formattedValue += '+374 (';
                    if (numbers.length > 3) {
                        formattedValue += numbers.slice(3, 5);
                    }
                    if (numbers.length > 5) {
                        formattedValue += ') ' + numbers.slice(5, 8);
                    }
                    if (numbers.length > 8) {
                        formattedValue += '-' + numbers.slice(8, 10);
                    }
                    if (numbers.length > 10) {
                        formattedValue += '-' + numbers.slice(10, 12);
                    }
                }
                break;
            default:
                formattedValue = countryCode + ' ' + numbers;
        }
        
        return formattedValue;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhone(e.target.value, selectedCountry.code);
        setPhone(formattedValue);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = countries.find(c => c.code === e.target.value);
        if (country) {
            setSelectedCountry(country);
            setPhone(formatPhone(phone.replace(/\D/g, ''), country.code));
        }
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
                            <label className="block text-sm font-medium text-gray-700">Ваш номер телефона</label>
                            <div className="flex gap-2">
                                <select
                                    value={selectedCountry.code}
                                    onChange={handleCountryChange}
                                    className="border-b-2 border-black outline-none py-3 text-xl bg-transparent"
                                >
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                    className="flex-1 border-b-2 border-black outline-none py-3 text-xl"
                                    placeholder={getPhonePlaceholder(selectedCountry.code)}
                                />
                            </div>
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
