import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Beds.css";

export default class Beds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      bed: null,
      name: "",
      bedLength: "",
      bedWidth: "",
      plants: [],
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      const bed = await this.getBed();
      const { name, bedLength, bedWidth, plants } = bed;
      this.setState({
        bed,
        name,
        bedLength,
        bedWidth,
        plants
      });
    } catch (e) {
      alert(e);
    }
  }

  getBed() {
    return API.get("dev-garden-api", `/garden/${this.props.match.params.id}`);
  }

  saveBed(bed) {
    return API.put("dev-garden-api", `/garden/${this.props.match.params.id}`, {
      body: bed
    });
  }

  deleteBed() {
    return API.del("dev-garden-api", `/garden/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
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

      await this.saveBed({
        name: this.state.name,
        lengthDimension: this.state.bedLength,
        widthDimension: this.state.bedWidth,
        plants: this.state.plants
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this bed?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteBed();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  handlePlants = event => {
    let id = event.target.className.slice(0,-13)
    let plants = [...this.state.plants];
    let plant = {...plants[event.target.id].myPlant};
    plant[id] = event.target.value;
    plants[event.target.id].myPlant = plant;
    this.setState( (state) => ({plants: plants}))
  }

  render() {
    const bedPlants = [{}].concat(this.state.plants).map(
      (plant, i) =>
        i !== 0
          ? <FormGroup
              key={i}
            >
            <h4>Name</h4>
            <FormControl
              onChange={this.handlePlants}
              value={this.state.plants[i-1].myPlant.name}
              componentClass="textarea"
              className="name"
              id={(i-1).toString()}
            />
            <h4>Sowing distance</h4>
            <FormControl
              onChange={this.handlePlants}
              value={this.state.plants[i-1].myPlant.sowing}
              componentClass="textarea"
              className="sowing"
              id={(i-1).toString()}
            />
            <h4>Days to Maturation</h4>
            <FormControl
              onChange={this.handlePlants}
              value={this.state.plants[i-1].myPlant.maturation}
              componentClass="textarea"
              className="maturation"
              id={(i-1).toString()}
            />
            </FormGroup>
          : <LinkContainer
                key="plant"
                to={`/garden/addplant/${this.props.match.params.id}`}>
              <Button variant="primary">New Plant</Button>
            </LinkContainer>

    )
    return (
      <div className="Beds">
        {this.state.bed &&
          <form onSubmit={this.handleSubmit}>
            <h4>Bed Name</h4>
            <FormGroup controlId="name">
              <FormControl
                onChange={this.handleChange}
                value={this.state.name}
                componentClass="textarea"
              />
            </FormGroup>
            <h4>Bed Length (inches)</h4>
            <FormGroup controlId="bedLength">
              <FormControl
                onChange={this.handleChange}
                value={this.state.bedLength}
                componentClass="textarea"
              />
            </FormGroup>
            <h4>Bed Width (inches)</h4>
            <FormGroup controlId="bedWidth">
              <FormControl
                onChange={this.handleChange}
                value={this.state.bedWidth}
                componentClass="textarea"
              />
            </FormGroup>
            <h4>Plants</h4>
            {bedPlants}
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
