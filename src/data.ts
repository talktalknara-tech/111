import heroBanner from './assets/images/hero_plumber_banner_1780283598183.png';
import drainCleaning from './assets/images/drain_cleaning_service_1780283613742.png';
import faucetReplacement from './assets/images/faucet_replacement_service_1780283628277.png';
import toiletUnclog from './assets/images/toilet_unclog_service_1780283646222.png';
import sinkClogKorean from './assets/images/sink_clog_korean_service_1780285469645.png';
import pumpReplaceKorean from './assets/images/pump_replace_korean_service_1780285490531.png';
import frozenPipeThawingKorean from './assets/images/frozen_pipe_thawing_korean_1780285507918.png';
import koreanDrainPlumber from './assets/images/korean_drain_plumber_1780285705013.png';
import koreanFacilityTech from './assets/images/korean_facility_tech_1780285839002.png';
import { ServiceItem, FaqItem } from './types';

export const IMAGES = {
  hero: heroBanner,
  drain: koreanDrainPlumber,
  faucet: faucetReplacement,
  toilet: toiletUnclog,
  sink: sinkClogKorean,
  pump: pumpReplaceKorean,
  frozen: frozenPipeThawingKorean,
  facility: koreanFacilityTech,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'drain_clog',
    name: '하수구 막힘 해결',
    description: '반복되는 하수구 막힘의 원인을 배관 내시경으로 정확히 진단하고 확실하게 통通 뚫어드립니다.',
    longDescription: '고성능 전동 스프링, 강력한 석션기, 초고압 세척 및 리지드 플렉스 샤프트 장비를 총동원하여 단순 오물부터 반영구적으로 굳은 기름 슬러지(scum) 덩어리까지 배관 손상 없이 깨끗하게 제거합니다. 배관 내부 상태를 실시간 모니터링하여 잔여물 없는 퍼펙트 케어를 제공합니다.',
    category: 'blockage',
    imageSrc: koreanDrainPlumber,
    features: ['초고화질 배관 내시경 무료 검사', '리지드 플렉스 샤프트 스케일링', '막힌 원인 제거 확인서 발급', '확실한 무상 A/S 보장'],
    estimatedPrice: '50,000원부터 (작업 난이도별 투명한 안내)'
  },
  {
    id: 'toilet_clog',
    name: '변기 막힘 해결',
    description: '휴지, 물티슈, 실수로 빠뜨린 장난감/화장품 용기 등 다양한 이물질을 배관 파손 없이 철저히 해결합니다.',
    longDescription: '단순 막힘부터 면도기, 칫솔, 뚜껑 등 플라스틱 고체 물질이 걸려 있는 배관 심층 막힘까지 맞춤 기구를 배치해 신속히 인양 및 관통 작업합니다. 불필요한 변기 뜯기(탈거) 최소화 기법으로 해결 후 깔끔하고 완벽하게 마감 세팅해 드립니다.',
    category: 'blockage',
    imageSrc: toiletUnclog,
    features: ['무탈거 인양 공법 우선 적용', '강력 석션 & 압축 관통 기법', '작업 완료 후 배수 회오리 테스트', '안심 위생 세정 소독 서비스'],
    estimatedPrice: '50,000원부터 (단순 해결 시 합리적 책정)'
  },
  {
    id: 'sink_clog',
    name: '싱크대 막힘 해결',
    description: '주방 설거지 중에 물이 안 내려가거나 역류할 때, 기름때 가득한 횡주관을 새 배관처럼 스케일링합니다.',
    longDescription: '싱크대 하부 호스 교체부터 바닥 하수관 깊숙한 곳의 굳어버린 주방 유지방 및 조리 기름 찌꺼기 스케일링을 완벽 처리합니다. 배관 내 오물을 역류 흔적 없이 수거하고, 막힘 고장 원인인 노후 주방 주름관 호스까지 꼼꼼히 점검해 드립니다.',
    category: 'blockage',
    imageSrc: sinkClogKorean,
    features: ['오물 역류 차단 흡입 청소', '오래된 주방 주름관 완벽 무상 점검', '배관 내 악취 원인 근본 제거', '음식물 거름망 세척 서비스'],
    estimatedPrice: '50,000원부터'
  },
  {
    id: 'faucet_replace',
    name: '고급 수전 교체',
    description: '물이 새거나 헐거워진 싱크대, 세면대, 샤워기, 베란다 수도꼭지를 KS 규격 정품으로 교체합니다.',
    longDescription: '노후로 인해 녹물이 나오거나 손잡이 부분에서 누수가 발생하는 수전을 깔끔하게 거두고 내구성이 우수한 100% 국산 친환경 KS 규격 수전으로 안전하게 교체 시공합니다. 연결 패킹 밀착 처리 및 완벽한 수압 세팅으로 미세 누수 걱정까지 완벽히 제거합니다.',
    category: 'replacement',
    imageSrc: faucetReplacement,
    features: ['100% 국산 친환경 프리미엄 수전', '안심 누수 테스트 및 테프론 보강 시공', '기존 노후 수전 수거 및 폐기 처리', '교체 후 1년간 품질 책임 보상'],
    estimatedPrice: '130,000원부터 (수전 고급정품사양 직접 선택)'
  },
  {
    id: 'pump_replace',
    name: '가정용/산업용 펌프 교체',
    description: '수압이 심각하게 약하거나, 모터 유실, 노출 배관 펌프 작동 불가 시 신속하게 정품 펌프를 교체합니다.',
    longDescription: '가정용 가압 모터 펌프, 지하수 수중 펌프, 집수정 배수 펌프의 작동 소음/과열 문제 발생 시 정밀 전압 점검 후 신속 교체합니다. 윌로(Wilo), 한일(Hanil) 등 대한민국 최고의 펌프 브랜드 정품만을 취급하며 완벽한 수압 상향 세팅과 전기 결선 안전 마감을 실시합니다.',
    category: 'replacement',
    imageSrc: pumpReplaceKorean,
    features: ['국내 점유율 1위 정품 펌프 전용 사용', '방수 마감 및 보온재 피복 철저 처리', '펌프 동작 주파수 & 정역 회전 완벽 검사', '안심 사후 품질 보장 및 부속 체크'],
    estimatedPrice: '전화 상담 후 현장 최적가 안내'
  },
  {
    id: 'frozen_pipes',
    name: '동파 해빙 (겨울철 얼어붙은 배관 스팀 해빙)',
    description: '한파로 인해 꽁꽁 얼어버린 온수/냉수 공급관 및 보일러 급수관을 고온 직분사 스팀으로 안전하게 해빙합니다.',
    longDescription: '겨울철 갑작스럽게 수돗물이 중단되거나 단수가 발생했을 때, 배관 파열을 방지하기 위해 가스 토치 대신 초고온 전문 스팀 해빙기를 투입하여 내부 얼음만을 완전 안전하게 녹입니다. 작업 전후 누수 안심 여부를 면밀하게 진단하여 열선 보강 조치까지 지원합니다.',
    category: 'facility',
    imageSrc: frozenPipeThawingKorean,
    features: ['화재 예방 특수 스팀 해빙 공법', '보일러 입구 안심 수압 재설정', '배관 단열 보온 마감재 완벽 보안', '겨울철 동파 예방 안전 무료 교육'],
    estimatedPrice: '현장 동파 영역에 따른 사전 조율'
  },
  {
    id: 'various_facilities',
    name: '각종 주거/상업 설비 시공',
    description: '욕실 환풍기, 배수 트랩, 계량기 교체, 수도 배관 신설 및 방수 설비 등 각종 종합 무결점 배관 설비 시공을 진행합니다.',
    longDescription: '싱크대 싱크볼 리폼, 화장실 소변기/양변기 신설 및 마감 세팅, 정화조 연결 라인 신설, 옥상 방수, 건물 배수 라인 준설 등 주거/상업 공간의 종합 물길을 마스터한 전문 팀원들이 출장 방문하여 하이테크 맞춤 해결 서비스를 제공합니다.',
    category: 'facility',
    imageSrc: koreanFacilityTech,
    features: ['전문 배관 자격 기능 전문 기술공 시공', '고질적 욕실 및 하수구 악취 원천 차단 트랩', '상업 주방 트렌치 배수 효율 증설', '배관 신설 도면 맞춤 레이아웃 설계'],
    estimatedPrice: '현장 방문 무료 상세 견적'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: '신속 문의 접수 및 간편 상담',
    description: '전화상담 클릭 또는 온라인 문의 폼을 통해 문제를 말씀 주시면 베테랑 마스터가 10분 이내에 답변과 최적의 대안을 브리핑합니다.'
  },
  {
    step: '02',
    title: '첨단 장비 맞춤 사전 세팅 및 현장 신속 출동',
    description: '접수 즉시 각 권역별 기사가 고화질 내시경, 전동 샤프트, 석션기를 챙겨 약속 시간에 안전하게 현장으로 신속 배정/방문합니다.'
  },
  {
    step: '03',
    title: '배관 내시경 정밀 검사 & 상세 견적 안내',
    description: '도착과 동시에 막힘 혹은 누수의 포인트를 눈으로 직접 보실 수 있게 내시경 화면을 띄워 설명드리며, 명확한 정찰제 견적을 투명하게 고지합니다.'
  },
  {
    step: '04',
    title: '원천 기술 기공 작업 진행 & 마감 소독',
    description: '고객님의 승인 이후 작업에 착수하며, 배수 검사 및 막힘 해결 후 안심 살균 탈취 세정과 세정 방역을 싹 진행합니다.'
  },
  {
    step: '05',
    title: '철저한 보증 사후 기술 책임제 (무상 A/S)',
    description: '모든 설비 완료 건은 당일 작업 상황 기록을 남겨 추후 동일 문제 발생 시 철저한 자체 하자 보수 무상 책임을 집니다.'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq_1',
    question: '막한 하수구 뚫기 비용은 어떻게 산정되나요?',
    answer: '관통사들은 원인 파악 단계부터 현장에서 명확하고 정직하게 가격을 먼저 안내해 드리며, 어떠한 사전 동의 없는 무단 추가 요금을 요구하지 않습니다. 단순 변기나 싱크대 단순 막힘은 저렴하며, 바닥 아래 횡주 배수관까지 오랜 유지방 덩어리 기름때가 가득하여 플렉스 샤프트나 고압 세척이 필수가 되는 헤비 작업 시에는 장비 가동과 거리 진단에 따라 가격표에 규정된 정찰 요금을 제시합니다.'
  },
  {
    id: 'faq_2',
    question: '문의하면 현장까지 몇 시간 정도 걸리나요?',
    answer: '서울/수도권 전 지역에 협력 직영 엔지니어 마스터가 대기하고 있어, 접수 완료 시 보통 평균 30분에서 최대 1시간 내외로 신속 출동이 가능합니다. 주말, 공휴일, 야간 심야 긴급 출동 케어도 연중무휴로 상시 운용되고 있으니 안심하고 연락해 주세요!'
  },
  {
    id: 'faq_3',
    question: '작업 후 다시 막히면 무상 보증이나 사후 A/S 처리가 되나요?',
    answer: '그럼요. 관통사들의 최고 강점은 철저한 품질 보증입니다! 저희가 뚫어드린 동일 부위에서 작업 후 수 일 이내에 작업 과실 혹은 이물질 미제거로 인해 다시 막힘 현상이 일어난다면 100% 무상으로 다시 재출동하여 꼼꼼한 환기 스케일링을 약속해 드립니다.'
  },
  {
    id: 'faq_4',
    question: '배관을 뜯지 않고 해결할 수도 있나요?',
    answer: '네, 저희는 배관 탈거나 손상(타공) 없이 최신 첨단 석션 흡입 공법과 초슬림 고강도 텅스텐 플렉스 샤프트를 활용하는 "무손상 크랙리스 공법"을 최우선으로 투입합니다. 따라서 불필요한 인테리어 손실이나 높은 토목 해체 비용을 줄일 수 있어 비용을 크게 아끼실 수 있습니다.'
  }
];
