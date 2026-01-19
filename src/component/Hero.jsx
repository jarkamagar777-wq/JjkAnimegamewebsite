import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { Navigation } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setcurrentIndex] = useState(1);
  const [hasClicked, sethasClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [LoadedVideo, setLoadedVideo] = useState(0);

  const totalVideos = 4;

  const miniVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    sethasClicked(true);
    setcurrentIndex(upcomingVideoIndex);
  };

  /* ✅ Loader logic fix */
  useEffect(() => {
    // There are 3 <video> elements that trigger onLoadedData
    if (LoadedVideo >= 3) {
      setisLoading(false);
    }
  }, [LoadedVideo]);

  /* ✅ GSAP animation for next video */
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  /* ✅ ScrollTrigger for video frame */
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      duration: 0.7,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loader */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video Frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini hover video */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 cursor-pointer transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                key={`mini-${upcomingVideoIndex}`} // ✅ force React to reload
                ref={miniVideoRef}
                loop
                muted
                playsInline
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              >
                <source
                  src={`videos/hero-${upcomingVideoIndex}.webm`}
                  type="video/webm"
                />
                <source
                  src={`videos/hero-${upcomingVideoIndex}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* Next video animation */}
          <video
            key={`next-${currentIndex}`} // ✅ force React to reload
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          >
            <source
              src={`videos/hero-${currentIndex}.webm`}
              type="video/webm"
            />
            <source
              src={`videos/hero-${currentIndex}.mp4`}
              type="video/mp4"
            />
          </video>

          {/* Background autoplay video */}
          <video
            key={`bg-${currentIndex}`} // ✅ force React to reload
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          >
            <source
              src={`videos/hero-${
                currentIndex === totalVideos ? 1 : currentIndex
              }.webm`}
              type="video/webm"
            />
            <source
              src={`videos/hero-${
                currentIndex === totalVideos ? 1 : currentIndex
              }.mp4`}
              type="video/mp4"
            />
          </video>
        </div>

        {/* Heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-50">
          G<b>a</b>ming
        </h1>

        {/* Text + Button */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              RyoI<b>K</b>i <br/> Tenk<b>a</b>i
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter to the Anime World <br /> Unleash Your Skill
            </p>

            <Button
              id="watch-trailer"
              title="watch Trailer"
              leftIcon={Navigation}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
