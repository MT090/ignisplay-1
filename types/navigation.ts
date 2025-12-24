export type RootStackParamList = {
  MainTabs: undefined;
  VideoPlayer: {
    videoUrl?: string;
    title?: string;
  };
  Account: undefined;
  Notifications: undefined;
  Playback: undefined;
  HelpCenter: undefined;
  About: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  MyListTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  // Add other home stack screens if needed
};

export type ProfileStackParamList = {
  Profile: undefined;
  Account: undefined;
  Notifications: undefined;
  Playback: undefined;
  HelpCenter: undefined;
  About: undefined;
};
