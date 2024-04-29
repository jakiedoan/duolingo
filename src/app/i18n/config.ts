export const i18nConfig = {
  locales: ['en', 'vi', 'ja', 'ko', 'zh-CN'],
  defaultLocale: 'en',
};

export const locales = ['en', 'vi', 'ja', 'ko', 'zh-CN'];
export const defaultLocale = 'en';
const defaultNamespace = 'translation';

export function getOptions(lng = defaultLocale) {
  return {
    // debug: true,
    supportedLngs: locales,
    defaultLocale,
    lng,
    fallbackNS: defaultNamespace,
    defaultNamespace,
  };
}
