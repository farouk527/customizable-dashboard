    import React, { useState,useEffect } from 'react';
    import { Button, Modal, Form, Container,Image, Icon, Select, Segment } from 'semantic-ui-react';
    import GridLayout from 'react-grid-layout';
    import 'react-grid-layout/css/styles.css';
    import 'react-resizable/css/styles.css';
    import 'semantic-ui-css/semantic.min.css';
    import './SingleFunctionApp.css';

    import axios from 'axios';

    function SingleFunctionApp() {
    const [modalOpen, setModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [imageURL, setImageURL] = useState('');
const [error,seterror]=useState(false);



    const [selectedTextStyle, setSelectedTextStyle] = useState('normal');

    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('');
    const[selectedcolor,setselectedcolor]=useState("");
    

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleImageChange = async (e) => {
       setImage(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);
            console.log(imageUrl)
          }

};

const handleSubmit = () => {
         const newSubmission = { description, imageURL };
        /*setSubmissions([...submissions, newSubmission]);
        */
        closeModal();

        axios.post("http://localhost:3001/items", { description: newSubmission.description, image: newSubmission.imageURL })
        .then(() => {
        })
        .catch((error) => {
            alert("les inputs sont obligatoires")
            openModal();
           
        });
    
        setDescription('');
        setImage(null);


};


const handldelete = (id) => {
    axios.delete(`http://localhost:3001/items/${id}`)

}


 useEffect(() => {
                    document.body.style.backgroundColor = selectedBackgroundColor;
                     axios.get("http://localhost:3001/items").then(res=> {

                          setSubmissions(res.data);
                              console.log(res.data);

            })

}, [selectedBackgroundColor,submissions]);

    return (
        <div > 
            
<Button className="open-button" onClick={openModal}><Icon name='add'/>Ajouter Une Grid Au Dashboard</Button>
<Modal open={modalOpen} onClose={closeModal}>
    <Modal.Header>Formulaire</Modal.Header>
    <Modal.Content>
       <Segment>
        <Form>
            <Form.Field>
                <label>Description</label>
                <Form.TextArea
                    placeholder="Entrez une description..."
                    value={description}
                    onChange={handleDescriptionChange}
required={true}                />
            </Form.Field>
            <Form.Field>
                <label>Image</label>
                <Form.Input
                    type="file"
                    onChange={handleImageChange}
                    required={true}
                />
            </Form.Field>
        </Form>
        </Segment> 
    </Modal.Content>
    
    <Modal.Actions>
        <Button onClick={handleSubmit} icon="save" color='red'>
          
        </Button>
        <Button onClick={closeModal} color='black'>
            Annuler
        </Button>
        
    </Modal.Actions>
</Modal>

        
    {submissions.length === 0 && (
        <p style={{ fontSize: '24px', textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '85vh' }}>
        Il n'y a aucun élément dans le Dashboard   <Icon name="map"/>
        </p>

    )}

<GridLayout
    className="layout"
    cols={12}
    rowHeight={100}
    width={1500}
>
    {submissions.length > 0 && (  
        <div key="select" className="grid-item">
            <Select
                placeholder="Choisir une couleur de fond pour la page"
                options={[
                    { key: 'transparent', value: 'transparent', text: 'Transparent' },
                    { key: 'gray', value: 'gray', text: 'Gris' },
                ]}
                onChange={(e, { value }) => setSelectedBackgroundColor(value)}
                value={selectedBackgroundColor}
            />
        </div>
    )}
    {submissions.length > 0 && (
    <div key="select-style" className="grid-item">
        <Select
            placeholder="Choisir un style d'écriture pour la description"
            options={[
                { key: 'normal', value: '', text: 'Normal' },
                { key: 'bold', value: 'bold', text: 'Gras' },
                { key: 'italic', value: 'italic', text: 'Italique' },
                { key: 'underline', value: 'underline', text: 'Souligné' },
                { key: 'strikethrough', value: 'strikethrough', text: 'Barré' },
                { key: 'uppercase', value: 'uppercase', text: 'Majuscules' },
                { key: 'lowercase', value: 'lowercase', text: 'Minuscules' },
                { key: 'highlight', value: 'background-color: yellow', text: 'Surligné' },

            ]}
            onChange={(e, { value }) => setSelectedTextStyle(value)}
            value={selectedTextStyle}
        />
    </div>
    )}

{submissions.length > 0 && (
<div key="select-color" className="grid-item">
    <Select
        placeholder="Choisir une couleur d'écriture pour la description"
        options={[
            { key: 'black', value: 'black', text: 'Noir' },
            { key: 'red', value: 'red', text: 'Rouge' },
            { key: 'blue', value: 'blue', text: 'Bleu' },
            { key: 'green', value: 'green', text: 'Vert' },
            { key: 'purple', value: 'purple', text: 'Violet' },
            { key: 'orange', value: 'orange', text: 'Orange' },
            { key: 'gray', value: 'gray', text: 'Gris' },
            { key: 'custom', value: 'custom', text: 'Personnalisé' },
        ]}
        onChange={(e, { value }) => setselectedcolor(value)}
        value={selectedcolor}
    />
</div>
  )}





     {submissions.map((submission, index) => ( 
                    <div key={index} className="grid-item">
                          <img src={submission.image}  style={{ maxWidth: '100%', height: 'auto' }} alt="Uploaded" />
                          <p
    style={{
        color: selectedcolor, // Apply the selected color to the text
        fontWeight: selectedTextStyle === 'bold' ? 'bold' : 'normal',
        fontStyle: selectedTextStyle === 'italic' ? 'italic' : 'normal',
        textDecoration: selectedTextStyle === 'underline' ? 'underline' : 'none',
        textDecoration: selectedTextStyle === 'strikethrough' ? 'line-through' : 'none', 
        textTransform: selectedTextStyle === 'uppercase' ? 'uppercase' : selectedTextStyle === 'lowercase' ? 'lowercase' : 'none', 
    }}
>
    Description : {submission.description}
</p>

                        <Button color='' icon="delete" onClick={() => handldelete(submission._id)} ></Button>
                    </div>
    ))}
</GridLayout>

                
                </div>
    );
    }

    export default SingleFunctionApp;
    