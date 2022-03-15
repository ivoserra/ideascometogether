import { useEffect, useState } from 'react';
import { setToLS, getFromLS } from '../utils/storage';
import _ from 'lodash';

//custom react hook, to manage the selected theme and to know whether the theme is loaded correctly.
//this hook will also return the selected theme from localStorage and a boolean indicating whether the theme is loaded correctly from localStorage.

// we used the Lodash library that provides utility functions for common programming tasks using a functional programming 
// paradigm.
//it has several built-in functions that makes coding easier and cleaner.

const useTheme = () => {
  const themes = getFromLS('all-themes');
  const [theme, setTheme] = useState(themes.data.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode) => {
    setToLS('theme', mode)
    setTheme(mode)
  }

  //_.values ==> Creates an array of the own enumerable string keyed property values of object.
  //_.mapValues ==> Creates an object with the same keys as object and values generated by running each own enumerable string keyed property of object thru iteratee. The iteratee is invoked with three arguments:
  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, 'font'));
    return allFonts
  }

  useEffect(() => {
    const localTheme = getFromLS('theme');
    localTheme ? setTheme(localTheme) : setTheme(themes.data.light)
    setThemeLoaded(true)
  }, [])

  return (
    { theme, themeLoaded, setMode, getFonts }
  )
}

export default useTheme