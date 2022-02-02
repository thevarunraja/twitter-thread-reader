import find from "lodash/find";

export default async function checkForThemeChanges() {
  // @ts-ignore
  const theme = await cookieStore.get("night_mode");
  addThemeClassName(theme.value);
  // @ts-ignore
  cookieStore.addEventListener("change", (event) => {
    if (find(event.changed, { name: "night_mode" })) {
      addThemeClassName(find(event.changed, { name: "night_mode" }).value);
    }
  });
}

function addThemeClassName(value: string) {
  document.querySelector<HTMLElement>("body")?.classList.remove(`theme-0`);
  document.querySelector<HTMLElement>("body")?.classList.remove(`theme-1`);
  document.querySelector<HTMLElement>("body")?.classList.remove(`theme-2`);
  document.querySelector<HTMLElement>("body")?.classList.add(`theme-${value}`);
}
