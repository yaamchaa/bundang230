import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import brandBg from '../../assets/images/main-5.jpg';
import g1Image from '../../assets/images/g1.jpg';
import g2Image from '../../assets/images/g2.jpg';
import g3Image from '../../assets/images/g3.jpg';
import g4Image from '../../assets/images/g4.jpg';
import g5Image from '../../assets/images/g5.jpg';
import g6Image from '../../assets/images/g6.jpg';
import gi1Image from '../../assets/images/gi1.jpg';
import gi2Image from '../../assets/images/gi2.jpg';
import gi3Image from '../../assets/images/gi3.jpg';
import gi4Image from '../../assets/images/gi4.jpg';
import gi5Image from '../../assets/images/gi5.jpg';
import gi6Image from '../../assets/images/gi6.jpg';
import gi7Image from '../../assets/images/gi7.jpg';
import gi9Image from '../../assets/images/gi9.jpg';
import gi10Image from '../../assets/images/gi10.jpg';
import gb1Image from '../../assets/images/gb1.jpg';
import gb2Image from '../../assets/images/gb2.jpg';
import gb3Image from '../../assets/images/gb3.jpg';
import gb4Image from '../../assets/images/gb4.jpg';
import gb5Image from '../../assets/images/gb5.jpg';
import gb6Image from '../../assets/images/gb6.jpg';
import gb7Image from '../../assets/images/gb7.jpg';
import gb8Image from '../../assets/images/gb8.jpg';
import gb9Image from '../../assets/images/gb9.jpg';
import gb10Image from '../../assets/images/gb10.jpg';
import gb11Image from '../../assets/images/gb11.jpg';
import gb12Image from '../../assets/images/gb12.jpg';


type GalleryItem = {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
};

