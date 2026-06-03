export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'blockage' | 'replacement' | 'facility';
  imageSrc: string;
  features: string[];
  estimatedPrice: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  selectedService: string;
  detailText: string;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
