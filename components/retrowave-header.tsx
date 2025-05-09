import Link from "next/link"
import Image from "next/image"
export function RetrowaveHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/30 sm:px-8">
      <div className="container mx-auto flex h-20 items-center sm:px-4">
        <Link href="/" className="flex items-center gap-2 font-bold z-10">
          <Image
            src="/Logo.ico"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span className="text-primary text-xl tracking-wider">Rixe Arena Tournament</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 z-10">
          <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors">
            Accueil
          </Link>
          <Link href="/events" className="text-sm font-medium hover:text-secondary transition-colors">
            Calendrier
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-secondary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