export function FirstyoolGallery() {
  const [activeTab, setActiveTab] = useState('feature');
  const tabSentinelRef = useRef<HTMLDivElement | null>(null);
  const tabSectionRef = useRef<HTMLDivElement | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  useEffect(() => {
    const sentinel = tabSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent('tab-header-sticky-change', {
            detail: { hidden: !entry.isIntersecting },
          })
        );
      },
      {
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      window.dispatchEvent(
        new CustomEvent('tab-header-sticky-change', {
          detail: { hidden: false },
        })
      );
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const headerOffset = 100;
    const tabTop =
      (tabSectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;

    window.scrollTo({
      top: Math.max(tabTop - headerOffset, 0),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full min-h-screen">
      <section className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <h2 className="text-white text-[38px] font-light leading-[42px]">Gallery</h2>
        </div>
      </section>

      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div
          ref={tabSentinelRef}
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
        />

        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex font-light gap-12 md:gap-16 pt-6 md:pt-8">
              <button
                onClick={() => handleTabChange('feature')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'feature' ? 'text-black' : 'text-gray-400'
                }`}
              >
                FEATURE
                {activeTab === 'feature' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('inside')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'inside' ? 'text-black' : 'text-gray-400'
                }`}
              >
                INSIDE
                {activeTab === 'inside' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('brand')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'brand' ? 'text-black' : 'text-gray-400'
                }`}
              >
                BRAND
                {activeTab === 'brand' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'feature' && (
          <GalleryTab
            currentTabLabel="FEATURE"
            onImageClick={openLightbox}
            items={[
              {
                title: 'Club House',
                subtitle: "Member's club house",
                image: g1Image,
              },
              {
                title: 'Well-Being',
                subtitle: 'Well-being leisure life',
                image: g2Image,
              },
              {
                title: 'Infinity Pool',
                subtitle: 'Beautiful landscape',
                image: g3Image,
              },
              {
                title: 'Collection',
                subtitle: 'Brand collection',
                image: g4Image,
              },
              {
                title: 'Sky Garden',
                subtitle: 'Pond & Sky garden',
                image: g5Image,
              },
              {
                title: 'Lobby',
                subtitle: 'lobby splendid',
                image: g6Image,
              },
            ]}
            staggerStartIndex={3}
          />
        )}

        {activeTab === 'inside' && (
          <GalleryTab
            currentTabLabel="INSIDE"
            onImageClick={openLightbox}
            items={[
              {
                title: 'Living bath',
                subtitle: 'First step to Yool',
                image: gi2Image,
              },
              {
                title: 'Terrace',
                subtitle: 'Relaxing break',
                image: gi9Image,
              },
              {
                title: 'Second room',
                subtitle: 'A beautiful panorama',
                image: gi10Image,
              },
              {
                title: 'Living room',
                subtitle: 'A space of dramatic emotion',
                image: gi6Image,
              },
              {
                title: 'Dining room',
                subtitle: 'Comfortable business',
                image: gi3Image,
              },
              {
                title: 'Family room',
                subtitle: 'Precious memory',
                image: gi5Image,
              },
              {
                title: 'Master & Dress room',
                subtitle: 'Completion of style',
                image: gi7Image,
              },
              {
                title: 'Kitchen',
                subtitle: 'Harmony of beauty and efficiency',
                image: gi4Image,
              },
              {
                title: 'Master bath',
                subtitle: 'Relaxation space with pleasure',
                image: gi1Image,
              },
            ]}
            staggerStartIndex={3}
          />
        )}

        {activeTab === 'brand' && (
          <GalleryTab
            currentTabLabel="BRAND"
            items={[
              {
                title: 'Ceramic Slab',
                subtitle: "salvatori / Spain",
                image: gb5Image,
                href: 'https://www.salvatoriofficial.com/en/ww/pl/stones/',
              },
              {
                title: 'Lighting Brand',
                subtitle: 'Artemide / OBLURE Arch',
                image: gb7Image,
                href:'https://duomo.co.kr/',
              },
              {
                title: 'Flooring',
                subtitle: 'Listone Giordano',
                image: gb4Image,
                href:'https://www.listonegiordano.com/',
              },
              {
                title: 'Door Handle',
                subtitle: 'The Porsche Door Handle',
                image: gb3Image,
                href:'https://www.olivari.it/en/door-handles/alexandra/',
              },
              {
                title: 'Kitchen Faucet',
                subtitle: 'CEA & MGS',
                image: gb10Image,
                href:'https://mgstaps.com/',
              },
              {
                title: 'Faucet',
                subtitle: 'Fantini Rubinetti',
                image: gb9Image,
                href:'https://www.fantini.it/en-us/discover-collections',
              },
              {
                title: 'Cook Oven',
                subtitle: "INFINITE LINE OVEN – SAMSUNG",
                image: gb1Image,
                href:'https://www.relvaokellermann.com/work/infinite-line-dual-cook-oven-samsung/',
              },
              {
                title: 'Extractors Gas Range',
                subtitle: 'Gaggenau',
                image: gb2Image,
                href:'https://www.gaggenau-asia.com/appliances/extractors',
              },
              {
                title: 'Door',
                subtitle: 'Rimadesio Solid Wood',
                image: gb6Image,
                href:'https://www.rimadesio.it/en/product-category/doors/?filters=swing-doors',
              },
              {
                title: 'Entrance',
                subtitle: 'Timberplan PY-043',
                image: gb11Image,
                href:'https://timberplan.es/',
              },
              {
                title: 'Mitika Sliding Door',
                subtitle: 'Internal Doors',
                image: gb12Image,
                href:'https://adldesign.it/',
              },
              {
                title: 'Switch',
                subtitle: 'France Legrand',
                image: gb8Image,
                href:'https://www.legrand.co.kr/ko/%EC%A0%9C%ED%92%88/galion-up-%EC%8A%A4%EC%9C%84%EC%B9%98',
              },
            ]}
            staggerStartIndex={3}
          />
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

function GalleryTab({
  currentTabLabel,
  items,
  staggerStartIndex,
  onImageClick,
}: {
  currentTabLabel: string;
  items: GalleryItem[];
  staggerStartIndex: number;
  onImageClick?: (images: string[], index: number) => void;
}) {
  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">GALLERY</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">{currentTabLabel}</h5>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[100px] md:gap-y-5">
          {items.map((item, index) => (
            <div
              key={`${currentTabLabel}-${index}`}
              className={index >= staggerStartIndex ? 'mt-0 md:mt-[50px]' : 'mt-0'}
            >
              <GalleryCard
                {...item}
                onImageClick={
                  onImageClick && !item.href
                    ? () => onImageClick(items.map((i) => i.image), index)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  title,
  subtitle,
  image,
  href,
  className = '',
  onImageClick,
}: {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  className?: string;
  onImageClick?: () => void;
}) {
  return (
    <div className={`group block ${className}`}>
      <div className="relative overflow-hidden rounded-none mb-4 md:mb-2 aspect-[4/3]">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        ) : (
          <button
            type="button"
            onClick={onImageClick}
            className="block w-full h-full cursor-zoom-in"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        )}
      </div>

      <div className="space-y-2 md:space-y-1">
        <p className="px-6 md:px-0 text-sm text-gray-400 font-light">{subtitle}</p>

        <div className="flex px-6 md:px-0 items-center justify-between">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-light hover:underline"
            >
              {title}
            </a>
          ) : (
            <h3 className="text-xl font-light">{title}</h3>
          )}

          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center transition-colors group-hover:border-black">
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const prev = () => onNavigate((index - 1 + images.length) % images.length);
  const next = () => onNavigate((index + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        aria-label="닫기"
      >
        <X className="w-8 h-8" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/70 hover:text-white transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/70 hover:text-white transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt=""
        className="h-[75vh] w-auto object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
