import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import Container from '@mui/material/Container';


const PostIdComponent = ({post}) => {
  

  const result = post.map(({id, userId, text})=>{
    const [value, setValue] = useState('');

    let url = `http://localhost:3001/posts/${id}`
    const config = { headers: {'Content-Type': 'application/json'} };
  
    const test = (e) => {
      e.preventDefault()
      axios.put(url, body, config)
      .then(response => {
        console.log(response);
      }).catch(e => console.log(e));
    }

    const schema = Yup.object().shape({
      id: Yup.number().positive().required(),
      userId: Yup.number().positive().required(),
      text: Yup.string().required('must be required')
    })
    return (
      <Formik 
        key={id}
        initialValues={{id, userId, text}}
        validationSchema={schema}
      >
      {({errors}) => 
      <>
        <Form onSubmit={test}>

        {errors.text ? (<div>{errors.text}</div>) : null}
          <Field 
            name="text"
            value= {value}
            style={{ width: 500 }}
            rows={10}
            component='textarea'

          />
          <br />
          <Button
            style={{marginTop: 10}}
            variant="contained"
            color="primary"
            type="submit"
          >Save
          </Button>
        </Form>
        </>
      }
      </Formik>
    )
  })
  return(
    <> 
      <Container maxWidth="md">
            <Typography variant="h5" component="h5">Edit Post</Typography>
            
              {result}
            
        </Container>
    </>
  )
}

PostIdComponent.propTypes = {
  post: PropTypes.arrayOf(
      PropTypes.shape({
          id: PropTypes.number.isRequired,
          userId: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
      })
  )
}
export default PostIdComponent;