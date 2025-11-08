import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Eye, Save, FolderOpen, Image as ImageIcon, AlertCircle, CheckCircle, Plus, Edit2, X, Database, RefreshCw } from 'lucide-react';
import { 
  validateImageFile, 
  createImageMetadata, 
  saveImagesToStorage, 
  formatFileSize,
  compressImage,
  ImageMetadata 
} from '../utils/imageUtils';
import { 
  getAllExistingImages, 
  ExistingImage 
} from '../utils/existingImagesUtils';

interface ImageData {
  id: string;
  name: string;
  category: string;
  file: File;
  preview: string;
  metadata: ImageMetadata;
  error?: string;
  isCompressing?: boolean;
}

interface Category {
  value: string;
  label: string;
}

const AdminPanel: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('sofas');
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([
    { value: 'sofas', label: 'Диваны' },
    { value: 'chairs', label: 'Стулья' },
    { value: 'beds', label: 'Кровати' }
  ]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [showExistingImages, setShowExistingImages] = useState(true);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загружаем существующие изображения при инициализации
  useEffect(() => {
    loadExistingImages();
  }, []);

  // Функция для загрузки существующих изображений
  const loadExistingImages = async () => {
    setIsLoadingExisting(true);
    try {
      const images = getAllExistingImages();
      setExistingImages(images);
    } catch (error) {
      console.error('Ошибка при загрузке существующих изображений:', error);
    } finally {
      setIsLoadingExisting(false);
    }
  };

  // Функция для обновления существующих изображений
  const refreshExistingImages = () => {
    loadExistingImages();
  };

  // Функции для управления категориями
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newValue = newCategoryName.toLowerCase().replace(/\s+/g, '_');
      const newCategory: Category = {
        value: newValue,
        label: newCategoryName.trim()
      };
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const handleEditCategory = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue);
    if (category) {
      setEditingCategory(categoryValue);
      setEditingCategoryName(category.label);
    }
  };

  const handleSaveEditCategory = () => {
    if (editingCategoryName.trim() && editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.value === editingCategory 
          ? { ...cat, label: editingCategoryName.trim() }
          : cat
      ));
      setEditingCategory(null);
      setEditingCategoryName('');
    }
  };

  const handleDeleteCategory = (categoryValue: string) => {
    if (categories.length <= 1) {
      alert('Нельзя удалить последнюю категорию');
      return;
    }
    
    if (selectedCategory === categoryValue) {
      const remainingCategories = categories.filter(cat => cat.value !== categoryValue);
      setSelectedCategory(remainingCategories[0].value);
    }
    
    setCategories(prev => prev.filter(cat => cat.value !== categoryValue));
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingCategoryName('');
  };

  // Функции для работы с существующими изображениями
  const handlePreviewExistingImage = (url: string) => {
    setPreviewImage(url);
    setShowPreview(true);
  };

  const handleDeleteExistingImage = (imageId: string) => {
    // Здесь можно добавить логику удаления изображения с сервера
    console.log('Удаление изображения:', imageId);
    // Пока просто обновляем список
    refreshExistingImages();
  };

  // Получаем существующие изображения для выбранной категории
  const getExistingImagesForCategory = (category: string) => {
    return existingImages.filter(img => img.category === category);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ImageData[] = [];
    
    for (const file of Array.from(files)) {
      // Валидация файла
      const validation = validateImageFile(file);
      if (!validation.valid) {
        newImages.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          category: selectedCategory,
          file,
          preview: '',
          metadata: {} as ImageMetadata,
          error: validation.error
        });
        continue;
      }

      try {
        // Создание метаданных
        const metadata = await createImageMetadata(file, selectedCategory);
        
        // Сжатие изображения если оно больше 2MB
        let processedFile = file;
        if (file.size > 2 * 1024 * 1024) {
          processedFile = await compressImage(file, 1920, 0.8);
        }
        
        const preview = URL.createObjectURL(processedFile);
        
        newImages.push({
          id: metadata.id,
          name: file.name,
          category: selectedCategory,
          file: processedFile,
          preview,
          metadata
        });
      } catch (error) {
        newImages.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          category: selectedCategory,
          file,
          preview: '',
          metadata: {} as ImageMetadata,
          error: 'Ошибка обработки изображения'
        });
      }
    }

    setImages(prev => [...prev, ...newImages]);
  };

  const handleDeleteImage = (id: string) => {
    setImages(prev => {
      const imageToDelete = prev.find(img => img.id === id);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const handlePreviewImage = (preview: string) => {
    setPreviewImage(preview);
    setShowPreview(true);
  };

  const handleSaveImages = async () => {
    setIsUploading(true);
    
    try {
      // Фильтруем только валидные изображения
      const validImages = images.filter(img => !img.error);
      
      if (validImages.length === 0) {
        alert('Нет валидных изображений для сохранения');
        return;
      }
      
      // Подготавливаем данные для сохранения
      const imagesToSave = validImages.map(img => ({
        file: img.file,
        metadata: img.metadata
      }));
      
      // Сохраняем изображения
      await saveImagesToStorage(imagesToSave);
      
      alert(`Успешно сохранено ${validImages.length} изображений!`);
      
      // Очищаем только валидные изображения
      setImages(prev => prev.filter(img => img.error));
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Произошла ошибка при сохранении изображений');
    } finally {
      setIsUploading(false);
    }
  };

  const filteredImages = images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-4 animate-fade-in-delay">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg animate-float">
                  <FolderOpen className="text-white" size={32} />
                </div>
                Админ панель
              </h1>
              <p className="text-sm text-gray-600 mt-2 bg-gray-100 px-3 py-1 rounded-full inline-block">
                🔒 Доступ только по прямой ссылке /admin
              </p>
            </div>
            <button
              onClick={handleSaveImages}
              disabled={images.length === 0 || isUploading}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-lg button-pulse animate-fade-in-delay-2"
            >
              <Save size={20} />
              {isUploading ? 'Сохранение...' : 'Сохранить все'}
            </button>
          </div>

          {/* Управление категориями */}
          <div className="mb-8 animate-fade-in-delay-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Управление категориями</h2>
                <p className="text-gray-600">Создавайте и редактируйте категории для ваших изображений</p>
              </div>
              <button
                onClick={() => setShowAddCategory(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 button-pulse"
              >
                <Plus size={18} />
                Добавить категорию
              </button>
            </div>
            
            {/* Список категорий */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {categories.map(category => (
                <div
                  key={category.value}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-400 ring-4 ring-blue-200 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {editingCategory === category.value ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEditCategory}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                        title="Сохранить"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        title="Отмена"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCategory(category.value)}
                        className={`flex-1 text-left font-semibold transition-all duration-200 ${
                          selectedCategory === category.value
                            ? 'text-blue-700'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {category.label}
                      </button>
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={() => handleEditCategory(category.value)}
                          className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="Редактировать"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.value)}
                          className="text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Форма добавления новой категории */}
            {showAddCategory && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Введите название категории"
                    className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 placeholder-gray-500"
                    autoFocus
                  />
                  <button
                    onClick={handleAddCategory}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <CheckCircle size={18} />
                    Добавить
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName('');
                    }}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <X size={18} />
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Загрузка файлов */}
          <div className="mb-8 animate-fade-in-delay-3">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Загрузка изображений</h2>
              <p className="text-gray-600">
                Загружайте изображения в категорию: 
                <span className="font-semibold text-blue-600 ml-1">
                  "{categories.find(cat => cat.value === selectedCategory)?.label}"
                </span>
              </p>
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="file-drop-zone border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float">
                <Upload className="text-blue-600" size={40} />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-3">
                Нажмите для выбора изображений
              </p>
              <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full inline-block">
                📁 Поддерживаются форматы: JPG, PNG, GIF (макс. 10MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Существующие изображения на сайте */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                    <Database className="text-purple-600" size={24} />
                  </div>
                  Существующие изображения на сайте
                </h2>
                <p className="text-gray-600">
                  Все изображения, которые уже есть на сайте в категории: 
                  <span className="font-semibold text-purple-600 ml-1">
                    "{categories.find(cat => cat.value === selectedCategory)?.label}"
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowExistingImages(!showExistingImages)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    showExistingImages 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Database size={16} />
                  {showExistingImages ? 'Скрыть' : 'Показать'}
                </button>
                <button
                  onClick={refreshExistingImages}
                  disabled={isLoadingExisting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  <RefreshCw size={16} className={isLoadingExisting ? 'animate-spin' : ''} />
                  Обновить
                </button>
              </div>
            </div>

            {showExistingImages && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                {isLoadingExisting ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <span className="ml-3 text-gray-600">Загрузка изображений...</span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        Найдено: <span className="font-semibold text-purple-600">
                          {getExistingImagesForCategory(selectedCategory).length}
                        </span> изображений
                      </p>
                    </div>
                    
                    {getExistingImagesForCategory(selectedCategory).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {getExistingImagesForCategory(selectedCategory).map(image => (
                          <div key={image.id} className="bg-white rounded-xl p-4 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="aspect-square mb-3 overflow-hidden rounded-lg relative border border-gray-200">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-lg font-medium">
                                Существующее
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-sm text-gray-800 truncate font-semibold mb-1" title={image.name}>
                                {image.name}
                              </p>
                              <p className="text-xs text-gray-500 bg-purple-100 px-2 py-1 rounded-full inline-block">
                                📁 {image.category}
                              </p>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePreviewExistingImage(image.url)}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                              >
                                <Eye size={14} />
                                Просмотр
                              </button>
                              <button
                                onClick={() => handleDeleteExistingImage(image.id)}
                                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                title="Удалить изображение"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Database className="text-purple-600" size={32} />
                        </div>
                        <p className="text-gray-600 text-lg">В этой категории пока нет изображений</p>
                        <p className="text-gray-500 text-sm mt-1">Загрузите изображения выше, чтобы они появились здесь</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Список загруженных изображений */}
          {filteredImages.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                      <ImageIcon className="text-green-600" size={24} />
                    </div>
                    Загруженные изображения
                  </h2>
                  <p className="text-gray-600">
                    Всего: <span className="font-semibold text-blue-600">{filteredImages.length}</span> изображений
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-xl border border-blue-200">
                  <span className="text-sm font-medium text-blue-700">
                    📂 {categories.find(cat => cat.value === selectedCategory)?.label}
                  </span>
                </div>
              </div>
              <div className="image-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map(image => (
                  <div key={image.id} className={`image-card rounded-2xl p-5 border-2 transition-all duration-300 transform hover:scale-105 ${image.error ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 error-shake shadow-lg' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl'}`}>
                    {image.error ? (
                      <div className="aspect-square mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200">
                        <div className="text-center p-6">
                          <div className="p-3 bg-red-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <AlertCircle className="text-red-600" size={32} />
                          </div>
                          <p className="text-sm text-red-700 font-semibold">{image.error}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square mb-4 overflow-hidden rounded-xl relative border-2 border-gray-200 shadow-lg">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        {image.metadata.dimensions && (
                          <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm font-medium">
                            {image.metadata.dimensions.width}×{image.metadata.dimensions.height}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-800 truncate font-semibold mb-1" title={image.name}>
                        {image.name}
                      </p>
                      {!image.error && image.metadata && (
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                          📦 {formatFileSize(image.metadata.size)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {!image.error && (
                        <button
                          onClick={() => handlePreviewImage(image.preview)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Eye size={16} />
                          Просмотр
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-3 rounded-xl text-sm flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        title="Удалить изображение"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Статистика */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Статистика по категориям</h2>
                <p className="text-gray-600">Обзор загруженных изображений</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {categories.map(category => {
                const newImagesCount = images.filter(img => img.category === category.value).length;
                const validNewCount = images.filter(img => img.category === category.value && !img.error).length;
                const errorNewCount = newImagesCount - validNewCount;
                const existingCount = getExistingImagesForCategory(category.value).length;
                const totalCount = newImagesCount + existingCount;
                
                return (
                  <div key={category.value} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{totalCount}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 mb-3">{category.label}</p>
                      <div className="space-y-2">
                        <div className="flex justify-center items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-purple-600 font-medium">
                            {existingCount} на сайте
                          </span>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-medium">
                            {validNewCount} новых
                          </span>
                        </div>
                        {errorNewCount > 0 && (
                          <div className="flex justify-center items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-red-600 font-medium">
                              {errorNewCount} ошибок
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl">
                  <p className="text-2xl font-bold text-purple-700 mb-1">{existingImages.length}</p>
                  <p className="text-sm text-purple-600 font-medium">На сайте</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                  <p className="text-2xl font-bold text-gray-800 mb-1">{images.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Новых</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl">
                  <p className="text-2xl font-bold text-green-700 mb-1">{images.filter(img => !img.error).length}</p>
                  <p className="text-sm text-green-600 font-medium">Валидных</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-100 to-pink-200 rounded-xl">
                  <p className="text-2xl font-bold text-red-700 mb-1">{images.filter(img => img.error).length}</p>
                  <p className="text-sm text-red-600 font-medium">С ошибками</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно предварительного просмотра */}
      {showPreview && (
        <div className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="modal-content bg-white/95 backdrop-blur-md rounded-2xl max-w-6xl max-h-full overflow-hidden shadow-2xl border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Eye className="text-white" size={20} />
                </div>
                Предварительный просмотр
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-3 transition-all duration-200 transform hover:scale-110"
                title="Закрыть"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-inner border border-white/50">
                <img
                  src={previewImage}
                  alt="Предварительный просмотр"
                  className="max-w-full max-h-[75vh] object-contain mx-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
