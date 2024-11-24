import { useEffect } from "react"
import { useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Carousel, Container } from "react-bootstrap"
import RoomCard from "../room/RoomCard"

export default function RoomCarousel() {
    
    const [rooms, setRooms] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        getAllRooms()
            .then((data) => {
                setRooms(data.slice(0, 3))
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                loading room..
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-danger">
                Error: { error }
            </div>
        )
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow py-5">
            <div className="flex justify-end mb-4">
                <Link
                    to={"/browse-all-rooms"}
                    className="text-sm font-bold text-blue-600 hover:text-gray-800 mr-5"
                >
                    모든 객실 조회하기 →
                </Link>
            </div>

            <div className="container">
                <div className="flex flex-col space-y-4">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </section>
    );
}