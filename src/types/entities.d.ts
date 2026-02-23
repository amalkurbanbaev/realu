export type AppFeature = {
  title: string
  description: string
  icon: string
}

export type Testimonial = {
  author: string
  role?: string
  text: string
  rating: number
}

export type Question = {
  text: string
  answer: string
}

export type FAQSection = Array<{
  id: "about" | "learn" | "meditation" | "breath" | "yoga-nidra"
  title: string
  questions: Array<Question>
}>

// About
interface AboutSectionCard {
  title: string
  icon: string
}

interface AboutExpert {
  name: string
  cardHeight: number
  description: string
  image: string
  "text-1"?: string
  "text-2"?: string
  "text-3"?: string
}
export type AboutSection = [
  {
    id: "approach"
    title: string
    "text-1": string
    "cards-1": Array<AboutSectionCard>
    "text-2": string
    "text-3": string
    "cards-2": Array<AboutSectionCard>
    points: Array<string>
    "cards-3": Array<AboutSectionCard>
  },
  {
    id: "experts"
    title: string
    experts: Array<AboutExpert>
  },
]

export type SlideParticle = {
  src: string
  width: number
  height: number
  position: string
}

export type SlideType = "image" | "video" | "teachers"

export type RawSlide = {
  id: string
  particles: SlideParticle[]
  useVideo?: boolean
  type?: SlideType
  videoSrc?: string
}

export type Slide = RawSlide & {
  title: string
  description: string
  image?: string
  video?: string
  withGradient?: boolean
  type?: SlideType
}
