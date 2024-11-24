export default function MainHeader() {
    return (
        <header 
            className="relative h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.6)), 
                url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                    Welcome to <span className="text-blue-400">Hotel Booking Site</span>
                </h1>
                <h4 className="text-xl md:text-2xl text-center">
                    Experience the Best Hospitality in Town
                </h4>
            </div>
        </header>
    )
}