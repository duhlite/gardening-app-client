import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, PageHeader } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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

  deletePlant = async event => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (!confirmed) {
      return;
    }
    this.setState({ isDeletingPlant: true });
    let p = this.state.plants
    for(let x of p) {
      if(x.myPlant.name === event.target.id) {
        let remove = p.splice(p.indexOf(x),1);
        this.setState({plants: remove})
      }
    }
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
      this.setState({ isDeletingPlant: false });
    }
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
          ? <div key={`plants${i}`} className="plant-body">
              <div className="plant-control">
                <h4>Name</h4>
                <FormGroup key={`name${i}`}>
                  <FormControl
                    onChange={this.handlePlants}
                    value={this.state.plants[i-1].myPlant.name}
                   componentClass="textarea"
                    className="name"
                    id={(i-1).toString()}
                   />
                </FormGroup>
              </div>
              <div className="plant-control">
                <h4>Sowing distance (inches)</h4>
                <FormGroup key={`sowing${i}`}>
                  <FormControl
                    onChange={this.handlePlants}
                    value={this.state.plants[i-1].myPlant.sowing}
                    componentClass="textarea"
                    className="sowing"
                    id={(i-1).toString()}
                  />
                </FormGroup>
              </div>
              <div className="plant-control">
                <h4>Days to Maturation</h4>
                <FormGroup key={`maturation${i}`}>
                  <FormControl
                    onChange={this.handlePlants}
                    value={this.state.plants[i-1].myPlant.maturation}
                    componentClass="textarea"
                    className="maturation"
                    id={(i-1).toString()}
                  />
                </FormGroup>
              </div>
              <div className="plant-control">
                <LoaderButton
                  block
                  bsStyle="danger"
                  bsSize="small"
                  isLoading={this.state.isDeletingPlant}
                  onClick={this.deletePlant}
                  text="Delete Plant"
                  loadingText="Deleting…"
                  id={plant.myPlant.name}
                  className="plant-delete"
                />
              </div>
            </div>
          : null

    )
    return (
      <div className="Beds">
        <PageHeader id="edit-title">Edit Garden Bed</PageHeader>
        {this.state.bed &&
          <form onSubmit={this.handleSubmit}>
            <div className="bed-edit">
              <div className="bed-control">
                <h4>Bed Name</h4>
                <FormGroup controlId="name" className="bed">
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.name}
                    componentClass="textarea"
                  />
                </FormGroup>
              </div>
              <div className="bed-control">
                <h4>Bed Length (inches)</h4>
                <FormGroup controlId="bedLength" className="bed">
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.bedLength}
                    componentClass="textarea"
                  />
                </FormGroup>
              </div>
              <div className="bed-control">
                <h4>Bed Width (inches)</h4>
                <FormGroup controlId="bedWidth" className="bed">
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.bedWidth}
                    componentClass="textarea"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="plant-edit">
              <h2 className="plant-title">Plants</h2>
              <LinkContainer
                key="plant"
                to={`/garden/addplant/${this.props.match.params.id}`}
                className="plant-submit">
                <Button variant="primary">New Plant</Button>
              </LinkContainer>
              <div className="plant-div">
                {bedPlants}
              </div>
            </div>
            <div className="buttons">
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Save"
                loadingText="Saving…"
                className="save-bed"
              />
              <LoaderButton
                block
                bsStyle="danger"
                bsSize="large"
                isLoading={this.state.isDeleting}
                onClick={this.handleDelete}
                text="Delete Bed"
                loadingText="Deleting…"
                className="delete-bed"
              />
            </div>
          </form>}
      </div>
    );
  }
}
