import React from "react";
import { Link } from "react-router-dom";

const ItemsList = ({ items }) => {
  // <ul className='w-100 flex flex-nowrap overflow-x-scroll'>
  //   {items.map((item) => (
  //     <li className='card w-96 bg-base-100 shadow-xl' key={item._id}>
  //       <div className='card-body'>
  //         <h2 className='card-title'>{item.name}</h2>
  //         <p>{item.description.slice(0, 50)}</p>
  //         <div className='card-actions justify-start'>
  //           <button className='btn btn-primary'>Open Item</button>
  //         </div>
  //       </div>
  //     </li>
  //   ))}
  // </ul>
  return (
    <div className='carousel carousel-center max-w-prose p-4 space-x-4 bg-neutral rounded-box'>
      {items.map((item) => (
        <div
          className='card w-96 bg-base-100 shadow-xl carousel-item'
          key={item._id}
        >
          <div className='card-body'>
            <h2 className='card-title'>{item.name}</h2>
            <p>{item.description.slice(0, 50)}</p>
            <div className='card-actions justify-start'>
              <button className='btn btn-primary'>Open Item</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
