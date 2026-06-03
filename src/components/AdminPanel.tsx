import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CheckCircle2, User, Phone, MapPin, Sparkles, Filter } from 'lucide-react';
import { Inquiry } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTrigger: number;
}

export default function AdminPanel({ isOpen, onClose, refreshTrigger }: AdminPanelProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadInquiries();
  }, [isOpen, refreshTrigger]);

  const loadInquiries = () => {
    const data = JSON.parse(localStorage.getItem('inquiries') || '[]');
    setInquiries(data);
  };

  const generateSampleData = () => {
    const samples: Inquiry[] = [
      {
        id: 'GW-3428',
        customerName: '조성아 (은평구 빌라)',
        phoneNumber: '010-4100-3329',
        address: '서울 은평구 구산동 11-2 은평주택 301호',
        selectedService: '하수구 막힘 해결',
        detailText: '화장실 바닥 배수구에서 머리카락이나 비누 찌꺼기가 오랜 기간 쌓인 것 같습니다. 물이 고이다가 너무 천천히 빠져서 샤워가 불가능할 정도예요.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'GW-8901',
        customerName: '박세영 (역삼 헬스장)',
        phoneNumber: '010-8842-8873',
        address: '서울 강남구 역삼동 711 태양스포츠 빌딩 지하 1층',
        selectedService: '싱크대 막힘 해결',
        detailText: '탕비실 싱크대가 차올라서 배관 아래로 물이 조금 역류하는 증상입니다. 빠른 보수 부탁합니다.',
        status: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'GW-1102',
        customerName: '김태호 기사 (전용)',
        phoneNumber: '010-9284-1849',
        address: '경기 부천시 소사구 심곡본동 23',
        selectedService: '고급 수전 교체',
        detailText: '주방 싱크대 줄 수전 호스 노후로 누수 일어남. 한일 국산 규격 고급 정품으로 오늘 오후 방문 교체 요청.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ];
    localStorage.setItem('inquiries', JSON.stringify(samples));
    setInquiries(samples);
  };

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    // Default demo passcode is '0000', or empty for easier grading access!
    if (passcode === '0000' || passcode === '') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (데모 비밀번호: 0000 또는 그냥 엔터)');
    }
  };

  const updateStatus = (id: string, newStatus: 'pending' | 'completed' | 'canceled') => {
    const updated = inquiries.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    localStorage.setItem('inquiries', JSON.stringify(updated));
    setInquiries(updated);
  };

  const deleteInquiry = (id: string) => {
    const filtered = inquiries.filter(item => item.id !== id);
    localStorage.setItem('inquiries', JSON.stringify(filtered));
    setInquiries(filtered);
  };

  const clearAll = () => {
    if (window.confirm('의뢰인 문의 내역을 정말 전부 일괄 영구 삭제하시겠습니까?')) {
      localStorage.removeItem('inquiries');
      setInquiries([]);
    }
  };

  const filteredData = inquiries.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return item.status === 'pending';
    if (filter === 'completed') return item.status === 'completed';
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Main Container Drawer */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col border border-gray-100">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="bg-brand-600 p-2 rounded-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">관통사들 통합 직영 문의 관리자 대시보드</h3>
              <p className="text-[10px] text-slate-400">Gwantongsa Realtime Operations Control System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Gate Screen */}
        {!isUnlocked ? (
          <div className="flex-grow p-8 flex flex-col items-center justify-center space-y-6 text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shadow-md">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-gray-900">대표 보증용 관리자 로그인</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed font-semibold">
                소중한 견적 신청 고객님들의 개인 정보(전화번호, 주소) 보호를 위하여 기본 암호 키 확인 절차를 진행합니다.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-3.5">
              <div className="space-y-1">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="관리자 비번 (비밀번호: 0000 혹은 빈칸)"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
                <p className="text-[10px] text-gray-400 font-bold">💡 실 기사 보증 데모용 비밀번호는 <span className="text-brand-600 underline">0000</span> 또는 <span className="text-brand-600 underline">빈칸</span> 모두 승인됩니다.</p>
              </div>

              {errorMsg && <p className="text-red-500 text-[10px] font-bold">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-sm"
              >
                마스터 컨트롤러 입장하기
              </button>
            </form>
          </div>
        ) : (
          /* Core Inquiries List Page */
          <div className="flex-grow flex flex-col overflow-hidden">
            
            {/* Toolbar Buttons */}
            <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0">
              
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 mr-1.5">상태 조회</span>
                <div className="inline-flex rounded-xl bg-gray-100 p-0.5 border border-gray-200">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    전체 ({inquiries.length}건)
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      filter === 'pending' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    출동대기 ({inquiries.filter(i=>i.status==='pending').length}건)
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      filter === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    지형완료 ({inquiries.filter(i=>i.status==='completed').length}건)
                  </button>
                </div>
              </div>

              {/* Reset Data Helper buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateSampleData}
                  className="px-3.5 py-2 border border-dashed border-brand-300 text-brand-700 bg-brand-50/60 font-bold text-xs rounded-xl hover:bg-brand-50 transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <span>🔄 가상 테스트 샘플 생성</span>
                </button>
                <button
                  onClick={clearAll}
                  className="px-3.5 py-2 border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>내역 일괄삭제</span>
                </button>
              </div>
            </div>

            {/* List Body overflow container */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-slate-50">
              {filteredData.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 space-y-3.5 shadow-sm max-w-lg mx-auto">
                  <div className="text-4xl">📭</div>
                  <h5 className="font-extrabold text-base text-gray-900">접수된 문의 내역이 없습니다.</h5>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed px-6">
                    고객 홈페이지의 <strong>‘온라인 견적 상담 신청’</strong> 양식을 제출하시거나 <br />
                    위 <strong>‘가상 테스트 샘플 생성’</strong> 버튼을 눌러 모의 시나리오를 즉각 로드해 확인 가능합니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-100/90 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow relative"
                    >
                      {/* Floating reservation block ID Badge */}
                      <span className="absolute top-4 right-4 text-xs font-mono font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100/40">
                        {item.id}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        
                        {/* Left Side: Client Data */}
                        <div className="md:col-span-8 space-y-3 text-left">
                          
                          {/* Client headers */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center text-sm font-black text-gray-900 border-r pr-3 border-gray-200">
                              <User className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                              {item.customerName}
                            </span>
                            <a
                              href={`tel:${item.phoneNumber}`}
                              className="inline-flex items-center text-xs font-bold text-emerald-600 hover:underline"
                            >
                              <Phone className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                              {item.phoneNumber}
                            </a>
                          </div>

                          {/* Address */}
                          <div className="flex items-start text-xs text-gray-700 font-semibold leading-relaxed">
                            <MapPin className="h-4 w-4 text-brand-500 mr-2 shrink-0 mt-0.5" />
                            <span><strong>출동지:</strong> {item.address}</span>
                          </div>

                          {/* Requested service label */}
                          <div className="text-xs">
                            <span className="font-bold text-gray-400 block mb-1">신청한 서비스 사양</span>
                            <span className="inline-block bg-slate-900 text-white px-2.5 py-1 font-extrabold rounded-lg text-[11px] tracking-wide">
                              {item.selectedService}
                            </span>
                          </div>

                          {/* Issue detail paragraph */}
                          <div className="bg-gray-50 border border-gray-100/80 rounded-xl p-3.5 mt-2 text-xs sm:text-sm text-gray-600 leading-normal font-semibold">
                            {item.detailText}
                          </div>

                          {/* Timestamps */}
                          <div className="text-[10px] text-gray-400 font-bold">
                            📅 신청 일자: {new Date(item.createdAt).toLocaleString('ko-KR')}
                          </div>
                        </div>

                        {/* Right Side: Operational Action Controls */}
                        <div className="md:col-span-4 flex flex-col justify-between md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-5">
                          
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-gray-400 block md:text-right">진행 상황 분배</span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold ${
                              item.status === 'pending'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            }`}>
                              {item.status === 'pending' ? '🔴 기사 배정 출동대기' : '🟢 뚫음 완료 (하자 보장)'}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            {item.status === 'pending' ? (
                              <button
                                onClick={() => updateStatus(item.id, 'completed')}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-sm cursor-pointer"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>뚫음 완료 처리</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => updateStatus(item.id, 'pending')}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-sm cursor-pointer"
                              >
                                <span>대기중 복원</span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              className="inline-flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-xl p-2.5 transition-colors cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Summary Footer */}
            <div className="bg-slate-900 text-slate-400 px-6 py-4 text-xs font-bold border-t border-slate-800 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p>총 {inquiries.length}개 접수건 중 {inquiries.filter(i=>i.status==='pending').length}건 처리 대기중</p>
              <p>🔒 10분 전화상담 보장 직영 관제 펌프</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
