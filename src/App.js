
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
  const [isEdit, setIsedit] = useState(-1);


  const [inputdata, setInputData] = useState({
    username: "",
    password: "",
    email: "",

  })
  const [records, setRecords] = useState([]);

  const handleChange = (j) => {

    setInputData({ ...inputdata, [j.target.name]: j.target.value })

  }

  const getData = () => {
    axios.get('http://localhost:8083/get-all')
      .then((res) => setRecords(res?.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleClick = () => {
    if (isEdit !== -1) {
      axios.put(`http://localhost:8083/user/update/${isEdit}`, inputdata)
        .then((res) => {getData();setIsedit(-1)})
        .catch((e) => console.log(e))
    }
    else {


      axios.post(`http://localhost:8083/create`, inputdata)
        .then((res) => getData())
        .catch((e) => console.log(e))
    }


  }
  const handleDelete = (hii) => {

    axios.delete(`http://localhost:8083/user/delete/${hii}`)
      .then((res) => getData())
      .catch((e) => console.log(e))
    const hello = records?.filter((item, index) => { return index !== hii })
    setRecords(hello);
    // 3n

  }

  const handleEdit = (hello) => {
    setIsedit(hello);
    const janvi = records?.find((item, index) => { return item?._id === hello })
    setInputData(janvi);

  }



  return (
    <div>
      <h1>Personal Details</h1>
      <div>
        <lable for='fname'>First Name</lable>
        <input type='text' id='fname' name='username' value={inputdata.username} onChange={(j) => handleChange(j)} />
      </div>
      <div>
        <lable for='lname'>Last Name</lable>
        <input type='text' id='lname' name='password' value={inputdata.password} onChange={(j) => handleChange(j)} />
      </div>
      <div>
        <lable for='email'>Email</lable>
        <input type='text' id='email' name='email' value={inputdata.email} onChange={(j) => handleChange(j)} />
      </div>
      <button onClick={() => handleClick()}>Submit</button>

      <table>
        <thead>
          <th>Name</th>
          <th>LASTNAME</th>
          <th>Gender</th>
          <th>Age</th>
        </thead>
        <tbody>
          {
            records?.map((item, index) => {
              return (
                <tr>
                  <td>{item?.username}</td>
                  <td>{item?.password}</td>
                  <td>{item?.email}</td>
                  <td><button onClick={() => handleDelete(item?._id)}>Delete</button></td>
                  <td><button onClick={() => handleEdit(item?._id)}>Edit</button></td>


                </tr>
              )
            })
          }
        </tbody>
      </table>


    </div>
  );
}
export default Data;
