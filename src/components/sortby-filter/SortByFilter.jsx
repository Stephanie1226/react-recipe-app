import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllPublicRecipes, 
  resetPublicKeyword, 
  setPublicSortbyFilter, 
  resetFilteredPublicRecipes } from '../../redux/puclic-recipes/public.recipes.actions';
import { selectPublicSortbyFilter, selectPublicSelectedCategory } from '../../redux/puclic-recipes/public.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  publicSortbyType: selectPublicSortbyFilter,
  publicSelectedCategory: selectPublicSelectedCategory
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: (query) => dispatch(requestAllPublicRecipes(query)),
  setPublicSortbyFilter: (filter) => dispatch(setPublicSortbyFilter(filter)),
  resetPublicKeyword: () => dispatch(resetPublicKeyword()),
  resetFilteredPublicRecipes: () => dispatch(resetFilteredPublicRecipes())
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    },
    "& .MuiSelect-icon": {
      color: "#ffffff"
    }
  },
  input: {
    borderRadius: 5,
    border: "3px solid #2A356C",
    position: "relative",
    backgroundColor: "#2A356C",
    fontSize: 16,
    color: "#ffffff",
    padding: "10px 26px 10px 12px",
    fontFamily: [
      '"Cabin"',
      'sans-serif',
    ].join(','),
    "&:focus": {
      borderRadius: 5,
      backgroundColor: "#2A356C",
      border: "3px solid #2A356C"
    }
  }
}))(InputBase);

const SortByFilter = (props) => {
  const { setPublicSortbyFilter, requestAllPublicRecipes, resetPublicKeyword, resetFilteredPublicRecipes, publicSortbyType, publicSelectedCategory } = props;
  const handleChange = (event) => {
    setPublicSortbyFilter(event.target.value);
    resetPublicKeyword();
    resetFilteredPublicRecipes();
    if (publicSelectedCategory !== "All") {
      requestAllPublicRecipes(`?publicCategory=${publicSelectedCategory.toLowerCase()}`+ event.currentTarget.dataset.query)
    } else {
      requestAllPublicRecipes("?" + event.currentTarget.dataset.query)
    }
  };

  return (
    <div>
      <FormControl>
        <Select
          id="sortby-filter"
          value={publicSortbyType}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={"Sort By"} data-query={""}>Sort By</MenuItem>
          <MenuItem value={"Newest First"} data-query={"&sortBy=createdAt:desc"}>Newest First</MenuItem>
          <MenuItem value={"Oldest First"} data-query={"&sortBy=createdAt:asc"}>Oldest First</MenuItem>
          <MenuItem value={"Total time"} data-query={"&sortBy=total_time:asc"}>Total time</MenuItem>
          <MenuItem value={"Prep time"} data-query={"&sortBy=preparation:asc"}>Prep time</MenuItem>
          <MenuItem value={"Cook time"} data-query={"&sortBy=cook_time:asc"}>Cook time</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);