import { api, routes } from './routes.js';

async function getSettings(i18n) {
  const currentLang = i18n.language;
  let result = {};
  try {
    const response = await api.get(routes.settingsSetPath());
    const data = response.data.settings;
    result = {
      lng: data.lng === null || data.lng === undefined ? currentLang : data.lng,
      bgThemeEl: data.bgThemeEl === null || data.bgThemeEl === undefined ? 'el1' : data.bgThemeEl
    };
  } catch (e) {
    result = { lng: currentLang, bgThemeEl: 'el1'};
  }
  return result;
}

async function setSettings({ lng, bgThemeEl }) {
  try {
    await api.patch(routes.settingsSetPath(), { lng: lng, bgThemeEl: bgThemeEl });
  } catch (e) {
    console.log(e);
  }
}

export { getSettings, setSettings };