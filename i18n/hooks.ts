import { useSyncExternalStore } from 'react';
import { createI18N } from "./create";
import { I18N } from './types'
import { getSnapshotLng, subscribeLng } from './utils';

const getServerSnapshot = () => '';

export const i18n = createI18N();

export const useTranslation = <
  Lng extends string = string,
  Ids extends string = string,
>(
  self = i18n as unknown as I18N<Lng, Ids>,
) => {
  useSyncExternalStore(subscribeLng, getSnapshotLng, getServerSnapshot)
  return self;
};