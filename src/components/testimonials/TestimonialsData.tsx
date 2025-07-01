export interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
    company?: string;
    phone?: string;
  }
  
  export const testimonialsData: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Senior Blockchain Developer",
      content: "The comprehensive curriculum and hands-on approach transformed my understanding of Web3. Within 6 months, I landed a senior role at a leading DeFi protocol.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      company: "ConsenSys",
      phone: "+1 (555) 123-4567"
    },
    {
      name: "Marcus Rodriguez",
      role: "Smart Contract Auditor",
      content: "From zero blockchain knowledge to conducting security audits professionally. The program's focus on security best practices prepared me exceptionally well.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      company: "OpenZeppelin",
      phone: "+1 (555) 234-5678"
    },
    {
      name: "Priya Sharma",
      role: "DeFi Protocol Designer",
      content: "The advanced modules on tokenomics and protocol design were game-changing. I'm now leading the development of a $50M TVL protocol.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      company: "Aave Labs",
      phone: "+91 98765 43210"
    },
    {
      name: "David Kim",
      role: "Web3 Product Manager",
      content: "Perfect blend of technical depth and business acumen. The program helped me transition from traditional tech to Web3 product management.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      company: "Polygon Labs",
      phone: "+82 10-1234-5678"
    },
    {
      name: "Elena Popov",
      role: "Blockchain Consultant",
      content: "The industry connections and practical projects opened doors I never imagined. Now consulting for Fortune 500 companies on blockchain integration.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "Deloitte Digital",
      phone: "+44 20 7123 4567"
    },
    {
      name: "Ahmed Hassan",
      role: "NFT Platform Architect",
      content: "The course covered everything from basic concepts to advanced layer-2 solutions. I built and launched my own NFT marketplace.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      company: "SuperRare",
      phone: "+971 50 123 4567"
    }
  ];
  