export const scrollToBottom = (newElementId: string) => {
  // const sectionElement: HTMLElement | null =
  //   document.getElementById(newElementId);
  const sectionElement: HTMLElement | null = document.querySelector(
    `[message="${newElementId}"]`
  );

  //sectionElement?.style = height;

  sectionElement?.scrollIntoView({ block: 'end', behavior: 'smooth' });
};

export const scrollToWriting = () => {
  const sectionElement: HTMLElement | null = <HTMLFormElement>(
    document.getElementById('answer')
  );

  sectionElement?.scrollIntoView({ block: 'end', behavior: 'smooth' });
};
