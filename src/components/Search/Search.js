import "./Search.css";
import React, { Component, Fragment } from "react";
import M from "materialize-css";
import QueryRows from "../QueryExpressions/QueryExpressions";

const mappedFieldNames = {
  "Case Name": "caseName",
  Citation: "citation",
  Court: "court",
  "Document Type": "documentType",
  Judge: "judges",
  Keyword: "keyWords"
};

const fieldNames = [
  "Case Name",
  "Citation",
  "Court",
  "Document Type",
  "Judge",
  "Keyword"
];

const queryOps = [
  "includes the word(s)",
  "DOES NOT include the word(s)",
  "match phrase",
  "DOES NOT match phrase"
];

class Search extends Component {
  state = {
    fieldToSearch: "all",
    logicalOperator: "", // this is used within advanced search (basic search takes advantage of form internal state)
    queryArr: [], // used to show user subqueries entered in advanced search
    queryStringAggregator: [], // query sent to elasticsearch
    rowInput: "",
    rowQuery: "", // gets constructed and pushed into queryArr
    searchCriterion: "includes the word(s)", // this is used within advanced search (basic search takes advantage of form internal state)
    showAdvanced: false
  };

  componentDidMount() {
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    for (let i = 0; i < dropdowns.length; i++) {
      M.Dropdown.init(dropdowns[i], {
        coverTrigger: false,
        closeOnClick: false,
        alignment: "center"
      });
    }
  }

  handleBasicFormSubmit = e => {
    console.log("handleBasicFormSubmit ran");

    const target = e.target;
    const value = e.target.value;
    const name = target.name;
    console.log(`Before: ${this.state.rowInput}`);
    this.setState({ [name]: value }, () => {
      const { rowInput, fieldToSearch } = this.state;
      if (fieldToSearch === "all") {
        const queryString = `${rowInput}*`;
        this.props.onSearchSubmit(queryString);
      } else {
        console.log("ALL SELECTED" + (fieldToSearch === "all"));
        const queryString = `${fieldToSearch}: ${rowInput}*`;
        this.props.onSearchSubmit(queryString);
      }
    });
  };

  handleAddQueryRow = e => {
    e.preventDefault();

    const {
      logicalOperator,
      fieldToSearch,
      queryStringAggregator,
      searchCriterion,
      rowInput
    } = this.state;

    if (!rowInput) return;

    if (queryStringAggregator.length > 0) {
      const rowQuery =
        fieldToSearch !== "all"
          ? ` ${logicalOperator} (${fieldToSearch}: ${
              searchCriterion === "match phrase" ? `"${rowInput}"` : rowInput
            })`
          : ` ${logicalOperator} (${
              searchCriterion === "match phrase" ? `"${rowInput}"` : rowInput
            })`;

      if (rowQuery) {
        this.setState(prevState => ({
          queryStringAggregator: prevState.queryStringAggregator.concat(
            rowQuery
          )
        }));

        this.setState(prevState => ({
          queryArr: prevState.queryArr.concat({
            logicalOperator,
            fieldToSearch,
            rowInput,
            searchCriterion
          })
        }));

        this.setState(() => ({
          fieldToSearch: "caseName",
          logicalOperator: "AND",
          rowInput: "",
          searchCriterion: "includes the word(s)"
        }));
      }
    } else {
      const rowQuery =
        fieldToSearch.length !== "all"
          ? ` ${logicalOperator} (${fieldToSearch}: ${
              searchCriterion === "match phrase" ? `"${rowInput}"` : rowInput
            })`
          : ` ${logicalOperator} (${
              searchCriterion === "match phrase" ? `"${rowInput}"` : rowInput
            })`;
      if (rowQuery) {
        this.setState(prevState => ({
          queryStringAggregator: prevState.queryStringAggregator.concat(
            rowQuery
          )
        }));

        this.setState(prevState => ({
          queryArr: prevState.queryArr.concat({
            fieldToSearch,
            searchCriterion,
            rowInput
          })
        }));

        this.setState(() => ({
          fieldToSearch: "caseName",
          logicalOperator: "AND",
          rowInput: "",
          searchCriterion: "includes the word(s)"
        }));
      }
    }
  };

  // onAdvancedFormSubmit = e => {
  //   e.preventDefault();
  //   console.log("onAdvancedFormSubmit()");
  //   const { queryStringAggregator } = this.state;

  //   if (queryStringAggregator.length > 0) {
  //     this.props.onSearchSubmit(queryStringAggregator);
  //   }
  // };

  // TODO - IMPLEMENT THE FOLLOWING BLOCK TO DELETE SUBQUERIES IN ADVANCED SEARCH

  // handleDeleteSubQuery = (e, subQuery) => {
  //   e.preventDefault();
  //   console.log('handleDeleteSubQuery()');
  //   console.log(subQuery)

  //   this.setState((prevState) => ({
  //     queryArr: [].concat(prevState.queryArr.filter((i) => {
  //       return i !== subQuery;
  //     })),
  //     queryStringAggregator: [].concat(prevState.queryStringAggregator.filter((queryRow) => {
  //       return queryRow !== subQuery
  //     }))
  //   }));
  // }

