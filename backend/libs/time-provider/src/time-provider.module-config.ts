export type TimeProviderModuleConfig =
  | {
      source: 'system';
    }
  | {
      source: 'fixed';
      date: Date;
    };
