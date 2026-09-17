import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import main1 from '../../assets/images/main-1.jpg';
import main2 from '../../assets/images/main-2.jpg';
import main3 from '../../assets/images/main-3.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export function HomePage() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleWheel = () => {
      setShowFooter(true);
      setTimeout(() => setShowFooter(false), 1000);
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden"
      style={{ fontFamily: "Gmarket Sans" }}
    >
      {/* Main Swiper Slider */}
      <div className="relative w-full h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          speed={3000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            el: '.swiper-pagination-custom',
            type: 'progressbar',
          }}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide key="slide-1">
            <div className="relative w-full h-full">
              <img
                src={main1}
                alt="Brilliant Revelation"
                className="w-full h-full object-cover animate-slideRight"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
                <p className="text-white/100 text-lg font-light mb-2 ml-1">FIRST YOOL</p>
                <h2 className="text-white text-[26px] md:text-[46px] font-thin leading-[1.25]">
                  <AnimatedText text="Wonderous View, Like a Radiant Jewel" />
                </h2>
                <div className="mt-auto pt-[50px] flex items-center gap-2 text-white">
                  <span className="text-lg">01</span>
                  <span className="inline-block w-px h-3.5 bg-white/50 mx-2" />
                  <span className="text-lg text-white/50">03</span>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide key="slide-2">
            <div className="relative w-full h-full">
              <img
                src={main2}
                alt="Beautiful Sky"
                className="w-full h-full object-cover animate-slideRight"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
                <p className="text-white/100 text-lg font-light mb-2 ml-1">FIRST YOOL</p>
                <h2 className="text-white text-[26px] md:text-[46px] font-thin leading-[1.25]">
                  <AnimatedText text="Beautiful Horizon, Seen Through Your Eyes" />
                </h2>
                <div className="mt-auto pt-[50px] flex items-center gap-2 text-white">
                  <span className="text-lg">02</span>
                  <span className="inline-block w-px h-3.5 bg-white/50 mx-2" />
                  <span className="text-lg text-white/50">03</span>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide key="slide-3">
            <div className="relative w-full h-full">
              <img
                src={main3}
                alt="Wonderful Scene"
                className="w-full h-full object-cover animate-slideRight"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
                <p className="text-white/100 text-lg font-light mb-2 ml-1">FIRST YOOL</p>
                <h2 className="text-white text-[26px] md:text-[46px] font-thin leading-[1.25]">
                  <AnimatedText text="Brilliant Moment, Meant Only for You" />
                </h2>
                <div className="mt-auto pt-[50px] flex items-center gap-2 text-white">
                  <span className="text-lg">03</span>
                  <span className="inline-block w-px h-3.5 bg-white/50 mx-2" />
                  <span className="text-lg text-white/50">03</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation - Outside Swiper */}
        <div className="absolute top-[414px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-10 px-6 pointer-events-none">
          
        </div>
      </div>

      {/* Bottom Content */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-200 ${
          showFooter ? 'translate-y-0' : 'translate-y-[60px]'
        }`}
      >
        <div className="bg-black/0 backdrop-blur-sm bg-[#ffffff]">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4 bg-[#ffffff00]">
              
             {/* 메인 홈화면 하단 배너 자리 불투명 클릭 시 이동 가능하게 */} 
            </div>

            <footer className="text-center py-3 border-t border-white/10">
              <p className="text-white/60 text-sm">© 2026 botton.co All Rights Reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Text Component
function AnimatedText({ text }: { text: string }) {
  const letters = text.split('');

  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-letterGlow"
          style={{
            animationDelay: `${index * 0.07}s`,
            animationFillMode: 'forwards',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}
