import { styled } from '@material-ui/core/styles';
import { Divider, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
    paddingLeft: '2em',
    paddingRight: '2em',
    paddingTop: '1em',
    paddingBottom: '1em',
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
});

const TitleBox = styled(Grid)({
    paddingBottom: '1em',
    textAlign: 'center',
    textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
    textAlign: 'left',
});

function HorizontalInfoBar(props) {

    return (
        <Wrapper container>
            <TitleBox item sm="12" md="3">
                <Typography variant="h5">
                    {props.title}
                </Typography>
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
