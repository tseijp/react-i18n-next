import type { I18N, I18NConfig } from "./types";

export const i18nSet = new Set<I18N>();

export const setLocalStorageLng = <Lng extends string = string>(lng: Lng) => {
  if (typeof localStorage !== "undefined") localStorage.setItem("lng", lng);
};

export const createI18N = <
  Lng extends string = string,
  Ids extends string = string,
>(
  options?: I18NConfig<Lng, Ids> & Partial<I18N<Lng, Ids>>,
) => {
  const self = {
    lng: "ja",
    map: new Map(),
    set: new Set(),
    t(id: Ids) {
      return self.map.get(self.lng)?.get(id)!;
    },
    flush(lng: Lng) {
      self.lng = lng
      self.set.forEach((f) => f())
    },
    change(lng: Lng) {
      setLocalStorageLng(lng);
      i18nSet.forEach((_) => _.flush(lng));
    },
    init({ resources, ...other }) {
      Object.assign(self, other);
      if (!resources) return;
      for (let lng in resources) {
        if (!self.map.has(lng)) self.map.set(lng, new Map());
        const translation = resources[lng]?.translation;
        const languageMap = self.map.get(lng);
        for (const id in translation)
          languageMap?.set(id, translation[id]);
      }
    },
  } as I18N<Lng, Ids>;;

  i18nSet.add(self as any);

  if (options) self.init(options);

  return self;
};