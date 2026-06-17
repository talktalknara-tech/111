import { motion } from 'motion/react';
import { Phone, MessageSquare, ShieldCheck, Clock, Zap } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onScrollToInquiry: () => void;
  onScrollToServices: () => void;
}

export default function Hero({ onScrollToInquiry, onScrollToServices }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950"
    >
      {/* Background with Lighter Dark Overlay to keep the beautiful background image highly visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="관통사들 배관 설비 전문가"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-90 select-none pointer-events-none scale-102 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-slate-950/75" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy Container */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 lg:space-y-6 text-left">
            
            {/* Quick trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-500/20 border border-brand-500/40 text-brand-200 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-sm"
            >
              <Zap className="h-3 w-3 animate-bounce text-yellow-400 shrink-0" />
              <span>수도권 전지역 30분 출동 대기</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[26px] xs:text-[28px] sm:text-[38px] md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-tight font-sans tracking-tight"
            >
              막힌 <span className="text-brand-400 drop-shadow-md font-extrabold">하수구·변기·싱크대</span><br className="hidden sm:inline" />
              <span className="text-emerald-400 font-extrabold drop-shadow-md">각종설비 및 수전 교체</span>까지 완벽 해결!
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-base md:text-lg text-slate-100 font-semibold max-w-xl leading-relaxed bg-slate-950/75 p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
            >
              업체명 <span className="text-white font-black underline decoration-brand-400 decoration-2 underline-offset-4">“관통사들”</span>은 미해결 시 무료 0원 원칙을 지킵니다. 
              하수구 막힘 신속 관통부터 세련된 고급 수전 및 수도 배관 교체까지 거품 없는 투명한 견적으로 당일 정직하게 케어해 드립니다.
            </motion.p>

            {/* Action buttons area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full sm:w-auto flex flex-col sm:flex-row gap-2.5 pt-2"
            >
              {/* Telephone direct button */}
              <a
                href="tel:010-6333-9873"
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
              >
                <Phone className="h-4.5 w-4.5 fill-current animate-pulse shrink-0" />
                <span>전화 즉시 연결 (010-6333-9873)</span>
              </a>

              {/* SMS direct message button */}
              <a
                href="sms:010-6333-9873?body=안녕하세요 관통사들! 하수구·변기·싱크대·종합설비 빠른 상담 신청합니다."
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5 fill-current shrink-0 text-white" />
                <span>문자 빠른 상담 접수</span>
              </a>
            </motion.div>

            {/* Online Inquiry scroll shortcut */}
            <motion.button
              onClick={onScrollToInquiry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-slate-400 hover:text-white text-[11px] sm:text-xs font-semibold underline underline-offset-4 pt-1 transition-colors cursor-pointer"
            >
              바쁘시다면? 비대면 온라인으로 30초 상담 예약 접수하기 ➔
            </motion.button>
          </div>

          {/* Core Trust Indicators Dashboard - Right Side on Desktop */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white space-y-5 sm:space-y-6 shadow-2xl relative"
            >
              {/* Light reflection effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center space-x-2 border-b border-white/10 pb-3.5">
                <ShieldCheck className="h-4.5 w-4.5 text-brand-400" />
                <span>관통사들만의 ‘정직 안심 3대 약속’</span>
              </h2>

              <div className="space-y-4sm:space-y-5">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-brand-500/20 text-brand-400 rounded-xl mt-0.5">
                    <ShieldCheck className="h-4 sm:h-5 sm:w-5 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">미종결 시 0원 정직 제도</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                      아무리 고난도의 하수관도 해결 완료 판정이 나지 않으면 출장비나 약속 요금을 받지 않으므로 전액 무결점 보장합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-emerald-500/20 text-emerald-400 rounded-xl mt-0.5">
                    <Clock className="h-4 sm:h-5 sm:w-5 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">동일 문제 무상 재수리 A/S</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                      작업 마스터들의 수리 진행 건은 기술 보증서를 대유하여 동일 지점 재발에 대해 든든하게 사후 기술 교정을 지원합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-indigo-500/20 text-indigo-400 rounded-xl mt-0.5">
                    <Zap className="h-4 sm:h-5 sm:w-5 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">첨단 하이테크 정밀 장비 도입</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                      내부 이물질 덩어리를 직접 눈으로 모니터링할 수 있는 초고화질 배관 검침 내시경 및 리지드 무진동 스케일러 기술을 적용합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service tags count buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div className="text-center p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer" onClick={onScrollToServices}>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">자체 보유 장비</p>
                  <p className="text-sm sm:text-base font-extrabold text-brand-400">안심 정품 25종</p>
                </div>
                <div className="text-center p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer" onClick={onScrollToServices}>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">현장 엔지니어</p>
                  <p className="text-sm sm:text-base font-extrabold text-emerald-400">평균 경력 15년+</p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
