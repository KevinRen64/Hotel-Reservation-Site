import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail,  FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";

export default class Services extends Component {
  state = {
    Services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
      },

      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
      },

      {
        icon: <FaShuttleVan />,
        title: "Free shuttle",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
      },

      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, corporis!"
      }
    ]
  }
  render() {
    return (
      <section className='services'>
        <Title title={"Services"}/>
        <div className='services-center'>
          {this.state.Services.map((item, index) => {
            return (            
            <article key={index} className='servicce'>
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>)
          })}
        </div>
      </section>
    )
  }
}
