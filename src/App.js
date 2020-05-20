import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table,Modal,InputGroup,FormControl } from 'react-bootstrap';
import Axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      books:[],
      newBookData:{
        id:'',
        title:'',
        rating:''
      },
      newBookModal: false
    }
    this.onChange = this.handleTitleChange.bind(this)
   
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
 createNewBook(){
  Axios.post('http://localhost:3000/book',this.state.newBookData).then((response)=>{
    console.log(response.data);
    const {books} = this.state;
    books.push(response.data);
    this.setState({
      books:books
    })
  })
}
 toggleNewBook(){
   this.setState({
     newBookModal: true
   })
 }
 handleTitleChange(e){
   const { newBookData } = this.state
   newBookData.title = e.target.value;
   console.log(newBookData);
   this.setState({
     newBookData:newBookData
   })
 }
 handleRatingChange(e){
  const { newBookData } = this.state
  newBookData.rating = e.target.value;
  console.log(newBookData);
  this.setState({
    newBookData:newBookData
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

              <Modal  show={this.state.newBookModal} onHide={this.handleClose.bind(this)} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Create new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" >Title</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="title" defaultValue={this.state.newBookData.title}
                                 onChange={(e)=>this.handleTitleChange.bind(this)} 
                                 aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" >Rating</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="title"  defaultValue={this.state.newBookData.rating} 
                                 onChange={(e)=>this.handleRatingChange.bind(this)} 
                                 aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.createNewBook.bind(this)}>
                    Save 
                  </Button>
                  <Button variant="secondary" onClick={this.handleClose.bind(this)}>
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
