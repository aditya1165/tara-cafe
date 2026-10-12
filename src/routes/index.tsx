import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { submitInquiry } from "@/features/inquiries/inquiry.functions";
import type { InquiryInput } from "@/features/inquiries/inquiry.schema";
import heroLahpet from "@/assets/hero-lahpet.jpg";
import dishMohinga from "@/assets/dish-mohinga.jpg";
import dishLahpet from "@/assets/dish-lahpet.jpg";
import dishOhnno from "@/assets/dish-ohnno.jpg";
import aboutFamily from "@/assets/about-family.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tara Cafe — Burmese Catering in Los Angeles" },
      {
        name: "description",
        content:
          "Boutique Burmese catering by Tara Cafe in Los Angeles. Heritage recipes from Yangon and the Shan Hills for weddings, corporate events, and private suppers.",
      },
      { property: "og:title", content: "Tara Cafe — Burmese Catering in Los Angeles" },
      {
        property: "og:description",
        content: "Soulful Burmese catering for celebrations and gatherings in Los Angeles.",
      },
      { property: "og:image", content: heroLahpet },
    ],
  }),
  component: Home,
});

const heroSlides = [
  {
    src: heroLahpet,
    alt: "A Burmese-inspired dish presented in a decorative lacquerware bowl",
    caption: "Signature · Lahpet Thoke",
  },
  {
    src: gallery1,
    alt: "A colorful Burmese-inspired salad prepared for sharing",
    caption: "Gather · Share · Enjoy",
  },
  {
    src: gallery2,
    alt: "A Burmese-inspired curry and rice spread served on a banana leaf",
    caption: "Homemade · With Care",
  },
];

const services = [
  {
    n: "01 / 03",
    title: "Weddings & Galas",
    body: "Full-service multi-course feasts with bespoke menu curation, lacquerware-styled table service, and a chef-led team that treats your day like our own.",
  },
  {
    n: "02 / 03",
    title: "Corporate & Social",
    body: "Buffet spreads or individually-boxed lunches built around our signature salads, curries, and noodles. Designed to feel like a retreat, not a cafeteria run.",
  },
  {
    n: "03 / 03",
    title: "Private Suppers",
    body: "An intimate Burmese tasting prepared in your home — from a six-seat dinner party to a sun-soaked Sunday brunch on the patio.",
  },
];

const dishes = [
  {
    name: "Mohinga",
    badge: "House Specialty",
    img: dishMohinga,
    body: "Catfish chowder with lemongrass, ginger, garlic, and thin rice noodles. Served with split-pea fritters, hard-boiled egg, lime, and cilantro.",
  },
  {
    name: "Lahpet Thoke",
    badge: "Vegan Option",
    img: dishLahpet,
    body: "Fermented tea leaves tossed with toasted peanuts, fried garlic, sesame, tomato, and jalapeño. Savory, tart, and gloriously crunchy.",
  },
  {
    name: "Ohn No Khao Swè",
    badge: "Shan Heritage",
    img: dishOhnno,
    body: "Wheat noodles in a rich coconut-milk chicken curry, topped with soft-boiled egg, crispy noodles, raw onion, and a wedge of lime.",
  },
];

const gallery = [
  { src: gallery1, alt: "Samosa thoke with chickpeas and mint", h: "tall" },
  { src: gallery2, alt: "Coconut rice and chicken curry on banana leaf", h: "short" },
  { src: gallery3, alt: "Catered dinner table set with Burmese dishes", h: "short" },
  { src: gallery4, alt: "Sanwin makin Burmese semolina cake", h: "tall" },
];

const reasons = [
  {
    n: "01",
    title: "Homemade at Heart",
    body: "Every menu begins with the warmth and generosity of a home-cooked meal, then scales thoughtfully for your gathering.",
  },
  {
    n: "02",
    title: "Authentic Recipes",
    body: "Our food is rooted in Burmese recipes, time-honored techniques, and the layered flavors that make each dish feel familiar and distinct.",
  },
  {
    n: "03",
    title: "Made for Your Table",
    body: "From dietary needs to service style, we shape each menu around your guests and the kind of experience you want to share.",
  },
];

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For weddings and galas we recommend 8–12 weeks. Private suppers and corporate lunches can often be arranged with 7–10 days' notice.",
  },
  {
    q: "Do you accommodate dietary restrictions?",
    a: "Yes. Burmese cuisine is naturally rich in vegan, vegetarian, and gluten-free options, and we'll happily build a menu around any allergies.",
  },
  {
    q: "What's your minimum order?",
    a: "Catering minimums will vary by menu and service style. Share your guest count with us and we'll recommend the best fit for your gathering.",
  },
  {
    q: "Where do you cater?",
    a: "Greater Los Angeles, from the Westside to the San Gabriel Valley. Travel beyond is welcome — just ask.",
  },
];

