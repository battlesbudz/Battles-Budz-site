import { Calendar, Coffee, GraduationCap, Mail, Music, Palette, Users } from "lucide-react";

export default function EventsSection() {
  const eventTypes = [
    {
      name: "Education Nights",
      description: "Cannabis basics, responsible use, product education, and behind-the-brand conversations.",
      icon: GraduationCap,
    },
    {
      name: "Community Sessions",
      description: "Small local gatherings built around Buffalo culture, veterans, art, music, and cannabis education.",
      icon: Users,
    },
    {
      name: "Creative Events",
      description: "The future calendar may include paint sessions, live music, glass demos, and brand pop-ups.",
      icon: Palette,
    },
  ];

  return (
    <section id="events" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 border border-yellow-500/30 bg-yellow-100 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-battles-black">
            <Calendar className="h-4 w-4" /> Community events
          </p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.06em] text-battles-black sm:text-6xl">
            Education, culture, and community.
          </h2>
          <p className="mt-5 text-lg leading-8 text-battles-gray">
            Battles Budz plans to host age-gated education and community programming as the Buffalo retail experience
            grows. Join the update list for announcements.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {eventTypes.map((event) => {
            const IconComponent = event.icon;
            return (
              <article key={event.name} className="rounded-2xl bg-white p-8 text-center shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-battles-gold">
                  <IconComponent className="h-8 w-8 text-black" />
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase tracking-[-0.04em] text-battles-black">{event.name}</h3>
                <p className="mt-4 leading-7 text-battles-gray">{event.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl bg-battles-black p-8 text-white shadow-xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex gap-4 text-battles-gold">
                <Coffee className="h-6 w-6" />
                <Music className="h-6 w-6" />
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.05em]">Stay close to the calendar.</h3>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">
                Join the update list for event announcements, apparel drops, and Buffalo launch news.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <button
                onClick={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center rounded-lg bg-battles-gold px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-yellow-300"
              >
                Get event updates
              </button>
              <a
                href="mailto:battlesbudz@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-battles-gold px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-battles-gold transition hover:bg-battles-gold hover:text-black"
              >
                Contact us <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
