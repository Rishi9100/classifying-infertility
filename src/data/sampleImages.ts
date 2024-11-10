// Sample dataset of medical images with their classifications
export interface MedicalImage {
  id: string;
  url: string;
  condition: string;
  description: string;
  confidence: number;
}

export const sampleImages: MedicalImage[] = [
  {
    id: "oc_001",
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop",
    condition: "Ovarian Cyst",
    description: "Large simple ovarian cyst visible on ultrasound",
    confidence: 0.92
  },
  {
    id: "uf_001",
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop",
    condition: "Uterine Fibroid",
    description: "Intramural fibroid detected on pelvic ultrasound",
    confidence: 0.89
  },
  {
    id: "pcos_001",
    url: "https://images.unsplash.com/photo-1579154204666-bdd6bf3d0567?w=400&h=400&fit=crop",
    condition: "PCOS Indication",
    description: "Multiple peripheral follicles suggesting PCOS",
    confidence: 0.85
  },
  {
    id: "normal_001",
    url: "https://images.unsplash.com/photo-1579154204600-846e283cb16f?w=400&h=400&fit=crop",
    condition: "Normal Tissue",
    description: "Normal ovarian tissue with healthy follicular development",
    confidence: 0.95
  }
];