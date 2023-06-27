import Image, { StaticImageData } from "next/image";
import {
  RenderSlideProps,
  isImageFitCover,
  useLightboxProps,
  isImageSlide,
  Slide,
} from "yet-another-react-lightbox";

function isNextJsImage(slide) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

/*
 * For JavaScript version of this sandbox please visit
 * https://codesandbox.io/p/sandbox/yet-another-react-lightbox-nextjs-bfjgb0?file=%2Fpages%2Findex.jsx
 */
export default function CampaignGallery({ slide, rect }) {

  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  // if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width:"100%", height:"100%" }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}
