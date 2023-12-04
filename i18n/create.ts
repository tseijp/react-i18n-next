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
  const map = new Map<Lng, Map<Ids, string>>();
  const set = new Set<() => void>();
  const t = (id: Ids) => map.get(self.lng)?.get(id)!;

  const flush = (lng: Lng) => {
    self.lng = lng;
    set.forEach((f) => f());
  }

  const change = (lng: Lng) => {
    setLocalStorageLng(lng);
    i18nSet.forEach((_) => _.flush(lng));
  }

  const init = ({ resources, ...other }: I18NConfig<Lng, Ids>) => {
    Object.assign(self, other);
    if (!resources) return;
    for (let lng in resources) {
      if (!map.has(lng)) map.set(lng, new Map());
      const translation = resources[lng]?.translation;
      const languageMap = map.get(lng);
      for (const id in translation)
        languageMap?.set(id, translation[id]);
    }
  }

  if (options) init(options)

  const self = { lng: 'ja', map, set, t, flush, change, init } as I18N<Lng, Ids>
  i18nSet.add(self as any);
  return self;
};