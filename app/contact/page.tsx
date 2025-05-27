"use client";

import Image from "next/image";
import Discord from "@/components/logo/discord.jsx";
import Instagram from "@/components/logo/instagram.jsx";
import Twitch from "@/components/logo/twitch.jsx";
import X from "@/components/logo/x.jsx";
import Youtube from "@/components/logo/youtube.jsx";
import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // à compléter si jamais l'autre methode ne fonctionne pas
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Paint Splashes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-60 blur-sm z-10"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-pink-500 rounded-full opacity-50 blur-sm z-10"></div>
      <div className="absolute top-80 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-70 blur-sm z-10"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-400 rounded-full opacity-40 blur-sm z-10"></div>
      <div className="absolute bottom-20 left-20 w-14 h-14 bg-red-400 rounded-full opacity-60 blur-sm z-10"></div>
      <div className="absolute top-60 right-1/3 w-10 h-10 bg-indigo-400 rounded-full opacity-50 blur-sm z-10"></div>

      <div className="py-2 sm:py-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl text-center lg:text-left font-bold mb-6 sm:mb-10">
              Contactez nous
            </h1>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="text-center lg:text-left animate-fade-in-up">
                <p className="text-lg md:text-xl font-semibold text-secondary mb-4">
                  Besoin d’un devis ? 
                </p>
                <p className="text-lg md:text-xl mb-6">
                  Vous voudriez faire ou animer un tournoi, un événement ou une
                  conférence jeu vidéo mais vous ne savez pas comment? Vous êtes
                  un particulier, une association, une entreprise privée ou
                  publique… Laissez nous faire et profitez pleinement de nos
                  connaissances!
                </p>
              </div>

              <div className="text-center lg:text-left animate-fade-in-up animate-delay-200">
                <p className="text-lg md:text-xl font-semibold text-secondary mb-4">
                  Une autre demande? 
                </p>
                <p className="text-lg md:text-xl mb-6">
                  
                  Une question, une demande, une remarque, une volonté, … <br />
                  Nous restons à votre disposition pour répondre à vos messages.{" "}
                  <br />
                  Nous essaierons de revenir vers vous dans les plus brefs
                  délais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-accent relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">

              <div className="bg-gradient-to-br from-background/80 to-background rounded-3xl shadow-2xl p-8 md:p-12 border border-secondary">
                <h2 className="text-3xl font-bold text-primary mb-8">
                  Envoyez un message
                </h2>
                <form
                  action="https://formspree.io/f"
                  method="POST"
                  className="flex flex-col gap-[16px]"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                        placeholder="email@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="sujet"
                      name="sujet"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="Sujet"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-secondary rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                      placeholder="Votre message ici..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-secondary to-accent text-background py-4 px-8 rounded-xl font-semibold text-lg hover:from-secondary/80 hover:to-accent/80 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-background/80 to-background rounded-3xl p-8 border border-secondary">
                  <h3 className="text-2xl font-bold mb-6">
                    Suivez nous
                  </h3>
                  <p className="mb-6">
                    Suivez toutes nos aventures sur les réseaux sociaux et soyez mis au courant des prochains évènements.
                  </p>
                  <div className="flex flex-col gap-[16px] items-center sm:items-start">
                    <ul className="flex gap-[24px] flex-wrap items-center justify-center sm:justify-start">
                      <a
                        href="https://www.instagram.com/rixe_arena_tournament/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="text-secondary size-18" />
                      </a>
                      <a
                        href="https://www.twitch.tv/rixearenatournament"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitch className="text-secondary size-18" />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCJcTzMEe0RrE6_f5wZxPc2g"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Youtube className="text-secondary size-18" />
                      </a>
                      <a
                        href="https://www.x.com/RixeArena"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <X className="text-secondary size-18" />
                      </a>
                      <a
                        href="https://www.discord.gg/gTEh9HT"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Discord className="text-secondary size-18" />
                      </a>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-background/80 to-background rounded-3xl p-8 border border-secondary">
                  <h3 className="text-2xl font-bold mb-6">
                    Contact
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center rounded-full border-2 border-secondary justify-center">
                        <Mail className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-secondary">Email</p>
                        <a href="mailto:rixe-arena-tournament@hotmail.com">rixe-arena-tournament@hotmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}