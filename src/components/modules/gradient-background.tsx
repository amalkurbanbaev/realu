import Image from "next/image"

export function GradientBackground() {
  return (
    <div className="wrong-class -z-10 -mt-20 absolute top-1/2 right-1/2 size-[3000px] translate-x-[70%] translate-y-[-74%]">
      <Image src="/gradient.svg" alt="gradient" fill className="object-fill" />
    </div>
  )
}
