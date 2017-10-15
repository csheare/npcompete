import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';



export interface MainResultContainer {
    recipeName: string;
}


export default class MainResult extends React.Component<MainResultContainer> {

    state: { directions: string , ingredients: string, image : string }
    constructor(props) {
        super(props)
        this.state = { directions : "none" , ingredients: "none", image : "../static/assets/images/img-12.jpg"}
    }


    doSearch(recipeName: string) {
        axios.get(`/recipes/` + recipeName )
            .then(res => {
                //const posts = res.data.data.map(obj => obj.data);
                console.log(res);
                let ingredients = "Ingredients: "
                // for (let property in res.data["ingredients"]) {
                //   ingredients += property +" "+ res.data["ingredients"][property]['count'] + ", ";
                // }
                // if (ingredients.length > 0) {
                //   ingredients = ingredients.slice(0, ingredients.length - 1);
                // }
                this.setState({ directions: "Directions: " + res.data["directions"], ingredients: "Ingredients: " + res.data["ingredients"]["text"], image: "" + res.data["image"] });

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
                  <img src= {this.state.image} alt="" />
                </CardMedia>
                <CardTitle title= {this.props.recipeName} />
                <CardText>
                  {this.state.directions}
                  {this.state.ingredients}
                </CardText>
              </Card>
            );
    }
}
