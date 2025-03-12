import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function RequestForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Заявка отправлена!");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-1">Задайте нам вопрос</h2>
                <p className="text-gray-500 text-sm mb-6">
                    или свяжитесь для сотрудничества
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Как вас зовут?</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b-2 border-black outline-none py-2 text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Ваш контактный номер телефона</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-b-2 border-black outline-none py-2 text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold">Ваше сообщение</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border-b-2 border-black outline-none py-2 text-lg h-24 resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Прикрепите фото</label>
                        <div className="relative w-full border-b-2 border-black py-2 flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <FaUpload className="text-black mr-2" />
                            <span className="text-black">{file ? "Файл загружен" : "Загрузить фото"}</span>
                        </div>
                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover border rounded-lg shadow"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-white border border-black text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                        Отправить →
                    </button>
                </form>
            </div>
        </section>
    );
}
