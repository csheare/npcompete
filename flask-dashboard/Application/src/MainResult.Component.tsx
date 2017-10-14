import React from 'react';
import Card from 'material-ui';
import axios from 'axios';


export interface MainResultContainer {
    recipeName: string;
}


export default class MainResult extends React.Component<MainResultContainer> {

    state: { searchResult: string }
    constructor(props) {
        super(props)
        this.state = { searchResult: "none" }
    }


    doSearch(recipeName: string) {
        axios.get(`/recipes/` + recipeName )
            .then(res => {
                //const posts = res.data.data.map(obj => obj.data);
                console.log(res);
                this.setState({ searchResult: "" + res.data });
            });
    }

    componentWillReceiveProps(props) {
        if (props.recipeName.length > 0) {
            this.doSearch(props.recipeName)
        }
    }

    render() {
        return this.props.recipeName.length == 0 ?
            (
                <p>
                    {this.state.searchResult}
                </p>
            )
            :
            (
                <div>
                    <h2>Search Results for {this.props.recipeName}</h2>
                    <p>{this.state.searchResult}</p>
                </div>
            );
    }
}