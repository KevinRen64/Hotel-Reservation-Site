import React, { useState, useEffect, Component } from 'react';
import items from './data';

const RoomContext = React.createContext();

const RoomProvider = ({children}) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('all');
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);



  const formatData = (items) => {
    return items.map(item => {
      const id = item.sys.id;
      const images = item.fields.images.map(image => image.fields.file.url);
      const room = {...item.fields, images, id};
      return room
    });
  };

  const getRoom = (slug) => {
    const room = rooms.find((room) => room.slug === slug.replace(':', ''))
    return room;
  }

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    switch (name) {
      case 'type':
        setType(value);
        break;
      case 'capacity':
        setCapacity(parseInt(value)); 
        break;
      case 'price':
        setPrice(parseInt(value));
        break;
      case 'minPrice':
        setMinPrice(parseInt(value));
        break;     
      case 'maxPrice':
        setMaxPrice(parseInt(value));
        break;   
      case 'minSize':
        setMinSize(parseInt(value));
        break;
      case 'maxSize':
        setMaxSize(parseInt(value));
      case 'breakfast':
        setBreakfast(value);
        break;
      case 'pets':
        setPets(value);
        break;
      default:
        break;
    }
    filterRooms()
    
    
  }
  
  const filterRooms = () => {
    //all the room
    let tempRooms = [...rooms];
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(room => room.size >=minSize && room.size <= maxSize)

    //filter by breakfast
    if(breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }

    //filter by pets
    if(pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    setSortedRooms(tempRooms);
  };

  useEffect(() => {
    filterRooms();
  }, [type, rooms, capacity, price, breakfast, pets]); // Add other relevant state variables here if needed


  useEffect(() => {
    const roomsData = formatData(items);
    setRooms(roomsData);
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      const featuredRoomsData = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      setPrice(maxPrice);
      setMaxPrice(maxPrice);
      setMaxSize(maxSize);
      setFeaturedRooms(featuredRoomsData);
      setSortedRooms(rooms);
      setLoading(false);
    }
  }, [rooms]);



  return (
    <RoomContext.Provider  value={{rooms, featuredRooms, sortedRooms, loading, getRoom, handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets}}>
      {children}
    </RoomContext.Provider>
  );
};


const RoomConsumer = RoomContext.Consumer




export {RoomProvider, RoomConsumer, RoomContext}