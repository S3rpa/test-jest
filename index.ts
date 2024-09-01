class Room {
    name: string
    bookings: Booking[]
    rate: number
    discount: number

    constructor(name: string, bookings: Booking[], rate: number, discount: number) {
        this.name = name
        this.bookings = bookings || []
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date: Date): boolean {
        return this.bookings.some(booking => booking.checkIn <= date && booking.checkOut >= date)
    }

    occupancyPercentage(startDate: Date, endDate: Date): number {
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
        let occupiedDays = 0

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            if (this.isOccupied(d)) {
                occupiedDays++
            }
        }

        return (occupiedDays / totalDays) * 100
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number {
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
        let occupiedDays = 0

        rooms.forEach(room => {
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                if (room.isOccupied(d)) {
                    occupiedDays++
                }
            }
        })
        return (occupiedDays / (totalDays * rooms.length)) * 100
    }
    static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
        return rooms.filter(room => {
            return !room.bookings.some(booking => {
                return booking.checkIn <= endDate && booking.checkOut >= startDate;
            });
        });
    }


}

class Booking {
    name: string
    email: string
    checkIn: Date
    checkOut: Date
    discount: number
    room: Room

    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }
    getFee() {
        const days = (this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60 * 24) + 1
        const roomFee = days * this.room.rate * (1 - this.discount / 100)
        return roomFee * (1 - this.room.discount / 100)
    }
}

export { Room, Booking }