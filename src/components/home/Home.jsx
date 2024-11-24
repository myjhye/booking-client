import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";

export default function Home() {
    return (
        <section className="min-h-screen">
            <MainHeader />
            <section className="container mx-auto px-4">
                <RoomCarousel />
                <HotelService />
                <Parallax />
            </section>
        </section>
    )
}
