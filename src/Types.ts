export type StatusInfoProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  isRecentGuessMistake: boolean;
  language: LanguageType;
};

export type LanguageType = {
  name: string;
  color: string;
  backgroundColor: string;
};
