import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq_1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-extrabold text-sm tracking-wider uppercase bg-brand-50 px-3 py-1.5 rounded-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
            자주 묻는 질문 팩트 체크
          </h2>
          <div className="w-16 h-1 bg-brand-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-4 text-sm sm:text-base font-medium">
            비용, 시간, 긴급 보증 등 고객님들이 가장 자주 불안해하시는 부분을 가감 없이 정답을 내어드립니다.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-250 ${
                  isOpen 
                    ? 'border-brand-200 bg-brand-50/10 shadow-md' 
                    : 'border-gray-100 hover:border-gray-200 bg-white shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between text-gray-900 hover:text-brand-700 font-bold text-sm sm:text-base transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-brand-600' : 'text-gray-400'}`} />
                    <span className="leading-snug">{faq.question}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold border-t border-gray-50 bg-gray-50/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA box */}
        <div className="mt-16 text-center bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-gray-900 font-bold text-base">원하시는 답변이 없으신가요?</p>
          <p className="text-gray-500 text-xs sm:text-sm font-semibold">대표 엔지니어가 24시간 실시간 전문 상담을 무제한 무료로 제공합니다. 언제든 부담 없이 질문하세요!</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="tel:010-6333-9873"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
            >
              <Phone className="h-4 w-4 fill-current shrink-0" />
              <span>전화 즉시 물어보기</span>
            </a>
            <a
              href="sms:010-6333-9873?body=안녕하세요 관통사들! 하수구/설비 빠른 기술 질문드립니다."
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4 fill-current shrink-0 text-white" />
              <span>문자 바로 문의하기</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
