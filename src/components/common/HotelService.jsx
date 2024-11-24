import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

export default function HotelService() {
    return (
        <div className="mb-8 py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-6">Our Services</h2>
                <div className="flex items-center justify-center gap-3 text-xl">
                    <span>Services at</span>
                    <span className="text-blue-600">Hotel Booking Site</span>
                    <span className="flex items-center gap-2 ml-4">
                        <FaClock /> 24-Hour Front Desk
                    </span>
                </div>
            </div>
            
            <hr className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: <FaWifi />, title: "WiFi", desc: "Stay connected with high-speed internet access." },
                    { icon: <FaUtensils />, title: "Breakfast", desc: "Start your day with a delicious breakfast buffet." },
                    { icon: <FaTshirt />, title: "Laundry", desc: "Keep your clothes clean and fresh with our laundry service." },
                    { icon: <FaCocktail />, title: "Mini-bar", desc: "Enjoy a refreshing drink or snack from our in-room mini-bar." },
                    { icon: <FaParking />, title: "Parking", desc: "Park your car conveniently in our on-site parking lot." },
                    { icon: <FaSnowflake />, title: "Air conditioning", desc: "Stay cool and comfortable with our air conditioning system." },
                ].map((service, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-600 mb-3">
                            {service.icon} {service.title}
                        </h3>
                        <p className="text-gray-600">{service.desc}</p>
                    </div>
                ))}
            </div>

            <hr className="mt-8" />
        </div>
    )
}