import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
// Экспортируем конфиг Vite
export default defineConfig({
    plugins: [react(), tailwindcss() ], // Подключаем плагин React
    base: "/", // Базовый путь для локальной разработки
});
