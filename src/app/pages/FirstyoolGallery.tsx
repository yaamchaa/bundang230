import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    </div>
  );
}

function GalleryTab({
  currentTabLabel,
  items,
  staggerStartIndex,
}: {
  currentTabLabel: string;
  items: GalleryItem[];
  staggerStartIndex: number;
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
              <GalleryCard {...item} />
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
}: {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  className?: string;
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
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
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