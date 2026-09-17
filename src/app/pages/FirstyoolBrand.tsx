import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronDown, X } from 'lucide-react';
import brandBg from '../../assets/images/fyb.jpg';
import l1Image from '../../assets/images/l1.jpg';
import l2Image from '../../assets/images/l2.jpg';
import l3Image from '../../assets/images/l3.jpg';
import l4Image from '../../assets/images/l4.jpg';
import yool_396Image from '../../assets/images/yool_396.png';
import in1Image from '../../assets/images/in1.jpg';
import in2Image from '../../assets/images/in2.jpg';
import in3Image from '../../assets/images/in3.jpg';
import in4Image from '../../assets/images/in4.jpg';
import in5Image from '../../assets/images/in5.jpg';
import in6Image from '../../assets/images/in6.jpg';
import in7Image from '../../assets/images/in7.jpg';
import in8Image from '../../assets/images/in8.jpg';
import in9Image from '../../assets/images/in9.png';
import in10Image from '../../assets/images/in10.png';
import g3Image from '../../assets/images/g3.jpg';

export function FirstyoolBrand() {
  const [activeTab, setActiveTab] = useState('introduction');
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
          <p className="text-white/70 text-[17px] font-light leading-8">HYPER END</p>
          <h2 className="text-white text-[38px] font-light leading-[42px]">FIRST YOOL</h2>
        </div>
      </section>

      {/* Sub Content */}
      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div ref={tabSentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />

        {/* Tab Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-300">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="flex font-light justify-between gap-4 pt-8 md:gap-16 md:justify-start">
              <button
                onClick={() => handleTabChange('introduction')}
                className={`pb-6 text-sm md:text-lg transition-colors relative ${
                  activeTab === 'introduction' ? 'text-black' : 'text-gray-400'
                }`}
              >
                INTRODUCTION
                {activeTab === 'introduction' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('location')}
                className={`pb-6 text-sm md:text-lg transition-colors relative ${
                  activeTab === 'location' ? 'text-black' : 'text-gray-400'
                }`}
              >
                LOCATION
                {activeTab === 'location' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('bi')}
                className={`pb-6 text-sm md:text-lg transition-colors relative ${
                  activeTab === 'bi' ? 'text-black' : 'text-gray-400'
                }`}
              >
                BI
                {activeTab === 'bi' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'introduction' && <IntroductionTab />}
        {activeTab === 'location' && <LocationTab />}
        {activeTab === 'bi' && <BITab />}
      </div>
    </div>
  );
}

function IntroductionTab() {
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((src: string) => {
    setLightboxImage(src);
    setLightboxOpen(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email1: '',
    email2: '',
    privacy: false,
  });
  const [emailDomain, setEmailDomain] = useState('선택');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailDomains = [
    { label: '직접입력', value: 'write' },
    { label: 'naver.com', value: 'naver.com' },
    { label: 'gmail.com', value: 'gmail.com' },
    { label: 'daum.net', value: 'daum.net' },
    { label: 'hanmail.net', value: 'hanmail.net' },
    { label: 'kakao.com', value: 'kakao.com' },
    { label: 'hotmail.com', value: 'hotmail.com' },
  ];

  const handleEmailDomainSelect = (domain: string, label: string) => {
    setEmailDomain(label);
    if (domain === 'write') {
      setFormData({ ...formData, email2: '' });
    } else {
      setFormData({ ...formData, email2: domain });
    }
    setShowDropdown(false);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === 'name') {
      const pattern = /[0-9~!@#$%^&*()_+|<>?:{}]/;
      if (pattern.test(value)) {
        newErrors.name = '한글/영문만 입력 가능합니다.';
      } else {
        delete newErrors.name;
      }
    }

    if (name === 'phone') {
      const pattern = /[^0-9-]/;
      if (pattern.test(value)) {
        newErrors.phone = '숫자만 입력 가능합니다.';
      } else {
        delete newErrors.phone;
      }
    }

    if (name === 'email1' || name === 'email2') {
      const pattern = /[~!@#$%^&*()_+|<>?:{}]/;
      if (pattern.test(value)) {
        newErrors.email = '특수문자는 입력이 불가능합니다.';
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.phone &&
      formData.email1 &&
      formData.email2 &&
      formData.privacy &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      alert('정상 등록되었습니다.');
      setFormData({ name: '', phone: '', email1: '', email2: '', privacy: false });
      setEmailDomain('선택');
    }
  };

  return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">BRAND</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">INTRODUCTION</h5>
        </div>
      </nav>      

      {/* Greenery and Everyday Rest Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-11">
          <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
            <button type="button" onClick={() => openLightbox(in1Image)} className="block w-full h-full cursor-zoom-in">
              <img src={in1Image} alt="Greenery and Everyday Rest" className="w-full h-full object-cover" />
            </button>
          </figure>

          <div className="flex-1 px-6 md:px-0">
            <header className="mb-[18px]">
              <h4 className="text-xl font-light leading-6">Greenery and Everyday Rest</h4>
            </header>
            <div className="space-y-[14px]">
              <p className="text-base font-light leading-6 text-gray-600">
                중앙공원, 율동공원 등 분당 대표 녹지 공간에서 산책, 운동, 가족 휴식이 가능한 생활환경.
              </p>
              <p className="text-base font-light leading-6 text-gray-600">
                넓은 집이 좋은 집은 아닙니다, 도심 속 편안한 분위기는 숨 쉬기 편한 집이어야 합니다<br />
                수목원이 될 수 있는 하이엔드 레지던스 "퍼스트율"
              </p>
              <p className="text-base font-light leading-6 text-gray-600">
                퍼스트 율은 고정적인 집의 개념을 새로운 주거공간으로 제안합니다.                
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* For Future Valuel Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-11">
          <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
            <button type="button" onClick={() => openLightbox(in2Image)} className="block w-full h-full cursor-zoom-in">
              <img src={in2Image} alt="For Future Valuel" className="w-full h-full object-cover" />
            </button>
          </figure>

          <div className="flex-1 px-6 md:px-0">
            <header className="mb-[18px]">
              <h4 className="text-xl font-light leading-6">For Future Valuel</h4>
            </header>
            <div className="space-y-[14px]">
              <p className="text-base font-light leading-6 text-gray-600">
                지상 27층~38층, 지하 2층의 신축 단지로의 전환, 분당의 다음 가치를 만드는 분당동2 정비 사업입니다.
                주차, 단열, 방음, 보안, 커뮤니티 생활 수준, 가치를 넘어, 미래 자산으로 전환하는 첫 번째 기준,<br />
                퍼스트율에서 바라본 도시는 그 어느 도시보다 눈부십니다.
              </p>
              <p className="text-base font-light leading-6 text-gray-600">
                FIRST YOOL 분당은 주거의 첫번째 기준입니다.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 사업개요 */}
      <article className="max-w-[1200px] mx-auto px-6 pt-[180px]">
        <h3 className="text-2xl font-light mb-8">사업개요</h3>
        <p className="text-sm font-light text-gray-500">※ 상기 계획안은 주민 협의후 변경 될 수 있음(사업개요상 일괄165A/864세대는 사업성 계산을 위해 임시적용)</p>
        <div className="overflow-x-auto -mx-6 px-6 font-light">
          <table className="w-full border-t-2 border-black min-w-[600px]">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-6 py-4 font-light w-1/6">사업명</td>
                <td className="px-6 py-4 w-1/3">FIRST YOOL 분당(가칭)</td>
                <td className="bg-gray-50 px-6 py-4 font-light w-1/6">
                  기준용적율 250%
                  <br/>
                  <span className="text-xs text-gray-500">(현재 용적율 86.5%)</span>
                </td>
                <td className="px-6 py-4 w-1/3">노후계획 도시정비계획 특별법 적용으로 2035년까지 한시적 인센티브</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-6 py-4 font-light">소재지</td>
                <td className="px-6 py-4">경기도 성남시 예원로 분당로 일대<br/>(1차 간담회 자료 참고)</td>
                <td className="bg-gray-50 px-6 py-4 font-light">건축규모</td>
                <td className="px-6 py-4">예상:지상27~38층, 지하2층<br/>(추후 주민 협의 후 계획)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-6 py-4 font-light">대지면적</td>
                <td className="px-6 py-4">80,925.70㎡ (24,480.03평)<br/>(추후 등기부등본 확인 후 변경될 수 있음)</td>
                <td className="bg-gray-50 px-6 py-4 font-light">세대수</td>
                <td className="px-6 py-4">종전 381세대 / 개발 후 (165A)864세대<br/>(추후 주민 협의 후 계획 변경)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-6 py-4 font-light">연면적</td>
                <td className="px-6 py-4">226,591.96㎡ (용적율280%)지하면적제외<br/>(예상 총356,070m2 / 주민 협의 후 계획 변경)</td>
                <td className="bg-gray-50 px-6 py-4 font-light">주차대수</td>
                <td className="px-6 py-4">3,024대 (세대당 3.5대) 평형별 2대/3대/4대<br/>(추후 계획 변경으로 인해 수정될 수 있음)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="bg-gray-50 px-6 py-4 font-light">
                  건폐율60%
                  <br/>
                  <span className="text-xs text-gray-500">(계획 건폐율 15% 미만)</span>
                </td>
                <td className="px-6 py-4">대지면적과 동 배치, 녹지 및 보행동선 확보를 고려한 합리적 건폐율 계획을 검토 후 수립</td>
                <td className="bg-gray-50 px-6 py-4 font-light">예상<br/>총사업비/분양금액</td>
                <td className="px-6 py-4">
                          2조3,316억원/4조5,360억 원(전체 분양 물량)
                           <span className="block text-sm text-gray-500">
                              예상 평당분양가 7천만원 (추후 변경 될 수 있음)
                           </span>
                        </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Unit Type */}
      <article className="max-w-[1200px] mx-auto px-6 pt-[100px]">
        <h3 className="text-2xl font-light mb-8">Unit Type</h3>
        <p className="text-sm font-light text-gray-500">※ 상기 계획안은 주민 협의후 변경 될 수 있음(사업개요상 일괄165A/864세대는 사업성 계산을 위해 임시적용)</p>
        <div className="overflow-x-auto -mx-6 px-6 font-light">
          <table className="w-full border-t-2 border-black min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-4 py-6 text-center font-light">타입</th>
                <th className="px-4 py-6 text-center font-light">세대수</th>
                <th className="px-4 py-6 text-center font-light">전용면적</th>
                <th className="px-4 py-6 text-center font-light">발코니 확장면적</th>
                <th className="px-4 py-6 text-center font-light">실사용면적</th>
                <th className="px-4 py-6 text-center font-light">주거공용면적</th>
                <th className="px-4 py-6 text-center font-light">기타공용면적</th>
                <th className="px-4 py-6 text-center font-light">지하주차장</th>
                <th className="px-4 py-6 text-center font-light">계약면적</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-center">59A</td>
                <td className="px-4 py-4 text-center">324세대</td>
                <td className="px-4 py-4 text-center">59.95㎡</td>
                <td className="px-4 py-4 text-center">18.00㎡</td>
                <td className="px-4 py-4 text-center">77.95㎡</td>
                <td className="px-4 py-4 text-center">15.60㎡</td>
                <td className="px-4 py-4 text-center">6.20㎡</td>
                <td className="px-4 py-4 text-center">8.10㎡</td>
                <td className="px-4 py-4 text-center">107.85㎡</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-center">84A</td>
                <td className="px-4 py-4 text-center">324세대</td>
                <td className="px-4 py-4 text-center">84.95㎡</td>
                <td className="px-4 py-4 text-center">24.50㎡</td>
                <td className="px-4 py-4 text-center">109.45㎡</td>
                <td className="px-4 py-4 text-center">22.10㎡</td>
                <td className="px-4 py-4 text-center">8.80㎡</td>
                <td className="px-4 py-4 text-center">11.40㎡</td>
                <td className="px-4 py-4 text-center">151.75㎡</td>
              </tr>              
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-center">142A</td>
                <td className="px-4 py-4 text-center">216세대</td>
                <td className="px-4 py-4 text-center">142.95㎡</td>
                <td className="px-4 py-4 text-center">36.50㎡</td>
                <td className="px-4 py-4 text-center">179.45㎡</td>
                <td className="px-4 py-4 text-center">37.20㎡</td>
                <td className="px-4 py-4 text-center">14.80㎡</td>
                <td className="px-4 py-4 text-center">19.20㎡</td>
                <td className="px-4 py-4 text-center">247.65㎡</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-center">165A</td>
                <td className="px-4 py-4 text-center">432세대</td>
                <td className="px-4 py-4 text-center">165.95㎡</td>
                <td className="px-4 py-4 text-center">42.00㎡</td>
                <td className="px-4 py-4 text-center">207.95㎡</td>
                <td className="px-4 py-4 text-center">43.20㎡</td>
                <td className="px-4 py-4 text-center">17.10㎡</td>
                <td className="px-4 py-4 text-center">22.40㎡</td>
                <td className="px-4 py-4 text-center">290.65㎡</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-center">305A</td>
                <td className="px-4 py-4 text-center">32세대</td>
                <td className="px-4 py-4 text-center">305.95㎡</td>
                <td className="px-4 py-4 text-center">56.00㎡</td>
                <td className="px-4 py-4 text-center">361.95㎡</td>
                <td className="px-4 py-4 text-center">52.40㎡</td>
                <td className="px-4 py-4 text-center">22.10㎡</td>
                <td className="px-4 py-4 text-center">35.80㎡</td>
                <td className="px-4 py-4 text-center">472.25㎡</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Concept Sketch */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
  <h3 className="text-2xl font-light px-6 md:px-0 mb-8">Concept </h3>
   <p className="text-sm font-light text-gray-500">※ 상기 계획안은 추후 변동 될 수 있음 (주민 이해를 돕기 위한 이미지입니다.)</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="aspect-[4/3] overflow-hidden">
      <button type="button" onClick={() => openLightbox(g3Image)} className="block w-full h-full cursor-zoom-in">
        <img src={g3Image} alt="Concept Sketch 1" className="w-full h-full object-cover" />
      </button>
    </div>

    <div className="aspect-[4/3] overflow-hidden">
      <button type="button" onClick={() => openLightbox(in4Image)} className="block w-full h-full cursor-zoom-in">
        <img src={in4Image} alt="Concept Sketch 2" className="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</article>

      {/* 주택정비전, 후 비교 */}
<article className="max-w-[1200px] mx-auto px-6 pt-[170px]">
  <div className="mb-8">
    <h3 className="text-2xl font-light mb-2">주택정비전, 후 비교</h3>
    <p className="text-sm font-light text-gray-500">※ 상기 계획안은 추후 변동 될 수 있음</p>
  </div>

  <div className="space-y-8">
    {/* 위 표 */}
    <div className="overflow-x-auto font-light">
      <table className="w-full min-w-[700px] border-t-2 border-black">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-300">
            <th className="px-6 py-6 text-center font-light"></th>
            <th className="px-6 py-6 text-center font-light"></th>
            <th className="px-6 py-6 text-center font-light">Currently</th>
            <th className="px-6 py-6 text-center font-light"></th>
            <th className="px-6 py-6 text-center font-light"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="bg-gray-50 px-4 py-4 font-light w-[180px]">
              분당동연립 381세대<br />(30구역 세대수)
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap"></td>
            <td className="px-6 py-4 text-center min-w-[260px]">
              대지 공유, 주차 협소, 노후 배관 · 단열 · 방음 · 지붕방수, 엘리베이터 및 컨퍼런스, 커뮤니티 부재
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap"></td>
            <td className="px-6 py-4 text-center whitespace-nowrap"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="flex justify-center py-4">
      <ChevronDown
        className={`w-8 h-8 text-gray-400 transition-transform ${showPrivacy ? 'rotate-180' : ''}`}
      />
    </div>

    {/* 아래 표 */}
    <div className="overflow-x-auto font-light">
      <table className="w-full min-w-[760px] border-t-2 border-black">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-300">
            <th className="px-6 py-6 text-center font-light"></th>
            <th className="px-6 py-6 text-center font-light">전용면적</th>
            <th className="px-6 py-6 text-center font-light">주차장면적</th>
            <th className="px-6 py-6 text-center font-light">기타면적</th>
            <th className="px-6 py-6 text-center font-light">공유면적</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-6 py-4 font-light w-[180px]">
              FIRST YOOL 864세대(가정)
            </td>
            <td className="px-6 py-4 text-center min-w-[140px]">전용면적 체계화</td>
            <td className="px-6 py-4 text-center min-w-[140px]">지하주차장 개선</td>
            <td className="px-6 py-4 text-center min-w-[160px]">엘리베이터 및 무장애 동선</td>
            <td className="px-6 py-4 text-center min-w-[170px]">커뮤니티, 조경/단지형 주거</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-6 py-4 font-light">계획 설계</td>
            <td className="px-6 py-4 text-center min-w-[140px]">남향 중심 배치</td>
            <td className="px-6 py-4 text-center min-w-[140px]">보행과 차량 동선 분리</td>
            <td className="px-6 py-4 text-center min-w-[160px]">세대 프라이버시</td>
            <td className="px-6 py-4 text-center min-w-[170px]">중앙 오픈아케이드</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-6 py-4 font-light">특화</td>
            <td className="px-6 py-4 text-center min-w-[140px]">스마트 케어 시스템</td>
            <td className="px-6 py-4 text-center min-w-[140px]">프리미엄 라인 특화</td>
            <td className="px-6 py-4 text-center min-w-[160px]">도시친화형 녹지공간 프리미엄</td>
            <td className="px-6 py-4 text-center min-w-[170px]">커뮤니티특화 및 플레이그라운드 적용</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</article>

      {/* Site Plan */}
      <article className="relative pt-[170px]">
        <div className="absolute inset-x-0 top-[190px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[30px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <button type="button" onClick={() => openLightbox(in5Image)} className="block w-full h-full cursor-zoom-in">
                <img src={in5Image} alt="Site Plan" className="w-full h-full object-cover" />
              </button>
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[70px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-1">Architectural plan</p>
                <h3 className="text-[30px] font-light leading-[42px]">Site Plan</h3>
              </header>
              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  퍼스트 율 분당의 단지도면은 사람과 Life Style이 조화롭게 어울리는<br />
                  품격 높은 공간 연출로 독자적인 공간 체계가 있고 감각적이고 감성적인<br />
                  경험을 느낄 수 있도록 설계합니다.(주민의견 수렴 후 특화형 사이트 계획)
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 165.95m2 & 142.95m2 Layout */}
<article className="max-w-[1200px] mx-auto px-6 md:px-6 pt-[130px]">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    {/* 165.95m2 */}
    <div>
      <h3 className="text-2xl font-light px-6 md:px-0 mb-6">165.95m2 layout</h3>
        <p className="text-sm font-light text-gray-500">※ 상기 도면은 주민 이해를 돕기 위한 예시 이미지입니다.</p>
      <div className="aspect-[4/3] overflow-hidden mb-20">
        <button type="button" onClick={() => openLightbox(in9Image)} className="block w-full h-full cursor-zoom-in">
          <img src={in9Image} alt="Type A Layout" className="w-full h-full object-cover" />
        </button>
      </div>

      <table className="w-full font-light border-t-2 border-black">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light w-1/3">전용면적</td>
            <td className="px-4 py-3">165.95㎡</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">기타</td>
            <td className="px-4 py-3">대형 상위 타입</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">비고</td>
            <td className="px-4 py-3">주민 협의 및 선호도 조사후 선정</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">침실</td>
            <td className="px-4 py-3">4~5</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">화장실</td>
            <td className="px-4 py-3">3</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">드레스룸</td>
            <td className="px-4 py-3">프리미엄</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">기타공간</td>
            <td className="px-4 py-3">Kitchen, Subkitchen<br />Storage, Maid room</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* 142.95m2 */}
    <div>
      <h3 className="text-2xl font-light px-6 md:px-0 mb-6">142.95m2 layout</h3>
        <p className="text-sm font-light text-gray-500">※ 상기 도면은 주민 이해를 돕기 위한 예시 이미지입니다.</p>
      <div className="aspect-[4/3] overflow-hidden mb-20">
        <button type="button" onClick={() => openLightbox(in10Image)} className="block w-full h-full cursor-zoom-in">
          <img src={in10Image} alt="Type B Layout" className="w-full h-full object-cover" />
        </button>
      </div>

      <table className="w-full font-light border-t-2 border-black">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light w-1/3">전용면적</td>
            <td className="px-4 py-3">142.95㎡</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">기타</td>
            <td className="px-4 py-3">고급 주거 특화</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">비고</td>
            <td className="px-4 py-3">주민 협의 및 선호도 조사후 선정</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">침실</td>
            <td className="px-4 py-3">4</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">화장실</td>
            <td className="px-4 py-3">3</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">드레스룸</td>
            <td className="px-4 py-3">익스텐션</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="bg-gray-50 px-4 py-3 font-light">기타공간</td>
            <td className="px-4 py-3">Kitchen, Subkitchen<br />Maid room</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</article>

      {/* Mass Diagram */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <h3 className="text-2xl font-light px-6 md:px-0 mb-8">Mass Diagram</h3>
          <p className="text-sm font-light text-gray-500">※ 상기 이미지는 주민 이해를 돕기 위한 예시입니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[4/3] overflow-hidden mb-20">
            <button type="button" onClick={() => openLightbox(in6Image)} className="block w-full h-full cursor-zoom-in">
              <img src={in6Image} alt="Mass Diagram 1" className="w-full h-full object-cover" />
            </button>
          </div>
          <div className="aspect-[4/3] overflow-hidden mb-20">
            <button type="button" onClick={() => openLightbox(in7Image)} className="block w-full h-full cursor-zoom-in">
              <img src={in7Image} alt="Mass Diagram 2" className="w-full h-full object-cover" />
            </button>
          </div>     
        </div>
      </article>

      {/* Designer JS.COOPER */}
      <article className="relative pt-[170px]">
        <div className="absolute inset-x-0 top-[190px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[50px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <button type="button" onClick={() => openLightbox(in8Image)} className="block w-full h-full cursor-zoom-in">
                <img src={in8Image} alt="Designer JS.COOPER" className="w-full h-full object-cover" />
              </button>
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[60px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-1">Design</p>
                <h3 className="text-[30px] font-light leading-[42px]">Gensler.WATG.KPF.UNstudio
                  <br />
                  <span className="text-xl text-black opacity-95">(공간 구성 특화 컨소시엄 준비)</span>
                </h3>
              </header>
              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  FIRST YOOL의 디자인은 ‘분당의 깊이’와 ‘현대적 프리미엄’으로 기획됩니다.
                  내, 외관은 실사용 중심의 여유로운 평면과 지역 랜드마크에 중점을 두고 마스터플랜을 기획 합니다.
                  환경 변화에 반응하는 로보틱스 기술과 스마트 적응형 시스템을 적용한 주거문화를 추구 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* JS.COOPER (Architects) */}
      <article className="max-w-[1200px] mx-auto px-6 pt-[150px]">
        <h3 className="text-2xl font-light mb-8">국내 최고의 설계사 컨소시엄</h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-t-2 border-black min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-6 py-6 text-left font-light w-1/4">현상공모설계<br />(추후 도시계획사업자 PT)</th>
                <th className="px-6 py-6 text-left font-light">
                  <div className="space-y-4">
                    <p>
                      우리가 추구하는 성과물은 사고의 틀에 확장과 행동의 긍정적 변화를 가져올 수 있는 믿음을 바탕으로<br />
                      창의적 시각에서 밀레니얼 시대의 공동 생활 환경을 볼 수 있어야 합니다.
                    </p>                    
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </article>

      {/* Subscribe Now Form */}

      {lightboxOpen && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

function LocationTab() {
  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">BRAND</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">LOCATION</h5>
        </div>
      </nav>

      {/* FIRST YOOL */}
      <article className="relative pt-[90px]">
        <div className="absolute inset-x-0 top-[110px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[30px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <img
                src={l1Image}
                alt="분당핵심생활권 "
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[34px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-5">Bundang's Core Residential Area</p>
                <h3 className="text-[30px] font-light leading-[42px]">FIRST YOOL</h3>
              </header>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[17px] font-light leading-[22px] mb-[14px]">
                   분당 핵심 생활권
                  </h4>
                  <p className="text-base font-light leading-[26px] text-gray-600">
                    분당 지구단위계획 30구역 일대는 기존 분당 주거지의 안정성과 성숙한 생활 인프라를 함께 누릴 수 있는 입지입니다.
                        대형 상업시설과 서울대학교 병원등, 공원, 교육·생활편의시설을 일상 생활 안에서 연결하기 좋은 위치를 선점하고 있습니다.


                  </p>
                </div>               
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Parkside Premium */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-11">
          <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
            <img
              src={l2Image}
              alt="공원녹지프리미엄"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="flex-1 px-6 md:px-0 px-6 md:px-0">
            <header className="mb-[18px]">
              <h4 className="text-xl font-light leading-6">Parkside Premium</h4>
            </header>
            <div className="space-y-[14px]">
              <h5 className="text-[17px] font-light leading-[22px]">
                공원과 녹지 프리미엄 FIRST YOOL
              </h5>
              <p className="text-base font-light leading-6 text-gray-600">
                중앙공원, 율동공원 등 분당을 대표하는 녹지 환경이 높은 지역입니다.
				"도심 속 녹지와 여유”라는 표현이 사능할 만큼, 단순한 주택이 아닌 건강한 생활환경으로 인식되는 주거 프리미엄을 함께 합니다.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Noble lifestyle */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-11">
          <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
            <img
              src={l3Image}
              alt="판교분당 더블 생활권"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="flex-1 px-6 md:px-0">
            <header className="mb-[18px]">
              <h4 className="text-xl font-light leading-6">Noble lifestyle</h4>
            </header>
            <div className="space-y-[14px]">
              <h5 className="text-[17px] font-light leading-[22px]">
                판교·분당 더블 생활권
              </h5>
              <p className="text-base font-light leading-6 text-gray-600">
                2033년 최고의 주거지역 FIRST YOOL.<br />
				판교 접근성은 미래가치를 올리고, 신분당선 판교역과 판교 업무지구 접근성은 분당 주거의 경쟁력을 높이는 핵심 배경이 됩니다.
                 현대백화점 판교점, AK플라자 분당점 같은 소비·문화 인프라를 함께하는 실생활 공간입니다.
                    FIRST YOOL에는 진정한 Noble Lifestyle이 있습니다.

              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Education & Vision */}
      <article className="relative pt-[150px]">
        <div className="absolute inset-x-0 top-[170px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[50px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <img
                src={l4Image}
                alt="분당과학고"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1  px-6 md:px-0 md:py-[34px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-1">Education & Vision</p>
                <h3 className="text-[30px] font-light leading-[42px]">FIRST YOOL</h3>
              </header>
              <div className="space-y-[14px]">
                <h5 className="text-[17px] font-light leading-[22px]">
                  Best Of Best,
                </h5>
                <p className="text-base font-light leading-[26px] text-gray-600">
                  분당은 과학고등학교, 특수목적 고등학교 등,
					세계를 향해 열린 교육기관들이 있습니다. 글로벌 시민으로
												성장하고 교육 방법을 제시하는 특화된 교육을 만나실 수 있습니다.
												성남 아트센터를 비롯 계원 예술고등학교와 함께 분당이 세계를 대표하는 예술의 거리와
												현대 미술의 흐름을 느낄 수 있습니다.<br />												

                </p>
              </div>
            </div>
          </div>
        </div>
      </article>      

      {/* Location Map */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
  <h3 className="text-3xl font-light mb-12 text-center">Location Map</h3>

  <div className="grid md:grid-cols-[420px_1fr] gap-6 items-stretch">
    <div className="bg-gray-100 rounded-lg p-8 md:p-12 flex flex-col justify-between">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl">Y</span>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-1xl font-light mb-1">HIGH END</h4>
          <h5 className="text-2xl font-light mb-6">FIRST YOOL</h5>
          <p className="text-xs text-gray-600 whitespace-nowrap">분당동2 지구단위계획 30구역</p>
        </div>
      </div>
    </div>

    <div className="rounded-lg overflow-hidden min-h-[420px]">
      <iframe
        title="퍼스트율 사업지 위치"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.8274414297207!2d127.13202687628979!3d37.37025973535798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b578d3ab266e9%3A0xc403d321f8c37f3f!2z6rK96riw64-EIOyEseuCqOyLnCDrtoTri7nqtawg7JiI7JuQ66GcIDE5!5e0!3m2!1sko!2skr!4v1778421899510!5m2!1sko!2skr"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '420px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</article>
    </div>
  );
}

function BITab() {
  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">BRAND</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">BI</h5>
        </div>
      </nav>

      {/* logo BI */}
      <article className="relative pt-[120px]">
        <div className="absolute inset-x-0 top-[140px] h-[280px] bg-gray-50 -z-10" />
        <div className="max-w-[1200px] mx-auto px-0 md:px-12">
          <div className="flex flex-col md:flex-row gap-18 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={yool_396Image}
                alt="Firstyool brand identity"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[55px]">
              <header className="mb-[6px]">
                <p className="text-gray-400 text-base font-light mb-5">FIRST YOOL brand identity</p>
                <h3 className="text-[30px] font-light mb-4 leading-[42px]">BI</h3>
              </header>
              <div className="space-y-[14px]">
                <h5 className="text-[17px] font-light mb-4 leading-[22px]">
                  가장 먼저 시작되는 품격 있는 변화
                </h5>
                <p className="text-base font-light leading-[26px] text-gray-600">
                  FIRST: 분당의 새로운 기준, 가장 먼저 변화의 방향을 여는 상징.<br />
					YOOL: ‘율’, 질서와 흐름, 품격 있는 주거 리듬을 상징하는 대표 하이퍼엔드 주택													

                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Main Color */}
<article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
  <h3 className="text-2xl px-6 md:px-0 font-light mb-8">Main Color</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* PANTONE 3536 u */}
    <div className="relative w-full h-48 rounded-none overflow-hidden" style={{ backgroundColor: "#075423" }}>
      <div className="absolute bottom-0 left-0 p-4 text-white text-left">
        <p className="font-light mb-2">PANTONE 3536 u</p>
        <div className="text-sm text-white/90 space-y-1">
          <p><span className="font-light">G</span> 135 <span className="font-light">B</span> 95 <span className="font-light">K</span> 45</p>
          <p><span className="font-light">R</span> 0 <span className="font-light">M</span> 0</p>
        </div>
      </div>
    </div>

    {/* PANTONE 107 u */}
    <div className="relative w-full h-48 rounded-none overflow-hidden" style={{ backgroundColor: "#fafa14" }}>
      <div className="absolute bottom-0 left-0 p-4 text-black text-left">
        <p className="font-light mb-2">PANTONE 107 u</p>
        <div className="text-sm text-black/90 space-y-1">
          <p><span className="font-light">K</span> 70</p>
          <p><span className="font-light">R</span> 75 <span className="font-light">G</span> 75 <span className="font-light">B</span> 75</p>
        </div>
      </div>
    </div>

    {/* PANTONE purple u */}
    <div className="relative w-full h-48 rounded-none overflow-hidden" style={{ backgroundColor: "#7c0d82" }}>
      <div className="absolute bottom-0 left-0 p-4 text-left">
        <p className="font-light mb-2 text-white">PANTONE purple u</p>
        <div className="text-sm text-white space-y-1">
          <p><span className="font-light">M</span> 5 <span className="font-light">Y</span> 10</p>
          <p><span className="font-light">R</span> 255 <span className="font-light">G</span> 240 <span className="font-light">B</span> 200</p>
        </div>
      </div>
    </div>
  </div>
</article>

      {/* Sub Color */}
<article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
  <h3 className="text-2xl px-6 md:px-0 font-light mb-8">Sub Color</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* PANTONE 293 u */}
    <div
      className="relative w-full h-48 rounded-none overflow-hidden"
      style={{ backgroundColor: "#041a91" }}
    >
      <div className="absolute bottom-0 left-0 p-4 text-left text-white">
        <p className="font-light mb-2">PANTONE 293 u</p>
        <div className="text-sm text-white/90 space-y-1">
          <p>
            <span className="font-light">C</span> 30{" "}
            <span className="font-light">M</span> 45
          </p>
          <p>
            <span className="font-light">R</span> 175{" "}
            <span className="font-light">G</span> 125{" "}
            <span className="font-light">B</span> 190
          </p>
        </div>
      </div>
    </div>

    {/* PANTONE 319 u */}
    <div
      className="relative w-full h-48 rounded-none overflow-hidden"
      style={{ backgroundColor: "#0992b8" }}
    >
      <div className="absolute bottom-0 left-0 p-4 text-left text-white">
        <p className="font-light mb-2">PANTONE 319 u</p>
        <div className="text-sm text-white/90 space-y-1">
          <p>
            <span className="font-light">K</span> 40
          </p>
          <p>
            <span className="font-light">R</span> 153{" "}
            <span className="font-light">G</span> 153{" "}
            <span className="font-light">B</span> 153
          </p>
        </div>
      </div>
    </div>

    {/* PANTONE 250 u */}
    <div
      className="relative w-full h-48 rounded-none overflow-hidden"
      style={{ backgroundColor: "#d685d6" }}
    >
      <div className="absolute bottom-0 left-0 p-4 text-left">
        <p className="font-light mb-2 text-white">PANTONE 250 u</p>
        <div className="text-sm text-white space-y-1">
          <p>
            <span className="font-light">K</span> 15
          </p>
          <p>
            <span className="font-light">R</span> 217{" "}
            <span className="font-light">G</span> 217{" "}
            <span className="font-light">B</span> 217
          </p>
        </div>
      </div>
    </div>
  </div>
</article>
    </div>
  );
}

function Lightbox({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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

      <img
        src={image}
        alt=""
        className="h-[75vh] w-auto object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
