import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Phone, CheckCircle, HelpCircle, ChevronRight, X } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export default function Services({ onSelectServiceForInquiry }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'blockage' | 'replacement' | 'facility'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: '전체 서비스' },
    { id: 'blockage', label: '🌋 꽉 막힘 해결' },
    { id: 'replacement', label: '🔧 교체/설치' },
    { id: 'facility', label: '🏢 배관/종합설비' },
  ];

  const filteredServices = SERVICES.filter(
    (service) => activeCategory === 'all' || service.category === activeCategory
  );

  return (
    <section id="services" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-extrabold text-sm tracking-wider uppercase bg-brand-50 px-3 py-1.5 rounded-full">
            OUR SPECIALIZED SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
            관통사들의 7대 핵심 전문 보증 설비
          </h2>
          <div className="w-16 h-1 bg-brand-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-4 text-base font-medium">
            단순히 뚫는 것을 넘어, 배관 설계 지식과 최첨단 스케일링 특수 장비를 활용하여 막힌 곳을 속 시원히 관통하고, 평생 품질 보장 책임을 약속합니다.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/10 -translate-y-0.5'
                  : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-brand-200 transition-all flex flex-col group h-full"
              >
                {/* Hover overlay zooming card image */}
                <div className="relative h-56 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={service.imageSrc}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badget overlay */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    service.category === 'blockage' 
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : service.category === 'replacement'
                      ? 'bg-brand-50 text-brand-600 border border-brand-100'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}>
                    {service.category === 'blockage' ? '막힘해결' : service.category === 'replacement' ? '설치교체' : '종합설비'}
                  </span>
                  
                  {/* Premium Guarantee stamp */}
                  <span className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight shadow-sm">
                    미해결 시 0원 보장
                  </span>
                </div>

                {/* Card Context */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="mt-4 space-y-2 flex-grow">
                    {service.features.slice(0, 2).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs text-gray-700">
                        <CheckCircle className="h-3.5 w-3.5 text-brand-500 mr-2 shrink-0" />
                        <span className="font-medium truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Estimated Price Bar */}
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400">정찰 가격 가이드</span>
                    <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                      {service.estimatedPrice.split(' ')[0]}
                    </span>
                  </div>

                  {/* Double Actions Button Area */}
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="py-2.5 rounded-xl border border-gray-200 hover:border-brand-300 hover:text-brand-600 text-gray-600 font-bold text-xs transition-colors cursor-pointer text-center"
                    >
                      상세 정보 보기
                    </button>
                    <button
                      onClick={() => onSelectServiceForInquiry(service.name)}
                      className="py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer text-center"
                    >
                      무료 견적 신청
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
              >
                {/* Header photo */}
                <div className="relative h-64 sm:h-72 bg-slate-200">
                  <img
                    src={selectedService.imageSrc}
                    alt={selectedService.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                      {selectedService.category === 'blockage' ? '막힘해결' : selectedService.category === 'replacement' ? '설치교체' : '종합설비'}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight">
                      {selectedService.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">상세 서비스 백서</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedService.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">제공받으실 수 있는 세부 혜택</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-bold text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-brand-800">정직 정찰 가격 가이드</h4>
                      <p className="text-xs text-brand-600 mt-1">이물질 사양 및 현장 환경에 따라 투명하게 사전 제안해 드립니다.</p>
                    </div>
                    <span className="text-base font-extrabold text-brand-700 bg-white border border-brand-200 px-4 py-2 rounded-xl whitespace-nowrap shadow-sm">
                      {selectedService.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                  <a
                    href="tel:010-6333-9873"
                    className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-sm shadow-sm transition-all cursor-pointer text-center"
                  >
                    <Phone className="h-4 w-4 fill-current shrink-0" />
                    <span>전화 직시 통화 연결</span>
                  </a>
                  <button
                    onClick={() => {
                      onSelectServiceForInquiry(selectedService.name);
                      setSelectedService(null);
                    }}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    이 서비스로 예약 상담하기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
