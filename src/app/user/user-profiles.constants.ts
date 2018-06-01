export const USER_PROFILES = {
  player: {
    tabs: [
      {
        name: 'Home',
        translatePath: 'header.tabs.home',
        path: '/home'
      },
      {
        name: 'Stats',
        translatePath: 'header.tabs.stats',
        path: 'stats'
      },
      {
        name: 'Opening',
        translatePath: 'header.tabs.opening',
        path: 'openings'
      }
    ]
  },
  company: {
    tabs: [
      {
        name: 'Home',
        translatePath: 'header.tabs.home',
        path: '/home'
      },
      {
        name: 'Stats',
        translatePath: 'header.tabs.stats',
        path: 'stats'
      },
      {
        name: 'My Openings',
        translatePath: 'header.tabs.myOpenings',
        path: 'my-openings'
      }
    ]
  },
  no_user: {
    tabs: [
      {
        name: 'Home',
        translatePath: 'header.tabs.home',
        path: '/home'
      },
      {
        name: 'Stats',
        translatePath: 'header.tabs.stats',
        path: 'stats'
      }
    ]
  }
};

export interface Tab {
  name: string;
  path: string;
}
