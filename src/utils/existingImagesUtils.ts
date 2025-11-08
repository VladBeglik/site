// Утилиты для работы с существующими изображениями на сайте

export interface ExistingImage {
  id: string;
  name: string;
  category: string;
  url: string;
  path: string;
  size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Список всех существующих изображений по категориям
export const existingImages: Record<string, string[]> = {
  sofas: [
    'sofas-001.jpg', 'sofas-002.jpg', 'sofas-002.png', 'sofas-003.jpg', 'sofas-004.jpg',
    'sofas-005.jpg', 'sofas-006.jpg', 'sofas-007.jpg', 'sofas-008.jpg', 'sofas-009.jpg',
    'sofas-010.jpg', 'sofas-011.jpg', 'sofas-012.jpg', 'sofas-013.jpg', 'sofas-014.jpg',
    'sofas-015.jpg', 'sofas-016.jpg', 'sofas-017.jpg', 'sofas-018.jpg', 'sofas-019.jpg',
    'sofas-020.jpg', 'sofas-021.jpg', 'sofas-022.jpg', 'sofas-023.jpg', 'sofas-024.jpg',
    'sofas-025.jpg', 'sofas-026.jpg', 'sofas-027.jpg', 'sofas-028.jpg', 'sofas-029.jpg',
    'sofas-030.jpg', 'sofas-031.jpg', 'sofas-032.jpg', 'sofas-033.jpg', 'sofas-034.jpg',
    'sofas-035.jpg', 'sofas-035.png', 'sofas-036.jpg', 'sofas-036.png', 'sofas-037.jpg',
    'sofas-037.png', 'sofas-038.jpg', 'sofas-038.png', 'sofas-039.jpg', 'sofas-039.png',
    'sofas-040.jpg', 'sofas-041.jpg', 'sofas-042.jpg', 'sofas-043.jpg', 'sofas-044.jpg',
    'sofas-044.png', 'sofas-045.jpg', 'sofas-045.png', 'sofas-046.jpg', 'sofas-047.jpg',
    'sofas-048.jpg', 'sofas-049.jpg', 'sofas-050.jpg', 'sofas-051.jpg', 'sofas-052.jpg',
    'sofas-053.jpg', 'sofas-054.jpg', 'sofas-055.jpg', 'sofas-056.jpg', 'sofas-057.jpg',
    'sofas-058.jpg', 'sofas-059.jpg', 'sofas-060.jpg', 'sofas-061.jpg', 'sofas-062.jpg',
    'sofas-063.jpg', 'sofas-064.jpg', 'sofas-065.jpg', 'sofas-066.jpg', 'sofas-067.jpg',
    'sofas-068.jpg', 'sofas-069.jpg', 'sofas-070.jpg', 'sofas-071.jpg', 'sofas-072.jpg',
    'sofas-073.jpg', 'sofas-074.jpg', 'sofas-075.jpg', 'sofas-076.jpg', 'sofas-077.jpg',
    'sofas-078.jpg', 'sofas-079.jpg', 'sofas-080.jpg'
  ],
  chairs: [
    'chairs-001.png', 'chairs-002.jpg', 'chairs-003.jpg', 'chairs-004.jpg', 'chairs-005.jpg',
    'chairs-006.jpg', 'chairs-007.jpg', 'chairs-008.jpg', 'chairs-009.jpg', 'chairs-010.jpg',
    'chairs-011.jpg', 'chairs-012.jpg'
  ],
  beds: [
    'beds-001.png', 'beds-002.jpg', 'beds-003.jpg', 'beds-004.jpg', 'beds-005.jpg',
    'beds-006.jpg', 'beds-007.jpg', 'beds-008.jpg', 'beds-009.jpg', 'beds-010.jpg',
    'beds-011.jpg'
  ]
};

// Функция для получения всех существующих изображений
export const getAllExistingImages = (): ExistingImage[] => {
  const images: ExistingImage[] = [];
  
  Object.entries(existingImages).forEach(([category, filenames]) => {
    filenames.forEach(filename => {
      images.push({
        id: `${category}-${filename}`,
        name: filename,
        category,
        url: `/projects/${category}/${filename}`,
        path: `public/projects/${category}/${filename}`
      });
    });
  });
  
  return images;
};

// Функция для получения изображений по категории
export const getExistingImagesByCategory = (category: string): ExistingImage[] => {
  const filenames = existingImages[category] || [];
  return filenames.map(filename => ({
    id: `${category}-${filename}`,
    name: filename,
    category,
    url: `/projects/${category}/${filename}`,
    path: `public/projects/${category}/${filename}`
  }));
};

// Функция для получения статистики по категориям
export const getExistingImagesStats = () => {
  const stats: Record<string, number> = {};
  Object.entries(existingImages).forEach(([category, filenames]) => {
    stats[category] = filenames.length;
  });
  return stats;
};

// Функция для форматирования размера файла (заглушка, так как мы не можем получить реальный размер)
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Функция для получения расширения файла
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Функция для проверки, является ли файл изображением
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = getFileExtension(filename);
  return imageExtensions.includes(extension);
};

