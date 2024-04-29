import React, { useState, useEffect } from 'react';
import '../Styles/adtable.css'


export const Adtable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://62.72.59.146:3010/allshops');
        const result = await response.json();
        setData(result.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table className="ad-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shop Title</th>
            <th>Owner name</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th>Shop Details</th>
            <th>Total Screens</th>
            <th>Total Amount</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Remark</th>
            <th>Image</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.title}</td>
              <td>{item.ownerName}</td>
              <td>{item.phoneNo}</td>
              <td>{item.location}</td>
              <td>{item.description}</td>
              <td>{item.screen}</td>
              <td>Rs. {item.cost * item.screen}</td>
              <td>{item.category}</td>
              <td>Rs. {item.price1}</td>
              <td>{item.remark}</td>

              <td>
                <img src={item.image_one} alt="Product" className="table-image" />
              </td>
              <td>
                {item.video_one && (
                  <video controls className="table-video">
                    <source src={item.video_one} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
