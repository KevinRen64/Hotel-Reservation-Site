import { useContext  } from 'react';
import { RoomContext } from '../context';

import React from 'react'
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

export default function FeaturedRooms() {
    const { loading, featuredRooms} = useContext(RoomContext);
    const rooms = featuredRooms.map(room => {
        return <Room key={room.id} room={room} />
    })
    //console.log(featuredRooms)
  return (
    <section className='featured-rooms'> 
      <Title title={"featured rooms"} />
      <div className='featured-rooms-center'>
      {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
  }

