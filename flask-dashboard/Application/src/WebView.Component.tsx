import React from "react";
import SearchBar from 'material-ui-search-bar';
import MainResult from './MainResult.Component';


interface ConditionalTitleProps {
    searchValue: string
}
class ConditionalTitle extends React.Component<ConditionalTitleProps> {
    render() {
        if (this.props.searchValue.length > 0) {
            return (<div></div>)
        } else {
            return (<h1> Recipe Revealer </h1>)
        }
    }
}



interface SearchBarProps {
    parent: React.Component
}

class TheSearchBar extends React.Component<SearchBarProps> {
    state: { searchValue: string };
    private searchWasRequested() {
        this.props.parent.setState({ queryString: this.state.searchValue });
    }
    constructor(props) {
        super(props);
        this.state = { searchValue: "" };
    }
    render() {
        return (
            <div>
                <ConditionalTitle searchValue={this.state.searchValue} />
                <div className=".searchContainer">
                    <SearchBar
                        placeholder="Search a Recipe!"
                        id="searchBar"
                        className="search"
                        onChange={(value) => { this.setState({ searchValue: value }) }}
                        onRequestSearch={() => { this.searchWasRequested() }}
                        style={{
                            margin: '4em auto',
                            maxWidth: 800,
                            backgroundColor: 'beige'
                        }}
                    />
                </div>
            </div>
        );
    }
}


export default class WebView extends React.Component {
    state: { queryString: string };

    constructor() {
        super();
        this.state = { queryString: "" };
    }
    public render() {
        return (
            <div>
                <TheSearchBar parent={this} />
                <div id="searchResult">
                    <MainResult query={this.state.queryString} />
                </div>
            </div>
        )
    }
}
