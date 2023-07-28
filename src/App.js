import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

let viewdata = []
let viewArray = {}
let newimage = []
let newimg = []
let dataArray = []
let bimg = []
let o = false
let characters = []



export default class Home extends Component {

    state = {
        viewArray: [],
        view: [],
        array: [],
        arrayi: {},
        name: '',
        detail: '',
        price: '',
        textarea: '',
        file: '',
        bimg: '',
        imagePreviewUrl: '',
        newimg: [],
        newimg1: [],
        editdata: '',
        viewdata: '',
        mainImage: '',
        hello: [],
        button: '',
        characters: []
    }


    name = (e) => {
        this.setState({ name: e.target.value })
    }
    detail = (e) => {
        this.setState({ detail: e.target.value })
    }
    price = (e) => {
        this.setState({ price: e.target.value })
    }
    textarea = (e) => {
        this.setState({ textarea: e.target.value })
    }


    onloadend = (e) => {
        newimage = []
        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];
            let reader = new FileReader();


            reader.onloadend = () => {
                newimage.push(reader.result)
                this.setState({
                    newimg: newimage,
                    // file: e.target.files[i],
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file)
        }




    }


    edit = (item) => {
        this.setState({ name: item.name, editdata: item.id, viewdata: item.id, detail: item.detail, price: item.price, textarea: item.textarea, newimg: item.file })

    }


    removeImage = (item) => {
        bimg = this.state.newimg.filter(ary => ary !== item);

        this.setState({ newimg: bimg })


        console.log(item)

    };

    remove = (id) => {
        dataArray = dataArray.filter(item => item.id !== id)
        console.log(dataArray)
        this.setState({ array: dataArray })
        this.setState({ name: '', detail: '', price: '', textarea: '', file: '', imagePreviewUrl: '', })
    }

    update = (id) => {
        let objIndex = dataArray.findIndex(item => item.id == this.state.editdata)

        dataArray[objIndex].name = this.state.name
        dataArray[objIndex].detail = this.state.detail
        dataArray[objIndex].price = this.state.price
        dataArray[objIndex].textarea = this.state.textarea
        dataArray[objIndex].file = this.state.newimg

        this.setState(dataArray)

        this.setState({ name: '', detail: '', price: '', textarea: '', file: '', imagePreviewUrl: '', })
    }

    submit = () => {
        let data = {
            name: this.state.name,
            detail: this.state.detail,
            price: this.state.price,
            textarea: this.state.textarea,
            file: this.state.newimg,
            id: Date.now()

        }
        dataArray.push(data)
        console.log(dataArray)
        this.setState({ array: dataArray }, () => {
            console.log(this.state.array)
        })
        localStorage.setItem('data', JSON.stringify(this.state.array))
        this.setState({ name: '', detail: '', price: '', textarea: '', file: '', imagePreviewUrl: '', newimg: [] })
    }
    view = (id) => {

        for (let i = 0; i < this.state.array.length; i++) {

            if (this.state.array[i].id == id) {
                let data1 = {
                    name: this.state.array[i].name,
                    detail: this.state.array[i].detail,
                    price: this.state.array[i].price,
                    textarea: this.state.array[i].textarea,
                    file: this.state.array[i].file,
                    id: this.state.array[i].id

                }
                console.log(newimg)

                this.setState({ arrayi: data1, mainImage: this.state.array[i].file[0] }, () => {
                    console.log(this.state.arrayi.file)
                })
                o = true
            }
        }


    }


    handleImage = (item) => {
        this.setState({ mainImage: item })
    }



    constructor(props) {
        super(props);
        this.state = {
            newImage: [],
            image: [],
        };
    }

    submit = () => {
        let data = {
            images: this.state.newImage,
        };

        this.setState((prevState) => ({
            image: [...prevState.image, data],
        }));
    };


    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const { newImage } = this.state;
        const reorderedItems = Array.from(newImage);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        console.log({ reorderedItems });
        this.setState({
            newImage: reorderedItems,
        });
    };

    uploadImage = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const objectURL = URL.createObjectURL(file);
            uploadedImages.push(objectURL);
        }

        this.setState({
            newImage: uploadedImages,
        });
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: "16px",
        margin: `0 0 8px 0`,
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle,
    });

    getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: "8px",
        width: "250px",
    });


    render() {
        const { newImage } = this.state;


        return (
            <section>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <Form.Group className="mt-5" >
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' value={this.state.name} onChange={this.name} placeholder="Product name" />
                            </Form.Group>
                            <Form.Group className="mt-5" >
                                <Form.Label>Product Detail</Form.Label>
                                <Form.Control type='text' value={this.state.detail} onChange={this.detail} placeholder="Product Detail" />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control type='tel' value={this.state.price} onChange={this.price} placeholder="Product price" />
                            </Form.Group>
                            <Form.Group className="mt-5" >
                                <Form.Label>Discription</Form.Label>
                                <Form.Control type='textarea' as="textarea" className='mb-5' value={this.state.textarea} onChange={this.textarea} placeholder="Product textarea" />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Product image</Form.Label><Form.Control type='file' value={this.state.file} multiple onChange={this.onloadend} placeholder="Product Image" />
                            </Form.Group>
                            {this.state.newimg.map((item => {
                                return (
                                    <div>
                                        <img style={{ width: '200px' }} src={item} />
                                        <button onClick={() => this.removeImage(item)} >X</button>
                                    </div>
                                )
                            }))}




                            <Button variant="outline-primary" className='mt-5 mb-3' onClick={this.submit}>submit</Button>{' '}
                            <Button variant="outline-primary" className='mt-5 mb-3' onClick={this.update}>update</Button>{' '}

                        </div>

                    </div>
                    <div>

                        <tr style={{ border: '1px solid black' }}>
                            <th>Name</th>
                            <th>Detail</th>
                            <th>Price</th>
                            <th>Textarea</th>
                            <th>Image</th>
                            <th>Remove</th>
                            <th>Edit</th>
                            <th>View</th>
                        </tr>
                        {this.state.array.map((item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.detail}</td>
                                    <td>{item.price}</td>
                                    <td>{item.textarea}</td>
                                    <td> <img src={item.file[0]} style={{ width: '200px' }} /> </td>

                                    <td><button onClick={() => this.remove(item.id)}>Remove</button></td>
                                    <td><button onClick={() => this.edit(item)}>Edit</button></td>
                                    <td><button onClick={() => this.view(item.id)}>View</button></td>


                                </tr>
                            )

                        }))}

                    </div>

                    <div>

                        <div>

                            Image:

                            <img src={this.state.mainImage} style={{ width: '200px' }} />

                            <br></br>

                            {
                                o === false ? o = false :
                                    this.state.arrayi.file.map((item => {
                                        return (
                                            <img onClick={() => this.handleImage(item)} src={item} style={{ width: '100px' }} />

                                        )
                                    }))
                            }




                            <br></br>
                            Name:  {this.state.arrayi.name}<br></br>
                            Detail :{this.state.arrayi.detail}<br></br>
                            Price  :  {this.state.arrayi.price}<br></br>
                            Textarea :{this.state.arrayi.textarea}<br></br>



                        </div>

                    </div>

                    <div>

                        <button onClick={this.submit}>Submit</button>

                        <div className="main_content">
                            <input type="file" multiple onChange={this.uploadImage} id="file" />

                            <div>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={this.getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {newImage.map((image, index) => (
                                                    <Draggable
                                                        key={"image-" + index}
                                                        draggableId={"image-" + index}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                className="card"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={this.getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                <img className="img1" src={image} alt="" />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>

                    </div>

                </div>

            </section >
        )
    }
}