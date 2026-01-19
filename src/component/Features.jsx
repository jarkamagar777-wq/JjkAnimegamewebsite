import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* ---------------- Bento Tilt ---------------- */
export const BentoTilt = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const onMove = (e) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setTransform(
      `perspective(700px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(0.96)`
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTransform("")}
      style={{ transform }}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

/* ---------------- Bento Card ---------------- */
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      {/* Video */}
      <video
        src={`/${src}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 text-blue-50 bg-black/10 backdrop-blur-[1px]">
        <div>
          <h2 className="bento-title special-font text-3xl">
            {title}
          </h2>

          {description && (
            <p className="mt-3 max-w-xs text-sm opacity-80">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div className="flex items-center gap-2 w-fit rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs uppercase">
            <ArrowUpRight size={14} />
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- Features Section ---------------- */
const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-4 md:px-10">
        {/* Intro */}
        <div className="py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>

          <p className="mt-4 max-w-md text-blue-50/50">
            JM Void is a cross-platform meta-gaming universe blending anime
            aesthetics, cinematic visuals, and interactive systems into one
            immersive digital experience.
          </p>
        </div>

        {/* Main Feature */}
        <BentoTilt className="relative mb-10 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.webm"
            title={
              <>
                呪<b>術</b>廻戦
              </>
            }
            description="A cross-platform metagame app transforming gameplay into a rewarding adventure."
            isComingSoon
          />
        </BentoTilt>

        {/* Grid */}
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="row-span-2">
            <BentoCard
              src="videos/feature-2.webm"
              title={
                <>
                  Mei<b>m</b>ei
                </>
              }
              description="Anime-character of Jujutsu Kaisen. Mei Mei is known for her beauty and strength."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt>
            <BentoCard
              src="videos/feature-3.webm"
              title={
                <>
                  Ma<b>K</b>i Z<b>en</b>in
                </>
              }
              description="Curse less girl with a strong will to protect her loved ones."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt>
            <BentoCard
              src="videos/feature-4.webm"
              title={
                <>
                  uta<b>h</b>ime <b>l</b>ori
                </>
              }
              description="An AI-powered companion enhancing gameplay."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bg-violet-300 rounded-md">
            <div className="flex h-full flex-col justify-between p-6 text-black">
              <h2 className="bento-title special-font text-4xl">
                More co<b>m</b>ing so<b>o</b>n
              </h2>
              <ArrowUpRight size={56} className="self-end" />
            </div>
          </BentoTilt>

          <BentoTilt>
            <video
              src="/videos/feature-5.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-md"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
