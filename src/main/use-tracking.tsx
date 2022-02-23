import { useEffect } from "react";
import { useLocation } from "react-use";
import ReactGA from "react-ga";

export const useTracking = () => {
  let location = useLocation();
  useEffect(() => {
    if (location && location.pathname) {
      console.log(location.pathname);
      ReactGA.pageview(location.pathname);
    }
  }, [location]);
};
