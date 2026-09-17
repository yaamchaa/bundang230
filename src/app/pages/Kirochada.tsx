import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronUp } from 'lucide-react';
import {
  ChevronDown,
  MapPin,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Home,
  Handshake,
  FileText,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Calendar,
  Sparkles,
  Zap,
  Clock,
  TrendingDown,
  Shield,
  Award,
  BadgeCheck,
  BarChart3,
  Hotel,
} from 'lucide-react';
import brandBg from '../../assets/images/main-7.jpg';

function MetricCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-700 mb-1">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}

function QuickStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
        {icon}
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm leading-6 text-blue-100">{label}</div>
    </div>
  );
}

function OverviewCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </div>
        <h3 className="text-xl text-slate-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
            <span className="text-sm leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonCard({
  title,
  icon,
  accent,
  points,
}: {
  title: string;
  icon: React.ReactNode;
  accent: 'blue' | 'emerald';
  points: string[];
}) {
  const accentMap = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${accentMap[accent]}`}
      >
        {icon}
      </div>
      <h3 className="mb-4 text-2xl text-slate-900">{title}</h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700">
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
            <span className="text-sm leading-7">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
      <div className="mb-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs tracking-[0.16em] text-white">
        {step}
      </div>
      <h4 className="mb-2 text-lg text-slate-900">{title}</h4>
      <p className="text-sm leading-7 text-slate-600">{description}        
      </p>
    </div>
  );
}

function ChecklistCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>
      <h4 className="mb-2 text-lg text-slate-900">{title}</h4>
      <p className="text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export function KirochadaBrand() {
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
      <section className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <h2 className="text-white text-[38px] font-light leading-[42px]">가이드</h2>
        </div>
      </section>

      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div ref={tabSentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />

        <div className="sticky top-0 z-40 bg-white border-b border-gray-300">
          <div className="max-w-[1200px] mx-auto px-0 md:px-6">
            <div className="flex font-light px-4 md:px-0 gap-16 pt-8">
              <button
                onClick={() => handleTabChange('introduction')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'introduction' ? 'text-black' : 'text-gray-400'
                }`}
              >
                가이드
                {activeTab === 'introduction' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('introduction1')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'introduction1' ? 'text-black' : 'text-gray-400'
                }`}
              >
                추정분담금
                {activeTab === 'introduction1' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('introduction2')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'introduction2' ? 'text-black' : 'text-gray-400'
                }`}
              >
                Q&A
                {activeTab === 'introduction2' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'introduction' && <IntroductionTab />}
        {activeTab === 'introduction1' && <Introduction1Tab />}
        {activeTab === 'introduction2' && <Introduction2Tab />}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl text-slate-800">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-slate-700">
            <span className="text-blue-600 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
  phase,
}: {
  number: string;
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-3 right-3 bg-blue-200 text-white text-xs px-3 py-1 rounded-full">
        {phase}
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm px-4 py-2 rounded-lg mb-4 inline-block">
        {number}
      </div>
      <h3 className="text-lg mb-2 text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function UnitCard({
  area,
  units,
  description,
  color,
}: {
  area: string;
  units: string;
  description: string;
  color: string;
}) {
  const colorClasses = {
    purple: 'from-purple-600 to-purple-700 text-white',
    blue: 'from-blue-600 to-blue-700 text-white',
    green: 'from-green-600 to-green-700 text-white',
    orange: 'from-orange-600 to-orange-700 text-white',
    red: 'from-red-600 to-red-700 text-white',
    black: 'from-black to-zinc-900 text-white',
    yellow: 'from-yellow-400 to-amber-500 text-white',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-6`}>
        <Home size={32} className="mb-3" />
        <p className="text-3xl mb-1">{area}</p>
        <p className="text-xl opacity-90">{units}</p>
      </div>
      <div className="p-6">
        <p className="text-slate-700">{description}</p>
      </div>
    </div>
  );
}

function CostCard({
  icon,
  amount,
  label,
  detail,
}: {
  icon: React.ReactNode;
  amount: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <p className="text-3xl mb-2 text-slate-900">{amount}</p>
      <h3 className="text-lg mb-2 text-slate-800">{label}</h3>
      <p className="text-sm text-slate-600">{detail}</p>
    </div>
  );
}

function SensitivityCard({
  scenario,
  price,
  change,
  profit,
  isPositive,
  isBase,
}: {
  scenario: string;
  price: string;
  change: string;
  profit: string;
  isPositive?: boolean;
  isBase?: boolean;
}) {
  const borderColor = isBase ? 'border-blue-600' : isPositive ? 'border-green-600' : 'border-red-600';
  const bgColor = isBase ? 'bg-blue-50' : isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${borderColor}`}>
      <h3 className="text-xl mb-4 text-slate-800">{scenario}</h3>
      <div className={`${bgColor} rounded-lg p-4 mb-4`}>
        <p className="text-2xl text-slate-900 mb-1">{price}</p>
        <p className="text-sm text-slate-600">{change}</p>
      </div>
      <div>
        <p className="text-sm text-slate-600 mb-1">추정 잉여이익</p>
        <p className="text-2xl text-slate-900">{profit}</p>
      </div>
    </div>
  );
}

function TableRow({
  type,
  area,
  units,
  ratio,
  cost,
  profit,
  refund,
}: {
  type: string;
  area: string;
  units: string;
  ratio: string;
  cost: string;
  profit: string;
  refund: string;
}) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-slate-900 whitespace-nowrap">{type}</td>
      <td className="px-6 py-4 text-slate-900 whitespace-nowrap">{area}</td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{units}</td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{ratio}</td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{cost}</td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{profit}</td>
      <td className="px-6 py-4 text-blue-700 whitespace-nowrap">{refund}</td>
    </tr>
  );
}

function NextStepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
          {number}
        </div>
        <ArrowRight className="text-blue-300" size={20} />
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-blue-100 text-sm">{description}</p>
    </div>
  );
}

