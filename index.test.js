const { Room, Booking } = require('./index')

describe('isOccupied method test', () => {
    test('Should return true if room is occupied', () => {
        const booking = [new Booking('John Doe', 'jhon@egmail.com', '2020-01-01', '2020-01-10', 10, 'Room 1')]
        const room = new Room('Room 1', booking, 100, 10)
        expect(room.isOccupied('2020-01-05')).toBe(true)
    })

    test('Should return false if room is not occupied', () => {
        const booking = [new Booking('Pepe', 'pepe@yahoo.com', '2020-01-01', '2020-01-10', 10, 'Room 2')]
        const room = new Room('Room 2', booking, 200, 20)
        expect(room.isOccupied('2020-01-15')).toBe(false)
    })

    test('occupancyPercentage method test', () => {
        const bookings = [
            new Booking('Javier', 'javier@yahoo.es', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 3'),
            new Booking('Sara', 'sara@gmail.com', new Date('2020-01-15'), new Date('2020-01-20'), 10, 'Room 4')
        ];
        const room = new Room('Room 3', bookings, 300, 30);
        const startDate = new Date('2020-01-01');
        const endDate = new Date('2020-01-15');

        const percentage = Math.round(room.occupancyPercentage(startDate, endDate));
        expect(Number.isInteger(percentage)).toBe(true);
        expect(percentage).toBe(73);

    });

    test('Should verify rate is a number', () => {
        const room = new Room('Room 1', [], 100, 10);
        expect(typeof room.rate).toBe('number');
    });

    test('Should verify discount is a number', () => {
        const room = new Room('Room 1', [], 100, 10);
        expect(typeof room.discount).toBe('number');
    });

    test('Should verify booking name is not empty', () => {
        const booking = new Booking('John Doe', 'john@example.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 1');
        expect(booking.name.trim().length).toBeGreaterThan(0);
    });

    test('Should verify email is a string', () => {
        const booking = new Booking('John Doe', 'john@example.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 1');
        expect(typeof booking.email).toBe('string');
    });
    test('Should verify check-in date is a valid date', () => {
        const booking = new Booking('John Doe', 'john@example.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 1');
        expect(booking.checkIn instanceof Date && !isNaN(booking.checkIn)).toBe(true);
    });

    test('Should verify check-out date is a valid date', () => {
        const booking = new Booking('John Doe', 'john@example.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 1');
        expect(booking.checkOut instanceof Date && !isNaN(booking.checkOut)).toBe(true);
    });

    test('Should verify check-out date is after check-in date', () => {
        const booking = new Booking('John Doe', 'john@example.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, 'Room 1');
        expect(booking.checkOut > booking.checkIn).toBe(true);
    });

    test('totalOccupancyPercentage method test', () => {
        const rooms = [
            new Room('Room 5', [
                new Booking('Samuel', 'samuel@correo.es', new Date('2020-01-01'), new Date('2020-01-10'), 50, 'Room 5')
            ], 1000, 10),
            new Room('Room 6', [
                new Booking('Rodrigo', 'rodri@correo.es', new Date('2020-01-12'), new Date('2020-01-22'), 10, 'Room 6')
            ], 1000, 10)
        ];
        const percentage = Math.round(Room.totalOccupancyPercentage(rooms, new Date('2020-01-05'), new Date('2020-01-20')));
        expect(Number.isInteger(percentage)).toBe(true);
        expect(percentage).toBe(47);
    });

    test('availableRooms method test', () => {
        const rooms = [
            new Room('Room 5', [
                new Booking('Samuel', 'samuel@correo.es', new Date('2020-01-01'), new Date('2020-01-10'), 50, 'Room 5')
            ], 1000, 10),
            new Room('Room 6', [
                new Booking('Rodrigo', 'rodri@correo.es', new Date('2020-01-12'), new Date('2020-01-22'), 10, 'Room 6')
            ], 1000, 10)
        ]
        const availableRooms = Room.availableRooms(rooms, new Date('2020-01-05'), new Date('2020-01-20'))
        expect(availableRooms).toHaveLength(1)
        expect(availableRooms[0].name).toBe('Room 6')
    })
})

describe('getFee method test', () => {
    test('Should return the correct fee', () => {
        const room = new Room('Room 7', [], 100, 10);
        const booking = new Booking('Luis', 'luis@correo.com', new Date('2020-01-01'), new Date('2020-01-10'), 10, room); // 10% discount on booking

        expect(booking.getFee()).toBe(810);
    });

})
