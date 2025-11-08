// Утилиты для работы с изображениями

export interface ImageMetadata {
  id: string;
  name: string;
  category: string;
  size: number;
  type: string;
  lastModified: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Проверка типа файла
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Файл должен быть изображением' };
  }

  // Проверка размера файла (максимум 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Размер файла не должен превышать 10MB' };
  }

  // Проверка поддерживаемых форматов
  const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!supportedFormats.includes(file.type)) {
    return { valid: false, error: 'Поддерживаются только форматы: JPG, PNG, GIF, WebP' };
  }

  return { valid: true };
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Не удалось загрузить изображение'));
    };
    
    img.src = url;
  });
};

export const compressImage = (
  file: File, 
  maxWidth: number = 1920, 
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Вычисляем новые размеры
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Рисуем изображение на canvas
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Конвертируем в blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Ошибка сжатия изображения'));
          }
        },
        file.type,
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
    img.src = URL.createObjectURL(file);
  });
};

export const generateImageId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const createImageMetadata = async (file: File, category: string): Promise<ImageMetadata> => {
  const dimensions = await getImageDimensions(file);
  
  return {
    id: generateImageId(),
    name: file.name,
    category,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    dimensions,
  };
};

// Локальное хранилище для изображений (в реальном приложении это будет API)
export const saveImagesToStorage = async (images: { file: File; metadata: ImageMetadata }[]): Promise<void> => {
  // Имитация сохранения на сервер
  console.log('Сохранение изображений:', images);
  
  // В реальном приложении здесь будет отправка на сервер
  // const formData = new FormData();
  // images.forEach(({ file, metadata }) => {
  //   formData.append('images', file);
  //   formData.append('metadata', JSON.stringify(metadata));
  // });
  // 
  // const response = await fetch('/api/images', {
  //   method: 'POST',
  //   body: formData,
  // });
  // 
  // if (!response.ok) {
  //   throw new Error('Ошибка при сохранении изображений');
  // }
  
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 2000));
};

export const getStoredImages = async (): Promise<ImageMetadata[]> => {
  // В реальном приложении здесь будет запрос к API
  // const response = await fetch('/api/images');
  // return response.json();
  
  // Возвращаем пустой массив для демонстрации
  return [];
};