  onAdvancedFormSubmit = e => {
    e.preventDefault();
    console.log("handleSearch");
    let queryString = "";
    this.state.queryStringAggregator.forEach(q => (queryString += q));
    console.log(queryString);
    this.props.onSearchSubmit(queryString);
  };

  handleReset = () => {
    console.log("handleReset");
    this.setState(() => ({
      logicalOperator: "",
      rowInput: "",
      rowQuery: "",
      queryStringAggregator: [],
      queryArr: []
    }));
  };

  renderFieldOptions = () => {
    return fieldNames.map(option => (
      <option
        value={mappedFieldNames[option]}
        key={Math.floor(Math.random() * 1000000)}
      >
        {option}
      </option>
    ));
  };

  renderQueryOperators = () => {
    return queryOps.map(option => (
      <option key={Math.floor(Math.random() * 1000000)}>{option}</option>
    ));
  };

  handleToggleAdvanced = () => {
    this.handleReset();

    this.setState(prevState => ({
      showAdvanced: !prevState.showAdvanced
    }));
  };

  render() {
    console.log(`queryStringAggregator: ${this.state.queryStringAggregator}`);

    return (
      <div className="display-flex flex-column">
        <h1 className="center h1-search">Legal Index</h1>
        <div>
          {!this.state.showAdvanced ? (
            <Fragment>
              <form className="border basic-form">
                <div className="search-box-wrapper">
                  <div className="input-field width-full">
                    <input
                      type="text"
                      id="rowInput"
                      placeholder="Search"
                      required
                      className="inputs"
                      name="rowInput"
                      value={this.state.rowInput}
                      onChange={this.handleBasicFormSubmit}
                    />
                  </div>
                  <div className="input-field">
                    <select
                      value={this.state.fieldToSearch}
                      className="browser-default"
                      name="fieldToSearch"
                      value={this.state.fieldToSearch}
                      onChange={this.handleBasicFormSubmit}
                    >
                      <option value="all">All</option>
                      <Fragment>{this.renderFieldOptions()}</Fragment>
                    </select>
                  </div>
                  {/* <div>
                <button type="button" className="btn-floating btn-flat Lists--buttons" onClick={this.handleReset}>Reset</button>
                <button type="submit" name="action" className=" btn"><i className="material-icons">search</i></button>
              </div> */}
                </div>
              </form>
              <button
                type="button"
                onClick={this.handleToggleAdvanced}
                className="toggle-search-type"
              >
                {this.state.showAdvanced ? "Basic Search" : "Advanced Search"}
              </button>
            </Fragment>
          ) : (
            // =================== ADVANCED SEARCH ==============================
            <Fragment>
              <form
                className="advanced-form"
                onSubmit={this.onAdvancedFormSubmit}
              >
                <div className="select-wrapper">
                  <div className="input-field width-full">
                    <input
                      className="inputs"
                      id="rowInput"
                      onChange={e =>
                        this.setState({ rowInput: e.target.value })
                      }
                      placeholder="Search"
                      required={this.state.queryStringAggregator.length < 1}
                      type="text"
                      value={this.state.rowInput}
                    />
                  </div>
                  {this.state.queryStringAggregator.length > 0 && (
                    <div className="input-field">
                      <div className="query-input">
                        <select
                          value={this.state.logicalOperator}
                          name="operator"
                          className="browser-default"
                          onChange={e =>
                            this.setState({ logicalOperator: e.target.value })
                          }
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="input-field">
                    <div className="query-input">
                      <select
                        value={this.state.fieldToSearch}
                        className="browser-default"
                        name="fieldToSearch"
                        onChange={e =>
                          this.setState({ fieldToSearch: e.target.value })
                        }
                      >
                        <Fragment>{this.renderFieldOptions()}</Fragment>
                      </select>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="query-input">
                      <select
                        value={this.state.searchCriterion}
                        className="browser-default"
                        name="searchCriterion"
                        onChange={e =>
                          this.setState({ searchCriterion: e.target.value })
                        }
                      >
                        <Fragment>{this.renderQueryOperators()}</Fragment>
                      </select>
                    </div>
                  </div>
                  <div className="query-action-wrapper width-full">
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={this.handleReset}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={this.handleAddQueryRow}
                      >
                        Add
                      </button>
                    </div>
                    <button
                      type="submit"
                      name="action"
                      className="waves-light btn"
                    >
                      <i className="material-icons">search</i>
                    </button>
                  </div>
                </div>
              </form>

              <button
                type="button"
                onClick={this.handleToggleAdvanced}
                className="toggle-search-type"
              >
                {this.state.showAdvanced ? "Basic Search" : "Advanced Search"}
              </button>
            </Fragment>
          )}
        </div>

        <QueryRows
          {...this.state}
          renderFieldOptions={this.renderFieldOptions}
          renderQueryOperators={this.renderQueryOperators}
          handleDeleteSubQuery={this.handleDeleteSubQuery}
        />
      </div>
    );
  }
}

export default Search;
