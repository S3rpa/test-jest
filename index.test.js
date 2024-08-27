const { Room, Booking } = require('./index');

describe('isOccupied method test', () => {
    test('Should return true if room is occupied', () => {
        const booking = [ new Booking('John Doe', 'jhon@example.com', '2020-01-01', '2020-01-10', 0.1, 'Room 1') ];
        const room = new Room('Room 1', booking, 100, 0.1);
        expect(room.isOcuppied('2020-01-05')).toBe(true);
    })
})
    // describe('getTotalLikes', () => {
    //     test('should return the total likes of a user', () => {
    //       expect( getTotalLikes(user) ).toBe(230)
    //     })
    //   })