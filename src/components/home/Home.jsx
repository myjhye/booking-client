import { useLocation } from "react-router-dom";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";
import { useEffect, useState } from "react";

export default function Home() {
    
    const location = useLocation()
    const message = location.state && location.state.message

    // 로그인 알림 표시
    // !!message: message에 내용이 있으면 -> 알림을 보여준다
    const [showNotification, setShowNotification] = useState(!!message);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000); // 5초 후 사라짐

            return () => clearTimeout(timer);
        }
    }, [message])

    return (
        <section className="min-h-screen">
            <div className={`
                fixed top-4 left-1/2 -translate-x-1/2 z-50 
                transition-all duration-500 ease-in-out
                ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}>
            {message && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
                    {message}
                </div>
            )}
            </div>

            <MainHeader />
            <section className="container mx-auto px-4">
                <RoomCarousel />
                <HotelService />
                <Parallax />
            </section>
        </section>
    )
}
