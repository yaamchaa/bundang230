import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import brandBg from '../../assets/images/main-4.jpg';
import is1Image from '../../assets/images/is1.jpg';
import il1Image from '../../assets/images/il1.jpg';
import il59aImage from '../../assets/images/il59a.jpg';
import il59bImage from '../../assets/images/il59b.jpg';

export function FirstyoolInformation() {
  const [activeTab, setActiveTab] = useState('layout');
  const [selectedGraph, setSelectedGraph] = useState('FIRST YOOL');
  const tabSentinelRef = useRef<HTMLDivElement | null>(null);
  const tabSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = tabSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      window.dispatchEvent(
        new CustomEvent('tab-header-sticky-change', {
          detail: { hidden: !entry.isIntersecting },
        })
      );
    });

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
          style={{ backgroundImage: `url(${brandBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <h2 className="text-white text-[38px] font-light leading-[42px]">INFORMATION</h2>
        </div>
      </section>

      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div ref={tabSentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />

        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex font-light gap-16 pt-8">
              <button
                onClick={() => handleTabChange('layout')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'layout' ? 'text-black' : 'text-gray-400'
                }`}
              >
                LAYOUT
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
                사업일정
                {activeTab === 'premium' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('dataroom')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'dataroom' ? 'text-black' : 'text-gray-400'
                }`}
              >
                자료실
                {activeTab === 'dataroom' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'layout' && <LayoutTab />}
        {activeTab === 'premium' && (
          <PremiumTab
            selectedGraph={selectedGraph}
            setSelectedGraph={setSelectedGraph}
          />
        )}
        {activeTab === 'dataroom' && <DataRoomTab />}
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
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">INFORMATION</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">LAYOUT</h5>
        </div>
      </nav>

      {/* 다섯가지 타입의 평형정보 Section */}
      <article className="relative pt-[90px]">
        <div className="absolute inset-x-0 top-[110px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[50px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <img
                src={il1Image}
                alt="Floor space"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1  px-6 md:px-0 md:py-[50px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-1">Floor space</p>
                <h3 className="text-[30px] font-light leading-[42px]">5 평형별 FLOOR PLAN</h3>
              </header>
              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  퍼스트 율 분당은 5가지 타입의 평형 정보가 있습니다.<br />
                  아름다운 청동오리산과 중앙공원의 전경을 한편의 파노라마처럼 감상할 수 있는<br />
                  전망과 밝은 채광으로 자유로운 평면 변경이 이상적인 구조를 이루고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 59.95㎡ Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <header className="flex items-center justify-between  px-6 md:px-0 mb-4">
          <h3 className="text-xl font-light">59.95㎡ 324세대</h3>
          <button className="px-3 py-0.5
            border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            준비중
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-[4/3] overflow-hidden">
          <img
            src={il59aImage}
            alt="A type 1"
            className="w-full h-full object-cover"
          />
           </div>
          <img
            src={il59aImage}
            alt="A type 2"
            className="w-full h-full object-cover"
          />
        </div>         
        <p className="mt-6 px-6 md:px-0 text-base font-light leading-6 text-gray-600">
          59.95m2는 Living Room을 'ㅡ'자 형태의 대면형 주방을 배치하여, 거실과 일원화 하는 풍경을 한 편의 파노라마처럼 감상할 수 있도록 하였습니다.
          대부분의 실내공간에서 밝은 채광과 시원한 전망을 즐기실 수 있습니다.
        거실, 주방 특화로 대형 평형에서 느끼는 공간감을 특화하며, 부부침실과 1개의 Library, 별도의 드레스룸을 배치, 신혼의 행복함을 프리미엄하게 누릴수 있는 세대에 적합한 공간을 계획하였습니다.
        </p>            
      </article>

      {/* 84.95㎡ Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <header className="flex items-center justify-between px-6 md:px-0 mb-4">
          <h3 className="text-xl font-light">84.95㎡ 324세대</h3>
          <button className="px-3 py-0.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            준비중
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-[4/3] overflow-hidden">
          <img
            src={il59aImage}
            alt="B type 1"
            className="w-full h-full object-cover"
          />
           </div>
          <img
            src={il59bImage}
            alt="B type 2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 px-6 md:px-0 text-base font-light leading-6 text-gray-600">
          여유 있는 Living Room과 중앙공원의 전경을 느낄 수 있는 또 하나의 알파룸과, Family Room을 배치합니다.<br />
          룸별 Dress Room을 두어, Privacy와 여유가 있는 수납공간을 준비합니다. 평면변경을 자유롭게 당신만의 개성을 표현할 수 있습니다.<br />
          공간의 수보다는 넓은 공간을 선호하는 분들을 위한 공간, 계획이 가능합니다.
        </p>
      </article>

       {/* 116.95㎡ Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <header className="flex items-center justify-between px-6 md:px-0 mb-4">
          <h3 className="text-xl font-light">142.95㎡ 216세대</h3>
          <button className="px-3 py-0.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            준비중
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-[4/3] overflow-hidden">
          <img
            src={il59aImage}
            alt="B type 1"
            className="w-full h-full object-cover"
          />
           </div>
          <img
            src={il59aImage}
            alt="B type 2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 px-6 md:px-0 text-base font-light leading-6 text-gray-600">
          넓게 확장된 Living Room과 다이닝, 주방이 자연스럽게 연결된 구조로, 가족이 함께하는 시간을 더욱 풍요롭게 만들어 줍니다.
대면형 주방과 여유 있는 동선 설계를 통해 실용성과 개방감을 동시에 확보하였으며, 전면에 펼쳐지는 조망을 거실과 다이닝 공간에서 함께 누릴 수 있습니다.
부부침실에는 별도의 드레스룸과 욕실을 배치하여 프라이버시를 강화하고, 자녀를 위한 독립적인 침실 구성으로 가족 모두의 생활 만족도를 높였습니다.
여유로운 수납과 공간 활용이 가능한 설계로, 중대형 평형의 가치를 충분히 느낄 수 있는 세대입니다.
        </p>
      </article>

      {/* 142.95㎡ Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <header className="flex items-center justify-between px-6 md:px-0 mb-4">
          <h3 className="text-xl font-light">165.95㎡ 432세대</h3>
          <button className="px-3 py-0.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            준비중
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-[4/3] overflow-hidden">
          <img
            src={il59aImage}
            alt="B type 1"
            className="w-full h-full object-cover"
          />
           </div>
          <img
            src={il59aImage}
            alt="B type 2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 px-6 md:px-0 text-base font-light leading-6 text-gray-600">
          한층 더 여유로운 Living Room과 Family Room을 중심으로, 가족 간의 소통과 개별 공간의 독립성을 동시에 고려한 평면입니다.
넓은 다이닝 공간과 주방은 홈파티 및 다양한 라이프스타일을 수용할 수 있도록 계획되었으며, 파노라마 조망을 극대화한 창 배치로 공간의 품격을 높였습니다.
각 침실에는 드레스룸 또는 충분한 수납공간을 마련하여 실용성을 강화하고, 부부 공간은 프라이빗한 동선으로 구성하여 호텔과 같은 안락함을 제공합니다.
공간의 깊이와 균형을 갖춘 프리미엄 라이프를 실현할 수 있는 평면입니다.
        </p>
      </article>

      {/* 165.95㎡ Section */}
      <article className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[130px]">
        <header className="flex items-center justify-between px-6 md:px-0 mb-4">
          <h3 className="text-xl font-light">305.95㎡ 32세대</h3>
          <button className="px-3 py-0.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            준비중
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-[4/3] overflow-hidden">
          <img
            src={il59aImage}
            alt="B type 1"
            className="w-full h-full object-cover"
          />
           </div>
          <img
            src={il59aImage}
            alt="B type 2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 px-6 md:px-0 text-base font-light leading-6 text-gray-600">
          최상위 평형으로서, 압도적인 공간감과 품격 있는 라이프스타일을 완성하는 프리미엄 주거 공간입니다.
광폭 Living Room과 독립적인 Family Room, 여유로운 다이닝 공간이 유기적으로 연결되어 대형 평형만의 웅장한 개방감을 제공합니다.
부부침실은 대형 드레스룸과 고급 욕실을 포함한 마스터존으로 계획되었으며, 각 침실 또한 독립성과 프라이버시를 극대화한 구조로 설계되었습니다.
탁월한 조망과 채광, 그리고 여유로운 수납과 공간 구성으로, 차별화된 주거 가치를 경험할 수 있는 최상급 세대입니다.
        </p>
      </article>
      
    </div>
  );
}

function PremiumTab({
  selectedGraph,
  setSelectedGraph,
}: {
  selectedGraph: string;
  setSelectedGraph: (value: string) => void;
}) {
  type EditableField = 'guide' | 'participants' | 'place' | 'note';

  type ScheduleRow = {
    id: string;
    year: string;
    schedule_text: string;
    sort_order: number;
    created_at?: string;
    updated_at?: string;

    guide_title: string;
    guide_content: string;

    participants_title: string;
    participants_content: string;

    place_title: string;
    place_content: string;

    note_title: string;
    note_content: string;
  };

  const fieldLabelMap: Record<EditableField, string> = {
    guide: '안내',
    participants: '참여인원',
    place: '장소',
    note: '비고',
  };

  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // 기존 수정 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ScheduleRow | null>(null);
  const [selectedField, setSelectedField] = useState<EditableField>('guide');
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');

  // 일정 추가 모달
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [newScheduleText, setNewScheduleText] = useState('');
  const [newSortOrder, setNewSortOrder] = useState('');

  useEffect(() => {
    fetchCurrentUser();
    fetchSchedules();
  }, []);

  const toAdminEmail = (value: string) => `${value.replace(/\D/g, '')}@admin.local`;

  const fetchCurrentUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    setUser(user);

    const adminPhones = ['01030058829']; 
    const adminEmails = adminPhones.map(toAdminEmail);
    const currentEmail = user.email?.trim().toLowerCase() ?? '';

    const matchedAdmin = adminEmails.some(
      (email) => email.toLowerCase() === currentEmail
    );

    setIsAdmin(matchedAdmin);
  };

  const fetchSchedules = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('project_schedule')
      .select('*')
      .order('year', { ascending: true })
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('project_schedule error:', error);
      alert('사업 일정 데이터를 불러오지 못했습니다.');
      setRows([]);
    } else {
      setRows((data as ScheduleRow[]) ?? []);
    }

    setLoading(false);
  };

  const groupedRows = rows.reduce<Record<string, ScheduleRow[]>>((acc, row) => {
    if (!acc[row.year]) acc[row.year] = [];
    acc[row.year].push(row);
    return acc;
  }, {});

  const openEditModal = (row: ScheduleRow, field: EditableField) => {
    setSelectedRow(row);
    setSelectedField(field);

    if (field === 'guide') {
      setTitleValue(row.guide_title ?? '');
      setContentValue(row.guide_content ?? '');
    }
    if (field === 'participants') {
      setTitleValue(row.participants_title ?? '');
      setContentValue(row.participants_content ?? '');
    }
    if (field === 'place') {
      setTitleValue(row.place_title ?? '');
      setContentValue(row.place_content ?? '');
    }
    if (field === 'note') {
      setTitleValue(row.note_title ?? '');
      setContentValue(row.note_content ?? '');
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
    setTitleValue('');
    setContentValue('');
  };

  const handleSave = async () => {
    if (!selectedRow) return;

    if (!isAdmin) {
      alert('관리자만 수정할 수 있습니다.');
      return;
    }

    setSaving(true);

    let payload: Partial<ScheduleRow> = {};

    if (selectedField === 'guide') {
      payload = {
        guide_title: titleValue,
        guide_content: contentValue,
      };
    }

    if (selectedField === 'participants') {
      payload = {
        participants_title: titleValue,
        participants_content: contentValue,
      };
    }

    if (selectedField === 'place') {
      payload = {
        place_title: titleValue,
        place_content: contentValue,
      };
    }

    if (selectedField === 'note') {
      payload = {
        note_title: titleValue,
        note_content: contentValue,
      };
    }

    const { data, error } = await supabase
      .from('project_schedule')
      .update(payload)
      .eq('id', selectedRow.id)
      .select()
      .single();

    setSaving(false);

    if (error) {
      console.error(error);
      alert('저장에 실패했습니다.');
      return;
    }

    setRows((prev) =>
      prev
        .map((row) => (row.id === selectedRow.id ? (data as ScheduleRow) : row))
        .sort((a, b) => {
          if (a.year !== b.year) return Number(a.year) - Number(b.year);
          return a.sort_order - b.sort_order;
        })
    );

    closeModal();
  };

  const openAddModal = () => {
    if (!isAdmin) {
      alert('관리자만 일정을 추가할 수 있습니다.');
      return;
    }

    const maxSortOrder = rows.length > 0 ? Math.max(...rows.map((r) => r.sort_order)) : 0;

    setNewYear('');
    setNewScheduleText('');
    setNewSortOrder(String(maxSortOrder + 1));
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewYear('');
    setNewScheduleText('');
    setNewSortOrder('');
  };

  const handleAddSchedule = async () => {
    if (!isAdmin) {
      alert('관리자만 일정을 추가할 수 있습니다.');
      return;
    }

    if (!newYear.trim()) {
      alert('연도를 입력하세요.');
      return;
    }

    if (!newScheduleText.trim()) {
      alert('일정을 입력하세요.');
      return;
    }

    const payload = {
      year: newYear.trim(),
      schedule_text: newScheduleText.trim(),
      sort_order: Number(newSortOrder) || 0,

      guide_title: '',
      guide_content: '',

      participants_title: '',
      participants_content: '',

      place_title: '',
      place_content: '',

      note_title: '',
      note_content: '',
    };

    setSaving(true);

    const { data, error } = await supabase
      .from('project_schedule')
      .insert(payload)
      .select()
      .single();

    setSaving(false);

    if (error) {
      console.error(error);
      alert('일정 추가에 실패했습니다.');
      return;
    }

    setRows((prev) =>
      [...prev, data as ScheduleRow].sort((a, b) => {
        if (a.year !== b.year) return Number(a.year) - Number(b.year);
        return a.sort_order - b.sort_order;
      })
    );

    closeAddModal();
  };

  const renderEditableCell = (
  row: ScheduleRow,
  field: EditableField
) => {
  let title = '';
  let content = '';

  if (field === 'guide') {
    title = row.guide_title ?? '';
    content = row.guide_content ?? '';
  }
  if (field === 'participants') {
    title = row.participants_title ?? '';
    content = row.participants_content ?? '';
  }
  if (field === 'place') {
    title = row.place_title ?? '';
    content = row.place_content ?? '';
  }
  if (field === 'note') {
    title = row.note_title ?? '';
    content = row.note_content ?? '';
  }

  const hasValue = title || content;

  return (
    <td
      className="px-4 py-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => openEditModal(row, field)}
      title="클릭하여 내용 확인"
    >
      {hasValue ? (
        <span className="text-sm text-gray-800">
          {title || '(제목 없음)'}
        </span>
      ) : (
        <span className="text-gray-300">-</span>
      )}
    </td>
  );
};

  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300"></span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">INFORMATION</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">PREMIUM</h5>
        </div>
      </nav>

      <article className="relative pt-[90px]">
        <div className="absolute inset-x-0 top-[110px] h-[266px] bg-gray-50 -z-10" />

        <div className="max-w-[1200px] mx-auto px-0 md:px-6 pt-[50px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-11">
            <figure className="w-full md:w-[400px] h-[246px] flex-shrink-0">
              <img
                src={is1Image}
                alt="Premium"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 px-6 md:px-0 md:py-[50px]">
              <header className="mb-[18px]">
                <p className="text-gray-400 text-base font-light mb-1">Demand value rise</p>
                <h3 className="text-[30px] font-light leading-[42px]">FIRST YOOL</h3>
              </header>
              <div className="space-y-[14px]">
                <p className="text-lg font-light leading-7 text-gray-600">
                  퍼스트율은 첫번째가 갖는 상징적인 프리미엄을 가지는 특권을 행사합니다. <br />
                  분당의 검증된 생활 인프라 위에 희소성 높은 하이엔드 주택 상품성이 더해져, 상징성과 <br />실수요 매력이 증가합니다.
                  FIRST YOOL 프리미엄 하이퍼엔드 주택
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="max-w-[1200px] mx-auto px-6 pt-[150px]">
        <header className="flex items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-xl font-medium">사업 진행 안내 일정</h3>
            <p className="text-sm text-gray-400 text-base font-light">(날자는 변경될 수 있습니다.)</p>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
            >
              일정 추가
            </button>
          )}
        </header>

        <div className="font-light overflow-x-auto -mx-6 px-6">
          <table className="w-full border-t-2 border-black min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-4 py-3 text-center font-light w-[120px]">연도</th>
                <th className="px-4 py-3 text-center font-light w-[280px]">일정</th>
                <th className="px-4 py-3 text-center font-light">안내</th>
                <th className="px-4 py-3 text-center font-light">참여인원</th>
                <th className="px-4 py-3 text-center font-light">장소</th>
                <th className="px-4 py-3 text-center font-light">비고</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    불러오는 중...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    등록된 일정이 없습니다.
                  </td>
                </tr>
              ) : (
                Object.entries(groupedRows).map(([year, yearRows]) =>
                  yearRows.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-200 bg-white">
                      {index === 0 && (
                        <td
                          rowSpan={yearRows.length}
                          className="bg-gray-50 px-4 py-3 text-center border-b border-gray-300 align-middle"
                        >
                          {year}
                        </td>
                      )}

                      <td className="px-4 py-3 text-center">{row.schedule_text}</td>
                      {renderEditableCell(row, 'guide')}
                      {renderEditableCell(row, 'participants')}
                      {renderEditableCell(row, 'place')}
                      {renderEditableCell(row, 'note')}
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm font-light text-gray-500 mt-4">
          ※ 상기 추진일정 변경을 원하는 경우 재건축추진준비위원회로 연락 주시기 바랍니다.
          토지등소유자 과반 동의 후 변경 가능합니다.
        </p>
      </article>

      {/* 기존 수정 모달 */}
      {modalOpen && selectedRow && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-[1200px] h-[85vh] rounded-lg bg-white shadow-xl flex flex-col">
            <div className="px-6 py-5 border-b border-gray-200 shrink-0">
              <h4 className="text-lg font-medium">
                {fieldLabelMap[selectedField]}
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                {selectedRow.year} / {selectedRow.schedule_text || '-'}
              </p>
            </div>

            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm text-gray-500 mb-2">제목</label>
                <input
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  readOnly={!isAdmin}
                  placeholder="제목을 입력하세요."
                  className={`w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black ${
                    !isAdmin ? 'bg-gray-50 text-gray-600' : ''
                  }`}
                />
              </div>

              <div className="flex flex-col flex-1 min-h-0">
                <label className="block text-sm text-gray-500 mb-2">내용</label>
                <textarea
                  value={contentValue}
                  onChange={(e) => setContentValue(e.target.value)}
                  readOnly={!isAdmin}
                  placeholder="내용을 입력하세요."
                  className={`w-full flex-1 min-h-[480px] h-full border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-black ${
                    !isAdmin ? 'bg-gray-50 text-gray-600' : ''
                  }`}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center gap-3">
              <p className="text-xs text-gray-400">
                {isAdmin ? '관리자 수정 가능' : '읽기 전용'}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                >
                  닫기
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
                  >
                    {saving ? '저장 중...' : '저장'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 일정 추가 모달 */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-[620px] rounded-lg bg-white shadow-xl">
            <div className="px-6 py-5 border-b border-gray-200">
              <h4 className="text-lg font-medium">일정 추가</h4>
              <p className="text-sm text-gray-400 mt-1">
                연도와 일정을 입력하면 표에 새 줄이 추가됩니다.
              </p>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">연도</label>
                <input
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="예: 2026"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">일정</label>
                <input
                  value={newScheduleText}
                  onChange={(e) => setNewScheduleText(e.target.value)}
                  placeholder="예: 10월 20일 / 주민 설명회"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">정렬순서</label>
                <input
                  type="number"
                  value={newSortOrder}
                  onChange={(e) => setNewSortOrder(e.target.value)}
                  placeholder="예: 10"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <p className="text-xs text-gray-400 mt-2">
                  같은 연도 안에서 표시 순서를 조정할 때 사용합니다.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeAddModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleAddSchedule}
                disabled={saving}
                className="px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
              >
                {saving ? '저장 중...' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

 function DataRoomTab() {
  type FileRow = {
    id: string;
    title: string;
    description: string | null;
    file_name: string;
    file_path: string;
    file_size: number | null;
    created_at: string;
    created_by: string | null;
  };

  const [rows, setRows] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toAdminEmail = (value: string) => `${value.replace(/\D/g, '')}@admin.local`;

  useEffect(() => {
    fetchCurrentUser();
    fetchFiles();
  }, []);

  const fetchCurrentUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    setUser(user);

    const adminPhones = ['01030058829'];
    const adminEmails = adminPhones.map(toAdminEmail);
    const currentEmail = user.email?.trim().toLowerCase() ?? '';

    const matchedAdmin = adminEmails.some(
      (email) => email.toLowerCase() === currentEmail
    );

    setIsAdmin(matchedAdmin);
  };

  const fetchFiles = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('board_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      alert('자료 목록을 불러오지 못했습니다.');
      setRows([]);
    } else {
      setRows((data as FileRow[]) ?? []);
    }

    setLoading(false);
  };

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return '-';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
  };

  const handleUpload = async () => {
    if (!isAdmin) {
      alert('관리자만 업로드할 수 있습니다.');
      return;
    }

    if (!selectedFile) {
      alert('파일을 선택하세요.');
      return;
    }

    if (!title.trim()) {
      alert('자료 제목을 입력하세요.');
      return;
    }

    try {
      setUploading(true);

      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `public/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, selectedFile, {
          upsert: false,
        });

      if (uploadError) {
  console.error('uploadError:', uploadError);
  alert(`스토리지 업로드 실패: ${uploadError.message}`);
  return;
}

      const { data: inserted, error: insertError } = await supabase
        .from('board_files')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          file_name: selectedFile.name,
          file_path: filePath,
          file_size: selectedFile.size,
          created_by: user?.id ?? null,
        })
        .select()
        .single();

      if (insertError) {
  console.error('insertError:', insertError);
  alert(`DB 저장 실패: ${insertError.message}`);
  return;
}

      setRows((prev) => [inserted as FileRow, ...prev]);
      setTitle('');
      setDescription('');
      setSelectedFile(null);

      const fileInput = document.getElementById('file-upload-input') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';

      alert('자료가 업로드되었습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (row: FileRow) => {
    if (!user) {
      alert('로그인한 회원만 다운로드할 수 있습니다.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('site-images')
      .createSignedUrl(row.file_path, 60);

    if (error || !data?.signedUrl) {
      console.error(error);
      alert('다운로드 링크 생성에 실패했습니다.');
      return;
    }

    window.open(data.signedUrl, '_blank');
  };

  return (
    <div className="pb-[200px]">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">FIRST YOOL</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">INFORMATION</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">자료실</h5>
        </div>
      </nav>

      <article className="max-w-[1200px] mx-auto px-6 pt-[90px]">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium">자료실</h3>
            <p className="text-sm text-gray-400 font-light">
              관리자 업로드 / 로그인 회원 다운로드
            </p>
          </div>
        </header>

        {isAdmin && (
          <div className="border border-gray-200 rounded-lg p-6 mb-10 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="자료 제목"
                className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white"
              />
              <input
                type="file"
                id="file-upload-input"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white"
              />
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="자료 설명"
              className="w-full mt-4 border border-gray-300 rounded-md px-4 py-3 bg-white min-h-[120px]"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
              >
                {uploading ? '업로드 중...' : '자료 업로드'}
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-t-2 border-black min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-4 py-3 text-center font-light">제목</th>
                <th className="px-4 py-3 text-center font-light">설명</th>
                <th className="px-4 py-3 text-center font-light">파일명</th>
                <th className="px-4 py-3 text-center font-light">용량</th>
                <th className="px-4 py-3 text-center font-light">등록일</th>
                <th className="px-4 py-3 text-center font-light">다운로드</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    불러오는 중...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    로그인 후 자료실 이용이 가능합니다.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 bg-white">
                    <td className="px-4 py-3 text-center">{row.title}</td>
                    <td className="px-4 py-3 text-center">{row.description || '-'}</td>
                    <td className="px-4 py-3 text-center">{row.file_name}</td>
                    <td className="px-4 py-3 text-center">{formatBytes(row.file_size)}</td>
                    <td className="px-4 py-3 text-center">
                      {new Date(row.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleDownload(row)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        다운로드
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}