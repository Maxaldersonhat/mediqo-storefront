export default function Banner() {
  return (
    <div className="relative hidden h-64 w-full overflow-hidden md:block lg:h-80">
      <img
        src="/banner.jpg"
        alt="Mediqo Solutions — quality medical equipment, delivered"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center bg-black/30">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            Quality medical equipment, delivered fast
          </h1>
          <p className="mt-2 max-w-lg text-white/90">
            Trusted supplies for clinics, homes, and professionals across Kenya.
          </p>
        </div>
      </div>
    </div>
  );
}