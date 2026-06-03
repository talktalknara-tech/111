import { Phone, MessageSquare } from 'lucide-react';

interface MobileFloatingCtaProps {
  onOpenInquiry: () => void;
}

export default function MobileFloatingCta({ onOpenInquiry }: MobileFloatingCtaProps) {
  const kakaoChatUrl = "https://pf.kakao.com/_qxbGxlxl/chat";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-2xl px-4 py-3 pb-safe flex gap-2.5">
      {/* Phone Link (Left) */}
      <a
        href="tel:010-6333-9873"
        id="floating_mobile_phone_btn"
        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.98]"
      >
        <Phone className="h-4.5 w-4.5 fill-current animate-pulse shrink-0" />
        <span>전화 상담 (010)</span>
      </a>

      {/* SMS Text Link (Right) */}
      <a
        href="sms:010-6333-9873?body=안녕하세요 관통사들! 빠른 배관설비 상담 의뢰합니다."
        id="floating_mobile_sms_btn"
        className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
      >
        <MessageSquare className="h-4.5 w-4.5 fill-current shrink-0 text-white" />
        <span>문자 상담 바로가기</span>
      </a>
    </div>
  );
}
