import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import brandBg from '../../assets/images/main-8.jpg';
import { supabase } from '../../lib/supabase';

type ChecklistState = {
  checked: boolean;
  note: string;
};

type RowItem = {
  category: string;
  question: string;
};

export function KirochadaGallery() {
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
          <h2 className="text-white text-[38px] font-light leading-[42px]">예비사업시행자선정</h2>
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
                onClick={() => handleTabChange('feature')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'feature' ? 'text-black' : 'text-gray-400'
                }`}
              >
                정비업체선정
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
                주민대표단                 
                {activeTab === 'inside' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('outside')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'outside' ? 'text-black' : 'text-gray-400'
                }`}
              >
                예비사업시행자                 
                {activeTab === 'outside' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'feature' && <FeatureTab />}
        {activeTab === 'inside' && <InsideTab />}
        {activeTab === 'outside' && <OutsideTab />}
      </div>
    </div>
  );
}

function FeatureTab() {
  const pageKey = 'kirochada-feature-checklist';
  
  const checklistItems = [
    {
      title: '정비업체란 무엇인가',
      body: '정비사업전문관리업자는 조합설립 동의, 사업성 검토, 사업시행계획 작성 지원, 설계자·시공자 선정 지원, 관리처분계획 수립 지원 등의 업무를 담당하는 등록업체입니다.',
    },
    {
      title: '조합형에서 중요한 이유',
      body: '조합형은 총회, 대의원회, 주민설명회, 조합설립인가, 사업시행계획, 관리처분계획 등 주민 의사결정이 많아 정비업체의 일정관리와 문서작성 능력이 매우 중요합니다.',
    },
    {
      title: '신탁형에서 중요한 이유',
      body: '신탁형은 대표단과 신탁사 사이의 협의, 설계·시공사 선정 지원, 문서화, 쟁점 정리가 중요하므로 계약관리와 협상 지원 능력이 강한 업체가 유리합니다.',
    },
    {
      title: '선정 시 반드시 볼 것',
      body: '실적, 전담 인력, 행정협의 능력, 주민설명 자료 품질, 추가비용 조건, 해지 조건, 이해충돌 여부를 함께 확인해야 합니다.',
    },
  ];

  const scoreRows = [
    {
      item: '사업이해도 및 제안 적합성',
      score: '15점',
      standard: '사업지 특성, 구역 구조, 추진 방식에 대한 이해',
      point: '분당동 대상지 구조 이해, 결합구역 이해, 사업흐름 파악 여부',
    },
    {
      item: '유사사업 실적',
      score: '15점',
      standard: '재건축·재개발·대규모 정비사업 수행경험',
      point: '유사 규모 사업 수행 건수, 최근 3년 실적, 완료 실적',
    },
    {
      item: '인허가 및 행정대응 능력',
      score: '15점',
      standard: '지자체·심의·인허가 자료 작성 및 협의 능력',
      point: '정비계획, 심의자료, 보완요청 대응 능력',
    },
    {
      item: '주민설명 및 총회 대응',
      score: '10점',
      standard: '설명회, 총회자료, 질의응답 대응 수준',
      point: '자료 작성력, 설명 능력, 민감 쟁점 정리 능력',
    },
    {
      item: '사업관리 체계',
      score: '10점',
      standard: '일정관리, 회의체 운영, 문서관리',
      point: '회의록, 일정표, 공문관리, 이슈관리 체계',
    },
    {
      item: '협업 및 커뮤니케이션',
      score: '10점',
      standard: '조합·대표단·신탁사·설계사·시공사와의 협업능력',
      point: '의사소통 속도, 보고체계, 갈등조정 능력',
    },
    {
      item: '계약조건 및 비용 적정성',
      score: '10점',
      standard: '용역비, 추가비용, 업무범위의 합리성',
      point: '기본용역 범위, 별도비용 항목, 해지 조건',
    },
    {
      item: '인력 및 조직 역량',
      score: '8점',
      standard: '전담인력, 기술인력, 책임자 구성',
      point: '실제 투입 인력, 상주 여부, 책임자 경력',
    },
    {
      item: '리스크 관리 능력',
      score: '4점',
      standard: '분쟁, 민원, 일정지연 대응',
      point: '민원 대응, 소송 대비, 일정지연 방지',
    },
    {
      item: '윤리성 및 신뢰도',
      score: '3점',
      standard: '금품제공, 불공정 영업, 이해충돌 여부',
      point: '법 위반 이력, 수상한 접촉, 이해관계 충돌',
    },
  ];

  const compareRows = [
    {
      type: '조합형',
      focus: '총회·대의원회·주민설명회 대응력',
      strong: '총회자료 작성, 주민 설득, 인허가 일정관리',
      risk: '총회 운영이 약하거나 추가비용 조항이 많은 업체',
    },
    {
      type: '신탁형',
      focus: '주민대표단·신탁사 협의 및 계약관리',
      strong: '협의안 작성, 쟁점정리, 설계·시공사 선정 지원',
      risk: '신탁사 편의만 앞세우고 주민 측 쟁점 정리가 약한 업체',
    },
  ];

  const commonQuestions: RowItem[] = [
    { category: '1.실적', question: '우리 사업과 비슷한 규모의 재건축·재개발 실적이 몇 건 있습니까?' },
    { category: '2.실적', question: '최근 3년간 완료한 사업 중 가장 유사한 사례는 무엇입니까?' },
    { category: '3.실적', question: '필지 수가 많고 이해관계가 복잡한 사업 경험이 있습니까?' },
    { category: '4.인력', question: '실제 투입될 전담 인력은 몇 명이며, 책임자는 누구입니까?' },
    { category: '5.인력', question: '현장 상주 또는 정기 방문 체계가 있습니까?' },
    { category: '6.자료작성', question: '회의 자료, 총회 자료, 설명회 자료는 누가 직접 작성합니까?' },
    { category: '7.자료작성', question: '정비계획·사업시행계획·관리처분계획 자료 작성 경험이 있습니까?' },
    { category: '8.주민소통', question: '주민설명회는 몇 회까지 지원 가능하며, 어떤 방식으로 진행합니까?' },
    { category: '9.주민소통', question: '반대 의견이나 민원 발생 시 대응 체계가 있습니까?' },
    { category: '10.행정대응', question: '인허가 보완요청이 들어왔을 때 평균 대응 기간은 어느 정도입니까?' },
    { category: '11.행정대응', question: '성남시 또는 서울시와의 협의 경험이 있습니까?' },
    { category: '12.업무범위', question: '정비계획, 사업시행계획, 관리처분계획 지원 범위는 어디까지입니까?' },
    { category: '13.업무범위', question: '설계사·시공사 선정 과정에서 어떤 역할을 합니까?' },
    { category: '14.입찰관리', question: '입찰공고, 현장설명회, 질의회신, 비교평가를 어떻게 관리합니까?' },
    { category: '15.비용', question: '기본 용역비에 포함되는 업무와 제외되는 업무는 무엇입니까?' },
    { category: '16.비용', question: '추가비용이 발생하는 항목은 무엇입니까?' },
    { category: '17.계약', question: '계약 해지 시 자료 인수인계는 어떻게 보장합니까?' },
    { category: '18.계약', question: '사업 지연이 발생했을 때 책임과 대응 체계는 어떻게 됩니까?' },
    { category: '19.이해충돌', question: '다른 조합이나 신탁사와 이해충돌이 생길 가능성은 없습니까?' },
    { category: '20.문서화', question: '회의록, 공문, 검토보고서 등 문서화 수준은 어느 정도입니까?' },
  ];

  const associationQuestions: RowItem[] = [
    { category: '1.조합형', question: '조합설립총회 자료를 직접 작성해 본 경험이 있습니까?' },
    { category: '2.조합형', question: '대의원회 안건 정리와 총회 의결사항 관리 경험이 있습니까?' },
    { category: '3.조합형', question: '조합원 동의서 징구와 서류검수는 어떻게 합니까?' },
    { category: '4.조합형', question: '관리처분계획 설명회 자료와 권리산정 자료를 누가 만듭니까?' },
    { category: '5.조합형', question: '총회에서 예상되는 반대 쟁점은 어떻게 정리합니까?' },
  ];

  const trustQuestions: RowItem[] = [
    { category: '1.신탁형', question: '신탁사와 함께 일한 사업 경험이 있습니까?' },
    { category: '2.신탁형', question: '주민대표단 회의자료와 쟁점정리안 작성 경험이 있습니까?' },
    { category: '3.신탁형', question: '신탁계약 조건 협의에 어느 정도까지 관여합니까?' },
    { category: '4.신탁형', question: '설계사·시공사 선정 시 대표단과 신탁사 사이 조율 경험이 있습니까?' },
    { category: '5.신탁형', question: '권리배분, 관리처분, 이주 일정 협의 문서를 어떻게 정리합니까?' },
  ];

  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [notesMap, setNotesMap] = useState<Record<string, ChecklistState>>({});
  const [loadingChecklist, setLoadingChecklist] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState('관리자만 체크 및 메모 입력이 가능합니다.');

  const allRows = useMemo(() => {
    const normalize = (section: string, rows: RowItem[]) =>
      rows.map((row, index) => ({
        ...row,
        section,
        rowKey: `${section}-${index}`,
      }));

    return [
      ...normalize('common', commonQuestions),
      ...normalize('association', associationQuestions),
      ...normalize('trust', trustQuestions),
    ];
  }, []);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const admin = !!user?.email?.endsWith('@admin.local');
      setIsAdmin(admin);
      setAuthReady(true);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const admin = !!user?.email?.endsWith('@admin.local');
      setIsAdmin(admin);
      setAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchChecklist = async () => {
      setLoadingChecklist(true);

      const { data, error } = await supabase
        .from('meeting_checklist_notes')
        .select('section_key,row_key,checked,note')
        .eq('page_key', pageKey);

      if (!error && data) {
        const nextMap: Record<string, ChecklistState> = {};

        data.forEach((item: any) => {
          nextMap[item.row_key] = {
            checked: !!item.checked,
            note: item.note ?? '',
          };
        });

        setNotesMap(nextMap);
      }

      setLoadingChecklist(false);
    };

    fetchChecklist();
  }, []);

  const handleChecklistChange = async (
    rowKey: string,
    sectionKey: string,
    nextValue: Partial<ChecklistState>
  ) => {
    if (!isAdmin) return;

    const current = notesMap[rowKey] ?? { checked: false, note: '' };
    const updated = { ...current, ...nextValue };

    setNotesMap((prev) => ({
      ...prev,
      [rowKey]: updated,
    }));

    setSavingKey(rowKey);
    setSaveMessage('임시저장 중...');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('meeting_checklist_notes').upsert(
      {
        page_key: pageKey,
        section_key: sectionKey,
        row_key: rowKey,
        checked: updated.checked,
        note: updated.note,
        updated_by: user?.id ?? null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'page_key,section_key,row_key',
      }
    );

    if (error) {
      setSaveMessage('저장에 실패했습니다. 다시 시도해 주세요.');
    } else {
      setSaveMessage('임시저장되었습니다.');
    }

    setSavingKey(null);
  };

  const renderChecklistTable = (
    title: string,
    subtitle: string,
    sectionKey: string,
    rows: RowItem[]
  ) => (
    <div>
      <div className="mb-5">
        <p className="text-sm text-gray-400 mb-2">{subtitle}</p>
        <h5 className="text-[24px] leading-8 font-light">{title}</h5>
      </div>

      <div className="overflow-x-auto border-t border-gray-200">
        <table className="table-auto w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap bg-gray-50 px-4 py-4 text-left font-light md:px-6 md:py-6">
                구분
              </th>
              <th className="px-4 py-4 text-left font-light md:px-6 md:py-6">
                질문
              </th>
              <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                체크
              </th>
              <th className="px-4 py-4 text-left font-light md:px-6 md:py-6">
                메모
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const rowKey = `${sectionKey}-${index}`;
              const state = notesMap[rowKey] ?? { checked: false, note: '' };
              const isSaving = savingKey === rowKey;

              return (
                <tr key={rowKey} className="border-b border-gray-100 last:border-b-0">
                  <td className="whitespace-nowrap bg-gray-50 px-4 py-5 text-sm text-gray-900 md:px-6">
                    {row.category}
                  </td>
                  <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">
                    {row.question}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-900 md:px-6 align-top">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.checked}
                        disabled={!isAdmin}
                        onChange={(e) =>
                          handleChecklistChange(rowKey, sectionKey, {
                            checked: e.target.checked,
                          })
                        }
                        className="h-4 w-4 accent-black disabled:cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-400">
                        {isSaving ? '저장 중' : state.checked ? '체크됨' : '미체크'}
                      </span>
                    </label>
                  </td>
                  <td className="px-4 py-5 md:px-6">
                    <textarea
                      value={state.note}
                      disabled={!isAdmin}
                      onChange={(e) =>
                        setNotesMap((prev) => ({
                          ...prev,
                          [rowKey]: {
                            checked: state.checked,
                            note: e.target.value,
                          },
                        }))
                      }
                      onBlur={(e) =>
                        handleChecklistChange(rowKey, sectionKey, {
                          note: e.target.value,
                        })
                      }
                      placeholder={
                        isAdmin ? '메모를 입력하세요' : '관리자만 메모를 입력할 수 있습니다'
                      }
                      rows={3}
                      className="w-full min-w-[240px] resize-y border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-black disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">정비업체선정</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">주민대표단</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300">예비사업시행자</h5>
        </div>
      </nav>

      <section className="max-w-[1200px] mx-auto px-6">
        <div className="border-t border-black pt-10 pb-14">
          <p className="text-sm text-gray-400 mb-3">Maintenance Company Guide</p>
          <h3 className="text-[34px] leading-[42px] font-light tracking-[-0.02em] max-w-[1000px]">
            주민 제안 방식 / 정비업체 선정
            <p className="text-sm font-light text-gray-500 mb-2">
              성남시 1차 선도지구는 공모 방식이었으면 2차 특별정비구역 지정은 주민 제안 방식으로 변경 되었으므로 어떤 제안을 할 수 있는지가 중요한 사항입니다.</p>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 border-t border-gray-200 py-12">
          {checklistItems.map((item) => (
            <div key={item.title} className="border-b border-gray-100 pb-8">
              <h4 className="text-[22px] leading-8 font-light mb-3">{item.title}</h4>
              <p className="text-[15px] leading-7 text-gray-600 font-light">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="pt-10">
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-3">Type Comparison</p>
            <h4 className="text-[30px] leading-[38px] font-light">조합형 vs 신탁형 체크포인트</h4>
          </div>

          <div className="overflow-x-auto border-t border-gray-200">
            <table className="table-auto w-full min-w-[960px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="whitespace-nowrap bg-gray-50 px-4 py-4 text-left font-light md:px-6 md:py-6">
                    방식
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    핵심 판단 기준
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    강점으로 봐야 할 부분
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    위험 신호
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, index) => (
                  <tr key={row.type} className={index !== compareRows.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="whitespace-nowrap bg-gray-50 px-4 py-5 text-sm text-gray-900 md:px-6">
                      {row.type}
                    </td>
                    <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">{row.focus}</td>
                    <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">{row.strong}</td>
                    <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-20">
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-3">Evaluation Sheet</p>
            <h4 className="text-[30px] leading-[38px] font-light">정비업체 선정 평가표 (100점 만점)</h4>
          </div>

          <div className="overflow-x-auto border-t border-gray-200">
            <table className="table-auto w-full min-w-[1180px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="whitespace-nowrap bg-gray-50 px-4 py-4 text-left font-light md:px-6 md:py-6">
                    평가항목
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    배점
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    평가기준
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-light md:px-6 md:py-6">
                    점검포인트
                  </th>
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((row, index) => (
                  <tr key={row.item} className={index !== scoreRows.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="whitespace-nowrap bg-gray-50 px-4 py-5 text-sm text-gray-900 md:px-6">
                      {row.item}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-900 md:px-6">
                      {row.score}
                    </td>
                    <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">
                      {row.standard}
                    </td>
                    <td className="px-4 py-5 text-sm leading-7 text-gray-600 md:px-6">
                      {row.point}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-5 text-sm text-gray-900 md:px-6">합계</td>
                  <td className="px-4 py-5 text-sm text-gray-900 md:px-6">100점</td>
                  <td className="px-4 py-5 text-sm text-gray-600 md:px-6" colSpan={2}>
                    실적, 행정대응, 총회/대표단 대응, 계약조건, 인력구성, 윤리성까지 종합평가
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
  <div className="space-y-30">
    <p className="text-sm text-gray-400">Project Brief</p>
    <h3 className="text-[26px] leading-[34px] font-light text-gray-900 mb-2">
      분당동2 30구역 31단지 통합재건축 맞춤 전략
    </h3>
    <p className="text-[15px] leading-7 text-gray-600 max-w-4xl">
      분당동2 30구역 31단지 통합재건축은 성남시 노후계획도시특별법 체계에 맞춰
      정비계획 수립과 인허가 확보가 핵심인 구역입니다. 최근 2026년 7월 성남시 2차
      특별정비구역 지침과 노후계획도시특별법 인허가 조건에 맞춘 정비업체 선정과 동의서 징구
      전략이 중요합니다.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-medium text-gray-500 mb-2">핵심 방향</p>
      <p className="text-[15px] leading-7 text-gray-700">
        최근 분당 재건축 시장은 단순 정비업체 컨설팅을 넘어 신탁방식(사업시행자 지정)
        또는 대형 정비업체의 특별법 전문 컨설팅이 주류를 이루고 있습니다.
        연립주택 특유의 대지지분과 낮은 용적률을 풀어낼 수 있는 역량이 중요합니다.
      </p>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-medium text-gray-500 mb-2">추천 정비사 / 신탁사</p>
      <ul className="space-y-2 text-[15px] leading-7 text-gray-700">
        <li>
          <span className="font-medium text-gray-900">대신자산신탁</span>:
          시범2구역 통합재건축과 MOU를 체결한 선두 주자.
        </li>
        <li>
          <span className="font-medium text-gray-900">하나자산신탁</span>:
          분당 샛별마을 31구역·분당동 5구역(S4) 사업시행자 고시 완료.
        </li>
        <li>
          <span className="font-medium text-gray-900">㈜정림컨설팅 / ㈜제이앤케이도시정비</span>:
          특별정비계획서 초안과 행정 자문에 강한 정비사업전문관리업체.
        </li>
      </ul>
    </div>
  </div>

  <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
    <div className="px-5 pt-5 pb-3 border-b border-gray-200">
      <p className="text-sm text-gray-400 mb-2">Checklist</p>
      <h4 className="text-[22px] leading-[30px] font-light text-gray-900">
        정비업체 업체별 비교표
      </h4>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">구분</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">회사명</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">재건축·정비 실적</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">주민설명회 </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">행정협의·자료</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">추가비용·계약</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 md:px-6">비고</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
  {[
    {
      no: 1,
      name: "동해종합기술공사",
      url: "http://www.dh2002.co.kr/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 2,
      name: "한국씨엠개발",
      url: "http://kcmd.co.kr/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 3,
      name: "엘림토피아",
      url: "http://www.elimtopia.com/kor/main/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 4,
      name: "동우씨앤디",
      url: "https://dongwoocnd.co.kr/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 5,
      name: "정림컨설팅",
      url: "https://jlct.co.kr/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 6,
      name: "제이앤케이도시정비",
      url: "http://www.jnkcity.com/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 7,
      name: "지코피앤씨",
      url: "http://www.zicopnc.com/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 8,
      name: "신한P&C",
      url: "http://www.shinhanpnc.co.kr/main/main.php",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 9,
      name: "더원씨앤씨",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 10,
      name: "오엔랜드이십일",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 11,
      name: "피닉스씨엠씨",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 12,
      name: "정원씨앤씨",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 13,
      name: "진흥정보산업",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 14,
      name: "부동산써브에스앤시",
      url: null,
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 15,
      name: "화성씨앤디",
      url: "http://hscnd.co.kr/",
      note: "공공재개발 참여 사례 확인",
    },
    {
      no: 16,
      name: "대신도시개발(주)",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 17,
      name: "(주)예담도시개발",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 18,
      name: "(주)우성디앤씨",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 19,
      name: "건영씨앤디(주)",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 20,
      name: "(주)호수이엔씨",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 21,
      name: "(주)포스코에이앤씨건축사사무소",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 22,
      name: "고산도시개발 주식회사",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 23,
      name: "(주)에스에이치도시정비",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 24,
      name: "(주)미추홀",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 25,
      name: "제이케이도시정비(주)",
      url: "http://www.jnkcity.com/",
      note: "지역 등록 현황 후보",
    },
    {
      no: 26,
      name: "(주)도시개발창",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 27,
      name: "(주)우성도시정비",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 28,
      name: "경남씨앤씨(주)",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 29,
      name: "(주)도시정비위드",
      url: null,
      note: "지역 등록 현황 후보",
    },
    {
      no: 30,
      name: "(주)다온정비기획",
      url: null,
      note: "지역 등록 현황 후보",
    },
  ].map((company) => (
    <tr key={company.no} className="bg-white">
      <td className="px-4 py-4 text-sm text-gray-900 md:px-6">{company.no}</td>

      <td className="px-4 py-4 text-sm md:px-6">
        {company.url ? (
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 underline underline-offset-2 transition hover:text-blue-600"
          >
            {company.name}
          </a>
        ) : (
          <span className="text-gray-900">{company.name}</span>
        )}
      </td>

      <td className="px-4 py-4 text-sm text-gray-600 md:px-6">확인 필요</td>
      <td className="px-4 py-4 text-sm text-gray-600 md:px-6">확인 필요</td>
      <td className="px-4 py-4 text-sm text-gray-600 md:px-6">확인 필요</td>
      <td className="px-4 py-4 text-sm text-gray-600 md:px-6">확인 필요</td>
      <td className="px-4 py-4 text-sm text-gray-600 md:px-6">{company.note}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  </div>

  <div className="space-y-4">
    <p className="text-[15px] leading-7 text-gray-700">
      ㈜정림컨설팅 / ㈜제이앤케이도시정비는 대형 신탁사와 컨소시엄을 맺거나
      주민 제안 초기에 특별정비계획서 초안을 작성하는 데 강한 정비사업전문관리업체입니다.
      연립주택의 복잡한 공유지분과 토지 등 소유자 명부를 정리하는 행정 자문에도 적합합니다.
    </p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm font-medium text-gray-500 mb-2">대한토지신탁</p>
        <p className="text-[15px] leading-7 text-gray-700">
          2016 도시정비법 시행 시 최우선 사업시행자로써 준공을 경험한 선두 주자입니다.
          연립주택 사업성 분석과 특별법 대응 경험이 축적되어 있습니다.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm font-medium text-gray-500 mb-2">하나자산신탁</p>
        <p className="text-[15px] leading-7 text-gray-700">
          분당 샛별마을 31구역·분당동 5구역(S4)의 공식 사업시행자 고시를 완료한 곳입니다.
          성남시청과의 인허가 협의 프로세스 이해도가 높은 편입니다.
        </p>
      </div>
    </div>
  </div>

  <div className="space-y-4">
    <p className="text-sm text-gray-400">Incentive Factors</p>
    <h4 className="text-[22px] leading-[30px] font-light text-gray-900">
      성남시 2차 정비구역 인허가 조건 분석
    </h4>
    <div className="space-y-3 text-[15px] leading-7 text-gray-700">
      <p>
        1.성남시가 적용 중인 2차 특별정비구역 심사 기준은 과거 성남시에서 공모한 1차 선도지구와 달리
        "주민 제안 방식"으로 사업계획서의 완성도가 매우 중요합니다. 무조건적인 동의율 경쟁보다 사업실행
        가능성이 당락을 좌우합니다.
      </p>
      <p>
        2.사업실행 가능성은 주민 간 갈등 조정 방안, 추정분담금의 합리적 산출,
        사업 지연 리스크 방지 대책까지 포함해야 합니다.
      </p>
      <p>
        3.공공성 및 생활 SOC는 도로·공원 확보, 개방형 커뮤니티 시설 제안이 핵심이며,
        기본계획 정합성은 성남시 2035 노후계획도시 정비기본계획의 방침에 맞춰야 합니다.
      </p>
      <p>
        4.분당 빌라·연립 단지는 아파트보다 낮은 280% 내외 수준의 용적률로
        정합성 있게 제안하는 것이 현실적입니다.
      </p>
      <p>
        5.기본계획 정합성
      </p>
      <p>
        a.용적률 및 층수 기준의 준수
      </p>
        <p className="text-sm font-light text-black">성남시 기본계획은 아파트 단지와 연립·빌라 단지의 목표 용적률(건물을 얼마나 높고 빽빽하게 지을 수 있는지)을 
          다르게 설정하고 있습니다. 만약 시에서 연립주택 밀집 지역의 적정 용적률을 250%~280% 수준으로 가이드라인을 잡았는데, 
        주민 제안서에 아파트와 똑같은 350%를 요구하면 "기본계획 정합성 부족"으로 인허가에서 반려(탈락)됩니다.
      </p>
      <p>
        b.인구 수용 및 세대수 배정 계획
      </p>
        <p className="text-sm font-light text-black">분당 전체가 한꺼번에 재건축을 하면 인구가 폭발하고 하수도나 학교가 마비되므로, 
          성남시는 2035년까지 기본계획을 통해 구역별·연도별로 늘어날 수 있는 최대 세대수(인구 캡)를 정해둡니다.
          우리 단지가 정비계획을 제안할 때, 성남시가 해당 권역(분당동 일대)에 배정한 늘어날 수 있는 인구 규모와 주택 공급 총량의 범위 내에 있어야 정합성을 인정받습니다.
      </p>
      <p>
        c.토지이용계획 및 권역별 특화 방향
      </p>
        <p className="text-sm font-light text-black">성남시 기본계획에는 "이 구역은 녹지 축을 보존해야 한다", 
          "이 구역은 역세권 복합 개발을 해야 한다"와 같은 권역별 특화 지침이 있습니다. 30구역은 주변 중앙공원이나 율동공원, 녹지 축과 인접해 있기 때문에, 
          시의 기본계획이 요구하는 ‘자연 친화적 저밀도·중밀도 주거지 유도’라는 개발 방향에 맞춰 쾌적한 단지 배치 계획을 제안해야 정합성 점수를 높게 받을 수 있습니다.
      </p>
    </div>
  </div>

  <div className="space-y-4">
    <p className="text-sm text-gray-400">Consent Strategy</p>
    <h4 className="text-[22px] leading-[30px] font-light text-gray-900">
      법 개정에 맞춘 주민 동의서 징구 팁
    </h4>
    <div className="space-y-3 text-[15px] leading-7 text-gray-700">
      <p>
        기존 선도지구 때 걷었던 동의서는 전면 재사용이 불가능하므로 새로 징구해야 합니다.(2026년 개정 시 유지 가능)
      </p>
      <p>
        전체 통합 구역 소유주 과반수 동의는 기본이며, 각 연립 단지별로도 50%를 넘겨야
        합니다. 한 단지라도 미달하면 구역 지정 전체가 무산될 수 있습니다.
      </p>
      <p>
        연립주택은 세대별 대지 지분이 큰 만큼, 예상 권리가액 및 대지분담금 시뮬레이션을
        빠르게 제공해 심리적 장벽을 낮추는 전략이 필요합니다.
      </p>
      <p>
        자문위원회 피드백은 소통방과 문의하기로 투명하게 공유해 주민 신뢰를 높여야 합니다.
      </p>
    </div>
  </div>
</div>
        
        <div className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-3">Meeting Checklist</p>
              <h4 className="text-[30px] leading-[38px] font-light">정비업체 회의용 체크리스트</h4>
            </div>
            <div className="text-sm text-gray-500 font-light">
              {loadingChecklist
                ? '저장된 체크리스트를 불러오는 중입니다...'
                : authReady
                ? saveMessage
                : '권한 확인 중입니다...'}
            </div>
          </div>

          <div className="mb-8 rounded-none border border-gray-200 bg-gray-50 px-5 py-4">
            <p className="text-sm leading-7 text-gray-600 font-light">
              {isAdmin
                ? '관리자 로그인 상태입니다. 체크박스와 메모를 수정하면 Supabase에 저장되며, 메모 입력 후 포커스가 벗어나면 자동으로 임시저장됩니다.'
                : '현재는 읽기 전용 상태입니다. 체크박스와 메모는 관리자 로그인 후에만 수정할 수 있으며, 저장된 내용은 그대로 조회할 수 있습니다.'}
            </p>
          </div>

          <div className="space-y-16">
            {renderChecklistTable(
              '공통 체크리스트',
              'Common Questions',
              'common',
              commonQuestions
            )}

            {renderChecklistTable(
              '조합형 추가 체크리스트',
              'Association Type',
              'association',
              associationQuestions
            )}

            {renderChecklistTable(
              '신탁형 추가 체크리스트',
              'Trust Type',
              'trust',
              trustQuestions
            )}
          </div>
        </div>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-400 mb-3">How to Use</p>
            <h4 className="text-[26px] leading-9 font-light mb-4">평가표 사용 방법</h4>
            <p className="text-[15px] leading-7 text-gray-600 font-light">
              각 항목은 5단계 등급으로 평가한 뒤 배점에 맞게 환산하는 방식으로 쓰면 편합니다.
              실무상으로는 1차 정량평가 후 상위 업체만 주민설명 또는 발표평가 대상으로 올리는
              구조가 효율적입니다.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-400 mb-3">Red Flags</p>
            <h4 className="text-[26px] leading-9 font-light mb-4">부적격 판단 기준</h4>
            <ul className="space-y-3 text-[15px] leading-7 text-gray-600 font-light">
              <li>금품 제공 또는 부정 접촉 정황이 있는 경우</li>
              <li>허위 실적 또는 핵심 인력 허위 기재가 있는 경우</li>
              <li>계약서상 업무범위와 추가비용 조건이 불명확한 경우</li>
              <li>전담 인력 배치 계획이 없거나 인수인계 체계가 약한 경우</li>
            </ul>
          </div>
        </div>

        <div className="pt-20 border-t border-gray-200 mt-20">
          <p className="text-sm text-gray-400 mb-3">Practical Note</p>
          <p className="text-[16px] leading-8 text-gray-700 font-light max-w-[980px]">
            조합형에서는 총회자료 작성력과 주민소통 능력을, 신탁형에서는 주민대표단 협의력과
            계약관리 능력을 더 비중 있게 봐야 합니다. 따라서 동일한 100점 평가표를 쓰더라도
            조합형은 총회·행정대응 항목, 신탁형은 협업·계약관리 항목의 정성평가를 더 엄격하게
            보는 방식이 적합합니다.
          </p>
        </div>
      </section>
    </div>
  );
}

      {/* Gallery Grid */}

function InsideTab() {
  const promotionCommitteeSteps = [
  {
    no: '01',
    title: '구성 가능 여부 검토',
    desc: '특별정비구역 지정 이후 조합 방식으로 갈 수 있는지, 특별법상 사업시행자 또는 총괄사업관리자 지정 구조가 우선되는지 먼저 확인합니다.',
    items: [
      '특별정비구역 지정 고시 여부 확인',
      '일반 재건축 절차 적용 가능성 검토',
      '노후계획도시 특별법 적용 여부 확인',
      '사업시행자 방식과 조합 방식의 충돌 여부 점검',
    ],
  },
  {
    no: '02',
    title: '주민대표 추진위원회 구성',
    desc: '추진위원회는 위원장을 포함한 5인 이상의 위원으로 구성하고, 위원장 1인과 감사를 두어야 합니다.',
    items: [
      '위원장 1인 포함',
      '감사 포함',
      '전체 위원 5인 이상',
      '토지등소유자 대표성 확보',
    ],
  },
  {
    no: '03',
    title: '운영규정 및 기초자료 정리',
    desc: '승인신청 전에는 운영규정(안), 토지등소유자 현황, 구역 현황, 공유자 관계, 향후 동의서 징구체계를 정리해야 합니다.',
    items: [
      '운영규정(안) 작성',
      '토지등소유자 명부 정리',
      '등기부 및 공유지분 현황 정리',
      '연락체계 및 동의서 징구계획 수립',
    ],
  },
  {
    no: '04',
    title: '토지등소유자 동의서 징구',
    desc: '추진위원회 승인신청을 하려면 토지등소유자 과반수 동의가 필요합니다.',
    items: [
      '과반수 동의 확보',
      '성명·주소·지분관계 일치 여부 확인',
      '공유 부동산 대표자 선임 선행 정리',
      '철회 및 중복 동의 분리 관리',
    ],
  },
  {
    no: '05',
    title: '승인신청 서류 준비',
    desc: '행정청 제출용 신청서와 첨부서류를 갖춰야 하며, 실무상 누락 없이 한 번에 맞추는 것이 중요합니다.',
    items: [
      '추진위원회 승인신청서',
      '토지등소유자 명부',
      '토지등소유자 동의서',
      '위원장 및 위원의 주소·성명',
      '위원 선정을 증명하는 서류',
      '운영규정',
    ],
  },
  {
    no: '06',
    title: '행정청 검토 및 승인',
    desc: '시장·군수·구청장은 접수 후 서류 적법성과 동의율, 위원 구성요건 등을 검토하여 승인하고, 공보에 고시합니다.',
    items: [
      '접수 및 형식심사',
      '동의율·명부·자격 검토',
      '보완요구 대응',
      '승인 및 공보 고시',
    ],
  },
];

const promotionCommitteeConditions = [
  '위원장을 포함한 5인 이상 구성',
  '위원장 1인과 감사 포함',
  '토지등소유자 과반수 동의 필요',
  '토지등소유자 명부 정비 필요',
  '위원 선정 증빙서류 필요',
  '운영규정(안) 마련 필요',
];

const promotionCommitteeDocuments = [
  '추진위원회 승인신청서',
  '토지등소유자 명부',
  '토지등소유자 동의서',
  '위원장 및 위원의 주소 및 성명',
  '위원 선정을 증명하는 서류',
  '운영규정',
];

const newTownSpecialNotes = [
  '분당 등 노후계획도시는 일반 재건축 절차만으로 보기보다 특별법상 사업시행자 구조를 먼저 검토해야 합니다.',
  '「노후계획도시 정비 및 지원에 관한 특별법」에 따라 사업시행자 또는 총괄사업관리자를 지정하는 체계가 우선 적용될 수 있습니다.',
  '따라서 주민대표 추진위원회 구성이 가능한지 여부도 개별법 절차와 특별법 구조를 함께 놓고 판단해야 합니다.',
];

  const processSteps = [
    {
      no: '01',
      title: '특별정비구역 지정 이후 기본 착수',
      desc: '정비구역 지정 이후에는 토지등소유자 현황, 소유관계, 공유지분 여부, 추진 주체 구성 가능성부터 정리해야 합니다.',
      points: [
        '토지·건축물 소유관계 및 등기부 기초조사',
        '공유 부동산, 1세대 다수 소유, 지분 변동 확인',
        '조합 방식인지 신탁 방식인지 추진구조 검토',
        '향후 동의서 징구 및 창립 총회 로드맵 수립',
      ],
    },
    {
      no: '02',
      title: '조합설립 동의서 징구',
      desc: '조합설립 동의서에는 설계 개요, 정비사업비, 분담기준, 사업 완료 후 소유권 귀속, 조합 정관 관련 사항이 포함되어야 합니다.',
      points: [
        '법정 동의율 충족 여부 실시간 관리',
        '동의서 기재사항 누락 여부 점검',
        '인감·서명·첨부서류와 소유자 정보 일치 확인',
        '철회·중복·무효 동의 분리 관리',
      ],
    },
    {
      no: '03',
      title: '조합 정관 작성',
      desc: '정관은 조합 운영의 기본 규범으로, 조합원 자격, 임원 권한, 총회 절차, 비용 부담, 회계, 사업시행 및 청산 규정을 명확히 담아야 합니다.',
      points: [
        '조합 명칭, 목적, 사무소 소재지',
        '조합원자격, 가입·탈퇴·제명, 대표자관련 규정',
        '임원·대의원 수, 선임·해임·임기·권한·보수',
        '총회·이사회·대의원회 권한 구분',
        '설계사, 외, 내관 자재 검토, 시공자 선정,',
        '사업비 부담, 회계, 열람공개, 해산·청산',
      ],
    },
    {
      no: '04',
      title: '창립총회 개최',
      desc: '창립총회에서는 정관 의결, 임원·대의원 선임, 사업계획 기본안 의결이 이뤄지며, 회의록과 참석자 연명부가 인가서류 핵심이 됩니다.',
      points: [
        '총회 소집 통지 절차 적법성 확보',
        '정족수 및 의결요건 충족 여부 확인',
        '회의록, 참석자 명부, 의결 결과 일치 관리',
        '임원 및 대의원 자격증명 서류 확보',
      ],
    },
    {
      no: '05',
      title: '공유 부동산 대표자 정리',
      desc: '토지 또는 건축물을 여러 명이 공유하는 경우에는 여러 명을 대표하는 1인을 조합원으로 보므로 대표자 선임 정리가 매우 중요합니다.',
      points: [
        '공유자 전원의 대표자 선임동의서 확보',
        '지분율, 인적사항, 등기부상 공유관계와 제출서류 일치',
        '대표자 변경 또는 지분 변동 시 재 정비 필요 여부 검토',
        '대표자는 의결권 · 분양신청 · 통지 수령의 실질적 창구임을 명확히 안내',
      ],
    },
    {
      no: '06',
      title: '조합설립인가 신청',
      desc: '행정청에는 신청서와 함께 정관, 조합원 명부, 자격증명, 동의서, 창립총회 서류, 대표자 선임동의서, 사업계획서 등을 제출합니다.',
      points: [
        '조합설립(변경) 인가신청서 작성',
        '조합원 명부 및 자격증명 서류 첨부',
        '조합설립동의서 및 동의사항 증빙 첨부',
        '창립총회 회의록 및 참석자 연명부 첨부',
        '공유자 대표자 선임동의서 첨부',
        '사업계획서 및 시·도 조례상 추가서류 첨부',
      ],
    },
    {
      no: '07',
      title: '행정청 보완 대응',
      desc: '행정청은 동의서 적법성, 동의율, 소유자 자격, 총회 절차, 임원 결격사유, 정관 내용, 공유자 대표자 서류 등을 집중적으로 확인합니다.',
      points: [
        '동의서의 서명·날인·증빙 누락 여부',
        '동의율 산정 오류 및 철회 반영 여부',
        '등기부, 조합원 명부, 인감서류 불일치 여부',
        '총회 소집통지·회의록·참석자명부 하자 여부',
        '정관 조항 누락 또는 법령 저촉 여부',
      ],
    },
    {
      no: '08',
      title: '조합설립인가 후 사업시행계획인가 준비',
      desc: '조합설립인가 후에는 건축심의, 영향검토, 사업시행계획서 작성, 조합 총회 의결, 관계기관 협의, 사업시행계획인가 신청으로 이어집니다.',
      points: [
        '건축심의 선행 준비',
        '교통·환경·재해 등 관련 영향검토 병행',
        '설계안·배치·세대수·기반시설 포함 사업시행계획서 작성',
        '사업시행계획 총회 의결',
        '관계기관 협의 및 보완 대응',
        '사업시행계획인가 신청',
      ],
    },
  ];

  const statuteItems = [
    '조합의 명칭과 주된 사무소 소재지',
    '조합의 목적과 정비사업의 종류·범위',
    '조합원의 자격, 가입, 탈퇴, 제명 기준',
    '공유자·대리인·대표자 관련 기준',
    '임원의 수, 선임방법, 임기, 권한, 해임, 보수',
    '대의원의 수, 선임방법, 의결방법',
    '총회의 소집 절차, 의결정족수, 서면결의 기준',
    '조합의 비용 부담과 사업비 분담 기준',
    '회계, 결산, 자료열람, 공고 및 통지 방법',
    '사업시행 방식, 계획변경 절차',
    '시공자·설계자 선정 및 계약 원칙',
    '청산금, 현금청산, 해산 및 청산 절차',
    '정관 변경 절차',
  ];

  const shareNotes = [
    '공유자는 각자가 독립 조합원이 아니라 대표자 1인을 통해 조합원 지위를 행사하는 구조로 정리되는 경우가 핵심입니다.',
    '공유자 전원의 의사가 확인되지 않으면 총회 의결, 분양신청, 통지 수령 단계에서 분쟁이 발생할 수 있습니다.',
    '공유지분 변동, 일부 지분 양도, 명의변경이 생기면 대표자 재선임 및 재신고 필요 여부를 즉시 검토해야 합니다.',
    '대표조합원 선임동의서 없이 임원 피선임권이나 의결권 행사 문제를 처리하면 하자가 생길 수 있습니다.',
  ];

  const supplementRisks = [
    '조합설립동의서의 인감·서명·증빙자료 불일치',
    '동의율 산정 오류 및 철회 반영 누락',
    '등기부와 조합원 명부, 자격증명 자료 간 상이',
    '창립총회 소집통지, 의사록, 참석자명부 하자',
    '임원 결격사유 또는 자격증빙 누락',
    '정관의 필수항목 누락 또는 법령 저촉',
    '공유자 대표자 선임동의서 누락 및 최신성 부족',
    '시·도 조례상 추가 첨부서류 누락',
  ];

  const businessPlanChecklist = [
    '건축심의 사전 준비 및 설계안 정리',
    '교통·환경·재해 등 영향검토 병행 여부 확인',
    '배치계획, 세대수, 기반시설, 정비기반시설 계획 반영',
    '사업시행계획서 작성 및 설계도서 정합성 검토',
    '조합 총회 의결자료 작성',
    '관계기관 협의 및 사전 보완 대응',
    '사업시행계획인가 신청 일정표 수립',
  ];

  return (
    <div className="pb-[200px] bg-white">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">정비업체선정</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-light">주민대표단</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-300">예비사업시행자</h5>
        </div>
      </nav>      

      <section className="max-w-[1200px] mx-auto px-6 pt-8 pb-16 border-b border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-4">
              Reconstruction Process
            </p>
            <h2 className="text-[40px] leading-[1.15] tracking-[-0.03em] font-light text-black">
              특별정비구역 지정 이후,
              <br />
              사업시행자선정부터 사업시행계획인가
              <br />
              준비까지
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-6 h-full">
              <p className="text-sm text-gray-500 leading-7">
                정비구역 지정 다음 단계에서는 총괄사업관리자 동의서 징구, 정관 작성,
                창립총회, 공유 부동산 대표자 정리, 인허가 신청, 행정청 보완 대응,
                사업시행계획인가 준비 후, 관리처분계획이 진행 됩니다.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white border border-gray-200 p-4">
                  <p className="text-xs text-gray-400 mb-2">핵심 단계</p>
                  <p className="text-2xl font-light text-black">8</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-200 p-4">
                  <p className="text-xs text-gray-400 mb-2">실무 체크</p>
                  <p className="text-2xl font-light text-black">30+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Process Map
            </p>
            <h3 className="text-[30px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              단계별 추진 절차
            </h3>
          </div>
          <p className="text-sm text-gray-500 max-w-[420px] leading-7">
            각 단계는 다음 단계의 인가서류와 직접 연결되므로,
          <br />          
            앞 단계 서류의 정확성과 적법성이 뒤 단계의 속도를 좌우합니다.
          </p>
        </div>

        <div className="space-y-6">
          {processSteps.map((step) => (
            <div
              key={step.no}
              className="grid grid-cols-12 gap-6 rounded-[28px] border border-gray-200 p-6 md:p-8"
            >
              <div className="col-span-12 md:col-span-2 lg:col-span-1">
                <div className="text-[28px] md:text-[32px] leading-none font-light text-gray-300">
                  {step.no}
                </div>
              </div>

              <div className="col-span-12 md:col-span-10 lg:col-span-4">
                <h4 className="text-[24px] tracking-[-0.02em] leading-[1.25] font-light text-black mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-7">
                  {step.desc}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.points.map((point, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-4 text-sm text-gray-700 leading-6"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Bylaws
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              조합 정관 필수 항목
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-7">
              정관은 조합의 헌법 역할을 하므로, 조합원 자격·임원 권한·총회 의결·비용 부담·회계·청산까지 분쟁이 생길 지점을 미리 조문으로 정리해야 합니다.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statuteItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[20px] border border-gray-200 px-5 py-4 text-sm text-gray-700 leading-6"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Shared Ownership
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              공유 부동산 조합원 자격과
              <br />
              대표자 선임 유의사항
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-3">
              {shareNotes.map((note, index) => (
                <div
                  key={index}
                  className="rounded-[20px] bg-black text-white px-5 py-4 text-sm leading-6 font-light"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Supplement Request
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              행정청 보완 요구가
              <br />
              자주 발생하는 항목
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-7">
              보완 요구는 서류 개별 완성도보다, 서로 다른 서류들 사이의 일치성과 절차 적법성에서 가장 많이 발생합니다.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {supplementRisks.map((risk, index) => (
                <div
                  key={index}
                  className="rounded-[20px] bg-gray-50 border border-gray-200 px-5 py-4 text-sm text-gray-700 leading-6"
                >
                  {risk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Business Plan Approval
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              재건축 조합설립 후
              <br />
              사업시행계획인가 준비사항
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-[28px] border border-gray-200 overflow-hidden">
              {businessPlanChecklist.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    index !== businessPlanChecklist.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="text-sm text-gray-700 leading-6">{item}</span>
                  <span className="text-xs text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-b border-gray-100">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 lg:col-span-4">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Summary Guide
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              실무 한눈 정리
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="rounded-[28px] bg-gray-50 border border-gray-200 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-3">조합설립인가 전</p>
                  <ul className="space-y-3 text-sm text-gray-700 leading-6">
                    <li>동의율과 동의서 적법성 확보</li>
                    <li>정관 필수항목과 총회 권한 구조 정리</li>
                    <li>공유자 대표자 선임과 자격증명 완료</li>
                    <li>창립총회 회의록·참석자명부 정합성 확보</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-3">조합설립인가 후</p>
                  <ul className="space-y-3 text-sm text-gray-700 leading-6">
                    <li>건축심의 및 영향검토 선행</li>
                    <li>사업시행계획서와 설계도서 구체화</li>
                    <li>조합 총회 의결 및 관계기관 협의</li>
                    <li>사업시행계획인가 신청 전 보완 리스크 차단</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Promotion Committee
            </p>
            <h3 className="text-[30px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              추진위원회 구성·승인 절차
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-7">
              특별정비구역 지정 이후 조합 방식으로 사업을 추진하려면, 먼저 주민대표 성격의 추진위원회를 구성하고
              행정청 승인을 받아야 다음 단계인 조합설립 동의서 징구와 창립총회 준비가 안정적으로 가능합니다.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-[28px] bg-gray-50 border border-gray-200 p-6 md:p-8">
              <p className="text-xs text-gray-400 mb-4">핵심 요건</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {promotionCommitteeConditions.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[18px] bg-white border border-gray-200 px-4 py-4 text-sm text-gray-700 leading-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {promotionCommitteeSteps.map((step) => (
            <div
              key={step.no}
              className="grid grid-cols-12 gap-6 rounded-[28px] border border-gray-200 p-6 md:p-8"
            >
              <div className="col-span-12 md:col-span-2 lg:col-span-1">
                <div className="text-[28px] md:text-[32px] leading-none font-light text-gray-300">
                  {step.no}
                </div>
              </div>

              <div className="col-span-12 md:col-span-10 lg:col-span-4">
                <h4 className="text-[24px] tracking-[-0.02em] leading-[1.25] font-light text-black mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-7">
                  {step.desc}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.items.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-4 text-sm text-gray-700 leading-6"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Submission Documents
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              추진위원회 승인신청
              <br />
              제출서류
            </h3>
            <p className="mt-4 text-sm text-gray-500 leading-7">
              승인신청 시 기본적으로 필요한 서류입니다. 관할청에 따라 보완자료나 추가 확인자료를 요구할 수 있으므로
              명부·동의서·증빙서류 간 일치성을 함께 점검해야 합니다.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-[28px] border border-gray-200 overflow-hidden">
              {promotionCommitteeDocuments.map((doc, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    index !== promotionCommitteeDocuments.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="text-sm text-gray-700 leading-6">{doc}</span>
                  <span className="text-xs text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[12px] tracking-[0.18em] text-gray-400 uppercase mb-3">
              Bundang Note
            </p>
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.02em] font-light text-black">
              분당·노후계획도시
              <br />
              검토 포인트
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-3">
              {newTownSpecialNotes.map((note, index) => (
                <div
                  key={index}
                  className="rounded-[20px] bg-black text-white px-5 py-4 text-sm leading-6 font-light"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

{/* Gallery Grid */}

function OutsideTab() {
return (
    <div className="pb-[200px]">
      {/* Breadcrumb */}
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">정비업체선정</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">주민대표단</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">예비사업시행자</h5>
        </div>
      </nav>

      {/* 다섯가지 타입의 평형정보 Section */}
      

      {/* A 타입 Section */}
      

      {/* B 타입 Section */}
      

      {/* S 타입 Section */}
      
    </div>
  );
}

function GalleryCard({
  title,
  subtitle,
  image,
  className = '',
}: {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}) {
  return (
    <a href="#" className={`group block ${className}`}>
      <div className="relative overflow-hidden rounded-none mb-2 aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-400 font-light">{subtitle}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-light">{title}</h3>
          <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center transition-colors group-hover:border-black">
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black" />
          </div>
        </div>
      </div>
    </a>
  );
}
