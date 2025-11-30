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

export type SlideParticle = {
  src: string
  width: number
  height: number
  position: string
}

export type RawSlide = {
  id: string
  particles: SlideParticle[]
  useVideo?: boolean
}

export type Slide = RawSlide & {
  title: string
  description: string
  image?: string
  video?: string
  withGradient?: boolean
}
