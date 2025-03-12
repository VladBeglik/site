import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Экспортируем конфиг Vite
export default defineConfig({
    plugins: [react()], // Подключаем плагин React
    base: "/site/", // Указываем базовый путь (важно добавить `/` в конце)
});
