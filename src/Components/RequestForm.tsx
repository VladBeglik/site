import { useState, useEffect, useRef } from "react";
import russiaFlag from "../assets/flags/russia.svg";
import ukraineFlag from "../assets/flags/ukraine.svg";
import belarusFlag from "../assets/flags/belarus.svg";
import kazakhstanFlag from "../assets/flags/kazakhstan.svg";
import azerbaijanFlag from "../assets/flags/azerbaijan.svg";
import armeniaFlag from "../assets/flags/armenia.svg";

interface Country {
    code: string;
    name: string;
    flag: string;
    flagImage: string;
}

interface UploadedImage {
    id: string;
    file: File;
    preview: string;
    name: string;
    size: number;
}

const countries: Country[] = [
    { code: "+7", name: "Россия", flag: "🇷🇺", flagImage: russiaFlag },
    { code: "+380", name: "Украина", flag: "🇺🇦", flagImage: ukraineFlag },
    { code: "+375", name: "Беларусь", flag: "🇧🇾", flagImage: belarusFlag },
    { code: "+7", name: "Казахстан", flag: "🇰🇿", flagImage: kazakhstanFlag },
    { code: "+994", name: "Азербайджан", flag: "🇦🇿", flagImage: azerbaijanFlag },
    { code: "+374", name: "Армения", flag: "🇦🇲", flagImage: armeniaFlag },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function RequestForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [imageErrors, setImageErrors] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Обработчик клика вне дропдауна
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        // Валидация имени
        if (!name.trim()) {
            newErrors.name = "Имя обязательно для заполнения";
        } else if (name.trim().length < 2) {
            newErrors.name = "Имя должно содержать минимум 2 символа";
        } else if (name.trim().length > 50) {
            newErrors.name = "Имя не должно превышать 50 символов";
        } else if (!/^[а-яёa-z\s-]+$/i.test(name.trim())) {
            newErrors.name = "Имя может содержать только буквы, пробелы и дефисы";
        }

        // Валидация телефона
        const phoneNumbers = phone.replace(/\D/g, '');
        const minLength = selectedCountry.code === "+7" ? 10 : 9;
        const maxLength = selectedCountry.code === "+7" ? 10 : 9;
        
        if (!phoneNumbers) {
            newErrors.phone = "Номер телефона обязателен";
        } else if (phoneNumbers.length < minLength) {
            newErrors.phone = `Номер должен содержать минимум ${minLength} цифр`;
        } else if (phoneNumbers.length > maxLength) {
            newErrors.phone = `Номер не должен превышать ${maxLength} цифр`;
        } else if (!/^[0-9]+$/.test(phoneNumbers)) {
            newErrors.phone = "Номер может содержать только цифры";
        }

        // Валидация сообщения
        if (!message.trim()) {
            newErrors.message = "Сообщение обязательно для заполнения";
        } else if (message.trim().length < 10) {
            newErrors.message = "Сообщение должно содержать минимум 10 символов";
        } else if (message.trim().length > 1000) {
            newErrors.message = "Сообщение не должно превышать 1000 символов";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        
        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('phone', phone);
            formData.append('country', selectedCountry.name);
            formData.append('message', message.trim());
            formData.append('timestamp', new Date().toISOString());
            
            // Добавляем изображения
            uploadedImages.forEach((image, index) => {
                formData.append(`image_${index}`, image.file);
            });

            console.log('Отправка данных:', {
                name: name.trim(),
                phone: phone,
                country: selectedCountry.name,
                message: message.trim(),
                timestamp: new Date().toISOString(),
                imagesCount: uploadedImages.length
            });

            // Имитация API запроса
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.1) {
                        resolve(formData);
                    } else {
                        reject(new Error('Ошибка сети'));
                    }
                }, 1500);
            });

            setSubmitStatus('success');
            
            // Очистка формы
            setTimeout(() => {
                setName("");
                setPhone("");
                setMessage("");
                setUploadedImages([]);
                setSubmitStatus('idle');
            }, 3000);

        } catch (error) {
            console.error('Ошибка отправки:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newErrors: string[] = [];

        if (uploadedImages.length + files.length > MAX_FILES) {
            newErrors.push(`Максимальное количество файлов: ${MAX_FILES}`);
        }

        files.forEach(file => {
            if (!ALLOWED_TYPES.includes(file.type)) {
                newErrors.push(`Файл "${file.name}" имеет неподдерживаемый формат. Разрешены: JPG, PNG, WebP`);
            }
            
            if (file.size > MAX_FILE_SIZE) {
                newErrors.push(`Файл "${file.name}" слишком большой. Максимальный размер: 5MB`);
            }
        });

        if (newErrors.length > 0) {
            setImageErrors(newErrors);
            setTimeout(() => setImageErrors([]), 5000);
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage: UploadedImage = {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    file: file,
                    preview: e.target?.result as string,
                    name: file.name,
                    size: file.size
                };
                setUploadedImages(prev => [...prev, newImage]);
            };
            reader.readAsDataURL(file);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (id: string) => {
        setUploadedImages(prev => prev.filter(img => img.id !== id));
    };

    const getPhonePlaceholder = (countryCode: string) => {
        switch (countryCode) {
            case "+7":
                return "(___) ___-__-__";
            case "+380":
                return "(__) ___-__-__";
            case "+375":
                return "(__) ___-__-__";
            case "+994":
                return "(__) ___-__-__";
            case "+374":
                return "(__) ___-__-__";
            default:
                return "Введите номер";
        }
    };

    const formatPhone = (numbers: string, countryCode: string) => {
        let formattedValue = '';
        
        switch (countryCode) {
            case "+7":
                if (numbers.length > 0) {
                    formattedValue += '(' + numbers.slice(0, 3);
                    if (numbers.length > 3) {
                        formattedValue += ') ' + numbers.slice(3, 6);
                        if (numbers.length > 6) {
                            formattedValue += '-' + numbers.slice(6, 8);
                            if (numbers.length > 8) {
                                formattedValue += '-' + numbers.slice(8, 10);
                            }
                        }
                    } else {
                        formattedValue += ')';
                    }
                }
                break;
            case "+380":
                if (numbers.length > 0) {
                    formattedValue += '(' + numbers.slice(0, 2);
                    if (numbers.length > 2) {
                        formattedValue += ') ' + numbers.slice(2, 5);
                        if (numbers.length > 5) {
                            formattedValue += '-' + numbers.slice(5, 7);
                            if (numbers.length > 7) {
                                formattedValue += '-' + numbers.slice(7, 9);
                            }
                        }
                    } else {
                        formattedValue += ')';
                    }
                }
                break;
            case "+375":
                if (numbers.length > 0) {
                    formattedValue += '(' + numbers.slice(0, 2);
                    if (numbers.length > 2) {
                        formattedValue += ') ' + numbers.slice(2, 5);
                        if (numbers.length > 5) {
                            formattedValue += '-' + numbers.slice(5, 7);
                            if (numbers.length > 7) {
                                formattedValue += '-' + numbers.slice(7, 9);
                            }
                        }
                    } else {
                        formattedValue += ')';
                    }
                }
                break;
            case "+994":
                if (numbers.length > 0) {
                    formattedValue += '(' + numbers.slice(0, 2);
                    if (numbers.length > 2) {
                        formattedValue += ') ' + numbers.slice(2, 5);
                        if (numbers.length > 5) {
                            formattedValue += '-' + numbers.slice(5, 7);
                            if (numbers.length > 7) {
                                formattedValue += '-' + numbers.slice(7, 9);
                            }
                        }
                    } else {
                        formattedValue += ')';
                    }
                }
                break;
            case "+374":
                if (numbers.length > 0) {
                    formattedValue += '(' + numbers.slice(0, 2);
                    if (numbers.length > 2) {
                        formattedValue += ') ' + numbers.slice(2, 5);
                        if (numbers.length > 5) {
                            formattedValue += '-' + numbers.slice(5, 7);
                            if (numbers.length > 7) {
                                formattedValue += '-' + numbers.slice(7, 9);
                            }
                        }
                    } else {
                        formattedValue += ')';
                    }
                }
                break;
            default:
                formattedValue = numbers;
        }
        
        return formattedValue;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        if (!inputValue.trim()) {
            setPhone('');
            if (errors.phone) {
                setErrors(prev => ({ ...prev, phone: '' }));
            }
            return;
        }
        
        const numbers = inputValue.replace(/\D/g, '');
        
        if (!numbers) {
            setPhone(inputValue);
            return;
        }
        
        const maxLength = selectedCountry.code === "+7" ? 10 : 9;
        const limitedNumbers = numbers.slice(0, maxLength);
        
        const formattedValue = formatPhone(limitedNumbers, selectedCountry.code);
        setPhone(formattedValue);
        
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setIsCountryDropdownOpen(false);
        const numbers = phone.replace(/\D/g, '');
        const maxLength = country.code === "+7" ? 10 : 9;
        const limitedNumbers = numbers.slice(0, maxLength);
        setPhone(formatPhone(limitedNumbers, country.code));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setName(value);
            if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
            }
        }
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 1000) {
            setMessage(value);
            if (errors.message) {
                setErrors(prev => ({ ...prev, message: '' }));
            }
        }
    };

    return (
        <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Задайте нам вопрос</h2>
                        <p className="text-lg text-gray-600">
                            или свяжитесь для сотрудничества
                        </p>
                    </div>

                    {/* Сообщения об успехе/ошибке */}
                    {submitStatus === 'success' && (
                        <div className="mb-4 p-4 bg-black text-white rounded text-base">
                            ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="mb-4 p-4 bg-black text-white rounded text-base">
                            ❌ Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.
                        </div>
                    )}

                    {/* Ошибки загрузки изображений */}
                    {imageErrors.length > 0 && (
                        <div className="mb-4 p-4 bg-black text-white rounded text-base">
                            {imageErrors.map((error, index) => (
                                <div key={index}>❌ {error}</div>
                            ))}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700">
                                Как вас зовут? <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                required
                                maxLength={50}
                                className={`w-full border-b-2 border-gray-300 outline-none py-3 text-lg transition-colors ${
                                    errors.name ? 'border-red-500' : 'focus:border-black'
                                }`}
                                placeholder="Введите ваше имя"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                            <p className="text-gray-400 text-sm">{name.length}/50</p>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700">
                                Ваш номер телефона <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="relative min-w-[120px]" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                        className="w-full border-b-2 border-gray-300 outline-none py-3 text-lg bg-white flex items-center gap-2 transition-colors focus:border-black"
                                    >
                                        <img 
                                            src={selectedCountry.flagImage} 
                                            alt={selectedCountry.name} 
                                            className="w-6 h-4 object-cover rounded"
                                        />
                                        <span className="text-base">{selectedCountry.code}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {isCountryDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-10 max-h-40 overflow-y-auto">
                                            {countries.map((country) => (
                                                <button
                                                    key={`${country.code}-${country.name}`}
                                                    type="button"
                                                    onClick={() => handleCountryChange(country)}
                                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-base"
                                                >
                                                    <img 
                                                        src={country.flagImage} 
                                                        alt={country.name} 
                                                        className="w-6 h-4 object-cover rounded"
                                                    />
                                                    <span>{country.code}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                    className={`flex-1 border-b-2 border-gray-300 outline-none py-3 text-lg transition-colors ${
                                        errors.phone ? 'border-red-500' : 'focus:border-black'
                                    }`}
                                    placeholder={getPhonePlaceholder(selectedCountry.code)}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-base font-medium text-gray-700">
                                Ваше сообщение <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={handleMessageChange}
                                required
                                maxLength={1000}
                                className={`w-full border-b-2 border-gray-300 outline-none py-3 text-lg resize-none transition-colors ${
                                    errors.message ? 'border-red-500' : 'focus:border-black'
                                }`}
                                placeholder="Опишите ваш вопрос или предложение"
                                rows={4}
                            ></textarea>
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                            )}
                            <p className="text-gray-400 text-sm">{message.length}/1000</p>
                        </div>

                        {/* Загрузка изображений */}
                        <div className="space-y-3">
                            <label className="block text-base font-medium text-gray-700">
                                Прикрепить изображения (необязательно)
                            </label>
                            <div className="border border-gray-300 rounded p-4 text-center hover:border-black transition-colors">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={uploadedImages.length >= MAX_FILES}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadedImages.length >= MAX_FILES}
                                    className="text-black hover:text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="text-base">
                                        {uploadedImages.length >= MAX_FILES 
                                            ? 'Достигнут лимит файлов' 
                                            : 'Выберите изображения'
                                        }
                                    </span>
                                </button>
                                <p className="text-sm text-gray-500 mt-2">
                                    Максимум {MAX_FILES} файлов, до 5MB каждый. JPG, PNG, WebP
                                </p>
                            </div>

                            {/* Предварительный просмотр изображений */}
                            {uploadedImages.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-4">
                                    {uploadedImages.map((image) => (
                                        <div key={image.id} className="relative group">
                                            <img
                                                src={image.preview}
                                                alt={image.name}
                                                className="w-full h-16 object-cover rounded border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(image.id)}
                                                className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-8 py-4 bg-white text-black border border-black transition duration-300 hover:bg-black hover:text-white text-lg font-medium rounded
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
