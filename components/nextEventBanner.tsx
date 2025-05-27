import {Article} from "@/lib/articles";
import Link from "next/link";
import { Megaphone } from "lucide-react"


export function NextEventBanner({ nextEvent }: { nextEvent: Article | null }) {
    const nextE = nextEvent;
    if (nextE ==null || nextE==undefined) {
        return (
            <div className="bg-accent text-white py-2 px-4 relative z-10 flex justify-center">
            <span className="text-center">Aucun évènement à venir</span>
            </div>
        );
        } else {
        const formattedDate =
        nextE?.date instanceof Date
            ? nextE.date.toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
            })
            : new Date(nextE.date).toLocaleDateString("fr-FR", {
                month: "short",
                day: "numeric",
            })
            
        return (
            <div className="bg-accent text-white py-2 px-4 relative z-10">
            <Link href={`/events/${nextE._id}`} className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
                <Megaphone className="w-4 h-4 flex-shrink-0" />
                <span className="text-center">Prochain évènements le {formattedDate} à {nextE?.ville}, cliquez ici pour plus d'infos</span>
            </Link>
            </div>
        );
    }
}