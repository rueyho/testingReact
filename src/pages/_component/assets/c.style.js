const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  wrapper: {
    padding: 15
  },
  paper: {
    width: "100%",

    color: theme.palette.text.secondary
  },
  rowField: {
    padding: theme.spacing(1)
  },
  label: {
    flexBasis: "20%"
  },
  textField: {
    flexBasis: "25%",
    marginRight: 40
  },
  header: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    fontWeight: 500,
    fontSize: 20
  },
  body: {
    padding: "15px"
  },
  selectField: {
    flexBasis: "25%"
  }
});

export default useStyles;
