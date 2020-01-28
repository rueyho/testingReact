import React                                            from 'react';

/* ################################################## */
/*          UI Framework                              */
/* ################################################## */
import { withStyles }                                   from '@material-ui/core/styles';

/* ################################################## */
/*          Page                                      */
/* ################################################## */
import ComponentAbstract                                from '../../_abstract/c.abstract';

/* ################################################### */
/*          Style                                       */
/* ################################################### */
import '../../_style/s.app.css'; 

const styles = withStyles((theme) => ({
  root: {
    width: '100%',
    height: 10,
    backgroundColor: '#c33336',
    position: 'fixed',
    bottom: 0,
    left: 0,
  }
}))

class ComponentCustomFooter extends ComponentAbstract {

  /* #################### Render #################### */
  render() {
    //#region THIS
    const {
      props: { classes },
    } = this
    //#endregion
    return (
      <footer className={classes.root}>
      </footer>
    )
  }
}

export default styles(ComponentCustomFooter)