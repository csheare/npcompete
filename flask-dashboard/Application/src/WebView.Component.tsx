import React from "react";
import SearchBar from 'material-ui-search-bar';
import MainResult from './MainResult.Component';


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
            <SearchBar
                onChange={(value) => { this.setState({ searchValue: value }) }}
                onRequestSearch={() => { this.searchWasRequested() }}
                style={{
                    margin: '4em auto',
                    maxWidth: 800
                }}
            />
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
                <MainResult recipeName={this.state.queryString} />
            </div>
        )
    }
}
