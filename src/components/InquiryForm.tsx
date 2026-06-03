import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryFormProps {
  preselectedService: string;
  onClearPreselected: () => void;
  onInquirySubmitted: () => void;
}

export default function InquiryForm({ preselectedService, onClearPreselected, onInquirySubmitted }: InquiryFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState('하수구 막힘 해결');
  const [detailText, setDetailText] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Simulated live cue updates list
  const [liveQueue, setLiveQueue] = useState<Omit<Inquiry, 'status' | 'address' | 'detailText'>[]>([
    { id: '1', customerName: '김*현', phoneNumber: '010-****-4234', selectedService: '하수구 막힘 해결', createdAt: '2분 전' },
    { id: '2', customerName: '이*민', phoneNumber: '010-****-9011', selectedService: '변기 막힘 해결', createdAt: '15분 전' },
    { id: '3', customerName: '박*송', phoneNumber: '010-****-2849', selectedService: '고급 수전 교체', createdAt: '35분 전' },
    { id: '4', customerName: '정*우', phoneNumber: '010-****-1104', selectedService: '가정용 펌프 교체', createdAt: '1시간 전' },
  ]);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const serviceOptions = [
    '하수구 막힘 해결',
    '변기 막힘 해결',
    '싱크대 막힘 해결',
    '고급 수전 교체',
    '가정용/산업용 펌프 교체',
    '동파 해빙 (보일러/수도 스팀 해빙)',
    '기타 종합 배관 설비 문의',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.customerName = '성함 또는 상호명을 입력해 주세요.';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = '연락 가능한 유선 번호를 입력해 주세요.';
    } else if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = '올바른 전화번호 형식으로 입력해 주세요. (예: 010-6333-9873)';
    }
    if (!address.trim()) {
      newErrors.address = '출동지 주소를 입력해 주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const generatedId = `GW-${Math.floor(1000 + Math.random() * 9000)}`;

    fetch('https://formspree.io/f/xeedyayj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        이름_상호명: customerName.trim(),
        연락처: phoneNumber.trim(),
        방문지주소: address.trim(),
        신청서비스: selectedService,
        상세증상: detailText.trim() || '상세 진단 필요',
        접수번호: generatedId,
        접수시간: new Date().toLocaleString('ko-KR')
      })
    })
    .then(async (response) => {
      if (response.ok) {
        const newInquiry: Inquiry = {
          id: generatedId,
          customerName: customerName.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim(),
          selectedService,
          detailText: detailText.trim() || '상세 진단 필요',
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        // Store in LocalStorage
        const existing: Inquiry[] = JSON.parse(localStorage.getItem('inquiries') || '[]');
        existing.unshift(newInquiry);
        localStorage.setItem('inquiries', JSON.stringify(existing));

        // Update Simulated Live Grid list visually
        const maskedPhone = phoneNumber.trim().replace(/^(\d{3})-?\d{3,4}-?(\d{4})$/, '$1-****-$2');
        const maskedName = customerName.trim().length > 2 
          ? `${customerName.trim()[0]}*${customerName.trim().slice(-1)}` 
          : `${customerName.trim()[0]}*`;

        setLiveQueue(prev => [
          { id: generatedId, customerName: maskedName, phoneNumber: maskedPhone, selectedService, createdAt: '방금 전' },
          ...prev.slice(0, 3)
        ]);

        setTicketId(generatedId);
        setIsSubmitSuccess(true);
        onInquirySubmitted(); // trigger global refresh for admin screen

        // Reset fields
        setCustomerName('');
        setPhoneNumber('');
        setAddress('');
        setDetailText('');
        onClearPreselected();
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setSubmitError(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setSubmitError('접수 중 오류가 발생했습니다. 잠시 후 010-6333-9873 전화나 문자로 연락 주시면 신속히 출동해 드리겠습니다.');
        }
      }
    })
    .catch((err) => {
      console.error(err);
      setSubmitError('서버 연결에 실패했습니다. 대표 유선 번호(010-6333-9873)로 직접 문자 또는 연락 주시면 감사하겠습니다.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section id="inquiry" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inquiry input form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl relative">
            <div className="absolute top-0 left-12 w-24 h-1 bg-brand-600 rounded-b-full" />
            
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                통비대면 무료 간편 기술 견적
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 font-medium">
                원하시는 수리 종류와 내용을 기재하시면 전담 엔지니어가 접수 후 10분 내 연락드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1">
                    신청자 성함 / 상호명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="예: 홍길동 (또는 상호빌라)"
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 ${
                      errors.customerName ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-500'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1">
                    정확한 연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="예: 010-6333-9873"
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 ${
                      errors.phoneNumber ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-500'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1">
                  출동 방문지 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 서울 구로구 구로동 123-45번지 201호"
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 ${
                    errors.address ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-500'
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.address}
                  </p>
                )}
              </div>

              {/* Service type Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1">
                  문의 혹은 시공 서비스 선택 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
                >
                  {serviceOptions.map((opt, oIdx) => (
                    <option key={oIdx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Details text area */}
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1">
                  현장 고장 상세 증상 (피해가 있는 경우 기재)
                </label>
                <textarea
                  value={detailText}
                  onChange={(e) => setDetailText(e.target.value)}
                  rows={4}
                  placeholder="예: 어제 밤부터 화장실 하수구 구멍에서 배수가 전혀 안 되고 물이 차올라요. 냄새도 심합니다. 신속한 방문 원해요."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* Service Terms disclaimer banner */}
              <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 text-amber-800 text-[11px] leading-relaxed font-semibold">
                ⚠️ 입력하신 수집 이용 동의용 개인정보(성함, 전번, 주소)는 긴급 출동 엔지니어 배치 및 견적 상담 용도로만 수집되며 상담 직후 즉시 완전 소멸 폐기 처리되므로 안심하십시오.
              </div>

              {/* Submit Error banner */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-red-800 text-xs font-semibold text-left flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{submitError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit_inquiry_btn"
                disabled={isSubmitting}
                className={`w-full text-white font-extrabold text-base py-4 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 flex items-center justify-center space-x-2 cursor-pointer ${
                  isSubmitting 
                    ? 'bg-brand-400 cursor-not-allowed opacity-80' 
                    : 'bg-brand-600 hover:bg-brand-700 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>상담 정보 안전 전송 중...</span>
                  </>
                ) : (
                  <span>🛠️ 10분 즉시 연락 보증 간편 접수하기</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Side Live Indicator Queue Board */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col h-full border border-slate-800">
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs font-extrabold tracking-wider text-emerald-400">LIVE FEED</span>
              </div>
              <span className="text-xs font-bold text-slate-400">실시간 예약/접수 현황판</span>
            </div>

            <div className="space-y-4 flex-grow">
              {liveQueue.map((item) => (
                <div key={item.id} className="bg-slate-800/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:bg-slate-850 transition-colors">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-slate-100">{item.customerName}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{item.phoneNumber}</span>
                    </div>
                    <p className="text-xs font-black text-brand-400">{item.selectedService}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1.5 bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{item.createdAt}</span>
                    </span>
                    <p className="text-[10px] text-emerald-400 font-bold mt-1">접수 완료✓</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick dial numbers box */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 tracking-wide text-left">야간 심야 주말 공휴일 24시간 긴급 전용 핫라인</p>
              <a
                href="tel:010-6333-9873"
                className="flex items-center justify-between bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 rounded-2xl p-4 mt-2.5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3 text-left">
                  <Phone className="h-5 w-5 fill-current text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-300">대표기사 직통 전화</p>
                    <p className="text-lg font-black text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">010-6333-9873</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-extrabold px-3 py-1.5 rounded-xl border border-emerald-500/10 shrink-0">
                  즉시통화
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Success Modal Feedback */}
      <AnimatePresence>
        {isSubmitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitSuccess(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl overflow-hidden z-10 text-center space-y-5"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto lg:scale-110 shadow-lg shadow-emerald-500/10">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-gray-900">간편 문의 접수 성공!</h3>
                <p className="text-xs text-slate-500 font-semibold font-mono">기술 상담 티켓: {ticketId}</p>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 font-medium">
                작성하신 하수구 설비 시공 신청이 관통사들 통합 직영 관제소에 정상 등록되었습니다. 최고 베테랑 배관 마스터가 10분 내로 전화를 걸어 친절 가견적 상담을 전담해 드립니다.
              </p>
              <button
                onClick={() => setIsSubmitSuccess(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-md"
              >
                접수 완료 확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
