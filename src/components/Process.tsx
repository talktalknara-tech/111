import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import { CheckSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-extrabold text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1.5 rounded-full">
            SYSTEMATIC WORKING PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
            관통사들의 5단계 안심 시공 프로세스
          </h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-4 text-base font-medium">
            전화 접수부터 사후 관리 기술 보증서 발급까지, 모든 과정이 체계적이고 투명하게 이루어집니다.
          </p>
        </div>

        {/* Process Steps Track */}
        <div className="relative mt-12 pl-2 sm:pl-0">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gray-100 z-0" />

          {/* Connecting line on mobile */}
          <div className="lg:hidden absolute left-[34px] sm:left-[36px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-brand-200/65 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-row items-start lg:flex-col lg:items-center text-left lg:text-center group gap-4 lg:gap-0"
              >
                {/* Step circle */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-brand-50 border-2 border-brand-100 flex items-center justify-center text-base lg:text-xl font-black text-brand-700 tracking-tight shadow-md group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 group-hover:rotate-6 transition-all duration-300 shrink-0 z-10">
                  {step.step}
                </div>

                {/* Content Box */}
                <div className="mt-0 lg:mt-6 bg-gray-50 border border-gray-100/80 rounded-2xl p-4 sm:p-5 hover:bg-white hover:shadow-xl hover:border-brand-100 transition-all duration-300 flex-grow w-full">
                  <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-brand-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-2 leading-relaxed font-semibold">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service area list tag banners */}
        <div className="mt-16 bg-brand-50/60 border border-brand-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-brand-600 text-white rounded-2xl shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 text-lg leading-tight">출동 가능 구역 안내</h4>
              <p className="text-xs text-gray-600 mt-1 font-semibold">
                서울 전체, 수도권(인천, 부천, 김포, 고양, 일산, 안양, 수원, 용인, 성남, 하남, 남양주 등) 전 구역 24시간 철야 대기를 지원합니다.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <span className="bg-white text-gray-700 border border-gray-200/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">⚡ 10분내 즉각 피드백</span>
            <span className="bg-white text-gray-700 border border-gray-200/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">📍 전 지점 차량 실시간 동기화</span>
            <span className="bg-white text-gray-700 border border-gray-200/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">🌙 야간/심야 주말 정찰출동</span>
          </div>
        </div>

      </div>
    </section>
  );
}
