import Loadable from "react-loadable";
// import createBrowserHistory from "history/createBrowserHistory";
// import createMemoryHistory from "history/createMemoryHistory";
import { createBrowserHistory, createMemoryHistory } from "history";
import ComponentCustomLoadingLazy from "../_component/loading/c.loading.lazy";

import { AppConstant } from "../../_constant/constant.app";

const historyPath = createBrowserHistory({
  basename: AppConstant.navigateRootPath
});

const historyMemory = createMemoryHistory({
  basename: AppConstant.navigateRootPath
});

export const HelperNavigateENUM = {
  LOGIN: "Login",
  HOME: "Home",
  BANK: "Bank",
  BANK_DETAIL: "Bank_Detail",
  ONBOARDING: "onBoarding",
  ONBOARDING_DETAIL: "onBoarding Detail"
};

const HelpNavigateMap = [
  {
    path: "/login",
    name: HelperNavigateENUM.LOGIN,
    component: () => {
      return Loadable({
        loader: () => import("../login/c.login"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        },
        delay: 50000,
        timeout: 10000
      });
    },
    isAuthenticated: false
  },
  {
    path: "/home",
    name: HelperNavigateENUM.HOME,
    component: () => {
      return Loadable({
        loader: () => import("../home/c.home"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: true
  },
  {
    path: "/logout",
    name: HelperNavigateENUM.LOGOUT,
    component: () => {
      return Loadable({
        loader: () => import("../logout/c.logout"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: false
  },
  {
    path: "/bank",
    name: HelperNavigateENUM.BANK,
    component: () => {
      return Loadable({
        loader: () => import("../bank/c.bank"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: true
  },
  {
    path: "/bank/details",
    name: HelperNavigateENUM.BANK_DETAIL,
    component: () => {
      return Loadable({
        loader: () => import("../bank/details/c.bank.detail"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: true
  },
  {
    path: "/onBoarding",
    name: HelperNavigateENUM.ONBOARDING,
    component: () => {
      return Loadable({
        loader: () => import("../onBoarding/c.onBoarding"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: true
  },
  {
    path: "/onBoarding/details",
    name: HelperNavigateENUM.ONBOARDING_DETAIL,
    component: () => {
      return Loadable({
        loader: () => import("../onBoarding/details/c.onBoarding.detail"),
        loading: props => {
          return ComponentCustomLoadingLazy.loadLoading(props);
        }
      });
    },
    isAuthenticated: true
  }
];

export default new (class HelperNavigate {
  historyObj() {
    if (AppConstant.isNavigateMemory()) {
      return historyMemory;
    } else if (AppConstant.isNavigatePath()) {
      return historyPath;
    }
  }

  route(path, param = {}) {
    console.log(" =>>= : path => " + path + " , param => ", param);
    this.historyObj().push(path, param);
  }

  mapList() {
    return HelpNavigateMap;
  }

  mapAuthenticate(navigatePath) {
    console.log(" =>.<= : navigatePath => " + navigatePath);

    for (let i = 0; i < HelpNavigateMap.length; i++) {
      let item = HelpNavigateMap[i];

      if (item["path"] === navigatePath) {
        return item["isAuthenticated"];
      }
    }
  }

  mapComponent(navigateEnum) {
    for (let i = 0; i < HelpNavigateMap.length; i++) {
      let item = HelpNavigateMap[i];

      if (item["name"] === navigateEnum) {
        return item["component"];
      }
    }
  }

  mapName(navigateEnum) {
    for (let i = 0; i < HelpNavigateMap.length; i++) {
      let item = HelpNavigateMap[i];

      if (item["name"] === navigateEnum) {
        return item["name"];
      }
    }
  }

  mapPath(navigateEnum) {
    for (let i = 0; i < HelpNavigateMap.length; i++) {
      let item = HelpNavigateMap[i];
      if (item["name"] === navigateEnum) {
        return item["path"];
      }
    }
  }

  isCurrentPath(navigateEnum) {
    for (let i = 0; i < HelpNavigateMap.length; i++) {
      let item = HelpNavigateMap[i];
      if (item["name"] === navigateEnum) {
        return item["path"] === this.historyObj().location.pathname;
      }
    }
  }
})();
