import mongoose, { Schema, Document } from 'mongoose';

// Localized text — bilingual content for SEO in both ES and EN
export interface ILocalized {
  es: string;
  en: string;
}

export interface IProject extends Document {
  slug: string;
  title: string;
  category: 'web' | 'mobile' | 'game';
  status: 'production' | 'development' | 'daily';
  tagline: ILocalized;
  summary: ILocalized;
  problem: ILocalized;
  solution: ILocalized;
  stack: string[];
  demo?: string;
  repo?: string;
  coverImage?: string;
  images: string[];
  featured: boolean;
  order: number;
  year?: number;
  seo?: {
    title?: ILocalized;
    description?: ILocalized;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const localizedField = (required = false) => ({
  es: { type: String, trim: true, ...(required ? { required: [true, 'Falta el texto en español'] } : {}) },
  en: { type: String, trim: true, ...(required ? { required: [true, 'Missing English text'] } : {}) },
});

const ProjectSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: [true, 'El slug es requerido'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug debe ser kebab-case (a-z, 0-9, guiones)'],
    },
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      maxlength: [100, 'El título no puede exceder 100 caracteres'],
    },
    category: {
      type: String,
      enum: {
        values: ['web', 'mobile', 'game'],
        message: '{VALUE} no es una categoría válida. Usa: web, mobile, game',
      },
      required: [true, 'La categoría es requerida'],
    },
    status: {
      type: String,
      enum: {
        values: ['production', 'development', 'daily'],
        message: '{VALUE} no es un estado válido. Usa: production, development, daily',
      },
      required: [true, 'El estado es requerido'],
    },
    tagline: localizedField(true),
    summary: localizedField(true),
    problem: localizedField(false),
    solution: localizedField(false),
    stack: [{ type: String, trim: true }],
    demo: { type: String, trim: true },
    repo: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    year: { type: Number },
    seo: {
      title: localizedField(false),
      description: localizedField(false),
      keywords: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
);

// Indexes for fast lookups / sorting (slug index is created by `unique: true` above)
ProjectSchema.index({ order: 1, createdAt: -1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
