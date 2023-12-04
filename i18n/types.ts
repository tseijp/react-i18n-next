export interface I18NConfig<
  Lng extends string = string,
  Ids extends string = string,
> extends Partial<I18N<Lng, Ids>> {
  resources?: {
    [key in Lng]: {
      translation: { [key in Ids]: string; };
    };
  };
}

export interface I18N<
  Lng extends string = string,
  Ids extends string = string,
> {
  debug: boolean;
  lng: Lng;
  map: Map<Lng, Map<Ids, string>>;
  set: Set<() => void>;
  t(id: Ids): string;
  flush(lng: Lng): void;
  change(lng: Lng): void;
  init(options: I18NConfig<Lng, Ids>): I18N<Lng, Ids>;
}