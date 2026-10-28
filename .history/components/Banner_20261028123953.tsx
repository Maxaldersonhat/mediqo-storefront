export default function Banner() {
  return (
    <div className="mx-auto hidden max-w-7xl px-4 pt-6 sm:px-6 md:block">
      <div className="relative h-56 overflow-hidden rounded-3xl lg:h-72">
        <img src="/banner.jpg" alt="Mediqo Solutions — pharmacy essentials delivered" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D3E]/95 via-[#0F3D3E]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F5A524]">
            Nairobi · Same-day delivery
          </p>
          <h1 className="mt-2 max-w-md text-3xl font-bold text-white lg:text-4xl">
            Medical essentials, sorted from home
          </h1>
          <p className="mt-2 max-w-md text-white/80">
            Pick what you need, confirm the order on WhatsApp — no app install needed.
          </p>
        </div>
      </div>
    </div>
  );
}