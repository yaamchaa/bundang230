import { useState, useEffect, useRef } from 'react';
import brandBg from '../../assets/images/main-13.jpg';
import agreeImage from '../../assets/images/agree.jpg';

type ConsentInfo = {
  badge: string;
  title: string;
  description: string;
  link: string;
};

type StepRow = {
  step: string;
  title: string;
  meeting: string;
  consent: ConsentInfo | null;
};

type OnlineMeetingChecklistSection = {
  title: string;
  items: string[];
};

const stepRows: StepRow[] = [
  {
    step: '1. 준비위원회 구성',
    title: '주민설명회 / 법적 동의보다 자발적 참여가 중심',
    meeting: '',
    consent: {
      badge: '전자동의서',
      title: '재건축추진준비위원회 구성 동의서',
      description:
        '사업추진 단계로, 분위기 형성과 참여 의사가 중요합니다.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '2. 주민설명회',
    title: '사업 추진 계획 / 추진방식 선택(조합 vs 신탁)',
    meeting: '',
    consent: '',      
  },
  {
    step: '3. 특별정비계획 제안',
    title: '도시계획사업자 / 특별정비계획 기본안 수립',
    meeting: '주민제안을 위한 첫발',
    consent: {
      badge: '전자동의서',
      title: '주민대표단 신청동의서',
      description:
        '토지등소유자 동의가 부족하면 행정 절차인 특별정비구역 신청 동의가 어렵습니다.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '4. 예비사업시행자 선정',
    title: '민간방식 사업시행자(신탁사)',
    meeting: '예비사업시행자MOU',
    consent: {
      badge: '전자동의서',
      title: '주민제안 동의서',
      description:
        '사업을 성공하기 위해 필요한 사업비를 결정할 수 있는 중요한 일정중 하나입니다.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '5. 주민제안',
    title: '사업대상·요건 확인 / 사업계획서 작성',
    meeting: '총회 vs 주민대표단',
    consent: {
      badge: '전자동의서',
      title: '주민제안 동의서',
      description:
        '주민제안을 위한 주요 내용, 사업 개요, 토지드소유자 권리와 의무를 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '6. 특별정비구역 지정',
    title: '사업시행자 확인(신탁사), 정관 및 사업시행계획서 작성',
    meeting: '총회 vs 주민대표단',
    consent: {
      badge: '전자동의서',
      title: '사업시행자 동의서',
      description:
        '사업의 주체를 결정하는 중요한 일정으로 주요 내용, 정관, 토지등소유자 권리와 의무를 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '7. 설계사 선정',
    title: '설계안, 배치, 세대수 등 주요 방향에 대한 주민설명',
    meeting: '설계사 현상공모 설명회',    
    consent: {
      badge: '전자동의서',
      title: '시공사 선정 동의서',
      description:
        '30구역의 미래를 결할 중요한 단계인 만큼 주요 내용을 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },    
  },
  {
    step: '8. 시공사 선정',
    title: '시공사 선정 총회 / 대표단 협의 후 주민 동의 또는 추인',
    meeting: '시공사 선정 총회',
    consent: {
      badge: '전자동의서',
      title: '시공사 선정 동의서',
      description:
        '공사비와 품질, 공기와 직결된 주요 내용을 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '9. 사업시행계획',
    title: '사업시행계획 수립·인가',
    meeting: '사업시행계획 총회',
    consent: {
      badge: '전자동의서',
      title: '사업시행계획 동의서',
      description:
        '배치, 용적률, 공공기여가 결정에 대한 주요 내용을 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '10. 관리처분계획',
    title: '관리처분계획 수립·인가',
    meeting: '관리처분계획 총회',
    consent: {
      badge: '전자동의서',
      title: '관리처분계획 동의서',
      description:
        '관리처분계획, 평형배정, 추가분담금, 권리배분 의결에 대한 주요 내용을 확인한 뒤 동의해 주세요.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '11. 이주',
    title: '이주·철거 및 공사 준비 / 시공사·이주대행업체',
    meeting: '',
    consent: {
      badge: '전자동의서',
      title: '이주 실행 동의서',
      description:
        '이주 계획, 이주비, 일정에 대한 주민 안내가 필요한 동의입니다.',
      link: 'https://www.modusign.co.kr/',
    },
  },
  {
    step: '12. 철거·착공',
    title: '철거 및 착공 / 시공사',
    meeting: '',
    consent: null,
  },
  {
    step: '13. 준공·입주',
    title: '청산 및 조합 해산 / 준공 / 입주',
    meeting: '해산총회',
    consent: null,
  },
];

const onlineMeetingChecklist: OnlineMeetingChecklistSection[] = [
  {
    title: '정관 및 내부 절차 확인',
    items: [
      '정관에 전자투표·온라인 총회 관련 근거가 있는지 확인',
      '정비사업위원회·임원회의 사전 의결 필요 여부 검토',
      '온라인으로 진행 가능한 안건과 현장 의결 안건 구분',
    ],
  },
  {
    title: '토지등소유자 명부 정리',
    items: [
      '토지등소유자 성명, 연락처, 주소, 동·호수 최신화',
      '공유자·대표자·대리인 여부 확인',
      '휴대전화 번호 누락 및 중복 데이터 점검',
    ],
  },
  {
    title: '본인인증 및 접속 준비',
    items: [
      '휴대폰 인증, 문자 인증 등 본인확인 방식 확정',
      '중복 접속·중복 투표 방지 절차 마련',
      '고령 토지등소유자를 위한 접속 안내와 지원 담당자 지정',
    ],
  },
  {
    title: '플랫폼 및 장비 준비',
    items: [
      '온라인 총회 플랫폼 또는 운영업체 선정',
      '영상 송출, 음성, 질의응답, 전자투표 기능 점검',
      '예비 노트북, 마이크, 인터넷 회선 등 비상 장비 준비',
    ],
  },
  {
    title: '출석·투표·기록 관리',
    items: [
      '현장 참석자와 온라인 참석자 구분 기준 확정',
      '출석 인정 시간, 투표 가능 시간, 재접속 기준 설정',
      '투표 결과, 접속 기록, 총회 녹화본 보관 체계 마련',
    ],
  },
  {
    title: '사전 안내 및 리허설',
    items: [
      '총회 일정, 접속 주소, 참여 방법을 사전 공지',
      '토지등소유자용 간단 안내문과 문의처 제공',
      '총회 전 리허설 또는 모의 접속 테스트 진행',
    ],
  },
];

export function ContactAgree() {
  const [activeTab, setActiveTab] = useState('Agree');
  const [selectedConsent, setSelectedConsent] = useState<ConsentInfo | null>(null);
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
    <>
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
            <h2 className="text-white text-[38px] font-light leading-[42px]">전자 동의서</h2>
          </div>
        </section>

        {/* Sub Content */}
        <div ref={tabSectionRef} className="relative z-10 bg-white">
          <div
            ref={tabSentinelRef}
            className="absolute top-0 left-0 w-full h-px pointer-events-none"
          />

          {/* Tab Header */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex font-light gap-16 pt-8">
                <button
                  onClick={() => handleTabChange('Agree')}
                  className={`pb-6 text-lg transition-colors relative ${
                    activeTab === 'Agree' ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  동의해 주세요.
                  {activeTab === 'Agree' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'Agree' && (
            <AgreeTab onOpenConsent={(consent) => setSelectedConsent(consent)} />
          )}
        </div>
      </div>

      {selectedConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-[560px] rounded-2xl bg-white p-6 md:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">조합원 동의 안내</p>
                <h4 className="text-xl font-light text-black">{selectedConsent.title}</h4>
              </div>

              <button
                type="button"
                onClick={() => setSelectedConsent(null)}
                className="text-gray-400 hover:text-black text-2xl leading-none"
                aria-label="팝업 닫기"
              >
                ×
              </button>
            </div>

            <div className="mt-5">
              <p className="text-sm md:text-base leading-7 text-gray-600">
                {selectedConsent.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedConsent(null)}
                className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>

              <a
                href={selectedConsent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg bg-black text-white text-center hover:bg-black/85 transition-colors"
              >
                확인 후 모두싸인 이동
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AgreeTab({
  onOpenConsent,
}: {
  onOpenConsent: (consent: ConsentInfo) => void;
}) {
  return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center justify-end gap-2 text-xs">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">함께해요</span>
          <span className="text-gray-300">/</span>
          <h5 className="font-light text-gray-600">동의해 주세요</h5>
        </div>
      </nav>

      {/* 동의해 주세요 Section */}
      <article className="relative pt-[120px]">
        <div className="absolute inset-x-0 top-[140px] -z-10 h-[280px] bg-gray-50" />
        <div className="max-w-[1200px] mx-auto px-0 md:px-12">
          <div className="flex flex-col gap-18 md:flex-row md:gap-11">
            <figure className="h-[246px] w-full flex-shrink-0 overflow-hidden bg-gray-200 md:w-[400px]">
              <img
                src={agreeImage}
                alt="동의해 주세요"
                className="h-full w-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[55px]">
              <header className="mb-[6px]">
                <p className="mb-10 text-base font-light text-gray-400">
                  단계별 동의서를 안내 합니다.
                </p>
                <h3 className="text-[30px] font-light leading-[42px]">전자 동의서</h3>
              </header>

              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  초기 사업 단계인 정비업체 지정부터 설계, 시공, 사업시행계획인가 등
                  <br className="hidden md:block" />
                  재건축 정비사업의 모든 분야에 걸쳐 청산 및 조합 해산, 준공 입주후
                  <br className="hidden md:block" />
                  하자 이행(A/S)까지 단계별 안내를 받을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 단계별 동의서 안내 Table */}
      <div className="max-w-[1200px] mx-auto px-6 pt-[130px]">
        <h3 className="mb-6 text-xl font-light md:mb-8 md:text-2xl">단계별 동의서 안내</h3>

        <div className="-mx-6 overflow-x-auto px-6">
          <table className="min-w-[980px] w-full border-t-2 border-black">
            <thead>
    <tr className="border-b border-gray-200">
      <th className="whitespace-nowrap bg-gray-50 px-4 py-4 text-left font-light md:px-6 md:py-6">
        차수
      </th>
      <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
        추진 단계
      </th>
      <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
        총회
      </th>
      <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
        조합원 동의
      </th>
    </tr>
  </thead>

            <tbody className="text-sm md:text-base">
              {stepRows.map((row) => (
                <tr key={row.step} className="border-b border-gray-200">
                  <td className="bg-gray-50 px-4 py-4 font-light md:px-6 md:py-6">
                    {row.step}
                  </td>

                  <td className="px-4 py-4 font-light md:px-6 md:py-6">{row.title}</td>

                  <td className="px-4 py-4 font-light md:px-6 md:py-6">
                    {row.meeting ? (
                      <span className="inline-flex items-center rounded-full bg-black px-10 py-1.5 text-xs text-white md:text-sm">
                        {row.meeting}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  <td className="px-4 py-4 md:px-6 md:py-6">
                    {row.consent ? (
                      <button
                        type="button"
                        onClick={() => onOpenConsent(row.consent!)}
                        className="inline-flex items-center rounded-full bg-yellow-300 px-10 py-1.5 text-xs text-gray-600 transition-colors hover:bg-green-700 hover:text-white md:text-sm"
                      >
                        {row.consent.badge}
                      </button>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 온라인 총회 준비 체크리스트 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-[90px]">
        <div className="border-t border-gray-200 pt-10 md:pt-12">
          <header className="mb-8 md:mb-10">
            <p className="mb-3 text-sm font-light text-gray-400">Online Meeting Checklist</p>
            <p className="mb-3 text-sm font-light text-red-700">(※ 별도신청)</p>
            <h3 className="mb-4 text-xl font-light md:text-2xl">
              온라인 총회 준비를 위한 체크리스트
            </h3>
            <p className="text-sm font-light leading-7 text-gray-600 md:text-base">
              온라인 총회는 단순 영상 송출이 아니라, 조합원 본인확인, 출석 인정,
              전자투표, 기록 보관, 사전 안내까지 함께 준비해야 안정적으로 운영할 수
              있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {onlineMeetingChecklist.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-gray-200 bg-white px-5 py-5 md:px-6 md:py-6"
              >
                <h4 className="mb-4 text-base font-light text-black md:text-lg">
                  {section.title}
                </h4>

                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.title}-${index}`}
                      className="flex items-start gap-3 text-sm font-light leading-6 text-gray-600 md:text-base"
                    >
                      <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}