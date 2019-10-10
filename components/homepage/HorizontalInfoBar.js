import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
    paddingLeft: '2em',
    paddingRight: '2em',
    paddingTop: '1em',
    paddingBottom: '2em',
});

const TitleBox = styled(Grid)({
    paddingBottom: '1em',
    textAlign: 'center',
    textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
    textAlign: 'left',
});

const Bold = styled(Typography)({
    fontWeight: 'bold',
})

function HorizontalInfoBar(props) {

    return (
        <Wrapper container direction="row" justify="center" alignItems="flex-start" >
            <TitleBox item sm="12" md="3">
                <Bold variant="h5">
                    {props.title}
                </Bold>
            </TitleBox>
            <BodyBox item sm="12" md="9">
                {props.body.map((line, i) =>
                    <Typography key={i} variant="body1">
                        {line}
                    </Typography>
                )}
            </BodyBox>
        </Wrapper>
    );
}

HorizontalInfoBar.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
};

export default HorizontalInfoBar;
