import { Plus } from "lucide-react";
import teamPhotoImg from "@assets/Screenshot_20250712_032136_Gallery_1752304907026.jpg";
import JobApplicationForm from "./job-application-form";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Justin & Andrea Battles",
      role: "Founding Team",
      description:
        "Justin is an Army veteran and CEO leading the brand vision, cultivation planning, and product direction. Andrea brings 15 years of sales and customer service experience to operations and customer experience.",
      image: teamPhotoImg,
    },
  ];

  return (
    <section id="team" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-playfair text-4xl font-bold text-battles-black md:text-5xl">
            Meet the <span className="text-yellow-700">Team</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-battles-gray">
            Meet the people building the Battles Budz experience in Buffalo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="overflow-hidden rounded-xl bg-gray-50 text-center shadow-lg">
              <img
                src={member.image}
                alt="Justin and Andrea Battles, Battles Budz founding team"
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-battles-black">{member.name}</h3>
                <p className="mb-4 font-semibold text-yellow-700">{member.role}</p>
                <p className="text-sm text-battles-gray">{member.description}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-xl border-2 border-dashed border-battles-gold bg-gray-50 text-center shadow-lg">
            <div className="flex h-64 w-full items-center justify-center bg-gray-200">
              <div className="text-center">
                <Plus className="mx-auto mb-4 h-16 w-16 text-yellow-700" aria-hidden="true" />
                <p className="font-semibold text-battles-gray">Join Our Team</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-2xl font-bold text-battles-black">Careers</h3>
              <p className="mb-4 font-semibold text-yellow-700">Future Opportunities</p>
              <p className="mb-4 text-sm text-battles-gray">
                Interested in joining Battles Budz as the Buffalo launch grows? Share your information and we will keep
                it on file for future roles.
              </p>
              <JobApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
