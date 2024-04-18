import React, { useEffect } from 'react'
import './style.css'
import axios from 'axios'
import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

const UserData = () => {
  const [users,setUsers]=useState([]);
  const [filterusers,setFilterusers]=useState([]);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [userData,setUserData]=useState({
    name:"",age:"",city:""
  });

const getAllUsers=async()=>{
  await axios.get('http://localhost:8100/users/')
  .then((res)=>{
    console.log(res.data)
    setFilterusers(res.data)
    setUsers(res.data)
  })
}
const handleSearch=(e)=>{
  const searchText=e.target.value.toLowerCase();
  const filteredUsers=users.filter((user)=>user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText))
  setFilterusers(filteredUsers)
}
// ================================
const  handleDelete=async(id)=>{
  let yes=window.confirm("Confirm delete?")
if(yes)
{

  await axios.delete(`http://localhost:8100/users/${id}`).then((res)=>{
    setFilterusers(res.data)
    setUsers(res.data)
  })
}
}
// =============================================

const handleAddRecord=()=>{
 
  setUserData({name:"",age:"",city:""})
  setIsModalOpen(true)
}

const closeModal=()=>{
  setIsModalOpen(false)
  getAllUsers()
}

const handleData=(e)=>{
  setUserData({...userData,[e.target.name]:e.target.value})
}
const handleEdit=(user)=>{
    setUserData(user)
    setIsModalOpen(true)
}


const handleSubmit=async(e)=>{
    e.preventDefault();
    if(userData.id){
      await axios.patch(`http://localhost:8100/users/${userData.id}`,userData).then((res)=>{
      console.log(res);
    })

    }
    else{
      await axios.post("http://localhost:8100/users",userData).then((res)=>{
        console.log(res);
      })
    }
   closeModal();
   setUserData({name:"",age:"",city:""})
}
  useEffect(()=>{
    getAllUsers()
  },[])
  return (
    <div className='data'>
      <h1>Welcome to dashboard!</h1>
      <div className='input-search'>
        <TextField label='Search by name or city' variant='outlined' onChange={handleSearch}/>
        <Button color='success' variant='contained' onClick={handleAddRecord}>Add record</Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
         {
          filterusers && filterusers.map((user,index)=>{
            return(
              <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
              <Button color='success' variant='contained'
              onClick={()=>handleEdit(user)}>Edit</Button>
              </td>
              <td>
              <Button color='error' variant='contained' onClick={()=>handleDelete(user.id)}>Delete</Button>
              </td>
  
            </tr>
            )
          })
         }
          
        </tbody>
      </table>
      {isModalOpen && (
        <div className='modal'>
          <div className="modal-content">
            <span className='close' onClick={closeModal}>&times;</span>
            <h2>User Record</h2>
            <div className="input-group">
              <Stack spacing={2} direction='column'>

              <TextField label="Name" type='text' name='name' variant='outlined' value={userData.name}
              onChange={handleData} />
              <TextField label="Age" 
              type='number'variant='outlined'  name='age'  value={userData.age} 
              onChange={handleData}/>
              <TextField label="City" 
              type='text'
              variant='outlined' id='city' name='city' value={userData.city}
              onChange={handleData} />

              <Button color='success' variant='contained' onClick={handleSubmit}>Add new user / Edit</Button>
              </Stack>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserData
