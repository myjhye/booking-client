export default function Header({ title }) {
    return (
        <header className="relative h-64 overflow-hidden">
            {/* 배경 이미지 */}
            <div className="absolute inset-0 bg-cover bg-center z-0"
                 style={{
                     backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
                 }}>
            </div>
            
            {/* 고급스러운 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
            
            {/* 컨텐츠 컨테이너 */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                          flex flex-col items-center justify-center z-30">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white 
                             tracking-wide leading-tight text-center
                             drop-shadow-lg mb-4">
                    {title}
                </h1>
                {/* 장식적 구분선 */}
                <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400"></div>
            </div>
        </header>
    )
 }