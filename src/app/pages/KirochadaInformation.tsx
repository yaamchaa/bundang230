import { useEffect, useRef, useState } from 'react';
import brandBg from '../../assets/images/main-10.jpg';

export function KirochadaInformation() {
  const [activeTab, setActiveTab] = useState('layout');
  const [selectedGraph, setSelectedGraph] = useState('FIRST YOOL');
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
      {/* Key Visual */}
      <section className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <h2 className="text-white text-[38px] font-light leading-[42px]">주민제안</h2>
        </div>
      </section>

      {/* Sub Content */}
      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div ref={tabSentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />

        {/* Tab Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex font-light gap-16 pt-8">
              <button
                onClick={() => handleTabChange('layout')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'layout' ? 'text-black' : 'text-gray-400'
                }`}
              >
                도시계획사업자
                {activeTab === 'layout' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('premium')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'premium' ? 'text-black' : 'text-gray-400'
                }`}
              >
                사업계획
                {activeTab === 'premium' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('proposal')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'proposal' ? 'text-black' : 'text-gray-400'
                }`}
              >
                주민제안
                {activeTab === 'proposal' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'layout' && <LayoutTab />}
        {activeTab === 'premium' && (
          <PremiumTab
            selectedGraph={selectedGraph}
            setSelectedGraph={setSelectedGraph}
          />
        )}
        {activeTab === 'proposal' && <ProposalTab />}
      </div>
    </div>
  );
}

function LayoutTab() {
  return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">도시계획사업자</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">사업계획</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300">주민제안</h5>
        </div>
      </nav>

      {/* 다섯가지 타입의 평형정보 Section */}
      

      {/* A 타입 Section */}
      

      {/* B 타입 Section */}
      

      {/* S 타입 Section */}
      
    </div>
  );
}

function PremiumTab({ selectedGraph, setSelectedGraph }: { selectedGraph: string; setSelectedGraph: (value: string) => void }) {
  return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">도시계획사업자</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">사업계획</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300">주민제안</h5>
        </div>
      </nav>

      {/* Premium Section */}
      

      {/* 분양가 프리미엄 Table */}
      

      {/* 타상품 대비 프리미엄 Table */}
      

      {/* Graph Section */}
      
    </div>
  );
}

function ProposalTab() {
  return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">도시계획사업자</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">사업계획</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">주민제안</h5>
        </div>
      </nav>

      {/* 다섯가지 타입의 평형정보 Section */}
      

      {/* A 타입 Section */}
      

      {/* B 타입 Section */}
      

      {/* S 타입 Section */}
      
    </div>
  );
}
