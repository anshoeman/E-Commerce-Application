import React, { useEffect } from 'react'
import { Link, redirect, useNavigate, useHistory, Navigate } from "react-router-dom";
import { Form, Button, Row, Col ,Table} from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteUser } from '../actions/userActions';
const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state=>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete
    const deleteHandler = (id)=>{
        if(window.confirm('Are u sure u want to delete this user?'))
        dispatch(deleteUser(id))
    }
    useEffect(()=>{
        if(userInfo&&userInfo.isAdmin)
            dispatch(listUsers())
        else
            navigate('/login')
    },[dispatch,successDelete,navigate])
  return (
    <div>
        {/* UserListScreen
        <h1>Users</h1> */}
        <h2 style={{marginTop:20,textAlign:'center'}}>Users Record</h2>
        {loading?<h1>Loading</h1>:error?<Alert variant="danger">{error}</Alert>:(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>ADMIN</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user=>{
                        return(
                        <tr key={user._id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user?.isAdmin?(
                                <i className='fas fa-check' style={{color:'green'}}></i>
                            ): <i className='fas fa-check' style={{color:'red'}}></i>}</td>
                            <td>
                                
                                {" "}
                                {" "}
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default UserListScreen