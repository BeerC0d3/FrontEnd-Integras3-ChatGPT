export const scrollToBottom = (newElementId: string) => {
  // const sectionElement: HTMLElement | null =
  //   document.getElementById(newElementId);
  const sectionElement: HTMLElement | null = document.querySelector(
    `[message="${newElementId}"]`
  );
  //console.log(sectionElement);

  sectionElement?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  // window.scrollTo(0, Position(sectionElement));
  //jump(sectionElement);
  // jump('#' + newElementId);
  // gsap.to(sectionElement, {
  //   delay: 2,
  //   duration: 1,
  //   y: 0,
  //   opacity: 1,
  // });

  // console.log(sectionElement);
  // window.scrollTo({
  //   top: sectionElement?.offsetTop,
  //   behavior: 'smooth',
  // });
};
