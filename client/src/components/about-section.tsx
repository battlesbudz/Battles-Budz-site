import { Award, Heart, Leaf } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      icon: Award,
      title: "Veteran-Led",
      description: "Military discipline and accountability guide how the brand is being built.",
    },
    {
      icon: Heart,
      title: "Community-Focused",
      description: "Battles Budz is preparing to serve Buffalo with clear information, hospitality, and trust.",
    },
    {
      icon: Leaf,
      title: "Quality-Driven",
      description: "Every product decision starts with consistency, education, and responsible adult use.",
    },
  ];

  return (
    <section id="about" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-[-0.05em] text-battles-black md:text-5xl">
            Our <span className="text-battles-gold">Story</span>
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-battles-gray">
            <p>
              <strong className="text-battles-black">Battles Budz</strong> is a veteran-owned cannabis microbusiness
              founded by Justin Battles, an Army veteran whose personal experience with cannabis shaped a deeper respect
              for the plant, the people who rely on it, and the responsibility that comes with building a cannabis brand.
            </p>

            <p>
              After military service and medical retirement, Justin studied cultivation and processing with the same
              discipline he brought to the Army. That work became the foundation for Battles Budz: a Buffalo cannabis
              brand built around quality, education, and trust.
            </p>

            <p>
              The retail experience is being built with the same care as the products. Customers can follow the launch,
              shop official apparel, and get to know the brand before the Buffalo doors open.
            </p>

            <div className="rounded-2xl bg-battles-black p-6 text-white">
              <p className="text-xl font-medium italic text-battles-gold">
                "Battles Budz is about quality, trust, and community. We want customers to know who we are before they
                ever walk through the door."
              </p>
              <p className="mt-4 text-sm">- Justin Battles, Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-center text-3xl font-black uppercase tracking-[-0.04em] text-battles-black">
            Our <span className="text-battles-gold">Values</span>
          </h3>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-battles-gold">
                    <IconComponent className="h-8 w-8 text-battles-black" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-battles-black">{value.title}</h4>
                  <p className="text-battles-gray">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
