import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, PageHeader } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewBed.css";

export default class NewBed extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      name: "",
      lengthDimension: "",
      widthDimension: ""
    };
  }

  createBed(bed) {
    return API.post("dev-garden-api", "/garden", {
      body: bed
    });
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createBed({
        name: this.state.name,
        lengthDimension: this.state.lengthDimension,
        widthDimension: this.state.widthDimension
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewBed">
        <PageHeader>New Bed</PageHeader>
        <form onSubmit={this.handleSubmit}>
          <h4>Garden Bed Name</h4>
          <FormGroup controlId="name">
            <FormControl
              onChange={this.handleChange}
              value={this.state.name}
              componentClass="textarea"
            />
          </FormGroup>
          <h4>Bed Length</h4>
          <FormGroup controlId="lengthDimension">
            <FormControl
              onChange={this.handleChange}
              value={this.state.lengthDimension}
              componentClass="textarea"
            />
          </FormGroup>
          <h4>Bed Width</h4>
          <FormGroup controlId="widthDimension">
            <FormControl
              onChange={this.handleChange}
              value={this.state.widthDimension}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
            id="new-button"
          />
        </form>
      </div>
    );
  }
}
