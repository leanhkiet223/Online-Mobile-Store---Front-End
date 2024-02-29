import Slider from "react-slick";
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';


const HomeSelectionCarousel = ({data,selectionName}) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" , borderRadius:'50%', opacity:'0.2'}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" , borderRadius:'50%', opacity:'0.2'}}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='relative px-4 lg:px-8'>
      <div className='relative p-5 border rounded-md'>
        <div className='flex justify-center'>
          <h2 className="text-lg font-bold text-gray-900 uppercase">{selectionName}</h2>
        </div>
        <Slider {...settings}>
          {
            data?.map((item, index) =>(
              <HomeSectionCard product={item} key={index} />
            ))
          }
        </Slider>
      </div>
    </div>
  );
};

export default HomeSelectionCarousel;
