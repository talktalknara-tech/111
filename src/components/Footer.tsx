import { Wrench } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onScrollToSection, onOpenAdmin }: FooterProps) {
  return (
    <footer id="footer" className="bg-slate-900 text-white pt-16 pb-28 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Logo & Intro column */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-2.5">
              <div className="bg-brand-600 text-white p-2 rounded-xl">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white">관통사들</span>
                <p className="text-[10px] text-brand-400 font-bold tracking-tight">하수구·변기·싱크대 막힘 해결 & 종합 설비 기공사</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-sm">
              관통사들은 정밀 배관 진단 및 최첨단 스케일링 전용 장비를 바탕으로 고객님의 막한 가슴과 막힌 배관을 단번에 뚫어드리는 정직한 무결점 기술 보장 서비스입니다.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">서비스 항목</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li>하수구 막힘 24시 스케일링</li>
              <li>화장실 변기 관통 및 이물 인양</li>
              <li>싱크대 유지방 스쿠버 세척</li>
              <li>친환경 국산 KS 규격 수전 교체</li>
              <li>가정용 가압/집수정 펌프 점검</li>
            </ul>
          </div>

          {/* Direct Hotlines column */}
          <div className="md:col-span-4 text-left space-y-3.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">24시 출동 콜센터</h4>
            <div>
              <a
                href="tel:010-6333-9873"
                className="text-2xl font-black text-brand-400 hover:text-brand-300 font-mono tracking-tight"
              >
                010-6333-9873
              </a>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">📍 수도권(서울·경기·인천) 전지점 동기화 출동 대기중</p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[10px] text-slate-600 hover:text-slate-400 font-mono underline"
              >
                [모니터링 기사 통합관제 로그인]
              </button>
            </div>
          </div>

        </div>

        {/* Brand details and copyright */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-semibold">
          <div className="space-y-1">
            <p>상호명: 관통사들 | 대표기사: 설비 기능 마스터 | 연락처 010-6333-9873</p>
            <p>주요 업무: 하수구막힘, 변기막힘, 싱크대막힘, 수전교체, 펌프교체, 해빙작업, 각종설비 일체</p>
            <p className="text-slate-600">Copyright © 2026 Gwantongsa-deul. All rights reserved. (AI Studio Optimized Website)</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onScrollToSection('hero')} className="hover:text-slate-400 cursor-pointer">맨위로 ➔</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
