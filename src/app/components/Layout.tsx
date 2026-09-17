import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Footer } from './Footer';
import logoWhite from '../../assets/images/logowhite.png';
import logoBlue from '../../assets/images/logo.png';
import { supabase } from '../../lib/supabase';

type Role = 'admin' | 'member' | null;

interface Profile {
  id: string;
  role: Role;
  approved: boolean;
}

export function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const isHomePage = location.pathname === '/';
  const currentLogo =
    hoveredMenu !== null || isMenuOpen || isScrolled ? logoBlue : logoWhite;

  const isAdmin = profile?.role === 'admin' && profile?.approved === true;
  const isApprovedMember = profile?.role === 'member' && profile?.approved === true;
  const canAccessMembersMenu = isAdmin || isApprovedMember;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setHoveredMenu(null);
    setExpandedMobileMenu(null);
    setIsHeaderHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleTabHeaderStickyChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ hidden: boolean }>;
      setIsHeaderHidden(customEvent.detail.hidden);
    };

    window.addEventListener('tab-header-sticky-change', handleTabHeaderStickyChange as EventListener);

    return () => {
      window.removeEventListener('tab-header-sticky-change', handleTabHeaderStickyChange as EventListener);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (mounted) setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, role, approved')
        .eq('id', session.user.id)
        .single();

      if (!mounted) return;

      if (error || !data) {
        setProfile(null);
        return;
      }

      setProfile(data as Profile);
    };

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if (error) {
      alert('로그아웃 실패: ' + error.message);
      return;
    }

    setProfile(null);
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  const toggleMobileSubmenu = (index: number) => {
    setExpandedMobileMenu(expandedMobileMenu === index ? null : index);
  };

  return (
    <div className="relative w-full min-h-screen">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 border-b ${
          isHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          hoveredMenu !== null
            ? 'bg-white border-gray-200 h-[175px]'
            : isScrolled
            ? 'bg-white border-gray-200'
            : 'border-white/20 bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[100px] flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="block" onClick={() => setIsMenuOpen(false)}>
              <img
                src={currentLogo}
                alt="botton logo"
                className="h-[70px] w-auto object-contain"
              />
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 w-6 z-[60] relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span
              className={`h-0.5 w-full transition-all origin-center ${
                isMenuOpen
                  ? 'bg-black rotate-45 translate-y-2'
                  : hoveredMenu !== null || isScrolled
                  ? 'bg-black'
                  : 'bg-white'
              }`}
            />
            <span
              className={`h-0.5 w-full transition-all ${
                isMenuOpen ? 'opacity-0' : hoveredMenu !== null || isScrolled ? 'bg-black' : 'bg-white'
              }`}
            />
            <span
              className={`h-0.5 w-full transition-all origin-center ${
                isMenuOpen
                  ? 'bg-black -rotate-45 -translate-y-2'
                  : hoveredMenu !== null || isScrolled
                  ? 'bg-black'
                  : 'bg-white'
              }`}
            />
          </button>

          <nav className="hidden md:flex items-center gap-10">
            <div
              className="relative py-10"
              onMouseEnter={() => setHoveredMenu(0)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/firstyool"
                className={`text-center transition-colors ${
                  hoveredMenu !== null || isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                <span
                  className="block"
                  style={{ fontFamily: 'Gmarket Sans', fontWeight: '200', letterSpacing: '0.1em', fontSize: '15px' }}
                >
                  FIRST YOOL
                </span>
              </Link>

              {hoveredMenu === 0 && (
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-max">
                  <div className="flex gap-4 py-7 animate-fadeIn">
                    <Link to="/firstyool" className="text-gray-400 hover:text-black font-light transition-colors px-4">
                      BRAND
                    </Link>
                    <Link
                      to="/firstyool/gallery"
                      className="text-gray-400 hover:text-black font-light transition-colors px-4"
                    >
                      GALLERY
                    </Link>
                    <Link
                      to="/firstyool/information"
                      className="text-gray-400 hover:text-black font-light transition-colors px-4"
                    >
                      INFORMATION
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative py-10"
              onMouseEnter={() => setHoveredMenu(1)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={canAccessMembersMenu ? '/kirochada' : '/login'}
                className={`text-center transition-colors ${
                  hoveredMenu !== null || isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                <span
                  className="block"
                  style={{ fontFamily: 'Gmarket Sans', fontWeight: '200', letterSpacing: '0.2em', fontSize: '15px' }}
                >
                  기록하고.
                </span>
              </Link>

              {hoveredMenu === 1 && (
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-max">
                  <div className="flex gap-4 py-7 animate-fadeIn">
                    <Link
                      to={canAccessMembersMenu ? '/kirochada' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      가이드
                    </Link>
                    <Link
                      to={canAccessMembersMenu ? '/kirochada/gallery' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      예비사업시행자
                    </Link>
                    <Link
                      to={canAccessMembersMenu ? '/kirochada/information' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      주민제안
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative py-10"
              onMouseEnter={() => setHoveredMenu(3)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={canAccessMembersMenu ? '/contact/inquiry' : '/login'}
                className={`text-center transition-colors ${
                  hoveredMenu !== null || isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                <span
                  className="block"
                  style={{ fontFamily: 'Gmarket Sans', fontWeight: '200', letterSpacing: '0.1em', fontSize: '15px' }}
                >
                  함께해요.
                </span>
              </Link>

              {hoveredMenu === 3 && (
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-max">
                  <div className="flex gap-4 py-7 animate-fadeIn">
                    <Link
                      to={canAccessMembersMenu ? '/contact/inquiry' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      소통방
                    </Link>

                    <Link
                      to={canAccessMembersMenu ? '/contact/Agree' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      동의서
                    </Link>

                    <Link
                      to={canAccessMembersMenu ? '/contact/Activity' : '/login'}
                      className="text-gray-600 font-light hover:text-black transition-colors px-4"
                      style={{ fontFamily: 'Gmarket Sans', fontWeight: '100', letterSpacing: '0.1em', fontSize: '15px' }}
                    >
                      준비위활동
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <div className="relative py-10">
                <Link
                  to="/admin/codes"
                  className={`text-center transition-colors ${
                    hoveredMenu !== null || isScrolled ? 'text-black' : 'text-white'
                  }`}
                >
                  <span
                    className="block"
                    style={{
                      fontFamily: 'Gmarket Sans',
                      fontWeight: '200',
                      letterSpacing: '0.1em',
                      fontSize: '15px',
                    }}
                  >
                    재건축추진준비위원회
                  </span>
                </Link>
              </div>
            )}

            {profile && (
              <button
                onClick={handleLogout}
                className={`text-center transition-colors ${
                  hoveredMenu !== null || isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                <span
                  className="block"
                  style={{
                    fontFamily: 'Gmarket Sans',
                    fontWeight: '200',
                    letterSpacing: '0.1em',
                    fontSize: '15px',
                  }}
                >
                  로그아웃
                </span>
              </button>
            )}
          </nav>
        </div>

        {hoveredMenu !== null && (
          <div className="absolute top-[100px] left-0 right-0 h-px bg-gray-200 animate-expandWidth" />
        )}
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-4/5 bg-white z-50 transform transition-transform duration-300 md:hidden overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-28 pb-8 px-6">
          <nav className="space-y-6">
            <div>
              <button
                onClick={() => toggleMobileSubmenu(0)}
                className="w-full flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="text-left">
                  <p className="text-lg font-light mt-1">FIRST YOOL</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedMobileMenu === 0 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMobileMenu === 0 && (
                <div className="pl-4 pt-4 space-y-3 animate-fadeIn">
                  <Link
                    to="/firstyool"
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Brand
                  </Link>
                  <Link
                    to="/firstyool/gallery"
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/firstyool/information"
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Information
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleMobileSubmenu(1)}
                className="w-full flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="text-left">
                  <p className="text-lg font-light mt-1">기록하고.</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedMobileMenu === 1 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMobileMenu === 1 && (
                <div className="pl-4 pt-4 space-y-3 animate-fadeIn">
                  <Link
                    to={canAccessMembersMenu ? '/kirochada' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    가이드
                  </Link>
                  <Link
                    to={canAccessMembersMenu ? '/kirochada/gallery' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    예비사업시행자
                  </Link>
                  <Link
                    to={canAccessMembersMenu ? '/kirochada/information' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    주민제안
                  </Link>
                </div>
              )}
            </div>
          
            <div>
              <button
                onClick={() => toggleMobileSubmenu(2)}
                className="w-full flex items-center justify-between py-3 border-b border-gray-200"
              >
                <p className="text-lg font-light text-left">함께해요.</p>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedMobileMenu === 2 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMobileMenu === 2 && (
                <div className="pl-4 pt-4 space-y-3 animate-fadeIn">
                  <Link
                    to={canAccessMembersMenu ? '/contact/inquiry' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    소통방.
                  </Link>
                  <Link
                    to={canAccessMembersMenu ? '/contact/Agree' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    동의해 주세요.
                  </Link>
                  <Link
                    to={canAccessMembersMenu ? '/contact/activity' : '/login'}
                    className="block font-light text-gray-600 hover:text-black transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    조합활동
                  </Link>
                </div>
              )}
            </div>

            {isAdmin && (
              <div>
                <Link
                  to="/admin/codes"
                  className="block py-3 border-b border-gray-200 text-lg font-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  재건축추진준비위원회
                </Link>
              </div>
            )}

            {profile && (
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 border-b border-gray-200 text-lg font-light"
                >
                  로그아웃
                </button>
              </div>
            )}
          </nav>
        </div>
      </aside>

      <Outlet />

      {!isHomePage && <Footer />}
    </div>
  );
}
