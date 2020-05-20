import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table,Modal,Form } from 'react-bootstrap';
import Axios from 'axios';

class App extends Component {
  state = {
    books:[],
    newBookModal: false
  }
  componentDidMount(){
    Axios.get('http://localhost:3000/book').then((response)=>{
       this.setState({
         books: response.data
       })
    });
  }
 
 handleClose(){
  this.setState({
    newBookModal: false
  })
 }
 toggleNewBook(){
   this.setState({
     newBookModal: true
   })
 }
  render(){
    const { books } = this.state;
    return (
          <div className="App container mt-5">
              <h1>MY BOOK</h1>
              <Button variant="primary" onClick={this.toggleNewBook.bind(this)} className="">
                AddBook
              </Button>

              <Modal  show={this.state.newBookModal} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Create new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Id: <Form.Control type="text" placeholder="Id of book" /> <br/>
                  Title: <Form.Control type="text" placeholder="Title of book" /> <br/>
                  Rating: <Form.Control type="text" placeholder="Rating of book" /> <br/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.toggleNewBook.bind(this)}>
                    Save 
                  </Button>
                  <Button variant="secondary" onClick={this.toggleNewBook.bind(this)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {  books.map((book)=>{
                    return (
                        <tr key={book.id}>
                          <td>{book.id}</td>
                          <td>{book.title}</td>
                          <td>{book.rating}</td>
                          <td>
                            <Button variant="success" className="mr-2">Edit</Button>
                            <Button variant="danger">Delete</Button>
                          </td>
                        </tr>
                    )
                  })    
                 }
                </tbody>
              </Table>
          </div>
       );
  }
}
export default App;
