import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import vegBase from "../Vegetable";

export default class NewPlant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            name: "",
            speciesName: "",
            speciesId: "",
            sowing: "",
            maturation: "",
            year: "",
            select: "Select Species"
        };
    }

    addPlant(plant) {
        console.log(plant);
        return API.put("dev-garden-api", `/garden/addplant/${this.props.match.params.id}`, {
            body: plant
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

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true });

        try {
            await this.addPlant({
                name: this.state.name,
                speciesName: this.state.speciesName,
                speciesId: this.state.speciesId,
                sowing: this.state.sowing,
                maturation: this.state.maturation,
                year: this.state.year
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading : false });
        }
    }

    handleSelect = (eventKey, event) => {
        this.setState({
            speciesName: event.target.id,
            speciesId: eventKey.toString(),
            select: event.target.id
        })
    }

    render() {
        let vegToggle = vegBase.map((el,i,samArr) => {
            return (
                <MenuItem 
                    key={samArr[i].speciesId}  
                    id={samArr[i].species}
                    eventKey={samArr[i].speciesId}
                >
                    {samArr[i].species}
                </MenuItem>
            )
        })
        return (
            <div className="plant">
                <form onSubmit={this.handleSubmit}>
                    <h4>Plant Name</h4>
                    <FormGroup controlId="name">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.name}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <h4>Sowing Distance</h4>
                    <FormGroup controlId="sowing">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.sowing}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <h4>Days to Maturation</h4>
                    <FormGroup controlId="maturation">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.maturation}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <h4>Planting Year</h4>
                    <FormGroup controlId="year">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.year}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <DropdownButton id="species" title={this.state.select} onSelect={this.handleSelect}>
                        {vegToggle}
                    </DropdownButton>
                    <LoaderButton
                      block
                      bsStyle="primary"
                      bsSize="large"
                      disabled={!this.validateForm()}
                      type="submit"
                      isLoading={this.state.isLoading}
                      text="Create"
                      loadingText="Creating…"
                    />
                </form>
            </div>
        )
    }
}