export type UIType =
  | "onboarding"
  | "dashboard"
  | "pricing"
  | "modal"
  | "form"
  | "landing"
  | "profile"
  | "navigation"
  | "card"
  | "unknown";

export type DesignStyle =
  | "whimsical"
  | "minimal"
  | "editorial"
  | "brutalist"
  | "luxury"
  | "playful"
  | "corporate"
  | "organic";

export type GridLayout = "bento" | "column" | "card" | "freeform" | "hero";
export type Density = "low" | "medium" | "high";

export interface DMO {
  id: string;
  image_url: string;
  image_placeholder: string; // gradient CSS for demo
  ui_type: UIType;
  design_style: DesignStyle[];
  color_palette: string[];
  typography: string[];
  layout: {
    grid: GridLayout;
    density: Density;
  };
  components: string[];
  semantic_tags: string[];
  intent: {
    primary: "inspiration" | "research" | "reference" | "unknown";
    confidence: number;
  };
  source: {
    app: string;
    url: string | null;
  };
  project?: string;
  compressed?: boolean;
  created_at: string;
}

export const UI_TYPE_COLORS: Record<UIType, string> = {
  onboarding: "bg-sage-light text-sage-dark border-sage",
  dashboard: "bg-blue-light text-blue-dark border-blue",
  pricing: "bg-gold-light text-gold-dark border-gold",
  modal: "bg-lilac-light text-lilac-dark border-lilac",
  form: "bg-rose-light text-rose-dark border-rose",
  landing: "bg-amber/20 text-gold-dark border-gold",
  profile: "bg-sand text-ink-light border-sand-dark",
  navigation: "bg-cream-dark text-ink-light border-sand-dark",
  card: "bg-teal/20 text-teal border-teal",
  unknown: "bg-cream-dark text-ink-light border-sand-dark",
};

export const STYLE_COLORS: Record<DesignStyle, string> = {
  whimsical: "bg-lilac-light text-lilac-dark",
  minimal: "bg-cream-dark text-ink-light",
  editorial: "bg-ink-light/10 text-ink-light",
  brutalist: "bg-ink text-cream",
  luxury: "bg-gold-light text-gold-dark",
  playful: "bg-rose-light text-rose-dark",
  corporate: "bg-blue-light text-blue-dark",
  organic: "bg-sage-light text-sage-dark",
};
