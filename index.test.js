const { Room, Booking } = require('./index')

describe('isOccupied method test', () => {
    test('Should return true if room is occupied', () => {
        const booking = [new Booking('John Doe', 'jhon@egmail.com', '2020-01-01', '2020-01-10', 0.1, 'Room 1')]
        const room = new Room('Room 1', booking, 100, 0.1)
        expect(room.isOccupied('2020-01-05')).toBe(true)
    })
    test('Should return false if room is not occupied', () => {
        const booking = [new Booking('Pepe', 'pepe@yahoo.com', '2020-01-01', '2020-01-10', 0.1, 'Room 2')]
        const room = new Room('Room 2', booking, 200, 0.2)
        expect(room.isOccupied('2020-01-15')).toBe(false)
    })
    test('occupancyPercentage method test', () => {
        const bookings = [
            new Booking('Javier', 'javier@yahoo.es', new Date('2020-01-01'), new Date('2020-01-10'), 0.1, 'Room 3'),
            new Booking('Sara', 'sara@gmail.com', new Date('2020-01-15'), new Date('2020-01-20'), 0.1, 'Room 4')
        ]
        const room = new Room('Room 3', bookings, 300, 0.3)

        const startDate = new Date('2020-01-01')
        const endDate = new Date('2020-01-15')

        expect(room.occupancyPercentage(startDate, endDate)).toBeCloseTo(73.33, 2)
    })
    test('totalOccupancyPercentage method test', () => {
        const rooms = [
            new Room('Room 5', [
                new Booking('Samuel', 'samuel@correo.es', new Date('2020-01-01'), new Date('2020-01-10'), 0.5, 'Room 5')
            ], 1000, 10),
            new Room('Room 6', [
                new Booking('Rodrigo', 'rodri@correo.es', new Date('2020-01-12'), new Date('2020-01-22'), 0.1, 'Room 6')
            ], 1000, 10)
        ]
        expect(Room.totalOccupancyPercentage(rooms, new Date('2020-01-05'), new Date('2020-01-20'))).toBeCloseTo(46.875, 2)
    })
    test('availableRooms method test', () => {
        const rooms = [
            new Room('Room 5', [
                new Booking('Samuel', 'samuel@correo.es', new Date('2020-01-01'), new Date('2020-01-10'), 0.5, 'Room 5')
            ], 1000, 10),
            new Room('Room 6', [
                new Booking('Rodrigo', 'rodri@correo.es', new Date('2020-01-12'), new Date('2020-01-22'), 0.1, 'Room 6')
            ], 1000, 10)
        ]
        const availableRooms = Room.availableRooms(rooms, new Date('2020-01-05'), new Date('2020-01-20'))
        expect(availableRooms).toHaveLength(1)
        expect(availableRooms[0].name).toBe('Room 6')
    })
})
describe('getFee method test', () => {
    test('Should return the correct fee', () => {
        const room = new Room('Room 7', [], 100, 0.1)
        const booking = new Booking('Luis', 'luis@correo.com', new Date('2020-01-01'), new Date('2020-01-10'), 0.1, room)
        expect(booking.getFee()).toBeCloseTo(998, 2)
    })
})
