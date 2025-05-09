import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 sm:px-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[40px] font-bold text-center sm:text-left text-accent">
            Mentions légales
        </h1>
        <p className="text-[18px] text-center sm:text-left text-white/80">
        Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901, ayant pour titre : Rixe Arena Tournament<br/>
        <br/>
        Le siège social est fixé à l’adresse suivante :<br/>
        Chez Oswald Mickaël<br/>
        1 passage albert thomas<br/>
        81130 Cagnac les mines<br/>
        <br/>
        La présente association peut s’affilier à d’autres structures publiques ou privées dans l’unique cadre de ses activités et adhérer à d’autres associations, unions ou regroupements par décision du conseil d’administration.<br/>
        <br/>
        Les ressources de l’association comprennent :<br/>
        -les subventions de l’État, des départements et des communes.<br/>
        -les dons spontanés de personnes physiques ou morales.<br/>
        -toutes les ressources autorisées par les lois et règlements en vigueur.<br/>
        -les fonds récoltés lors d’évènements payants (buvette, merchandising, inscriptions).<br/>
        -les fonds récoltés lors de prestations de services.<br/>
        -la revente de droits de diffusion des événements ou la vente d’emplacements publicitaires.<br/>
        -la mise en location de son matériel.<br/>
        -les fonds récoltés lors de la vente de produits dérivés basés sur son image ainsi que l’image des événements qu’elle propose ou des marques qu’elle possède.<br/>
        <br/>
        L’argent récolté par l’association permet d’investir dans du matériel (écrans, consoles, jeux…), de couvrir les frais de fonctionnement de l’association et de financer ses propres événements.<br/>
        Toutes les fonctions, y compris celles des membres du conseil d’administration et du bureau, sont gratuites et bénévoles. Seuls les frais occasionnés par l’accomplissement de leur mandat sont remboursés sur justificatif et après validation du conseil d’administration. Le rapport financier présenté à l’assemblée générale ordinaire présente, par bénéficiaire, les remboursements de frais de mission, de déplacement ou de représentation.<br/>
        <br/>
        Les membres dits “staffs” de l’association pourront, si possible, être payés par des chèques emploi associatif (CEA) dans le cadre de la vente de prestation de service ou dans le cadre des activités de l’association.<br/>
        Ces évènements pourront être mis en place en partenariat avec d’autres associations, structures publiques ou privées.<br/>
        <br/>
        L’association pourra défrayer à ses frais des personnes lors d’événements organisés par elle-même ou une organisation tierce sous conditions.<br/>
        <br/>
        L’association peut déposer une marque qu’elle pourra exploiter dans le cadre de son financement.<br/>
        <br/>
        L’association peut se financer par la vente de produits dérivés basés sur son image ainsi que l’image des événements qu’elle propose ou des marques qu’elle possède.<br/>
        L’association peut se financer par la facturation de prestation de service lié à ses activités.<br/>
        <br/>
        L’association peut se financer par la location de son matériel auprès de personnes morales tiers.<br/>
        <br/>
        Les droits du public :<br/>
        – Lorsque vous participez aux événements organisés par l’association, vous êtes susceptibles d’être photographiés et d’apparaître sur des clichés que nous utiliserons pour la promotion de l’association ou de nos événements. Si vous souhaitez vous opposer à cela, contactez-nous pour faire valoir votre droit à l’image et nous ferons notre possible pour répondre à votre demande au plus vite.<br/>
        <br/>
        – Certaines de vos données personnelles peuvent être récoltées par l’association (inscription, financement ou autre). Ces informations sont soumises à la loi RGPD du 20 juin 2018 sur la protection des données. Elles sont donc protégées et ne peuvent être communiquées à d’autres sous aucun prétexte. Si vous souhaitez avoir accès aux données vous concernant pour une quelquonque modification ou suppression, contactez-nous pour faire valoir vos droits et nous répondrons à vos demandes dans les plus brefs délais.<br/>
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
