import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table,Modal,InputGroup,FormControl } from 'react-bootstrap';
import Axios from 'axios';

class App extends Component {
  /** 
   * First we need to use json-server for API Fake data 
   *  see https://github.com/typicode/json-server for more detail.
   * 
   * We also need reactbootstrap  
   * see https://react-bootstrap.netlify.app/
   * 
  */
  constructor(){
    super();
    this.state = {
      books:[],
      newBookData:{
        title:'',
        rating:''
      },
      editBookData:{
        id: '',
        title:'',
        rating:''
      },
      newBookModal: false,
      editBookModal: false,
    }
  }
  
  handleClose(){
    this.setState({
      newBookModal: false
    })
  }
  /** install axios with npm
   *  add axios command 
   * 
  */
  componentDidMount(){
   this._refreshBook();
  }
 createNewBook(){
  Axios.post('http://localhost:3000/book',this.state.newBookData).then((response)=>{
    const {books} = this.state;
    books.push(response.data);
    this.setState({
      newBookModal:!this.state.newBookModal,
      books:books
    })
  })
}
editBook(id, title, rating){
  this.setState({
    editBookData:{id,title,rating},
    editBookModal:!this.state.editBookModal
  })
}
updateBook(){
  const { title,rating } = this.state.editBookData ;
   Axios.put('http://localhost:3000/book/'+this.state.editBookData.id,
         { 
           title:title,
           rating:rating
         }
         ).then((response)=>{
           this._refreshBook();
           this.setState({
             editBookModal:false,
             editBookData: {
               id:'',
               title:'',
               rating:''
             }
           })
         });
}
 toggleNewBook(){
   this.setState({
     newBookModal: true
   })
 }
 _refreshBook(){
  Axios.get('http://localhost:3000/book').then((response)=>{
    this.setState({
      books: response.data
    })
 });
 }
 toggleEditBook(){
  this.setState({
    editBookModal: true
  })
 }
 deleteBook(id){
   Axios.delete('http://localhost:3000/book/'+id).then((response)=>{
    this._refreshBook();
   })
 }
 handleCloseEditBook(){
  this.setState({
    editBookModal: !this.state.editBookModal 
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
                                 onChange={(e)=>
                                               {
                                                const { newBookData } = this.state
                                                newBookData.title = e.target.value;
                                                this.setState({
                                                  newBookData:newBookData
                                                })
                                               }
                                } 
                                 aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" >Rating</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="title"  defaultValue={this.state.newBookData.rating} 
                                 onChange={(e)=>{
                                                  const { newBookData } = this.state
                                                  newBookData.rating = e.target.value;
                                                  console.log(newBookData);
                                                  this.setState({
                                                    newBookData:newBookData
                                                  })
                                                }
                                           } 
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
              {/* 
                 La modification 
              */}  
              
              <Modal  show={this.state.editBookModal} onHide={this.handleCloseEditBook.bind(this)} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" >Title</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="title" defaultValue={this.state.editBookData.title}
                                 onChange={(e)=>
                                               {
                                                const { editBookData } = this.state
                                                editBookData.title = e.target.value;
                                                this.setState({
                                                  editBookData:editBookData
                                                })
                                               }
                                         } 
                                 aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm" >Rating</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl aria-label="title"  defaultValue={this.state.editBookData.rating} 
                                 onChange={(e)=>{
                                                  const { editBookData } = this.state
                                                  editBookData.rating = e.target.value;
                                                  this.setState({
                                                    editBookData: editBookData
                                                  })
                                                }
                                           } 
                                 aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  {/*
                    - editBook gère la mise à jour du state 
                    - update gère celle de l'API
                  */}
                  <Button variant="primary" onClick={this.updateBook.bind(this)}>
                    Update 
                  </Button>
                  <Button variant="secondary" onClick={this.handleCloseEditBook.bind(this)}>
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
                            <Button variant="success" className="mr-2" onClick={ this.editBook.bind(this, book.id, book.title, book.rating)}>Edit</Button>
                            <Button variant="danger" onClick={this.deleteBook.bind(this,book.id)}>Delete</Button>
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
