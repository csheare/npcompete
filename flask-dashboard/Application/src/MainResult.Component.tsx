import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui';


function setOne(index, url, name) {
  document.getElementById("name" + index).innerHTML = name;
  let img = document.getElementById("image" + index);
  img['src'] = url;
}

interface MainRecipeInformation {
  recipeName: string
  directions: string
  ingredients: string
  imageUrl: string
}
interface MainResultProps {
  result: MainRecipeInformation
}
class MainResult extends React.Component<MainResultProps> {
  render() {
    return (
      <Card style={{ margin: '4em auto', maxWidth: 650 }}>
        <CardMedia>
          <img src={this.props.result.imageUrl} />
        </CardMedia>
        <CardTitle title={this.props.result.recipeName} />
        <CardText>
          {this.props.result.directions}
          <br />
          {this.props.result.ingredients}
        </CardText>
      </Card>
    );
  }
}

interface TileData {
  recipeName: string
  imageUrl: string
}
interface ReferencedResultsProps {
  tiles: Array<TileData>
  changeRecipe: (string) => void
}

class ReferencedResults extends React.Component<ReferencedResultsProps> {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        <GridList cellHeight={300} style={{ width: 1000, overflowY: 'auto' }} >
          {
            this.props.tiles.map((tile) => (
              <a onClick={() => (this.props.changeRecipe(tile.recipeName))}>
                <GridTile
                  key={tile.imageUrl}
                  title={tile.recipeName}
                >
                  <img src={tile.imageUrl} />
                </GridTile>
              </a>
            ))
          }
        </GridList>
      </div>
    );
  }
}



export interface ResultContainer {
  query: string;
}

export default class ResultOutput extends React.Component<ResultContainer> {

  state: {
    wasResult?: boolean,
    query: string,
    mainResult?: MainRecipeInformation,
    referenceResult?: Array<TileData>
  }

  constructor(props) {
    super(props)
    this.state = {
      query: ""
    }
  }

  doSearch(query: string) {
    axios.get(`/recipes/` + query)
      .then(res => {
        console.log(res);
        if (res.data === undefined || res.data === "No Recipe Found") {
          this.setState({ wasResult: false, query: query });
          return;
        }

        let references: Array<TileData> = []
        for (let i = 1; i <= 8; i++) {
          const ele = res.data["r" + i]
          if (ele !== undefined) {
            references.push({
              imageUrl: ele["image-ref"],
              recipeName: ele["name"]
            })
          }
        }

        this.setState({
          wasResult: true,
          mainResult: {
            recipeName: query,
            directions: "Directions: " + res.data["directions"],
            ingredients: "Ingredients: " + res.data["ingredients"]["text"],
            imageUrl: "" + res.data["image"]
          },
          referenceResult: references
        });
      });
  }

  componentWillReceiveProps(props: ResultContainer) {
    if (props.query.length > 0) {
      this.doSearch(props.query)
    } else {
      this.setState({ wasResult: undefined, query: "" })
    }
  }

  render() {
    if (this.state.wasResult === undefined) {
      return (<div></div>);
    }
    else if (this.state.wasResult === false) {
      return (<h2>No search result found for {this.state.query}</h2>)
    }
    else {
      const myThis = this;
      return (
        <div>
          <MainResult result={this.state.mainResult} />
          <ReferencedResults tiles={this.state.referenceResult} changeRecipe={(recipeName:string) => { myThis.doSearch(recipeName); }}/>
        </div>
      );
    }
  }
}


