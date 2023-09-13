export const getElementValueById = (id: string): string | undefined => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  return (element as HTMLInputElement).value;
};
