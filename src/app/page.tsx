import Hero from "@/components/Hero";
import HorizontalScrollComponent from "@/components/HorizontalScrollComponent";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div id="about"><HorizontalScrollComponent/></div>
    </div>
  );
}
