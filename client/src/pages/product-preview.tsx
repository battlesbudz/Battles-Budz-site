import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import SEOHead from "@/components/seo/SEOHead";
import { getCanonicalUrl } from "@/utils/seo";
import { productUpdateProducts, type ProductUpdateSlug } from "@shared/product-updates";
import freedomFogImage from "@assets/file_0000000084c86230b8826b578af0fa18_1752398828783.png";
import cosmicChewzImage from "@assets/20240228_223118_1752399041772.png";
import battleBrewImage from "@assets/file_00000000a95c61f9a7846b7990b6738f_1752399026270.png";

export type ProductPreview = {
  slug: ProductUpdateSlug;
  name: string;
  heading: string;
  image: string;
};

const productImages: Record<ProductUpdateSlug, string> = {
  "freedom-fog-vapes": freedomFogImage,
  "battles-budz-flower": "/media/category-flower.jpg",
  "heirloom-flower": "/media/category-flower.jpg",
  "pre-rolls": "/media/category-pre-rolls.jpg",
  edibles: cosmicChewzImage,
  "cosmic-chewz": cosmicChewzImage,
  concentrates: "/media/category-concentrates.jpg",
  "battle-brew": battleBrewImage,
};

export const productPreviews: Record<ProductUpdateSlug, ProductPreview> = {
  "freedom-fog-vapes": {
    ...productUpdateProducts["freedom-fog-vapes"],
    image: productImages["freedom-fog-vapes"],
  },
  "battles-budz-flower": {
    ...productUpdateProducts["battles-budz-flower"],
    image: productImages["battles-budz-flower"],
  },
  "heirloom-flower": {
    ...productUpdateProducts["heirloom-flower"],
    image: productImages["heirloom-flower"],
  },
  "pre-rolls": {
    ...productUpdateProducts["pre-rolls"],
    image: productImages["pre-rolls"],
  },
  edibles: {
    ...productUpdateProducts.edibles,
    image: productImages.edibles,
  },
  "cosmic-chewz": {
    ...productUpdateProducts["cosmic-chewz"],
    image: productImages["cosmic-chewz"],
  },
  concentrates: {
    ...productUpdateProducts.concentrates,
    image: productImages.concentrates,
  },
  "battle-brew": {
    ...productUpdateProducts["battle-brew"],
    image: productImages["battle-brew"],
  },
};

export default function ProductPreviewPage({ product }: { product: ProductPreview }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (emailAddress: string) => apiRequest("POST", "/api/product-updates/subscribe", {
      email: emailAddress,
      productSlug: product.slug,
    }),
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
      setFormError("");
      toast({
        title: "You're on the list.",
      });
    },
    onError: () => {
      setFormError("We couldn’t save your request. Please try again.");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailAddress = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
      setFormError("Enter a valid email address.");
      return;
    }

    setFormError("");
    mutation.mutate(emailAddress);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title={`${product.name} | Battles Budz`}
        canonicalUrl={getCanonicalUrl(`/products/${product.slug}`)}
      />
      <main id="main-content" className="border-b border-yellow-300/20 pt-24">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              {product.name}
            </h1>

            <div className="mt-10 max-w-xl rounded-2xl border border-yellow-300/25 bg-zinc-950 p-5 shadow-2xl shadow-yellow-300/5">
              {submitted ? (
                <div className="flex items-center gap-3 text-yellow-200" role="status" aria-live="polite">
                  <Check className="h-5 w-5" aria-hidden="true" />
                  <p className="text-lg font-black uppercase tracking-[-0.03em]">
                    You're on the list.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-3xl">
                    {product.heading}
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                    noValidate
                    aria-busy={mutation.isPending}
                  >
                    <label className="sr-only" htmlFor={`${product.slug}-email`}>
                      Product updates for {product.name}
                    </label>
                    <Input
                      id={`${product.slug}-email`}
                      name="email"
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (formError) {
                          setFormError("");
                        }
                      }}
                      aria-invalid={Boolean(formError)}
                      aria-describedby={formError ? `${product.slug}-email-error` : undefined}
                      className="h-12 flex-1 border-[#737373] bg-black text-white placeholder:text-zinc-400 focus:border-yellow-300"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="h-12 bg-yellow-300 px-7 font-black uppercase tracking-[0.12em] text-black hover:bg-yellow-200"
                    >
                      Notify Me
                    </Button>
                    {formError ? (
                      <p
                        id={`${product.slug}-email-error`}
                        className="w-full text-sm"
                        role="alert"
                      >
                        {formError}
                      </p>
                    ) : null}
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-300/20 bg-zinc-950 p-4">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
