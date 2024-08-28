class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name
        this.bookings = bookings || []
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date) {
        return this.bookings.some(booking => booking.checkIn <= date && booking.checkOut >= date)
    }

    occupancyPercentage(startDate, endDate) {
        const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
        let occupiedDays = 0

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            if (this.isOccupied(d)) {
                occupiedDays++
            }
        }

        return (occupiedDays / totalDays) * 100
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) { 
        const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
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
    static availableRooms(rooms, startDate, endDate) {
        return rooms.filter(room => !room.isOccupied(startDate, endDate))
     }
}

class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }
    getFee() {
        const days = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24) + 1
        const roomFee = days * this.room.rate * (1 - this.discount / 100)
        return roomFee * (1 - this.room.discount / 100)
    }
}

module.exports = { Room, Booking }