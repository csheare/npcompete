import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';



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
        return(
              <Card
                style={{
                    margin: '4em auto',
                    maxWidth: 650
                }}
              >
                <CardMedia>
                  <img src="../static/assets/images/img-12.jpg" alt="" />
                </CardMedia>
                <CardTitle title= {this.props.recipeName} />
                <CardText>
                  {this.state.searchResult}
                </CardText>
              </Card>
            );
    }
}