function DecisionCard({
  number,
  question,
  description,
}: {
  number: string;
  question: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
      <div className="flex items-start gap-4">
        <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          {number}
        </div>
        <div>
          <h3 className="text-lg mb-2 text-slate-800">{question}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({
  category,
  garo,
  reconstruction,
  redevelopment,
  highlight,
}: {
  category: string;
  garo: string;
  reconstruction: string;
  redevelopment: string;
  highlight?: string;
}) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-slate-900 whitespace-nowrap">{category}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          highlight === 'garo'
            ? 'bg-blue-50 text-blue-900'
            : 'text-slate-700'
        }`}
      >
        {garo}
      </td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{reconstruction}</td>
      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{redevelopment}</td>
    </tr>
  );
}

function AdvantageCard({
  icon,
  title,
  color,
  benefits,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  benefits: string[];
}) {
  const colorClasses = {
    yellow: 'from-yellow-500 to-yellow-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white p-6`}>
        <div className="mb-3">{icon}</div>
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-slate-700">
              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg mb-2 text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function Introduction1Tab() {
  return (
    <div className="bg-slate-50">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">가이드</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">추정분담금</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300"> Q&A</h5>
        </div>
      </nav>
      
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-900 mb-3">
            분당동2 30구역 통합재건축 사업성 및 추정분담금 예시
          </h2>
          <p className="text-slate-600 leading-7 max-w-4xl">
            경기도 성남시 분당구 분당동 44~62번지 일대 통합재건축 사업과 관련하여,            
          </p>
          <p className="text-slate-600 leading-7 max-w-4xl">            
            예시 데이터를 바탕으로 재건축 초과이익 환수금(재초환) 및 사업성(비례율)을 분석한 결과입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <MetricCard
            icon={<Building2 className="h-6 w-6 text-blue-600" />}
            value="381세대"
            label="현재 세대수"
            description="전체토지등소유자 확인 필요"
          />
          <MetricCard
            icon={<Home className="h-6 w-6 text-emerald-600" />}
            value="864세대"
            label="계획 세대수(가정)"
            description="일반분양 483세대 포함"
          />
          <MetricCard
            icon={<DollarSign className="h-6 w-6 text-amber-600" />}
            value="52.5억 원"
            label="종후자산 예시"
            description="75평형(평) × 평당 7,000만 원"
          />
        </div>

        <div className="mb-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl text-slate-900">1. 분석 개요 및 주요 전제 조건</h3>
          </div>
          <p className="text-slate-600 leading-7 mb-6">
             본 분석은 2024년 3월 시행된 재건축 초과이익 환수법 개정안을 기준으로 하며,
             분당 지역 시장 상황을 반영한 <span className="text-red-700 underline decoration-red-700 underline-offset-4 font-medium">(추정치)</span>를 사용하였습니다.
            </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-700">항목</th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-700">내용</th>
                  <th className="py-3 text-sm font-semibold text-slate-700">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">대상 위치</td>
                  <td className="py-4 pr-4 text-slate-700">분당동 44-1~5, 45~50, 52~56, 60-1~9, 61-1~4, 62-1~2</td>
                  <td className="py-4 text-slate-600">연립주택 단지 일대</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">현재 세대수</td>
                  <td className="py-4 pr-4 text-slate-700">381세대</td>
                  <td className="py-4 text-slate-600">기존 조합원 수</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">계획 세대수</td>
                  <td className="py-4 pr-4 text-slate-700">864세대 (추정 수치를 나타내기 위한 가정의 계획입니다.)</td>
                  <td className="py-4 text-slate-600">일반분양 483세대 포함</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">평균 분양 평수</td>
                  <td className="py-4 pr-4 text-slate-700">세대당 75평(전용면적59.96으로 계산)</td>
                  <td className="py-4 text-slate-600">전체 동일 평형 가정</td>
                </tr>                
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">현재평균 시세</td>
                  <td className="py-4 pr-4 text-slate-700">25억 원 (2027년 특별정비구역지정 전 예상 감정평가액)</td>
                  <td className="py-4 text-slate-600">세대당 평균 기준(종전계획)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">예상 분양가</td>
                  <td className="py-4 pr-4 text-slate-700">평당 7,000만 원(인근 아파트 예상분양가6,500만원 제시)</td>
                  <td className="py-4 text-slate-600">분당 선도지구 수준 반영</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">평당 공사비</td>
                  <td className="py-4 pr-4 text-slate-700">평당 1,500만 원(인근 아파트 예상공사비950만원 제시)</td>
                  <td className="py-4 text-slate-600">기반시설 및 기타비용 별도 계산 필요</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 text-slate-900 whitespace-nowrap">공공기여</td>
                  <td className="py-4 pr-4 text-slate-700">16%(10%구간)+12.3%(41%구간) = 28.3%</td>
                  <td className="py-4 text-slate-600">용적율 280% 적용 시</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-rose-600" />
              <h3 className="text-xl text-slate-900">2. 재건축 초과이익 1인(세대당)환수금(부담금) 추정</h3>
            </div>
            <p className="font-light text-black leading-7 mb-4">
              재건축 부담금은 종료시점 가액에서 개시시점 가액, 정상 상승분, 개발비용을 제외한 초과이익을 기준으로 부과됩니다.
              2024년 개정안에 따라 면제 금액은 8,000만 원으로 상향되었으며, 부과 구간은 5,000만 원 단위로 조정되었습니다
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <p>① 종료시점 주택가액: 52.5억 원 / 준공 시점 예상 시세 (75평 × 7,000만 원)</p>
              <p>② 개시시점 주택가액: 26.51억 원 / 2027.12 정비구역 지정 시점 추정 시세 (연4%)</p>
              <p>③ 정상 주택가격 상승분: 5.74억 원 / 사업기간(5년) 내 정상 상승분 (연 4% 가정)</p>
              <p>④ 개발비용(세대당): 26.98억 원 / 공사비 + 기타사업비(공사비의 45%) / 총세대수</p>
              <p>⑤ 산출 초과이익: -6.73억 원 / ① - (② + ③ + ④)</p>
              <p className="font-light text-black">예상 초과 이익 환수금 : 약 0억 원 / 2024 개정 누진 세율 적용 (최고세율 50%)
              <br/>  
              <br/>*공사비, 기타사업비 등의 변동율에 따라 변경될 수 있습니다.</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h3 className="text-xl text-slate-900">3. 사업성 분석 (비례율 및 추정 분담금)</h3>
            </div>
            <p className="font-light text-black leading-7 mb-4">              
              본 사업지는 일반분양 물량(483세대)이 기존 조합원 수(381세대)보다 많아 사업성이 매우 우수한 것으로 분석됩니다. 
              조합원 분양가를 일반분양가의 80% 수준으로 가정할 때, 조합원들은 신축 아파트를 분양받고도 상당한 금액을 환급받을 수 있을 것으로 예상됩니다.
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <p>총 매출(종후자산): 4조 5,360억 원 / 864세대 전체 일반분양가 기준 평가</p>
              <p>총 사업비(지출): 2조 3,316억 원 / 공사비 1조 6,080억 + 기타비용 7,236억</p>
              <p>추정 비례율: 232.04% / (종후자산 - 총사업비) / 종전자산</p>
              <p>조합원 평균 분담금: 약 -5.51억 원 / (향후 사업조건 등에 따라 변동될 수 있습니다.)</p>
              <p></p>
              <p className="font-light text-black">예시 결과, 해당 재건축 사업은 일반분양 비율이 높아 비례율이 232%를 상회하는
                           우수한 사업성으로 조합원 1인당 약 5.51억 원의 환급금이 발생할 것으로 추정되며, 이는 재건축
                           초과이익 환수금(약 0억 원)을 납부하고도 충분히 좋은 사업입니다.
                           <br/>
                           <br/>*공사비, 기타사업비 등의 변동율과 각 세대별 권리가액에 따라 변동될 수 있습니다.</p>
              
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6 text-white mb-10">
          <h3 className="text-xl mb-4">4. 최종 현금 흐름 요약</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextStepCard
              number="1"
              title="신축 75평형 하이퍼엔드 1채 취득"
              description="분양가 52.5억 원 가치"
              
            />
            <NextStepCard
              number="2"
              title="예상 분담금(환급금) +5.51억 원"
              description="사업 이익 배분액"
            />
            <NextStepCard
              number="3"
              title="재건축 부담금 0억 원"
              description="초과이익 환수금"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <p className="text-lg">
              최종 순수익(예시)
              <span className="font-semibold"> / 약 5.51억 원</span>
              <span className="font-midium"> / 추정은 향후 사업조건과 개별 권리가액에 따라 변동될 수 있습니다.</span>
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl text-slate-900 mb-4">5. 참고할 점</h3>
          <ul className="space-y-3 text-slate-700 text-sm leading-7">          
            <li>1. 유의할 점</li>
            <li>일반분양가와 공사비가 가정값에서 크게 벗어나면 환급금 규모는 달라질 수 있습니다.</li>
            <li>2027년 개시 시점의 정확한 감정평가액과 종료 시점의 실제 시세에 따라 분담금이 변동될 수 있습니다.</li>
            <li>설계 변경, 물가 상승, 정책 변화는 사업성에 직접 영향을 줍니다.</li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

      {/* 1차 설명회 */}
    function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs tracking-[0.16em] text-blue-700 ring-1 ring-blue-100">
      {children}
    </div>
  );
}

function IntroHeroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[28px] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
        {icon}
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm leading-6 text-blue-100">{label}</div>
    </div>
  );
}

function PageSectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 md:mb-12">
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="mt-4 text-3xl md:text-4xl leading-tight text-slate-900">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm md:text-base leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function HighlightPanel({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-sm transition ${
        onClick ? 'hover:shadow-md cursor-pointer' : ''
      }`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        {icon}
      </div>
      <h3 className="mb-3 text-xl text-slate-900">{title}</h3>
      <p className="text-sm leading-7 text-slate-600">{description}</p>
    </Wrapper>
  );
}

function PresenterScriptCard({
  index,
  title,
  summary,
  script,
}: {
  index: string;
  title: string;
  summary: string;
  script: string;
}) {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs tracking-[0.16em] text-white">
          {index}
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
          발표 대본
        </div>
      </div>

      <h3 className="text-xl leading-tight text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-blue-700">{summary}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{script}</p>
      </div>
    </div>
  );
}

function PremiumTableCard({
  title,
  description,
  headers,
  rows,
}: {
  title: string;
  description?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5 md:px-8">
        <h3 className="text-xl text-slate-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-left text-xs tracking-[0.14em] text-slate-500 uppercase md:px-8"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-5 align-top text-sm leading-7 md:px-8 ${
                      cellIndex === 0 ? 'font-medium text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left md:px-7"
      >
        <div>
          <div className="mb-2 text-xs tracking-[0.14em] text-blue-700 uppercase">FAQ</div>
          <div className="text-base md:text-lg leading-7 text-slate-900">{question}</div>
        </div>
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 px-6 py-5 md:px-7">
          <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}

function Introduction2Tab() {
  const navigate = useNavigate();

  const handleGoToInquiry = () => {
    navigate('//contact/inquiry?tab=inquiry');
  };
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scriptCards = [
    {
      index: 'SLIDE 01',
      title: '표지 / 설명회 시작',
      summary: '설명회의 목적과 오늘의 분위기를 정리하는 오프닝',
      script:
        '분당동 31개 연립주택 통합 재건축과 관련하여 조합원 여러분께 꼭 필요한 핵심 내용을 정리. 설명회는 찬성 반대가 아닌, 사업성, 권리, 부담, 시행방식, 향후 일정에 대해 자료를 보고 같은 기준으로 판단을 돕는 설명회입니다.',
    },
    {
      index: 'SLIDE 02',
      title: '꼭 이해해야 할 5가지',
      summary: '왜 지금 설명회가 필요한지 전체 구조 제시',
      script:
        '첫째, 왜 지금 전체 설명회가 필요한지, 둘째, 왜 31개 연립주택을 통합으로 보는지, 셋째, 사업성과 수익·환수 구조는 어떻게 봐야 하는지, 넷째, 권리배분과 조합시행·신탁방식은 어떤 차이가 있는지, 다섯째, 특별정비구역 지정 제안 전에 무엇을 준비해야 하는지,',
    },
    {
      index: 'SLIDE 03',
      title: '현재 사업 단계',
      summary: '지금은 특별정비구역지정 전 단계로 설명·정리 단계입니다.',
      script:
        '1차, 2차 간담회를 통해 주민 전체 설명 단계입니다. 지금은 특별정비구역 지정이 완료된 상태가 아니라, 지정 제안을 준비하기 위한 설명과 주민 의견수렴 단계입니다. 따라서 판단 가능한 기준과 절차를 정리하는 자리입니다.',
    },
    {
      index: 'SLIDE 04',
      title: '제도상 현재 위치',
      summary: '주민이 직접 제안하는 지정제안 구조 설명',
      script:
        '주민제안 방식, 특별정비구역 지정 제안서 작성 방법, 특별법 및 관련 지침에 따른 제안 내용, 향후 추진 일정 등이 핵심 안내사항입니다. 지금 단계는 주민이 직접 제안 가능한 수준의 자료와 동의 기반을 만들어 가는 단계입니다.',
    },
    {
      index: 'SLIDE 05',
      title: '대상지의 공통 특성',
      summary: '31개 단지의 유사한 자산 구조를 설명하는 부분',
      script:
        '대상지는 31개 빌라 전체가 공시지가 약 412만원에서 500만원 수준, 체감 시세는 대략 25억원 정도, 평형은 약 75평에서 80평 수준으로 구성되어 있습니다. 큰 틀에서 자산 편차가 크지 않은 구역으로, 통합 재건축 논리를 설명하기에 일정한 공통 기반이 있습니다.',
    },
    {
      index: 'SLIDE 06',
      title: '왜 통합으로 보는가',
      summary: '통합 재건축의 핵심 논리',
      script:
        '31개를 통합으로 보는 이유는 단지 숫자를 키우기 위한 것이 아닙니다. 자산 구조가 크게 벌어지지 않는 편이기 때문에 공통 기준을 세우기 비교적 수월하고, 개별 추진보다 설계와 사업구조 측면에서 더 넓은 선택지를 검토할 수 있기 때문입니다.',
    },
    {
      index: 'SLIDE 07',
      title: '통합의 기대효과',
      summary: '설계·기반시설·사업성 측면의 통합 장점',
      script:
        '통합 재건축은 정비계획 수립 시 설계 자유도를 높일 수 있고, 기반시설과 배치 계획도 한 번에 검토할 수 있는 장점이 있습니다. 주민 입장에서는 묶인 단지 때문에 불리하기보다, 단지가 통합 되어 검토 가능한 옵션이 생긴다고 이해하는 것이 맞습니다.',
    },
    {
      index: 'SLIDE 08',
      title: '통합의 한계',
      summary: '통합이 유리한 장점만 있는 것은 아닙니다.',
      script:
        '주민별 판단 속도 차이, 권리배분 민감도, 정보 비대칭, 일부 반대 의견과 같은 요소에 충돌 시 갈등이 커질 수 있습니다. 장점과 함께 이러한 한계도 함께 알아야 합니다.',
    },
    {
      index: 'SLIDE 09',
      title: '사업성의 기본 구조',
      summary: '정비 사업을 수입·비용 구조로 이해 하는 파트',
      script:
        '사업성은 집값이 비싸다는 한 가지 기준으로 판단하는 것이 아닙니다. 종전자산, 총수입, 총사업비, 금융비용, 공공기여, 각종 부담을 함께 보고, 최종적으로 비례율과 추가분담금 범위를 판단해야 합니다.',
    },
    {
      index: 'SLIDE 10',
      title: '우리 구역 사업성 해석 포인트',
      summary: '유사 자산 구조의 장점과 변수의 중요성',
      script:
        '우리 구역은 자산 편차가 상대적으로 작아 설명 기준을 맞추기에는 좋은 편입니다. 그러나 사업성의 성패는 결국 용적률, 설계안, 공사비, 공공기여, 일반분양 여건에 달려 있으므로 결과를 단정할 수 없습니다.',
    },
    {
      index: 'SLIDE 11',
      title: '꼭 봐야 할 숫자',
      summary: '비례율·추가분담금·민감도 분석의 중요성',
      script:
        '조합원이 가장 먼저 봐야 할 숫자는 비례율, 추가분담금 범위, 공사비 민감도, 일반분양가 민감도, 환수 반영 후 순효과입니다. 좋은 설명회는 하나의 숫자를 말하는 자리가 아니라, 어떤 변수에 따라 얼마까지 달라질 수 있는지를 확인 하는 자리입니다.',
    },
    {
      index: 'SLIDE 12',
      title: '금지해야 할 표현',
      summary: '주민 신뢰를 해치는 표현을 사전에 차단',
      script:
        '"무조건 사업성이 좋다, 추가분담금이 거의 없다, 신탁이면 바로 된다, 조건이 비슷하니 결과도 모두 똑같다" 같은 표현은 주민 신뢰를 가장 빨리 잃게 만듭니다. 현재 자료는 기대만이 아니라 기준을 드리는 방식으로 이해해 주면 좋습니다.',
    },
    {
      index: 'SLIDE 13',
      title: '수익과 환수는 다르다',
      summary: '개발이익과 제도상 환수 구조 구분',
      script:
        '정비사업에 수익이 좋다는 것은, 공공기여·기부채납·부담금·재건축 초과이익 환수가 절차상 정리 된후 문제입니다. 개발이익과 최종 체감이익은 모든 조건이 진행되어야 명확 합니다.',
    },
    {
      index: 'SLIDE 14',
      title: '재건축 초과이익 환수 핵심',
      summary: '재초환은 감성이나 감정이 아닌 제도 문제',
      script:
        '재건축 초과이익 환수는 감정의 문제가 아니라 제도의 문제입니다. 면제 기준, 부과 구간, 감면 가능성, 납부유예 조건을 이해하면 체감 부담이 어느 정도인지 확인 가능 합니다.',
    },
    {
      index: 'SLIDE 15',
      title: '감면과 유예',
      summary: '장기보유자와 고령자 설명',
      script:
        '2026년 현재 재건축 초과이익 환수는 1인당 평균 초과이익 8,000만원 이하 면제 기준이 적용되고, 장기보유 1주택자는 최대 70%까지 감면, 60세 이상 1주택자는 납부유예 신청이 가능한 구조로 이해하시면 됩니다. 따라서 모든 조합원이 다르게 적용 됩니다.',
    },
    {
      index: 'SLIDE 16',
      title: '권리배분의 출발점',
      summary: '종전자산과 권리가액 산정 원칙',
      script:
        '권리배분은 종전자산 평가가 중요 합니다., 이후 권리가액 산정, 평형 신청, 배정 원칙 정리로 이어집니다. 지금 단계는 개인별 확정 배분을 말하는 단계가 아니라, 어떤 기준으로 권리가 정리되는지를 설명하는 단계입니다.',
    },
    {
      index: 'SLIDE 17',
      title: '유사 평형 구조의 의미',
      summary: '대체로 유사하지만 완전히 같은 것은 아님',
      script:
        '우리 구역은 75~80평형 중심이라 설명 체계는 비교적 단순할 수 있습니다. 하지만 위치, 방향, 세부 권리관계, 개별 평가 조건에 따라 차이가 생길 수 있으므로, 대체로 유사하다는 말과 최종 결과가 완전히 같다는 말은 다릅니다.',
    },
    {
      index: 'SLIDE 18',
      title: '권리배분 갈등의 원인',
      summary: '추정과 확정의 혼동을 방지',
      script:
        '권리배분 갈등은 숫자 보다 전달 방식 차이 때문에 불편한 경우가 발생합니다. 예시 수치를 확정처럼 받아들이거나, 일부 사례를 전체 기준처럼 일반화할 때 오해가 커집니다. 그래서 자료에는 반드시 추정, 예시, 확정 아님 표시를 넣고 있습니다.',
    },
    {
      index: 'SLIDE 19',
      title: '조합시행과 신탁방식',
      summary: '방식 비교를 중립적으로 안내',
      script:
        '조합시행은 주민 통제력 중심의 방식이고, 신탁방식은 전문기관 활용 중심의 방식입니다. 어느 방식이 무조건 우월한가보다, 우리 구역의 역량과 목표에 어느 방식이 더 적합한지를 보는 것이 중요합니다.',
    },
    {
      index: 'SLIDE 20',
      title: '조합시행의 특징',
      summary: '주민 통제력과 운영 부담을 함께 설명',
      script:
        '조합시행은 주민 주도권 확보에 장점이 있지만, 대표 체계와 운영 역량이 부족하면 속도가 늦어지고 피로감이 커질 수 있습니다. 통제력과 책임이 함께 커지는 구조라고 이해하시면 됩니다.',
    },
    {
      index: 'SLIDE 21',
      title: '신탁방식의 특징',
      summary: '전문성의 장점과 비용·권한 구조의 확인 필요성',
      script:
        '신탁방식은 사업관리와 실행 측면에서 전문성을 기대할 수 있지만, 주민이 무엇을 맡기고 무엇을 통제할 것인지, 비용 구조와 권한 배분을 명확히 이해하지 못하면 오해가 생기기 쉽습니다.',
    },
    {
      index: 'SLIDE 22',
      title: '예비사업시행자와 절차',
      summary: '최근 제도 변화와 실무 대응을 연결하는 부분',
      script:
        '최근 제도 흐름은 주민대표단, 예비사업시행자, 동의서 서식, 전자서명 반영 등 절차 체계를 더 정교하게 정리하는 방향입니다. 따라서 사업방식 선택은 선호의 문제가 아니라 동의 절차와 문서 체계까지 포함한 실무 문제로 이해해야 합니다.',
    },
    {
      index: 'SLIDE 23',
      title: '향후 추진 일정',
      summary: '설명회 후 실제로 이어져야 할 단계 정리',
      script:
        '설명회 이후에는 서면 질의 접수, 공식 답변 정리, 보완자료 배포, 주민 공감대 확인, 특별정비구역 지정 제안 준비의 순서로 가는 것이 바람직합니다. 설명회가 끝났다고 정리가 끝나는 것이 아니라, 오늘부터가 실제 정리 단계입니다.',
    },
    {
      index: 'SLIDE 24',
      title: '전체토지등소유자가 지금 해야 할 일',
      summary: '현 단계의 주민 행동 항목 정리',
      script:
        '지금 단계에서 전체토지등소유자께서 가장 먼저 해야 할 일은 본인 권리관계 확인, 가족 내부 의사 정리, 공식 자료 기준으로 판단, 서면 질문 제출입니다. 가장 위험한 것은 비공식 소문이 공식 자료를 대신하는 상황입니다.',
    },
    {
      index: 'SLIDE 25',
      title: '오늘의 정리',
      summary: '핵심 메시지 재정리',
      script:
        '31개 연립주택은 비교적 유사한 자산 구조를 가지고 있어 통합 재건축을 설명하고 검토하기에 일정한 장점이 있습니다. 그러나 사업성은 용적률, 공사비, 공공기여, 분양 여건에 따라 달라지고, 권리배분과 시행방식은 명확한 기준과 절차 없이 접근하면 갈등이 커질 수 있습니다.',
    },
    {
      index: 'SLIDE 26',
      title: '질의응답 안내',
      summary: '공통질문과 개별질문을 구분해 받는 마무리',
      script:
        '공통 질문은 공개적으로 답변드리고, 개인 권리관계나 민감한 사안은 별도 접수로 정리합니다. 설명회 이후에는 질의응답 정리본과 보완자료를 공식 기준으로 다시 배포드리는 방식이 필요합니다.',
    },
  ];

  const tables = [
    {
      title: '설명회 핵심 프레임',
      description: '설명회 요약표',
      headers: ['항목', '핵심 문안'],
      rows: [
        ['현재 단계', '특별정비구역 지정 완료 전, 주민 설명 및 제안 준비 단계'],
        ['설명 목적', '사업성·권리·부담·방식·일정을 같은 기준으로 판단하기 위한 설명회'],
        ['주민 역할', '공식 자료 확인, 질의 제출, 동의 기반 형성'],
        ['실무 원칙', '희망보다 기준, 추정보다 범위, 소문보다 공식자료'],
      ],
    },
    {
      title: '31개 연립주택 기본 현황',
      description: '본문, 소개 ',
      headers: ['구분', '내용'],
      rows: [
        ['대상지', '분당동 31개 연립주택'],
        ['공시지가', '약 412만원 ~ 500만원'],
        ['체감 시세', '현재 기준 대략 20억원 수준'],
        ['평형 구조', '대략 75~80평형 중심'],
        ['해석 포인트', '자산 편차가 크지 않아 통합 설명이 좋은 편'],
      ],
    },
    {
      title: '통합 재건축 기대효과',
      headers: ['구분', '설명'],
      rows: [
        ['설계 측면', '개별 필지보다 통합 배치와 설계 검토가 가능'],
        ['기반시설', '주차·동선·공간 구조를 함께 검토 가능'],
        ['사업성 검토', '수익·비용 구조를 규모 있게 비교 가능'],
        ['협의 구조', '대외 협의 시 단일한 주민 방향 제시 가능'],
      ],
    },
    {
      title: '사업성 판단 구조',
      headers: ['핵심 요소', '설명'],
      rows: [
        ['종전자산', '기존 자산가치의 평가 출발점'],
        ['총수입', '일반분양 및 기타 사업 수입 추정'],
        ['총사업비', '공사비·금융비용·부대비용 등'],
        ['환수 요소', '공공기여·기부채납·각종 부담금'],
        ['최종 체감', '비례율 및 추가분담금 범위로 확인'],
      ],
    },
    {
      title: '수익과 환수 비교표',
      headers: ['구분', '수익', '환수'],
      rows: [
        ['의미', '사업을 통해 창출되는 총수입과 이익', '제도와 공공요건에 따라 공제되는 요소'],
        ['대표 항목', '일반분양 수입, 기타 수입', '공공기여, 기부채납, 재건축부담금'],
        ['주민 체감', '사업 기대감으로 연결', '실질 체감 수익 감소 가능성'],
        ['설명 포인트', '사업 매력도', '최종 손익 판단의 현실 변수'],
      ],
    },
    {
      title: '재건축 초과이익 환수 핵심',
      description: '2026년 설명회 기준 정리',
      headers: ['항목', '내용'],
      rows: [
        ['면제 기준', '조합원 1인당 평균 초과이익 8,000만원 이하 면제'],
        ['부과 구조', '8,000만원 초과 구간에 10~50% 누진 부과'],
        ['장기보유 1주택자', '최대 70% 감면 가능'],
        ['고령자', '60세 이상 1주택자는 납부유예 신청 가능'],
      ],
    },
    {
      title: '조합시행 vs 신탁방식',
      headers: ['구분', '조합시행', '신탁방식'],
      rows: [
        ['중심축', '주민 통제력 중심', '전문기관 실행력 중심'],
        ['장점', '의사결정 주도권 확보', '사업관리 전문성 기대'],
        ['유의점', '내부 운영역량 필요', '비용·권한 구조 확인 필요'],
        ['적합 상황', '주민 주도 의지가 강한 경우', '실행속도와 구조 정리가 중요한 경우'],
      ],
    },
    {
      title: '향후 추진 일정 예시',
      headers: ['단계', '주요 내용'],
      rows: [
        ['1단계', '주민 전체 설명회'],
        ['2단계', '서면 질의 접수'],
        ['3단계', '공식 답변 정리 및 보완자료 배포'],
        ['4단계', '주민 공감대·동의 기반 확인'],
        ['5단계', '특별정비구역 지정 제안 준비'],
      ],
    },
  ];

  const faqs = [
    {
      question: '왜 31개를 꼭 통합으로 봐야 하나요?',
      answer:
        '국토부와 성남시의 노후계획도시정비사업을 추진중 우리 단지는 [연립주택 구역계 30구역] 지구단위계획으로 재건축 텅합 사업지로 특별정비구역 예정지역으로 지정되었습니다.',
    },
    {
      question: '공시지가가 비슷하면 권리배분도 거의 같아지나요?',
      answer:
        '자산과 평형 조건이 비교적 유사한 편이라 통합 시 권리산정 설명의 일관성을 확보하기 좋으며, 큰 틀의 설명은 단순해질 수 있지만, 위치·향·개별 조건·감정평가 결과에 따라 세부 배분은 달라질 수 있습니다.',
    },
    {
      question: '현재 시세가 25억 정도면 사업성은 좋은 편인가요?',
      answer:
        '시세는 중요한 변수지만 사업성은 총수입, 공사비, 금융비용, 공공기여, 일반분양 조건을 함께 봐야 합니다.',
    },
    {
      question: '사업성이 좋으면 추가분담금이 없는 건가요?',
      answer:
        '사업성이 좋아 추가분담금이 환급금이 될 수도 있지만, 반대로 사업성이 좋지만 사업이 부진하면 추가분담금이 발생할 수도 있습니다.',
    },
    {
      question: '왜 지금 전체 설명회가 필요한가요?',
      answer:
        '최근 분당 주민설명회도 지정 제안서 작성 방법, 제안 내용, 향후 일정을 설명하는 구조에서, 2027년 주민제안을 위해 현 단계는 전체토지등소유주분들이 직접 제안 준비를 해야 하는 단계이기 때문입니다.',
    },
    {
      question: '과반 동의가 필요한가요?',
      answer:
        '최근 제도 흐름은 주민대표단, 예비사업시행자, 결합·동의 절차 등을 과반 동의 구조 중심으로 정비하는 방향입니다.',
    },
    {
      question: '신탁방식으로 가면 무조건 빨라지나요?',
      answer:
        '무조건은 아닙니다. 실행력 측면 장점은 있지만, 비용 구조와 권한 배분을 정확히 이해해야 합니다.',
    },
    {
      question: '조합시행이 더 안전한가요?',
      answer:
        '주민 통제력 측면 장점은 있지만, 추진위, 조합설립 등 절차에 위한 기간이 추가되며, 운영 역량이 부족하면 속도는 더 늦어질 수 있습니다. 또한, 주민간의 의견 대립으로 와해되어 조합이 해산할 수 있습니다.',
    },
    {
      question: '조합과 신탁을 나중에 바꿀 수도 있나요?',
      answer:
        '사안별로 다르며, 초기 협약 내용과 동의 절차, 행정 단계에 따라 달라질 수 있어 별도 법률 검토가 필요합니다.',
    },
    {
      question: '재건축 초과이익 환수는 우리도 반드시 내야 하나요?',
      answer:
        '아닙니다. 1인당 평균 초과이익이 면제 기준을 넘는지, 감면·유예 대상인지에 따라 달라집니다.',
    },
    {
      question: '장기보유자는 감면이 되나요?',
      answer:
        '2026년 현재 장기보유 1주택자는 보유기간에 따라 최대 70%까지 감면 가능 구조로 설명하고 있으나, 추후 정부 세법 기준을 검토해야 합니다.',
    },
    {
      question: '고령자는 유예가 가능한가요?',
      answer:
        '60세 이상 1주택자는 일정 요건 충족 시 납부유예 신청이 가능한 구조입니다.',
    },
    {
      question: '초과이익 환수금이 많으면 사업을 접어야 하나요?',
      answer:
        '초과이익이 많다는 것은 사업 운영이 좋다는 것입니다. 재초환은 사업성의 한 변수이며, 전체 수익·비용 구조와 함께 판단해야 합니다.',
    },
    {
      question: '우리는 다 비슷한 평형인데 큰 차이가 날 수 있나요?',
      answer:
        '극단적 차이는 적을 수 있지만, 세부 권리관계와 평가조건에 따라 차이는 발생할 수 있습니다.',
    },
    {
      question: '새 아파트 평형은 지금보다 줄어들 수 있나요?',
      answer:
        '전체토지등소유자의 선택에 따라 가능성은 있으며, 평형 신청 구조와 권리배분 방식에 따라 달라질 수 있습니다.',
    },
    {
      question: '일반분양이 잘되면 주민 부담이 줄어드나요?',
      answer:
        '보통은 그렇지만, 공사비나 금융비용 상승이 동시에 발생하면 상쇄될 수 있습니다.',
    },
    {
      question: '공사비가 오르면 어느 정도 영향이 있나요?',
      answer:
        '민감도 분석으로, 설명회자료에서 공사비 상승 시 추가분담금 범위가 어떻게 달라지는지 확인 하는 것이 좋습니다.',
    },
    {
      question: '동별로 유불리가 생길 수 있나요?',
      answer:
        '통합이라도 위치와 개별 조건 차이로 일부 차이는 생길 수 있습니다.',
    },
    {
      question: '특별정비구역 지정이 되면 바로 사업이 시작되나요?',
      answer:
        '사업은 현재도 진행중이며, 특별정비예정구역에서 지정이 된다면 본격적인 사업의 시작이라 할 수 있습니다. 지정 이후 계획 수립, 협의, 사업시행 관련 후속 절차가 이어집니다.',
    },
    {
      question: '지정 제안서에는 무엇이 들어가나요?',
      answer:
        '최근 안내 기준으로는 제안서 작성 방법, 특별법 및 지침에 따른 제안 내용, 사업계획서 및 향후 추진 일정 등이 핵심입니다.',
    },
    {
      question: '주민대표단은 왜 필요한가요?',
      answer:
        '동의서 접수, 주민설명회 개최, 협약 관련 실무 등 주민 절차를 체계적으로 정리하기 위해 중요합니다.',
    },
    {
      question: '설명회 한 번으로 동의를 바로 받아도 되나요?',
      answer:
        '실무적으로는 전체 설명회 후 서면 질의 회신과 보완자료 배포를 거친 뒤 동의 절차로 가는 편이 안정적입니다.',
    },
    {
      question: '반대 주민이 있으면 사업이 어려워지나요?',
      answer:
        '일부 반대는 자연스럽지만, 정보 부족인지 구조적 이해상충인지 구분해서 대응해야 합니다.',
    },
    {
      question: '지금 가장 먼저 확정해야 할 것은 무엇인가요?',
      answer:
        '사업 방향, 대표 체계, 공식 질의응답 체계, 기본 자료의 통일이 우선입니다.',
    },
    {
      question: '지금 단계에서 가장 위험한 것은 무엇인가요?',
      answer:
        '성남시 분당구 노후계획도시특별법에 준하는 정확한 재건축 사업 내용인지가 되지 않아, 비공식 소문이 공식 자료를 대체하는 것입니다.',
    },
    {
      question: '주민(소유주)간 소통 및 설명은 어떤 형식이 좋나요?',
      answer:
        '요약본, 상세본, Q&A집, 용어설명집으로 나누는 방식이 실무적으로 좋습니다. 우리단지는 홈페이지를 운영중이며, 모든 내용 및 설명회 자료를 확인할 수 있습니다.',
    },
    {
      question: '전체 설명회 뒤에 무엇을 배포해야 하나요?',
      answer:
        '질의응답 정리본, 핵심표, 사업 단계도, 권리·부담 예시표를 배포하는 것이 효과적입니다.',
    },
    {
      question: '개인별 수익이나 부담금을 오늘 확정해 줄 수 있나요?',
      answer:
        '지금은 재건축 정비사업 원칙과 범위 설명 단계이고, 개인별 확정은 후속 평가와 설계가 필요하며, 종후 판단 됩니다. ',
    },
    {
      question: '동의서를 지금 낼 수도 있나요?',
      answer:
        '현재는 특별정비구역 지정 전 주민제안 준비 단계이며 설명회를 통한 주민 협의 후 이견을 모아 사업 방향을 제시한 후 동의를 받는 것이 사업을 추진 하는데 유리 합니다.',
    },
    {
      question: '오늘 설명회 후 주민은 무엇을 결정해야 하나요?',
      answer:
        '통합 재건축 방향에 대한 기본 공감대, 추가 질의 제출, 공식 자료 기준 수용 여부를 우선 정리하시면 됩니다.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">가이드</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">추정분담금</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light"> Q&A</h5>
        </div>
      </nav>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_30%)]" />
        
        
      </section>

      

      

      

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-14 md:py-20">
          <PageSectionHeader
            badge="FAQ 30"
            title="예상질문 30개 FAQ"
            description="설명회 현장에서 반복적으로 나올 가능성이 높은 질문을 미리 정리했습니다. FAQ는 설명회 후 질의응답 정리본과 이어 붙이기 좋고, 공식 답변 기준을 통일하는 데도 유용합니다."
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={`${index + 1}. ${faq.question}`}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>      

      <section className="mx-auto max-w-[1200px] px-6 py-14 md:py-20">
        <PageSectionHeader
          badge="PRACTICAL USE"
          title="실무 적용 포인트"
          description={
          <span className="md:whitespace-nowrap">
          "주민 제안을 위한 다음 단계는 사업 방식 결정 후 전문성 확보를 위해, 외부 협력기관과 사업계획서 및 제안을 협의하여 사업의 안정성을 확보하는 것입니다."
          </span>
          }  
        />

        <div className="grid gap-6 md:grid-cols-3">
          <HighlightPanel
            icon={<Calendar className="h-5 w-5" />}
            title="설명회 후속 일정 연결"
            description="서면 질의 접수, 회신 공지, 동의 일정 등, 2차 설명회 공지, 전자서명법상 공인인증사업자의 본인확인 후 전자동의서 플랫폼 및 온라인 총회 안내"
          />
          <HighlightPanel
            icon={<Handshake className="h-5 w-5" />}
            title="주민 공감대 관리"
            description="질문과 답변을 공개 기준으로 정리하면 공식 자료 중심의 논의 구조를 만드는 데 도움이 됩니다. 개인 권리관계나 민감 사안은 별도 접수 및 문의"
            onClick={handleGoToInquiry}
          />
          <HighlightPanel
            icon={<BadgeCheck className="h-5 w-5" />}
            title="특별정비계획서 초안 작성법"
            description="성남시 특별정비구역 평가 점수 기준 (주민제안 방식), 기존 공모 방식(1차 선도지구)과 달리, 2차 및 3차 일반 특별정비구역 지정(주민제안 방식)"
          />
        </div>
      </section>
    </div>
  );
}

       {/* 1차 간담회 */}
function IntroductionTab() {
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
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">가이드</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">추정분담금</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300"> Q&A</h5>
        </div>
      </nav>

      {/* 분당동 지구단위계획·통합재건축 가이드 */}
      <div className="min-h-screen bg py-30">
      <div className="w-full px-0 py-6">
        {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="w-full max-w-full px-0 py-30 md:max-w-7xl md:mx-auto md:px-6">
          <div className="flex items-center gap-3 mb-4">
            
            <div>
              <h1 className="text-4xl pl-6 md:pl-24 mx-0 mt-[10px] mb-[8px] text-left"> 
                 분당동2 30구역 통합재건축 가이드
              </h1>              
            </div>
              </div>
                <p className="text-2xl pl-8 text-blue-100 ml-0 mt-4 mb-0 md:ml-[65px]">2035 성남시 노후계획도시정비기본계획 / ★고시문
                  <br className="block md:hidden" />
                    <span className="text-xl ">
                <a
                  href="https://joomin829.figma.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-light text-white decoration-yellow-200 underline-offset-4 transition hover:text-red"
                 >
                  (클릭 시 (2035성남시 노후계획도시특별법) 고시문 확인)
                </a>
                  </span>
                    </p>                 
                  </div>
                </header>
   
                        <section className="w-full bg-[#f8fafc] text-slate-900">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-0 py-10 md:gap-24 md:px-8 lg:py-24">
              <div className="overflow-hidden rounded-none md:rounded-[32px] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white shadow-2xl">
                <div className="grid gap-6 px-4 py-8 md:gap-10 md:px-12 md:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                  <div>
                    <div className="mb-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs tracking-[0.18em] text-blue-100">
                      <Sparkles className="h-4 w-4" />
                      BUNDANG-DONG MASTER BRIEF
                    </div>
                    <h2 className="mb-20 max-w-4xl text-3xl leading-tight text-white md:text-5xl md:leading-[1.15]">
                      2035 성남시 노후계획도시특별법과 분당동2 30구역 통합재건축의 쟁점을
                      <br className="hidden md:block" />
                      한 번에 보는 설명 가이드
                    </h2>
                    <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                      분당동 44-1~5, 45~50, 52~56, 60-1~9, 61-1~4, 62-1~2를 중심으로,
                      사업성, 초과이익 환수, 분담금, 사업시행자 지정 신탁 방식, 주민대표단 운영, 
                      20m 도로 처리, 단독주택 편입, 호텔 복합개발 가능성까지 정리한 안내 섹션입니다.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    <QuickStat icon={<MapPin className="h-6 w-6" />} value="31개" label="검토 대상 대지 / (단독주택24필지 제척)" />
                    <QuickStat icon={<Building2 className="h-6 w-6" />} value="2가지" label="핵심 시행방식,  조합·신탁" />
                    <QuickStat icon={<Clock className="h-6 w-6" />} value="주민제안" label="2027년 주민제안" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-4 md:gap-6 md:px-0 lg:grid-cols-3">
                <OverviewCard
                  icon={<TrendingUp className="h-6 w-6" />}
                  title="사업성"
                  items={[
                    '저층 연립주택을 고밀 재건축으로 바꾸면 총 연면적과 일반분양 면적 확대에 따라 사업성이 크게 개선될 수 있습니다.',
                    '다만 용적률 상향만 볼 것이 아니라 공사비, 금융비용, 기부채납, 공공기여, 부담금까지 넣어 순수익으로 판단해야 합니다.',
                    '겉으로 수익이 커 보여도 공공기여 조건에 따라 실제 조합원 체감수익은 달라질 수 있습니다.',
                  ]}
                />
                <OverviewCard
                  icon={<DollarSign className="h-6 w-6" />}
                  title="수익·환수"
                  items={[
                    '노후계획도시 특별법 적용 사업이라고 해서 초과이익 환수 문제가 자동으로 사라지는 것은 아닙니다.',
                    '특별법상의 공공기여와 기존 재건축초과이익 환수 체계를 함께 검토해야 합니다.',
                    '결국 사업성 분석표에는 부담금 가능성과 공공기여 비용이 반드시 들어가야 합니다.',
                  ]}
                />
                <OverviewCard
                  icon={<Home className="h-6 w-6" />}
                  title="권리배분"
                  items={[
                    '조합원이 사업성이 좋다고 해서 새 아파트를 두세 채 자동으로 받는 구조는 아닙니다.',
                    '분양권 수와 정산 방식은 법규, 사업방식, 조합 규약, 관리처분 구조에 따라 제한될 수 있습니다.',
                    '따라서 현금정산, 추가분담금, 분양 배정 방식을 함께 설계해야 합니다.',
                  ]}
                />
              </div>

              <div className="grid gap-4 px-4 md:gap-6 md:px-0 lg:grid-cols-2">
                <ComparisonCard
                  title="조합시행"
                  icon={<Users className="h-6 w-6" />}
                  accent="blue"
                  points={[
                    '조합총회 중심으로 주민 통제력이 강하고 개발이익을 조합원 관점에서 설계하기 좋습니다.',
                    '반대로 의사결정 지연, 내부 갈등, 소송, 운영 피로가 커지면 기간과 총사업비가 함께 늘어날 수 있습니다.',
                    '주민 합의가 강하고 리더십이 안정적인 경우에 더 유리합니다.',
                    '추진위원회 구성 및 조합 설립 기간이 늘어날 수 있으며, 그 기간 동안 사업이 지연되어 와해 될 수 있습니다.',
                  ]}
                />
                <ComparisonCard
                  title="신탁방식"
                  icon={<Handshake className="h-6 w-6" />}
                  accent="emerald"
                  points={[
                    '신탁사가 사업을 집행하고 토지등소유자 대표단과 전체회의가 협의·감시 구조를 갖는 방식입니다.',
                    '신탁보수는 추가되지만 자금관리, 일정관리, 갈등조정 측면에서 분당 통합재건축 같은 복합 사업에 장점이 있을 수 있습니다.',
                    '핵심은 신탁계약서에 대표단의 협의권, 자료열람권, 선정절차 설명의무를 넣는 것입니다.',
                    '사업기간(추진위,조합설립 약1년6개월 이상~)을 단축하여 사업비에서 유리할 수 있습니다. ',
                  ]}
                />
              </div>

              <div className="rounded-none md:rounded-[32px] border border-slate-200 bg-white p-4 md:p-10 shadow-sm">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs tracking-[0.18em] text-blue-700">
                      <FileText className="h-4 w-4" />
                      로드맵 2026–2027
                    </div>
                    <h3 className="text-2xl text-slate-900 md:text-3xl">
                      재건축 추진 프로세스 2027 주민제안 
                      <br/>
                      <a
                  href="https://202709.figma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-light text-sm text-gray underline decoration-yellow-200 underline-offset-4 transition hover:text-red"
                 >
                  (클릭 시 재건축 추진 프로세스 로드맵 2026–2027 이동)
                </a>
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600">
                    재건축추진준비위원회 설립부터 특별정비구역 최종 고시까지
                    <br/>
                    성남시 분당구 30구역 주민제안을 위한 4단계 공식 추진 일정
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-4">
                  <ProcessCard
                    step="STEP 01"
                    title={
                      <>
                        예비사업시행자 
                        <br />(신탁방식) 선정 준비
                      </>
                      }
                    description="노후계획도시정비법령은 2026년 8월 4일부터 주민대표단, 예비사업시행자, 서면·전자 동의서 절차를 정비했고, 
                    주민설명회와 공개모집을 거쳐 예비사업시행자로 지정하거나 특별정비구역 지정을 제안할 때 토지등소유자 과반수 동의를 요구하는 방향을 제도화했다."
                  />
                  <ProcessCard
                    step="STEP 02"
                    title="주민 의견 수립 및 도시계획사업자 선정 준비"
                    description="분당동2 30구역 통합재건축의 2027년 주민제안을 준비하기 위해, 예비사업시행자(신탁사)와 협력하여 추진할 
                    도시계획 사업자(예비설계사) 현상설계 공모의 추진 방향, 과업 범위, 참가 자격, 심사 기준, 산출물 및 운영 절차를 정리하여야 한다."
                  />
                  <ProcessCard
                    step="STEP 03"
                    title="주민공람 및 토지등소유자 동의서 확보"
                    description="주민공람의 목적은 특별정비계획 초안에 대한 주민 의견 수렴, 주요 쟁점 사전 확인, 동의 확보를 위한 정보 제공이다.
                                 공람은 단순 열람이 아니라 의견 접수와 반영 여부 기록까지 포함한다.
                                 모든 공람 자료는 주민이 이해할 수 있도록 요약본 + 도면본 + 질의응답본으로 나누어진다."
                  />
                  <ProcessCard
                    step="STEP 04"
                    title={
                      <>
                        특별정비계획서 작성 
                        <br />주민제안용 정비계획서
                      </>
                      }
                    description="도시계획, 건축, 교통, 환경, 사업성 분석 등의 전문가 용역 계약을 통한 사업성 분석 항목인 종전자산 평가 및 예상 분양가, 
                    공사비 및 금융비용 산정, 초과이익 환수 반영, 공공기여·기부채납 반영 등을 확인하여 주민제안을 진행 한다."
                  />
                </div>
              </div>

              <div className="grid gap-4 px-4 md:gap-6 md:px-0 lg:grid-cols-2">
                <div className="rounded-none md:rounded-[32px] bg-slate-900 p-4 md:p-10 text-white shadow-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs tracking-[0.18em] text-white/80">
                    <Hotel className="h-4 w-4" />
                    MIXED-USE CONCEPT
                  </div>
                  <h3 className="mb-4 text-2xl md:text-3xl">
                    하이퍼엔드 공동주택 + 호텔 + 리조트형 파크도 구상은 가능합니다
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-white/72 md:text-base">
                    다만 현재 도시계획과 용도지역이 그 복합개발을 허용해야 하고,
                    불허 구조라면 도시계획 변경과 상위계획 정합성 검토가 선행되어야 합니다.
                    도시계획상 허용 가능한 용도조합으로 사업계획서를 정리하는 작업이 중요합니다.
                  </p>
                  <div className="space-y-3">
                    {[
                      '호텔동과 주택동의 출입구, 승강기, 주차, 피난 분리 검토',
                      '교통영향, 기반시설 수용성, 공공기여 설계 동시 검토',
                      '아파트 단독형 / 주거복합형 (호텔 포함 복합형)비교',
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/78">
                        <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <ChecklistCard
                    icon={<AlertCircle className="h-6 w-6" />}
                    title="20m 도로"
                    description="공공도로는 원칙적으로 존치되는 경우가 많지만, 대체 기반시설 계획과 함께 도로 변경·편입 가능성을 협의할 수 있습니다."
                  />
                  <ChecklistCard
                    icon={<Building2 className="h-6 w-6" />}
                    title="단독주택 편입"
                    description="단독주택 소유자 참여는 검토 가능하지만 자동 편입은 아니며 구역 범위, 동의율, 권리배분 설계가 필요합니다."
                  />
                  <ChecklistCard
                    icon={<Shield className="h-6 w-6" />}
                    title="주민대표단 운영"
                    description="주민대표단은 대표 1명과 감사를 포함하여 5명 이상 25명 이하로, 토지등소유자의 과반수의 동의를 받아 구성하며, 
                    대통령령으로 정하는 방법 및 절차에 따라 지정권자의 승인을 받아야 한다."
                  />
                  <ChecklistCard
                    icon={<BarChart3 className="h-6 w-6" />}
                    title="사업성 모델링"
                    description="필지별 면적, 기존 연면적, 예상 분양가, 공사비, 공공기여를 넣은 시나리오별 수익 모델을 먼저 만들어야 합니다."
                  />
                </div>
              </div>

              <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-sm md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-700" />
                  <h3 className="text-2xl text-slate-900 md:text-3xl">다음 단계 실무 체크리스트</h3>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  <a
                    href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EB%85%B8%ED%9B%84%EA%B3%84%ED%9A%8D%EB%8F%84%EC%8B%9C%20%EC%A0%95%EB%B9%84%20%EB%B0%8F%20%EC%A7%80%EC%9B%90%EC%97%90%20%EA%B4%80%ED%95%9C%20%ED%8A%B9%EB%B3%84%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9/%EC%82%BC%EB%8B%A8%EB%B9%84%EA%B5%90/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-blue-300"
                  >
                <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                1
                </div>
                  <ArrowRight className="h-5 w-5 text-blue-400" />
                    </div>
                      <h4 className="mb-2 text-lg text-slate-900">도시계획 자료 확보</h4>
                        <p className="text-sm leading-6 text-slate-600">
                          현재 노후계획도시 정비 및 지원에 관한 특별법의 특별정비구역 예상 범위, 용도지역과 기반시설 계획부터 정확히 확인합니다.
                          <span className="mt-2 block text-blue-600">
                            노후계획도시 정비 및 지원에 관한 특별법 확인
                        </span>
                      </p>
                    </a>
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">2</div>
                      <ArrowRight className="h-5 w-5 text-slate-400" />
                    </div>
                    <h4 className="mb-2 text-lg text-slate-900">도시계획 사업자</h4>
                    <p className="text-sm leading-6 text-slate-600">
                      교통, 환경, 재해 등을 포함한 도시계획 마스터플랜을 준비하여 주민들이 이해 할 수 있는 조감도 및 평형을 준비합니다.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">3</div>
                      <ArrowRight className="h-5 w-5 text-amber-400" />
                    </div>
                    <h4 className="mb-2 text-lg text-slate-900">사업성(안) 비교</h4>
                    <p className="text-sm leading-6 text-slate-600">
                      평형별 구성을 통한 수익성·인허가 난도·공공기여 부담을 나눠 비교할 수 있는 사업성을 검토합니다.                      
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="border-t border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
    <div className="mb-8 max-w-3xl">
      <div className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-xs tracking-[0.18em] text-blue-700">
        BUNDANG REBUILD PARTNERS
      </div>
      <h3 className="text-2xl text-slate-900 md:text-3xl">
        분당 주요 재건축 단지별 정비업체·설계사무소
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:whitespace-nowrap">
        공개 기사 기준으로 확인된 협력 구조를 정리했습니다. 공식 홈페이지가 확인된 회사는
        이름을 클릭하면 새 창으로 이동합니다.
      </p>
    </div>

    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500 md:text-sm">
          
        </p>
        <div className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200 md:hidden">
          ← 좌우 스크롤 →
        </div>
      </div>

      <div className="overflow-x-auto overscroll-x-contain">
        <table className="min-w-[1200px] text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="whitespace-nowrap px-5 py-4 text-sm">단지</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">정비업체 / 신탁사</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">설계사무소 / 도시계획</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">비고</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                시범1구역
                <div className="mt-1 text-xs font-normal text-slate-500">(삼성한신·한양)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                <a
                  href="https://www.hanatrust.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  하나자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="http://www.nowarch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  유타엔지니어링, 나우동인
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                2차 특별정비구역 도전 단지
              </td>
            </tr>

            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                시범2구역
                <div className="mt-1 text-xs font-normal text-slate-500">(우성·현대)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                <a
                  href="https://www.kait.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  한국자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                예비신탁사 선정
              </td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                한솔마을 1·2·3단지
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                <a
                  href="https://www.koreit.co.kr/main.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  한국토지신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                신탁방식 추진
              </td>
            </tr>

            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                파크타운
                <div className="mt-1 text-xs font-normal text-slate-500">(대림·롯데·삼익·서안)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="http://www.jnkcity.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  J&amp;K도시정비
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://www.1011.co.kr/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  텐일레븐
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                주민설명회 참석 기준
              </td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                양지마을
                <div className="mt-1 text-xs font-normal text-slate-500">(한양·금호·청구)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://trust.daishin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  대신자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                한국토지신탁 해임 선도지구 추진
              </td>
            </tr>

            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                까치마을 1·2단지 · 하얀마을 5단지
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://www.kyobotrust.co.kr/front/main.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  교보자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                예비신탁사 선정
              </td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                샛별마을
                <div className="mt-1 text-xs font-normal text-slate-500">(동성·라이프·삼부·우방)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                <a
                  href="https://www.hanatrust.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  하나자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                예비사업시행자 승인
              </td>
            </tr>

            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                더 시범
                <div className="mt-1 text-xs font-normal text-slate-500">(현대·우성·장안타운 건영빌라)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                <a
                  href="https://www.kait.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  한국자산신탁
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                예비사업시행자 승인
              </td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                목련마을
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://www.lh.or.kr/main/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  LH
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                예비사업시행자 승인
              </td>
            </tr>

            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                효자촌
                <div className="mt-1 text-xs font-normal text-slate-500">(현대·동아·임광·삼환)</div>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="http://www.shinhanpnc.co.kr/main/main.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  신한피앤씨
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://www.dagroup.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  건화, 디에이그룹엔지니어링
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                주민설명회 보도 기준
              </td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-slate-900">
                무지개마을 10단지 · S8구역
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
                공개 기사 기준 확인 없음
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">                
                <a
                  href="https://www.unstudio.com/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800"
                >
                  유엔스튜디오
                </a>
              </td>
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                통합재건축 추진 기사 기준
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-xs leading-6 text-slate-500 md:text-sm">
          안내: 본 표는 공개 기사 기준으로 확인된 협력업체 현황이며, 실제 계약·선정 상태는 향후
          총회·주민대표단 의결·예비사업시행자 지정 및 변경에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  </div>
</section>    
                          <section className="border-t border-slate-200 bg-slate-50/60">
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-xs tracking-[0.18em] text-red-700">
          SITE REFERENCE DATA
        </div>
        <h3 className="text-2xl text-slate-900 md:text-3xl">
          개별 면적·공시지가 참고자료
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:whitespace-nowrap">
          단지별 개별 면적과 공시지가를 비교할 수 있도록 참고용 표로 정리했습니다. 모바일에서는 표를 좌우로 스크롤 후 확인할 수 있습니다.
        </p>
      </div>

      <div className="inline-flex items-center self-start rounded-full bg-white px-4 py-2 text-xs text-slate-500 ring-1 ring-slate-200 md:self-auto">
        총 31개 단지 기준 참고자료
      </div>
    </div>

    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">총 동수</p>
        <p className="mt-3 text-2xl text-slate-900">31개 단지</p>
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">총 세대수</p>
        <p className="mt-3 text-2xl text-slate-900">381세대</p>
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">총 면적</p>
        <p className="mt-3 text-2xl text-slate-900">80,925.7㎡</p>
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">공시지가 범위</p>
        <p className="mt-3 text-2xl text-slate-900">412.0~501.5</p>
        <p className="mt-1 text-xs text-slate-500">백만원 기준</p>
      </div>
    </div>

    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500 md:text-sm">
          단지명, 세대수, 면적, 공시지가를 한 화면에서 비교할 수 있습니다.
        </p>
        <div className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200 md:hidden">
          ← 좌우 스크롤 →
        </div>
      </div>

      <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <table className="min-w-[1200px] text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="whitespace-nowrap px-5 py-4 text-sm">빌라명</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">세대수</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">면적 (㎡)</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">공시지가 (백만원)</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">번지수</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">동아빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,587.4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">501.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">45</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한성빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,581.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">501.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">46</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">삼성파크빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">16</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,584.4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">468.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">47</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">하나빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,584.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">501.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">48</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">진로빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,587.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">443.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">49</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">청구1차빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">16</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,584.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">429.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">50</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">청구2차빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">16</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,786.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">451.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">52</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">쌍용빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,834.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">501.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">53</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">현대맨션</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,834.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">501.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">54</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">동신빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,556.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">443.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">55</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">벽산빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,786.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">438.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">56</td>
            </tr>

            <tr className="align-top bg-blue-50/50">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">옴니빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">13</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,432.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">420.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">44-1</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한일인텔빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">13</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">3,021.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">420.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">44-2</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">정다운빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,455.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">412.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">44-3</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">화목빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">10</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,137.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">412.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">44-4</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">장원빌리지</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">15</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,049.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">443.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">44-5</td>
            </tr>

            <tr className="align-top bg-amber-50/40">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">글로리빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,742.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">451.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-1</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">보람빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">10</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,766.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">432.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-2</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한울빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,856.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">423.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-3</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한화프레스티지빌라 A</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,639.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">423.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-4</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">공간빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,983.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">423.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-5</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">아름빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,711.4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">432.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-6</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">그룹가빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,915.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">423.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-7</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한화프레스티지빌라 B</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,824.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">423.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-8</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">삼성빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,875.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">420.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">60-9</td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">석류빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,734.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">451.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">61-1</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">한솔빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">12</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,036.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">443.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">61-2</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">그린빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">13</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,334.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">443.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">61-3</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">하나빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">11</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">2,069.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">420.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">61-4</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">가람빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">12</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,870.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">440.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">62-1</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">쌍용예술빌라</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">1,793.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">440.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">62-2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-white px-5 py-4">
        <p className="text-xs leading-6 text-slate-500 md:text-sm">
          안내: 위 수치는 홈페이지 참고자료용 정리값입니다. 동일 명칭이 반복된 항목은 원자료 구분을 위해
          임시로 A/B로 표기했으며, 실제 표기 방식인 지번·동·블록 기준은 추후 정리합니다.
        </p>
      </div>
    </div>
  </div>
</section>

                <section className="border-t border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-xs tracking-[0.18em] text-black-700">
          DETACHED HOUSE REFERENCE
        </div>
        <h3 className="text-2xl text-slate-900 md:text-3xl">
          단독주택 면적·공시지가 참고표
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:whitespace-nowrap">
          단독주택은 현재 특별정비예정구역 제척 중이나, 향후 사업성 검토와 인접 권역 이해를 위한 참고자료입니다.
        </p>
      </div>

      <div className="inline-flex items-center self-start rounded-full bg-rose-50 px-4 py-2 text-xs text-rose-700 ring-1 ring-rose-100 md:self-auto">
        분당동2 30구역 제척 · 제1종일반주거
      </div>
    </div>

    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">총 필지 수</p>
        <p className="mt-3 text-2xl text-slate-900">24개</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">총 면적</p>
        <p className="mt-3 text-2xl text-slate-900">12,324.5㎡</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">공시지가 범위</p>
        <p className="mt-3 text-2xl text-slate-900">489.5~543.9</p>
        <p className="mt-1 text-xs text-slate-500">백만원 기준</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs tracking-[0.18em] text-slate-500">주요 번지 분포</p>
        <p className="mt-3 text-2xl text-slate-900">51-1~9 / 57-1~15</p>
      </div>
    </div>

    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500 md:text-sm">
          단독주택 필지별 면적, 공시지가, 번지수를 함께 비교할 수 있습니다.
        </p>
        <div className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200 md:hidden">
          ← 좌우 스크롤 →
        </div>
      </div>

      <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <table className="min-w-[1200px] text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="whitespace-nowrap px-5 py-4 text-sm">단독주택 번호</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">면적 (㎡)</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">공시지가 (백만원)</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">번지수</th>
              <th className="whitespace-nowrap px-5 py-4 text-sm">비고</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">644.4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">644.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">642.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">642.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">616.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">중대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">617.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">중대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">617.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">533.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">중대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">314.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형·고가지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">310.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">516.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">51-9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형 필지</td>
            </tr>

            <tr className="align-top bg-rose-50/40">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">10</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">310.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형·고가지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">11</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">310.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">516.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">12</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">442.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">489.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">중형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">13</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">179.1</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">505.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-4</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">초소형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">14</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">621.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">15</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">620.5</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">16</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">640.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">17</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">325.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형·고가지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">18</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">318.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">516.7</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">소형 필지</td>
            </tr>

            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">19</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">621.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">506.3</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-10</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">20</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">642.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">505.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-11</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">21</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">644.6</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">505.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-12</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">22</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">644.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">505.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-13</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">23</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">643.0</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">505.8</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-14</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형 필지</td>
            </tr>
            <tr className="align-top bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">24</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">643.2</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">543.9</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">57-15</td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">대형·고가지</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-xs leading-6 text-slate-500 md:text-sm">
          안내: 본 표는 지구단위계획 포함 대상이 아닌 단독주택을 참고용으로 함께 정리한 것입니다.
          실제 계획 반영 여부와 정비사업 편입 가능성은 별도 도시계획 검토와 행정 해석이 필요합니다.
        </p>
      </div>
    </div>
  </div>
</section>

            <section className="border-t border-slate-200 bg-slate-50/60">
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <div className="mb-3 inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-xs tracking-[0.18em] text-violet-700">
          GLOBAL ARCHITECTURE REFERENCE
        </div>
        <h3 className="text-2xl text-slate-900 md:text-3xl">
          분당2 30구역 통합재건축에 어울리는 글로벌 설계사 유형
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
          분당동2 30구역 통합재건축의 방향성에 맞춰 글로벌 설계사를 랜드마크형, 마스터플랜형,
          hospitality형의 3가지 성향으로 정리했습니다.
        </p>
      </div>

      <div className="inline-flex items-center self-start rounded-full bg-white px-4 py-2 text-xs text-slate-500 ring-1 ring-slate-200 md:self-auto">
        방향성에 따라 설계사 선택 전략이 달라집니다
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-3">
      <article className="group rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs tracking-[0.18em] text-white">
            LANDMARK TYPE
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            상징성 중심
          </div>
        </div>

        <h4 className="text-2xl text-slate-900">랜드마크형</h4>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          도시의 스카이라인과 단지 아이덴티티를 강하게 만드는 타입입니다. 분당에서 상징성이 큰
          통합 재건축이나 초고층 복합개발 구상에 가장 어울립니다.
        </p>

        <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
          <p className="text-xs tracking-[0.18em] text-slate-500">추천 설계사</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.unstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              UNStudio
            </a>
            <a
              href="https://www.som.com/expertise/hospitality/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              SOM
            </a>                          
              <a
              href="https://www.kpf.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-slate-200 transition hover:bg-blue-50"
            >
              KPF
            </a>            
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">특징</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              아이코닉한 외관, 고층 타워 구성, 대형 스케일 복합화, 도시 이미지 제고에 강점이 있습니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">분당 적용 포인트</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              서현·정자처럼 상징성이 필요한 축에서 대규모 통합 재건축이나 랜드마크형 주거복합 구상에 적합합니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">어울리는 사업 방식</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              초고층 재건축, 역세권 복합개발, 프리미엄 브랜드 단지, 스카이라인 전략형 사업
            </p>
          </div>
        </div>
      </article>

      <article className="group rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs tracking-[0.18em] text-white">
            MASTERPLAN TYPE
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            배치·도시맥락 중심
          </div>
        </div>

        <h4 className="text-2xl text-slate-900">마스터플랜형</h4>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          건물 한 동의 조형보다 전체 단지 구조, 공원 연결, 보행축, 커뮤니티 배치를 정교하게 다루는 타입입니다.
          기존 도시 조직과 연결이 중요한 재건축에 특히 잘 맞습니다.
        </p>

        <div className="mt-6 rounded-3xl bg-emerald-50/50 p-5 ring-1 ring-emerald-100">
          <p className="text-xs tracking-[0.18em] text-slate-500">추천 설계사</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.sasaki.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-emerald-100 transition hover:bg-emerald-50"
            >
              Sasaki
            </a>
            <a
              href="https://www.gensler.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-emerald-100 transition hover:bg-emerald-50"
            >
              Gensler
            </a>            
              <a
              href="https://www.nbbj.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-emerald-100 transition hover:bg-emerald-50"
            >
              NBBJ
            </a>       
                          
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">특징</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              대지 전체의 흐름, 공공공간, 동선, 녹지, 주민 커뮤니티와 생활권 구조를 균형 있게 설계합니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">분당 적용 포인트</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              조망, 공원, 탄천축, 상권과 연결되는 배치 전략이 중요할 때 가장 설득력이 높습니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">어울리는 사업 방식</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              대단지 통합 재건축, 공원형 단지, 커뮤니티 중심 주거지, 도시정비형 마스터플랜 사업
            </p>
          </div>
        </div>
      </article>

      <article className="group rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex rounded-full bg-amber-500 px-4 py-2 text-xs tracking-[0.18em] text-white">
            HOSPITALITY TYPE
          </div>
          <div className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
            체류형 경험 중심
          </div>
        </div>

        <h4 className="text-2xl text-slate-900">hospitality형</h4>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          호텔과 리조트 설계 경험을 주거에 접목해, 고급 커뮤니티 시설과 체류형 라이프스타일을 강화하는 타입입니다.
          주거+상업+숙박 연계 가능성을 볼 때 유효합니다.
        </p>

        <div className="mt-6 rounded-3xl bg-amber-50/60 p-5 ring-1 ring-amber-100">
          <p className="text-xs tracking-[0.18em] text-slate-500">추천 설계사</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.watg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-amber-100 transition hover:bg-amber-50"
            >
              WATG
            </a>
            <a
              href="https://www.hksinc.com/what-we-do/practices/hospitality/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-amber-100 transition hover:bg-amber-50"
            >
              HKS
            </a>            
              <a
              href="https://www.benoy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-2 text-sm text-blue-700 ring-1 ring-amber-100 transition hover:bg-amber-50"
            >
              Benoy
            </a>            
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">특징</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              호텔식 로비, 웰니스, 리조트형 조경, branded residence, 체험형 공용공간 설계에 강합니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">분당 적용 포인트</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              고급 주거단지의 커뮤니티 수준을 높이거나, 일부 구역을 체류형 복합개발로 특화할 때 차별화 요소가 됩니다.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-slate-500">어울리는 사업 방식</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              고급 주거복합, 리조트형 커뮤니티, 호텔 연계 개발, 브랜드 레지던스 전략형 사업
            </p>
          </div>
        </div>
      </article>
    </div>

    <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="max-w-4xl">
          <p className="text-sm font-medium text-slate-900">분당2 30구역 통합재건축에서의 해석</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            랜드마크형은 상징성과 스카이라인 강화에 유리하고, 마스터플랜형은 대단지 통합과 도시맥락 정리에 강하며,
            hospitality형은 고급화와 체류형 라이프스타일 차별화에 강점이 있습니다. 마스터플랜 위에 랜드마크성과 hospitality 요소를 얹는 방식도 가능합니다.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500 ring-1 ring-slate-200">
          추천 조합<br />
          마스터플랜형 + 랜드마크형,<br />
          마스터플랜형 + hospitality형
        </div>
      </div>
    </div>
  </div>
</section>
                          
          </section>
        </div>
      </div>
    </div>
  );
}

export default KirochadaBrand;
    
