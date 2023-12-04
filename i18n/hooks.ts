import { useCallback, useSyncExternalStore } from "react";
import { createI18N } from "./create";
import { I18N } from './types'

export const i18n = createI18N();

export const useTranslation = <
  Lng extends string = string,
  Ids extends string = string,
>(
  self = i18n as unknown as I18N<Lng, Ids>,
) => {
  const subscribe = useCallback((callback = () => {}) => {
    i18n.set.add(callback);
    return () => i18n.set.delete(callback);
  }, []);
  return useSyncExternalStore(subscribe, () => self);
};