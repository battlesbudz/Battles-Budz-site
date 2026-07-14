import { Calendar, FlaskConical, PackageCheck, Shirt, Sofa, Sprout, Store, Truck } from "lucide-react";

export default function ServicesSection() {
  const current = [
    {
      icon: Shirt,
      title: "Merchandise",
      description: "Official Battles Budz apparel is available through the online store, including tees, hoodies, long sleeves, and tanks.",
    },
    {
      icon: PackageCheck,
      title: "Accessories",
      description: "Battery inquiries and wholesale conversations are available directly through the Battles Budz team.",
    },
    {
      icon: Truck,
      title: "Shipping",
      description: "Current online orders ship directly to customers. Pickup details will be announced with retail launch details.",
    },
  ];

  const future = [
    {
      icon: Sprout,
      title: "Cultivation",
      description: "Planned indoor cultivation focused on consistency, quality, and product integrity.",
    },
    {
      icon: FlaskConical,
      title: "Processing",
      description: "Infused products, beverages, and concentrates are part of the future licensed product lineup.",
    },
    {
      icon: Store,
      title: "Retail",
      description: "The Buffalo retail experience will introduce Battles Budz products and customer education in a compliant, age-gated setting.",
    },
    {
      icon: Sofa,
      title: "Consumption Lounge",
      description: "A future lounge concept designed around comfort, education, and responsible adult use.",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Educational and community programming will be announced through the update list.",
    },
  ];

  return (
    <section id="services" className="bg-battles-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 border border-yellow-300/40 bg-yellow-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
            Current offerings and future vision
          </p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
            Built as a <span className="text-battles-gold">microbusiness</span>.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Battles Budz is building toward a vertically integrated cannabis microbusiness. Today, customers can shop
            official apparel, ask about accessories, and follow Buffalo launch updates.
          </p>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">Available now</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {current.map((service) => {
              const IconComponent = service.icon;
              return (
                <article key={service.title} className="rounded-2xl border border-yellow-300/25 bg-zinc-950 p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-battles-gold">
                    <IconComponent className="h-7 w-7 text-black" />
                  </div>
                  <h4 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em] text-white">{service.title}</h4>
                  <p className="mt-3 leading-7 text-zinc-400">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">Opening soon in Buffalo</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {future.map((service) => {
              const IconComponent = service.icon;
              return (
                <article key={service.title} className="rounded-2xl border border-white/10 bg-black p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-300/40 text-battles-gold">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 text-xl font-black uppercase tracking-[-0.04em] text-white">{service.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
