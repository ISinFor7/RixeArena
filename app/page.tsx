"use client";
import { Megaphone, Gamepad2 } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Peinture */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-60 blur-sm"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-pink-500 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute top-80 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-70 blur-sm"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-400 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute bottom-20 left-20 w-14 h-14 bg-red-400 rounded-full opacity-60 blur-sm"></div>
      <div className="absolute top-60 right-1/3 w-10 h-10 bg-indigo-400 rounded-full opacity-50 blur-sm"></div>

      {/* Bannière */}
      <div className="bg-purple-600 text-white py-2 px-4 relative z-10">
        <Link href="/articles/1" className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
          <Megaphone className="w-4 h-4 flex-shrink-0" />
          <span className="text-center">Prochain évènements le 25/01 à Albi, cliquez ici pour plus d'infos</span>
        </Link>
      </div>
      <div className="relative">
        <div className=" relative z-10">
          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                {/* Logo */}
                <div className="flex-shrink-0 mb-8 lg:mb-0 text-center lg:text-left animate-fade-in-up">
                  <div className="inline-flex items-center justify-center size-[10rem] md:size-[12rem] lg:size-[16rem] text-2xl md:text-3xl lg:text-4xl font-bold shadow-lg">
                    <Image
                      src="/Logo.ico"
                      width={800}
                      height={800}
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animate-delay-200">
                    Welcome to Rixe Arena Tournament
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-secondary max-w-3xl lg:max-w-none mb-10 leading-relaxed animate-fade-in-up animate-delay-400">
                    Become a rat, a gaming rat
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-600">
                    
                    <Link href="/events" className="bg-foreground text-accent  border-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-foreground hover:border-foreground transition-colors shadow-lg">
                      Nos Evenements
                    </Link>
                    <Link href="/contact" className="border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-foreground hover:border-accent transition-colors">
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separation diagonale */}
        <div className="absolute bottom--20 left-0 right-0 h-80 bg-accent transform origin-bottom-left -skew-y-3 z-0"></div>
        <div className="bg-accent transform origin-bottom-left">
          <div className="container mx-auto flex items-center justify-center h-full pb-10">
            <Gamepad2 className="size-12 text-yellow-300 animate-pulse" />
          </div>
          <div className="container mx-auto flex items-center justify-center h-full">
            <div className="grid gap-8 mb-16 max-w-4xl mx-auto z-10 px-4">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/70 to-background border-2 border-secondary/70 sm:mr-20">
                <p className="text-center text-primary text-sm md:text-base lg:text-lg font-semibold pt-4">
                  Nous sommes une association à but non lucratif (loi 1901) fondée dans le Tarn en Septembre 2020, spécialisée dans l’organisation d’événements autour des jeux de combat et de la Culture Geek. <br />
                  Principalement portée sur l’événementiel et les animations, l’association peut être prestataire pour de nombreux évènements/conférences, mais organise également ses propres évènements. <br />
                  <br />
                  Notre but est de fédérer et motiver la communauté des joueurs « sportifs ou non » à travers l’organisation de tournois et favoriser les échanges entre gamers. <br />
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/70 to-background border-2 border-secondary/70 sm:ml-20">
                <p className="text-center text-primary text-sm md:text-base lg:text-lg font-semibold pt-4">
                  Nous sommes une association à but non lucratif (loi 1901) fondée dans le Tarn en Septembre 2020, spécialisée dans l’organisation d’événements autour des jeux de combat et de la Culture Geek. <br />
                  Principalement portée sur l’événementiel et les animations, l’association peut être prestataire pour de nombreux évènements/conférences, mais organise également ses propres évènements. <br />
                  <br />
                  Notre but est de fédérer et motiver la communauté des joueurs « sportifs ou non » à travers l’organisation de tournois et favoriser les échanges entre gamers. <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
