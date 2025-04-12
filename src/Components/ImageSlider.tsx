import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: (
            <button className="absolute left-2 sm:left-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full shadow-lg z-10 transition-colors">
                &#10094;
            </button>
        ),
        nextArrow: (
            <button className="absolute right-2 sm:right-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full shadow-lg z-10 transition-colors">
                &#10095;
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2500,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 1500,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    const slides = [
        {
            img: `${import.meta.env.BASE_URL}/img11.png`,
            alt: "Коллекция 2025",
            link: "/collection-2025",
            text: "Кровати",
        },
        {
            img: `${import.meta.env.BASE_URL}/img1111.png`,
            alt: "Кровати",
            link: "/another-page",
            text: "Диваны",
        },
    ];

    return (
        <div className="w-full h-[50vh] sm:h-[70vh] relative overflow-hidden">
            <Slider {...settings} className="h-full">
                {slides.map((slide, index) => (
                    <Link to={slide.link} key={index} className="relative group cursor-pointer block h-[50vh] sm:h-[70vh]">
                        <div className="relative w-full h-full">
                            <img
                                src={slide.img}
                                alt={slide.alt}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{slide.text}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
