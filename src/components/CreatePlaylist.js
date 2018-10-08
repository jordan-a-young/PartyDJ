import React from 'react';
import { Form, FormGroup, Input, Label, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

const CreatePlaylist = ({handleCreatePlaylist}) => (
  <Card className="p-3 w-75">
    <CardTitle>Create a playlist</CardTitle>
    <CardBody>
      <Form onSubmit={handleCreatePlaylist}>
        <FormGroup row className="position-relative">
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name="name" placeholder="enter playlist name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="textarea" name="description" placeholder="enter playlist description" />
          </Col>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </CardBody>
  </Card>
)

export default CreatePlaylist;
