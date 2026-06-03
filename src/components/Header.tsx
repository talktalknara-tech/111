import { useState, useEffect } from 'react';
import { Phone, Menu, X, MessageSquare, Wrench } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
}

export default function Header({ onScrollToSection, onOpenInquiry, onOpenAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'hero', label: '홈' },
    { id: 'services', label: '전문서비스' },
    { id: 'process', label: '진행절차' },
    { id: 'inquiry', label: '서비스문의' },
    { id: 'faq', label: '자주묻는질문' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="app_header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3'
          : 'bg-gradient-to-b from-black/50 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className={`p-2 rounded-xl transition-all ${
              isScrolled ? 'bg-brand-600 text-white shadow-brand-100 shadow-lg' : 'bg-white text-brand-700 shadow-md'
            }`}>
              <Wrench className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold font-sans tracking-wider ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                관통사들
              </span>
              <span className={`text-[10px] font-medium tracking-tight ${
                isScrolled ? 'text-brand-600' : 'text-brand-200'
              }`}>
                하수구·변기·싱크대·종합설비
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-brand-500 cursor-pointer ${
                  isScrolled ? 'text-gray-600' : 'text-gray-100 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Hidden Admin Access Trigger for Client Admin */}
            <button
              onClick={onOpenAdmin}
              className={`text-xs px-2 py-1 rounded border transition-all cursor-pointer ${
                isScrolled 
                  ? 'border-gray-200 text-gray-400 hover:text-brand-600 hover:border-brand-300' 
                  : 'border-white/20 text-white/40 hover:text-white hover:border-white/50'
              }`}
            >
              관리자 모드
            </button>
          </nav>

          {/* Call and Actions CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:010-6333-9873"
              id="header_call_btn"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="h-4 w-4 shrink-0 fill-current" />
              <span>010-6333-9873</span>
            </a>
            <button
              onClick={onOpenInquiry}
              id="header_inquiry_btn"
              className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>무료 간편 견적</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="tel:010-6333-9873"
              className={`p-2 rounded-xl transition-colors ${
                isScrolled ? 'bg-brand-50 text-brand-700' : 'bg-white/10 text-white'
              }`}
            >
              <Phone className="h-5 w-5 fill-current" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all ${
                isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/10 text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 animate-fade-in-up py-4 px-6 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left py-2.5 text-base font-semibold text-gray-700 border-b border-gray-50 active:text-brand-600"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col space-y-2">
            <a
              href="tel:010-6333-9873"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-center shadow-sm"
            >
              <Phone className="h-5 w-5 fill-current" />
              <span>전화연결 (010-6333-9873)</span>
            </a>
            <a
              href="sms:010-6333-9873?body=안녕하세요 관통사들! 하수구·변기·싱크대·종합설비 빠른 상담 및 출동 문의드립니다."
              className="flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold text-center shadow-md cursor-pointer"
            >
              <MessageSquare className="h-5 w-5" />
              <span>문자 상담 / 바로 보내기</span>
            </a>
            <button
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="py-1 text-center text-xs text-gray-400 font-medium"
            >
              관리자 모드 실행
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