function Home() {
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInquiryStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requiredString = (name: string) => String(formData.get(name) ?? "").trim();
    const optionalString = (name: string) => {
      const value = requiredString(name);
      return value || undefined;
    };

    const inquiry: InquiryInput = {
      fullName: requiredString("fullName"),
      email: requiredString("email"),
      phone: requiredString("phone"),
      preferredContact: requiredString("preferredContact") as InquiryInput["preferredContact"],
      eventDate: requiredString("eventDate"),
      eventType: requiredString("eventType") as InquiryInput["eventType"],
      eventLocation: requiredString("eventLocation"),
      guestCount: Number(formData.get("guestCount")),
      budgetRange: optionalString("budgetRange") as InquiryInput["budgetRange"],
      serviceStyle: optionalString("serviceStyle") as InquiryInput["serviceStyle"],
      dietaryNeeds: optionalString("dietaryNeeds"),
      eventDetails: requiredString("eventDetails"),
      contactConsent: formData.get("contactConsent") === "on",
      website: optionalString("website"),
    };

    try {
      await submitInquiry({ data: inquiry });
      form.reset();
      setInquiryStatus("success");
    } catch (error) {
      console.error(error);
      setInquiryStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="paper-texture pointer-events-none fixed inset-0 z-50" />

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="font-display text-2xl font-semibold uppercase tracking-tight text-primary"
          >
            Tara Cafe
          </a>
          <div className="hidden gap-8 font-mono text-xs uppercase tracking-widest md:flex">
            <a href="#menu" className="transition-colors hover:text-primary">
              Menu
            </a>
            <a href="#services" className="transition-colors hover:text-primary">
              Services
            </a>
            <a href="#gallery" className="transition-colors hover:text-primary">
              Gallery
            </a>
            <a href="#inquiry" className="transition-colors hover:text-primary">
              Contact
            </a>
          </div>
          <a
            href="#inquiry"
            className="rounded-full bg-primary px-5 py-2 font-mono text-xs font-medium uppercase tracking-widest text-primary-foreground transition-transform active:scale-95"
          >
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl items-end gap-12 md:grid-cols-12">
          <div className="animate-fade-up md:col-span-7">
            <p className="mb-2 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
              Tara Cafe
            </p>
            <div className="mb-7 flex items-center gap-3 font-mono text-xs text-primary">
              <span className="font-display text-base not-italic">တရာကာဖေ</span>
              <div className="h-px w-12 bg-primary/30" />
              <span>Est. Los Angeles</span>
            </div>
            <h1 className="mb-8 text-balance font-display text-5xl italic leading-[0.95] md:text-7xl lg:text-8xl">
              Burmese flavors, <br />
              <span className="text-primary">hand-carried</span> <br />
              to your table.
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-foreground/80">
              Boutique catering rooted in the soulful, textured, vibrantly spiced heritage of Yangon
              and the Shan Hills — cooked slowly, served warmly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="rounded-sm bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                Plan Your Event
              </a>
              <a
                href="#about"
                className="rounded-sm border border-primary/20 px-8 py-4 font-medium transition-all hover:bg-accent"
              >
                Our Story
              </a>
            </div>
          </div>
          <div className="relative animate-fade-up md:col-span-5 [animation-delay:200ms]">
            <HeroCarousel />
            <div className="absolute -bottom-6 -right-6 z-0 h-full w-full translate-x-2 translate-y-2 rounded-sm border border-primary/15" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-primary py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-16 px-10">
              {[
                ["မုန့်ဟင်းခါး", "Mohinga Sundays"],
                ["လက်ဖက်သုတ်", "Tea Leaf Tradition"],
                ["အုန်းနို့ခေါက်ဆွဲ", "Coconut Comfort"],
                ["ထမင်းကြော်", "Shan Suppers"],
                ["စမူဆာသုတ်", "Samosa Thoke"],
              ].map(([my, en]) => (
                <span key={en} className="flex items-center gap-6">
                  <span className="font-display text-2xl italic text-primary-foreground/50">
                    {my}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-widest text-primary-foreground">
                    {en}
                  </span>
                  <span className="text-primary-foreground/30">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <img
              src={aboutFamily}
              alt="A warm communal meal shared around a low dining table"
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-[3/4] w-full rounded-sm object-cover opacity-80 grayscale"
            />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Our Story
              </span>
              <h2 className="mt-3 mb-6 font-display text-4xl italic leading-tight md:text-5xl">
                Homemade with care, <br /> rooted in tradition.
              </h2>
              <p className="mb-6 leading-relaxed text-foreground/70">
                Tara Cafe brings the comfort and generosity of a home-cooked Burmese meal to every
                gathering. Our menus are inspired by authentic recipes, layered flavors, and the
                belief that food tastes best when it is prepared with patience and shared freely.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-tight">
                <div>
                  <span className="mb-1 block text-primary">Signature</span>
                  Fermented Lahpet
                </div>
                <div>
                  <span className="mb-1 block text-primary">Approach</span>
                  Slow & Small Batch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-accent/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Our Services
            </span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">For every celebration.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {services.map((s) => (
              <div
                key={s.n}
                className="group border border-border bg-background p-8 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="mb-10 font-mono text-xs text-primary">{s.n}</div>
                <h3 className="mb-4 font-display text-2xl">{s.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center md:mb-20">
            <h2 className="mb-4 font-display text-4xl italic md:text-5xl">The Taste of Home</h2>
            <p className="font-display text-base italic text-foreground/50">ရိုးရာဟင်းများ</p>
          </div>
          <div className="space-y-12 md:space-y-16">
            {dishes.map((d, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={d.name}
                  className={`flex flex-col items-center gap-8 md:flex-row ${
                    reversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-32 w-32 shrink-0 rounded-full object-cover shadow-[var(--shadow-soft)] md:h-40 md:w-40"
                  />
                  <div className={`min-w-0 flex-1 ${reversed ? "md:text-right" : ""}`}>
                    <div
                      className={`mb-2 flex items-baseline justify-between gap-4 border-b border-border/60 pb-1 ${
                        reversed ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <h4 className="font-display text-2xl md:text-3xl">{d.name}</h4>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {d.badge}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70">{d.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-16 flex justify-center md:mt-20">
            <a
              href="/tara-cafe-catering-menu.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="border-y border-border bg-accent/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Featured
              </span>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">From the table.</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {gallery.map((g, i) => (
              <img
                key={i}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`w-full rounded-sm object-cover shadow-[var(--shadow-soft)] ${
                  g.h === "tall" ? "aspect-[3/4]" : "aspect-square"
                } ${i % 2 === 1 ? "md:mt-12" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Tara Cafe */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Why Tara Cafe
            </span>
            <h2 className="mt-2 font-display text-4xl italic md:text-5xl">
              Food made to be shared.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.n}
                className="border border-border bg-background p-8 shadow-[var(--shadow-soft)]"
              >
                <div className="mb-8 font-mono text-xs text-primary">{reason.n} / 03</div>
                <h3 className="mb-4 font-display text-2xl">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry */}
      <section id="inquiry" className="border-t border-border px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="mb-8 font-display text-5xl italic md:text-6xl">Let's gather.</h2>
            <p className="mb-10 max-w-sm text-foreground/70">
              Tell us about the gathering you're dreaming up. We'll review the details and reach out
              with menu ideas, availability, and a custom quote.
            </p>
            <div className="mb-10 inline-flex items-center gap-3 border border-primary/15 bg-accent/40 px-4 py-3 font-mono text-[10px] uppercase tracking-widest">
              <span className="size-2 rounded-full bg-primary" />
              Online ordering coming soon
            </div>
          </div>

          <form
            className="rounded-sm border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-10"
            onSubmit={handleInquirySubmit}
            aria-busy={inquiryStatus === "submitting"}
          >
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="mb-8 border-b border-border pb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Catering Inquiry
              </span>
              <h3 className="mt-2 font-display text-3xl">Tell us about your event.</h3>
              <p className="mt-2 text-sm text-foreground/55">Fields marked with * are required.</p>
            </div>

            <div className="space-y-7">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full Name *">
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    required
                    className="w-full border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field label="Email *">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="w-full border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Phone *">
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    className="w-full border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field label="Preferred Contact *">
                  <select
                    name="preferredContact"
                    defaultValue=""
                    required
                    className="w-full appearance-none border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text message</option>
                  </select>
                </Field>
              </div>

              <div className="border-t border-border pt-7">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  Event Details
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Event Date *">
                    <input
                      type="date"
                      name="eventDate"
                      required
                      className="w-full border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                    />
                  </Field>
                  <Field label="Event Type *">
                    <select
                      name="eventType"
                      defaultValue=""
                      required
                      className="w-full appearance-none border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="wedding">Wedding or Gala</option>
                      <option value="corporate">Corporate or Social</option>
                      <option value="private-supper">Private Supper</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Event Location *">
                  <input
                    type="text"
                    name="eventLocation"
                    autoComplete="street-address"
                    placeholder="Venue or city"
                    required
                    className="w-full border-b border-border bg-transparent py-2 transition-colors placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field label="Estimated Guests *">
                  <input
                    type="number"
                    name="guestCount"
                    min={1}
                    placeholder="20"
                    required
                    className="w-full border-b border-border bg-transparent py-2 transition-colors placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Estimated Budget">
                  <select
                    name="budgetRange"
                    defaultValue=""
                    className="w-full appearance-none border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  >
                    <option value="">Not sure yet</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2500">$1,000–$2,500</option>
                    <option value="2500-5000">$2,500–$5,000</option>
                    <option value="5000-plus">$5,000+</option>
                  </select>
                </Field>
                <Field label="Service Style">
                  <select
                    name="serviceStyle"
                    defaultValue=""
                    className="w-full appearance-none border-b border-border bg-transparent py-2 transition-colors focus:border-primary focus:outline-none"
                  >
                    <option value="">Help me decide</option>
                    <option value="buffet">Buffet</option>
                    <option value="plated">Plated meal</option>
                    <option value="family-style">Family style</option>
                    <option value="drop-off">Drop-off catering</option>
                  </select>
                </Field>
              </div>

              <Field label="Dietary Needs or Allergies">
                <textarea
                  name="dietaryNeeds"
                  rows={3}
                  placeholder="Tell us about allergies, vegan or vegetarian guests, and other dietary needs."
                  className="w-full resize-none border-b border-border bg-transparent py-2 transition-colors placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                />
              </Field>

              <Field label="Tell Us About Your Gathering *">
                <textarea
                  name="eventDetails"
                  rows={5}
                  placeholder="Share the atmosphere, menu ideas, schedule, or anything else that will help us understand your event."
                  required
                  className="w-full resize-none border-b border-border bg-transparent py-2 transition-colors placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                />
              </Field>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-foreground/60">
                <input
                  type="checkbox"
                  name="contactConsent"
                  required
                  className="mt-1 size-4 shrink-0 accent-[var(--primary)]"
                />
                <span>
                  I agree that Tara Cafe may contact me about this inquiry and understand that
                  submitting a request does not confirm a booking.
                </span>
              </label>

              <button
                type="submit"
                disabled={inquiryStatus === "submitting"}
                className="w-full bg-primary py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
              >
                {inquiryStatus === "submitting" ? "Sending Inquiry…" : "Request a Catering Quote"}
              </button>

              <div className="min-h-6 text-center text-sm" aria-live="polite">
                {inquiryStatus === "success" && (
                  <p className="text-foreground">
                    Thank you. Your inquiry has been received, and we'll be in touch.
                  </p>
                )}
                {inquiryStatus === "error" && (
                  <p className="text-destructive">
                    We couldn't save your inquiry. Please review the form and try again.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-accent/30 px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1fr_2fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-4xl italic md:text-5xl">Good to know.</h2>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="mb-2 font-display text-xl">{f.q}</dt>
                <dd className="text-sm leading-relaxed text-foreground/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-6 py-16 text-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 text-center md:grid-cols-[1fr_auto] md:text-left">
          <div className="text-center md:text-left">
            <div className="font-display text-3xl tracking-tight">
              <span className="opacity-70">တရာကာဖေ</span> <span>Tara Cafe</span>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-50">
              Burmese Catering · Los Angeles
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-widest md:justify-end"
          >
            {[
              ["About", "#about"],
              ["Services", "#services"],
              ["Menu", "#menu"],
              ["Gallery", "#gallery"],
              ["FAQ", "#faq"],
              ["Contact Us", "#inquiry"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="opacity-65 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 md:col-span-2 md:border-t md:border-background/10 md:pt-6">
            © {new Date().getFullYear()} Tara Cafe LA · Made with spirit in Los Angeles
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  return (
    <div
      className="relative z-10 aspect-[4/5] w-full overflow-visible"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Tara Cafe dishes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-accent shadow-[var(--shadow-soft)] outline outline-1 -outline-offset-1 outline-black/5">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1024}
            height={1280}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeSlide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== activeSlide}
          />
        ))}

        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="grid size-9 place-items-center rounded-full border border-background/30 bg-foreground/55 text-lg text-background backdrop-blur-sm transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
            aria-label="Show previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={showNext}
            className="grid size-9 place-items-center rounded-full border border-background/30 bg-foreground/55 text-lg text-background backdrop-blur-sm transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
            aria-label="Show next image"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="absolute -bottom-4 left-4 z-20 bg-background/95 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary shadow-sm"
        aria-live="polite"
      >
        {heroSlides[activeSlide].caption}
      </div>

      <div className="absolute right-4 -bottom-3 z-20 flex gap-1.5" aria-label="Choose an image">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeSlide ? "w-6 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
            }`}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
        {label}
      </span>
      {children}
    </label>
  );
}
