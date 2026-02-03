export type RootStackParamList = {
  MainTabs: undefined;
  VideoPlayer: {
    videoUrl?: string;
    title?: string;
    id?: string;
    type?: "movie" | "series";
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
  Browse: undefined;
  Detail: {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
    year?: string;
    rating?: string;
    duration?: string;
    type?: "movie" | "series";
  };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Account: undefined;
  Notifications: undefined;
  Playback: undefined;
  HelpCenter: undefined;
  About: undefined;
};
