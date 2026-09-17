import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Mail,
  Edit3,
  Plus,
  Send,
  Search,
  Paperclip,
  MessageCircle,
  Users,
  Lock,
  X,
} from 'lucide-react';
import brandBg from '../../assets/images/main-6.jpg';
import { supabase } from '../../lib/supabase';

type QuestionRow = {
  id: number;
  nickname: string;
  phone: string;
  content: string;
  created_at: string | null;
  reply_content: string | null;
  reply_created_at: string | null;
};

export function ContactInquiry() {
  const [activeTab, setActiveTab] = useState('inquiry');
  const tabSentinelRef = useRef<HTMLDivElement | null>(null);
  const tabSectionRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTabBar, setShowMobileTabBar] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const footer = document.querySelector('footer');

    if (footer instanceof HTMLElement) {
      footer.style.display = 'none';
    }

    return () => {
      if (footer instanceof HTMLElement) {
        footer.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      { threshold: 0 }
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

  useEffect(() => {
    if (!isMobile || activeTab !== 'development') {
      setShowMobileTabBar(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = currentY - lastScrollYRef.current;

          if (currentY <= 80) {
            setShowMobileTabBar(true);
          } else if (diff > 6) {
            setShowMobileTabBar(false);
          } else if (diff < -6) {
            setShowMobileTabBar(true);
          }

          lastScrollYRef.current = currentY > 0 ? currentY : 0;
          ticking = false;
        });

        ticking = true;
      }
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    if (tab !== 'development') {
      setShowMobileTabBar(true);
    }

    const isMobileView = window.innerWidth < 768;
    const headerOffset = isMobileView && tab === 'development' ? 56 : 100;

    const tabTop =
      (tabSectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;

    window.scrollTo({
      top: Math.max(tabTop - headerOffset, 0),
      behavior: 'smooth',
    });
  };

  const shouldAutoHideTabBar = isMobile && activeTab === 'development';

  return (
    <div className="relative w-full min-h-screen">
      <section className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${brandBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <h2 className="text-white text-[38px] font-light leading-[42px]">소통방</h2>
        </div>
      </section>

      <div ref={tabSectionRef} className="relative z-10 bg-white">
        <div
          ref={tabSentinelRef}
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
        />

        <div
          className={`sticky z-40 bg-white border-b border-gray-200 transition-all duration-300 ${
            shouldAutoHideTabBar
              ? showMobileTabBar
                ? 'top-0'
                : '-top-24'
              : 'top-0'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex font-light gap-16 pt-8">
              <button
                onClick={() => handleTabChange('inquiry')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'inquiry' ? 'text-black' : 'text-gray-400'
                }`}
              >
                문의하기
                {activeTab === 'inquiry' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>

              <button
                onClick={() => handleTabChange('development')}
                className={`pb-6 text-lg transition-colors relative ${
                  activeTab === 'development' ? 'text-black' : 'text-gray-400'
                }`}
              >
                소통방
                {activeTab === 'development' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'inquiry' && <InquiryTab />}
        {activeTab === 'development' && <DevelopmentTab />}
      </div>
    </div>
  );
}

function InquiryTab() {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySaving, setReplySaving] = useState(false);

  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({
    email: '',
    password: '',
  });
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);
  const [pendingReplyQuestion, setPendingReplyQuestion] = useState<QuestionRow | null>(null);

  useEffect(() => {
    fetchQuestions();
    fetchCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchCurrentUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user);

    const adminByRole = user?.app_metadata?.role === 'admin';
    
    setIsAdmin(Boolean(adminByRole));
  };

  const fetchQuestions = async () => {
    setFetching(true);

    const { data, error } = await supabase
      .from('contact_questions')
      .select(
        `
        id,
        nickname,
        phone,
        content,
        created_at,
        reply_content,
        reply_created_at
      `
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('문의 목록 조회 오류:', error.message);
      setQuestions([]);
      setFetching(false);
      return;
    }

    setQuestions((data as QuestionRow[]) || []);
    setFetching(false);
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.content.trim()) {
      alert('이름, 연락처, 문의내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('contact_questions').insert([
      {
        nickname: form.name.trim(),
        phone: form.phone.trim(),
        content: form.content.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert('문의 등록 중 오류가 발생했습니다: ' + error.message);
      return;
    }

    alert('문의가 등록되었습니다.');
    setForm({
      name: '',
      phone: '',
      content: '',
    });

    fetchQuestions();
  };

  const openReplyEditor = (question: QuestionRow) => {
    if (isAdmin) {
      setReplyingId(question.id);
      setReplyText(question.reply_content || '');
      return;
    }

    alert('답변은 관리자만 할 수 있습니다.');
    setPendingReplyQuestion(question);
    setShowAdminLoginModal(true);
  };

  const cancelReplyEditor = () => {
    setReplyingId(null);
    setReplyText('');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminLoginForm.email.trim() || !adminLoginForm.password.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setAdminLoginLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminLoginForm.email.trim(),
      password: adminLoginForm.password,
    });

    setAdminLoginLoading(false);

    if (error) {
      alert('관리자 로그인에 실패했습니다: ' + error.message);
      return;
    }

    const user = data.user;
    const adminByRole = user?.app_metadata?.role === 'admin';
    const passed = Boolean(adminByRole);

    if (!passed) {
      alert('관리자 계정이 아닙니다.');
      await supabase.auth.signOut();
      return;
    }

    setCurrentUser(user);
    setIsAdmin(true);
    setShowAdminLoginModal(false);
    setAdminLoginForm({ email: '', password: '' });

    if (pendingReplyQuestion) {
      setReplyingId(pendingReplyQuestion.id);
      setReplyText(pendingReplyQuestion.reply_content || '');
      setPendingReplyQuestion(null);
    }
  };

  const handleCloseAdminModal = () => {
    setShowAdminLoginModal(false);
    setAdminLoginForm({ email: '', password: '' });
    setPendingReplyQuestion(null);
  };

  const handleSaveReply = async (questionId: number) => {
    if (!isAdmin) {
      alert('관리자만 답변할 수 있습니다.');
      return;
    }

    if (!replyText.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }

    setReplySaving(true);

    const { error } = await supabase
      .from('contact_questions')
      .update({
        reply_content: replyText.trim(),
        reply_created_at: new Date().toISOString(),
      })
      .eq('id', questionId);

    setReplySaving(false);

    if (error) {
      alert('답변 저장 중 오류가 발생했습니다: ' + error.message);
      return;
    }

    alert('답변이 저장되었습니다.');
    setReplyingId(null);
    setReplyText('');
    fetchQuestions();
  };

  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-16 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-light text-gray-900">문의하기</h3>
              <p className="text-sm text-gray-500 mt-2">
                주민이 남긴 문의와 관리자 답변은 이 페이지에서 함께 공개됩니다.
              </p>
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">이름</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="빌라명 동.호수 성명을 입력해주세요"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">연락처</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="01012345678"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">문의내용</label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="문의하실 내용을 입력해주세요."
                  className="w-full p-4 border border-gray-300 rounded-lg resize-y min-h-[160px] focus:outline-none"
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto md:min-w-[180px] h-12 rounded-lg bg-black text-white px-8 disabled:opacity-60"
              >
                {loading ? '등록 중...' : '문의 등록'}
              </button>
            </form>
          </div>

          {fetching ? (
            <div className="text-center py-16 text-gray-500">
              문의 목록을 불러오는 중입니다.
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                등록된 문의가 없습니다
              </h3>
              <p className="text-gray-600">첫 문의를 남겨보세요.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question) => {
                const isEditing = replyingId === question.id;

                return (
                  <div
                    key={question.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm"
                  >
                    <div className="p-2 border-b border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-midium flex-shrink-0 mt-1">
                          {(question.nickname || '문').slice(0, 1)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <h4 className="font-midium text-gray-900 truncate">
                                {question.nickname || '익명'}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {question.created_at
                                  ? new Date(question.created_at).toLocaleDateString()
                                  : ''}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => openReplyEditor(question)}
                              className="shrink-0 px-4 h-9 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
                            >
                              답변
                            </button>
                          </div>

                          <p className="text-gray-800 font-light leading-relaxed whitespace-pre-wrap">
                            {question.content}
                          </p>
                        </div>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-light text-gray-900 mb-2">
                              관리자 답변 작성
                            </p>
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="답변 내용을 입력해주세요."
                              rows={5}
                              className="w-full p-4 border border-gray-300 rounded-lg resize-y min-h-[140px] focus:outline-none bg-white"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => handleSaveReply(question.id)}
                              disabled={replySaving}
                              className="px-5 h-11 rounded-lg bg-black text-white disabled:opacity-60"
                            >
                              {replySaving ? '저장 중...' : '답변 저장'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelReplyEditor}
                              className="px-5 h-11 rounded-lg border border-gray-300 bg-white text-gray-700"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : question.reply_content ? (
                      <div className="p-2 bg-gray-50 rounded-b-2xl">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-midium flex-shrink-0 mt-1">
                            A
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-midium text-gray-900">재건축추진준비위원회</span>
                              <span className="text-xs text-gray-500">
                                {question.reply_created_at
                                  ? new Date(question.reply_created_at).toLocaleDateString()
                                  : ''}
                              </span>
                            </div>
                            <p className="text-gray-800 font-light leading-relaxed bg-white p-4 rounded-xl border border-gray-200 whitespace-pre-wrap">
                              {question.reply_content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                        <div className="text-center py-8 text-gray-500">
                          <Edit3 className="w-10 h-10 mx-auto mb-3 opacity-50" />
                          <p>아직 답변이 없습니다.</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showAdminLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">관리자 로그인</h3>
                <p className="text-sm text-gray-500 mt-1">
                  답변은 관리자만 작성할 수 있습니다.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseAdminModal}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm mb-2">관리자 이메일</label>
                <input
                  type="email"
                  value={adminLoginForm.email}
                  onChange={(e) =>
                    setAdminLoginForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="관리자 이메일을 입력하세요"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">비밀번호</label>
                <input
                  type="password"
                  value={adminLoginForm.password}
                  onChange={(e) =>
                    setAdminLoginForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="비밀번호를 입력하세요"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={adminLoginLoading}
                className="w-full h-12 rounded-lg bg-black text-white disabled:opacity-60"
              >
                {adminLoginLoading ? '로그인 중...' : '관리자 로그인'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DevelopmentTab() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
    fetchMessages();

    const channel = supabase
      .channel('chat_messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          setMessages((prev) => {
            const exists = prev.some((item) => item.id === payload.new.id);
            if (exists) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user);
  };

  const fetchMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('chat_messages')
      .select('id, created_at, user_id, unit_number, display_name, message')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('메시지 조회 오류:', error.message);
      setMessages([]);
      setLoading(false);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  };

  const isAdmin = currentUser?.app_metadata?.role === 'admin';
const villaName = currentUser?.user_metadata?.villa_name?.trim() ?? '';
const unitNumber = currentUser?.user_metadata?.unit_number?.trim() ?? '';

const displayName = isAdmin
  ? '관리자'
  : `${villaName}${unitNumber}`.trim() || '미등록 세대';

  const formatKoreanTime = (value?: string) => {
    if (!value) return '';

    return new Date(value).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!currentUser) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    const { error } = await supabase.from('chat_messages').insert([
  {
    user_id: currentUser.id,
    unit_number: isAdmin ? null : unitNumber || null,
    display_name: displayName,
    message: message.trim(),
  },
]);

    if (error) {
      alert('메시지 등록 중 오류가 발생했습니다: ' + error.message);
      return;
    }

    setMessage('');
  };

  const participantCount = useMemo(() => {
    return new Set(messages.map((msg) => msg.unit_number)).size;
  }, [messages]);

  return (
    <div className="py-10">
      <nav className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex font-light items-center gap-2 text-xs justify-end">
          <span className="text-gray-300">HOME</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">문의하기</span>
          <span className="text-gray-300">/</span>
          <h5 className="text-gray-600 font-light">소통방</h5>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-0 md:px-6">
        <div className="h-[780px] md:h-[820px] bg-white rounded-[28px] overflow-hidden border border-gray-200 flex flex-col">
          <header className="px-5 md:px-7 py-5 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-medium text-black">분당동2 30구역 통합재건축 소통방</h4>
                <p className="text-sm text-gray-500 mt-1">
                  주민 전용 실시간 소통 공간입니다.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                참여 인원 {participantCount}명
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto min-h-0 bg-[#b7d7f4] px-4 md:px-6 py-6">
            <div className="max-w-[760px] mx-auto space-y-4">
              <div className="text-center">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/70 text-[11px] text-gray-600">
                  분당동2 30구역 통합재건축 소통방
                </span>
              </div>

              {loading ? (
                <div className="text-center text-sm text-gray-600 py-10">
                  대화 내용을 불러오는 중입니다.
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-sm text-gray-600 py-10">
                  아직 등록된 대화가 없습니다.
                </div>
              ) : (
                messages.map((msg) => {
                  const mine = msg.user_id === currentUser?.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        mine ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`max-w-[80%] ${mine ? 'order-1' : ''}`}>
                        <div
                          className={`mb-1 flex items-center gap-2 px-1 text-xs text-gray-700 ${
                            mine ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="font-medium">
                            {msg.display_name || msg.unit_number || '주민대표단'}
                          </span>
                          <span className="text-gray-500">
                            {formatKoreanTime(msg.created_at)}
                          </span>
                        </div>

                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-6 shadow-sm ${
                            mine
                              ? 'bg-[#FEE500] text-black rounded-br-md'
                              : 'bg-white text-gray-900 rounded-bl-md'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-100 bg-white px-4 md:px-6 py-4">
            <div className="max-w-[760px] mx-auto flex items-end gap-3">
              <div className="flex-1 rounded-[24px] border border-gray-300 bg-white px-4 py-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`${displayName} 님으로 메시지를 보냅니다.`}
                  rows={2}
                  className="w-full resize-none outline-none text-sm leading-6"
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}