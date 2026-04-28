import { useEffect, useMemo, useState } from "react";

function ProfileSection({ name }) {
  const [typedText, setTypedText] = useState("");
  const typingSpeed = 120;
  const pauseAfterTyping = 1800;
  const pauseAfterDeleting = 450;

  const characters = useMemo(() => Array.from(name), [name]);

  useEffect(() => {
    if (characters.length === 0) {
      setTypedText("");
      return;
    }

    setTypedText("");

    let currentIndex = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      if (!isDeleting) {
        currentIndex += 1;
        setTypedText(characters.slice(0, currentIndex).join(""));

        if (currentIndex >= characters.length) {
          isDeleting = true;
          timer = setTimeout(tick, pauseAfterTyping);
          return;
        }

        timer = setTimeout(tick, typingSpeed);
        return;
      }

      currentIndex = 0;
      setTypedText("");

      isDeleting = false;
      timer = setTimeout(tick, pauseAfterDeleting);
      return;
    };

    timer = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timer);
  }, [characters, pauseAfterDeleting, pauseAfterTyping, typingSpeed]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center px-6">
      <h1 className="stalinist-one-regular text-center text-4xl tracking-wide text-zinc-100">
        {typedText}
        <span className="ml-1 inline-block animate-pulse" aria-hidden="true">
          |
        </span>
      </h1>
    </section>
  );
}

export default ProfileSection;
