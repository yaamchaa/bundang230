import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[#ffffff00] py-30
      px-4 sm:px-6"style={{ fontFamily: "gmarket sans" }}>
      <div className="mx-auto max-w-[1040px]">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          
          {/* Left - Logo */}
<div className="shrink-0 w-fit text-center mx-auto md:mx-0 md:self-center">
  <div className="flex flex-col justify-center">
    <h2
      className="text-[20px] mb-3 whitespace-nowrap"
      style={{ fontFamily: "Gmarket Sans", letterSpacing: "0.1em" }}
    >
      <span className="font-light">bo</span>
      <span className="font-bold">tton.</span>
      <span className="font-light">co</span>
    </h2>
    <p className="text-xs font-light text-gray-500">버튼</p>
  </div>
</div>

          {/* Right - Info Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 w-full max-w-[760px] mx-auto md:mx-0">
            {/* 이용약관 */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs text-BLACK-400 mb-4"> </h3>
              <div className="space-y-2 text-xs text-gray-600">
                
                <p className="text-center font-light text-xs">대표 오 미 연</p>
                
              </div>
            </div>

            {/* 고객센터 */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs text-BLACK-400 mb-4"> </h3>
              <div className="space-y-1 font-light text-xs text-gray-600">
                <p>경기도 성남시 분당구 대왕판교로 19</p>
              </div>
            </div>

            {/* VISION CENTER */}
            <div className="text-center sm:text-left">
              <h3 className="text-xs text-BLACK-400 mb-4"> </h3>
                <div className="space-y-1 font-light text-xs text-gray-600">
                <p>685-07-02278</p>
            </div>
          </div>
        </div>
      </div>    

        {/* Divider */}
        <div className="border-t border-gray-300 mb-8" />

        {/* Bottom - Social Icons */}
        

        {/* Copyright */}
        <div className="text-center sm:text-left">
              <h3 className="text-center text-xs text-BLACK-400 mb-4">이용약관</h3>
        <p className="text-center text-xs font-light text-gray-600">
          © 2026 botton.co All Rights Reserved.
        </p>
      </div>
    </div>    
    </footer>
  );
}