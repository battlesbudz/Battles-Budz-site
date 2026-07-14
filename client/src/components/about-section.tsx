import { Award, Heart, Leaf } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      icon: Award,
      title: "Veteran-Led",
      description: "Military discipline and values guide every aspect of our operation.",
    },
    {
      icon: Heart,
      title: "Community-Focused",
      description: "Building connections and preparing to serve the Buffalo community.",
    },
    {
      icon: Leaf,
      title: "Quality-Driven",
      description: "Uncompromising standards from cultivation to consumption.",
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
              <strong className="text-battles-black">Justin Battles</strong> first turned to cannabis at 14 as the only thing that helped him feel calm and focused. Later, during his eight years in the Army, he was diagnosed with ADHD and tried medications like Adderall and Ritalin, but they did not help. They killed his appetite, caused insomnia, and left him unfocused.
            </p>

            <p>
              During his military service, Justin injured his knees jumping out of planes, leading to his medical retirement. Cannabis was the one thing that helped him manage pain and stay clear-headed, inspiring him to learn everything he could about the plant.
            </p>

            <p>
              That passion led him to study cultivation and processing and grow medical cannabis for himself and his wife. At Battles Budz, Justin oversees cultivation and product creation, channeling his military discipline into building a Buffalo cannabis business that serves the community with integrity.
            </p>

            <p>
              The next chapter is Buffalo. We are not open for cannabis retail yet because the final state go-ahead still has to land, but the brand is moving: merch is live, accessory updates are open, and the cannabis menu will return when it is ready to sell legally and responsibly.
            </p>

            <div className="rounded-2xl bg-battles-black p-6 text-white">
              <p className="text-xl font-medium italic text-battles-gold">
                "We're building Battles Budz to be more than a storefront. The goal is a Buffalo cannabis brand with real products, real education, and a place people can trust. Until the doors open, every drop and every update is part of the build."
              </p>
              <p className="mt-4 text-sm">— Justin Battles, Founder & CEO</p>
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
