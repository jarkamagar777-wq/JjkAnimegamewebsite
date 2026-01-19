import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import Animatedtitle from "./Animatedtitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
      transformOrigin: "center",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="story"
      className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative w-full flex flex-col items-center">
          <Animatedtitle
            title="The Story of Jujutsu Sorcerers and King of Curses <br/> who is Taking Over the World"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          {/* IMAGE CONTAINER */}
          <div className="story-img-container mt-10">
            <div className="story-img-mask">
              <div
                className="story-img-content"
                style={{ perspective: "1000px" }}
              >
                <img
                  ref={frameRef}
                  src="/img/jjk.jpg"
                  alt="Entrance"
                  className="object-contain will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TEXT + BUTTON */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImage;
