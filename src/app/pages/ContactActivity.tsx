import { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown, Send, Search, Plus, Paperclip, MessageCircle, Users, Lock, Pencil, Trash2, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import brandBg from '../../assets/images/main-14.png';
import organizationImage from '../../assets/images/organization.jpg';
import vcImage from '../../assets/images/vc.jpg';

export function ContactActivity() {
  const [activeTab, setActiveTab] = useState('Organization');
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
          <h2 className="text-white text-[38px] font-light leading-[42px]">준비위 활동</h2>
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
                onClick={() => handleTabChange('Organization')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'Organization' ? 'text-black' : 'text-gray-400'
                }`}
              >
                조직도
                {activeTab === 'Organization' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('Development')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'Development' ? 'text-black' : 'text-gray-400'
                }`}
              >
                운영비
                {activeTab === 'Development' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('Visioncenter')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'Visioncenter' ? 'text-black' : 'text-gray-400'
                }`}
              >
                V/C
                {activeTab === 'Visioncenter' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'Organization' && <OrganizationTab />}
        {activeTab === 'Development' && <DevelopmentTab />}
        {activeTab === 'Visioncenter' && <VisioncenterTab />}
      </div>
    </div>
  );
}

function OrganizationTab() {
  const directors = [
    'A단지 대표 이사 6명',
    'B단지 대표 이사 5명',
    'C단지 대표 이사 9명',
    'D단지 대표 이사 6명',
    'E단지 대표 이사 5명',
    
  ];


  const partners = [
    '정비사업전문관리(PM) - 행정 대행 및 자문',
    '설계사(건축사사무소) - 기획·기본·실시 설계',
    '건설시공사 - 공사 시공',
    '감정평가법인 - 종전·종후 자산 평가',
    '법무사 - 등기 업무',
    '변호사 - 법률 자문',
    '세무사 - 세무 처리',
    '회계사 - 준비위 회계 처리',
    '금융자문사 - 자금 조달 자문',
    '홍보·소통 지원 - 토지등소유자 커뮤니케이션',
    '기타 전문 자문기관 - 사업 단계별 지원',
  ];

  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">함께해요</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">조직도</h5>
        </div>
      </nav>

      <article className="relative pt-[120px]">
        <div className="absolute inset-x-0 top-[140px] h-[280px] bg-gray-50 -z-10" />
        <div className="max-w-[1200px] mx-auto px-0 md:px-12">
          <div className="flex flex-col md:flex-row gap-18 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={organizationImage}
                alt="조직도"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[80px]">
              <header className="mb-[6px]">
                <p className="text-gray-400 text-base font-light mb-10">
                  준비위원회 운영을 위한 기본 조직 구성입니다.
                </p>
                <h3 className="text-[30px] font-light leading-[42px]">조직도 및 위원 정보
                  <p className="text-lg font-light leading-7 text-black">
                  (주민대표단은 별도 운영규정 적용)
                  </p>  
                </h3>
              </header>

              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  준비위 위원장을 중심으로 부위원장, 사무국장, 단지별 위원, 감사, 사무원,
                  <br/>외부 협력기관이 함께 사업을 추진하는 구조로 운영됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="max-w-[1200px] mx-auto px-6 pt-[120px] space-y-16">
        <section>
  <h3 className="text-xl md:text-2xl font-light mb-8">조직도 구조</h3>

  <div className="space-y-6">
    {/* 총회 */}
    <div className="flex justify-center">
      <div className="w-full max-w-[1200px] mx-auto rounded-2xl border border-gray-200 bg-black text-white px-8 py-6 text-center shadow-sm">
        <p className="text-sm font-light opacity-80 mb-1">최고 의사결정기구</p>
        <h4 className="text-xl font-light">총회</h4>
        <p className="text-xs font-light mt-2">전체토지등소유자 의사결정</p>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="w-px h-8 bg-gray-300" />
    </div>

    {/* 감사 / 준비위장 / 대의원회 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500 font-light mb-2">감사 기능</p>
        <h4 className="text-xl font-light text-black mb-2">감사</h4>
        <p className="text-sm text-gray-700 font-light">2명</p>
        <p className="text-xs text-gray-500 font-light mt-2">
          예산·회계·업무 집행 감시
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-500 font-light mb-2">대표 집행부</p>
        <h4 className="text-xl font-light text-black mb-2">준비위 위원장</h4>
        <p className="text-sm text-gray-700 font-light">1명</p>
        <p className="text-xs text-gray-500 font-light mt-2">
          준비위대표, 총회·이사회 의장
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500 font-light mb-2">대표 협의기구</p>
        <h4 className="text-xl font-light text-black mb-2">준비위 부위원장</h4>
        <p className="text-sm text-gray-700 font-light">2명</p>
        <p className="text-xs text-gray-500 font-light mt-2">
          주요 안건 의결 및 집행
        </p>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="w-px h-8 bg-gray-300" />
    </div>

    {/* 하위 조직 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h4 className="text-lg font-light text-black mb-3">단지별 위원</h4>
        <p className="text-sm text-gray-500 font-light mb-4">22명 / 31개 단지 대표(집행부)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 font-light">
          {directors.map((item) => (
            <div key={item} className="rounded-lg bg-gray-50 px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h4 className="text-lg font-light text-black mb-3">사무국</h4>
        <p className="text-sm text-gray-500 font-light mb-4">상근 운영 조직</p>
        <div className="space-y-3 text-sm text-gray-700 font-light">
          <div className="rounded-lg bg-gray-50 px-4 py-3">
            사무국장(사무원포함) 2명
            <br />
            <span className="text-gray-500">준비위 일상 행정 집행 총괄</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-3">
            홍보팀 
            <br />
            <span className="text-gray-500">사업 및 주택가치 홍보</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h4 className="text-lg font-light text-black mb-3">외부 협력기관</h4>
        <p className="text-sm text-gray-500 font-light mb-4">전문 지원 조직</p>
        <div className="space-y-3 text-sm text-gray-700 font-light">
          <div className="rounded-lg bg-gray-50 px-4 py-3">
            정비사업전문관리업자(PM)
            <br />
            <span className="text-gray-500">행정 대행 및 사업 계획 자문</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-3">
            설계·시공·감정·법률·세무
            <br />
            <span className="text-gray-500">사업 단계별 전문 지원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">조직 구성 표</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-t-2 border-black min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-5 text-left font-medium w-[240px]">구분</th>
                  <th className="px-6 py-5 text-left font-medium w-[160px]">인원</th>
                  <th className="px-6 py-5 text-left font-medium">비고</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base font-light">
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">준비위 위원장</td>
                  <td className="px-6 py-5">1명</td>
                  <td className="px-6 py-5">이종수 진로빌라 B동 203호</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">준비위 부위원장</td>
                  <td className="px-6 py-5">2명</td>
                  <td className="px-6 py-5">이태선 아름빌라 305호 / 임수만 쌍용빌라 204호 </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">사무국</td>
                  <td className="px-6 py-5">2명</td>
                  <td className="px-6 py-5">사무국장 임승현 석류빌라 A동 303호 / 김민홍 동아빌라 A동 303호 </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">사무원</td>
                  <td className="px-6 py-5">2명</td>
                  <td className="px-6 py-5">실무 처리 직원</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">감사</td>
                  <td className="px-6 py-5">2명</td>
                  <td className="px-6 py-5">하동국 한울빌라 103호 / 김부경 진로빌라 A동 202호 </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">단지별 위원</td>
                  <td className="px-6 py-5">22명</td>
                  <td className="px-6 py-5">황종욱 그린빌라 305호 / 이윤구 공간빌라 104호 외 20명 / 각 단지 대표(집행기관)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">외부 협력기관</td>
                  <td className="px-6 py-5">11개 분야</td>
                  <td className="px-6 py-5">
                    정비사업전문관리(PM), 설계사, 건설시공사, 감정평가법인, 법무사·변호사, 세무사·회계사 등
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">조직원 상세 정보</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-light text-black mb-4">핵심 임원</h4>
              <div className="space-y-4 text-sm text-gray-700 font-light">
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-black mb-1">준비위 위원장</p>
                  <p>1명</p>
                  <p className="text-gray-500">준비위 대표, 총회 및 이사회 의장, 주요 의사결정 총괄</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-black mb-1">준비위 부위원장</p>
                  <p>2명</p>
                  <p className="text-gray-500">위원장 유고 시 대표, 총회 및 이사회 의장 보좌, 주요 의사결정 협력 총괄</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-black mb-1">사무국장(사무국)</p>
                  <p>4명</p>
                  <p className="text-gray-500">인허가.행정, 자금.회계, 소통.홍보.운영 실무, 지분 및 갈등 조정 민원,</p>
                </div>                
                <div>
                  <p className="text-black mb-1">감사</p>
                  <p>2명</p>
                  <p className="text-gray-500">예산·회계·업무 집행 감시 및 감사 보고</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-light text-black mb-4">단지별 대표 위원</h4>
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-black mb-3">단지별 이사 31명</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 font-light">
                    {directors.map((item) => (
                      <div key={item} className="bg-gray-50 rounded-lg px-3 py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-black mb-3"><br/><br/><br/>홍보 . 마케팅 </p>
                  <p>1명 </p>
                  <p className="text-gray-500">• 권리가액 집중 홍보/광고 / • 30구역 현황 관리 / • 홈페이지 관리 / 
                    <br/>• 감정평가액 극대화 방안 / • 현재 시세 대비 지정 전 가치 증대 방안 / <br/>• 현재 시세 대비 지정 전 가치 증대 방안</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">외부 협력기관</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-700 font-light"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

type ExpenseRow = {
  id: string;
  month: string;
  item: string;
  amount: string;
  note: string;
  sort_order: number;
};

function DevelopmentTab() {
  const expenseCategories = [
    {
      title: '사무 운영비',
      items: ['사무실 임차료', '관리비', '전기·통신비', '비품 및 소모품 구입비'],
    },
    {
      title: '인건비',
      items: ['사무 임원 보수', '사무원 급여', '4대 보험 및 관련 인사 비용'],
    },
    {
      title: '회의 및 총회비',
      items: ['총회 개최비(온라인총회가능)', '이사회 및 대의원회 회의비', '회의 자료 제작 및 안내비(홈페이지이용)'],
    },
    {
      title: '전문 용역비',
      items: ['정비사업전문관리업자(PM) 수수료', '법률 자문비', '회계·세무 자문비'],
    },
    {
      title: '홍보 및 소통비',
      items: ['안내문 제작비(홈페이지이용)', '문자 발송비', '홈페이지 및 온라인 관리비'],
    },
    {
      title: '기타 운영비',
      items: ['등기·제증명 발급비', '우편 발송비', '현장 관리 및 방문 응대비'],
    },
  ];

  const ADMIN_EMAIL = '01030058829@admin.local';

  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [loading, setLoading] = useState(true);

  type NewLine = { item: string; amount: string; note: string };
  const emptyLine = (): NewLine => ({ item: '', amount: '', note: '' });

  // 추가 폼 상태
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMonth, setNewMonth] = useState('');
  const [newLines, setNewLines] = useState<NewLine[]>([emptyLine()]);
  const [saving, setSaving] = useState(false);

  // 인라인 편집 상태
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editNote, setEditNote] = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setIsAdmin(user.email?.toLowerCase() === ADMIN_EMAIL);
      }
      await fetchMonths();
    };
    init();
  }, []);

  useEffect(() => {
    if (selectedMonth) fetchExpenses(selectedMonth);
  }, [selectedMonth]);

  const fetchMonths = async () => {
    const { data, error } = await supabase
      .from('operating_expenses')
      .select('month')
      .order('month', { ascending: false });

    if (error) { console.error(error); return; }

    const unique = [...new Set((data ?? []).map((r: any) => r.month as string))];
    setAvailableMonths(unique);
    if (unique.length > 0) setSelectedMonth(unique[0]);
    else setLoading(false);
  };

  const fetchExpenses = async (month: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('operating_expenses')
      .select('*')
      .eq('month', month)
      .order('sort_order', { ascending: true });

    if (error) console.error(error);
    setExpenses((data as ExpenseRow[]) ?? []);
    setLoading(false);
  };

  const updateLine = (idx: number, field: keyof NewLine, value: string) => {
    setNewLines((prev) => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };

  const addLine = () => setNewLines((prev) => [...prev, emptyLine()]);

  const removeLine = (idx: number) =>
    setNewLines((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handleAdd = async () => {
    const month = newMonth.trim();
    if (!month) { alert('월을 입력해 주세요. (예: 2026-09)'); return; }
    const validLines = newLines.filter((l) => l.item.trim() && l.amount.trim());
    if (validLines.length === 0) {
      alert('지출 항목과 금액을 하나 이상 입력해 주세요.');
      return;
    }
    setSaving(true);
    const baseOrder = expenses.length > 0
      ? Math.max(...expenses.map((e) => e.sort_order)) + 1
      : 0;
    const rows = validLines.map((l, i) => ({
      month,
      item: l.item.trim(),
      amount: l.amount.trim(),
      note: l.note.trim(),
      sort_order: baseOrder + i,
      created_by: userId,
    }));
    const { error } = await supabase.from('operating_expenses').insert(rows);
    setSaving(false);
    if (error) { alert('저장 실패: ' + error.message); return; }
    setNewMonth('');
    setNewLines([emptyLine()]);
    setShowAddForm(false);
    await fetchMonths();
    if (month === selectedMonth) fetchExpenses(selectedMonth);
    else setSelectedMonth(month);
  };

  const startEdit = (row: ExpenseRow) => {
    setEditingId(row.id);
    setEditItem(row.item);
    setEditAmount(row.amount);
    setEditNote(row.note);
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase
      .from('operating_expenses')
      .update({ item: editItem.trim(), amount: editAmount.trim(), note: editNote.trim() })
      .eq('id', id);
    setSaving(false);
    if (error) { alert('수정 실패: ' + error.message); return; }
    setEditingId(null);
    fetchExpenses(selectedMonth);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 항목을 삭제하시겠습니까?')) return;
    const { error } = await supabase.from('operating_expenses').delete().eq('id', id);
    if (error) { alert('삭제 실패: ' + error.message); return; }
    fetchExpenses(selectedMonth);
    fetchMonths();
  };

  const displayMonth = (m: string) => {
    const [year, mon] = m.split('-');
    return `${year}.${mon}월`;
  };

  const principles = [
    '운영비는 준비위 운영과 사업 추진 목적에 한해 사용합니다.',
    '주요 지출 내역은 총회, 이사회 또는 대의원회 보고 기준에 따라 공유합니다.',
    '회계 정리 및 감사 확인을 통해 집행의 투명성을 유지합니다.',
    '전문 용역비와 인건비는 계약서 및 내부 결의 기준에 따라 집행합니다.',
    '한국부동산원 정비사업 준비위 임원 보수 가이드라인 참조.',
  ];

  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">함께해요</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">준비위운영비</h5>
        </div>
      </nav>

      <article className="relative pt-[120px]">
        <div className="absolute inset-x-0 top-[140px] h-[280px] bg-gray-50 -z-10" />
        <div className="max-w-[1200px] mx-auto px-0 md:px-12">
          <div className="flex flex-col md:flex-row gap-18 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                alt="준비위 운영비"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex-1 px-6 md:px-0 md:py-[80px]">
              <header className="mb-[6px]">
                <p className="text-gray-400 text-base font-light mb-10">
                  준비위의 운영에 사용하는 비용을 안내합니다.
                </p>
                <h3 className="text-[30px] font-light leading-[42px]">준비위 운영비
                  <p className="text-lg font-light leading-7 text-black">
                  (사업시행자방식은 별도 지침 작성 필요)
                  </p>
                </h3>
              </header>
              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  준비위 운영비는 준비위의 일상 행정, 총회·이사회 운영, 외부 전문 자문,
                  토지등소유자 소통 및 사업 추진을 위한 실무 비용으로 사용됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="max-w-[1200px] mx-auto px-6 pt-[130px] space-y-16">
        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">운영비 사용 항목</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expenseCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h4 className="text-lg font-light text-black mb-4">{category.title}</h4>
                <ul className="space-y-2 text-sm md:text-base text-gray-600 font-light">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl md:text-2xl font-light">월별 지출 내역</h3>

            <div className="flex items-center gap-3 flex-wrap">
              <label htmlFor="expenseMonth" className="text-sm text-gray-500 font-light">
                조회 월
              </label>
              <select
                id="expenseMonth"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="min-w-[160px] border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-black"
              >
                {availableMonths.length === 0 && (
                  <option value="">등록된 월 없음</option>
                )}
                {availableMonths.map((m) => (
                  <option key={m} value={m}>{displayMonth(m)}</option>
                ))}
              </select>
              {isAdmin && (
                <button
                  onClick={() => setShowAddForm((v) => !v)}
                  className="flex items-center gap-1 bg-black text-white text-sm px-4 py-2 hover:bg-gray-800 transition-colors"
                >
                  <Plus size={14} />
                  항목 추가
                </button>
              )}
            </div>
          </div>

          {/* 관리자 추가 폼 */}
          {isAdmin && showAddForm && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">새 지출 항목 추가</p>
                <button onClick={() => { setShowAddForm(false); setNewLines([emptyLine()]); setNewMonth(''); }}
                  className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>

              {/* 월 입력 (공통) */}
              <div className="flex items-center gap-3">
                <label className="text-xs text-gray-500 whitespace-nowrap">지출 월 *</label>
                <input
                  type="text"
                  placeholder="예: 2026-09"
                  value={newMonth}
                  onChange={(e) => setNewMonth(e.target.value)}
                  className="w-40 border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                />
                <span className="text-xs text-gray-400">형식: YYYY-MM</span>
              </div>

              {/* 항목 헤더 */}
              <div className="grid grid-cols-[1fr_160px_180px_28px] gap-2 text-xs text-gray-400 px-1">
                <span>지출 항목 *</span>
                <span>금액 *</span>
                <span>비고</span>
                <span />
              </div>

              {/* 항목 행들 */}
              <div className="space-y-2">
                {newLines.map((line, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_160px_180px_28px] gap-2 items-center">
                    <input
                      type="text"
                      placeholder="지출 항목명"
                      value={line.item}
                      onChange={(e) => updateLine(idx, 'item', e.target.value)}
                      className="border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="1,000,000원"
                      value={line.amount}
                      onChange={(e) => updateLine(idx, 'amount', e.target.value)}
                      className="border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="비고 (선택)"
                      value={line.note}
                      onChange={(e) => updateLine(idx, 'note', e.target.value)}
                      className="border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    />
                    <button
                      onClick={() => removeLine(idx)}
                      disabled={newLines.length === 1}
                      className="text-gray-300 hover:text-red-500 disabled:opacity-20 transition-colors"
                      title="행 삭제"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* 행 추가 버튼 */}
              <button
                onClick={addLine}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors border border-dashed border-gray-300 hover:border-gray-500 px-4 py-2 w-full justify-center"
              >
                <Plus size={14} />
                항목 행 추가
              </button>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <button
                  onClick={handleAdd}
                  disabled={saving}
                  className="bg-black text-white text-sm px-6 py-2 hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {saving ? '저장 중…' : `${newLines.filter(l => l.item.trim() && l.amount.trim()).length}건 저장`}
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewLines([emptyLine()]); setNewMonth(''); }}
                  className="border border-gray-300 text-sm px-5 py-2 hover:bg-gray-100 transition-colors"
                >
                  취소
                </button>
                <span className="text-xs text-gray-400 ml-auto">항목·금액이 비어있는 행은 저장 시 건너뜁니다.</span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-t-2 border-black min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-5 text-left font-medium w-[120px]">월</th>
                  <th className="px-6 py-5 text-left font-medium">지출 항목</th>
                  <th className="px-6 py-5 text-right font-medium w-[160px]">금액</th>
                  <th className="px-6 py-5 text-right font-medium w-[200px]">비고</th>
                  {isAdmin && <th className="px-4 py-5 w-[80px]" />}
                </tr>
              </thead>
              <tbody className="text-sm md:text-base font-light">
                {loading ? (
                  <tr>
                    <td colSpan={isAdmin ? 5 : 4} className="px-6 py-10 text-center text-gray-400">
                      데이터를 불러오는 중입니다…
                    </td>
                  </tr>
                ) : expenses.length > 0 ? (
                  expenses.map((row) => (
                    <tr key={row.id} className="border-b border-gray-200 group">
                      <td className="bg-gray-50 px-6 py-4 text-sm">{row.month}</td>
                      {editingId === row.id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              value={editItem}
                              onChange={(e) => setEditItem(e.target.value)}
                              className="w-full border border-gray-300 px-2 py-1 text-sm outline-none focus:border-black"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="w-full border border-gray-300 px-2 py-1 text-sm text-right outline-none focus:border-black"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={editNote}
                              onChange={(e) => setEditNote(e.target.value)}
                              className="w-full border border-gray-300 px-2 py-1 text-sm text-right outline-none focus:border-black"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => handleSaveEdit(row.id)}
                                disabled={saving}
                                className="p-1 text-green-600 hover:text-green-800"
                                title="저장"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                                title="취소"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">{row.item}</td>
                          <td className="px-6 py-4 text-right whitespace-nowrap tabular-nums">{row.amount}</td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">{row.note}</td>
                          {isAdmin && (
                            <td className="px-4 py-4">
                              <div className="flex gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEdit(row)}
                                  className="p-1 text-gray-400 hover:text-black"
                                  title="수정"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(row.id)}
                                  className="p-1 text-gray-400 hover:text-red-600"
                                  title="삭제"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdmin ? 5 : 4} className="px-6 py-10 text-center text-gray-400">
                      {availableMonths.length === 0
                        ? '아직 등록된 지출 내역이 없습니다.'
                        : '선택한 월의 지출 내역이 없습니다.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">운영비 집행 원칙</h3>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
            <ul className="space-y-4 text-sm md:text-base text-gray-700 font-light leading-8">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">주민 확인 안내(사업시행자방식동일)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-light mb-3">정기 보고</h4>
              <p className="text-sm md:text-base text-gray-600 font-light leading-7">
                월별 또는 분기별 운영비 사용 내역을 정리하여 토지등소유자에게 안내합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-light mb-3">증빙 관리</h4>
              <p className="text-sm md:text-base text-gray-600 font-light leading-7">
                계약서, 세금계산서, 영수증, 계좌이체 내역 등 관련 증빙을 함께 관리합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-light mb-3">감사 확인</h4>
              <p className="text-sm md:text-base text-gray-600 font-light leading-7">
                주요 집행 내역은 감사 확인 및 내부 결의 절차를 통해 투명하게 운영합니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function VisioncenterTab() {
  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">함께해요</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">V/C</h5>
        </div>
      </nav>

      <article className="relative pt-[120px]">
        <div className="absolute inset-x-0 top-[140px] h-[280px] bg-gray-50 -z-10" />
        <div className="max-w-[1200px] mx-auto px-0 md:px-6 ">
          <div className="flex flex-col md:flex-row gap-18 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0 bg-gray-200 overflow-hidden">
              <img
                src={vcImage}
                alt="VISION CENTER"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[80px]">
              <header className="mb-[6px]">
                <p className="text-gray-400 text-base font-light mb-10">
                  협력업체 선정 시기를 안내합니다.
                </p>
                <h3 className="text-[30px] font-light leading-[42px]">
                  주요 협력업체 선정 시기
                </h3>
              </header>

              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  분당2 30구역 통합재건축 정비사업은 노후계획도시정비특별법으로 성남시 지구단위계획하에  종전의 
                  정비기반시설을 개선하면서 대규모로 주거환경을 정비하는 사업입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="max-w-[1200px] mx-auto px-6 pt-[130px] space-y-14">
        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">단계별 안내</h3>
          <div className="space-y-8 text-gray-700 font-light leading-8">
            <div>
              <h4 className="text-lg text-black mb-2">1. 정비업체(PM) 선정 시기</h4>
              <p>
                정비업체는 사업 초기인 주민합의체 구성 또는 재건축 준비 단계에서 가장 먼저 섭외하게 됩니다.
                주민동의서 징구, 사업성 검토, 예비사업시행자 준비 업무를 지원합니다.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-black mb-2">2. 설계사(건축사) 선정 시기</h4>
              <p>
                설계사는 재건축 추진 준비 단계 또는 특별정비구역 지정 후 선정합니다.
                주민 동의를 위한 건축계획안, 가설계, 사업성 분석 등을 위해 초기에 함께 진행됩니다.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-black mb-2">3. 건설시공사 선정 시기</h4>
              <p>
                건설시공사는 특별정비구역 지정 후 현상설계공모 이후 총회를 통해 선정합니다.
                이후 건축심의와 사업시행계획인가 절차를 본격적으로 추진하게 됩니다.
              </p>
            </div>

            <div>
              <h4 className="text-lg text-black mb-2">4. 자금 조달 단계</h4>
              <p>
                초기에는 주민 자체 자금, 정비업체·설계사 선투입, 성남시 공공융자 사업비 융자를 활용하고,
                이후에는 예비사업시행자 대여금과 PF 대출, 본사업비 융자로 이어집니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl md:text-2xl font-light mb-6">자금조달 시기 요약</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-t-2 border-black min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-5 text-left font-medium w-[260px]">진행 단계</th>
                  <th className="px-6 py-5 text-left font-medium">주요 업무 및 섭외 시점</th>
                  <th className="px-6 py-5 text-left font-medium">자금 조달 방식</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base font-light">
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">1. 사업 준비 단계</td>
                  <td className="px-6 py-5">정비업체(PM), 설계사 섭외 / 주민동의서 징구 / 가설계 / 사업성 검토</td>
                  <td className="px-6 py-5">주민 자체 자금 또는 업체 선투입</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">2. 예비사업시행자</td>
                  <td className="px-6 py-5">특별정비구역 지정을 위한 주민제안</td>
                  <td className="px-6 py-5">신탁사 사업비 대여금</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">3. 시공사 선정</td>
                  <td className="px-6 py-5">건설시공사 선정 (총회 의결)</td>
                  <td className="px-6 py-5">시공사 입찰보증금 및 사업비 대출 활용</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">4. 건축심의 및 사업시행인가</td>
                  <td className="px-6 py-5">건축심의, 사업시행계획(관리처분) 인가</td>
                  <td className="px-6 py-5">-</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">5. 이주 및 착공</td>
                  <td className="px-6 py-5">주민 이주, 철거 및 공사 착수</td>
                  <td className="px-6 py-5">금융기관 본 PF 대출, 본사업비 융자</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="bg-gray-50 px-6 py-5">6. 준공 및 청산</td>
                  <td className="px-6 py-5">입주 및 이전고시</td>
                  <td className="px-6 py-5">일반분양 대금 등으로 대출금 상환</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
