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
        <h2 className="text-[20px] text-center sm:text-left">
          Besoin d’un devis ? <br/>
          Vous voudriez faire ou animer un tournoi, un événement ou une conférence jeu vidéo mais vous ne savez pas comment?
          Vous êtes un particulier, une association, une entreprise privée ou publique…
          Laissez nous faire et profitez pleinement de nos connaissances!
        </h2>
        <h2 className="text-[16px] text-center sm:text-right">
          Une autre demande? <br/>
          Une question, une demande, une remarque, une volonté, …
          Nous restons à votre disposition pour répondre à vos messages.
          Nous essaierons de revenir vers vous dans les plus brefs délais.
        </h2>
        <p className="text-[20px] text-center sm:text-left">
          Par ce formulaire ou bien notre adresse email ou nos réseaux sociaux.
        </p>
        <div className="flex flex-col gap-[16px] items-center sm:items-start">
          <a href="mailto:rixe-arena-tournament@hotmail.com">
            rixe-arena-tournament@hotmail.com
          </a>
          <ul className="flex gap-[24px] flex-wrap items-center justify-center sm:justify-start">
            <a href="https://www.instagram.com/rixe_arena_tournament/" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-accent size-24"/>
            </a>
            <a href="https://www.twitch.tv/rixearenatournament" target="_blank" rel="noopener noreferrer">    
              <Twitch className="text-accent size-24"/>
            </a>    
            <a href="https://www.youtube.com/channel/UCJcTzMEe0RrE6_f5wZxPc2g" target="_blank" rel="noopener noreferrer">    
                <Youtube className="text-accent size-24"/>
            </a>
            <a href="https://www.x.com/RixeArena" target="_blank" rel="noopener noreferrer">
              <X className="text-accent size-24"/>
            </a>
            <a href="https://www.discord.gg/gTEh9HT" target="_blank" rel="noopener noreferrer">
              <Discord className="text-accent size-24"/>
            </a>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
