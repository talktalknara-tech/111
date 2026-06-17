import { Phone, MessageSquare } from 'lucide-react';

interface MobileFloatingCtaProps {
  onOpenInquiry: () => void;
}

export default function MobileFloatingCta({ onOpenInquiry }: MobileFloatingCtaProps) {
  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-3 py-3 rounded-2xl flex gap-2.5 items-center">
      {/* Phone Link (Left) */}
      <a
        href="tel:010-6333-9873"
        id="floating_mobile_phone_btn"
        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98]"
      >
        <Phone className="h-4 w-4 fill-current animate-pulse shrink-0" />
        <span>전화 상담 (즉시 연결)</span>
      </a>

      {/* SMS Text Link (Right) */}
      <a
        href="sms:010-6333-9873?body=안녕하세요 관통사들! 빠른 배관설비 상담 의뢰합니다."
        id="floating_mobile_sms_btn"
        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
      >
        <MessageSquare className="h-4 w-4 fill-current shrink-0 text-white" />
        <span>문자 상담 접수</span>
      </a>
    </div>
  );
}

