import React, { useState, useEffect } from 'react';

type CategoryKey = 'Диваны' | 'Кровати' | 'Стулья' | 'Все';

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: { path: string; alt: string }[];
}

const ProjectsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('Все');
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    images: []
  });

  // Generate image arrays based on actual file structure
  const generateSofaImages = () => {
    const images = [];
    // Add files from 1 to 80, handling different extensions
    for (let i = 1; i <= 80; i++) {
      const paddedNum = i.toString().padStart(3, '0');
      // Try .jpg first, then .png as fallback
      images.push({
        path: `/projects/sofas/sofas-${paddedNum}.jpg`,
        alt: `Диван ${i}`
      });
    }
    return images;
  };

  const generateBedImages = () => {
    const images = [];
    // Add beds from beds-001.png to beds-011.jpg
    for (let i = 1; i <= 11; i++) {
      const ext = i === 1 ? '.png' : '.jpg';
      images.push({
        path: `/projects/beds/beds-${i.toString().padStart(3, '0')}${ext}`,
        alt: `Кровать ${i}`
      });
    }
    return images;
  };

  const generateChairImages = () => {
    const images = [];
    // Add chairs from chairs-001.png to chairs-012.jpg
    for (let i = 1; i <= 12; i++) {
      const ext = i === 1 ? '.png' : '.jpg';
      images.push({
        path: `/projects/chairs/chairs-${i.toString().padStart(3, '0')}${ext}`,
        alt: `Стул ${i}`
      });
    }
    return images;
  };

  // Build configuration with all categories including "Все"
  const sofaImages = generateSofaImages();
  const bedImages = generateBedImages();
  const chairImages = generateChairImages();
  const allImages = [...sofaImages, ...bedImages, ...chairImages];

  const categoryImagesConfig: Record<CategoryKey, { path: string; alt: string }[]> = {
    Диваны: sofaImages,
    Кровати: bedImages,
    Стулья: chairImages,
    Все: allImages
  };

  // Update lightbox images when category changes
  useEffect(() => {
    setLightbox(prev => ({
      ...prev,
      images: categoryImagesConfig[activeCategory]
    }));
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setLightbox({
      isOpen: true,
      currentIndex: index,
      images: categoryImagesConfig[activeCategory]
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const showPrev = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
    }));
  };

  const showNext = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
    }));
  };

  // Touch swipe handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      showNext();
    }
    if (isRightSwipe) {
      showPrev();
    }
    
    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentImages = categoryImagesConfig[activeCategory];

  // Detect effective base once to avoid false onload on wrong paths
  const [effectiveBase, setEffectiveBase] = useState<string>(import.meta.env.BASE_URL || '/');

  useEffect(() => {
    const probe = new Image();
    const known = '/projects/beds/beds-001.png';
    const primary = getPrimaryUrl(known);
    probe.onload = () => setEffectiveBase(import.meta.env.BASE_URL || '/');
    probe.onerror = () => setEffectiveBase('/');
    probe.src = primary;
  }, []);

  // Helper functions to build URLs
  const toNormalized = (path: string) => path.replace(/^\//, '');
  const resolveBase = () => {
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? base : base + '/';
  };
  const getPrimaryUrl = (path: string) => `${resolveBase()}${toNormalized(path)}`;
  const getFallbackUrl = (path: string) => `/${toNormalized(path)}`;

  return (
    <div className="w-full">

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(['Все', 'Диваны', 'Кровати', 'Стулья'] as CategoryKey[]).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-white"
            onClick={() => openLightbox(index)}
          >
            <img
              src={`${effectiveBase}${image.path.replace(/^\//,'')}`}
              alt={image.alt}
              className="w-full h-36 sm:h-44 md:h-56 object-cover object-center transition-transform duration-500 group-hover:scale-105 block bg-white"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (img.dataset.fallbackApplied === '1') return;
                
                // Try different extensions
                const originalPath = image.path;
                const fallbackPath = originalPath.replace(/\.(jpg|jpeg)$/i, '.png');
                
                console.warn(`Primary failed, trying fallback: ${getFallbackUrl(fallbackPath)}`);
                img.dataset.fallbackApplied = '1';
                img.src = getFallbackUrl(fallbackPath);
              }}
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          {/* Fixed controls on viewport */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Закрыть"
            className="fixed top-3 right-3 sm:top-4 sm:right-4 text-white text-3xl sm:text-4xl hover:text-gray-300 z-50 p-1 sm:p-2"
          >
            ×
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Предыдущее"
            className="fixed left-5 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-50 p-2 select-none"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Следующее"
            className="fixed right-5 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-50 p-2 select-none"
          >
            ›
          </button>

          {/* Content wrapper */}
          <div
            className="relative max-w-7xl max-h-full p-4 w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center w-full h-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <img
                src={getPrimaryUrl(lightbox.images[lightbox.currentIndex]?.path || '')}
                alt={lightbox.images[lightbox.currentIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.dataset.fallbackApplied === '1') return;
                  img.dataset.fallbackApplied = '1';
                  const p = lightbox.images[lightbox.currentIndex]?.path || '';
                  const fallbackPath = p.replace(/\.(jpg|jpeg)$/i, '.png');
                  console.warn(`Lightbox primary failed, trying fallback: ${getFallbackUrl(fallbackPath)}`);
                  img.src = getFallbackUrl(fallbackPath);
                }}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
              {lightbox.currentIndex + 1} / {lightbox.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGallery;


