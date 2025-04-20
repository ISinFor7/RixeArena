import Image from "next/image";

export default function Calendrier() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[40px] font-bold text-center sm:text-left">
          Contactez nous
        </h1>
        <p className="text-[20px] text-center sm:text-left">
          Par ce formulaire ou bien notre adresse email ou nos réseaux sociaux.
        </p>
        <p>
            <a href="mailto:rixe-arena-tournament@hotmail.com">
                rixe-arena-tournament@hotmail.com
            </a>
            <a href="https://www.instagram.com/rixe_arena_tournament/" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                />
            </a>
            <a href="https://www.twitch.tv/rixearenatournament" target="_blank" rel="noopener noreferrer">    
                <Image
                    src="/twitch.png"
                    alt="Twitch"
                    width={24}
                    height={24}
                />
            </a>    
            <a href="https://www.youtube.com/channel/UCJcTzMEe0RrE6_f5wZxPc2g" target="_blank" rel="noopener noreferrer">    
                <Image
                    src="/youtube.png"
                    alt="Youtube"
                    width={24}
                    height={24}
                />
            </a>
            <a href="https://www.x.com/RixeArena" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/X.png"
                    alt="X"
                    width={24}
                    height={24}
                />
            </a>
            <a href="https://www.discord.gg/gTEh9HT" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/discord.png"
                    alt="Discord"
                    width={24}
                    height={24}
                />
            </a>
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
