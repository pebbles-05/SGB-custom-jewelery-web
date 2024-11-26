// import Catagory from "@/components/Catagory";
import Bg from "@/components/Bg";
import Catagory from "@/components/Catagory";
import Hero from "@/components/Hero";
import HorizontalScrollComponent from "@/components/HorizontalScrollComponent";
import ImageSlider from "@/components/ImageSlider";
import TestPage from "@/components/TestPage";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      <div className="h-divider">
        <div className="shadow"></div>
        <div className="text2">
          <img src="https://t1.gstatic.com/images?q=tbn:ANd9GcQsmMfybMIwoE5etmOIAuvnFWdfv_8C1Bq15urJFqwhhI55FyYNP2YuUA" />
        </div>
      </div>
      
      <ImageSlider />
      <div className="h-divider">
        <div className="shadow"></div>
        <div className="text2">
          <img src="https://t1.gstatic.com/images?q=tbn:ANd9GcQsmMfybMIwoE5etmOIAuvnFWdfv_8C1Bq15urJFqwhhI55FyYNP2YuUA" />
        </div>
      </div>
      <HorizontalScrollComponent />
      <div className="h-divider">
        <div className="shadow"></div>
        <div className="text2">
          <img src="https://t1.gstatic.com/images?q=tbn:ANd9GcQsmMfybMIwoE5etmOIAuvnFWdfv_8C1Bq15urJFqwhhI55FyYNP2YuUA" />
        </div>
      </div>
      <Catagory />
      {/* <TestPage/> */}
      {/* <Bg /> */}
    </div>
  );
}
