import React, { useEffect, useState } from 'react';
import '../Styles/addshops.css';
import { Addnavbar } from './Addnavbar';

export const Adaddshops = () => {

  const uid = localStorage.getItem('uid') || 'adminupload';

  const [uploadCompleted, setUploadCompleted] = useState(false);

  useEffect(() => {
    const uploadStatus = localStorage.getItem('uploadCompleted') === 'true';
    setUploadCompleted(uploadStatus);
  }, []);


  const [formData, setFormData] = useState({
    image_one: '',
    image_two: '',
    image_three: '',
    image_four: '',
    image_five: '',
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmitimg = async (event) => {
    event.preventDefault();
    const apiUrl = 'http://62.72.59.146:8001/productimage/';

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.setItem('uploadedData', JSON.stringify(data));
        alert("Shop Images Added")

        localStorage.setItem('uploadCompleted', 'true'); // Save upload status to local storage
        window.location.reload();

      } else {
        console.error('Error response from server:', data);
        alert("Product Images Not uploaded Refresh the page")
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error uploading data:', error);
    }

  };

  const renderImagePreview = (imageField) => {
    if (formData[imageField]) {
      return <img src={URL.createObjectURL(formData[imageField])} alt="Preview" width="100" />;
    }
    return null;
  };


  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price1, setPrice1] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');
  const [price4, setPrice4] = useState('');
  const [price5, setPrice5] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');
  const [title4, setTitle4] = useState('');
  const [title5, setTitle5] = useState('');




  const handleAddShop = () => {
    const apiUrl = 'http://62.72.59.146:3010/addShop';

    const storedData = localStorage.getItem('uploadedData') || '{}';
    const allimgnvid = JSON.parse(storedData);
    // console.log(allimgnvid.image_one);

    const postData = {
      uid: uid,
      title: shopName,
      location: location,
      description: description,
      category: category,

      image_one: allimgnvid.image_one,
      image_two: allimgnvid.image_two,
      image_three: allimgnvid.image_three,
      image_four: allimgnvid.image_four,
      image_five: allimgnvid.image_five,

      price1: price1,
      price2: price2,
      price3: price3,
      price4: price4,
      price5: price5,

      title1:title1,
      title2:title2,
      title3:title3,
      title4:title4,
      title5:title5,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        alert("Shop Data Added");

        setUploadCompleted(false);
        localStorage.removeItem('uploadedData');
        localStorage.setItem('uploadCompleted', 'false'); // Make sure to set the status in localStorage to false



        window.location.reload(false);

      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });
  };

  const storedData = localStorage.getItem('uploadedData') || '{}';
  const allimgnvid = JSON.parse(storedData);



  return (

    <div>

        <Addnavbar />
      <div className="add-shops-container">

      <div className="upload-images">

        <h2>Add Images of Shop</h2>

        <div className="file-upload">

          <input type="file" onChange={(e) => handleFileChange(e, 'image_one')} />
          <br />
          {renderImagePreview('image_one')}
          <br />

          <input type="file" onChange={(e) => handleFileChange(e, 'image_two')} />
          <br />
          {renderImagePreview('image_two')}
          <br />

          <input type="file" onChange={(e) => handleFileChange(e, 'image_three')} />
          <br />
          {renderImagePreview('image_three')}
          <br />

          <input type="file" onChange={(e) => handleFileChange(e, 'image_four')} />
          <br />
          {renderImagePreview('image_four')}
          <br />

          <input type="file" onChange={(e) => handleFileChange(e, 'image_five')} />
          <br />
          {renderImagePreview('image_five')}
          <br />


        </div>
      </div>

      <button className="upload-button" onClick={handleSubmitimg}>Upload Data</button>

      {uploadCompleted && (
        <form>
          <h2>Add Shops</h2>
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="input-field"
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          />

          <br />
          <div className='imgdet'>

          <img width="100px" src={allimgnvid.image_one} alt="" />
          <br />
          <label htmlFor="price1">Advertising Cost:</label>
          <input
            type="text"
            id="price1"
            value={price1}  
            onChange={(e) => setPrice1(e.target.value)}
            className="input-field"
            />
            <br />

          <label htmlFor="title1">Title For Image</label>
           <input
            type="text"
            id="title1"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
            className="input-field"
            />
            </div>
<br />

{allimgnvid.image_two ? (
<div className='imgdet'>
          <img width="100px" src={allimgnvid.image_two} alt="" />
          <br />
          <label htmlFor="price2">Advertising Cost:</label>
          <input
            type="text"
            id="price2"
            value={price2}  
            onChange={(e) => setPrice2(e.target.value)}
            className="input-field"
            />
            <br />

          <label htmlFor="title2">Title For Image</label>
           <input
            type="text"
            id="title2"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
            className="input-field"
          />
          </div>
) : null}
<br />
{allimgnvid.image_three ? (

<div className='imgdet'>
          <img width="100px" src={allimgnvid.image_three} alt="" />
          <br />
          <label htmlFor="price3">Advertising Cost:</label>
          <input
            type="text"
            id="price3"
            value={price3}  
            onChange={(e) => setPrice3(e.target.value)}
            className="input-field"
          />
            <br />

          <label htmlFor="title3">Title For Image</label>
           <input
            type="text"
            id="title3"
            value={title3}
            onChange={(e) => setTitle3(e.target.value)}
            className="input-field"
          />
          </div>
) : null}


<br />
{allimgnvid.image_four ? (
  <div className='imgdet'>
    <img width="100px" src={allimgnvid.image_four} alt="" />
    <br />
    <label htmlFor="price4">Advertising Cost:</label>
    <input
      type="text"
      id="price4"
      value={price4}  
      onChange={(e) => setPrice4(e.target.value)}
      className="input-field"
    />
    <br />
    <label htmlFor="title4">Title For Image</label>
    <input
      type="text"
      id="title4"
      value={title4}
      onChange={(e) => setTitle4(e.target.value)}
      className="input-field"
    />
  </div>
) : null}


<br />
{allimgnvid.image_five ? (

<div className='imgdet'>
          <img width="100px" src={allimgnvid.image_five} alt="" />
          <br />
          <label htmlFor="price5">Advertising Cost:</label>
          <input
            type="text"
            id="price5"
            value={price5}  
            onChange={(e) => setPrice5(e.target.value)}
            className="input-field"
          />
          <br />
          <label htmlFor="title5">Title For Image</label>
           <input
            type="text"
            id="title5"
            value={title5}
            onChange={(e) => setTitle5(e.target.value)}
            className="input-field"
          />
          </div>
) : null}


          <button type="button" onClick={handleAddShop} className="submit-button">
            Add Shop
          </button>
        </form>
      )}

    </div>
</div>
  );
};
