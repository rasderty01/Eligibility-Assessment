//get the data from the form and return it as an object with labels as keys

function getFormDataWithLabels(form: HTMLFormElement | null) {
  if (!form) return {};

  const formData = new FormData(form);
  const dataWithLabels: Record<string, string> = {};

  Array.from(form.elements).forEach((element: any) => {
    if (element.name && formData.has(element.name)) {
      const label = element.labels?.[0]?.innerText || element.name;
      dataWithLabels[label] = formData.get(element.name) as string;
    }
  });

  return dataWithLabels;
}

export default getFormDataWithLabels;
