import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

export class TemplateList extends React.Component {
    constructor() {
        super()
        this.state = {
            templates: [
                { name: "template 1", value: "Template de email" },
                { name: "template 2", value: "Template de email 2" },
                { name: "template 3", value: "Template de email 3" },
                { name: "template 4", value: "Template de email 4" }
            ],
            value: ''
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({
            value: e.value
        })
        window.parent.postMessage(e.value, parentOrigin);
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>
            <List component="nav">

                {this.state.templates.map((template, i) => {
                    return (
                        <React.Fragment key={i}>
                            <ListItem
                                button
                                selected={template.value == this.state.value}
                                onClick={event => this.onChange(template)}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={template.name} />
                            </ListItem>
                        </React.Fragment>
                    )
                })}
                <p>{this.state.value}</p>
            </List>
        </div>
    }
}

TemplateList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplateList);