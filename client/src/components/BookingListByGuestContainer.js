import React from 'react';
import { useParams } from 'react-router-dom';
import BookingListByGuest from './BookingListByGuest'; // Adjust the import path as needed

const BookingListByGuestContainer = () => {
  // Access the guestId parameter from the URL using useParams
  //const { guestId, serviceId } = useParams();

  return (
    <div>
      <BookingListByGuest />
    </div>
  );
};

export default BookingListByGuestContainer