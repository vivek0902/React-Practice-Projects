import Accordian from "./components/accordian/index";
import CheckBox from "./components/checkBoxProblem";
import RandomColor from "./components/random-color/accordian";
import SearchBox from "./components/searchProblem";
import Select from "./components/selectOption";
import StarRating from "./components/starRating";
import EMI from "./components/emiCalulater";
import LanguageChanger from "./components/languageChanger";
import GeoLocation from "./components/geoLocation";
import Carousel from "./components/ImageCarousel";
import FileExplorer from "./components/fileExplorer";
import Tabs from "./components/tabs";
import SignalLight from "./components/signalLight";

function App() {
  return (
    <>
      <Accordian></Accordian>
      <RandomColor></RandomColor>
      <Select></Select>
      <CheckBox></CheckBox>
      <SearchBox></SearchBox>
      <EMI></EMI>
      <StarRating starCount={8}></StarRating>
      <GeoLocation />
      <LanguageChanger />
      <Carousel></Carousel>
      <FileExplorer></FileExplorer>
      <Tabs />
      <SignalLight />
    </>
  );
}

export default App;
