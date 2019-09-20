import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        justifyContent: 'flex-start',
        display: 'flex',
    },
    titleBox: {
        width: '25%',
        paddingRight: theme.spacing(3),
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    bodyBox: {
        width: '75%',
    },

}));

export default function HorizontalInfoBar(props) {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.titleBox}>
                <Typography variant="h5" className={classes.title}>
                    {props.title}
                </Typography>
            </Box>
            <Box className={classes.bodyBox}>
                {props.body.map((line, i) =>
                    <Typography key={i} variant="body1" align="left">
                        {line}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

HorizontalInfoBar.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
};
