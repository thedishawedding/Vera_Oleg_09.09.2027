const REVEAL_SELECTOR = [
  ".hero__caps",
  ".hero__name",
  ".hero__amp",
  ".hero__date",
  ".location__title",
  ".location__caps",
  ".location__venue",
  ".location__divider",
  ".location__link",
  ".program__title",
  ".program__item",
  ".dresscode__title",
  ".dresscode__text",
  ".dresscode__color",
  ".wishes__title",
  ".wishes__accent",
  ".wishes__divider",
  ".wishes__text",
  ".rsvp__card",
].join(", ");

const STAGGER_SECONDS = 0.15;

const elements = document.querySelectorAll(REVEAL_SELECTOR);
elements.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, index) => {
        entry.target.style.setProperty(
          "--reveal-delay",
          `${index * STAGGER_SECONDS}s`,
        );
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
  },
  { threshold: 0.2 },
);

elements.forEach((el) => observer.observe(el));
