export default function Parallax() {
    return (
        <div 
            className="relative h-[400px] bg-fixed bg-cover bg-center mb-12"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.6)), 
                url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
            }}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    Welcome to <span className="text-blue-400">Hotel Booking Site</span>
                </h1>
                <h3 className="text-xl md:text-2xl text-center">
                    We offer the Best Services for all your needs
                </h3>
            </div>
        </div>
    )
}