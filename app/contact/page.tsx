import Image from "next/image";
import Discord from "@/components/logo/discord.jsx";
import Instagram from "@/components/logo/instagram.jsx";
import Twitch from "@/components/logo/twitch.jsx";
import X from "@/components/logo/x.jsx";
import Youtube from "@/components/logo/youtube.jsx";

export default function Calendrier() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[40px] font-bold text-center sm:text-left">
          Contactez nous
        </h1>
        <div className="flex flex-row gap-[16] items-center sm:items-start w-full">
          <p className="text-[20px] text-center sm:text-left text-foreground font-semibold">
            Besoin d’un devis ? <br/>
            Vous voudriez faire ou animer un tournoi, un événement ou une conférence jeu vidéo mais vous ne savez pas comment?
            Vous êtes un particulier, une association, une entreprise privée ou publique…
            Laissez nous faire et profitez pleinement de nos connaissances!
          </p>
          <h2 className="text-[16px] text-right sm:text-justify text-accent w-6xl">
            Une autre demande? <br/> <br />
            Une question, une demande, une remarque, une volonté, … <br />
            Nous restons à votre disposition pour répondre à vos messages. <br />
            Nous essaierons de revenir vers vous dans les plus brefs délais.
          </h2>
        </div>
        <p className="text-[20px] text-center sm:text-left">
          Par ce formulaire ou bien notre adresse email ou nos réseaux sociaux.
        </p>
        <div className="flex flex-row gap-[16] items-center sm:items-start w-full">
          <div className="flex flex-col gap-[16px] items-center sm:items-start w-100">
            <form action="https://formspree.io/f" method="POST" className="flex flex-col gap-[16px]">
              <input type="text" name="name" placeholder="Nom" required className="border-2 border-accent rounded-md p-2"/>
              <input type="email" name="email" placeholder="Email" required className="border-2 border-accent rounded-md p-2"/>
              <textarea name="message" placeholder="Message" required className="border-2 border-accent rounded-md p-2 h-[200px]"/>
              <button type="submit" className="bg-accent text-white rounded-md p-2">Envoyer</button>
            </form>
          </div>
          <div className="flex flex-col gap-[16px] items-center sm:items-start">
            <a href="mailto:rixe-arena-tournament@hotmail.com" className="text-[20px] text-center sm:text-left text-secondary/80 font-semibold">
              rixe-arena-tournament@hotmail.com
            </a>
            <ul className="flex gap-[24px] flex-wrap items-center justify-center sm:justify-start">
              <a href="https://www.instagram.com/rixe_arena_tournament/" target="_blank" rel="noopener noreferrer">
                <Instagram className="text-secondary/80 size-18"/>
              </a>
              <a href="https://www.twitch.tv/rixearenatournament" target="_blank" rel="noopener noreferrer">    
                <Twitch className="text-secondary/80 size-18"/>
              </a>    
              <a href="https://www.youtube.com/channel/UCJcTzMEe0RrE6_f5wZxPc2g" target="_blank" rel="noopener noreferrer">    
                  <Youtube className="text-secondary/80 size-18"/>
              </a>
              <a href="https://www.x.com/RixeArena" target="_blank" rel="noopener noreferrer">
                <X className="text-secondary/80 size-18"/>
              </a>
              <a href="https://www.discord.gg/gTEh9HT" target="_blank" rel="noopener noreferrer">
                <Discord className="text-secondary/80 size-18"/>
              </a>
            </ul>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
