import { languageState } from "atom";
import TRANSLATIONS from "constants/language";
import { useRecoilValue } from "recoil";
/** 다국어 변환해주는 커스텀 훅 */
const useTranslation = () => {
  const lang = useRecoilValue(languageState);
  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][lang];
  };
};

export default useTranslation;
